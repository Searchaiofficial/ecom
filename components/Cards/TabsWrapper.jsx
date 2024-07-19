"use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectRecommendedProduct } from "../Features/Slices/recommendationSlice";
import dynamic from "next/dynamic";
const Tabs = dynamic(() => import("./Tabs"));

const TabsWrapper = () => {
  // const [recommended, setRecommended] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [dataFetched, setDataFetched] = useState(false);
  // const dispatch = useDispatch();
  // const selectData = useSelector(selectRecommendedProduct);

  // useEffect(() => {
  //   if (!dataFetched) {
  //     dispatch({ type: "RECOMMENDATION_REQUEST" });
  //     setDataFetched(true);
  //   }

  //   if (selectData) {
  //     setRecommended(selectData.recommendations?.recommendedProducts);
  //   }

  //   setLoading(false);
  // }, [dispatch, selectData, dataFetched]);

  // if (loading) {
  //   return null;
  // }

  // console.log(recommended)
  return <Tabs/>;
};

export default TabsWrapper;
