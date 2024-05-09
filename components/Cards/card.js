import React, { useState, useEffect } from "react";
import "./styles.css";

import Carousel from "./swip";

import PopUp from "../Reviews/PopUp";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";

function Card(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleImageClick = () => {
    props.setPopupVisible(true);
  };
  const handleclick = async (id, category) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=${id}`;
    const response = await axios.get(url);
    const data = response.data;
    dispatch({ type: "FETCH_ROOM_REQUEST", payload: id });

    // router.push(`/product`);
  };
  const [slide, setSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setSlide(slide === props.imgSrc.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? props.imgSrc.length - 1 : slide - 1);
  };
  // useEffect(() => {

  // }, [dispatch]);
  return (
    <>
      <div
        key={props.cardkey}
        className="card pb-12"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div className={``}>
          <div
            className="relative flex h-full w-full items-center justify-center cursor-pointer aspect-square"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered && slide !== 0 && (
              <Image
                src="/ayatrio icon/left-card.svg"
                height={20}
                width={20}
                alt="arrow"
                onClick={prevSlide}
                className="arrow arrow-left"
              />
            )}
            <div className="w-[400px] overflow-hidden">
              {props.imgSrc?.map((item, idx) => {
                return (
                  <Link href={`/product/${props.title}`}>
                    <Image
                      src={item}
                      alt="NA"
                      key={idx}
                      height={300}
                      width={300}
                      onClick={() => handleclick(props.id, props.category)}
                      className={
                        slide === idx
                          ? "aspect-square w-full hover:scale-110 transition-all duration-300"
                          : "slide-hidden"
                      }
                    />
                  </Link>
                );
              })}
            </div>

            {isHovered && (
              <div>
                <Image
                  src="/ayatrio icon/right-card.svg"
                  height={20}
                  width={20}
                  alt="arrow"
                  onClick={nextSlide}
                  className="arrow arrow-right"
                />
              </div>
            )}
            <span className="flex absolute bottom-[16px]">
              {props.imgSrc.map((_, idx) => {
                return (
                  <button
                    key={idx}
                    className={
                      slide === idx
                        ? "indicator"
                        : "indicator indicator-inactive"
                    }
                    onClick={() => setSlide(idx)}
                  ></button>
                );
              })}
            </span>
          </div>
          {/* <Carousel data={props.imgSrc} className="card-img" /> */}
        </div>
        <div className="card-title">
          <div className="pt-[15px]">{props.title}</div>
        </div>
        <div className="card-date text-sm text-[#757575]">{props.desc}</div>
        <div className="card-price">
          <span className="font-medium pr-[3px] pt-[3px]">Rs.</span>
          <h2 className="text-xl font-medium tracking-wide">{props.price}</h2>
        </div>
        <div className="card-rating">
          {/* <img src="/svg/star-full-icon.svg" className="w-6 h-6" alt="" /> */}

          {props.rating}
        </div>
      </div>
      {props.isPopupVisible && (
        <PopUp
          isPopupVisible={props.isPopupVisible}
          closePopup={props.closePopup}
        />
      )}
    </>
  );
}

export default Card;
