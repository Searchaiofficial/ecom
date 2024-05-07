"use client";

import { useDispatch, useSelector } from "react-redux";
import Dataslider from "./Dataslider";
import { createRef, useEffect, useRef } from "react";
import {
  selectRecommendationLoader,
  selectRecommendationStatus,
  selectRecommendedProduct,
} from "../Features/Slices/recommendationSlice";

const DataSliderWrapper = ({
  sliderIndexOffset = 0,
  sliderIndexStart = 0,
  sliderIndexEnd = 2,
}) => {
  const dispatch = useDispatch();
  const recommended = useSelector(selectRecommendedProduct);
  const isRecommendedLoading = useSelector(selectRecommendationLoader);
  const recommendedStatus = useSelector(selectRecommendationStatus);

  useEffect(() => {
    if (recommendedStatus === "idle" && !isRecommendedLoading) {
      dispatch({ type: "RECOMMENDATION_REQUEST" });
    }
  }, [dispatch, isRecommendedLoading, recommendedStatus]);

  const Partdata = (cat) => {
    return (
      recommended?.recommendations?.recommendedProducts?.filter(
        (item) => item.category === `${cat}`
      ) || []
    );
  };

  const categories =
    recommended?.recommendations?.recommendedProducts?.map(
      (item) => item.category
    ) || [];
  let uniqueCategories = [...new Set(categories)];

  const datasliderRefs = useRef([]);

  useEffect(() => {
    datasliderRefs.current = uniqueCategories.map(() => createRef());
  }, [uniqueCategories]);

  if (isRecommendedLoading) {
    return null;
  }

  return (
    <>
      {uniqueCategories
        .slice(sliderIndexStart, sliderIndexEnd)
        .map((item, index) => (
          <div key={item}>
            <Dataslider
              category={item}
              sliderIndex={index + sliderIndexOffset}
              data={Partdata(item)}
              ref={datasliderRefs.current[index + sliderIndexStart]}
            />
          </div>
        ))}
    </>
  );
};

export default DataSliderWrapper;
