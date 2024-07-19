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
import { viewItem } from "@/tag-manager/events/view_item";

const ProductPage = ({ title, initialData }) => {
  const [data, setData] = useState(initialData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedData = useSelector(selectRoomData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!initialData) {
      dispatch({ type: "FETCH_ROOM_REQUEST", payload: title });
    }
  }, [title, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({
          type: "FETCH_IMAGE_DATA",
          payload: null,
        });
      } catch (error) {
        console.error("Error fetching cached data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

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

  useEffect(() => {
    if (data) {
      viewItem({ item: data });
    }
  }, [data]);

  return (
    <div className="px-4 sm:px-6">
      <div className="w-full gap-2 sm:mt-[96px] md:grid grid-cols-[2fr,1fr]">
        <div className="h-full w-full font-sans text-xs sm:text-sm sm:pl-10 py-2 flex flex-col">
          <div className="mb-4">
            <NavigationItem product={data} />
          </div>
          <RoomImageList images={data?.images} alt={data?.productTitle} />
          <ImageCaresoul images={data?.images} />
          <div className="block md:hidden relative z-[9999]">
            <Card
              data={data}
              productId={data._id}
              accessories={accessories}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
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
          <div
            className={`w-full h-fit sticky top-2 ${
              isModalOpen ? "z-[9999]" : ""
            }`}
          >
            <Card
              data={data}
              productId={data._id}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
      </div>
      <div className="sm:pl-10 sm:pr-4">
        <Carous data={data} />
      </div>
    </div>
  );
};

export default ProductPage;
