"use client";
import { useDispatch } from "react-redux";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartProduct = ({
  cartItem,
  handleItemDecr,
  handleItemIncr,
  handleItemDelete,
}) => {
  // Calculate the total cost of selected services
  const totalServiceCost = cartItem?.selectedServices.reduce((total, service) => total + parseFloat(service.cost), 0);

  // Calculate the total price including services
  const totalPrice = cartItem?.price + totalServiceCost;

  console.log(cartItem);

  return (
    <>
      <div className="">
        <div className=" py-[24px] items-start flex gap-5 lg:gap-8 border-b border-slate-400 mt-3 mb-3">
          {/* <!-- image of product --> */}
          <Image
            src={cartItem.productId.images[0]}
            width={249}
            height={249}
            alt={cartItem.name}
            className="w-[88px] h-[88px] lg:w-32 lg:h-40 "
          />

          <div className="flex">
            <div className=" flex flex-col">
              <p className=" font-[700] flex justify-between ">
                <div className="sm:text-xl text-md sm:font-semibold font-medium truncate">
                  {cartItem?.name}
                </div>
              </p>
              <p className="my-2 text-gray-800 text-[12px] md:text-[16px]  lg:text-md ">
                Room darkening curtains, 1 pair, yellow-beige
              </p>
              <p className="my-1 text-gray-600 text-[12px] md:text-[16px]  lg:text-md">135x250 cm (53x98 ")</p>
              <p className=" text-gray-600 text-[12px] md:text-[16px]  lg:text-md">1.18 kg per piece</p>
              <p className=" my-2">
                <span className=" box-border h-1 w-10 rounded-xl mr-3 text-xs text-gray-400 bg-slate-400">
                  .d.
                </span>
                <span className=" text-gray-600 text-xs underline">
                  Go to checkout for delivery information
                </span>
              </p>
              {
                cartItem?.selectedServices?.length > 0 && (
                  <p className="text-[14px] font-semibold">Selected Services</p>
                )
              }
              <div className="flex items-center gap-4">
                {
                  cartItem?.selectedServices && (
                    cartItem?.selectedServices?.map((service) => (
                      <p className="text-[14px] text-gray-600 font-medium underline">{service.name}</p>
                    ))
                  )
                }
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className=" rounded-3xl p-2 lg:p-3 lg:w-36 w-[112px]  border border-gray-400 flex justify-between items-center">
                  <button
                    onClick={() =>
                      handleItemDecr(cartItem?.productId._id, cartItem.quantity)
                    }
                    className=" border-gray-400 "
                  >
                    <Minus />
                  </button>
                  <p className="font-bold ">
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
                  /> {totalPrice.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
