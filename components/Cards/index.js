// "use client";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../Footer/Footer"));
const Multicard = dynamic(() => import("../Imagechanger/Multicard"));
const TabsWrapper = dynamic(() => import("./TabsWrapper"));
const Profile = dynamic(() => import("./Profile"));
const Phone = dynamic(() => import("./Phone"));
// const Trending = dynamic(() => import("./Trending"));
const Suggestion = dynamic(() => import("./Suggestion"));
const Cookies = dynamic(() => import("./Cookies"));
const MulticardService = dynamic(() => import("./MultiCardService"));
const ShopByRoomSlider = dynamic(() => import("./ShopByRoomSlider"));
const Display = dynamic(() => import("./Display"));
const RoomCard = dynamic(() => import("./RoomCard"));
const DataSliderWrapper = dynamic(() => import("./DataSliderWrapper"));
const UserReviewPosts = dynamic(() => import("./UserReviewPosts"));

// import Display from "./Display";
// import RoomCard from "./RoomCard";
// import DataSliderWrapper from "./DataSliderWrapper";
// import UserReviewPosts from "./UserReviewPosts";

import MainSliderWrapper from "../MainSlider/MainSliderWrapper";
import CategoriesSlider from "./categorySlider";
import Trending from "./Trending";

function Cards() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("navigationItem");
  }

  return (
    <div className="w-full h-auto">
      <MainSliderWrapper />

      <div className="lg:px-[52px]">
        <CategoriesSlider />
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
      </div>

      <Multicard />
      <ShopByRoomSlider />
      <Profile />
      <Suggestion />

      <div className="sm:px-[50px]  px-[20px]  lg:px-[67px]">
        <UserReviewPosts slidesPerView={3.2} />
      </div>

      <MulticardService />

      <div className="lg:px-[52px]">
        <TabsWrapper />
        <Phone />
      </div>

      <Footer />
    </div>
  );
}

export default Cards;
