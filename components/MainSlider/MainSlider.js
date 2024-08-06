"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";

const MainSlider = ({ initialData: { result: sliderData } }) => {
  const swiperRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(600);
  const [isHovering, setIsHovering] = useState(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
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
      spaceBetween: 12,
      breakpoints: {
        350: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 1.25,
        },
        1024: {
          slidesPerView: 1.36,
        },
      },
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);

      swiperRef.current.initialize?.();
    }
  }, [swiperRef, swiperRef.current]);

  return (
    <div
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      className="w-full h-[78vh] max-h-[546px] min-h-[300px] sm:mt-[96px] px-[12px] sm:px-0"
    >
      <div
        role="button"
        aria-label="Previous slide"
        tabindex="0"
        className={`${
          isHovering
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition absolute nav-prev left-2 sm:left-4 top-1/2 cursor-pointer translate-y-1/2 z-30 rounded-full  hidden sm:flex items-center justify-center p-1 rotate-180`}
      >
        <Image
          src="/icons/rightarro-white.svg"
          width={30}
          height={30}
          alt="arrow"
          className="transform transition-transform hover:scale-105"
        />
      </div>
      <div
        role="button"
        aria-label="Next slide"
        tabindex="1"
        className={`${
          isHovering
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition absolute nav-next right-2 sm:right-4 cursor-pointer top-1/2 translate-y-1/2 z-30 rounded-full hidden sm:flex items-center justify-center p-1`}
      >
        <Image
          src="/icons/rightarro-white.svg"
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
              <SwiperSlide>
                {!!data.link ? (
                  <Link href={`https://ayatrio.com/category/${data?.link}`}>
                    <Image
                      src={
                        windowWidth >= 600
                          ? data?.desktopImgSrc
                          : data?.mobileImgSrc
                      }
                      alt="slider"
                      fill
                      priority
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
                    fill
                    priority
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
              </SwiperSlide>
            </>
          );
        })}
      </swiper-container>
    </div>
  );
};

export default MainSlider;
