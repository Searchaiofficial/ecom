import React from "react";
import Image from "next/image";

import "./styles.css";
import { useSelector } from "react-redux";
import { selectProductImages } from "../Features/Slices/imageDataSlice";

export default function RoomImageList() {
  const data = useSelector(selectProductImages);
  console.log(data)

  return (
    <div className="flex flex-col">
      <div className="imggallery w-[60vw]">
        <div className="sm:grid hidden sm:grid-cols-2 sm:grid-rows-2 gap-3">
          {data[0]?.images?.map((image, index) => (
            <div
              key={index}
              className={`sm:col-span-1 sm:row-start-${index + 1}`}
            >
              <Image
                src={image}
                alt={`Room Image ${index + 1}`}
                width={800}
                height={800}
                className="sm:w-full aspect-square object-cover"
              />
            </div>
          ))}

        </div>

      </div>
      <div className=" hidden lg:flex items-center self-center border-2 relative -top-7 bg-white  py-3 px-6 gap-4">
        <button
          className=" bg-white text-gray-800 hover:text-gray-600 font-bold text-[14px] uppercase"
        >
          Show more
        </button>
        <Image src={"/svg/dropdown/backarrowRevarce.svg"} height={25} width={25} alt="downarrow" className="rotate-90 hover:text-gray-600" />
      </div>
    </div>
  );
}
