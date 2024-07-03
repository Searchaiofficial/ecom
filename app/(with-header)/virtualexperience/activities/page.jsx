"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
// import Header from "../../Header";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectVirtualData } from "@/components/Features/Slices/virtualSlice";
import { setSelectedSelectiveProduct } from "@/components/Features/Slices/virtualDataSlice";
const Activities = () => {
  const router = useRouter();
  const search = useSearchParams();

  const dataSelector = useSelector(selectVirtualData);
  // console.log("dataSelector", dataSelector);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (dataSelector && dataSelector.length > 0 && search.get("category")) {
      let tempData = dataSelector?.filter((item) => item.category === search.get("category")?.toLocaleLowerCase());
      setData(tempData);
      // console.log("tempData", tempData);
    }
    else {
      router.push("/virtualexperience/category");
    }
  }
    , [dataSelector]);
  const prevHandler = () => {
    router.push("/virtualexperience/vrooms");
  };

  const [dataActivities, setDataActivities] = useState([]);
  useEffect(() => {
    const fetchActivities = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getVE`);
      // console.log(response);
      setDataActivities(response.data);
    };
    fetchActivities();
  }, []);
  // console.log(dataActivities);
  const [selectedPage, setSelectedPage] = useState("activities");
  const [selectedActivity, setSelectedActivity] = useState({});
  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  const [showCircle, setShowCircle] = useState(false);
  const [showbuttoncontent, setShowbuttoncontent] = useState(false);

  const handleSelect = () => {
    setShowCircle(!showCircle);
  };


  const dispatch = useDispatch();

  const handleClick = (roomId, roomTitle) => {
    setSelectedActivity({
      ...selectedActivity,
      [roomTitle]: !selectedActivity[roomTitle],
    });

    dispatch(setSelectedSelectiveProduct(selectedActivity));
  };



  const addToCart = () => {
    SetIsOPen(true);
    // console.log("selectedrooms", selectedActivity);
  };


  return (
    <div className=" py-4 relative w-full h-full flex justify-center flex-col bg-[#f4e3dd]">
      <Sidebar selectedPage={selectedPage} onSelectPage={handleSelectPage} />
      <Image
        src="/icons/adtocart.svg"
        alt="Add to cart icon"
        width={30}
        height={30}
        onClick={() => {
          addToCart();
          setShowbuttoncontent(false);
        }}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-1  my-0 mx-0 ">
        {data?.[0]?.selectiveproducts?.map((item) => (
          <div
            key={item._id}
            className="relative overflow-hidden m-1 aspect-w-16 aspect-h-9 group"
          >
            <img
              src={item.img}
              alt={item.title}
              style={{ borderRadius: "1rem" }}
              onClick={() => {
                handleClick(item._id, item.title);
                handleSelect();
              }}
              className={`object-cover  w-full h-full block p-1
              ${selectedActivity[item.title]
                  ? " overlay z-10 black opacity-100"
                  : ""
                }  ${selectedActivity[item.title] ? "border-2 border-red-500" : ""}
              `}
            />
            <h3
              className={` p-1 rounded-sm absolute right-0 bottom-0
              ${selectedActivity[item.title]
                  ? "font-semibold text-white absolute left-2 bottom-2 bg-transparent"
                  : "bg-white"
                }
              `}
            >
              {item.title}
            </h3>

            {selectedActivity[item.title] && (
              <div
                className="room-item absolute top-2 right-2 z-10  flex items-center opacity-50 justify-center"
              >
                <div className="circle-container relative flex justify-center items-center">


                  <Image
                    src="/icons/tick.svg"
                    alt="tick"
                    width={30}
                    height={30}
                    className=" opacity-100"
                  />
                </div>
              </div>
            )}
            {/* <Button /> */}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-5 px-10 my-4">
        <Link href={{
          pathname: "/virtualexperience/vrooms",
          query: { category: search.get("category") },
        }}
        >
          <button
            className="rounded-2xl px-3 py-1 text-center text-white font-normal bg-[#2F4F4F] "
          >
            Previous Question
          </button>
        </Link>
        <Link
          href={
            {
              pathname: "/virtualexperience/budget",
              query: { category: search.get("category") },
            }
          }>
          <button
            className="rounded-2xl px-3 py-1 text-center text-white font-normal bg-[#2F4F4F] "
          >
            Next Question
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Activities;
