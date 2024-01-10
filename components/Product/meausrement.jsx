import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const meausrement = () => {
  const circled = [
    {
      top: 50,
      left: 68,
      productTitle: "Bedroomhk...",
      productCategory: "Mountain view",
      price: 1900,
    },
  ];
  const router = useRouter();
  const handleTab = () => {
    router.push("/room");
  };
  return (
    <div className="flex sm:flex-row w-full h-auto flex-col sm:px-[50px] px-[20px] relative overflow-hidden ">
      <div className="relative max-h-[500px] ">
        <Image
          src="/product/curtain.avif"
          alt="curtain"
          width={700}
          height={300}
          style={{ objectFit: "cover" }}
        />
        <div className="text-md text-black carcular-conui  absolute top-16 left-10 rounded-full w-[30px] h-[30px]">
          <div className=" bg-white h-3 w-3 absolute rounded-full carcular-ui">
            <div
              className={`flex-row z-10 mt-6 box-container-product w-fit h-auto flex items-center  bg-white cursor-pointer`}
              onClick={handleTab}
            >
              <div className="flex flex-row relative">
                {circled.map((data) => (
                  <div
                    className="flex flex-col  basis-3/4 w-max flex-grow relative p-2.5"
                    key={data.productId}
                  >
                    <h2 className="font-bold pt-1 pr-2">{data.productTitle}</h2>
                    <p className="font-normal pb-2">{data.productCategory}</p>
                    <p className="font-bold bg-yellow-400 h-8 w-16 pl-2 main">
                      ₹{data.price}
                    </p>
                  </div>
                ))}
                <div className="absolute right-0 top-0 border-l border-black flex justify-end items-center h-full pr-1">
                  <Image
                    className="flex ml-2 mr-2"
                    src="/backarrowRevarce.svg"
                    height={20}
                    width={20}
                    alt="arrow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-md text-black carcular-conui absolute top-8 left-[26rem] rounded-full w-[30px] h-[30px]">
          <div className=" bg-white h-3 w-3 absolute rounded-full carcular-ui">
            <div
              className={`flex-row z-10 mt-6 box-container-product w-fit h-auto flex items-center  bg-white cursor-pointer`}
              onClick={handleTab}
            >
              <div className="flex flex-row relative">
                {circled.map((data) => (
                  <div
                    className="flex flex-col basis-3/4 w-max flex-grow relative p-2.5"
                    key={data.productId}
                  >
                    <h2 className="font-bold pt-1 pr-2">{data.productTitle}</h2>
                    <p className="font-normal pb-2">{data.productCategory}</p>
                    <p className="font-bold bg-yellow-400 h-8 w-16 pl-2 main">
                      ₹{data.price}
                    </p>
                  </div>
                ))}
                <div className="absolute right-0 top-0 border-l border-black flex justify-end items-center h-full pr-1">
                  <Image
                    className="flex ml-2 mr-2"
                    src="/backarrowRevarce.svg"
                    height={20}
                    width={20}
                    alt="arrow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:w-1/3  sm:h-auto sm:flex-grow bg-slate-300 sm:text-[30px] text-[20px] font-bold px-10 sm:py-10 py-5">
        <div className="flex flex-col sm:gap-72 gap-20 justify-between">
          <div>
            <p> Tips for choosing the right curtain length</p>
          </div>

          <div>
            <Image src="/arrow.svg" width={50} height={50} alt="arrow" className=" rotate-180" />

          </div>
        </div>
      </div>

    </div>
  );
};

export default meausrement;
