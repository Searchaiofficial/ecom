// components/Slider.js
import Link from "next/link";
import React from "react";
import temp from "../../../public/product/room.jpg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import { Scrollbar } from "swiper/modules";
import { roomOptions } from "@/Model/Dropdown/SliderData/SliderData";

const SwiperComponent = () => {
  return (
    <Swiper
      className="bg-white parent h-48 gap-1"
      spaceBetween={20}
      slidesPerView={7}
      mousewheel={{ invert: true }}
      scrollbar={{
        hide: true,
        draggable: true,
      }}
      modules={[Scrollbar]}
    >
      {roomOptions.map((data, index) => (
        <SwiperSlide className="bg-white parent ">
          <div className=" child w-full h-full flex flex-col px-2 justify-start">
            <Link
              key={index}
              // onClick={() => setHoveredIndex(-1)}
              href={`/rooms/${data.room.replace(/\s+/g, "-")}`}
              passHref
            >
              <h3 className="text-lg font-semibold uppercase py-2 text-gray-900">
                {data.room}
              </h3>
              <div className="paren w-[10rem] h-[5rem]">
                <Image
                  src={temp}
                  width={0}
                  height={0}
                  // layout="fill"
                  className="child object-cover w-full h-full"
                  alt="Room Image"
                />
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-scrollbar child w-full h-full bg-black rounded-full" />
    </Swiper>
  );
};

export default SwiperComponent;
