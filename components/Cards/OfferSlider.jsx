"use client";

import Card from "./card";
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
import axios from "axios";

const OfferSlider = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [offer, setOffer] = useState({ type: "", products: [] });

  useEffect(() => {
    const fetchHighestPercentageOffer = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/highestPercentageOffer`;
      const response = await axios.get(url);
      setOffer({ type: response.data.offer, products: response.data.products });
    };

    fetchHighestPercentageOffer();
  }, [offer]);

  const swiperOptions2 = {
    slidesPerView: 4.08,
    centeredSlides: false,
    spaceBetween: 5,
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

  return (
    <div>
      {offer && offer.products && offer.products.length > 0 && (
        <div className="mb-10  bg-white px-[28px]">
          <div className="mb-2 w-full flex justify-between items-center">
            <h2 className="Blinds font-semibold text-2xl py-[30px]">
              Our Highest Offers - {offer.type}
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
          <PopUp isPopupVisible={isPopupVisible} closePopup={closePopup} />
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
                spaceBetween: 10,
              },

              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            allowSlideNext={true}
            allowSlidePrev={true}
            slideNextClass="custom-next-button"
            slidePrevClass="custom-prev-button"
            className="px-10"
          >
            {!offer.products ? (
              <SwiperSlide>
                <div className="flex"></div>
              </SwiperSlide>
            ) : (
              offer.products.map((product, idx) => {
                return (
                  <SwiperSlide key={idx} className="ml-0">
                    <div className="grid grid-cols-1 w-full h-full fade-in ">
                      <Card
                        title={product.productTitle}
                        price={product.perUnitPrice}
                        desc={product.productTitle}
                        demandtype={product.demandtype}
                        imgSrc={product.images}
                        rating={product.ratings}
                        key={idx}
                        id={product._id}
                        category={product.category}
                        productId={product.productId}
                        setPopupVisible={setPopupVisible}
                        cssClass={"card1flex"}
                      />
                    </div>
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default OfferSlider;
