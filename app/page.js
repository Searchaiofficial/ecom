"use client";
import Splashscreen from "@/components/Splashscreen/Splashscreen";
import SaveDeviceIdLocalstorage from "@/utils/SaveDeviceIdLocalstorage ";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSliderData } from "@/components/Features/Slices/sliderSlice";
import dynamic from "next/dynamic";
const HomePage = dynamic(() => import("@/components/home/HomePage"));

export default function Home() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const fetchData = () => {
    dispatch({
      type: "FETCH_SLIDER_VIEW_REQUEST",
      payload: {
        page: 1,
        limit: 4,
      },
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const dataSelector = useSelector(selectSliderData);
  useEffect(() => {
    if (dataSelector?.length > 0 && loading) {
      setLoading(false);
    }
  }, [dataSelector, loading]);
  return (
    <>
      <SaveDeviceIdLocalstorage />
      {loading ? <Splashscreen /> : null}
      <HomePage />
    </>
  );
}
