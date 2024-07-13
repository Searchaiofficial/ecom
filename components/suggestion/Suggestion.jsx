"use client";
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
import {
  A11y,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { usePathname } from "next/navigation";

const Suggestion = ({ id }) => {
  const pathname = usePathname();

  const dispatch = useDispatch();
  const selectData = useSelector(selectRecommendedProduct);
  const suggestion = useSelector(selectSuggestionData);
  const suggestionStatus = useSelector(selectSuggestionStatus);

  const handleSetItem = () => {
    const newItem = { label: "Blog", href: pathname };
    sessionStorage.setItem("navigationItem", JSON.stringify(newItem));
  };

  useEffect(() => {
    handleSetItem();
    if (suggestionStatus === "idle" || suggestionStatus === "failed") {
      dispatch({ type: "FETCH_SUGGESTION_DATA", payload: id });
    }
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
            category:
              (suggestion && suggestion.category && suggestion.category[0]) ||
              "",
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
  };

  useEffect(() => {
    fetchRoomData();
    fetchReviewData();
    console.log("suggestion", suggestion);
  }, [suggestion]);

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

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  return (
    <>
      <div className=" md:pt-10 px-[20px] sm:px-[50px] lg:px-[67px]">
        {suggestion &&
          suggestion.position &&
          suggestion.position.length > 0 &&
          suggestion.position.map((name, idx) => (
            <div key={idx} className="">
              {name === "heading" && (
                <div>
                  <div className="mt-20">
                    <h1 className="lg:text-[30px] text-[24px] font-semibold ">
                      {suggestion.heading}
                    </h1>
                    <p className="mt-5 line-clamp-3 lg:line-clamp-none lg:w-[70%] ">
                      {suggestion.summary}
                    </p>
                  </div>
                </div>
              )}
              {name === "mainImage" && (
                <div className="mt-20 relative w-full h-[550px]">
                  <TabImage
                    src={suggestion.mainImage.imgSrc}
                    alt={`Image  of Children`}
                    layout="fill"
                    width={1000}
                    height={1000}
                    objectFit="cover"
                    labelData={suggestion.mainImage.children}
                  />
                </div>
              )}
              {name === "twoGrid" && (
                <div className="mt-20">
                  <h1 className="text-2xl font-semibold">
                    {suggestion.twoGrid.twoGridHeader}
                  </h1>
                  <p className="text-gray-700 mt-5 lg:w-[70%] line-clamp-3 lg:line-clamp-none ">
                    {suggestion.twoGrid.twoGridDescription}
                  </p>
                  <div className="mt-6 flex flex-col md:flex-row gap-3  items-center justify-between mx-auto">
                    <div className="relative h-[449px]  lg:min-h-[730px] w-full">
                      <TabImage
                        src={suggestion.twoGrid.twoGridRooms[1].imgSrc}
                        alt={`Image  of Children`}
                        layout="fill"
                        width={1000}
                        height={1000}
                        objectFit="cover"
                        labelData={suggestion.twoGrid.twoGridRooms[1].children}
                      />
                    </div>
                    <div className="relative h-[449px]  lg:min-h-[730px] w-full">
                      <TabImage
                        src={suggestion.twoGrid.twoGridRooms[1].imgSrc}
                        alt={`Image  of Children`}
                        layout="fill"
                        width={1000}
                        height={1000}
                        objectFit="cover"
                        labelData={suggestion.twoGrid.twoGridRooms[1].children}
                      />
                    </div>
                  </div>
                </div>
              )}
              {name === "fiveGrid" && (
                <div className="mt-20">
                  <h1 className="text-2xl font-semibold">
                    {suggestion.fiveGrid.fiveGridHeader}
                  </h1>
                  <p className="text-gray-700 my-5 lg:w-[70%] line-clamp-3 lg:line-clamp-none ">
                    {suggestion.fiveGrid.fiveGridDescription}
                  </p>
                  <div className="flex justify-between mb-10">
                    <div className="w-full flex justify-center max-h-[915px] screens">
                      <div className="w-full lg:h-[730px] grid grid-cols-2 lg:grid-cols-12 gap-y-4 gap-x-4 auto-rows-fr">
                        {suggestion.fiveGrid.fiveGridRooms.map(
                          (room, index) => (
                            <div
                              key={index}
                              className={`parent ${
                                index === 0
                                  ? "col-start-1 col-end-3 row-start-1 row-end-6 lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:row-end-12"
                                  : index === 1
                                  ? "col-start-1 col-end-2 row-start-6 row-span-2 lg:col-start-7 lg:col-end-10 lg:row-start-1 lg:row-end-6"
                                  : index === 2
                                  ? "col-start-2 col-end-3 row-start-6 row-span-3 lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-7"
                                  : index === 3
                                  ? "col-start-1 col-end-2 row-start-8 row-span-3 lg:col-start-7 lg:col-end-10 lg:row-start-6 lg:row-end-12"
                                  : "col-start-2 col-end-3 row-start-9 row-span-2 lg:col-start-10 lg:col-end-13 lg:row-start-7 lg:row-end-12"
                              }`}
                              onMouseEnter={() => handleMouseEnter(index)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <div className="relative w-full h-full">
                                <TabImage
                                  src={room.imgSrc}
                                  alt={`Image of Children`}
                                  width={1000}
                                  height={338}
                                  labelData={room.children}
                                  hovered={hoveredIndex === index}
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {name === "firstSlider" && (
                <BlogRelatedProducts
                  relatedProducts={suggestion.firstSlider}
                />
              )}
              {name === "secondSlider" && (
                <BlogRelatedProducts
                  relatedProducts={suggestion.secondSlider}
                />
              )}
              {name === "thirdSlider" && (
                <BlogRelatedProducts
                  relatedProducts={suggestion.firstSlider}
                />
              )}
              {name === "forthSlider" && (
                <BlogRelatedProducts
                  relatedProducts={suggestion.secondSlider}
                />
              )}
              {name === "fifthSlider" && (
                <BlogRelatedProducts
                  relatedProducts={suggestion.secondSlider}
                />
              )}
            </div>
          ))}

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
                  loading="lazy"
                  src={reviewData && reviewData.image}
                  width={45}
                  height={45}
                  alt={reviewData && reviewData.name}
                  className=" aspect-square object-cover rounded-full"
                />
                <p>{reviewData && reviewData.name}</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs data={recommended} />
      </div>
    </>
  );
};

export default Suggestion;
