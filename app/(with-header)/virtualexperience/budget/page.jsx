'use client'
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import { selectVirtualData } from "@/components/Features/Slices/virtualSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { setSelectedBudget } from "@/components/Features/Slices/virtualDataSlice";

const Budget = () => {
    const router = useRouter();
  const search=useSearchParams();
  const dataSelector = useSelector(selectVirtualData);
  // console.log("dataSelector", dataSelector);
  const [data, setData] = useState([]);
  useEffect(() => {
    if(dataSelector===null||dataSelector===undefined||dataSelector.length===0){
      router.push("/virtualexperience/category");
    }
    else{
      setData(dataSelector);
    }
  }
  , []);
  const prevHandler = () => {
    router.push("/virtualexperience/activities");
  };

  const nextHandler = () => {
    router.push("/virtualexperience/flooring");
  };

  const [selectedPage, setSelectedPage] = useState("budget");
  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  const [selectedActivity, setSelectedActivity] = useState(null);
  const dispatch = useDispatch();
  const handleClick = (roomId,price) => {
if(selectedActivity===roomId){
  setSelectedActivity(null);
}
else{
  setSelectedActivity(roomId);
  dispatch(setSelectedBudget(price));
}
  }
  return (
    <div className="pt-4 pb-28 flex flex-col w-full h-full justify-center bg-[#f4e3dd]">
      {/* <Header /> */}
      <Sidebar selectedPage={selectedPage} onSelectPage={handleSelectPage} />

      <div className="grid grid-cols-2 gap-y-4 place-items-center sm:grid-cols-4 mb-10">
        {/* {dataSelector && data?.[0]?.price.map(({ label, index }) => (
          <div
            onClick={() => handleClick(label?._id)}
            key={label?._id}
            className={` relative flex flex-col min-h-[12rem] w-[5rem] justify-between items-center bg-white mx-6 p-5 rounded-t-full rounded-b-full
              ${selectedActivity === label?._id? " border-2 border-red-500" : ""}
            `}
          >
            {selectedActivity === label?._id && (
              <div className="overlay rounded-full absolute top-0 left-0 w-full h-full opacity-50 bg-black"></div>
            )}

            <p className="text-lg">{label?.Label}</p>

            {selectedActivity === label?._id && (
              <div className="room-item absolute bottom-4  z-10  flex items-center opacity-50 justify-center">
                <div className="circle-container relative flex justify-center items-center">
                  
                  <Image src="/svg/icon/tick.svg" alt="tick" width={30} height={30} className=" opacity-100" />
                </div>
              </div>
            )}
          </div>
        ))} */}

{
  dataSelector &&
  data?.[0]?.price.map((item, index) => (
    <div
      onClick={() => handleClick(item._id,item.price)}
      key={item._id}
      className={`relative flex flex-col min-h-[12rem] w-[5rem] justify-between items-center bg-white mx-6 p-5 rounded-t-full rounded-b-full
        ${selectedActivity === item._id ? "border-2 border-red-500" : ""}
      `}
    >
      <h1 className="
              z-[9999]
              text-2xl
              font-bold
              text-black
              ">
                {item?.Lable}
              </h1>
      {selectedActivity === item._id && (
        <div className="overlay rounded-full absolute top-0 left-0 w-full h-full opacity-50 bg-black">
          <div className="room-item absolute bottom-4 z-10 flex items-center opacity-50 justify-center">
            <div className="circle-container relative flex justify-center items-center">
              <Image src="/svg/icon/tick.svg" alt="tick" width={30} height={30} className="opacity-100" />
            </div>
          </div>
        </div>
      )}
    </div>
  ))
}

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

          <Link
          href={{
            pathname: "/virtualexperience/flooring",
            query: { category: search.get("category")},
          }}
          >
            <button
              className="rounded-2xl px-3 py-1 text-center text-white font-normal bg-[#f44336]"
            >
              Next Question
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Budget;
