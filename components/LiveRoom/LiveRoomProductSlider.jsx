"use client";

import { register } from "swiper/element/bundle";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import { Pagination, Scrollbar, Mousewheel, FreeMode } from "swiper/modules";
// import "@/components/Cards//styles.css"
import "./styles.css";

const LiveRoomProductSlider = ({ products }) => {
  const swiperRef = useRef(null);
  const swiperOptions = {
    slidesPerView: 3,
    centeredSlides: false,
    spaceBetween: 5,
    modules: [Pagination, Scrollbar, Mousewheel, FreeMode],
    noSwiping: true,
    allowSlidePrev: true,
    allowSlideNext: true,
  };

  return (
    <div>
       <div className=" bg-white mt-[30px] lg:mt-0  px-[15px] ">
        <div className="w-full flex justify-between items-center">
        </div>{" "}
        <Swiper
          scrollbar={{
            hide: false,
            draggable: true,
          }}
          mousewheel={{
            forceToAxis: true,
            invert: false,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 5,
            },

            1024: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
          }}
          allowSlidePrev={true}
          allowSlideNext={true}
          ref={swiperRef}
          {...swiperOptions}
          className="mySwiper pl-5 overflow-x-auto"
        >
          {!products ? (
            <div>
              <h1>loading</h1>
            </div>
          ) : (
            products.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="grid grid-cols-1 gap-4 w-full h-full fade-in">
                    <Link
                      className="flex items-center justify-center"
                      href={`/${item.productTitle.replace(/ /g, "-")}`}
                    >
                      <div className=" flex gap-8 bg-white p-2">
                        <Image
                          loading="lazy"
                          src={item.images[0]}
                          width={200}
                          height={130}
                          className="h-[70px] object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold hover:underline">
                            {item.productTitle}
                          </p>
                          {item.specialprice?.price ? (
                            <div>
                              <p className=" text-sm font-semibold bg-yellow-400 price-box shadow-[3px_3px_rgb(173,_53,_53)] w-fit px-2 py-1">
                                Rs.
                                <span className="text-3xl">
                                  {item.specialprice?.price}
                                </span>
                              </p>
                              <p className="text-sm mt-2 text-gray-500">
                                Regular price: Rs.{item.perUnitPrice}
                              </p>

                              {item.specialprice.startDate &&
                                item.specialprice.endDate && (
                                  <p className="text-sm mt-1 text-gray-500">
                                    Price valid from {formattedDate.startDate}{" "}
                                    to {formattedDate.endDate}
                                  </p>
                                )}
                            </div>
                          ) : (
                            <p className="text-sm font-semibold">
                              Rs.
                              <span className="text-3xl">
                                {item.perUnitPrice}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>


  );
};

export default LiveRoomProductSlider;
