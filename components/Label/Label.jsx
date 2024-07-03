"use client";

import React from "react";
import "./styles.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Label = ({ data }) => {
  const router = useRouter();
  console.log(data)
  const handleTab = () => {
    router.push(`/${data?.ProductLink}`);
  };

  console.log(data)
  return (
    <div className="absolute lg:top-2 lg:left-7 -left-12 top-[70px] z-50" onClick={handleTab}>
      <div
        className={`flex-row z-10 mt-5 box-container-product w-fit h-auto flex items-center  bg-white cursor-pointer`}
      >
        <div className="flex absolute bg-white" style={{ boxShadow: '0 1px 4px rgba(var(--colour-static-black, 17, 17, 17), 0.55)' }}>
          <div className="flex flex-row relative min-w-[138px] w-[138px]">
            <div
              className="flex flex-col basis-3/4 lg:w-28  flex-grow relative  m-[12px] "
            >
              <h1 className="text-[12px] line-clamp-1 mb-[4px]  text-[#0152be] font-semibold">
                Ayatrio Family price
              </h1>
              <h2 className="text-[12px] line-clamp-1  font-bold">
                {data?.productTitle}
              </h2>
              <p className="lg:text-[12px] line-clamp-1 text-[#484848]  text-[10px]">
                {data?.productCategory}
              </p>
              <div className="flex items-center gap-1 mt-[8px]">
                <sub className="text-[12px] font-semibold">Rs</sub>
                <p className="text-[24px] font-semibold">{data?.productPrice}</p>
              </div>
            </div>
            <div className="flex  top-16 border-l border-zinc-200">
              <Image
                className="flex self-center rotate-180   mx-[4px] "
                src="/icons/backarrow.svg"
                height={24}
                width={24}
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
