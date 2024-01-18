"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectproductdata,
  selectproductstatus,
} from "../Features/Slices/compareSlice";
import "./styled.css";

const CompareImage = () => {
  const datas = useSelector(selectproductdata);
  const statuses = useSelector(selectproductstatus);
  // const beforeImage = datas[0].images[0];
  // const afterImage = datas[1].images[0];
  // const neoImage = datas[2].images[0];

  const [sliderValue, setSliderValue] = useState(33);
  const [sliderValue2, setSliderValue2] = useState(66);

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleSliderChange2 = (e) => {
    setSliderValue2(e.target.value);
  };
  return (
    <div className="App">
      {statuses === "succeeded" ? (
        <div>
          <h1>Compare These Products</h1>

          <div className="image-comparison">
            <div className="images-container">
              <img
                className="before-image"
                src={datas[0].images[0]}
                alt=""
                style={{ width: `${sliderValue}%` }}
              />
              {/* , left: `${sliderValue}` */}
              <img
                className="after-image" // Add a class for the "after.jpg" image
                src={datas[1].images[0]}
                alt=""
                // style={{ width: `${sliderValue}%` }}
              />
              <img
                className="neo-image"
                src={datas[2].images[0]}
                alt=""
                style={{ width: `${sliderValue2}%` }}
              />

              <div
                className="slider-line"
                style={{ left: `${sliderValue}%` }}
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
              <div
                className="slider-line-2"
                style={{ left: `${sliderValue2}%` }}
              ></div>
              <div
                className="slider-icon-2"
                style={{
                  left: `${sliderValue2}%`,
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

              <input
                type="range"
                className="slider-2"
                min={sliderValue}
                max="100"
                value={sliderValue2}
                onChange={handleSliderChange2}
              />
            </div>
          </div>
        </div>
      ) : (
        "Please go back and select Product"
      )}
    </div>
  );
};

export default CompareImage;
