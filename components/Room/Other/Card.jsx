"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import IncDecCounter from "@/components/Count/Count";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useState, useEffect } from "react";
import Calculation from "./Calculation";
import { useDispatch, useSelector } from "react-redux";
import { selectQuantity } from "@/components/Features/Slices/calculationSlice";
import {
  selectRoomData,
  selectRoomStatus,
} from "@/components/Features/Slices/roomSlice";
import "../styles.css";
import axios from "axios";
import Image from "next/image";
import { selectProductImages } from "@/components/Features/Slices/imageDataSlice";
import { colorsData } from "../../../Model/ColorsData/Colors.js";

const Card = ({ data }) => {
  const quantity = useSelector(selectQuantity);
  const router = useRouter();
  const [widthstate, setwidthstate] = useState(0);
  const [heightstate, setheightstate] = useState(0);
  const [pricestate, setpricestate] = useState(0);
  const [coststate, setcoststate] = useState(7000);
  const [rollstate, setrollstate] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [paletteType, setPaletteType] = useState("color");
  const dispatch = useDispatch();

  const [sidebarContect, setsidebarContent] = useState(null)

  const handlePaletteType = (value) => {
    setPaletteType(value === "color" ? "image" : "color");
  };
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };
  const [hidden, setHidden] = useState(false);
  const handlefunc = () => {
    setHidden(!hidden);
  };

  const priceCal = () => {
    const area = (widthstate * heightstate) / 50;
    const calculatedPrice = area * coststate;
    setpricestate(calculatedPrice.toFixed(2));
    setrollstate(area.toFixed(2));
  };
  useEffect(() => {
    priceCal();
  }, [widthstate, heightstate, coststate]);

  const imageData = data.productImages?.map((item) => {
    return {
      color: item.color,
      image: item.images[0],
    };
  });

  console.log(imageData);

  const colorSep = data.productImages?.map((item) => {
    let hexCode = "";
    for (const category of colorsData) {
      for (const key in category) {
        if (category[key][item.color]) {
          hexCode = category[key][item.color];
          break;
        }
      }
      if (hexCode) break;
    }

    return {
      ...item,
      hexCode: hexCode,
    };
  });
  console.log(colorSep);
  const roomData = useSelector(selectRoomData);
  console.log(roomData);
  const roomStatus = useSelector(selectRoomStatus);
  //posting data to database
  if (typeof window !== "undefined") {
    var id = localStorage.getItem("deviceId");
    console.log("deviceId : ", id);
  }

  const handleColor = (color) => {
    setSelectedColor(color);
    dispatch({
      type: "FETCH_IMAGE_DATA",
      payload: color,
    });
  };

  const postUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`;
  const postRoomData = async () => {
    try {
      console.log("Posting room data:", {
        deviceId: id,
        productId: roomData._id,
        quantity: quantity,
      });

      const postData = {
        deviceId: id,
        productId: roomData._id,
        quantity: quantity,
      };

      const response = await axios.post(postUrl, postData);
      if (response.status === 200) console.log(response);
    } catch (error) {
      console.error("Error posting room data:", error);
    }
  };

  const handleClickDB = async () => {
    try {
      // Validate quantity, productId, and deviceId
      if (quantity <= 0) {
        console.error("Invalid quantity");
        return;
      }

      if (!roomData.productId) {
        console.error("Invalid productId");
        return;
      }

      if (!id) {
        console.error("Invalid deviceId");
        return;
      }

      // Post data to the database
      await postRoomData();

      // Redirect to the checkout page
    } catch (error) {
      console.error("Error handling click:", error);
    }
  };
  //posting data to database

  const handleClicks = () => {
    router.push("/checkout");
  };

  console.log({data})

  const [Modal, setModal] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [store, setStore] = useState(false);
  // const handleModal = () => {
  //   setModal(!Modal);
  // };
  const [modalContent, setModalContent] = useState(null);

  const handleOptionClick = (content) => {
    setsidebarContent(content);
  };
  return (
    <>
      <div className="flex justify-start md:min-w-[25vw] gap-1 mt-7 w-[100%] ml-0">
        <div className=" w-[100%] prefence-text">
          <div className="textHolders flex flex-col">
            <div className="flex items-center justify-between mt-4">
              {/* <p className="text-[16px] font-normal">Originals</p> */}

              <p className="font-semibold text-red-600 text-[15px]">New lower price</p>

              <div className="flex gap-2">
                <div className="flex items-center">
                  <Image src={"/icon/star.svg"} height={20} width={20} alt="downarrow" className=" h-[1em] w-[1em] hover:text-gray-600" />
                  <Image src={"/icon/star.svg"} height={20} width={20} alt="downarrow" className=" h-[1em] w-[1em] hover:text-gray-600" />
                  <Image src={"/icon/star.svg"} height={20} width={20} alt="downarrow" className=" h-[1em] w-[1em] hover:text-gray-600" />
                  <Image src={"/icon/star.svg"} height={20} width={20} alt="downarrow" className=" h-[1em] w-[1em] hover:text-gray-600" />
                  <Image src={"/icon/half-star.svg"} height={20} width={20} alt="downarrow" className=" h-[1em] w-[1em] hover:text-gray-600" />

                </div>
                <p className="text-gray-800 underline w-[31px] h-[20px] cursor-pointer">159</p>
              </div>
            </div>
            <h1 className="text-2xl md:mt-1 font-bold mb-1">
              {data?.productTitle}
            </h1>
            <div className="font-medium flex tracking-wider text-[#757575] mb-1">

              <h3>{data?.collectionName}</h3>
            </div>
            {/* <div className="font-medium tracking-wider text-[#757575] flex mb-1">
              Pattern Number:&nbsp;
              <h3>{data?.patternNumber}</h3>
            </div> */}
            <div className="price">
              <div className="font-bold flex mt-[30px]">
                <span>Rs. &nbsp;</span>
                <h2 className="text-3xl leading-[0.5] tracking-wide ">
                  {" "}
                  {data?.perUnitPrice}
                </h2>{" "}
                <span> &nbsp;/roll</span>
              </div>
              <div className="flex flex-col">
                <p className="text-[#757575] text-[12px] pt-[3px]">Regular price: Rs.499 (incl. of all taxes)</p>
                <p className="text-[#757575] text-[12px] pb-[10px]">Price valid May 02 - May 29 or while supply lasts</p>
              </div>
            </div>

            <IncDecCounter />
          </div>

          {/* color-container */}
          <div className="colorContainer flex flex-col mt-[30px] sm:w-auto w-[80vw]">
            <div className="w-full flex justify-between">
              <h1 className="mb-2 font-bold">Colours</h1>
              {paletteType === "color" ? (
                <>
                  <button onClick={() => handlePaletteType(paletteType)}>
                    Image
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handlePaletteType(paletteType)}>
                    Color
                  </button>
                </>
              )}
            </div>
            {paletteType === "color" ? (
              <>
                <div className="colors flex gap-3">
                  {colorSep?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleColor(item.color)}
                      className={`w-[60px] h-[60px] text-gray-900 text-center text-xs flex justify-center items-center cursor-pointer
            ${selectedColor === item.color ||
                          (index === 0 && selectedColor === "")
                          ? "border-b-[2px] border-black"
                          : "border-b-[0.5px] border-black"
                        }   
          `}
                      style={{
                        backgroundColor: item.hexCode,
                      }}
                    >
                      {item.color}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="colors flex gap-3">
                  {imageData?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleColor(item.color)}
                      className={`parent relative w-[60px] h-[60px] text-gray-900 text-center text-xs flex justify-center items-center cursor-pointer
            ${selectedColor === item.color ||
                          (index === 0 && selectedColor === "")
                          ? "border-[2px] border-black"
                          : "border-[0.5px] border-black"
                        }   
          `}
                    >
                      <Image
                        className="relative w-full h-full object-cover"
                        src={item.image}
                        alt={item.color}
                        width={0}
                        height={0}
                        layout="fill"
                        objectFit="cover"
                      />
                      .
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* calculations */}
          <div className="border-black w-[100%] sm:w-full mt-[30px] bg-zinc-100 relative">
            <div className="flex flex-row">
              <div
                className="w-[1px] h-full bg-[#e5e7eb] absolute"
                style={{ left: "calc(50%)", top: "0" }}
              ></div>
              <div
                className="flex flex-col col-span-1 w-1/2 p-[14px]  hover:bg-zinc-200 cursor-pointer"
                onClick={() => handleOptionClick("zeroCostEMI")}
              >
                <div className="flex flex-row gap-1">
                  <Image
                    src="/rooms/payment.svg"
                    height={25}
                    width={25}
                    alt="icon"
                    className=" w-[23px] h-[23px]"
                  />
                  <h1 className="font-medium text-sm">ZERO Cost EMI</h1>
                </div>
                <p className="text-[11px] pt-[5px]">Ayatrio payment option</p>
              </div>

              <div
                className="flex flex-col col-span-2 w-1/2 p-[14px] hover:bg-zinc-200  cursor-pointer"
                onClick={() => handleOptionClick("inStoreRequest")}
              >
                <div className="flex flex-row gap-1">
                  <Image
                    src="/rooms/ayatrio_store_b.svg"
                    height={25}
                    width={25}
                    alt="icon"
                    className=" w-[23px] h-[23px]"
                  />
                  <h1 className="font-medium text-sm">In-Store Request</h1>
                </div>
                <p className="text-[11px] pt-[5px]">Check in-store stock</p>
              </div>
            </div>
            <hr />
            <div className="flex flex-row ">
              <div
                className="flex flex-col col-span-2 w-1/2 p-[14px] hover:bg-zinc-200 cursor-pointer"
                onClick={() => handleOptionClick("deliveryOption")}
              >
                <div className="flex flex-row gap-2">
                  <Image
                    src="/rooms/delivary.svg"
                    height={25}
                    width={25}
                    alt="icon"
                    className=" w-[25px] h-[25px]"
                  />
                  <h1 className="font-medium text-sm">Delivery Option</h1>
                </div>
                <p className="text-[11px] pt-[5px]">Check availability</p>
              </div>
              <div
                className="flex flex-col col-span-2 w-1/2 p-[14px] hover:bg-zinc-200 cursor-pointer"
                onClick={() => handleOptionClick("calculator")}
              >
                <div className="flex flex-row gap-2">
                  <Image
                    src="/rooms/calculator.svg"
                    height={25}
                    width={25}
                    alt="icon"
                    className=" w-[25px] h-[25px]"
                  />
                  <h1 className="font-medium text-sm">Calculator</h1>
                </div>
                <p className="text-[11px] pt-[5px]">As per your requirement</p>
              </div>
            </div>

            {/* Modal */}
            {sidebarContect && (
              <div>
                <div className="w-1/2 h-5/6 flex flex-col justify-between gap-4 bg-white rounded-3xl p-7 z-50">
                  {sidebarContect === "zeroCostEMI" && (
                    <div className=" fixed h-full w-screen  bg-black/50  backdrop:blur-sm top-0 left-0">
                      <section className="text-black bg-white flex-col absolute right-0 top-0 h-screen p-8 gap-8 z-50  w-[35%] flex ">
                        <div className="flex items-end justify-end">
                          <button
                            className="text-3xl mt-0 mb-8 cursor-pointer  "
                            onClick={() => setsidebarContent(null)}
                          >
                            X
                          </button>
                        </div>
                        <h1 className="text-3xl font-bold">
                          Zero Cost EMI
                        </h1>
                        <p>Content for Zero cost emi</p>
                      </section>
                    </div>
                  )}
                  {sidebarContect === "inStoreRequest" && (
                    <div className=" fixed h-full w-screen  bg-black/50  backdrop:blur-sm top-0 left-0">
                      <section className="text-black bg-white flex-col absolute right-0 top-0 h-screen p-8 gap-8 z-50  w-[35%] flex ">
                        <div className="flex items-end justify-end">
                          <button
                            className="text-3xl mt-0 mb-8 cursor-pointer  "
                            onClick={() => setsidebarContent(null)}
                          >
                            X
                          </button>
                        </div>
                        <h1 className="text-3xl font-bold">
                          In Store Request
                        </h1>
                        <p>Content for In store Request</p>
                      </section>
                    </div>
                  )}

                  {sidebarContect === "deliveryOption" && (
                    <div className=" fixed h-full w-screen  bg-black/50  backdrop:blur-sm top-0 left-0">
                      <section className="text-black bg-white flex-col absolute right-0 top-0 h-screen p-8 gap-8 z-50  w-[35%] flex ">
                        <div className="flex items-end justify-end">
                          <button
                            className="text-3xl mt-0 mb-8 cursor-pointer  "
                            onClick={() => setsidebarContent(null)}
                          >
                            X
                          </button>
                        </div>
                        <h1 className="text-3xl font-bold">
                          Delivery Options
                        </h1>
                        <p>Content Delivery Options </p>
                      </section>
                    </div>
                  )}
                  {sidebarContect === "calculator" && (
                    <div className=" fixed h-full w-screen  bg-black/50  backdrop:blur-sm top-0 left-0">
                      <section className="text-black bg-white flex-col absolute right-0 top-0 h-screen p-8 gap-8 z-50  w-[35%] flex ">
                        <div className="flex items-end justify-end">
                          <button
                            className="text-3xl mt-0 mb-8 cursor-pointer  "
                            onClick={() => setsidebarContent(null)}
                          >
                            X
                          </button>
                        </div>
                        <h1 className="text-3xl font-bold">
                          Calculator
                        </h1>
                        <p>calculator here</p>
                      </section>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* //buttons */}
          <div className="buttons mt-4 sm:w-auto w-[100%] sm:block flex flex-col items-center justify-center">
            <Link
              href={{
                pathname: "/checkout",
                query: {
                  search: "rooms",
                },
              }}
              className="memberCheckout w-[100%] my-2 flex items-center justify-center"
            >
              <button
                onClick={() => handleClickDB()}
                className="bg-black text-white w-[100%] sm:h-14 h-10 rounded-full hover:bg-gray-900 transition duration-300 px-4"
              >
                Buy Now
              </button>
            </Link>

            <div className="guestCheckout w-[100%] flex justify-center items-center ">
              <button
                onClick={() => {
                  handleClickDB();
                  {
                    roomStatus === "succeeded" &&
                      toast.success("Succesfully added", {
                        toastId: "success1",
                      });
                  }
                }}
                className="bg-black text-white px-4   w-[100%] sm:h-14 h-10 rounded-full hover:bg-gray-900 transition duration-300"
              >
                Add To Bag
              </button>
            </div>
            <Link
              href={{
                pathname: "/checkout",
                query: {
                  search: "sample",
                },
              }}
              className="memberCheckout w-[100%] my-2 flex items-center justify-center"
            >
              <button className="border-2 px-4 text-black border-solid   w-[100%] sm:h-14 h-10 rounded-full  transition duration-300">
                Buy Now with in-store request
              </button>
            </Link>
          </div>
          <div className="flex gap-6 mt-8 items-center justify-center">
            <Image src={"/ayatrio icon/chat.svg"} height={35} width={35} alt="downarrow" className="h-[35px] w-[35px]  hover:text-gray-600" />

            <div className="flex flex-col items-center">
              <p className="font-semibold text-[#1D1D1F] text-xs">Have questions about Ayatrio?</p>
              <p className="text-[#0066CC] text-xs cursor-pointer font-normal hover:underline">Chat with a Specialist</p>
            </div>
          </div>

        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop={true}
          theme="light"
          style={{ zIndex: "9999999999999" }}
        />
      </div>
    </>
  );
};

export default Card;
