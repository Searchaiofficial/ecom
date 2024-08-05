"use client";

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
import {
  getProfileSuccess,
  selectProfileData,
} from "../Features/Slices/profileSlice";
import Link from "next/link";

const ProfileContent = ({ initialData }) => {
  const profileData = useSelector(selectProfileData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData?.length > 0) {
      dispatch(getProfileSuccess(initialData));
    } else {
      console.log("Fetching Profile Data");
      dispatch({ type: "FETCH_PROFILE_REQUEST", payload: "Profile" });
    }
  }, []);
  console.log("harsh ", profileData);
  return (
    <div className=" transparent rounded-lg pb-[80px]">
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
          <SwiperSlide className="bg-[#fafafa]  pr-3" key={index}>
            <div className="flex flex-col items-center">
              <div className="parent flex flex-col items-center relative bg-black rounded-full md:h-36 h-28 md:w-36 w-28 mb-2 md:mt-8 mt-4">
                <Image
                  loading="lazy"
                  src={person.user.image}
                  alt={person.user.displayName}
                  className="rounded-full w-full h-full object-cover"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="text-[13px] lg:text-[16px] p-1 flex  items-center font-bold ">
                <p className="line-clamp-1">{person.user.displayName}</p>
                {person.user?.links?.linkedin &&
                  <Link href={person.user?.links?.linkedin} className="flex items-center" target="_blank">
                    <Image
                      loading="lazy"
                      className="sm:h-6 h-6 sm:w-6 w-6"
                      src="/icons/social-icon/linkedln.svg"
                      alt={`LinkedIn for ${person.user?.links?.linkedin}`}
                      width={24}
                      height={24}
                    />
                  </Link>
                }
                {person.user?.links?.instagram &&
                  <Link href={person.user?.links?.instagram} className="flex items-center" target="_blank">
                    <Image
                      loading="lazy"
                      className="sm:h-6 h-6 sm:w-6 w-6"
                      src="/icons/social-icon/instagram.svg"
                      alt={`LinkedIn for ${person.user?.links?.instagram}`}
                      width={24}
                      height={24}
                    />
                  </Link>
                }
                {person.user?.links?.youtube &&
                  <Link href={person.user?.links?.youtube} className="flex items-center" target="_blank">
                    <Image
                      loading="lazy"
                      className="sm:h-6 h-6 sm:w-6 w-6"
                      src="/icons/social-icon/youtube.svg"
                      alt={`LinkedIn for ${person.user?.links?.youtube}`}
                      width={24}
                      height={24}
                    />
                  </Link>
                }
              </div>
              <p className="lg:text-[16px] text-[12px] ">{person.user?.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className=" flex flex-row items-end justify-end gap-6 mt-[25px]">
        <Image
          loading="lazy"
          src="/icons/backarrowhite.svg"
          width={20}
          height={20}
          alt="Arrow"
          className="vector-two rounded-full h-7 w-7"
        />
        <Image
          loading="lazy"
          src="/icons/rightarro-white.svg"
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
