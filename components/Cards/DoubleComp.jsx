import React, { useEffect } from "react";
import Image from "next/image";
import Double from "./Double";
import { useSelector, useDispatch } from "react-redux";
import { selectMusicData } from "../Features/Slices/musicSectionSlice";
const DoubleComp = () => {
  const musicSwiperData = useSelector(selectMusicData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (musicSwiperData.length === 0) {
      dispatch({ type: "FETCH_MUSIC_DATA", payload: "music" })
    }
  }, [])
  //console.log(musicSwiperData)
  const gameImage = musicSwiperData[1]?.img[0]?.url;
  return (
    <div className="py-20 grid sm:grid-cols-2 grid-cols-1 sm:w-auto w-[100%] gap-2.5 sm:px-[50px] px-[20px]">
      <div className="col-span-1 ml-0 bg-zinc-100 text-black overflow-hidden">
        <div className="pl-4 pt-4">
          <div className="flex text-3xl  pl-0 pt-0">
            {" "}
            <Image src="/icons/appleicon.svg" height={30} width={30} alt="apple" />
            Music
          </div>
          <div className="text-md   pl-0"> Over 100 million songs.</div>
          <div className="text-md  pl-0 pb-5">
            Start listening for free today.
          </div>
          <div className="flex">
            <a href="#" className="flex  pr-0 ">
              Try it free <sup className="mt-3 text-[0.6rem]">10</sup>
            </a>
            <a href="#" className="flex ">
              Learn more{" "}
              <img src="/images/right.webp" className=" ml-2 w-7 h-7" />
            </a>
          </div>
        </div>
        <div className="pt-36 ml-[-1rem]">
          <Double />
        </div>
      </div>
      <div className="col-span-1  mr-0 bg-zinc-100 text-black overflow-hidden">
        <div className="pl-4 pt-4">
          <div className="flex text-3xl pl-0 pt-0">
            <Image src="/icons/appleicon.svg" height={30} width={30} alt="apple" />
            Arcade
          </div>
          <div className="text-md  pl-0">Get 3 months of Apple Arcade free</div>
          <div className="text-md pl-0 pb-5">when you buy an iPhone.</div>
          <div className="flex pl-0 text-sky-600">
            <a href="#" className="flex pr-4">
              Try it free <sup className="mt-3 text-[0.6rem]">11</sup>
            </a>
            <a href="#" className="flex">
              Learn more{" "}
              <img src="/images/right.webp" className="ml-1 w-7 h-7" />
            </a>
          </div>
        </div>
        <div className="mt-20">
          <Image
            width={1024}
            height={550}
            src={gameImage}
            className="object-cover"
            alt="Games"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default DoubleComp;
