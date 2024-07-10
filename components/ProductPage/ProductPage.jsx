"use client";

import ImageCaresoul from "@/components/Room/imagecaresoul";
import { useEffect, useState } from "react";
import NavigationItem from "./NavigationItem";
import Card from "@/components/Room/Other/Card";
import RoomImageList from "../Room/RoomImageList";
import { useDispatch, useSelector } from "react-redux";
import { selectRoomData } from "../Features/Slices/roomSlice";
import RoomToolbar from "./RoomToolbar";
import RoomInfo from "../Room/RoomInfo";
import Reviews from "../Room/Other/Reviews";
import AccessoriesPosts from "../Cards/AccessoriesPosts";
import UserReviewPosts from "../Cards/UserReviewPosts";
import axios from "axios";
import Carous from "../Carousel/Carous";

const ProductPage = ({ title }) => {
  const [data, setData] = useState([]);

  const selectedData = useSelector(selectRoomData);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch room data based on the title
    dispatch({ type: "FETCH_ROOM_REQUEST", payload: title });
  }, [title, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = sessionStorage?.getItem("roomData");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setData(parsedData);
          dispatch(setRoomData({ roomData: parsedData }));
          if (parsedData?.productImages?.[0]?.color) {
            dispatch({
              type: "FETCH_IMAGE_DATA",
              payload: parsedData?.productImages[0]?.color,
            });
          } else {
            dispatch({
              type: "FETCH_IMAGE_DATA",
              payload: null,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching cached data:", error);
      }
    };

    fetchData();
  }, [dispatch]); // Fetch cached data only once when component mounts

  const [accessories, setAccessories] = useState([]);

  const fetchAccessories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/productByCategoryAndSubCategory?category=${data?.category}&subcategory=Accessories`
      );
      setAccessories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.category) {
      fetchAccessories();
    }
  }, [data]);

  useEffect(() => {
    if (selectedData && Object.keys(selectedData).length !== 0) {
      // Update cached data with selected data
      sessionStorage?.setItem("roomData", JSON.stringify(selectedData));
      setData(selectedData); // Update component state with selectedData
      if (selectedData?.productImages?.[0]?.color) {
        dispatch({
          type: "FETCH_IMAGE_DATA",
          payload: selectedData?.productImages[0]?.color,
        });
      } else {
        dispatch({
          type: "FETCH_IMAGE_DATA",
          payload: null,
        });
      }
    }
  }, [selectedData, dispatch]);

  return (
    <div className="px-4 sm:px-6">
      <div className="w-full gap-2 sm:mt-[96px] md:grid grid-cols-[2fr,1fr]">
        <div className="h-full w-full font-sans text-xs sm:text-sm sm:px-10 py-2 flex flex-col">
          <div className="mb-4">
            <NavigationItem product={data} />
          </div>
          <RoomImageList images={data?.images} alt={data?.productTitle} />
          <ImageCaresoul images={data?.images} />
          <div className="block md:hidden">
            <Card data={data} productId={data._id} accessories={accessories} />
          </div>
          <RoomToolbar data={data} />
          <RoomInfo data={data} />
          <Reviews productId={data._id} data={data} />
          <AccessoriesPosts accessories={accessories} />
          <UserReviewPosts
            slidesPerView={2.2}
            SubcategoryName={data.subcategory}
          />
        </div>
        <div className="h-full w-full relative p-4 hidden md:block">
          <div className="w-full h-fit sticky top-2">
            <Card data={data} productId={data._id} />
          </div>
        </div>
      </div>
      <Carous data={data} />
    </div>
  );
};

export default ProductPage;
