import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  selectProductImages,
  selectImages,
} from "../Features/Slices/imageDataSlice";
import "./styles.css";
import Link from "next/link";

export default function RoomImageList({ images, alt }) {
  const [zoomedImageIndex, setZoomedImageIndex] = useState(null);
  const imageContainerRefs = useRef([]);
  const productImages = useSelector(selectProductImages);

  const imagesToDisplay =
    productImages.length > 0 ? productImages[0].images : images;

  const handleImageClick = (index, e) => {
    setZoomedImageIndex((prevIndex) => (prevIndex === index ? null : index));

    // Calculate initial transform origin based on click position relative to the image container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseMove = useCallback((e, index) => {
    if (zoomedImageIndex !== index) return;

    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    e.target.style.transformOrigin = `${x}% ${y}%`;
  }, [zoomedImageIndex]);

  return (
    <div className="flex flex-col relative">
      <div className="imggallery w-[60vw]">
        <div className="sm:grid hidden sm:grid-cols-2 sm:grid-rows-2 gap-3">
          <Link
            href={"/login"}
            className="absolute z-10 top-3 right-3 opacity-85 hover:opacity-100 bg-white p-[6px] hover:scale-105 transition-transform rounded-full"
            style={{ boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.12)" }}
          >
            <Image
              loading="lazy"
              src={"/icons/like.svg"}
              height={20}
              width={20}
              className="cursor-pointer"
              alt="like icon"
            />
          </Link>
          {imagesToDisplay?.map((image, index) => (
            <div
              key={index}
              className={`sm:col-span-1 sm:row-start-${index + 1} image-container `}
              onClick={(e) => handleImageClick(index, e)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              ref={(el) => (imageContainerRefs.current[index] = el)}
            >
              <Image
                loading="lazy"
                src={image}
                alt={alt}
                width={800}
                height={800}
                className={`sm:w-full aspect-square object-cover ${zoomedImageIndex === index ? "zoomed" : ""}`}
              />

            </div>
          ))}

        </div>
      </div>
      {imagesToDisplay?.length > 4 && (
        <div className="hidden lg:flex items-center self-center border-2 relative -top-7 bg-white py-3 px-6 gap-4">
          <button className="bg-white text-gray-800 hover:text-gray-600 font-bold text-[14px] uppercase">
            Show more
          </button>
          <Image
            loading="lazy"
            src={"/icons/backarrowRevarce.svg"}
            height={25}
            width={25}
            alt="downarrow"
            className="rotate-90 hover:text-gray-600"
          />
        </div>
      )}
    </div>
  );
}
