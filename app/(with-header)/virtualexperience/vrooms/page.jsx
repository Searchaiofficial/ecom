"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import "@/components/styles/virtualexperience.css";
import Sidebar from "@/components/sidebar";
// import { dataRooms } from "@/Model/data";
import { selectVirtualData } from "@/components/Features/Slices/virtualSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  selectRoom,
  setSelectedRoom,
} from "@/components/Features/Slices/virtualDataSlice";

const Rooms = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const dataSelector = useSelector(selectVirtualData);
  const search = useSearchParams();
  // let filteredData = dataSelector.filter(
  //   (item) => item.category === search.get("category").toLocaleLowerCase()
  // );

  useEffect(() => {
    if (dataSelector && search.get("category")) {
      let tempData = dataSelector?.filter(
        (item) => item.category === search.get("category")?.toLocaleLowerCase()
      );
      setData(tempData);
      // console.log("tempData", tempData);
    }
  }, [dataSelector]);
  // console.log("data", data[0]?.rooms);
  useEffect(() => {
    if (
      dataSelector === null ||
      dataSelector === undefined ||
      dataSelector.length === 0
    ) {
      router.push("/virtualexperience/category");
    }
  }, [dataSelector]);
  const nextHandler = () => {
    if (selectedPage === "vrooms") {
      router.push("/virtualexperience/activities");
    }
  };

  const [selectedActivity, setSelectedActivity] = useState({});
  const [showCircle, setShowCircle] = useState(false);
  const [showbuttoncontent, setShowbuttoncontent] = useState(false);

  const [selectedPage, setSelectedPage] = useState("vrooms");

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  const handleSelect = () => {
    setShowCircle(!showCircle);
  };
  const dispatch = useDispatch();
  const handleClick = (roomId, roomTitle) => {
    setSelectedActivity((prevSelectedRooms) => {
      const updatedSelectedRooms = {
        ...prevSelectedRooms,
        [roomTitle]: !prevSelectedRooms[roomTitle],
      };

      dispatch(setSelectedRoom(updatedSelectedRooms));

      return updatedSelectedRooms;
    });
  };

  const addToCart = () => {
    SetIsOPen(true);
    // console.log("selectedrooms", selectedActivity);
  };
  const prevHandler = () => {
    router.push("/virtualexperience/category");
  };
  return (
    <div className="py-4 relative w-full h-full flex flex-col justify-center bg-[#f4e3dd]">
      {/* <Header /> */}

      <Sidebar selectedPage={selectedPage} onSelectPage={handleSelectPage} />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-3 gap-y-1 mb-4 my-0 mx-2">
        {data[0]?.rooms?.map((item) => (
          <div
            key={item._id}
            className=" relative  overflow-hidden m-1 aspect-w-16 aspect-h-9 group"
          >
            <img
              src={item.img}
              alt={item.title}
              onClick={() => {
                handleClick(item._id, item.title);
                handleSelect();
              }}
              className={`room-item rounded-2xl object-cover w-full opactiy-100 h-full block p-1
             
            ${selectedActivity[item.title] ? " " : "overlay z-10 "}  ${
                selectedActivity[item.title] ? " border-2 border-red-500 " : ""
              }

              `}
            />

            <h3
              className={` p-1 rounded-sm absolute right-0 bottom-0
              ${
                selectedActivity[item.title]
                  ? "font-semibold text-white absolute left-2 bottom-2 bg-transparent"
                  : "bg-white"
              }
              `}
            >
              {item.title}
            </h3>

            {selectedActivity[item.id] && (
              <div className="room-item absolute top-2 right-2 z-10  flex items-center opacity-50 justify-center">
                <div className="circle-container relative flex justify-center items-center">
                  <Image loading="lazy"
                    src="/icons/tick.svg"
                    alt="tick"
                    width={30}
                    height={30}
                    className=" opacity-100"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-5 px-10 mt-10">
        <Link
          href={{
            pathname: "/virtualexperience/category",
          }}
        >
          <button className="rounded-2xl px-3 py-1 text-center text-white font-normal bg-[#2F4F4F] ">
            Previous Question
          </button>
        </Link>
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
          <Link
            href={{
              pathname: "/virtualexperience/activities",
              query: { category: search.get("category") },
            }}
          >
            <button className="rounded-2xl px-3 py-1 text-center text-white font-normal bg-[#2F4F4F] ">
              Next Question
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
