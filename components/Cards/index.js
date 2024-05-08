import dynamic from "next/dynamic";
import "./styles.css";
const Footer = dynamic(() => import("../Footer/Footer"), {
  ssr: false,
});
const Multicard = dynamic(() => import("../Imagechanger/Multicard"));
const TabsWrapper = dynamic(() => import("./TabsWrapper"));
const Profile = dynamic(() => import("./Profile"));
const Phone = dynamic(() => import("./Phone"));
const Trending = dynamic(() => import("./Trending"));
const Suggestion = dynamic(() => import("./Suggestion"));
const Cookies = dynamic(() => import("./Cookies"));
// const NewMainSlider = dynamic(() => import("../MainSlider/NewMainSlider"));
// import NewMainSlider from "../MainSlider/NewMainSlider";
import Display from "./Display";
import RoomCard from "./RoomCard";
import DataSliderWrapper from "./DataSliderWrapper";
import { Suspense } from "react";
import MainSliderWrapper from "../MainSlider/MainSliderWrapper";

function Cards() {
  return (
    <div className="w-full h-auto">
      {/* <NewMainSlider /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <MainSliderWrapper />
      </Suspense>

      <Cookies />

      <Trending />

      <Suspense fallback={<div>Loading...</div>}>
        <RoomCard />
      </Suspense>

      <DataSliderWrapper />

      <Suspense fallback={<div>Loading...</div>}>
        <Display />
      </Suspense>

      <DataSliderWrapper
        sliderIndexStart={2}
        sliderIndexEnd={4}
        sliderIndexOffset={2}
      />

      <Suggestion />

      <Suspense fallback={<div>Loading...</div>}>
        <Profile />
      </Suspense>

      <TabsWrapper />
      <Multicard />

      <Phone />
      <Footer />
    </div>
  );
}

export default Cards;
