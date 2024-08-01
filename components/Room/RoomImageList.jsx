import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectProductImages } from "../Features/Slices/imageDataSlice";
import "./styles.css";
import Link from "next/link";
import { selectColor } from "../Features/Slices/productColorSlice";
import axios from "axios";

export default function RoomImageList({ data, images, alt }) {
  const [zoomedImageIndex, setZoomedImageIndex] = useState(null);
  const imageContainerRefs = useRef([]);
  const productImages = useSelector(selectProductImages);

  const selectedColor = useSelector(selectColor);

  const colorImages = data?.productImages?.find(
    (item) => item.color === selectedColor
  )?.images;

  const imagesToDisplay =
    colorImages?.length > 0
      ? colorImages
      : productImages.length > 0
      ? productImages[0].images
      : images;

  const handleImageClick = (index, e) => {
    setZoomedImageIndex((prevIndex) => (prevIndex === index ? null : index));

    // Calculate initial transform origin based on click position relative to the image container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseMove = useCallback(
    (e, index) => {
      if (zoomedImageIndex !== index) return;

      const rect = e.target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      e.target.style.transformOrigin = `${x}% ${y}%`;
    },
    [zoomedImageIndex]
  );

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkUser = async () => {
    try {
      const token = localStorage?.getItem("token");
      if (token) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        if (data.isAuthenticated) {
          setLoggedInUser(data.user);
        } else {
          setLoggedInUser(null);
        }
      } else {
        setLoggedInUser(null);
      }
    } catch (error) {
      setLoggedInUser(null);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [data]);

  useEffect(() => {
    if (loggedInUser) {
      const checkProductLiked = loggedInUser.likedProducts.includes(data._id);
      setIsLiked(checkProductLiked);
    }
  }, [loggedInUser]);

  const handleLike = async () => {
    setLoading(true);
    if (loggedInUser && !isLiked) {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/likeProduct`,
        {
          productId: data._id,
          userId: loggedInUser._id,
        }
      );

      if (response.status === 200) {
        setIsLiked(true);
        setTotalLikes(response.data.likes);
      }
    }
    setLoading(false);
  };

  const handleUnlike = async () => {
    setLoading(true);
    if (loggedInUser && isLiked) {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/unlikeProduct`,
        {
          productId: data._id,
          userId: loggedInUser._id,
        }
      );

      if (response.status === 200) {
        setIsLiked(false);
        setTotalLikes(response.data.likes);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col relative">
      <div className="imggallery w-[60vw]">
        <div className="sm:grid hidden sm:grid-cols-2 sm:grid-rows-2 gap-3">
          {loggedInUser ? (
            <div
              className="absolute z-10 top-3 right-4 opacity-85 hover:opacity-100 flex gap-2 bg-white p-[6px]  rounded-full"
              style={{ boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.12)" }}
            >
              {isLiked ? (
                <button disabled={loading} onClick={handleUnlike}>
                  <Image
                    loading="lazy"
                    src={"/icons/like-fill.svg"}
                    height={20}
                    width={20}
                    className={`cursor-pointer  hover:scale-105 transition-transform`}
                    alt="like icon"
                  />
                </button>
              ) : (
                <button disabled={loading} onClick={handleLike}>
                  <Image
                    loading="lazy"
                    src={"/icons/like.svg"}
                    height={20}
                    width={20}
                    className={`cursor-pointer hover:scale-105 transition-transform`}
                    alt="like icon"
                  />
                </button>
              )}
              {totalLikes || data?.likes}
            </div>
          ) : (
            <Link
              href={"/login"}
              className="absolute z-10 top-3 right-3 opacity-85 hover:opacity-100 flex gap-2 bg-white p-[6px] rounded-full"
              style={{ boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.12)" }}
            >
              <Image
                loading="lazy"
                src={"/icons/like.svg"}
                height={20}
                width={20}
                className="cursor-pointer  hover:scale-105 transition-transform"
                alt="like icon"
              />

              {totalLikes || data?.likes}
            </Link>
          )}
          {imagesToDisplay?.map((image, index) => (
            <div
              key={index}
              className={`sm:col-span-1 bg-[#f5f5f5] sm:row-start-${
                index + 1
              } image-container `}
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
                className={`sm:w-full aspect-square object-cover ${
                  zoomedImageIndex === index ? "zoomed" : ""
                }`}
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
