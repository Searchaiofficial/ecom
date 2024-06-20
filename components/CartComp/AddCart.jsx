"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRoomData } from "../Features/Slices/roomSlice";
import { selectQuantity, updateQuantity } from "../Features/Slices/calculationSlice";
import { setDbItems } from "../Features/Slices/cartSlice";
import Link from "next/link";
import axios from "axios";
import Emptycart from "./EmptyCart";

const AddCart = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.rooms.selectedActivity);
  const roomData = useSelector(selectRoomData);
  console.log(roomData);
  const quantity = useSelector(selectQuantity);
  const [cartdata, setcartdata] = useState("");
  const [cartStatus, setCartStaus] = useState("");
  const dbItems = useSelector((state) => state.cart.dbItems);

  let id;
  if (typeof window !== "undefined") {
    id = localStorage.getItem("deviceId");
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
        if (response.status !== 200) {
          throw new Error("HTTP status " + response.status);
        }
        const data = response.data;
        setcartdata(data);
        setCartStaus("succeeded");
        console.log(data)
        dispatch(setDbItems(data));
      } catch (error) {
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
  let quantities = 0;
  if (cartStatus === "succeeded" && cartdata && cartdata.items) {
    totalPrice = cartdata.items.reduce((total, item) => {
      return total + (item?.productId?.totalPrice || 0) * (item?.quantity || 0);
    }, 0);
    quantities = cartdata.items.reduce((total, item) => {
      return total + (item?.quantity || 0);
    }, 0);
  }

  const postUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`;
  const postData = {
    deviceId: id,
    productId: roomData._id,
    quantity: quantity,
  };

  const quantityCart = useSelector(selectQuantity);

  const handleDelete = async (itemid) => {
    console.log(itemid);
    try {
      const response = await axios.delete(postUrl, {
        params: {
          owner: id,
          productId: itemid,
        },
      });

      console.log(response.data)

      if (response.status !== 200) {
        console.error("HTTP status", response.status);
      }

      const updatedItems = cartdata.items.filter(
        (item) => item.productId._id !== itemid
      );
      setcartdata((prevstate) => ({
        ...prevstate,
        items: updatedItems,
      }));
      dispatch(setDbItems(response.data));
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };
  console.log(cartdata);

  return (
    <div className="">
      <div className="main-cart flex justify-center sm:flex-row flex-col sm:gap-80 gap-10  sm:items-start items-center min-h-screen relative top-32 pb-20">
        {cartStatus === "loading" && <p>Loading...</p>}
        {cartStatus === "failed" && <p>Error loading data from DB.</p>}
        {cartStatus === "succeeded" && cartdata ? (
          <div>
            <h1 className="sm:text-4xl text-2xl mb-6 font-semibold">Bag</h1>
            {cartdata && cartdata.items && cartdata.items.map((item) => (
              <div key={item._id}>
                <div className="left-cart flex-col flex sm:w-2/3 w-[90vw] pr-8">
                  <div className="bagContainer w-80 ">
                    <div className="cartitem flex mb-6 border-b pb-4 gap-6">
                      <div className="w-1/2">
                        <div className="img mr-8 w-40 h-40">
                          {item?.productId?.images && item?.productId?.images[0] && (
                            <Image
                              src={item.productId.images[0]}
                              className="w-full h-full object-cover"
                              alt="Product"
                              width={150}
                              height={150}
                            />
                          )}
                        </div>
                      </div>
                      <div className="w-1/2">

                        <div className="leftContent flex flex-col">
                          <h2 className="sm:text-xl text-md sm:font-semibold font-medium truncate">
                            {item?.productId?.productTitle}
                          </h2>
                          <h3 className="text-gray-600 text-[14px]">
                            {item?.productId?.category}
                          </h3>
                          <h3 className="text-black text-[16px] mt-2">
                            Quantity : &nbsp;{item?.quantity}
                          </h3>
                        </div>
                        <div className="sm:text-xl text-lg sm:font-semibold font-medium mt-2">

                          <div className="flex items-center">
                            <Image
                              src="/icons/indianrupeesicon.svg"
                              width={18}
                              height={18}
                              alt="rupees"
                              className="mr-1"
                            />
                            {(item?.productId?.totalPrice || 0) * (item?.quantity || 0)}
                          </div>
                          {/* <div className="input-group p-1 inline-flex rounded-full border text-xl font-medium items-center">
                            <div className="input-group-prepend">
                              <button
                                onClick={() =>
                                  handleItemDecr()

                                }
                                className="hover:bg-zinc-200 w-9 h-9 rounded-full flex items-center justify-center"
                              >
                                -
                              </button>
                            </div>
                            <p className="form-control w-10 text-center inline-flex items-center justify-center mx-1">
                              {1}
                            </p>
                            <div className="input-group-prepend">
                              <button
                                onClick={() =>
                                  handleItemDecr()
                                }
                                className="hover:bg-zinc-200 w-9 h-9 rounded-full flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div> */}
                          <div className="icons flex items-center mt-4 space-x-6">
                            <Image
                              src="/icons/delete-icon.svg"
                              width={21}
                              height={21}
                              alt="delete"
                              className="hover:text-slate-500 cursor-pointer"
                              onClick={() => handleDelete(item?.productId?._id)}
                            />
                            <Image
                              src="/icons/like.svg"
                              width={21}
                              height={21}
                              alt="heart"
                              className="text-red-700 hover:text-red-500 cursor-pointer"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* <p>No data is available here. Please add some item in cart page.</p> */}
            <Emptycart />
          </>
        )}
        {cartStatus === "succeeded" && cartdata && (
          <div className="right-cart flex flex-col sm:w-1/3 w-[90vw] p-4 ">
            <h1 className="text-xl font-semibold mb-6">
              Order Summary
            </h1>
            <div className="subtotal flex justify-between items-center mb-4 opacity-70">
              <div className="text-base">Subtotal</div>
              <div className="text-base font-bold flex">
                <Image
                  src="/icons/indianrupeesicon.svg"
                  width={20}
                  height={20}
                  alt="rupees"
                />
                {totalPrice}
              </div>
            </div>
            <div className="deliveryCharges flex justify-between items-center mb-4 opacity-70">
              <div className="text-base">Delivery Charges</div>
              <div className="text-base font-bold flex">
                {/* <Image
                  src="/icons/indianrupeesicon.svg"
                  width={18}
                  height={18}
                  alt="rupees"
                /> */}
                <span>-</span>
              </div>
            </div>
            <hr className="my-4 border-black border-[1px]" />
            <div className="total flex justify-between items-center mb-6">
              <div className="text-lg font-semibold">
                Total
              </div>
              <div className="text-3xl font-semibold flex">
                <Image
                  src="/icons/indianrupeesicon.svg"
                  width={25}
                  height={25}
                  alt="rupees"
                />
                {totalPrice}
              </div>
            </div>
            <div className="text-sm mb-4">Quantity: {quantities}</div>
            <Link
              href={{
                pathname: "/checkout",
                query: {
                  search: "cart",
                },
              }}
              className="memberCheckout my-4 flex items-center justify-center"
            >
              <button className="bg-black text-white w-full sm:w-[40vw] sm:h-14 h-9 rounded-full hover:bg-gray-900 transition duration-300">
                Guest Checkout
              </button>
            </Link>
            <Link
              href={{
                pathname: "/checkout",
                query: {
                  search: "cart",
                },
              }}
              className="memberCheckout my-4 flex items-center justify-center"
            >
              <button className="bg-black text-white w-full sm:w-[40vw] sm:h-14 h-9 rounded-full hover:bg-gray-900 transition duration-300">
                Member Checkout
              </button>
            </Link>
          </div>

        )}
      </div>
      <div className="middle-cart">
        {selectedItems && Object.values(selectedItems).map((item) => (
          <div key={item.id} className="cartitem flex mb-6 border-b pb-4">
            <div className="img w-48 h-48 mr-8">
              <img
                src={item?.image}
                className="w-full h-full object-cover rounded-md"
                alt={item?.title}
              />
            </div>
            <div className="cartContent flex flex-col justify-between">
              <div className="mainright">
                <div className="leftContent flex flex-col">
                  <h2 className="sm:text-xl text-lg sm:font-semibold font-medium  mb-2">
                    {item?.title}
                  </h2>
                  <h3 className="text-gray-600">{item?.category}</h3>
                </div>
                <div className="flex rightContent sm:text-xl text-lg sm:font-semibold font-medium">
                  <Image
                    src="/icons/indianrupeesicon.svg"
                    width={20}
                    height={15}
                    alt="rupees"
                    className=""
                  />{item?.price}
                </div>
                <div className="icons flex items-center space-x-2 mt-4 justify-around">
                  <img
                    src="/icons/delete-icon.svg"
                    alt="delete"
                    className="w-6 h-6 hover:text-slate-500 cursor-pointer "
                  />
                  <img
                    src="/icons/info.svg"
                    alt="broken heart"
                    className="text-red-700 hover:text-red-500 cursor-pointer w-6 h-6"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCart;
