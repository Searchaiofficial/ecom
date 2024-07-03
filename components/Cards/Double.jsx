import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { selectMusicData } from "../Features/Slices/musicSectionSlice";

const Double = () => {
  const musicSwiperData = useSelector(selectMusicData);
  // console.log('musicSwiperData : ',musicSwiperData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (musicSwiperData.length === 0) {
      dispatch({ type: "FETCH_MUSIC_DATA", payload: "music" });
    }
  }, []);
  const musicTitle = musicSwiperData[0]?.title;
  return (
    <div>
      <Swiper
        effect="coverflow"
        slidesPerView={3}
        // centeredSlides={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        modules={[Navigation, Pagination, EffectCoverflow]}
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 0,
          depth: 150,
          slideShadows: false,
        }}
      >
        <SwiperSlide>
          <div className="mr-2 mt-6 ">
            <Image
              width={208}
              height={350}
              src={musicSwiperData[0]?.img[0]?.url}
              className="rounded-t-lg"
              alt={musicSwiperData[0]?.img[0]?.title}
            />
            <div className="bg-black sm:w-52 w-[134px] flex flex-col rounded-b-lg">
              <div className="text-white text-sm pt-3  pl-4">{musicSwiperData[0]?.img[0]?.title}</div>
              {/* There is no subtitle in this data so no need of below div */}
              {/* <div className="text-xs pb-3 pl-4">{curElement.subTitle}</div> */}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mr-2 mt-6 ">
            <Image
              width={208}
              height={350}
              src={musicSwiperData[0]?.img[1]?.url}
              className="rounded-t-lg"
              alt={musicSwiperData[0]?.img[1]?.title}
            />
            <div className="bg-black sm:w-52 w-[134px] flex flex-col rounded-b-lg">
              <div className="text-white text-sm pt-3  pl-4">{musicSwiperData[0]?.img[1]?.title}</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mr-2 mt-6 ">
            <Image
              width={208}
              height={350}
              src={musicSwiperData[0]?.img[3]?.url}
              className="rounded-t-lg"
              alt={musicSwiperData[0]?.img[3]?.title}
            />
            <div className="bg-black sm:w-52 w-[134px] flex flex-col rounded-b-lg">
              <div className="text-white text-sm pt-3  pl-4">{musicSwiperData[0]?.img[3]?.title}</div>
            </div>
          </div>
        </SwiperSlide>
        {musicSwiperData[0]?.img?.slice(3).map((data) => {
          return (
            <SwiperSlide>
              <div className="mr-2 mt-6 ">
                <Image
                  width={208}
                  height={350}
                  src={data.url}
                  className="rounded-t-lg"
                  alt={data.title}
                />
                <div className="bg-black sm:w-52 w-[134px] flex flex-col rounded-b-lg">
                  <div className="text-white text-sm pt-3  pl-4">
                    {data.title}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <Image
          src="/icons/right.svg"
          width={30}
          height={30}
          alt="arrow"
          className="swiper-button-prev sm:-translate-y-[150px] rotate-180 sm:-translate-x-[585px] sm:block hidden"
        />
        <Image
          src="/icons/right.svg"
          width={30}
          height={30}
          alt="arrow"
          className="swiper-button-next sm:-translate-y-[150px] sm:block hidden"
        />
      </Swiper>
    </div>
  );
};
export default Double;
