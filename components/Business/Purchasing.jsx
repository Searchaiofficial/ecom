"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRef, useEffect } from "react";

const Purchasing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    const params = {
      centeredSlides: false,
      spaceBetween: 10,
      navigation: {
        nextEl: ".right",
        prevEl: ".back",
      },
      noSwiping: false,
      allowSlidePrev: true,
      allowSlideNext: true,
      mousewheel: {
        forceToAxis: true,
        invert: false,
      },
      freeMode: {
        enabled: false,
        sticky: true,
        momentum: true,
        momentumRatio: 0.5,
        momentumBounceRatio: 0.5,
      },
      breakpoints: {
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
      },
      allowSlideNext: true,
      allowSlidePrev: true,
      noSwiping: true,
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);

      swiperRef.current.initialize?.();
    }
  }, [swiperRef, swiperRef.current]);
  const services = [
    {
      img: "/images/Business/tables.jpg",
      text: "Office",
      link: "https://www.ikea.cn/cn/en/ikea-business/office-furnishings/",
    },
    {
      img: "/images/Business/laps.jpg",
      text: "Welcome and socialize",
      link: "https://www.ikea.cn/cn/en/ikea-business/Welcome-and-Socialize/",
    },
    {
      img: "/images/Business/shower.jpg",
      text: "Hospitality",
      link: "https://www.ikea.cn/cn/en/ikea-business/hospitality-furnishings/",
    },
    {
      img: "/images/Business/man.jpg",
      text: "Restaurents and Cafes",
      link: "https://www.ikea.cn/cn/en/ikea-business/restaurant-cafe-furnishings/",
    },
    {
      img: "/images/Business/bed.jpg",
      text: "Reatil",
      link: "https://store-companion.ikea.cn/design-leads/ib.html?channel=IRW+M2&cl_sr=IB_IRW+M2",
    },
    {
      img: "/images/Business/company.jpg",
      text: "Residential Construction",
      link: "https://www.ikea.cn/cn/en/ikea-business/Welcome-and-Socialize/",
    },
  ];

  const itemsPerPage = 5;
  const totalItems = services.length;

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (totalItems - itemsPerPage + 1)
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (totalItems - itemsPerPage + 1)) %
        (totalItems - itemsPerPage + 1)
    );
  };

  return (
    <section className="bg-white p-20">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-semibold text-2xl  pt-[30px]">
          We offer professional and convenient one-stop purchasing at Ayatrio.
        </h2>
        <div className=" flex text-2xl cursor-pointer text-white rounded-full gap-4">
          <Image
            loading="lazy"
            src="/icons/backarrowblack.svg"
            width={20}
            height={20}
            alt="Arrow"
            className="back rounded-full h-7 w-7 "
          />
          <Image
            loading="lazy"
            src="/icons/rightarrowblack.svg"
            width={20}
            height={20}
            alt="Arrow"
            className="right  rounded-full h-7 w-7 "
          />
        </div>
      </div>{" "}
      <p className="my-5">
        Here, you'll find all the products and customized solutions you're
        looking for, regardless of which industry you're in, from large
        furniture to fine decorative touches.
      </p>
      <swiper-container
        init="false"
        style={{ "--swiper-navigation-size": "24px" }}
        ref={swiperRef}
      >
        {services.map((service, idx) => {
          return (
            <swiper-slide key={idx}>
              <a href="#" className="block text-center">
                <img
                  src={service.img}
                  alt="LOading...."
                  className="mb-2 object-cover w-full h-[380px]"
                />
                <p className="text-sm font-medium text-black relative mb-10">
                  {service.text}
                </p>
              </a>
            </swiper-slide>
          );
        })}
      </swiper-container>
      {/* <div className="relative overflow-hidden mt-4">
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-[100] bg-[#484848] text-white p-2 rounded-full"
          onClick={handlePrev}
        >
          ‹
        </button>
        <div className="flex overflow-x-auto">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {services.map((service, index) => (
              <div key={index} className="flex-none w-1/5 p-2">
                <a href="#" className="block text-center">
                  <img
                    src={service.img}
                    alt="LOading...."
                    className="mb-2 object-cover w-full h-[380px]"
                  />
                  <p className="text-sm font-medium text-black relative mb-10">
                    {service.text}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={handleNext}
        >
          ›
        </button>
      </div> */}
    </section>
  );
};

export default Purchasing;
