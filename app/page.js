"use client";
import Splashscreen from "@/components/Splashscreen/Splashscreen";
import SaveDeviceIdLocalstorage from "@/utils/SaveDeviceIdLocalstorage ";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSliderData } from "@/components/Features/Slices/sliderSlice";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
const HomePage = dynamic(() => import("@/components/home/HomePage"));

export default function Home() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const fetchData = () => {
    dispatch({
      type: "FETCH_SLIDER_VIEW_REQUEST",
      payload: {
        page: 1,
        limit: 4,
      },
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const dataSelector = useSelector(selectSliderData);
  useEffect(() => {
    if (dataSelector?.length > 0 && loading) {
      setLoading(false);
    }
  }, [dataSelector, loading]);
  return (
    <>
      <SaveDeviceIdLocalstorage />
      {loading ? <Splashscreen /> : null}
      {/* <p className="text-3xl text-green-500 font-bold right-0 bottom-3 fixed z-50">Deepanshu saini</p> */}
      <div className="flex items-center lg:right-6 right-3 bottom-5 gap-[8px] rounded-lg  fixed z-50">
        <div>
          <Image src="/ayatrio icon/store-chat.jpg" width={35} height={35} className="w-[35px] h-[35px] rounded-full" />
        </div>
        <div className="lg:flex flex-col hidden">
          <p className="text-[14px] font-semibold text-[#1D1D1F]">Need shopping help?</p>
          <Link href="">
            <p className="text-blue-500 text-[14px] font-normal">Ask a specialist</p>
          </Link>
        </div>
      </div>
      <HomePage />
    </>
  );
}
