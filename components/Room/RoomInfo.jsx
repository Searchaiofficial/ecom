import Beding from "./Other/Beding";
import PlaceInfo from "./Other/PlaceInfo";
import Amenities from "./Other/Amenities";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";

const RoomInfo = ({ data }) => {
  const [categoryDetails, setCategoryDetails] = useState();
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  const fetchCategoryDetails = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCategoryByName/${data?.category}`
    );
    console.log(response.data);
    setCategoryDetails(response.data);
  };

  useEffect(() => {
    if (data?.category) {
      fetchCategoryDetails();
    }
  }, [data?.category]);

  const [isClamped, setIsClamped] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const descriptionElement = descriptionRef.current;
    if (descriptionElement.scrollHeight > descriptionElement.clientHeight) {
      setIsClamped(true);
    } else {
      setIsClamped(false);
    }
  }, [data]);

  return (
    <div className="w-full">
      {/* <div className="room-details pb-4">
          <h2 className="sm:text-2xl text-lg sm:font-semibold font-medium sm:mt-0">
            Room Details
          </h2>
          <div className=" text-base">
            16+ guests 4 bedrooms 5 beds 3 bathrooms
          </div>
        </div> */}
      {/* <div className="flex mb-10 justify-center">

          <div className="flex flex-col items-center max-w-48  gap-2">
            <Image loading="lazy"src={"/icons/backarrowRevarce.svg"} height={35} width={35} alt="downarrow" className="rotate-90  hover:text-gray-600" />
            <p className="text-[#1D1D1F] font-semibold   text-xs">Get free delivery, or pick up available items at an Apple Store</p>
          </div>
          <div className="flex flex-col items-center max-w-48  gap-2">
            <Image loading="lazy"src={"/icons/backarrowRevarce.svg"} height={35} width={35} alt="downarrow" className="rotate-90 hover:text-gray-600" />
            <p className="text-[#1D1D1F] font-semibold text-xs">Get 6 months of Ayatrio free with your HomePod miniFootnote*</p>
          </div>
          <div className="flex flex-col items-center max-w-48  gap-2">
            <Image loading="lazy"src={"/icons/backarrowRevarce.svg"} height={35} width={35} alt="downarrow" className="rotate-90 hover:text-gray-600" />
            <p className="text-[#1D1D1F] font-semibold text-xs">Free and easy returns</p>
          </div>

        </div> */}
      <div>
        <div>
          {(data.productType === "special" ||
            data.productType === "requested") && (
            <div className="border border-gray-300 px-2  sm:h-20 h-auto sm:gap-0 gap-3 sm:w-fit w-[100%] rounded-lg  flex flex-row justify-center items-center">
              {data.productType === "requested" && (
                <div
                  id="box1"
                  className="flex flex-row border-r pr-4 sm:order-1 order-2"
                >
                  <img
                    className="h-10 scale-x-[-1]"
                    alt=""
                    src="/icons/amf/rightGold.svg"
                  />
                  <div
                    className="text-lg text-[#bf9b30] text-center pl-2 pr-2"
                    style={{ lineHeight: "1" }}
                  >
                    Ayatrio member <br />
                    favourite
                  </div>

                  <img
                    className="h-10 "
                    alt=""
                    src="/icons/amf/rightGold.svg"
                  />
                </div>
              )}
              {data.productType === "special" && (
                <div
                  id="box1"
                  className="flex flex-row border-r pr-4 sm:order-1 order-2"
                >
                  <img
                    className="h-10 scale-x-[-1]"
                    alt=""
                    src="/icons/amf/rightBlack.svg"
                  />
                  <div
                    className="text-lg text-center pl-2 pr-2"
                    style={{ lineHeight: "1" }}
                  >
                    Ayatrio member <br />
                    favourite
                  </div>

                  <img
                    className="h-10 "
                    alt=""
                    src="/icons/amf/rightBlack.svg"
                  />
                </div>
              )}

              {/* text */}
              <div
                className="pl-4 pr-5 sm:block hidden  font-medium sm:order-2"
                style={{ lineHeight: "1.2" }}
              >
                One of the most loved homes furnishing on
                <br />
                Ayatrio, according to members
              </div>

              <div
                id="box3"
                className="flex sm:pb-0 pb-4 flex-col pl-3 sm:order-4 order-3"
              >
                <div className="text-center text-xl font-bold">43</div>
                <div className="underline text-sm -mt-2">Reviews</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="font-normal text-sm  flex flex-col gap-4 my-6">
        <>
          <div>
            <div
              className={`relative ${
                showMore ? "" : "line-clamp-2"
              } overflow-hidden`}
              ref={descriptionRef}
            >
              <p className="inline">{data?.productDescription}</p>
            </div>
            {isClamped && (
              <span
                className="cursor-pointer hover:underline font-semibold"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "View less" : "View more"}
              </span>
            )}
          </div>
          {categoryDetails?.maintenanceDetails &&
            categoryDetails?.certification && (
              <p className="font-medium ">
                <span className="font-normal">More information: </span>
                <Link
                  href={categoryDetails.maintenanceDetails}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-gray-900 font-semibold "
                >
                  Maintenance Details
                </Link>
                {" | "}
                <Link
                  href={categoryDetails.certification}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-gray-900 font-semibold "
                >
                  Certification Download
                </Link>
              </p>
            )}
        </>
      </div>

      {/* place features and information */}
      <PlaceInfo data={data} />

      {/* ----------------- bedding cards ------------ */}

      {/* ----------------- what this place offers ------------ */}
      <Amenities data={data} />
    </div>
  );
};
export default RoomInfo;
