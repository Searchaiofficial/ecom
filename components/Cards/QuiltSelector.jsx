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

import { useSelector, useDispatch } from "react-redux";
import { selectTrendingData } from "../Features/Slices/trendingSlice";
import Image from "next/image";

const QuiltSelector = () => {
  //   const [newTrendingData, setNewTrendingData] = useState([]);
  //   const trendingData = useSelector(selectTrendingData);
  //   const dispatch = useDispatch();
  const [swiperRef, setSwiperRef] = useState(null);
  //   const [isPopupVisible, setPopupVisible] = useState(false);
  //   const handleImageClick = () => {
  //     setPopupVisible(true);
  //   };
  //   useEffect(() => {
  //     if (trendingData.length === 0) {
  //       dispatch({ type: "FETCH_TRENDING_DATA", payload: "trending" });
  //       //console.log("trendingData fetched")
  //     }
  //     if (trendingData) {
  //       setNewTrendingData(trendingData);
  //     }
  //   }, [trendingData]);

  const quilts = [
    { imageUrl: 'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1716035443808_mainImage_mainImage.jpeg', temperature: '25°C', weatherTitle: 'Light and Comfortable Quilt for Warm Nights' },
    { imageUrl: 'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1716035443808_mainImage_mainImage.jpeg', temperature: '30°C', weatherTitle: 'Breathable Quilt for Hot and Humid Weather' },
    { imageUrl: 'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1716035443808_mainImage_mainImage.jpeg', temperature: '28°C', weatherTitle: 'Refreshing Quilt Perfect for Beachside Nights' },
    { imageUrl: 'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1716035443808_mainImage_mainImage.jpeg', temperature: '32°C', weatherTitle: 'Lightweight Quilt with Tropical Vibes' },
    { imageUrl: 'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1716035443808_mainImage_mainImage.jpeg', temperature: '27°C', weatherTitle: 'Soft and Cozy Quilt for Summer Evenings' },
    { imageUrl: 'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1716035443808_mainImage_mainImage.jpeg', temperature: '29°C', weatherTitle: 'Elegant Quilt for Stylish Summer Bedrooms' },
    { imageUrl: 'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1716035443808_mainImage_mainImage.jpeg', temperature: '26°C', weatherTitle: 'Quilt with Floral Designs for Summer Gardens' },
    { imageUrl: 'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1716035443808_mainImage_mainImage.jpeg', temperature: '31°C', weatherTitle: 'Modern Quilt for Urban Summer Living' }
  ];

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

  return (
    <div>
      <div className="pt-12 mb-20  bg-white">
        <div className="mb-2 w-full flex justify-between items-center">
          <h2 className="font-semibold text-2xl py-[15px]">
            {quilts && quilts.length === 0
              ? ""
              : "Pick a quilt according to ambient temperature"}
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
              slidesPerView: 1.1,
              spaceBetween: 10,
            },

            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          allowSlideNext={true}
          allowSlidePrev={true}
          slideNextClass="custom-next-button"
          slidePrevClass="custom-prev-button"
          //  onSwiper={setSwiperRef}
          className="px-10"
        >
          {!quilts ? (
            <SwiperSlide>
              <div className="flex"></div>
            </SwiperSlide>
          ) : (
            quilts.map((quilt, idx) => {
              return (
                <SwiperSlide key={idx} className="ml-0">
                  <div className="pb-8  cursor-pointer ">
                    <div className="flex h-full w-full items-center justify-center cursor-pointer  overflow-hidden">
                      <Image
                        src={quilt.imageUrl}
                        alt="NA"
                        height={600}
                        width={600}
                        className={"aspect-square w-full object-cover "}
                      />
                    </div>

                    <div
                      className={`bg-gray-400 px-4 py-8 h-[200px] overflow-hidden`}
                    >
                      <div className="text-lg font-semibold hover:underline  text-ellipsis mb-1">
                        {quilt.weatherTitle}
                      </div>
                      <p
                        className={`text-xs overflow-hidden text-ellipsis `}
                      >
                        Suitable for indoor temperature &gt; {quilt.temperature}
                      </p>
                    </div>
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

export default QuiltSelector;
