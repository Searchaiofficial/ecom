"use client";
import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
import {
  selectproductdata,
  selectproductstatus,
} from "../Features/Slices/compareSlice";
import "./styled.css";
// import Image from "next/image";
import Scene1 from "../Scene1/page";
import Scene2 from "../Scene2/page";

const CompareImage2 = ({ data }) => {
  // const [getImg, setGetImg] = useState(true);

  // const data = useSelector(selectproductdata);
  // const status = useSelector(selectproductstatus);

  // console.log(data)
  // console.log(status)
  // console.log(data[0].images[0])
  // console.log(data[1].images[0])

  // const beforeImage = data?.[0]?.images[0];
  // const afterImage = data?.[1]?.images[0];

  // console.log(beforeImage)
  // console.log(afterImage)
  // const neoImage = datas[2].images[0];

  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };


  // let texture_type = localStorage.getItem("texture_type");

  console.log(data);
  // const beforeImage = data?.[0]?.images[0];
  // const afterImage = data?.[1]?.images[0];

  return (
    <>
      <div className="text-center py-[20px] ">
        <h1 className="text-5xl py-[15px] ">Compare Products</h1>
        <p>
          Get help choosing.
          <span className="text-blue-600"> Chat with a Specialist</span>
        </p>
      </div>

      <div className="image-comparison relative w-[90vw]">
        <div className="images-container relative w-[100%] h-[100%]">
          {/* <img
            src={beforeImage}
            className="before-image absolute  h-[100%]"
            style={{
              width: "100%",
              clipPath: `polygon(0% 0%, ${sliderValue}% 0%, ${sliderValue}% 100%, 0% 100%)`,
            }}
          />

          <img
            src={afterImage}
            className="after-image absolute  h-[100%]"
            style={{
              width: "100%",
              clipPath: `polygon(${sliderValue}% 0, 100% 0, 100% 100%, ${sliderValue}% 100%)`,
            }}
          /> */}


          <div
            className="slider-line"
            style={{
              left: `${sliderValue}%`,
            }}
          ></div>
          <div
            className="slider-icon"
            style={{
              left: `${sliderValue}%`,
              width: "50px",
              height: "50px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              style={{ width: "50px", height: "50px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </div>

          <input
            type="range"
            className="slider"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
          />
        </div>
      </div>
    </>
  );
};

export default CompareImage2;
