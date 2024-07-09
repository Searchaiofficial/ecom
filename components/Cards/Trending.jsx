"use client";

import React, { useEffect, useState } from "react";
import PopUp from "../Reviews/PopUp";
import "./styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import { useSelector, useDispatch } from "react-redux";
import { selectTrendingData } from "../Features/Slices/trendingSlice";
import { selecteddbItems } from "../Features/Slices/cartSlice";
import TrendingSlider from "./TrendingSlider";

const Trending = () => {
  const [newTrendingData, setNewTrendingData] = useState([]);
  // const [cartData, setCartData] = useState([]);
  const trendingData = useSelector(selectTrendingData);
  const dispatch = useDispatch();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const cartData = useSelector(selecteddbItems);
  const [TrendingData, setTrendingData] = useState([]);

  useEffect(() => {
    dispatch({ type: "FETCH_TRENDING_DATA", payload: "trending" });
  }, []);

  useEffect(() => {
    if (trendingData.length === 0) {
      dispatch({ type: "FETCH_TRENDING_DATA", payload: "trending" });
    }
    if (trendingData) {
      setNewTrendingData(trendingData);
    }
  }, [trendingData]);

  useEffect(() => {
    const trendindData = newTrendingData.filter(
      (item) => item.subcategory !== "Accessories"
    );
    console.log(trendindData);
    if (trendindData.length > 0) {
      setTrendingData(trendindData);
    }
  }, [newTrendingData]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
  //         {
  //           params: {
  //             deviceId: localStorage.getItem("deviceId"),
  //           },
  //         }
  //       );
  //       if (response.status !== 200) {
  //         throw new Error("HTTP status " + response.status);
  //       }
  //       const data = response.data;
  //       console.log("Fetched cart data:", data);

  //       // Ensure cartData is an array
  //       if (data && Array.isArray(data.items)) {
  //         setCartData(data.items);
  //       } else {
  //         console.error("Cart data items are not an array:", data);
  //         setCartData([]);
  //       }
  //     } catch (error) {
  //       console.log("Error fetching cart data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // console.log(cartData);

  const closePopup = () => {
    setPopupVisible(false);
  };

  const isProductInCart = (productId) => {
    console.log("Checking product ID:", productId);
    return cartData?.items?.some((cartItem) => {
      console.log(
        "Comparing with cart item product ID:",
        cartItem?.productId?._id
      );
      return cartItem?.productId?._id === productId;
    });
  };

  return (
    <div>
      <div className="mb-20 bg-white px-[15px]">
        <div className="mb-2 w-full flex justify-between items-center">
          <h2 className="Blinds font-semibold text-2xl pb-[20px] lg:pt-[30px]">
            {newTrendingData && newTrendingData.length === 0
              ? "Most Family Choice(Empty)"
              : "Most Family Choice"}
          </h2>
        </div>
        <PopUp isPopupVisible={isPopupVisible} closePopup={closePopup} />
        <TrendingSlider
          trendingData={TrendingData}
          isProductInCart={isProductInCart}
          setPopupVisible={setPopupVisible}
        />
        <div className="swiper-scrollbar-custom h-[2px]"></div>
      </div>
    </div>
  );
};

export default Trending;
