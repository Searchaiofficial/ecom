// components/Slider.js
import Link from "next/link";
import React, { useEffect, useState } from "react";
import temp from "../../../public/product/room.jpg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import { Scrollbar } from "swiper/modules";
import { roomOptions } from "@/Model/Dropdown/SliderData/SliderData";
import axios from "axios";

const servicedData = [
  {
    image: "/Ayatrio updated icon/10 year warrante.svg",
    label: "Measuring service",
    link: "#"
  },
  {
    image: "/Ayatrio updated icon/10 year warrante.svg",
    label: "Installation Services",
    link: "/services/Installation"
  },
  {
    image: "/Ayatrio updated icon/10 year warrante.svg",
    label: "planning service",
    link: "/services/Planning"
  },
  {
    image: "/Ayatrio updated icon/10 year warrante.svg",
    label: "Interior design service",
    link: "#"
  },
  {
    image: "/Ayatrio updated icon/10 year warrante.svg",
    label: "Design your room",
    link: "#"
  },
  {
    image: "/Ayatrio updated icon/10 year warrante.svg",
    label: "Delivery and transport",
    link: "#"
  },
  {
    image: "/Ayatrio updated icon/10 year warrante.svg",
    label: "Returns and exchanges",
    link: "#"
  }
]

const SwiperComponent = ({ hoveredIndex, setHoveredIndex, handleChange }) => {
  const [allOffers, setAllOffers] = useState([]);

  const handleClick = () => {
    handleChange(false)
  }

  useEffect(() => {
    const fetchAllOffers = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllOffers`
      );
      setAllOffers(response.data);
    };
    if (hoveredIndex === 5) {
      fetchAllOffers();
    }
  }, []);
  return (
    <Swiper
      className="bg-white parent h-48 gap-1 w-screen"
      spaceBetween={20}
      slidesPerView={7}
      mousewheel={{ invert: true }}
      scrollbar={{
        hide: true,
        draggable: true,
      }}
      modules={[Scrollbar]}
    >
      {hoveredIndex === 3 &&
        roomOptions.map((data, index) => (
          <SwiperSlide className="bg-white parent " onClick={handleClick}>
            <div className=" child w-full h-full pt-10 flex flex-col px-2 justify-start ">
              <Link
                key={index}
                href={`/rooms/${data.room.replace(/\s+/g, "-")}`}
                onClick={() => setHoveredIndex(null)}
                passHref
              >
                <div className="parent w-[10rem] h-[5rem] ">
                  <Image
                    src={data.src}
                    width={400}
                    height={400}
                    className="child object-cover w-full h-full"
                    alt="Room Image"
                  />
                </div>
                <h3 className="text-[14px]  text-center font-semibold  py-2 text-gray-900">
                  {data.room}
                </h3>
              </Link>
            </div>
          </SwiperSlide>
        ))}

      {
        hoveredIndex === 4 && (
          servicedData.map((service, index) => (
            <SwiperSlide className="bg-white  parent " onClick={handleClick}>
              <div className=" child  h-full pt-10 flex px-2 justify-start ">
                <Link

                  key={index}
                  href={service.link}
                  // passHref
                  className="flex flex-col items-start"
                  onClick={() => setHoveredIndex(null)}
                >
                  <Image src={service.image} height={100} width={100} alt="service" />
                  <h3 className="text-[14px]  font-semibold  py-2 text-gray-900 hover:underline">
                    {service.label}
                  </h3>
                </Link>
              </div>
            </SwiperSlide>
          ))
        )
      }

      {hoveredIndex === 5 && (
        allOffers.map((offer, index) => (
          <SwiperSlide className="bg-white  parent " onClick={handleClick}>
            <div className=" child  h-full pt-10 flex px-2 justify-start ">
              <Link
                key={index}
                href={`/heading/offers/${offer.type.replace(/ /g, "-")}`}
                passHref

                onClick={() => setHoveredIndex(null)}
              >
                <h3 className="text-[14px] text-center font-semibold  py-2 text-gray-900 hover:underline">
                  {offer.type}
                </h3>
              </Link>
            </div>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default SwiperComponent;
