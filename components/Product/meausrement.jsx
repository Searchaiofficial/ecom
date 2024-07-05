import React, { useEffect, useState } from "react";
import Image from "next/image";
import Label from "../Label/Label";
import TabImage from "../Cards/TabImage";
import axios from "axios";
import Link from "next/link";

const meausrement = ({ category }) => {
  const [roomData, setRoomData] = useState({});
  const [reviewData, setReviewData] = useState([]);
  console.log("Filtered Product Data:", category);
  const fetchRoomData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCategorySpecialRoom/${category}`
        // {
        //   params: {
        //     categoryName:
        //       (filteredProductData &&
        //         filteredProductData.length > 0 &&
        //         filteredProductData[0].category) ||
        //       "",
        //   },
        // }
      );
      console.log("Response Data:", response.data);
      setRoomData(response.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const fetchReviewData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSpecialReview`
      );
      setReviewData(response.data);
    } catch (error) {
      console.error("Error fetching review data:", error);
    }
  };

  useEffect(() => {
    fetchRoomData();
    fetchReviewData();
  }, [category]);


  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {roomData && reviewData &&
        <div className="flex lg:mt-20 mt-10 lg:flex-row lg:max-h-[490px] w-full flex-col relative overflow-hidden ">
          <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="relative w-full object-cover md:w-2/3">
            {/* {roomData && ( */}
            <TabImage
              src={roomData.imgSrc}
              alt={`Image  of Children`}
              width={1000}
              height={338}
              labelData={roomData.children}
              hovered={isHovered}

            />
            {/* )} */}
          </div>
          {/* {reviewData && ( */}
          <div className="md:w-1/3  sm:h-auto min-h-[363px] sm:flex-grow bg-zinc-100  lg:p-12 p-10">
            <div className="flex flex-col ">
              <div>
                <p>{reviewData && reviewData.comment}</p>
              </div>
              <div className="flex flex-row feedcon mt-2 cursor-pointer">
                <Image loading="lazy"
                  src={reviewData && reviewData.image}
                  width={45}
                  height={45}
                  alt={reviewData && reviewData.name}
                  className="usercon aspect-square object-cover rounded-full"
                />
                <Link
                  href={`${reviewData.instagramUrl}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <p>{reviewData && reviewData.name}</p>
                </Link>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      }
    </>
  );
};

export default meausrement;
