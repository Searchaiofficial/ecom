"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { dataTiles } from "@/Model/data";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectVirtualData } from "@/components/Features/Slices/virtualSlice";
import { setSelectedStyle } from "@/components/Features/Slices/virtualDataSlice";
const Content1 = () => {
  const search = useSearchParams();
  const router = useRouter();
  const dataSelector = useSelector(selectVirtualData);
  // console.log("dataSelector", dataSelector);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (dataSelector &&dataSelector.length>0 && search.get("category")){
      let tempData = dataSelector?.filter((item) => item?.category===search.get("category")?.toLocaleLowerCase());
      setData(tempData);
      // console.log("tempData", tempData);
    }
    else{
      router.push("/virtualexperience/category");
    }
  }
  , [dataSelector]);
  // console.log("data", data);
  const prevHandler = () => {
    router.push("/virtualexperience/budget");
  };
  const nextHandler = () => {
    router.push("/virtualexperience/content2");
  };
  const [selectedPage, setSelectedPage] = useState("content4");

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };
  const [selectedActivity, setSelectedActivity] = useState({});
  const [showCircle, setShowCircle] = useState(false);
  const [showbuttoncontent, setShowbuttoncontent] = useState(false);

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
    
      dispatch(setSelectedStyle(updatedSelectedRooms));
      
      return updatedSelectedRooms;
    });
    setShowCircle(!showCircle);
    setShowbuttoncontent(!showbuttoncontent);
  };

  return (
    <div className=" py-4 w-full h-full bg-[#f4e3dd] text-sm ">
      <Sidebar selectedPage={selectedPage} onSelectPage={handleSelectPage} />

      <div className="card-container flex flex-row justify-center  gap-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1  my-0 mx-0 "style={{
          gridTemplateColumns: "repeat(11, minmax(0, 1fr))",
        }} >
{data?.[0]?.style.map((item) => (
    <div
        key={item?._id}
        className="relative overflow-hidden m-1 aspect-w-16 aspect-h-9 group"
    >
        {item && item?._id && (
            <>
                <img
                    src={item?.img}
                    alt={item?.title}
                    style={{ borderRadius: "1rem" }}
                    onClick={() => {
                        handleClick(item?._id, item?.title);
                        handleSelect();
                    }}
                    className={`object-cover w-full h-full block p-1
                    ${
                        selectedActivity[item.title] ?? false
                            ? " overlay z-10 black opacity-100"
                            : ""
                    }
                    ${
                        selectedActivity[item.title] ?? false
                            ? " border-2 border-red-500 "
                            : ""
                    }
                `}
                />
                <h3
                    className={`p-1 rounded-sm
                    ${
                        selectedActivity[item.title] ?? false
                            ? "font-semibold text-white absolute left-2 bottom-2 bg-transparent"
                            : "bg-white absolute right-1 bottom-1"
                    }
                `}
                >
                    {item?.title}
                </h3>

                {selectedActivity[item.title] && (
                    <div className="room-item absolute top-2 right-2 z-10  flex items-center opacity-50 justify-center">
                        <div className="circle-container relative flex justify-center items-center">
                            <Image
                                src="/svg/icon/tick.svg"
                                alt="tick"
                                width={30}
                                height={30}
                                className=" opacity-100"
                            />
                        </div>
                    </div>
                )}
            </>
        )}
    </div>
))}

        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-5 px-10 mt-10">
        <Link
          href={{
            pathname: "/virtualexperience/budget",
            query: { category: search.get("category") },
          }}
        >
          <button className="rounded-2xl px-3 py-1 text-center text-white font-normal bg-[#f44336]">
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
              pathname: "/virtualexperience/content2",
              query: { category: search.get("category") },
            }}
          >
            <button className="rounded-2xl px-3 py-1 text-center text-white font-normal bg-[#f44336]">
              Next Question
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Content1;
