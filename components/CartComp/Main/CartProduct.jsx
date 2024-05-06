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
  return (
    <>
      <div className="">
        <div className=" py-8 items-start flex gap-10  border-b border-slate-400  mb-3 mt-3">
          {/* <!-- image of product --> */}
          <div className="">
            <Image
              src={cartItem.productId.images[0]}
              width={249}
              height={249}
              alt={cartItem.name}
              className="rounded-xl w-[88px] h-[88px] lg:w-32 lg:h-40 ml-8"
            />
            {/* <div className=" border-gray-400 w-32 flex items-center justify-center bg-gray-300 rounded-sm text-sm mx-7 my-2">
                  505.390.75
                </div> */}
          </div>
          <div className="">
            <ul className=" list-none">
              <li className="  text-gray-600 font-[700] flex justify-between ">
                {" "}
                <div className=" text-[14px] md:text-[20px]  lg:text-xl">{cartItem?.name}</div>
                <div className="text-[14px] md:text-[20px]  lg:text-xl">Rs. {cartItem?.price.toFixed(2)}</div>
              </li>
              <li className=" text-gray-800 text-[14px] md:text-[20px]  lg:text-xl ">
                Room darkening curtains, 1 pair, yellow-beige
              </li>
              <li className="text-gray-800 text-[14px] md:text-[20px]  lg:text-xl">135x250 cm (53x98 ")</li>
              <li className=" text-gray-800 text-[14px] md:text-[20px]  lg:text-xl">1.18 kg per piece</li>
              <li className=" my-2">
                <span className=" box-border h-1 w-10  rounded-xl mr-3 text-xs text-gray-400 bg-slate-400">
                  .d.
                </span>
                <span className=" text-gray-500 text-xs">
                  Go to checkout for delivery information
                </span>
              </li>
            </ul>
            <div className="flex">
              <div className=" rounded-3xl border border-gray-400 flex gap items-center w-36 m-7 ">
                <button
                  onClick={() =>
                    handleItemDecr(cartItem?.productId._id, cartItem.quantity)
                  }
                  className=" border-gray-400 py-2 px-4"
                >
                  <Minus />
                </button>
                <p className="flex-grow py-2 px-4 font-bold leading-8">
                  {cartItem.quantity}
                </p>
                <button
                  onClick={() =>
                    handleItemIncr(cartItem?.productId._id, cartItem.quantity)
                  }
                  className=" border-gray-400 py-2 px-4"
                >
                  <Plus />
                </button>
              </div>
              <div className=" translate-y-10 mx-5">
                <Heart />
              </div>
              <button
                onClick={() => handleItemDelete(cartItem?.productId._id)}
                className="mx-5"
              >
                <Trash2 className=" " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
