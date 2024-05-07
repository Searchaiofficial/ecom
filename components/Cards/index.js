"use client";
import dynamic from "next/dynamic";
import React from "react";
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

function Cards() {
  const MemoizedProfileContent = useMemo(() => <Profile />, []);

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

      <Multicard />

      <Suggestion />

      {MemoizedProfileContent}
      <Tabs />
      <Multicard />

      <Tabs data={recommended} />
      <Phone />
      <Footer />
    </div>
  );
}

export default Cards;
