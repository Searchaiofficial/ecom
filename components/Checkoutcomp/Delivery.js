"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsTag } from "react-icons/bs";
import { selectRoomData } from "../Features/Slices/roomSlice";
import Calender from "../Calenders/Calender";
import {
  deliveryPrice,
  selectPickupOption,
  selectQuantity,
  selectSchedular,
  updatePrice,
} from "../Features/Slices/calculationSlice";
import { AiOutlineRightCircle } from "react-icons/ai";
import { LiaWarehouseSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setDbItems } from "../Features/Slices/cartSlice";

const Delivery = () => {
  const [selectedOption, setSelectedOption] = useState("option3");
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.rooms.selectedActivity);
  const roomData = useSelector(selectRoomData);
  const quantity = useSelector(selectQuantity);
  const [cartdata, setcartdata] = useState("");
  const [cartStatus, setCartStaus] = useState("");
  const [sideMenu, setSideMenu] = useState(false);
  const [deliveryChoice, setDeliveryChoice] = useState(99);

  const isSchedular = useSelector(selectSchedular);
  const pickup = useSelector(selectPickupOption);

  useEffect(() => {
    if (pickup === "collect") {
      setSelectedOption("option1");
      setDeliveryChoice(59);
    }
  }, [pickup]);

  const dbItems = useSelector((state) => state.cart.dbItems);
  if (typeof window !== "undefined") {
    var id = localStorage.getItem("deviceId");
    console.log(id);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCartStaus("loading");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
          {
            params: {
              deviceId: id,
            },
          }
        );
        // console.log(response);
        if (response.status !== 200) {
          throw new Error("HTTP status " + response.status);
        }
        const data = response.data; // Extract JSON from the response
        // console.log("response from DB", data);

        setcartdata(data);
        // console.log("response from DB", cartdata);
        setCartStaus("succeeded");
        // console.log("cartStatus", cartStatus);
        dispatch(setDbItems(data));
        // console.log("this is data from redux (db)", dbItems);
      } catch (error) {
        // console.error("Error Fetching data from DB : ", error);

        setCartStaus("failed");
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    console.log("Updated cartdata", cartdata);
    console.log("Updated cartStatus", cartStatus);
  }, [cartdata, cartStatus]);
  let totalPrice = 0;
  if (cartStatus === "succeeded" && cartdata) {
    totalPrice = cartdata.items.reduce(
      (total, item) => total + item.productId.totalPrice * item.quantity,
      0
    );
  }

  const handlePrice = () => {
    dispatch(deliveryPrice(deliveryChoice));
  };

  console.log(cartStatus);
  console.log(cartdata);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    switch (event.target.value) {
      case "option1":
        setDeliveryChoice(59);
        break;
      case "option2":
        setDeliveryChoice(79);
        break;
      case "option3":
        setDeliveryChoice(99);
        break;
      default:
        setDeliveryChoice(99);
        break;
    }
  };

  console.log(typeof deliveryChoice);
  console.log(deliveryChoice);
  // console.log(cartItems);
  const subtotal = 786;
  //   const subtotal = cartItems
  //     .reduce((acc, currentItem) => {
  //       return acc + currentItem.price * currentItem.qty;
  //     }, 0)
  //     .toFixed(2);
  // console.log(subtotal);
  const delcharge = 100;
  //   const delcharge = (subtotal * 20) / 100;
  //   const totlaCharge = parseFloat(subtotal) + parseFloat(delcharge);
  return (
    <div className="px-20  pt-[6rem] pb-[3rem] ">
      <div className="grid grid-cols-12 gap-10 border-b-2">
        <div className="col-span-8">
          {/* <h2 className="py-2 mb-6 text-2xl">Your Cart</h2>
          <div className="flex items-center justify-between border-b border-slate-400 text-slate-400 pb-3 font-semibold text-sm mb-4">
            <h2 className="uppercase">Product</h2>
            <h2 className="uppercase">Quantity</h2>
            <h2 className="uppercase">Price</h2>
          </div> */}

          {/* <!-- parent div --> */}
          <div className=" py-2 ml-12 mr-14">
            {/* <!-- header section --> */}
            <div className="flex justify-between items-center mb-10">
              <h1 className=" text-[22px] leading-[1.33] font-[700] tracking-tight">
                Delivery and collection
              </h1>
              <div className="cursor-pointer hover:bg-gray-400 box-border rounded-xl">
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className=""
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.5 12c0 .8284-.6716 1.5-1.5 1.5s-1.5-.6716-1.5-1.5.6716-1.5 1.5-1.5 1.5.6716 1.5 1.5zm5.0039 0c0 .8284-.6716 1.5-1.5 1.5s-1.5-.6716-1.5-1.5.6716-1.5 1.5-1.5 1.5.6716 1.5 1.5zM17 13.5c.8284 0 1.5-.6716 1.5-1.5s-.6716-1.5-1.5-1.5-1.5.6716-1.5 1.5.6716 1.5 1.5 1.5z"
                  ></path>
                </svg>
              </div>
            </div>
            {/* <!-- Address pin  --> */}
            <div className="flex h-11 w-48">
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="cart-ingka-svg-icon"
                aria-hidden="true"
              >
                <path d="M12.0001 11.2157c1.1046 0 2-.8954 2-2s-.8954-2-2-2c-1.1045 0-2 .8954-2 2s.8955 2 2 2z"></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.0001 21.3736c3.7444-2.5044 7.4025-6.5319 7.4025-11.288 0-4.0031-3.4051-7.4606-7.4121-7.4606-4.0108 0-7.3928 3.4614-7.3928 7.4606 0 4.7571 3.6584 8.7823 7.4024 11.288zm-5.4024-11.288c0-2.9193 2.511-5.4606 5.3928-5.4606 2.8856 0 5.4121 2.5452 5.4121 5.4606 0 3.6054-2.69 6.7393-5.4025 8.8443-2.7125-2.105-5.4024-5.2389-5.4024-8.8443z"
                ></path>
                <path d="M14.0001 9.2157c0 1.1046-.8954 2-2 2-1.1045 0-2-.8954-2-2s.8955-2 2-2c1.1046 0 2 .8954 2 2z"></path>
              </svg>
              <p className="w-full ml-3 font-[300] text-[15.5px]">
                Your pincode <span className="underline">843146</span>
              </p>
            </div>

            {/* <!-- order text --> */}
            <div className="tracking-wide font-[700] text-[1.09rem] leading-6 mb-4">
              How would you like to receive your order?
            </div>
            {/*devivery PIN CODE  */}
            <div className="w-full">
              <h1 className="text-4xl font-bold m-4 mb-8">
                Delivery and collection
              </h1>

              {/* ----------------- */}
              <div className="">
                <div className="bg-[#e5e5e5] flex justify-center items-center p-[16px] rounded-tr-md rounded-tl-md">
                  <span className="p-1 mr-2">
                    <LiaWarehouseSolid size={30} />
                  </span>
                  <h3>
                    <span className="text-[16px] font-semibold text-black">
                      {" "}
                      Order online and collect from an Ayatrio store or a point
                      near you
                    </span>{" "}
                    <a href="e" className="text-[#707072] underline">
                      nearby Maharashtra 400001
                    </a>
                  </h3>
                </div>

                <div className=" flex flex-col">
                  <label
                    className={` flex items-center space-x-2 p-4 cursor-pointer border-solid border-black border-l
               ${
                 selectedOption === "option1"
                   ? "border-2 border-solid border-blue-800"
                   : "border-none"
               }`}
                  >
                    <input
                      type="radio"
                      id="option1"
                      name="options"
                      value="option1"
                      checked={selectedOption === "option1"}
                      onChange={handleOptionChange}
                      className="form-radio h-7 w-7 text-indigo-600"
                    />
                    <div className="mx-auto flex justify-between  w-full">
                      <div className="">
                        <label className="text-lg font-bold" htmlFor="option1">
                          Collect at pick-up point
                        </label>
                        {selectedOption !== "option1" ? (
                          <>
                            <p className="text-md text-gray-500 py-2">
                              Earliest collection tomorrow 11:00 AM - 5:00 PM
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-md font text-gray-500 py-2">
                              You can collect items at the pick-up point.
                            </p>
                            <button className="rounded-full text-black text-sm font-bold border border-solid border-black p-2 my-2">
                              Change pick-up point
                            </button>
                            <p className="text-md text-gray-500">
                              Estimated pick-up Date
                            </p>
                            <p className="text-md text-gray-500 py-2">
                              24.3.2024 11:00 AM - 5:00 PM
                            </p>
                            <button className="rounded-full text-black text-sm font-bold border border-solid border-black p-2 my-2">
                              Change slot
                            </button>
                          </>
                        )}
                      </div>
                      <div>
                        <p className="text-md font-bold">Rs. 59</p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center space-x-2 p-4 cursor-pointer ${
                      selectedOption === "option2"
                        ? "border-2 border-solid border-blue-800"
                        : "border-none"
                    }`}
                  >
                    <input
                      type="radio"
                      id="option2"
                      name="options"
                      value="option2"
                      checked={selectedOption === "option2"}
                      onChange={handleOptionChange}
                      className="form-radio h-7 w-7 text-indigo-600"
                    />
                    <div className="mx-auto flex justify-between  w-full">
                      <div className="">
                        <label className="text-lg font-bold" htmlFor="option1">
                          Collect at Store
                        </label>
                        {selectedOption !== "option2" ? (
                          <>
                            <p className="text-md text-gray-500 py-2">
                              Earliest collection tomorrow 11:00 AM - 5:00 PM
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-md font text-gray-500 py-2">
                              Ready to collect in 24 hrs.
                            </p>
                            <p className="text-md font text-gray-500 py-2 w-full">
                              <span className="font-bold">
                                Ayatrio Navi Mumbai
                              </span>{" "}
                              TTC,Thane Belapur Rd, Turbhe 400705 Mumbai
                            </p>
                            <button className="rounded-full text-black text-sm font-bold border border-solid border-black p-2 my-2">
                              Change store
                            </button>
                            <p className="text-md text-gray-500">
                              Estimated collection time:
                            </p>
                            <p className="text-md text-gray-500 py-2">
                              24.3.2024 11:00 AM - 5:00 PM
                            </p>
                          </>
                        )}
                      </div>
                      <div>
                        <p className="text-md font-bold">Rs. 79</p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* ---------------------- */}

                {/* ----------option 2----------- */}

                <div className="mt-4">
                  <div className="bg-gray-300 flex justify-start items-center p-2 rounded-tr-md rounded-tl-md">
                    <span className="p-1 mr-2">
                      <LiaWarehouseSolid size={30} />
                    </span>
                    <h3>
                      <span className="text-lg font-bold text-black-500">
                        {" "}
                        Home delivery
                      </span>{" "}
                      <a href="e" className="underline">
                        nearby Maharashtra 400001
                      </a>
                    </h3>
                  </div>
                  <div className=" flex flex-col">
                    <label
                      className={`flex items-center space-x-2 p-4 cursor-pointer border-solid border-black border-l
       ${
         selectedOption === "option3"
           ? "border-2 border-solid border-blue-800"
           : "border-none"
       }`}
                    >
                      <input
                        type="radio"
                        id="option3"
                        name="options"
                        value="option3"
                        checked={selectedOption === "option3"}
                        onChange={handleOptionChange}
                        className="form-radio h-7 w-7 text-indigo-600"
                      />
                      <div className="mx-auto flex justify-between  w-full">
                        <div className="">
                          <label
                            className="text-lg font-bold mb-6"
                            htmlFor="option1"
                          >
                            Regular delivery
                          </label>
                          {selectedOption !== "option3" ? (
                            <>
                              <p className="text-md text-gray-500 py-2">
                                Estimated delivery 25.4.2024
                              </p>
                            </>
                          ) : (
                            <>
                              <h3 className="text-md mt-4 text-gray-500">
                                Estimated delivery
                              </h3>
                              <p className="text-md font-bold text-gray-500 py-2">
                                25.4.2024 9:00 AM - 9:00 PM
                              </p>
                            </>
                          )}
                        </div>
                        <div>
                          <p className="text-md font-bold">Rs.99</p>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="mt-4">{isSchedular ? <Calender /> : ""}</div>
                  <Link href={"/checkout/details"}>
                    <button
                      onClick={handlePrice}
                      className="bg-[#0058a3] text-white flex justify-center items-center border-solid border border-gray-300 p-8 h-12 rounded-full my-4 text-md font-bold w-full m-auto"
                    >
                      Continue{" "}
                    </button>
                  </Link>
                </div>

                {/* ---------------------- */}
                <hr></hr>
                <h3 className="text-md font-bold text-gray-500 my-4 py-4">
                  Your details
                </h3>
                <hr></hr>
                <h3 className="text-md font-bold text-gray-500 my-4 py-4">
                  Payment
                </h3>
                <hr></hr>
              </div>
            </div>

            {/* <!-- Take option  --> */}
            <div className="flex flex-row gap-5">
              {/* <!-- delivery  --> */}
              {/* <div className="box-border border rounded-sm border-gray-400 h-24 w-[50%]">
                <div className="flex px-6 py-5 h-24 items-center">
                  <div className="pr-5">
                    <svg
                      focusable="false"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="cart-ingka-svg-icon"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1 4h15v3h3.0246l3.9793 5.6848V18h-2.6567c-.4218 1.3056-1.6473 2.25-3.0933 2.25-1.446 0-2.6715-.9444-3.0932-2.25h-3.9044c-.4217 1.3056-1.6472 2.25-3.0932 2.25S4.4916 19.3056 4.0698 18H1V4zm3.0698 12c.4218-1.3056 1.6473-2.25 3.0933-2.25 1.446 0 2.6715.9444 3.0932 2.25H14V6H3v10h1.0698zM16 14.0007a3.24 3.24 0 0 1 1.2539-.2507c1.446 0 2.6715.9444 3.0933 2.25h.6567v-2.6848L17.9833 9H16v5.0007zM7.163 15.75c-.6903 0-1.25.5596-1.25 1.25s.5597 1.25 1.25 1.25c.6904 0 1.25-.5596 1.25-1.25s-.5596-1.25-1.25-1.25zm10.0909 0c-.6904 0-1.25.5596-1.25 1.25s.5596 1.25 1.25 1.25 1.25-.5596 1.25-1.25-.5596-1.25-1.25-1.25z"
                      ></path>
                    </svg>
                  </div>
                  <div className="font-[700] text-[1rem] leading-[1.571rem]">
                    Delivery
                  </div>
                </div>
              </div> */}
              {/* <!-- collect --> */}
              {/* <div className="box-border border rounded-sm border-gray-400 h-24 w-[50%]">
                <div className="flex px-6 py-5 h-24 items-center">
                  <div className="pr-5">
                    <svg
                      focusable="false"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="cart-ingka-svg-icon"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21 4H1v16h15V10H6v8H3V6h16v7.1707c-1.1652.4118-2 1.5231-2 2.8293v3c0 1.6569 1.3431 3 3 3s3-1.3431 3-3v-3c0-1.3062-.8348-2.4175-2-2.8293V4zM8 18h2v-6H8v6zm6 0h-2v-6h2v6zm5-2c0-.5523.4477-1 1-1s1 .4477 1 1v3c0 .5523-.4477 1-1 1s-1-.4477-1-1v-3z"
                      ></path>
                    </svg>
                  </div>
                  <div className="font-[700] text-[1rem] leading-[1.571rem]">
                    Collect
                  </div>
                </div>
              </div> */}
            </div>
            {/*  code */}

            {/* <div className="pt-10">
              <h1 className="text-2xl font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
                quo.
              </h1>
             
            </div> */}
          </div>

          <div className="">{/* CART1 */}</div>
        </div>
        <div className="col-span-4 sm:block bg-white  overflow-hidden hidden p-[0.6rem]  text-black ">
          <div className="flex justify-between">
            <h3 className="text-xl font-bold text-black">Your Order</h3>
            <Link href={"/cart"} className="underline">
              {" "}
              Edit
            </Link>
          </div>
          <div className="">
            <div className="flex my-4">
              {cartStatus === "loading" && <p>Loading...</p>}
              {cartStatus === "failed" && <p>Error loading data from DB.</p>}
              {cartStatus === "succeeded" && cartdata ? (
                cartdata.items.map((item, index) => {
                  return (
                    <Image
                      src={item.productId.images[0]}
                      width={249}
                      height={249}
                      alt={item.name}
                      className=" w-20 h-20"
                    />
                  );
                })
              ) : (
                <div className="text-lg text-gray-500 font-bold px-5">
                  Empty cart
                </div>
              )}
            </div>
          </div>
          <h2 className="text-xl pb-3 font-bold">Order summary</h2>
          <div className="flex items-center justify-between  border-slate-500 pb-6 ">
            <span className="text-black">Products price </span>
            <span className="text-black font-[700]">Rs.{totalPrice}</span>
          </div>
          <div className="flex items-center justify-between ">
            <span className="text-black">Delivery charge </span>
            <span className="text-black">Rs. {deliveryChoice}</span>
          </div>
          <p className="text-xs text-[#767677] border-b-4 border-black pb-6">
          calculated on distance and weight
          </p>
          <div className="flex items-center justify-between pb-4 mt-2">
          <span className="text-black">Subtotal </span>
            <span className="font-[700] text-black text-2xl">
              Rs. {totalPrice + deliveryChoice}
            </span>
          </div>
          <div className="flex items-center justify-between pb-4">
          <span className="text-black">Total weight </span>
            <span className="text-black font-[700]">1.9 kg</span>
          </div>
          <div className="border border-slate-500 p-[20px] w-[100%] h-auto">
            <p className="text-black font-[600] ">Make the most of delivery charges</p>
            <p className="text-[#757575] text-[12px] pt-[5px]">The current delivery price of your order is Rs. 99 for up to 5 kg.</p>
          </div>

          {/* <div className="flex items-center justify-between py-4 font-bold">
            <span>Total </span>
            <span>$1000</span>
          </div> */}

          <div className=" fixed h-full w-screen lg:hidden bg-black/50  backdrop:blur-sm top-0 right-0"></div>

          {/* <Link
            href="#"
            className="bg-slate-200 text-slate-900 rounded-lg py-2 px-4 font-normal"
          >
            Continue to Payment
          </Link> */}

          <div className="flex gap-4 justify-between items-center font-bold mt-14">
            <span>
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="cart-ingka-svg-icon"
                aria-hidden="true"
              >
                <path d="M19.205 5.599c.9541.954 1.4145 2.2788 1.4191 3.6137 0 3.0657-2.2028 5.7259-4.1367 7.5015-1.2156 1.1161-2.5544 2.1393-3.9813 2.9729L12 20.001v-2.3516c.6699-.4304 1.9095-1.2834 3.1347-2.4084 1.8786-1.7247 3.4884-3.8702 3.4894-6.0264-.0037-.849-.2644-1.6326-.8333-2.2015-1.1036-1.1035-2.9413-1.0999-4.0445.0014l-1.7517 1.7448-1.7461-1.7462c-1.1165-1.1164-2.9267-1.1164-4.0431 0-1.6837 1.6837-.5313 4.4136.6406 6.0155.3487.4768.7386.9326 1.1472 1.3617L8 11.9982l2 .0057-.017 6-6-.0171.0056-2 2.7743.0079c-.5387-.5472-1.0629-1.1451-1.5311-1.7852-1.0375-1.4183-1.8594-3.1249-1.8597-4.9957-.0025-1.2512.3936-2.5894 1.419-3.6149 1.8976-1.8975 4.974-1.8975 6.8716 0l.3347.3347.336-.3347c1.8728-1.8722 4.9989-1.8727 6.8716 0z"></path>
              </svg>
            </span>
            <div className="text-black  underline">
              60 days and additional 30-day returns with Ayatrio Family
            </div>
          </div>

          <div className="flex gap-4  items-center font-bold mt-4">
            <span className="">
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="cart-ingka-svg-icon"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 3C9.7909 3 8 4.7909 8 7v4H5v11h14V11h-3V7c0-2.2091-1.7909-4-4-4zm2 8V7c0-1.1046-.8954-2-2-2s-2 .8954-2 2v4h4zm-7 9v-7h10v7H7z"
                ></path>
              </svg>
            </span>
            <div className="text-black underline">
              Secure shopping with SSL data encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;