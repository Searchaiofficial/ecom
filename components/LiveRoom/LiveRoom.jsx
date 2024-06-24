"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/providers/SocketProvider";

const LiveRoom = () => {
  const router = useRouter();

  const socket = useSocket();

  const [roomId, setRoomId] = useState(1234);
  const [isDataFilled, setIsDataFilled] = useState(false);
  const [optionClick, setOptionClick] = useState("Instant Meeting");

  const handleSwitchOption = (option) => {
    setOptionClick(option);
  };

  const [userData, setUserData] = useState({ name: "", mobile: "" });

  const handleOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      router.push(`/liveroom/${roomId}`);
      setIsDataFilled(true);
    }
  }, []);

  const handleJoin = () => {
    setRoomId("1234");
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("roomId", roomId);
    router.push(`/liveroom/${roomId}`);
    setIsDataFilled(true);
  };

  const handleAcceptJoin = (data) => {
    console.log(data);
  };

  useEffect(() => {
    socket?.on("accept-join", handleAcceptJoin);

    return () => {
      socket?.off("accept-join", handleAcceptJoin);
    };
  }, [socket, handleAcceptJoin]);

  const requestJoin = () => {
    socket.emit("request-join", {
      ...userData,
    });
  };

  return (
    <div className="">
      <div className="sm:px-4 flex px-[20px] h-screen py-4 flex-col md:flex-row">
        <div className="relative w-full  md:w-[70%] bg-black py-4 border-2 border-black"></div>
      </div>

      {!isDataFilled && (
        <div className=" fixed h-full w-screen  bg-black/80 z-[9999] backdrop:blur-sm top-0 left-0">
          <section className="pt-[15vh] text-black bg-white flex-col absolute right-0 top-0 h-screen p-8 gap-8 z-50  w-[30%] flex ">
            <div className="flex justify-around text-lg font-medium">
              <h1
                className={`border-b-2 cursor-pointer ${
                  optionClick === "Instant Meeting"
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => handleSwitchOption("Instant Meeting")}
              >
                Instant Meeting
              </h1>
              <h1
                className={`border-b-2 cursor-pointer ${
                  optionClick === "Schedule Meeting"
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => handleSwitchOption("Schedule Meeting")}
              >
                Schedule Meeting
              </h1>
            </div>

            {optionClick === "Instant Meeting" && (
              <div>
                <div className="">
                  <h1 className="text-lg font-semibold">Enter Name</h1>
                  <input
                    type="text"
                    name="name"
                    placeholder="john doe"
                    className="w-full mt-2 h-10 border-1 bg-gray-100 px-4 rounded-full py-2 focus:outline-none"
                    onChange={handleOnChange}
                  />
                </div>

                <div className="mt-2">
                  <h1 className="text-lg font-semibold">Mobile no.</h1>
                  <input
                    type="number"
                    placeholder="9876543210"
                    name="mobile"
                    className="w-full mt-2 h-10 border-1 bg-gray-100  rounded-full px-4 py-2 focus:outline-none"
                    onChange={handleOnChange}
                  />
                </div>

                <button
                  className="bg-black text-white w-full h-10 rounded-full mt-4"
                  onClick={requestJoin}
                >
                  Join
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {/* {filteredProducts.length === 0 && similarProducts.length === 0 && (
        <div
          className="relative z-[9999]"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex flex-col  items-center">
                    <p className="text-lg  mb-2">No Product Found</p>

                    <Link href="/category/virtualexperience">
                      <h1 className="bg-blue-500 p-2 text-white rounded-md">
                        Go Back
                      </h1>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default LiveRoom;
