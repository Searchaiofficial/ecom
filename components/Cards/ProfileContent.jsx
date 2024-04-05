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
import { selectProfileData } from "../Features/Slices/profileSlice";

const ProfileContent = () => {
  const profileData = useSelector(selectProfileData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (profileData.length === 0) {
      dispatch({ type: "FETCH_PROFILE_REQUEST", payload: "Profile" });
      // console.log("profile data fetch funtion called");
    }
  }, []);

  // console.log(profileData);

  return (
    <div className=" transparent rounded-lg  pb-8">
      <div className=" flex flex-row items-end justify-end gap-6">
        <Image
          src="/svg/dropdown/leftvector.svg"
          width={20}
          height={20}
          alt="Arrow"
          className="vector-two bg-gray-300 rounded-full h-7 w-7"
        />
        <Image
          src="/svg/dropdown/rightvector.svg"
          width={20}
          height={20}
          alt="Arrow"
          className="vector-one mr-10  bg-gray-300 rounded-full h-7 w-7"
        />
      </div>
      <Swiper
        className=""
        spaceBetween={20}
        navigation={{
          nextEl: ".vector-one",
          prevEl: ".vector-two",
        }}
        modules={[Navigation]}
        style={{ "--swiper-navigation-size": "24px", paddingRight: "30px" }}
        breakpoints={{
          100: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {profileData.map((person, index) => (
          <SwiperSlide className="bg-[#f4f4f5] my-slider" key={index}>
            <div className=" flex flex-col justify-start items-center">
              <div className="p-4 flex justify-center items-center">
                {" "}
                <div className="parent relative bg-black rounded-full sm:h-40 h-28 sm:w-40 w-28 mb-2 sm:mt-24 mt-4  ">
                  <Image
                    src={person.image}
                    className="child absolute rounded-full w-full h-full object-cover"
                    width={0}
                    height={0}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className=" w-full flex justify-center">
                <div className="text-md p-1 font-bold ">{person.name}</div>
                <a className="flex justify-center items-center" href="#">
                  <Image
                    className=" sm:h-8 h-8 sm:w-8 w-8 -mt-1"
                    src="/social-icon/linkedln.svg"
                    height={2}
                    width={2}
                    alt={`LinkedIn for ${person.name}`}
                  />
                </a>
              </div>
              <div>
                <p className="text-md">{person.role}</p>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProfileContent;
