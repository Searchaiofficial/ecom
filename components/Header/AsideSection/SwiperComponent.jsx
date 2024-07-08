// components/Slider.js
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { roomOptions } from "@/Model/Dropdown/SliderData/SliderData";

import DesignServices from '../HeaderServices/DesignServices';
import Offers from '../Offers/Offers';

import axios from "axios";
import styles from '../styles.module.css'

const SwiperComponent = ({ hoveredIndex, setHoveredIndex, handleChange, toggleMobileMenu, handleClick }) => {
  const [allOffers, setAllOffers] = useState([]);

  const handleClickAll = () => {
    handleChange(false);
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
  }, [hoveredIndex]);

  const links = [
    { title: "Room Installation service", href: "#" },
    { title: "Flooring service", href: "#" },
    { title: "Kitchen Service", href: "#" },
    { title: "Room Decoration service", href: "#" },
  ];

  return (
    <div className=" parent overflow-y-auto pr-6 sm:px-4 w-full border-t border-solid border-[#f5f5f5]">
      {hoveredIndex === 3 && (
        <div className="flex sm:flex-row justify-between h-screen overflow-y-auto flex-col  sm:max-h-[72vh]">
          <div className={`grid grid-cols-2 sm:grid-cols-4  w-[100%] sm:w-[70%]  my-2`}>
            {roomOptions.map((data, index) => (
              <div className="bg-white parent group" onClick={handleClickAll} key={index}>
                <div className="child w-full h-full pt-3 flex flex-col px-2 justify-start">
                  <Link
                    href={`/rooms/${data.room.replace(/\s+/g, "-")}`}
                    onClick={() => setHoveredIndex(null)}
                    passHref
                    className="flex flex-col gap-1"
                  >
                    <div className="parent w-[170px] h-[80px]">
                      <Image loading="lazy"
                        src={data.src}
                        width={400}
                        height={400}
                        className="child w-[170px] h-[80px]"
                        alt={data.room}
                      />
                    </div>
                    <h3 className="text-[14px] group-hover:underline font-semibold py-3 text-[#111111]">
                      {data.room}
                    </h3>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:inline-block lg:h-full lg:w-[0.5px] lg:self-stretch lg:bg-[#e5e7eb]"></div>
          <div className="sm:w-[30%] w-[100%] mb-10 sm:mb-0">
            <div className={`h-full  pt-8 pb-12`}>
              <ul>
                {links.map((link, index) => (
                  <Link
                    href={link.href}
                    key={index}
                    className="flex items-center justify-between flex-1 hover:underline hover:bg-zinc-100 mx-2 md:mx-5  "
                  >
                    <li className="text-md font-semibold text-[#111111] py-3 ">
                      {link.title}
                    </li>
                    <Image loading="lazy"
                      src="/icons/backarrowRevarce.svg"
                      alt="right"
                      width={10}
                      height={10}
                      className="w-4 h-4 mr-4"
                    />
                  </Link>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}

      {hoveredIndex === 4 && <DesignServices handleChange={handleChange} handleClick={handleClickAll} toggleMobileMenu={toggleMobileMenu} />}

      {hoveredIndex === 5 && <Offers toggleMobileMenu={toggleMobileMenu} />}
    </div>
  );
};

export default SwiperComponent;
