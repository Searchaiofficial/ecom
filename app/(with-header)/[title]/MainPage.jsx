"use client";
import Card from "@/components/Room/Other/Card";
import Reviews from "@/components/Room/Other/Reviews";
import RoomImageList from "@/components/Room/RoomImageList";
import RoomInfo from "@/components/Room/RoomInfo";
import React, { useEffect, useState } from "react";
import ImageCaresoul from "@/components/Room/imagecaresoul";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQuantity,
  updateQuantity,
} from "@/components/Features/Slices/calculationSlice";
import {
  selectRoomData,
  setRoomData,
} from "@/components/Features/Slices/roomSlice";
import axios from "axios";
import Carous from "@/components/Carousel/Carous";
import { useParams } from "next/navigation";
import UserReviewPosts from "@/components/Cards/UserReviewPosts";
import AccessoriesPosts from "@/components/Cards/AccessoriesPosts";
import Link from "next/link";
import Image from "next/image";

const RoomPage = () => {
  const [navigationItemData, setNavigationItemData] = useState(null);

  useEffect(() => {
    if (window !== undefined) {
      const navigationItem = JSON.parse(
        window.sessionStorage.getItem("navigationItem")
      );
      if (navigationItem) {
        setNavigationItemData(navigationItem);
        sessionStorage.removeItem("navigationItem");
      }
    }
  }, []);

  const dispatch = useDispatch();
  const quantity = useSelector(selectQuantity);
  // const { title } = useParams();
  const params = useParams();
  const title = params.title.replace(/-/g, " ");
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=`;
  const [data, setData] = useState([]);
  const selectedData = useSelector(selectRoomData);

  useEffect(() => {
    // Fetch room data based on the title
    dispatch({ type: "FETCH_ROOM_REQUEST", payload: title });
  }, [title, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = sessionStorage?.getItem("roomData");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setData(parsedData);
          dispatch(setRoomData({ roomData: parsedData }));
          if (parsedData?.productImages?.[0]?.color) {
            dispatch({
              type: "FETCH_IMAGE_DATA",
              payload: parsedData?.productImages[0]?.color,
            });
          } else {
            dispatch({
              type: "FETCH_IMAGE_DATA",
              payload: null,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching cached data:", error);
      }
    };

    fetchData();
  }, [dispatch]); // Fetch cached data only once when component mounts

  useEffect(() => {
    if (selectedData && Object.keys(selectedData).length !== 0) {
      // Update cached data with selected data
      sessionStorage?.setItem("roomData", JSON.stringify(selectedData));
      setData(selectedData); // Update component state with selectedData
      if (selectedData?.productImages?.[0]?.color) {
        dispatch({
          type: "FETCH_IMAGE_DATA",
          payload: selectedData?.productImages[0]?.color,
        });
      } else {
        dispatch({
          type: "FETCH_IMAGE_DATA",
          payload: null,
        });
      }
    }
  }, [selectedData, dispatch]);


  console.log(data);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setHowMuchScrolled(window.scrollY);
  //     } else {
  //       setHowMuchScrolled(0);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [howMuchScrolled]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // const [isFilterVisible, setIsFilterVisible] = useState(true);

  // useEffect(() => {
  //   let prevScrollPos = window.scrollY;

  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;
  //     setIsFilterVisible(
  //       currentScrollPos <= prevScrollPos || currentScrollPos < 100
  //     );
  //     prevScrollPos = currentScrollPos;
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // console.log("11111", data);

  const [accessories, setAccessories] = useState([]);
  const fetchAccessories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/productByCategoryAndSubCategory?category=${data?.category}&subcategory=Accessories`);
      console.log("Accessories :", response.data);
      setAccessories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.category) {
      fetchAccessories();
    }
  }, [data]);

  const handleJoinLive = () => {
    // Store category data in local storage
    localStorage.setItem('selectedCategory', category);
  };

  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden container-rooms flex sm:block items-center px-[20px] sm:px-[50px] lg:px-[27px] ">
        <div className="sm:mt-[65px] w-full">
          {/* <div className="mt-[65px] w-full"> */}
          <div className=" sm:flex-row gap-8 flex-col flex overflow-hidden">
            {/* <div className="relative sm:basis-2/3 flex lg:pl-[40px] mt-[50px] sm:mt-[40px] flex-col sm:flex-grow"> */}
            <div className="relative sm:basis-2/3 flex lg:pl-[40px]  sm:mt-[40px] flex-col sm:flex-grow">
              {/* <div className=" font-sans font-normal text-xs sm:text-sm md:pb-[10px]  sticky top-10 mb-[20px] md:mb-[7px] md:mt-0 mt-[20px] flex items-center gap-1"> */}
              <div className=" font-sans font-normal text-xs sm:text-sm md:pb-[10px]  sticky top-2 mb-[20px] md:mb-[7px] md:mt-0 mt-[20px] flex items-center gap-1">
                {navigationItemData ? (
                  <>
                    <Link href={`${navigationItemData.href}`}>
                      <span className="hover:text-gray-600 cursor-pointer ">
                        {navigationItemData.label}
                      </span>
                    </Link>
                    <Image
                      src="/icons/backarrowRevarce.svg"
                      alt="tick"
                      width={10}
                      height={10}
                      className="opacity-100 h-[8px] mt-[5px]"
                    />
                  </>
                ) : (
                  <>
                    <Link href="/">
                      <span className="hover:text-gray-600 cursor-pointer ">
                        Home
                      </span>
                    </Link>
                    <Image
                      src="/icons/backarrowRevarce.svg"
                      alt="tick"
                      width={10}
                      height={10}
                      className="opacity-100 h-[8px] mt-[5px]"
                    />
                  </>
                )}
                <Link
                  href={`/${data?.category?.replace(/ /g, "-")}/category/all`}
                >
                  <span className="hover:text-gray-500 cursor-pointer ">
                    {data?.category}
                  </span>
                </Link>
                <Image
                  src="/icons/backarrowRevarce.svg"
                  alt="tick"
                  width={10}
                  height={10}
                  className="opacity-100 h-[8px] mt-[5px]"
                />
                <Link
                  href={`/${data?.category?.replace(
                    / /g,
                    "-"
                  )}/category/${data?.subcategory?.replace(/ /g, "-")}`}
                >
                  <span className="hover:text-gray-500 cursor-pointer ">
                    {data?.subcategory}
                  </span>
                </Link>
                <Image
                  src="/icons/backarrowRevarce.svg"
                  alt="tick"
                  width={10}
                  height={10}
                  className="opacity-100 h-[8px] mt-[5px]"
                />
                <span className="text-gray-500 cursor-pointer ">
                  {data?.productTitle}
                </span>
              </div>
              <RoomImageList images={data?.images} alt={data?.productTitle} />
              <ImageCaresoul images={data?.images} />
              <div className="block md:hidden">
                <Card data={data} productId={data._id} accessories={accessories} />
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <div className="flex flex-row bg-red-500 gap-2 p-1">
                  <Image
                    src="/icons/golive.svg"
                    alt="live icon"
                    width={16}
                    height={16}
                    loading="lazy"
                  />
                  <span className="text-white text-xs">Live</span>
                </div>
                <Link
                  href={{
                    pathname: '/liveroom',
                  }}
                  passHref
                  onClick={handleJoinLive}
                  className="py-2 focus:outline-none text-black flex items-center ml-2 h-8"
                >
                  <span className="text-sm">Join Live</span>
                </Link>

                <span>|</span>

                <Link
                  className="py-2 focus:outline-none h-8 flex items-center space-x-2 "
                  href="#"
                >
                  <Image
                    src="/icons/free-sample.svg"
                    alt="free-sample"
                    width={20}
                    height={25}
                    loading="lazy"
                  />
                  <span className="text-sm">Free Sampling</span>
                </Link>
              </div>

              <RoomInfo data={data} />
              <Reviews productId={data._id} data={data} />
              {/* <div className="w-[77%]">
                <UserReviewPosts />
              </div> */}
            </div>
            <div className="md:basis-2/3 hidden md:flex flex-col"  >
              <div className="md:relative flex top-14 mb-16 ml-0 ">
                <Card data={data} productId={data._id} />
              </div>
            </div>
          </div>

          <div className="lg:pl-[40px] w-full lg:w-[66%] ">
            <AccessoriesPosts data={data} accessories={accessories} />
          </div>
          <div className="lg:pl-[40px] w-full lg:w-[66%]">
            <UserReviewPosts
              slidesPerView={2.2}
              SubcategoryName={data.subcategory}
            />
          </div>
          <div className="lg:pl-[40px] w-full">
            <Carous data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomPage;
