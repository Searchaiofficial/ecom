"use client";

import Card from "./card";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PopUp from "../Reviews/PopUp";
import "./styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import {
  Pagination,
  Navigation,
  Scrollbar,
  Mousewheel,
  FreeMode,
  A11y,
} from "swiper/modules";
import { useSelector, useDispatch } from "react-redux";
import { selectTrendingData } from "../Features/Slices/trendingSlice";
import { selecteddbItems } from "../Features/Slices/cartSlice";

const Trending = () => {
  const [newTrendingData, setNewTrendingData] = useState([]);
  // const [cartData, setCartData] = useState([]);
  const trendingData = useSelector(selectTrendingData);
  const dispatch = useDispatch();
  const [swiperRef, setSwiperRef] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const cartData = useSelector(selecteddbItems);
  const [TrendingData, setTrendingData] = useState([]);

  const handleImageClick = () => {
    setPopupVisible(true);
  };

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

  console.log(newTrendingData);

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

  console.log(cartData);

  const swiperOptions2 = {
    slidesPerView: 4.08,
    centeredSlides: false,
    spaceBetween: 5,
    modules: [Pagination, Scrollbar, Mousewheel, FreeMode],
    navigation: {
      nextEl: ".custom-next-button",
      prevEl: ".custom-prev-button",
    },
    noSwiping: false,
    allowSlidePrev: true,
    allowSlideNext: true,
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const swiper1Ref = useRef(null);
  const swiper2Ref = useRef(null);

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
          <div className="Slidenav flex bg-white text-2xl cursor-pointer text-white rounded-full gap-2">
            <div
              onClick={() => swiper1Ref.current.swiper.slidePrev()}
              className="custom-prev-button bg-slate-500 rounded-full hover:bg-400 hover:scale-110 hover:text-slate-100"
            ></div>
            <div
              onClick={() => swiper1Ref.current.swiper.slideNext()}
              className="custom-next-button bg-slate-500 rounded-full hover:bg-400 hover:scale-110 hover:text-slate-100"
            ></div>
          </div>
        </div>
        <PopUp isPopupVisible={isPopupVisible} closePopup={closePopup} />
        <Swiper
          ref={swiper1Ref}
          {...swiperOptions2}
          modules={[Navigation, Pagination, Mousewheel, Scrollbar, A11y]}
          scrollbar={{
            hide: false,
            draggable: true,
            el: ".swiper-scrollbar-custom",
          }}
          mousewheel={{
            forceToAxis: true,
            invert: false,
          }}
          freeMode={{
            enabled: false,
            sticky: true,
            momentum: true,
            momentumRatio: 0.5,
            momentumBounceRatio: 0.5,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          allowSlideNext={true}
          allowSlidePrev={true}
          slideNextClass="custom-next-button"
          slidePrevClass="custom-prev-button"
          onSwiper={setSwiperRef}
          noSwiping={true}
          style={{ paddingRight: "10px" }}
        >
          {!TrendingData ? (
            <SwiperSlide>
              <div className="flex"></div>
            </SwiperSlide>
          ) : (
            TrendingData.map((product, idx) => {
              const inCart = isProductInCart(product?._id);
              console.log("Product in cart prop for Card:", inCart);
              return (
                <SwiperSlide key={idx} className="ml-0">
                  <div className="grid grid-cols-1 w-full h-full fade-in">
                    <Card
                      title={product.productTitle}
                      productImages={product?.productImages}
                      specialPrice={product?.specialprice}
                      price={product.perUnitPrice}
                      desc={product.productTitle}
                      shortDescription={product.shortDescription}
                      demandtype={product.demandtype}
                      imgSrc={product.images}
                      rating={product.ratings}
                      key={idx}
                      id={product._id}
                      category={product.category}
                      productId={product.productId}
                      setPopupVisible={setPopupVisible}
                      cssClass={"card1flex"}
                      inCart={inCart}
                      totalPrice={product.totalPrice}
                      unitType={product.unitType}
                      productType={product.productType}
                      expectedDelivery={product.expectedDelivery}
                    />
                  </div>
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
        <div className="swiper-scrollbar-custom h-[2px]"></div>
      </div>
    </div>
  );
};

export default Trending;
