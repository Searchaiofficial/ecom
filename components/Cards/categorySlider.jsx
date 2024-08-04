"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import Link from "next/link";
import axios from "axios";

const CategoriesSlider = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    register();
  }, []);

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

  useEffect(() => {
    const params = {
      slidewperView: 4.08,
      centeredSlides: true,
      spaceBetween: 5,
      noSwiping: false,
      allowSlidePrev: true,
      allowSlideNext: true,
      mousewheel: {
        forceToAxis: true,
        invert: false,
      },
      breakpoints: {
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
      },
      navigation: {
        nextEl: ".right",
        prevEl: ".back",
      },
      sticky: true,
      draggable: true,
      freeMode: true,
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);

      swiperRef.current.initialize();
    }

    console.log("ref test", swiperRef.current);
  }, [swiperRef, swiperRef.current]);

  return (
    <div className="flex items-center justify-start">
      <div className=" pt-[2rem] lg:pt-[52px] pl-[15px]  overflow-x-auto  relative">
        {categories.length > 0 && (
          <div className="flex flex-row group items-center justify-end gap-2 lg:mb-4">
            <div className="back rounded-full   group-hover:opacity-60  opacity-0  absolute left-5 z-10">
              <Image
                loading="lazy"
                src="/icons/backarrow-w.svg"
                width={20}
                height={20}
                alt="Arrow"
                className=" h-[28px] lg:-mt-5  mb-[50px] sm:mb-0  w-[28px] "
              />
            </div>
            <swiper-container
              ref={swiperRef}
              init="false"
              style={{
                "--swiper-navigation-size": "24px",
                maxHeight: "180px",
                marginTop: "12px",
                width: "100%",
              }}
            >
              {categories?.map((curElement, idx) => {
                return (
                  <swiper-slide key={idx}>
                    <div className=" max-w-[100px] lg:max-w-[120px] mr-[10px] min-h-[95px] mb-[30px] md:mb-0 ">
                      <Link
                        href={`/${curElement.name.replace(
                          / /g,
                          "-"
                        )}/category/all`}
                      >
                        <div className="flex flex-col  items-center ">
                          <div className="mb-[12px] ">
                            <Image
                              src={curElement.image || "/images/temp.svg"}
                              width={200}
                              height={130}
                              alt={"category image"}
                              className="w-[200px] h-[62px] lg:h-[95px] "
                            />
                          </div>
                          <h2 className="text-[#333333] lg:text-center line-clamp-1 font-semibold text-[14px] hover:underline">
                            {curElement.name}
                          </h2>
                        </div>
                      </Link>
                    </div>
                  </swiper-slide>
                );
              })}
            </swiper-container>
            <div className="right rounded-full   group-hover:opacity-60 opacity-0   absolute right-5 z-10">
              <Image
                loading="lazy"
                src="/icons/rightarrow-w.svg"
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
