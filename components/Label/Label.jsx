"use client";

import React from "react";
import "./styles.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Label = ({ data }) => {
  const router = useRouter();
  const handleTab = () => {
    router.push("/room");
  };
  return (
    <div className="absolute lg:top-2 lg:left-7 top-5 z-50" onClick={handleTab}>
      <div
        className={`flex-row z-10 mt-5 box-container-product w-fit h-auto flex items-center  bg-white cursor-pointer`}
      >
        <div className="flex absolute bg-white">
          <div className="flex flex-row relative">
            <div
              className="flex flex-col basis-3/4 lg:w-28  flex-grow relative p-2 lg:p-2.5 mr-1 gap-2"
            >
              <h1 className="lg:text-[12px] text-[10px] text-sky-700 font-[600]">
                AYATRIO Family price
              </h1>
              <h2 className="lg:text-[14px] text-[10px] font-bold">
                {data?.productTitle}
              </h2>
              <p className="lg:text-[14px] text-[10px]">
                {data?.productCategory}
              </p>
              <div className="flex items-center gap-1 text-2xl">
                <sub className="text-sm">Rs</sub>
                <p className="">{data?.productPrice}</p>
              </div>
            </div>
            <div className="flex basis-1/4 w-8 top-16 border-l border-zinc-200">
              <Image
                className="flex ml-2 mr-2 object-none"
                src="/svg/dropdown/nextarrow.png"
                height={20}
                width={20}
                alt="arrow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Label;
