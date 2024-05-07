"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { useMemo } from "react";
import "./styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
const Footer = dynamic(() => import("../Footer/Footer"), {
  ssr: false,
});
const Multicard = dynamic(() => import("../Imagechanger/Multicard"));
const Tabs = dynamic(() => import("./Tabs"));
const Profile = dynamic(() => import("./Profile"));
const Phone = dynamic(() => import("./Phone"));
const Trending = dynamic(() => import("./Trending"));
const Suggestion = dynamic(() => import("./Suggestion"));
const Cookies = dynamic(() => import("./Cookies"));
import NewMainSlider from "../MainSlider/NewMainSlider";
import Display from "./Display";
import RoomCard from "./RoomCard";
import DataSliderWrapper from "./DataSliderWrapper";
import { useDispatch, useSelector } from "react-redux";
import { selectRecommendedProduct } from "../Features/Slices/recommendationSlice";

function Cards() {
  const MemoizedProfileContent = useMemo(() => <Profile />, []);

  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const dispatch = useDispatch();
  const selectData = useSelector(selectRecommendedProduct);

  useEffect(() => {
    if (!dataFetched) {
      dispatch({ type: "RECOMMENDATION_REQUEST" });
      setDataFetched(true);
    }

    if (selectData) {
      setRecommended(selectData.recommendations?.recommendedProducts);
    }

    setLoading(false);
  }, [dispatch, selectData, dataFetched]);

  if (loading) {
    return null;
  }

  return (
    <div className="w-full h-auto">
      <NewMainSlider />

      <Cookies />

      <Trending />

      <RoomCard />

      <DataSliderWrapper />

      <Display />

      <DataSliderWrapper
        sliderIndexStart={2}
        sliderIndexEnd={4}
        sliderIndexOffset={2}
      />

      <Suggestion />

      {MemoizedProfileContent}
      <Tabs data={recommended}/>
      <Multicard />

      <Phone />
      <Footer />
    </div>
  );
}

export default Cards;
