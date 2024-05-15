"use client";
import Card from "@/components/Room/Other/Card";
import Reviews from "@/components/Room/Other/Reviews";
import RoomImageList from "@/components/Room/RoomImageList";
import RoomInfo from "@/components/Room/RoomInfo";
import React, { useEffect, useState } from "react";
import ImageCaresoul from "@/components/Room/imagecaresoul";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQuantity,
  updateQuantity,
} from "@/components/Features/Slices/calculationSlice";
import {
  selectRoomData,
  setRoomData,
} from "@/components/Features/Slices/roomSlice";
import axios from "axios";
import Carous from "@/components/Carousel/Carous";
const RoomPage = () => {
  const dispatch = useDispatch();
  const quantity = useSelector(selectQuantity);
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=`;
  const [howMuchScrolled, setHowMuchScrolled] = useState(0);
  const [data, setData] = useState([]);
  const selectedData = useSelector(selectRoomData);
  console.log("selectedData", selectedData);

  useEffect(() => {
    if (selectedData && Object.keys(selectedData).length !== 0) {
      sessionStorage?.setItem("roomData", JSON.stringify(selectedData));
    }
  }, [selectedData]);

  useEffect(() => {
    if (sessionStorage?.getItem("roomData")) {
      let cachedData = JSON.parse(sessionStorage?.getItem("roomData"));
      setData(cachedData);
      dispatch(setRoomData({ roomData: cachedData }));
      dispatch({
        type: "FETCH_IMAGE_DATA",
        payload: cachedData?.productImages[0]?.color,
      });
    }
  }, []);

  console.log(data);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHowMuchScrolled(window.scrollY);
      } else {
        setHowMuchScrolled(0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [howMuchScrolled]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isFilterVisible, setIsFilterVisible] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsFilterVisible(
        currentScrollPos <= prevScrollPos || currentScrollPos < 100
      );
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="overflow-y-auto container-rooms flex sm:block items-center px-[20px] sm:px-[50px] lg:px-[27px] ">
        <div className="mt-[65px]">
          <div className="flex sm:flex-row gap-8 flex-col">
            <div className="sm:basis-2/3 flex lg:pl-[40px] flex-col sm:flex-grow">
              <RoomImageList images={data?.images} />
              <ImageCaresoul images={data?.images} />
              <div className="block md:hidden">
                <Card data={data} />
              </div>
              <RoomInfo data={data} />
              <Reviews productId={data._id} data={data} />
            </div>
            <div className="md:basis-2/3 hidden  md:flex flex-col ">
              <div className="md:sticky flex top-9 mb-16 ml-0">
                <Card data={data} productId={data._id} />
              </div>
            </div>
          </div>
          <Carous data={data} />
        </div>
      </div>
    </>
  );
};

export default RoomPage;
