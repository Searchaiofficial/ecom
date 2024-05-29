"use client";
import Card from "@/components/Room/Other/Card";
import Reviews from "@/components/Room/Other/Reviews";
import RoomImageList from "@/components/Room/RoomImageList";
import RoomInfo from "@/components/Room/RoomInfo";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";
import BlogRelatedProducts from "@/components/Cards/BlogRelatedProducts";
import QuiltSelector from "@/components/Cards/QuiltSelector";
import { selectRecommendedProduct } from "@/components/Features/Slices/recommendationSlice";
import Tabs from "@/components/Cards/Tabs";

import TabImage from "@/components/Cards/TabImage";

import {
  selectSuggestionData,
  selectSuggestionStatus,
} from "@/components/Features/Slices/suggestionDataSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, FreeMode, Mousewheel, Navigation, Pagination, Scrollbar } from "swiper/modules";

const SuggestionPage = ({ params }) => {
  const id = params.id;

  const dispatch = useDispatch();
  const selectData = useSelector(selectRecommendedProduct);
  const suggestion = useSelector(selectSuggestionData);
  const suggestionStatus = useSelector(selectSuggestionStatus);
  // const [relatedProducts, setRelatedProducts] = useState([]);
  const swiper1Ref = useRef(null)

  useEffect(() => {
    if (suggestionStatus === "idle" || suggestionStatus === "failed") {
      dispatch({ type: "FETCH_SUGGESTION_DATA", payload: id });
    }
    // if (suggestion?.category?.length > 0) {
    //   const fetchRelatedProducts = async () => {
    //     const response = await axios.get(
    //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/relatedProducts?category=${suggestion.category[0]}`
    //     );
    //     setRelatedProducts(response.data);
    //   };
    //   fetchRelatedProducts();
    // }
  }, [id, suggestion]);

  const [recommended, setRecommended] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      dispatch({ type: "RECOMMENDATION_REQUEST" });
      setDataFetched(true);
    }

    if (selectData) {
      setRecommended(selectData.recommendations?.recommendedProducts);
    }

    if (typeof window !== "undefined") {
      var id = localStorage.getItem("deviceId");
    }
  }, [dispatch, selectData, dataFetched]); // Include dataFetched in the dependency array


  const [reviewRoom, setReviewRoom] = useState({});
  const [reviewData, setReviewData] = useState([]);

  const fetchRoomData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getRoomByQuery`,
        {
          params: {
            category: suggestion && suggestion.category && suggestion.category[0] || "",
          },
        }
      );
      setReviewRoom(response.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const fetchReviewData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSpecialReview`
      );
      setReviewData(response.data);
    } catch (error) {
      console.error("Error fetching review data:", error);
    }
  }

  useEffect(() => {
    fetchRoomData();
    fetchReviewData();
  }, [params, suggestion]);

  const swiperOptions2 = {
    slidesPerView: 4.08,
    centeredSlides: false,
    spaceBetween: 5,
    modules: [Pagination, Scrollbar, Mousewheel, FreeMode],
    noSwiping: true,
    allowSlidePrev: true,
    allowSlideNext: true,
  };
  const swiper1Ref = useRef(null);
  return (
    <>
      <div className="pt-36 px-[20px] sm:px-[50px] lg:px-[67px]">
        <div className="">
          <div>
            <div className="">
              <h1 className="lg:text-[30px] text-[24px] font-semibold ">
                {suggestion.heading}
              </h1>
              <p className="mt-5 line-clamp-3 lg:line-clamp-none lg:w-[70%] ">{suggestion.summary}</p>
            </div>
            <div className="relative mt-5 w-full lg:min-h-[730px] lg:max-h-[730px] min-h-[449px]">
              <Image
                src={suggestion.mainImage}
                alt="Main Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          <div className="mt-20">
            <h1 className="text-2xl font-semibold mb-[30px]">
              {suggestion.factors?.title}
            </h1>
            <Swiper
              ref={swiper1Ref}
              {...swiperOptions2}
              modules={[Navigation, Pagination, A11y]}
              navigation={{
                nextEl: ".right",
                prevEl: ".back",
              }}
              draggable={true}
              style={{
                "--swiper-navigation-size": "24px",
                maxHeight: "120px",
              }}
              mousewheel={{
                forceToAxis: true,
                invert: false,
              }}
              freeMode={{
                enabled: false,
                sticky: true,
              }}
              breakpoints={{
                300: {
                  slidesPerView: 2.5,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 7,
                  spaceBetween: 10,
                },
              }}
            >



              {suggestion.factors?.items.map((item, idx) => (
                <SwiperSlide key={idx} className="max-w-[130px]">
                  <div className="flex flex-col ">
                    <div className="mb-[12px] ">
                      <Image
                        src={item.image}
                        width={200}
                        height={130}
                        alt="image"
                        className="h-[70px] object-cover"
                      />
                    </div>
                    <h2 className="text-[#333333] text-[14px] hover:underline line-clamp-1 ">
                      {item.label}
                    </h2>
                  </div>

                </SwiperSlide>
              ))}

            </Swiper>
          </div>

          {suggestion &&
            suggestion.firstSlider &&
            suggestion.firstSlider.length > 0 && (
              <BlogRelatedProducts relatedProducts={suggestion.firstSlider} />
            )}

          {suggestion?.subHeading &&
            suggestion?.subHeading.map((subHeadingItem, index) => (
              <div className="my-20">
                <h1 className="text-2xl font-semibold">
                  {subHeadingItem.title}
                </h1>
                <p className="text-gray-700 mt-5 lg:w-[70%] line-clamp-3 lg:line-clamp-none ">
                  {subHeadingItem.subHeadingSummary}
                </p>
                <div className="mt-6 flex flex-col md:flex-row gap-3  items-center justify-between mx-auto">
                  {subHeadingItem.subHeadingImages.map((img) => (
                    <div className="relative h-[449px]  lg:min-h-[730px] w-full">
                      <Image
                        src={img}
                        alt="Sub Image"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* {suggestion && relatedProducts && relatedProducts.length > 0 && (
          <BlogRelatedProducts relatedProducts={relatedProducts} />
        )} */}

        {suggestion && suggestion.rooms && (
          <div className="">
            <div>
              <h3 className="text-2xl mb-5 font-semibold">Different Rooms</h3>
              <div className="flex lg:flex-row flex-col gap-3 w-full ">
                <div className="w-full lg:w-1/2">
                  <div className="relative my-2 h-[300px]">
                    <TabImage
                      src={suggestion.rooms[0].imgSrc}
                      alt={`Image  of Children`}
                      layout="fill"
                      width={1000}
                      height={1000}
                      objectFit="cover"
                      labelData={suggestion.rooms[0].children}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 ">
                  <div className="relative my-2 h-[300px]">
                    <TabImage
                      src={suggestion.rooms[1].imgSrc}
                      alt={`Image  of Children`}
                      layout="fill"
                      width={1000}
                      height={1000}
                      objectFit="cover"
                      labelData={suggestion.rooms[1].children}
                    />
                  </div>
                </div>
              </div>
            </div>







            {suggestion &&
              suggestion.secondSlider &&
              suggestion.secondSlider.length > 0 && (
                <BlogRelatedProducts
                  relatedProducts={suggestion.secondSlider}
                />
              )}
            <div>
              <h3 className="text-2xl mb-5 font-semibold mt-24">
                Different Rooms Different Design
              </h3>
              <div className="flex lg:flex-row flex-col gap-3 w-full ">
                <div className="w-full lg:w-1/2 ">
                  <div className="relative my-2 h-[300px]">
                    <TabImage
                      src={suggestion.rooms[2].imgSrc}
                      alt={`Image  of Children`}
                      layout="fill"
                      width={1000}
                      height={1000}
                      objectFit="cover"
                      labelData={suggestion.rooms[2].children}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="relative my-2 h-[300px]">
                    <TabImage
                      src={suggestion.rooms[3].imgSrc}
                      alt={`Image  of Children`}
                      width={1000}
                      height={1000}
                      layout="fill"
                      objectFit="cover"
                      labelData={suggestion.rooms[3].children}
                    />
                  </div>
                </div>
              </div>
            </div>


            <QuiltSelector />



            <div className="flex my-8  lg:max-h-[490px] lg:flex-row w-full flex-col">
              <div className="lg:w-2/3 h-[446px]">
                {reviewRoom && (

                  <TabImage
                    src={reviewRoom.imgSrc}
                    alt={`Image  of Children`}
                    width={1000}
                    height={446}
                    labelData={reviewRoom.children}
                  />

                )}
              </div>
              <div className="lg:w-1/3 min-h-[363px]  bg-zinc-100 p-10  lg:p-12">
                <div className="flex flex-col ">
                  <div>
                    <p>{reviewData && reviewData.comment}</p>
                  </div>
                  <div className="flex mt-5 flex-row items-center gap-2 ">
                    <Image
                      src={reviewData && reviewData.image}
                      width={45}
                      height={45}
                      alt="arrow"
                      className=" aspect-square object-cover rounded-full"
                    />
                    <p>{reviewData && reviewData.name}</p>
                  </div>
                </div>
              </div>
            </div>



            {suggestion &&
              suggestion.thirdSlider &&
              suggestion.thirdSlider.length > 0 && (
                <BlogRelatedProducts relatedProducts={suggestion.thirdSlider} />
              )}

            <Tabs data={recommended} />

          </div>
        )}
      </div>
    </>
  );
};

export default SuggestionPage;
