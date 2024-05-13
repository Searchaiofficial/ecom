"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
// import {ActivityItem} from '@/components/virtualexperience/ActivityItem'

const ActivityItem = ({ index, widthRange, selectedActivity, handleClick }) => (
  <div
    onClick={() => handleClick(index)}
    className={`sm:w-1/5 w-[60%] h-40 my-20 border-t-2 border-b-2 border-pink-950 relative flex items-center flex-col ${
      selectedActivity[index] ? "" : ""
    }`}
  >
    {selectedActivity[index] && (
      <div className="overlay absolute top-0 left-0 w-full h-full opacity-50 bg-black"></div>
    )}
    <div className={`w-${widthRange} h-20 bg-orange-400`}></div>
    <div className="flex items-center gap-2">
      <Image
        src="/svg/dropdown/up-arrow-svgrepo-com.svg"
        alt="arrow"
        width={10}
        height={10}
        className=" -rotate-90"
      />
      {widthRange} Widths{" "}
      <Image
        src="/svg/dropdown/up-arrow-svgrepo-com.svg"
        alt="arrow"
        width={10}
        height={10}
        className=" rotate-90"
      />
    </div>
    <p className=" -bottom-5 left-0">{widthRange} Widths</p>
    {selectedActivity[index] && (
      <div className="room-item absolute bottom-4 z-10 flex items-center opacity-50 justify-center">
        <div className="circle-container relative flex justify-center items-center">
          <Image
            src="/svg/icon/tick.svg"
            alt="tick"
            width={30}
            height={30}
            className="opacity-100"
          />
        </div>
      </div>
    )}
  </div>
);

const Content3 = () => {
  const router = useRouter();

  const prevHandler = () => router.push("/virtualexperience/content2");
  const doneHandler = () => router.push("/cart");

  const [selectedPage, setSelectedPage] = useState("content6");
  const [selectedActivity, setSelectedActivity] = useState({});

  const handleSelectPage = (page) => setSelectedPage(page);

  const handleClick = (index) => {
    setSelectedActivity((prevSelectedActivities) => {
      const updatedSelectedActivities = { ...prevSelectedActivities };
      updatedSelectedActivities[index] = !prevSelectedActivities[index];
      return updatedSelectedActivities;
    });
  };

  return (
    <div className="py-4 w-full h-full bg-[#f4e3dd] text-sm">
      <Sidebar selectedPage={selectedPage} onSelectPage={handleSelectPage} />
      <div className="relative container-tikes flex sm:flex-row flex-col items-center sm:gap-10 gap-2 justify-center">
        {[0, 1, 2, 3].map((index) => (
          <ActivityItem
            key={index}
            index={index}
            widthRange={["4", "8", "10", "24"][index]} // Add the appropriate width range
            selectedActivity={selectedActivity}
            handleClick={handleClick}
          />
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-5 px-10 mt-10">
        <button
          onClick={prevHandler}
          className="rounded-2xl px-3 py-1 text-center text-black font-normal bg-white"
        >
          Previous Question
        </button>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <p>
            Products Available (728){" "}
            <span>
              {" "}
              <a href="/" className="text-underline underline">
                Skip to results
              </a>{" "}
            </span>
          </p>
          <button
            onClick={doneHandler}
            className="rounded-2xl px-3 py-1 text-center text-white font-normal bg-[#2F4F4F]"
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content3;
