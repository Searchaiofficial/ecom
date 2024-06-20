"use client"

import React, { useRef, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "./styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MultiCardContent from "../compounds/MultiCardContent";
import { useSelector, useDispatch } from "react-redux";
import { selectMultiCardData } from "../Features/Slices/multiCardSlice";




const Multicard = () => {
  const swiper1Ref = useRef(null);
  const multiCardData = useSelector(selectMultiCardData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (multiCardData.length === 0) {
      dispatch({ type: "FETCH_MULTICARD_REQUEST", payload: "multiCard" });
    }
  }, []);


  return (
    <div>
      <div className="bg-zinc-50 pt-[5rem] sm:pl-[50px] pl-[20px] mt-[50px] lg:mt-0 lg:pl-[67px] overflow-x-auto pb-[80px] lg:pb-[80px]">
        <div className="text-2xl flex flex-col gap-[2px]  font-semibold w-full pb-8">
          <p>Why Ayatrio so innovative</p>

          <p>for home furnishing.</p>
        </div>
        <Swiper
          ref={swiper1Ref}
          // scrollbar={{
          //   hide: false,
          //   draggable: true,
          // }}
          mousewheel={{
            forceToAxis: true,
            invert: false,
          }}
          freeMode={{
            enabled: false,
            sticky: true,
          }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation={{
            nextEl: ".right",
            prevEl: ".back",
          }}
          draggable={false}
          style={{ "--swiper-navigation-size": "24px" }}
          breakpoints={{
            300: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
          }}
        >
          {multiCardData.map((curElement, idx) => {
            return (
              <SwiperSlide key={idx}>
                <MultiCardContent
                  title={curElement.title}
                  text={curElement.description}
                  iconPath={curElement.icon}
                  iconSize={40}
                />
              </SwiperSlide>
            );
          })}

          <div className="flex flex-row items-end justify-end gap-4">
            <Image
              src="/icons/backarrow-w.svg"
              width={20}
              height={20}
              alt="Arrow"
              className="back rounded-full h-7 w-7 hover:opacity-100"
            />
            <Image
              src="/icons/rightarrow-w.svg"
              width={20}
              height={20}
              alt="Arrow"
              className="right lg:mr-16 mr-6 rounded-full h-7 w-7 hover:opacity-100"
            />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Multicard;
