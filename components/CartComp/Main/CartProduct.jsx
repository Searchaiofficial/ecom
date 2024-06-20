"use client";
import { selectQuantity } from "@/components/Features/Slices/calculationSlice";
import {
  selecteddbItems,
  selectedorderid,
  setDbItems,
} from "@/components/Features/Slices/cartSlice";

import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartProduct = ({
  cartItem,
  handleItemDecr,
  handleItemIncr,
  handleItemDelete,
}) => {

  const dbItems = useSelector(selecteddbItems)
  console.log(dbItems)
  return (
    <>
      <div className="">
        <div className=" py-[24px] items-start flex gap-5 lg:gap-8  border-b border-slate-400 mt-3 mb-3">
          {/* <!-- image of product --> */}

          <Image
            src={cartItem.productId.images[0]}
            width={249}
            height={249}
            alt={cartItem.name}
            className="w-[88px] h-[88px] lg:w-32 lg:h-40 "
          />
          {/* <div className=" border-gray-400 w-32 flex items-center justify-center bg-gray-300 rounded-sm text-sm mx-7 my-2">
                  505.390.75
                </div> */}

          <div className="flex">
            <div className=" flex flex-col">
              <p className=" font-[700] flex justify-between ">
                {" "}
                <div className="sm:text-xl text-md sm:font-semibold font-medium truncate">{cartItem?.name}</div>
                {/* <div className="text-[14px] md:text-[20px]  lg:text-xl">Rs. {cartItem?.price.toFixed(2)}</div> */}
              </p>
              <p className="my-2 text-gray-800 text-[12px] md:text-[16px]  lg:text-md ">
                Room darkening curtains, 1 pair, yellow-beige
              </p>
              <p className="my-1 text-gray-600 text-[12px] md:text-[16px]  lg:text-md">135x250 cm (53x98 ")</p>
              <p className=" text-gray-600 text-[12px] md:text-[16px]  lg:text-md">1.18 kg per piece</p>
              <p className=" my-2">
                <span className=" box-border h-1 w-10  rounded-xl mr-3 text-xs text-gray-400 bg-slate-400">
                  .d.
                </span>
                <span className=" text-gray-600 text-xs underline">
                  Go to checkout for delivery information
                </span>
              </p>
              <div className="flex items-center justify-between mt-[5px] md:w-2/3   ">
                <div className="input-group p-1 inline-flex rounded-full border text-xl font-medium items-center">
                  <div className="input-group-prepend">
                    <button
                      onClick={() =>
                        handleItemDecr(cartItem?.productId._id, cartItem.quantity)
                      }
                      className="hover:bg-zinc-200 w-9 h-9 rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                  </div>
                  <p className="form-control w-10 text-center inline-flex items-center justify-center mx-1">
                    {cartItem.quantity}
                  </p>
                  <div className="input-group-prepend">
                    <button
                      onClick={() =>
                        handleItemIncr(cartItem?.productId._id, cartItem.quantity)
                      }
                      className="hover:bg-zinc-200 w-9 h-9 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="">
                  <Image
                    src="/icons/like.svg"
                    width={20}
                    height={20}
                    alt="Arrow"
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
                <button
                  onClick={() => handleItemDelete(cartItem?.productId._id)}
                  className=""
                >
                  <Image
                    src="/icons/delete-icon.svg"
                    width={20}
                    height={20}
                    alt="Arrow"
                    className="w-6 h-6 cursor-pointer"
                  />
                </button>
              </div>
            </div>
            <div className="w-[100px] lg:w-auto">
              <div className="sm:text-xl text-md sm:font-semibold font-medium ">
                <div className="flex items-center">
                  <Image
                    src="/icons/indianrupeesicon.svg"
                    width={18}
                    height={18}
                    alt="rupees"
                    className="mr-1"
                  /> {cartItem?.price.toFixed(2)}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
