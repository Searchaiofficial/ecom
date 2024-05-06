"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
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
const Imagechanger = dynamic(() => import("../Imagechanger/Imagechanger"));
const Multicard = dynamic(() => import("../Imagechanger/Multicard"));
const Tabs = dynamic(() => import("./Tabs"));
const Profile = dynamic(() => import("./Profile"));
const Image = dynamic(() => import("../Imagechanger/Image"));
const Phone = dynamic(() => import("./Phone"));
const DoubleComp = dynamic(() => import("./DoubleComp"));
const Trending = dynamic(() => import("./Trending"));
const Suggestion = dynamic(() => import("./Suggestion"));
import Dataslider from "./Dataslider";
import { useDispatch, useSelector } from "react-redux";
import { selectRecommendedProduct } from "../Features/Slices/recommendationSlice";
import NewMainSlider from "../MainSlider/NewMainSlider";
import RoomTypes from "../Rooms/RoomTypes";
import Display from "./Display";
import RoomCard from "./RoomCard";
import Splashscreen from "../Splashscreen/Splashscreen";
const Cookies = dynamic(() => import("./Cookies"));

function Cards() {
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

    if (typeof window !== "undefined") {
      var id = localStorage.getItem("deviceId");
    }
  }, [dispatch, selectData, dataFetched]); // Include dataFetched in the dependency array

  const Partdata = (cat) => {
    return recommended.filter((item) => item.category === `${cat}`) || [];
  };

  const categories = recommended?.map((item) => item.category) || [];
  let uniqueCategories = [...new Set(categories)];
  // console.log("uniqueCategories", uniqueCategories);
  const MemoizedMainSlider = useMemo(() => <NewMainSlider />, []);
  const MemoizedProfileContent = useMemo(() => <Profile />, []);
  const MemoizedTrendingProducts = useMemo(() => <Trending />, []);

  const datasliderRefs = useRef([]);

  useEffect(() => {
    datasliderRefs.current = uniqueCategories.map(() => React.createRef());
  }, [uniqueCategories]);

  if (loading) {
    return <Splashscreen />;
  }

  if (typeof window !== "undefined") {
    var id = localStorage.getItem("deviceId");
  }
  return (
    <div className="w-full h-auto">
      {/* {MemoizedMainSlider} */}
      <NewMainSlider />

      <Cookies />
      {/* {MemoizedTrendingProducts} */}
      <Trending />

      <RoomCard />

      {uniqueCategories.slice(0, 2).map((item, index) => (
        <div key={item}>
          <Dataslider
            category={item}
            sliderIndex={index}
            data={Partdata(item)}
            ref={datasliderRefs.current[index]}
          />
        </div>
      ))}
      <Display />

      {uniqueCategories.slice(2).map((item, index) => (
        <div key={item}>
          <Dataslider
            category={item}
            sliderIndex={index + 2}
            data={Partdata(item)}
            ref={datasliderRefs.current[index + 2]}
          />
        </div>
      ))}

      <Multicard />

      <Suggestion />
      {/* <Image /> */}

      <div className="w-full sm:px-[50px] px-[20px]  h-auto">
        {/* <Imagechanger /> */}
      </div>

      {MemoizedProfileContent}
      <Tabs data={recommended} />
      <Phone />
      <Footer />
    </div>
  );
}

export default Cards;
