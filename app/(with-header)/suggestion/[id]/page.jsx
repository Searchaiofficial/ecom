"use client";
import Card from "@/components/Room/Other/Card";
import Reviews from "@/components/Room/Other/Reviews";
import RoomImageList from "@/components/Room/RoomImageList";
import RoomInfo from "@/components/Room/RoomInfo";
import React, { useEffect, useState } from "react";
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
import Image from "next/image";
import BlogRelatedProducts from "@/components/Cards/BlogRelatedProducts";
import QuiltSelector from "@/components/Cards/QuiltSelector";
import { selectRecommendedProduct } from "@/components/Features/Slices/recommendationSlice";
import Tabs from "@/components/Cards/Tabs";
import { useParams } from "next/navigation";

import {
  selectSuggestionData,
  selectSuggestionStatus,
} from "@/components/Features/Slices/suggestionDataSlice";

const SuggestionPage = ({ params }) => {
  const id = params.id;

  const dispatch = useDispatch();
  const selectData = useSelector(selectRecommendedProduct);
  const suggestion = useSelector(selectSuggestionData);
  console.log(suggestion);
  const suggestionStatus = useSelector(selectSuggestionStatus);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (suggestionStatus === "idle" || suggestionStatus === "failed") {
      dispatch({ type: "FETCH_SUGGESTION_DATA", payload: id });
    }
    if (suggestion?.category?.length > 0) {
      const fetchRelatedProducts = async () => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/relatedProducts?category=${suggestion.category[0]}`
        );
        setRelatedProducts(response.data);
      };
      fetchRelatedProducts();
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

  return (
    <>
      <div className="pt-[65px]">
        <div className="sm:px-[50px] px-[20px]">
          <div>
            <div className="mt-10">
              <h1 className="text-lg md:text-2xl font-semibold text-center">
                {suggestion.heading}
              </h1>
              <p className="mt-2 text-sm ">{suggestion.summary}</p>
            </div>
            <div className="relative mt-6 h-60 md:h-[500px]">
              <Image
                src={suggestion.mainImage}
                alt="Main Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          <div className="mt-16">
            <h1 className="text-lg font-semibold">
              {suggestion.factors?.title}
            </h1>
            <div className="mt-4 flex gap-4">
              {suggestion.factors?.items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col  cursor-pointer gap-2 items-center justify-center"
                >
                  <div className="relative h-20 aspect-square">
                    <Image
                      src={item.image}
                      alt="Factor Image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="text-xs">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {suggestion?.subHeading &&
            suggestion?.subHeading.map((subHeadingItem, index) => (
              <div className="my-16">
                <h1 className="text-lg font-semibold">
                  {subHeadingItem.title}
                </h1>
                <p className="text-gray-700 mt-2 text-sm">
                  {subHeadingItem.subHeadingSummary}
                </p>
                <div className="mt-6 flex flex-col md:flex-row gap-4  items-center justify-between mx-auto">
                  {subHeadingItem.subHeadingImages.map((img) => (
                    <div className="relative h-[400px]  md:h-[712px] w-full">
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

        <BlogRelatedProducts relatedProducts={relatedProducts} />
        <div className="sm:px-[50px] px-[20px]">
          <div>
            <h3 className="text-lg font-semibold">
              {suggestion.differentMaterials?.title}
            </h3>
            <div className="flex flex-wrap ">
              {suggestion.differentMaterials?.items.map((item) => (
                <div className="w-full md:w-1/2 p-2">
                  <p className="mt-2 text-sm font-medium">{item.label}</p>
                  <div className="relative my-2 h-[300px]">
                    <Image
                      src={item.image}
                      alt="Sub Image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Image
                      src={suggestion.suggestionCardImage}
                      alt="Sub Image"
                      width={50}
                      height={50}
                      objectFit="cover"
                      className="aspect-square"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-bold">Matress</h1>
                      <p className="text-sm">Memory foam</p>
                      <p className="font-bold">Rs 400</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-lg font-semibold">
              {suggestion.differentMaterials?.chooseDifferentMaterial?.title}
            </h3>
            <p className="mt-2 text-sm">
              {
                suggestion.differentMaterials?.chooseDifferentMaterial
                  ?.description
              }
            </p>
            <div className="flex flex-wrap mt-8 gap-16">
              <div className="flex gap-4 items-center">
                <div className="h-12 w-12 rounded-md justify-center items-center  flex flex-col bg-black text-white text-xs">
                  <p>Free</p>
                  <p>
                    {
                      suggestion.differentMaterials?.chooseDifferentMaterial
                        ?.material?.guaranteePeriod
                    }
                  </p>
                </div>
                <div className="flex-col text-xs flex">
                  <h1>
                    Ayatrio{" "}
                    {
                      suggestion.differentMaterials?.chooseDifferentMaterial
                        ?.material?.name
                    }{" "}
                    offer{" "}
                    {
                      suggestion.differentMaterials?.chooseDifferentMaterial
                        ?.material?.guaranteePeriod
                    }{" "}
                    guarantee
                  </h1>
                  <p>Refer to the product page for details</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="h-12 w-12 rounded-md justify-center items-center  flex flex-col bg-black text-white text-xs">
                  <p>Recycling</p>
                  <p>
                    {
                      suggestion.differentMaterials?.chooseDifferentMaterial
                        ?.material?.recyclingFee
                    }
                  </p>
                </div>
                <div className="flex-col text-xs flex">
                  <h1>
                    {
                      suggestion.differentMaterials?.chooseDifferentMaterial
                        ?.material?.name
                    }{" "}
                    recycling service
                  </h1>
                  <h1 className="font-bold">
                    {
                      suggestion.differentMaterials?.chooseDifferentMaterial
                        ?.material?.recyclingFee
                    }
                    /piece
                  </h1>
                  <p>Refer to the product page for details</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="h-12 w-12 rounded-md justify-center items-center  flex flex-col bg-black text-white text-xs">
                  <p>Offer</p>
                  <p>
                    {
                      suggestion.differentMaterials?.chooseDifferentMaterial
                        ?.material?.trialSchema
                    }
                  </p>
                </div>
                <div className="flex-col text-xs flex">
                  <h1>
                    Ayatrio{" "}
                    {
                      suggestion.differentMaterials?.chooseDifferentMaterial
                        ?.material?.name
                    }{" "}
                    offer{" "}
                    {
                      suggestion.differentMaterials?.chooseDifferentMaterial
                        ?.material?.trialSchema
                    }
                  </h1>
                  <p>Refer to the product page for details</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-lg font-semibold">
              {suggestion.differentMaterials?.waysToImprove?.title}
            </h3>
            <p className="mt-2 text-sm">
              {suggestion.differentMaterials?.waysToImprove?.description}
            </p>

            <div className="flex flex-wrap ">
              {suggestion.differentMaterials?.waysToImprove?.items.map(
                (item) => (
                  <div className="w-full md:w-1/2 p-2">
                    <p className="mt-2 text-sm font-medium">{item.label}</p>
                    <div className="relative my-2 h-[300px]">
                      <Image
                        src={item.image}
                        alt="Sub Image"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src={suggestion.suggestionCardImage}
                        alt="Sub Image"
                        width={50}
                        height={50}
                        objectFit="cover"
                        className="aspect-square"
                      />
                      <div className="flex flex-col">
                        <h1 className="font-bold">Matress</h1>
                        <p className="text-sm">Memory foam</p>
                        <p className="font-bold">Rs 400</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <QuiltSelector />

        <Tabs data={recommended} />
      </div>
    </>
  );
};

export default SuggestionPage;
