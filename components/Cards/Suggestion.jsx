"use client"

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PopUp from "../Reviews/PopUp";
import "./styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import { Pagination, Scrollbar, Mousewheel, FreeMode } from "swiper/modules";

import SuggestionCard from "./SuggestionCard";
import { useSelector, useDispatch } from "react-redux";
import { selectBlogCardData } from "../Features/Slices/blogCardSlice";

const Suggestion = () => {
  const blogCardData = useSelector(selectBlogCardData);
  const dispatch = useDispatch();

  const backgroundColors = [
    "bg-slate-500",
    "bg-blue-400",
    "bg-purple-300",
    "bg-gray-200",
    "bg-zinc-400",
  ];

  const [suggestionSlider, setSuggestionSlider] = useState([]);

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchAllSuggestions`;

  useEffect(() => {
    if (blogCardData.length === 0) {
      dispatch({ type: "FETCH_BLOG_CARD_DATA", payload: "blogCard" });
    }
    if (blogCardData) {
      setSuggestionSlider(blogCardData);
    }
  }, [blogCardData]);

  const swiperUseref = useRef(null);

  const swiperOptions2 = {
    slidesPerView: 4.08,
    centeredSlides: false,
    spaceBetween: 1,
    modules: [Pagination, Scrollbar, Mousewheel, FreeMode],
    navigation: {
      nextEl: ".custom-next-button",
      prevEl: ".custom-prev-button",
    },
    noSwiping: true,
    allowSlidePrev: true,
    allowSlideNext: true,
  };
  const closePopup = () => {
    setPopupVisible(false);
  };
  const swiper1Ref = useRef(null);
  const swiper2Ref = useRef(null);

  return (
    <div>
      <div className="pt-12 mb-20  bg-white sm:pl-[50px]  pl-[20px]  lg:pl-[80px]">
        <div className="mb-2 w-full flex justify-between items-center">
          <h2 className="font-semibold text-2xl py-[15px]">
            {suggestionSlider && suggestionSlider.length === 0
              ? "Inspiration and suggestion"
              : "Inspiration and suggestion"}
          </h2>
          <div className="Slidenav flex  bg-white text-2xl cursor-pointer  text-white rounded-full gap-2">
            <div
              onClick={() => swiper1Ref.current.swiper.slidePrev()}
              className="custom-prev-button bg-slate-500  rounded-full  hover:bg-400 hover:scale-110 hover:text-slate-100"
            ></div>
            <div
              onClick={() => swiper1Ref.current.swiper.slideNext()}
              className="custom-next-button bg-slate-500  rounded-full hover:bg-400 hover:scale-110 hover:text-slate-100"
            ></div>
          </div>
        </div>
        <Swiper
          ref={swiper1Ref}
          {...swiperOptions2}
          scrollbar={{
            hide: false,
            draggable: true,
          }}
          mousewheel={{
            forceToAxis: true,
            invert: false,
          }}
          freeMode={{
            enabled: false,
            sticky: true,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1.2,
              spaceBetween: 5,
            },

            640: {
              slidesPerView: 2.3,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 5,
            },
          }}
          allowSlideNext={true}
          allowSlidePrev={true}
          slideNextClass="custom-next-button"
          slidePrevClass="custom-prev-button"
          // onSwiper={setSwiperRef}
          className="px-10"
        >
          {!suggestionSlider ? (
            <SwiperSlide>
              <div className="flex"></div>
            </SwiperSlide>
          ) : (
            suggestionSlider.map((suggestion, idx) => {
              return (
                <SwiperSlide key={idx} className="ml-0">
                  <div className="">
                    <SuggestionCard
                      title={suggestion.heading}
                      desc={suggestion.shortSummary}
                      imgSrc={suggestion.suggestionCardImage}
                      key={idx}
                      bgColorClass={
                        backgroundColors[idx % backgroundColors.length]
                      }
                      id={suggestion._id}
                    />
                  </div>
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Suggestion;
