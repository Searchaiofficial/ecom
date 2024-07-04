"use client";
import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectproductdata,
  selectproductstatus,
} from "../Features/Slices/compareSlice";
import "./styled.css";
import Scene1 from "../Scene1/page";
import Scene2 from "../Scene2/page";
import Scene3 from "../Scene3/page";

const CompareImage = () => {
  const [getImg, setGetImg] = useState(true);

  const datas = useSelector(selectproductdata);
  const statuses = useSelector(selectproductstatus);

  const [sliderValue, setSliderValue] = useState(33);
  const [sliderValue2, setSliderValue2] = useState(66);

  const handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value));
  };

  const handleSliderChange2 = (e) => {
    setSliderValue2(parseInt(e.target.value));
  };

  useEffect(() => {
    const sliderLine = document.querySelector(".slider-line");
    if (sliderLine) {
      sliderLine.style.left = `${sliderValue}%`;
    }
  }, [sliderValue]);

  useEffect(() => {
    const sliderLine2 = document.querySelector(".slider-line-2");
    if (sliderLine2) {
      sliderLine2.style.left = `${sliderValue2}%`;
    }
  }, [sliderValue2]);

  let scene1img;
  let scene2img;
  let scene3img;
  if (!getImg) {
    scene1img = localStorage.getItem("scene1img");
    scene2img = localStorage.getItem("scene2img");
    scene3img = localStorage.getItem("scene3img");
  }

  if (getImg) {
    setTimeout(() => {
      setGetImg(false);
    }, 3000);
  }
  // let texture_type = localStorage.getItem("texture_type");

  // console.log("this page");
  return (
    <div className="App">
      {statuses === "succeeded" ? (
        <div>
          {getImg ? (
            <>
              {/* <p>Loading</p> */}
              <Scene1
                texture={datas[0].images[0]}
                texture_type={texture_type}
              />
              <Scene2
                texture={datas[1].images[0]}
                texture_type={texture_type}
              />
              <Scene3
                texture={datas[2].images[0]}
                texture_type={texture_type}
              />
            </>
          ) : (
            <>
              <div className="text-center py-[20px] ">
                <h1 className="text-5xl py-[15px] ">Compare Products</h1>
                <p>
                  Get help choosing.{" "}
                  <span className="text-blue-600"> Chat with a Specialist</span>
                </p>
              </div>

              <div className="image-comparison">
                <div className="images-container relative">
                  <img
                    src={scene1img}
                    className="before-image absolute  h-[100%]"
                    style={{
                      width: "100%",
                      clipPath: `polygon(0% 0%, ${sliderValue}% 0%, ${sliderValue}% 100%, 0% 100%)`,
                    }}
                  />

                  <img
                    src={scene2img}
                    className="after-image absolute  h-[100%]"
                    style={{
                      width: "100%",
                      clipPath: `polygon(${sliderValue}% 0%, ${sliderValue2}% 0%, ${sliderValue2}% 100%, ${sliderValue}% 100%)`,
                    }}
                  />

                  <img
                    src={scene3img}
                    className="after-image absolute  h-[100%]"
                    style={{
                      width: "100%",
                      clipPath: `polygon(${sliderValue2}% 0, 100% 0, 100% 100%, ${sliderValue2}% 100%)`,
                    }}
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
            </>
          )}
        </div>
      ) : (
        "Please go back and select Product"
      )}
    </div>
  );
};

export default CompareImage;
