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
  const startDate = new Date(props?.specialPrice?.startDate);
  const endDate = new Date(props?.specialPrice?.endDate);

  const formattedStartDate = startDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  // const [formattedDate, setFormattedDate] = useState({
  //   startDate: "",
  //   endDate: "",
  // });

  console.log(props)

  const imageData = props.productImages?.map((item) => {
    return {
      color: item.color,
      image: item.images[0],
    };
  });

  console.log(imageData)
  const [selectedColor, setSelectedColor] = useState("");

  const handleColor = () => {
    console.log("")
  }


  return (
    <>
      <div
        key={props.cardkey}
        className="card pb-12 "
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div className={`relative`}>
          {props.demandtype ? (
            <div
              className={
                "flex text-[12px] justify-between text-black font-normal bg-white py-1 px-3 absolute top-2 left-2 z-10"
              }
            >
              {props.demandtype === "Ayatrio Member Favorite" ? "Top Rated" : props.demandtype}
            </div>
          ) : (
            ""
          )}
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
              // className="absolute filter drop-shadow-sm w-7 h-7  text-white opacity-85 group hover:cursor-pointer hover:opacity-100 hover:scale-104 hover:filter-drop-shadow-lg  arrow-left"
              />
            )}
            <div className="w-[400px] overflow-hidden">
              {props.imgSrc?.map((item, idx) => {
                return (
                  <Link href={`/product/${props.title}`}>
                    <Image
                      src={isHovered ? props.imgSrc[2] : item}
                      alt="NA"
                      key={idx}
                      height={300}
                      width={300}
                      onClick={() => handleclick(props.title, props.category)}
                      className={
                        slide === idx
                          ? "aspect-square w-full"
                          : "slide-hidden"
                      }
                    />
                  </Link>
                );
              })}
            </div>

            {isHovered && (
              <div className="z-50">
                <Image
                  src="/ayatrio icon/right-card.svg"
                  height={30}
                  width={30}
                  alt="arrow"
                  onClick={nextSlide}
                  className="arrow arrow-right"
                // className="absolute filter drop-shadow-sm w-7 h-7 -mt-[13px] text-white opacity-85 group hover:cursor-pointer hover:opacity-100 hover:scale-104 hover:filter-drop-shadow-lg arrow-right"
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
                        ? "bg-white h-[0.4rem] w-[0.4rem] rounded-[50%] mr-1"
                        : "bg-[#cccc] h-[0.4rem] w-[0.4rem] rounded-[50%] mr-1"
                    }
                    onClick={() => setSlide(idx)}
                  ></button>
                );
              })}
            </span>
          </div>
        </div>
        <div>
          {
            imageData?.length > 0 && isHovered && (

              <div className="colorContainer flex flex-col sm:w-auto w-[80vw] ">
                <div className="w-full flex justify-between mb-2">
                  {/* <h1 className="] text-[14px] font-medium">Colours</h1> */}
                </div>
                {
                  <>
                    <div className="colors flex gap-1.5">
                      {imageData?.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleColor(item.color)}
                          className={`parent relative w-[40px] h-[40px] text-gray-900 text-center text-xs flex justify-center items-center cursor-pointer
            ${selectedColor === item.color ||
                              (index === 0 && selectedColor === "")
                              ? " border-black "
                              : " border-black"
                            }   
          `}
                        >
                          <Image
                            className="relative w-full h-full object-cover"
                            src={item.image}
                            alt={item.color}
                            width={0}
                            height={0}
                            layout="fill"
                            objectFit="cover"
                          />
                          {/* {
                            selectedColor === item.color ||
                              (index === 0 && selectedColor === "") ? (
                              <div className="w-[100%] h-[4px] bg-black mt-[70px]" />
                            ) : ""
                          } */}

                        </div>
                      ))}
                    </div>
                  </>
                }
              </div>
            )
          }
          <div className="flex items-center justify-between pt-2 ">
            <div className="card-title flex flex-col">
              {
                props.demandtype === "Ayatrio Member Favorite" && (

                  <p className="font-medium text-[#0076D3]  mb-[3px] text-[12px]">{props.demandtype}</p>
                )
              }
              <div className={` ${props.demandtype === "Ayatrio Member Favorite" ? "" : ""}`}>{props.title}</div>
            </div>

          </div>
          {/* {!isHovered && <div className="card-date text-sm text-[#757575]">{props.desc}</div>} */}
          <div className="card-date text-sm text-[#757575]">{props.desc}</div>
          {
            imageData?.length > 0 && (
              <div className="card-date text-sm text-[#757575]">{imageData?.length} Colours</div>
            )
          }

          <div className="card-price">
            {/* <span className="font-medium pr-[3px] pt-[3px]">Rs.</span>
          <h2 className="text-xl font-medium tracking-wide">{props.price}</h2> */}
            <h2 className={`text-3xl flex font-semibold leading-[0.5]  tracking-wide ${props.specialPrice ? "bg-[#FFC21F] px-2 pt-3 w-fit shadow-lg" : ""} `} style={props?.specialPrice ? { boxShadow: '3px 3px #ad3535' } : {}}>
              <span className={`text-sm ${props?.specialPrice?.price ? "" : "pt-3.5"}`}>Rs. &nbsp;</span>{" "}
              {props?.specialPrice?.price ? props?.specialPrice.price : <p className="pt-3 ">{props.price}</p>}
            </h2>{" "}
          </div>
          {
            props?.specialPrice && (
              <div className="flex flex-col mt-2">
                <p className="text-[#757575] text-[12px] pt-[3px]">Regular price: Rs.{props?.price} (incl. of all taxes)</p>
                {
                  props?.specialPrice?.startDate && props?.specialPrice?.endDate && (
                    <p className="text-[#757575] text-[12px] ">Price valid {formattedStartDate} - {formattedEndDate} or while supply lasts</p>
                  )
                }
              </div>
            )
          }
          <div className="card-rating">
            {/* <img src="/svg/star-full-icon.svg" className="w-6 h-6" alt="" /> */}

            {props.rating}
          </div>
          <div className="flex lg:gap-2 gap-1 mt-2 ">
            <Image src={"/svg/icon/adtocart.svg"} height={25} width={25} className="mr-2 cursor-pointer" />
            <Image src={"/svg/icon/like.svg"} height={30} width={25} className=" cursor-pointer" />
          </div>


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
