// "use client";
import dynamic from "next/dynamic";
import "./styles.css";
const Footer = dynamic(() => import("../Footer/Footer"));
const Multicard = dynamic(() => import("../Imagechanger/Multicard"));
const TabsWrapper = dynamic(() => import("./TabsWrapper"));
const Profile = dynamic(() => import("./Profile"));
const Phone = dynamic(() => import("./Phone"));
const Trending = dynamic(() => import("./Trending"));
const Suggestion = dynamic(() => import("./Suggestion"));
// <<<<<<< HEAD
// const MulticardService = dynamic(() => import("./MultiCardService"))
// import Dataslider from "./Dataslider";
// import { useDispatch, useSelector } from "react-redux";
// import { selectRecommendedProduct } from "../Features/Slices/recommendationSlice";
// import NewMainSlider from "../MainSlider/NewMainSlider";
// import RoomTypes from "../Rooms/RoomTypes";
// import Display from "./Display";
// import RoomCard from "./RoomCard";
// import CategoriesSlider from "./categorySlider"
// import Splashscreen from "../Splashscreen/Splashscreen";
// const Cookies = dynamic(() => import("./Cookies"));
// =======
const Cookies = dynamic(() => import("./Cookies"));
const MulticardService = dynamic(() => import("./MultiCardService"));
const ShopByRoomSlider = dynamic(() => import("./ShopByRoomSlider"));
import Display from "./Display";
import RoomCard from "./RoomCard";
import DataSliderWrapper from "./DataSliderWrapper";
import MainSliderWrapper from "../MainSlider/MainSliderWrapper";
import CategoriesSlider from "./categorySlider";
import OfferSlider from "./OfferSlider";

function Cards() {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div className="w-full h-auto">
      <MainSliderWrapper />

      <div className="lg:px-[52px]">
        <CategoriesSlider />
        <Cookies />
        <Trending />
        <RoomCard />
        {/* <OfferSlider /> */}
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
