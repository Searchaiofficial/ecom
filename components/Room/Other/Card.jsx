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
  const dispatch = useDispatch();

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

  const [Modal, setModal] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [store, setStore] = useState(false);
  // const handleModal = () => {
  //   setModal(!Modal);
  // };
  const [modalContent, setModalContent] = useState(null);

  const handleOptionClick = (content) => {
    setModalContent(content);
  };
  return (
    <>
      <div className="flex justify-start md:min-w-[25vw] gap-1 mt-5 w-[100%] ml-0">
        <div className=" w-[100%] prefence-text">
          <div className="textHolders flex flex-col">
            <h1 className="text-2xl md:mt-5 font-bold mb-3">
              {data?.productTitle}
            </h1>
            <div className="font-medium flex tracking-wider text-[#757575] mb-1">
              Collection:&nbsp;
              <h3>{data?.collectionName}</h3>
            </div>
            <div className="font-medium tracking-wider text-[#757575] flex mb-1">
              Pattern Number:&nbsp;
              <h3>{data?.patternNumber}</h3>
            </div>
            <div className="price">
              <div className="font-bold flex mt-[25px]">
                <span>Rs. &nbsp;</span>
                <h2 className="text-3xl leading-[0.5] tracking-wide">
                  {" "}
                  {data?.perUnitPrice}
                </h2>{" "}
                <span> &nbsp;/roll</span>
              </div>
              <h5 className="text-[#757575] pb-[5px]">
                Price incl. of all taxes
              </h5>
            </div>

            <IncDecCounter />
          </div>

          {/* color-container */}
          <div className="colorContainer flex flex-col mt-[30px] sm:w-auto w-[80vw]">
            <h1 className="mb-2 font-bold">Colours</h1>
            <div className="colors flex gap-3">
              {colorSep?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleColor(item.color)}
                  className={`
      w-[60px]
      h-[60px]
      border-b-2
      border-black
      text-gray-900
      text-center 
      text-xs
      flex 
      justify-center
      items-center
      cursor-pointer
      ${
        selectedColor === item.color || (index === 0 && selectedColor === "")
          ? "border-2 border-green-500"
          : ""
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
            {modalContent && (
              <div className="bg-gray-900 z-[999999] bg-opacity-30 fixed top-0 left-0 w-full h-full flex items-center justify-center ">
                <div className="w-1/2 h-5/6 flex flex-col justify-between gap-4 bg-white rounded-3xl p-7 z-50">
                  {modalContent === "zeroCostEMI" && (
                    <>
                      <h1>Content for ZERO Cost EMI</h1>
                      <button onClick={() => setModalContent(null)}>
                        Close
                      </button>
                    </>
                  )}
                  {modalContent === "inStoreRequest" && (
                    <div className="bg-gray-900 z-[999999] bg-opacity-30 fixed top-0 left-0 w-full h-full flex items-center justify-center ">
                      <div className="w-1/2 h-5/6 flex flex-col justify-between gap-4 bg-white rounded-3xl p-7 z-50">
                        <div>
                          <div className="pl-7">Enter city:</div>
                          <input
                            type="text"
                            name="city"
                            value=""
                            className="border border-black ml-8 mb-2"
                          />
                        </div>
                        <button onClick={() => setModalContent(null)}>
                          Close
                        </button>
                      </div>
                    </div>
                  )}

                  {modalContent === "deliveryOption" && (
                    <div className=" bg-gray-900 z-[999999] bg-opacity-30  fixed top-0 left-0 w-full h-full flex items-center justify-center ">
                      <div className="  w-1/2 h-5/6  flex flex-col justify-between  gap-4 bg-white rounded-3xl p-7 z-50">
                        <div>
                          <div className="pl-7">Enter pincode:</div>
                          <input
                            type="number"
                            name="pincode"
                            value=""
                            className="border border-black ml-8 mb-2"
                          />
                        </div>
                        <button onClick={() => setModalContent(null)}>
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                  {modalContent === "calculator" && (
                    <div className="   fixed top-0 left-0 w-full h-full flex items-center justify-center ">
                      <div className="  w-1/2 h-5/6  flex flex-col justify-between  gap-4 bg-white rounded-3xl p-7 z-50">
                        <Calculation priceData={data} />
                        <button onClick={() => setModalContent(null)}>
                          Close
                        </button>
                      </div>
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
