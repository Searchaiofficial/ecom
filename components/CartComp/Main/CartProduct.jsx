"use client";
import { useDispatch } from "react-redux";
import { Annoyed, Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const CartProduct = ({
  cartItem,
  handleItemDecr,
  handleItemIncr,
  handleItemDelete,
  handleServiceIncrease,
  handleServiceDecrease,
  handleAccessoriesIncrease,
  handleAccessoriesDecrease
}) => {
  // Calculate the total cost of selected services
  // const totalServiceCost = cartItem?.selectedServices.reduce((total, service) => total + parseFloat(service.cost), 0);

  // Calculate the total price including services

  const totalPrice = cartItem?.price;

  console.log("cartItem : ", cartItem);



  return (
    <>
      <div className="">
        <div className=" py-[24px] items-start flex gap-5 lg:gap-8 border-b border-slate-400 mt-3 ">
          {/* <!-- image of product --> */}
          <Image loading="lazy"
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
              {/* <p className="my-2 text-gray-800 text-[12px] md:text-[16px]  lg:text-md ">
                Room darkening curtains, 1 pair, yellow-beige
              </p> */}
              <p className="my-1 text-gray-600 text-[12px] md:text-[16px]  lg:text-md">{cartItem?.productId.productTitle}</p>
              <p className=" text-gray-600 text-[12px] md:text-[16px]  lg:text-md"></p>
              <p className=" my-2">
                <span className=" box-border h-1 w-10 rounded-xl mr-3 text-xs text-gray-400 bg-slate-400">
                  .d.
                </span>
                <span className=" text-gray-600 text-xs underline">
                  Go to checkout for delivery information
                </span>
              </p>
              <div className="flex items-center justify-between mt-2 ">
                <div className="rounded-3xl p-1 w-28 border border-gray-400 flex justify-between items-center mr-[20px]">
                  <button
                    onClick={() => handleItemDecr(cartItem?.productId._id, cartItem.quantity)}
                    className="hover:bg-zinc-200 w-9 h-9 rounded-full flex items-center justify-center focus:outline-none"
                  >
                    -
                  </button>
                  <p className="font-bold text-center mx-2">
                    {cartItem.quantity}
                  </p>
                  <button
                    onClick={() => handleItemIncr(cartItem?.productId._id, cartItem.quantity)}
                    className="hover:bg-zinc-200 w-9 h-9 rounded-full flex items-center justify-center focus:outline-none"
                  >
                    +
                  </button>
                </div>

                <div className="">
                  <Image loading="lazy"
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
                  <Image loading="lazy"
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
                  <Image loading="lazy"
                    src="/icons/indianrupeesicon.svg"
                    width={18}
                    height={18}
                    alt="rupees"
                    className="mr-1"
                  /> {(totalPrice * cartItem.quantity).toFixed(2)}</div>
              </div>
            </div>
          </div>

        </div>
        <div className="flex flex-col">
          {
            cartItem?.selectedServices?.length > 0 && (
              <div className="flex gap-14  py-5 border-b border-gray-400">
                <Image loading="lazy" src={"/icons/instalation.svg"} width={100} height={100} alt="installation icon" className="installation icon" />
                {/* <p className="text-[18px] font-semibold mt-4">Services for {cartItem.productId.category}</p> */}
                <div className="flex flex-col my-5 w-full gap-1">
                  {
                    cartItem?.selectedServices && (
                      cartItem?.selectedServices?.map((service) => (
                        <div className="flex w-full  items-center justify-between mt-2">
                          <p className="text-[18px] text-gray-600 font-medium hover:underline cursor-pointer">{service.name} for {cartItem.productId.category}</p>
                          <div className="flex items-center justify-between mt-2 ">
                            <div className="rounded-3xl p-1 w-28 border border-gray-400 flex justify-between items-center mr-[20px]">
                              <button
                                onClick={() => handleServiceDecrease(cartItem?.productId._id, service._id, service.quantity)}
                                className="hover:bg-zinc-200 w-9 h-9 rounded-full flex items-center justify-center focus:outline-none"
                              >
                                -
                              </button>
                              <p className="font-bold text-center mx-2">
                                {service.quantity}
                              </p>
                              <button
                                onClick={() => handleServiceIncrease(cartItem?.productId._id, service._id, service.quantity)}
                                className="hover:bg-zinc-200 w-9 h-9 rounded-full flex items-center justify-center focus:outline-none"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="text-xl flex items-center  font-semibold "><span className=" font-semibold text-[12px]">
                            <Image loading="lazy"
                              src="/icons/indianrupeesicon.svg"
                              width={18}
                              height={18}
                              alt="rupees"
                              className="mr-1"
                            /></span>{(service.cost) * (service?.quantity)}</div>
                        </div>
                      ))
                    )
                  }
                </div>
              </div>
            )
          }
        </div>
        {
          cartItem?.selectedAccessories?.length > 0 && (

            <div className="flex flex-col  pb-5 border-b border-gray-400">
              <p className="text-[18px] font-semibold mt-4">Accessories</p>
              <div className="flex  flex-col gap-10 mt-2">
                {
                  cartItem?.selectedAccessories && (
                    cartItem?.selectedAccessories?.map((product) => (
                      <div className="flex  ">
                        <Image loading="lazy" src={product?.images[0]} height={100} width={100} className="mr-[16px] h-[100px] w-[100px]" alt={product.productTitle} />
                        <div className="flex flex-col">
                          <div className="flex flex-col mx-[12px] max-w-[220px]">
                            <p className="text-[14px] font-bold text-[#484848]">{product.productTitle}</p>
                            <p className="text-[#484848] text-[12px] mb-[5px] line-clamp-1">{product?.shortDescription}</p>
                            <div className="font-bold items-end flex mb-1 my-[5px]">
                              <h2 className={`text-3xl leading-[0.5] tracking-wide ${product?.specialprice?.price ? "bg-[#FFD209] px-2 pt-3 w-fit shadow-lg" : ""} `} style={product?.specialprice?.price ? { boxShadow: '3px 3px #ad3535' } : {}}>
                                <span className="text-sm">Rs. &nbsp;</span>{" "}
                                {product?.specialprice?.price ? product?.specialprice?.price : product.perUnitPrice}
                              </h2>{" "}
                              <span> &nbsp;/roll</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2 ">
                            <div className="rounded-3xl p-1 w-28 border border-gray-400 flex justify-between items-center mr-[20px]">
                              <button
                                onClick={() => handleAccessoriesDecrease(cartItem?.productId._id, product._id, product.quantity)}
                                className="hover:bg-zinc-200 w-9 h-9 rounded-full flex items-center justify-center focus:outline-none"
                              >
                                -
                              </button>
                              <p className="font-bold text-center mx-2">
                                {product.quantity || 1}
                              </p>
                              <button
                                onClick={() => handleAccessoriesIncrease(cartItem?.productId._id, product._id, product.quantity)}
                                className="hover:bg-zinc-200 w-9 h-9 rounded-full flex items-center justify-center focus:outline-none"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="text-xl flex self-start md:ml-44 items-center  font-semibold "><span className=" font-semibold text-[12px]">
                          <Image loading="lazy"
                            src="/icons/indianrupeesicon.svg"
                            width={18}
                            height={18}
                            alt="rupees"
                            className="mr-1"
                          /></span>{(product.perUnitPrice) * (product?.quantity || 1)}</div>
                      </div>
                    ))
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </>
  );
};

export default CartProduct;
