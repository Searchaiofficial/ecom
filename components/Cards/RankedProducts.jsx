"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectRankedProductsData } from "../Features/Slices/rankedProductsSlice";
import {
  selectRecommendationLoader,
  selectRecommendationStatus,
  selectRecommendedProduct,
} from "../Features/Slices/recommendationSlice";
import RankedProductsSlider from "./RankedProductsSlider";

const RankedProducts = () => {
  const [data, setData] = useState([]);
  const colors = [
    { header: "#848c71", rank: "#f5c518" },
    { header: "#7c6e65", rank: "#f5c518" },
  ];
  const rankedData = useSelector(selectRankedProductsData);
  const dispatch = useDispatch();
  const recommended = useSelector(selectRecommendedProduct);
  const isRecommendedLoading = useSelector(selectRecommendationLoader);
  const recommendedStatus = useSelector(selectRecommendationStatus);

  useEffect(() => {
    if (recommendedStatus === "idle" && !isRecommendedLoading) {
      dispatch({ type: "RECOMMENDATION_REQUEST" });
    }
  }, [dispatch, isRecommendedLoading, recommendedStatus]);

  useEffect(() => {
    dispatch({ type: "FETCH_RANKED_DATA", payload: "rankedProducts" });
  }, []);

  useEffect(() => {
    if (rankedData.length === 0) {
      dispatch({ type: "FETCH_RANKED_DATA", payload: "rankedProducts" });
    }
  }, [rankedData]);

  useEffect(() => {
    if (rankedData.length > 0) {
      const categories = recommended?.recommendations?.recommendedProducts?.map(
        (item) => item.category
      );
      let uniqueCategories = [...new Set(categories)];
      uniqueCategories = uniqueCategories.slice(0, 4);
      const data = rankedData.filter(
        (item) => !uniqueCategories.includes(item.category)
      );
      setData(data);
    }
  }, [rankedData, recommended]);

  return (
    <>
      {data && data.length > 0 && (
        <div className="py-20">
          <div className="mb-2 pl-[10px] w-full flex justify-between items-center">
            <h2 className=" font-semibold text-2xl pb-[20px] lg:pt-[30px]">
              Top Saler
            </h2>
          </div>
          <RankedProductsSlider data={data} colors={colors} />
        </div>
      )}
    </>
  );
};

export default RankedProducts;
