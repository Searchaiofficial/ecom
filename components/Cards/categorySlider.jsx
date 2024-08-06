"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  FreeMode,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import Link from "next/link";
import axios from "axios";
import CategorySliderSwiper from "./CategorySliderSwiper";

const CategoriesSlider = () => {
  const swiper1Ref = useRef(null);
  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trendingCategories`
      );
      console.log("categories", response.data);

      if (response.data && response.data.length > 0) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const breakpoints = {
    300: {
      slidesPerView: Math.min(categories?.length, 3.2),
      spaceBetween: 10,
    },
    768: {
      slidesPerView: Math.min(categories?.length, 3),
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: Math.min(categories?.length, 8),
      spaceBetween: 10,
    },
  };

  const swiperOptions2 = {
    slidesPerView: 4.08,
    centeredSlides: false,
    spaceBetween: 5,
    modules: [Pagination, Scrollbar, Mousewheel, FreeMode],
    navigation: {
      nextEl: ".custom-next-button",
      prevEl: ".custom-prev-button",
    },
    noSwiping: false,
    allowSlidePrev: true,
    allowSlideNext: true,
  };

  return (
    <div className="flex items-center justify-start">
      <div className=" pt-[2rem] lg:pt-[52px] pl-[15px]  overflow-x-auto  relative w-full">
        {categories.length > 0 && (
          <div className="flex flex-row group items-center justify-end gap-2 lg:mb-4">
            <div className="back rounded-full   group-hover:opacity-60  opacity-0  absolute left-5 z-10">
              <Image
                loading="lazy"
                src="/icons/backarrowhite.svg"
                width={20}
                height={20}
                alt="Arrow"
                className=" h-[28px] lg:-mt-5  mb-[50px] sm:mb-0  w-[28px] "
              />
            </div>
            <CategorySliderSwiper categories={categories} />
            <div className="right rounded-full   group-hover:opacity-60 opacity-0   absolute right-5 z-10">
              <Image
                loading="lazy"
                src="/icons/rightarro-white.svg"
                width={20}
                height={20}
                alt="Arrow"
                className="  h-[28px] lg:-mt-5 -mt-10 w-[28px] "
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesSlider;
