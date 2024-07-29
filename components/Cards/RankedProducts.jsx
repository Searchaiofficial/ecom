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
import {
  selectRecommendationLoader,
  selectRecommendationStatus,
  selectRecommendedProduct,
} from "../Features/Slices/recommendationSlice";

const RankedProducts = () => {
  const [data, setData] = useState([]);
  const colors = [
    { header: "#848c71", rank: "#f5c518" },
    { header: "#7c6e65", rank: "#f5c518" },
  ];
  const rankedData = useSelector(selectRankedProductsData);
  const dispatch = useDispatch();
  const recommended = useSelector(selectRecommendedProduct);
  const isRecommendedLoading = useSelector(selectRecommendationLoader);
  const recommendedStatus = useSelector(selectRecommendationStatus);

  useEffect(() => {
    if (recommendedStatus === "idle" && !isRecommendedLoading) {
      dispatch({ type: "RECOMMENDATION_REQUEST" });
    }
  }, [dispatch, isRecommendedLoading, recommendedStatus]);

  useEffect(() => {
    dispatch({ type: "FETCH_RANKED_DATA", payload: "rankedProducts" });
  }, []);

  useEffect(() => {
    if (rankedData.length === 0) {
      dispatch({ type: "FETCH_RANKED_DATA", payload: "rankedProducts" });
    }
  }, [rankedData]);

  useEffect(() => {
    if (rankedData.length > 0) {
      const categories = recommended?.recommendations?.recommendedProducts?.map(
        (item) => item.category
      );
      let uniqueCategories = [...new Set(categories)];
      uniqueCategories = uniqueCategories.slice(0, 4);
      const data = rankedData.filter(
        (item) => !uniqueCategories.includes(item.category)
      );
      setData(data);
    }
  }, [rankedData, recommended]);

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
    <>
      {data && data.length > 0 && (
        <div className="py-20">
          <div className="mb-2 pl-[10px] w-full flex justify-between items-center">
            <h2 className=" font-semibold text-2xl pb-[20px] lg:pt-[30px]">
              Top Saler
            </h2>
          </div>
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
      )}
    </>
  );
};

export default RankedProducts;
