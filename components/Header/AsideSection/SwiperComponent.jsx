// components/Slider.js
import Link from "next/link";
import React, { useEffect, useState } from "react";
import temp from "../../../public/product/room.jpg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import { Scrollbar } from "swiper/modules";
import { roomOptions } from "@/Model/Dropdown/SliderData/SliderData";

import DesignServices from '../HeaderServices/DesignServices';
import Offers from '../Offers/Offers';

import axios from "axios";

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
    <div
      className="bg-white parent min-h-fit px-4 w-full border-t"
    >
      {hoveredIndex === 3 &&
        roomOptions.map((data, index) => (
          <div>
            <div className="grid grid-cols-5 w-[80%] ">
              <div className="bg-white parent group" onClick={handleClick}>
                <div className=" child w-full h-full pt-10 flex flex-col px-2 justify-start">
                  <Link
                    key={index}
                    href={`/rooms/${data.room.replace(/\s+/g, "-")}`}
                    onClick={() => setHoveredIndex(null)}
                    passHref
                    className="flex flex-col gap-1"
                  >
                    <div className="parent w-[170px] h-[80px]">
                      <Image
                        src={data.src}
                        width={400}
                        height={400}
                        className="child w-[170px] h-[80px]"
                        alt="Room Image"
                      />
                    </div>
                    <h3 className="text-[14px] group-hover:underline font-semibold py-2 text-[#111111]">
                      {data.room}
                    </h3>
                  </Link>

                </div>
              </div>
            </div>
          </div>
        ))}

      <>
        {/* <div className="grid grid-cols-2 w-[35%] mt-5"> */}
        <div>
          {hoveredIndex === 4 && (
            // <>
            //   <h3 className="text-[14px] font-semibold py-2 text-gray-700 ml-2">See all the services</h3>
            //   {servicedData.map((service, index) => (
            //     <div key={index} className="bg-white parent" onClick={handleClick}>
            //       <div className="child h-full flex px-2 justify-start">
            //         <Link
            //           href={service.link}
            //           onClick={() => setHoveredIndex(null)}
            //           className="flex items-center gap-4"
            //         //PassHref
            //         >
            //           {/* <Image src={service.image} height={100} width={100} alt="service" /> */}
            //           {/* <p className="text-[8px]">⚫</p> */}
            //           <h3 className="text-[14px] py-2 text-gray-700 hover:underline">
            //             {service.label}
            //           </h3>
            //         </Link>
            //       </div>
            //     </div>
            //   ))}
            // </>
            <>
              <DesignServices />
            </>
          )}
        </div>

      </>

      {/* <div className="grid grid-cols-2 w-[35%] mt-5"> */}
      <div>

        {hoveredIndex === 5 && (
          // allOffers.map((offer, index) => (
          //   <div className="bg-white  parent " onClick={handleClick}>
          //     <div className=" child  h-full  flex px-2 justify-start ">
          //       <Link
          //         key={index}
          //         href={`/heading/offers/${offer.type.replace(/ /g, "-")}`}
          //         passHref

          //         onClick={() => setHoveredIndex(null)}
          //       >
          //         <h3 className="text-[14px] text-center font-semibold  py-2 text-gray-700 hover:underline">
          //           {offer.type}
          //           {console.log("all offers",allOffers)}
          //         </h3>
          //       </Link>
          //     </div>
          //   </div>
          // ))
          <Offers />
        )}
      </div>
    </div>
  );
};

export default SwiperComponent;
