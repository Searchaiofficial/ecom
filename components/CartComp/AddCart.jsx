"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRoomData } from "../Features/Slices/roomSlice";
import { selectQuantity, updateQuantity } from "../Features/Slices/calculationSlice";
import { setDbItems } from "../Features/Slices/cartSlice";
import Link from "next/link";
import axios from "axios";

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
      dispatch(updateQuantity(quantityCart - 1));
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
                  <div className="bagContainer w-72">
                    <div className="cartitem flex mb-6 border-b pb-4">
                      <div className="img w-48 h-48 mr-8">
                        {item?.productId?.images && item?.productId?.images[0] && (
                          <Image
                            src={item.productId.images[0]}
                            className="w-full h-full object-cover rounded-md"
                            alt="Product"
                            width={150}
                            height={150}
                          />
                        )}
                      </div>
                      <div className="cartContent flex flex-col justify-between">
                        <div className="mainright">
                          <div className="leftContent flex flex-col">
                            <h2 className="sm:text-xl text-lg sm:font-semibold font-medium  mb-2">
                              {item?.productId?.productTitle}
                            </h2>
                            <h3 className="text-gray-600">
                              {item?.productId?.category}
                            </h3>
                            <h3 className="text-gray-600">
                              Quantity: &nbsp;{item?.quantity}
                            </h3>
                          </div>
                          <div className="rightContent sm:text-xl text-lg sm:font-semibold font-medium">
                            ₹ &nbsp;{(item?.productId?.totalPrice || 0) * (item?.quantity || 0)}
                          </div>
                          <div className="icons flex items-center space-x-2 mt-4">
                            <Image
                              src="/icons/info.svg"
                              width={25}
                              height={25}
                              alt="delete"
                              className="hover:text-slate-500 cursor-pointer"
                              onClick={() => handleDelete(item?.productId?._id)}
                            />
                            <Image
                              src="/icons/info.svg"
                              width={25}
                              height={25}
                              alt="broken heart"
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
          <p>No data is available here. Please add some item in cart page.</p>
        )}
        {cartStatus === "succeeded" && cartdata && (
          <div className="right-cart flex flex-col  sm:w-1/3 w-[80vw]">
            <h1 className="lg:text-4xl text-[16px] font-semibold mb-6">
              Order Summary
            </h1>
            <div className="subtotal flex justify-between items-center mb-4">
              <div className="lg:text-lg text-[14px]">Subtotal</div>
              <div className="text-lg sm:font-semibold font-medium">
                ₹ &nbsp;{totalPrice}
              </div>
            </div>
            <div className="deliveryCharges flex justify-between items-center mb-4">
              <div className="text-lg">Delivery Charges</div>
              <div className="text-lg sm:font-semibold font-medium">₹7</div>
            </div>
            <hr className="my-4" />
            <div className="total flex justify-between items-center mb-6">
              <div className="sm:text-xl text-lg sm:font-semibold font-medium">
                Total
              </div>
              <div className="sm:text-xl text-lg sm:font-semibold font-medium">
                ₹ &nbsp; {totalPrice + 7}
              </div>
            </div>
            <div>Quantity: {quantities}</div>
            <Link
              href={{
                pathname: "/checkout",
                query: {
                  search: "cart",
                },
              }}
              className="memberCheckout my-4 flex items-center justify-center"
            >
              <button className="bg-black text-white sm:w-full w-[40vw] sm:h-14 h-9 rounded-full hover:bg-gray-900 transition duration-300">
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
              <button className="bg-black text-white sm:w-full w-[40vw] sm:h-14 h-9 rounded-full hover:bg-gray-900 transition duration-300">
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
                <div className="rightContent sm:text-xl text-lg sm:font-semibold font-medium">
                  ₹{item?.price}
                </div>
                <div className="icons flex items-center space-x-2 mt-4">
                  <img
                    src="/icons/info.svg"
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
