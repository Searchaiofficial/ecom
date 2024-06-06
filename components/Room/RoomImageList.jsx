import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectProductImages, selectImages } from "../Features/Slices/imageDataSlice";
import "./styles.css";
import Link from "next/link";

export default function RoomImageList() {
  const productImages = useSelector(selectProductImages);
  const images = useSelector(selectImages);

  const imagesToDisplay = productImages.length > 0 ? productImages[0].images : images;

  return (
    <div className="flex flex-col">
      <div className="imggallery w-[60vw]">
        <div className="sm:grid hidden sm:grid-cols-2 sm:grid-rows-2 gap-3">
          <Link href={"/login"} className="absolute z-10 top-12 right-3 opacity-85 hover:opacity-100 bg-white p-[6px] hover:scale-105 transition-transform rounded-full" style={{ boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.12)' }}>
            <Image src={"/svg/icon/like.svg"} height={20} width={20} className="cursor-pointer" />
          </Link>
          {imagesToDisplay?.map((image, index) => (
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
      <div className="hidden lg:flex items-center self-center border-2 relative -top-7 bg-white py-3 px-6 gap-4">
        <button
          className="bg-white text-gray-800 hover:text-gray-600 font-bold text-[14px] uppercase"
        >
          Show more
        </button>
        <Image
          src={"/svg/dropdown/backarrowRevarce.svg"}
          height={25}
          width={25}
          alt="downarrow"
          className="rotate-90 hover:text-gray-600"
        />
      </div>
    </div>
  );
}
