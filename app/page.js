import HomePage from "@/components/home/HomePage";
import Splashscreen from "@/components/Splashscreen/Splashscreen";
import SaveDeviceIdLocalstorage from "@/utils/SaveDeviceIdLocalstorage ";
// <<<<<<< HEAD
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectSliderData } from "@/components/Features/Slices/sliderSlice";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import Link from "next/link";
// const HomePage = dynamic(() => import("@/components/home/HomePage"));

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {

  return (
    <>
      <SaveDeviceIdLocalstorage />

        <div className="flex items-center lg:right-6 right-12 bottom-12  lg:bottom-5 gap-[8px] rounded-lg  fixed z-50">
          <div>
            <Image src="/ayatrio icon/store-chat.jpg" width={35} height={35} className="lg:w-[35px] w-[50px] h-[50px]  lg:h-[35px] rounded-full" />
          </div>
          <div className="lg:flex flex-col hidden">
            <p className="text-[14px] font-semibold text-[#1D1D1F]">Need shopping help?</p>
            <Link href="">
              <p className="text-blue-500 text-[14px] font-normal">Ask a specialist</p>
            </Link>
          </div>
        </div>
      <Suspense fallback={<Splashscreen />}>
        <HomePage />
      </Suspense>
    </>
  );
}

export const dynamic = "force-dynamic"