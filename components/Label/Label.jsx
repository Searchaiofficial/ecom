"use client"

import React from "react";
import "./styles.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Label = ({ labelData }) => {
  const circledData = Array.isArray(labelData) ? labelData : [labelData];

  const router = useRouter();
  const handleTab = () => {
    router.push("/room");
  };
  return (
    <div className="absolute top-2 left-7" onClick={handleTab}>
      <div
        className={`flex-row z-10 mt-5 box-container-product w-fit h-auto flex items-center  bg-white cursor-pointer`}
      >
        <div className="flex flex-row relative">
          {circledData.map((data, idx) => (
            <div
              className="flex flex-col basis-3/4 w-28 flex-grow relative p-2.5 mr-1 gap-2"
              key={idx}
            >
              <h1 className="text-[12px] text-sky-700 font-[600]">
                AYATRIO Family price
              </h1>
              <h2 className="text-[14px] font-bold">
                {data?.productTitle}
              </h2>
              <p className="text-[14px]">{data?.productCategory}</p>
              <p className="flex items-center gap-1 text-2xl">
                <sub className="text-sm">Rs</sub>
                {data?.productPrice}
              </p>
            </div>
          ))}
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
  );
};

export default Label;
