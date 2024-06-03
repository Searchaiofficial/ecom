"use client"

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
import {
  Pagination,
  Navigation,
  Scrollbar,
  Mousewheel,
  FreeMode,
  A11y,
} from "swiper/modules";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectTrendingData } from "../Features/Slices/trendingSlice";

const Trending = () => {
  const [newTrendingData, setNewTrendingData] = useState([]);
  const trendingData = useSelector(selectTrendingData);
  const dispatch = useDispatch();
  const [swiperRef, setSwiperRef] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleImageClick = () => {
    setPopupVisible(true);
  };
  useEffect(() => {
    if (trendingData.length === 0) {
      dispatch({ type: "FETCH_TRENDING_DATA", payload: "trending" });
      //console.log("trendingData fetched")
    }
    if (trendingData) {
      setNewTrendingData(trendingData);
    }
  }, [trendingData]);

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
  const closePopup = () => {
    setPopupVisible(false);
  };
  const swiper1Ref = useRef(null);
  const swiper2Ref = useRef(null);

  console.log(newTrendingData)






  return (
    <div>
      <div className="mb-20  bg-white px-[15px]">
        <div className="mb-2 w-full flex justify-between items-center">
          <h2 className="Blinds font-semibold text-2xl pb-[30px] lg:pt-[30px]">
            {newTrendingData && newTrendingData.length === 0
              ? "Most Family Choice(Empty)"
              : "Most Family Choice"}
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
          modules={[Navigation, Pagination, Mousewheel, Scrollbar, A11y]}
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
            momentum: true,
            momentumRatio: 0.5, // Adjust this value for softer scrolling
            momentumBounceRatio: 0.5,
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
          onSwiper={setSwiperRef}
          // allowTouchMove={false}
          noSwiping={true}
          style={{ paddingRight: "10px" }}
        >
          {!newTrendingData ? (
            <SwiperSlide>
              <div className="flex"></div>
            </SwiperSlide>
          ) : (
            newTrendingData.map((product, idx) => {
              {/* console.log(product.ratings) */ }
              return (
                <SwiperSlide key={idx} className="ml-0">
                  <div className="grid grid-cols-1 w-full h-full fade-in ">
                    <Card
                      title={product.productTitle}
                      // date={product.date}
                      productImages={product?.productImages}
                      specialPrice={product?.specialprice}
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
    </div>
  );
};

export default Trending;
