"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/Rank/Card";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import SwiperCore, {
  Pagination,
  Navigation,
  Scrollbar,
  Mousewheel,
  FreeMode,
  A11y,
} from "swiper/core";
import { useSelector, useDispatch } from "react-redux";
import { selectRankedProductsData } from "../Features/Slices/rankedProductsSlice";

const RankedProducts = () => {
  const rankedData = useSelector(selectRankedProductsData);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const colors = [
    { header: "#848c71", rank: "#f5c518" },
    { header: "#7c6e65", rank: "#f5c518" },
  ];

  useEffect(() => {
    dispatch({ type: "FETCH_RANKED_DATA", payload: "rankedProducts" });
  }, []);

  useEffect(() => {
    if (rankedData.length === 0) {
      dispatch({ type: "FETCH_RANKED_DATA", payload: "rankedProducts" });
    }
    if (rankedData) {
      setData(rankedData);
    }
  }, [rankedData]);

  SwiperCore.use([
    Pagination,
    Navigation,
    Scrollbar,
    Mousewheel,
    FreeMode,
    A11y,
  ]);

  const swiperOptions = {
    slidesPerView: 3.08,
    centeredSlides: false,
    spaceBetween: 5,
    navigation: {
      nextEl: ".custom-next-button",
      prevEl: ".custom-prev-button",
    },
    breakpoints: {
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
    },
    scrollbar: {
      hide: false,
      draggable: true,
    },
    mousewheel: {
      forceToAxis: true,
      invert: false,
    },
    freeMode: {
      enabled: true,
      sticky: true,
      momentum: true,
      momentumRatio: 0.5,
      momentumBounceRatio: 0.5,
    },
    draggable: true,
    touchEventsTarget: "wrapper",
  };

  return (
    <div className="py-20">
      <Swiper
        {...swiperOptions}
        style={{ paddingRight: "10px", paddingBottom: "10px" }}
      >
        {data &&
          data.map((item, index) => (
            <SwiperSlide key={index}>
              <Card
                category={item.category}
                products={item.products}
                colors={colors[index % 2]}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default RankedProducts;
