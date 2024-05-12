"use client"

import React, { useEffect } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import "./styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getProfileSuccess, selectProfileData } from "../Features/Slices/profileSlice";

const ProfileContent = ({ initialData }) => {
  const profileData = useSelector(selectProfileData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData?.length > 0) {
      dispatch(getProfileSuccess(initialData))
    } else {
      console.log("Fetching Profile Data");
      dispatch({ type: "FETCH_PROFILE_REQUEST", payload: "Profile" });
    }
  }, []);

  return (
    <div className=" transparent rounded-lg  pb-[80px] ">

      <Swiper
        className=" h-50  lg:h-80"
        mousewheel={{
          forceToAxis: true,
          invert: false,
        }}
        freeMode={{
          enabled: false,
          sticky: true,
        }}
        spaceBetween={20}
        navigation={{
          nextEl: ".vector-one",
          prevEl: ".vector-two",
        }}
        modules={[Navigation]}
        style={{ "--swiper-navigation-size": "24px" }}
        breakpoints={{
          100: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {profileData.map((person, index) => (
          <SwiperSlide className="bg-[#f4f4f5] my-slider pr-3" key={index}>
            {/* <div className=" flex w-full  justify-start items-center">
              <div className="flex flex-col justify-center items-center">
                <div className=" p-2 lg:p-4 flex justify-center items-center ">
                  {" "}
                  <div className="parent relative bg-black rounded-full md:h-40 h-28 md:w-40 w-28 mb-2 md:mt-8 mt-4  ">
                    <Image
                      src={person.image}
                      className="rounded-full w-full h-full object-cover"
                      width={0}
                      height={0}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-md p-1 font-bold line-clamp-1">{person.name}</div>

                </div>
                <div>
                  <p className="text-md ">{person.role}</p>
                </div>
              </div>
              <a className="flex justify-center items-center self-end mb-6" href="#">
                <Image
                  className=" sm:h-8 h-8 sm:w-8 w-8 -mt-1"
                  src="/social-icon/linkedln.svg"
                  height={2}
                  width={2}
                  alt={`LinkedIn for ${person.name}`}
                />
              </a>
            </div> */}
            <div className="flex flex-col items-center">
              <div className="parent relative bg-black rounded-full md:h-36 h-28 md:w-36 w-28 mb-2 md:mt-8 mt-4">
                <Image
                  src={person.image}
                  className="rounded-full w-full h-full object-cover"
                  width={0}
                  height={0}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="text-md p-1 flex gap-1 items-center font-bold ">
                <p className="line-clamp-1">{person.name}</p>
                <Image
                  className=" sm:h-6 h-6 sm:w-6 w-6"
                  src="/social-icon/linkedln.svg"
                  height={2}
                  width={2}
                  alt={`LinkedIn for ${person.name}`}
                />
              </div>
              <p className="lg:text-[16px] text-sm ">{person.role}</p>
            </div>
            {/* <br />
            <br />
            <br />
            <br /> */}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className=" flex flex-row items-end justify-end gap-6 mt-[25px]">
        <Image
          src="/ayatrio icon/left icon.svg"
          width={20}
          height={20}
          alt="Arrow"
          className="vector-two  rounded-full h-7 w-7"
        />
        <Image
          src="/ayatrio icon/right icon.svg"
          width={20}
          height={20}
          alt="Arrow"
          className="vector-one mr-10 rounded-full h-7 w-7"
        />
      </div>
    </div>
  );
};

export default ProfileContent;
