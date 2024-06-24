"use client";
import React, { useEffect, useState } from "react";
import { allSelectedData } from "@/components/Features/Slices/virtualDataSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import LiveRoomProductCard from "@/components/LiveRoom/LiveRoomProductCard";
import Link from "next/link";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const router = useRouter();

  const roomId = params.roomId;
  const x = useSelector(allSelectedData);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  const [socket, setSocket] = useState(null);
  const [peers, setPeers] = useState({});
  const [streams, setStreams] = useState({});
  const [myStream, setMyStream] = useState(null);
  const [myAudioEnabled, setMyAudioEnabled] = useState(null);
  const [myVideoEnabled, setMyVideoEnabled] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL);
      console.log(socket);
      setSocket(socket);

      return () => {
        socket.disconnect();
      };
    } else {
      router.push(`/liveroom/`);
    }
  }, []);

  useEffect(() => {
    if (x.length > 0) {
      router.push("/virtualexperience/category");
    }
    const fetchVeProducts = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getVEFilter`;
        const response = await axios.post(apiUrl, x, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    const fetchProductByCategory = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchProductsByCategory/${x.category}`;
        const response = await axios.get(apiUrl);
        setSimilarProducts(response.data);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    fetchVeProducts();

    if (x.category) {
      fetchProductByCategory();
    }
  }, []);

  const stars = new Array(4)
    .fill("/icons/star.svg")
    .concat("/icons/half-black-half-white.svg");

  useEffect(() => {
    if (socket) {
      const handleUserJoined = ({ userId: _, users }) => {
        users.forEach((id) => {
          if (id !== socket.id && !peers[id]) {
            console.log("User joined", id);
            createPeerConnection(id, false);
          }
        });
      };

      const handleUserLeft = ({ userId }) => {
        if (peers[userId]) {
          peers[userId].close();
          delete peers[userId];
          delete streams[userId];
          setPeers({ ...peers });
          setStreams({ ...streams });
        }
      };

      const handleOffer = async ({ from, offer }) => {
        const peer = createPeerConnection(from, true);
        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        socket.emit("answer", { to: from, answer });
      };

      const handleAnswer = async ({ from, answer }) => {
        const peer = peers[from];
        await peer.setRemoteDescription(new RTCSessionDescription(answer));
      };

      const handleIceCandidate = async ({ from, candidate }) => {
        const peer = peers[from];
        if (peer.remoteDescription)
          await peer.addIceCandidate(new RTCIceCandidate(candidate));
      };

      socket.on("user-joined", handleUserJoined);
      socket.on("user-left", handleUserLeft);
      socket.on("offer", handleOffer);
      socket.on("answer", handleAnswer);
      socket.on("ice-candidate", handleIceCandidate);

      return () => {
        socket.off("user-joined", handleUserJoined);
        socket.off("user-left", handleUserLeft);
        socket.off("offer", handleOffer);
        socket.off("answer", handleAnswer);
        socket.off("ice-candidate", handleIceCandidate);
      };
    }
  }, [socket, peers, streams]);

  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMyStream(stream);
      if (socket) socket.emit("join-room", { roomId });
    };

    init();
  }, [roomId, socket]);

  // useEffect(() => {
  //   if (myStream) {
  //     setMyAudioEnabled(myStream.getAudioTracks()[0].enabled);
  //     setMyVideoEnabled(myStream.getVideoTracks()[0].enabled);
  //   }
  // }, [myStream]);

  const createPeerConnection = (userId, isAnswerer) => {
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: ["stun:stun.l.google.com:19302"] },
        {
          urls: "turn:numb.viagenie.ca",
          username: "webrtc@live.com",
          credential: "muazkh",
        },
      ],
    });

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          to: userId,
          candidate: event.candidate,
        });
      }
    };

    peer.ontrack = (event) => {
      setStreams((prev) => ({ ...prev, [userId]: event.streams[0] }));
    };

    if (myStream) {
      myStream.getTracks().forEach((track) => {
        peer.addTrack(track, myStream);
      });
    }

    if (!isAnswerer) {
      peer.onnegotiationneeded = async () => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        socket.emit("offer", { to: userId, offer });
      };
    }

    setPeers((prev) => ({ ...prev, [userId]: peer }));
    return peer;
  };

  const exitCall = () => {
    Object.values(peers).forEach((peer) => {
      peer.close();
    });

    setPeers({});
    setStreams({});
    setMyStream(null);
    setMyAudioEnabled(null);
    setMyVideoEnabled(null);

    socket.emit("leave-room", { roomId });
  };

  const rejoinCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setMyStream(stream);
    // setMyAudioEnabled(myStream.getAudioTracks()[0].enabled);
    // setMyVideoEnabled(myStream.getVideoTracks()[0].enabled);
    socket.emit("join-room", { roomId });
  };

  const toggleAudio = () => {
    if (myStream) {
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });

      // setMyAudioEnabled(myStream.getAudioTracks()[0].enabled);
    }
  };

  const toggleVideo = () => {
    if (myStream) {
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });

      // setMyVideoEnabled(myStream.getVideoTracks()[0].enabled);
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      screenStream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };

      setIsScreenSharing(true);

      if (myStream) {
        const videoTrack = myStream.getVideoTracks()[0];
        myStream.removeTrack(videoTrack);
        videoTrack.stop();
        myStream.addTrack(screenStream.getVideoTracks()[0]);
      }

      Object.values(peers).forEach((peer) => {
        const sender = peer
          .getSenders()
          .find((s) => s.track && s.track.kind === "video");
        if (sender) {
          sender.replaceTrack(screenStream.getVideoTracks()[0]);
        }
      });
    } catch (error) {
      console.error("Error sharing screen: ", error);
    }
  };

  const stopScreenShare = () => {
    if (myStream) {
      myStream.getVideoTracks()[0].stop();
      exitCall();
      rejoinCall();
    }
    setIsScreenSharing(false);
  };

  return (
    <div className="">
      <div className="sm:px-4 flex px-[20px] h-screen py-4 flex-col md:flex-row">
        <div className="relative w-full  md:w-[70%] bg-black py-4 border-2 border-black">
          {myStream && (
            <div className="h-full w-full">
              {/* <span className="block text-center font-semibold mb-2">
                My Stream
              </span> */}
              <video
                className="w-full h-full"
                autoPlay
                playsInline
                muted
                ref={(video) => {
                  if (video) {
                    video.srcObject = myStream;
                  }
                }}
              />
              {/* <div className="flex justify-between">
                <button
                  onClick={toggleAudio}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Toggle Audio
                </button>
                <button
                  onClick={toggleVideo}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Toggle Video
                </button>
              </div> */}
            </div>
          )}
          <div className=" absolute bottom-8 w-full flex gap-2 justify-center">
            <button
              onClick={toggleAudio}
              className="bg-red-500 hover:bg-red-400 text-xs text-center text-white font-medium shadow-sm  rounded-full w-10 h-10"
            >
              {/* {myAudioEnabled ? "Mute" : "UnMute"} */}
              Audio
            </button>
            <button
              onClick={toggleVideo}
              className="bg-red-500 hover:bg-red-400 text-xs text-center text-white font-medium shadow-sm  rounded-full w-10 h-10"
            >
              {/* {myVideoEnabled ? "Video Off" : "Video On"} */}
              Video
            </button>
            {myStream && (
              <button
                onClick={exitCall}
                className="bg-red-500 hover:bg-red-400 text-xs text-center text-white font-medium shadow-sm  rounded-full w-10 h-10"
              >
                Exit Call
              </button>
            )}
            {!myStream && (
              <button
                onClick={rejoinCall}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Rejoin Call
              </button>
            )}
            {!isScreenSharing && (
              <button
                onClick={startScreenShare}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Share Screen
              </button>
            )}
            {isScreenSharing && (
              <button
                onClick={stopScreenShare}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
              >
                Stop Screen Share
              </button>
            )}
          </div>
          <div className="absolute w-[20%]  top-0 right-0">
            {Object.keys(streams).map((key) => (
              <div
                key={key}
                className="z-50 relative mb-2 rounded-lg shadow-lg"
              >
                <span className="absolute text-white top-0 text-sm text-center font-semibold mb-2">
                  {key}'s
                </span>
                <video
                  className="w-full rounded-lg"
                  autoPlay
                  playsInline
                  ref={(video) => {
                    if (video) {
                      video.srcObject = streams[key];
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex flex-col w-full  md:w-[30%] pl-4">
          <div className="relative w-full overflow-y-scroll h-[100%]">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Related Products</h1>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <div className="grid grid-cols-1 w-full h-full fade-in ">
                    <LiveRoomProductCard
                      productTitle={product.productTitle}
                      price={product.perUnitPrice}
                      demandtype={product.demandtype}
                      specialprice={product.specialprice}
                      desc={product.productTitle}
                      imgSrc={product.images}
                      rating={product.ratings}
                      key={idx}
                      id={product._id}
                      category={product.category}
                      productId={product.productId}
                      ratings={product.ratings}
                      stars={stars}
                      totalPrice={product.totalPrice}
                      productDescription={product.productDescription}
                    />
                  </div>
                ))
              ) : (
                <div className="mt-2">No products found</div>
              )}
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-semibold mb-2">Similar Products</h1>
              {similarProducts.length > 0 ? (
                similarProducts.map((product, idx) => (
                  <div className="grid grid-cols-1 w-full h-full fade-in ">
                    <LiveRoomProductCard
                      productTitle={product.productTitle}
                      price={product.perUnitPrice}
                      demandtype={product.demandtype}
                      specialprice={product.specialprice}
                      desc={product.productTitle}
                      imgSrc={product.images}
                      rating={product.ratings}
                      key={idx}
                      id={product._id}
                      category={product.category}
                      productId={product.productId}
                      ratings={product.ratings}
                      stars={stars}
                      totalPrice={product.totalPrice}
                      productDescription={product.productDescription}
                    />
                  </div>
                ))
              ) : (
                <div className="mt-2">No products found</div>
              )}
            </div>
          </div>
          {/* <div className="absolute p-2 w-full bottom-0 left-0 h-[8%] ">
            <input
              type="text"
              placeholder="Type here to chat..."
              className="w-full h-full border-1 bg-gray-200  rounded-full p-2 focus:outline-none"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default page;
