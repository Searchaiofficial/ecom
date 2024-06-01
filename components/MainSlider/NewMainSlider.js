"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Autoplay, Navigation } from "swiper/modules";
import SwiperCore from "swiper/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getSliderSuccess,
  selectSliderData,
  selectSliderLoader,
} from "../Features/Slices/sliderSlice";
import Splashscreen from "../Splashscreen/Splashscreen";

SwiperCore.use([Autoplay, Navigation]);

export default function NewMainSlider({ initialData }) {
  const dispatch = useDispatch();
  const SliderViewData = useSelector(selectSliderData);
  const isSliderLoading = useSelector(selectSliderLoader);

  const [page, setPage] = useState(1);
  useEffect(() => {
    if (initialData?.result?.length > 0) {
      dispatch(getSliderSuccess(initialData));
    } else {
      fetchData();
    }
  }, [page]);
  const fetchData = () => {
    dispatch({
      type: "FETCH_SLIDER_VIEW_REQUEST",
      payload: {
        page: page,
        limit: 4,
      },
    });
  };

  const [sliderApiData, setSliderApiData] = useState([]);
  useEffect(() => {
    if (SliderViewData && SliderViewData.result) {
      setSliderApiData(SliderViewData.result);
    }
  }, [SliderViewData]);
  const router = useRouter();
  const handleTab = () => {
    router.push("/room");
  };
  const [hov, setHov] = React.useState(false);
  const [navigationVisible, setNavigationVisible] = useState(false);
  const handleEnter = () => {
    setHov(true);
  };
  const handleLeave = () => {
    setHov(false);
  };

  if (isSliderLoading) {
    return <Splashscreen />;
  }

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);


  return (
    <div
      onMouseEnter={() => setNavigationVisible(true)}
      onMouseLeave={() => setNavigationVisible(false)}
    >
      <Swiper
        className="swiper-slider h-[78vh]"
        centeredSlides={true}
        grabCursor={true}
        loop={true}
        mousewheel={false}
        keyboard={{
          enabled: true,
        }}
        // Enabled autoplay mode
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        // If we need navigation
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        // Responsive breakpoints
        breakpoints={{
          412: {
            slidesPerView: 1,
            spaceBetween: 5,
          },

          640: {
            slidesPerView: 1.25,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 1.5,
            spaceBetween: 5,
          },
        }}
      >
        <div className={`${navigationVisible ? "block" : "hidden"}`}>
          <Image
            src="/ayatrio icon/left-card.svg"
            width={30}
            height={30}
            alt="arrow"
            className="  swiper-button-prev sm:-translate-y-[150px]  sm:translate-x-[-80.8vw] absolute left-0"
          />
        </div>

        {sliderApiData.map((data) => {

          return (
            <SwiperSlide key={data?._id}>
              <div className={`relative mt-[60px] sm:mt-0 group h-[78vh] lg:-translate-x-[5px] -translate-x-[10px] translate-r md:translate-x-0`}>
                <Image
                    src={windowWidth > 450 ? data?.desktopImgSrc : data?.mobileImgSrc}
                  fill
                  alt={data.imgTitle || "Swiper image"}
                  priority
                  className=" swiper-slide px-[10px] lg:px-[0px] w-full"
                  objectFit="cover"
                />
                <div className="absolute flex text-lg text-white sm:bottom-[2.5rem] bottom-[96px] left-[3rem] flex-col md:flex-row gap-4 md:items-center">
                  <div className="w-full md:w-auto flex gap-2 flex-col">
                    <p className="text-xl font-[500] drop-shadow-xl">
                      Buy all living room products.
                    </p>
                  </div>
                </div>
                <div className="absolute  sm:top-0 left-0 flex items-center justify-center w-full h-full transition-opacity opacity-0 group-hover:opacity-100">
                  <div onMouseEnter={handleEnter} className="cursor-pointer">
                    <div className="border-2 border-neutral-300 hover:border-white top-28 left-40 absolute hover:bg-[rgba(0,0,0,0.3)] rounded-full size-[30px] flex items-center justify-center transition-all duration-200 before:content-[''] before:size-3 before:bg-white  before:rounded-full before:hover:size-2 before:transition-all before:duration-200" />
                  </div>
                  {hov && (
                    <div
                      className={`flex-row z-10 p-2 sm:-ml-[350px] sm:-mt-[100px] flex items-center pb-3 bg-white cursor-pointer absolute top-36 sm:top-60 left-44 sm:left-[34rem] shadow-lg drop-shadow-2xl`}
                      onClick={handleTab}
                      onMouseLeave={handleLeave}
                    >
                      <div className="flex flex-row">
                        <div
                          className="flex flex-col basis-3/4 w-28 flex-grow ml-1 mr-2.5 text-[14px]"
                          key={data?._id}
                        >
                          <h2 className="font-[600]">
                            {data?.circles[0].productTitle}
                          </h2>
                          <p>{data?.circles[0].productCategory}</p>
                          <p className="flex items-center gap-1 text-2xl mt-1">
                            <sub className="text-[12px] font-bold">₹</sub>
                            {data?.circles[0].productPrice}
                          </p>
                        </div>
                        <div className="absolute top-0 right-0 flex items-center justify-end h-full">
                          <Image
                            className="flex mx-1 rotate-90"
                            src="/ayatrio icon/uparrow.svg"
                            height={20}
                            width={20}
                            alt="arrow"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <div className={`${navigationVisible ? "block" : "hidden"}`}>
          <Image
            src="/ayatrio icon/right-card.svg"
            width={30}
            height={30}
            alt="arrow"
            className={`swiper-button-next  hover:bg-opacity-50 sm:-translate-y-[150px] `}
          />
        </div>
      </Swiper>
    </div>
  );
}
