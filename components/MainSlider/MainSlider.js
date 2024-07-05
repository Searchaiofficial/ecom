"use client";

import { register } from "swiper/element/bundle";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MainSlider = ({ initialData: { result: sliderData } }) => {
  const swiperRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(-1);
  const [isHovering, setIsHovering] = useState(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth <= 600) {
      setIsHovering(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [handleResize]);

  useEffect(() => {
    register();

    const params = {
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 10000,
        disableOnInteraction: true,
      },
      grabCursor: true,
      navigation: {
        nextEl: ".nav-next",
        prevEl: ".nav-prev",
      },
      spaceBetween: 5,
      breakpoints: {
        350: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        640: {
          slidesPerView: 1.25,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 1.36,
          spaceBetween: 5,
        },
      },
    };

    Object.assign(swiperRef.current, params);

    swiperRef.current.initialize();
  }, []);

  return (
    <div
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      className="w-full h-[78vh] mt-[6.3rem]"
    >
      <div
        className={`${
          isHovering
            ? "opacity-65 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition absolute nav-prev left-2 sm:left-4 top-1/2 cursor-pointer translate-y-1/2 z-30 rounded-full bg-white flex items-center justify-center p-1`}
      >
        <Image
          src="/icons/backarrow.svg"
          width={30}
          height={30}
          alt="arrow"
          className="transform transition-transform hover:scale-105"
        />
      </div>
      <div
        className={`${
          isHovering
            ? "opacity-65 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition absolute nav-next right-2 sm:right-4 rotate-180 cursor-pointer top-1/2 translate-y-1/2 z-30 rounded-full bg-white flex items-center justify-center p-1`}
      >
        <Image
          src="/icons/backarrow.svg"
          width={30}
          height={30}
          alt="arrow"
          className="transform transition-transform hover:scale-105"
        />
      </div>
      <swiper-container
        init="false"
        ref={swiperRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {sliderData.map((data) => {
          return (
            <>
              <swiper-slide>
                {!!data.link ? (
                  <Link href={`https://ayatrio.com/category/${data?.link}`}>
                    <Image
                      src={
                        windowWidth >= 600
                          ? data?.desktopImgSrc
                          : data?.mobileImgSrc
                      }
                      alt="slider"
                      className="w-full h-full object-fill"
                      fill
                    />
                  </Link>
                ) : (
                  <Image
                    src={
                      windowWidth >= 600
                        ? data?.desktopImgSrc
                        : data?.mobileImgSrc
                    }
                    alt="slider"
                    className="w-full h-full object-fill"
                    fill
                  />
                )}
                {data &&
                  data.circles.length > 0 &&
                  data.circles[0].productTitle && (
                    <div className="absolute  sm:top-0 left-0 flex items-center justify-center w-full h-full transition-opacity opacity-0 group-hover:opacity-100">
                      <div
                        onMouseEnter={handleEnter}
                        className="cursor-pointer"
                      >
                        <div
                          style={{
                            top: `${data?.circles[0].topPosition}%`,
                            left: `${data?.circles[0].leftPosition}%`,
                          }}
                          className="border-2 border-neutral-300 hover:border-white  absolute hover:bg-[rgba(0,0,0,0.3)] rounded-full size-[30px] flex items-center justify-center transition-all duration-200 before:content-[''] before:size-3 before:bg-white  before:rounded-full before:hover:size-2 before:transition-all before:duration-200"
                        >
                          {isHovering && (
                            <Link
                              className={`flex-row z-10 p-2  flex items-center pb-3 absolute lg:top-2 lg:left-7 -left-12 top-[70px] bg-white cursor-pointer  shadow-lg drop-shadow-2xl`}
                              onClick={handleTab}
                              onMouseLeave={handleLeave}
                              href={data?.circles[0].productLink}
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
                                    <sub className="text-[12px] font-bold">
                                      ₹
                                    </sub>
                                    {data?.circles[0].productPrice}
                                  </p>
                                </div>
                                <div className="absolute top-0 right-0 flex items-center justify-end h-full">
                                  <Image
                                    className="flex mx-1 rotate-90"
                                    src="/icons/uparrow.svg"
                                    height={20}
                                    width={20}
                                    alt="arrow"
                                  />
                                </div>
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
              </swiper-slide>
            </>
          );
        })}
      </swiper-container>
    </div>
  );
};

export default MainSlider;
