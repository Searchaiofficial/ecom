"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";

import Carousel from "./swip";

import PopUp from "../Reviews/PopUp";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { selectQuantity, updateQuantity } from "../Features/Slices/calculationSlice";

function Card(props) {
  const dispatch = useDispatch();

  const handleImageClick = () => {
    props.setPopupVisible(true);
  };

  // const [reviews, setReviews] = useState([]);
  // const [stars, setStars] = useState([]);

  // const fetchReviews = async () => {
  //   try {
  //     console.log("props.id", props.id);
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getReview?productId=${props.id}`
  //     );

  //     console.log("reviews", response.data);

  //     if (Array.isArray(response.data) && response.data.length > 0) {
  //       setReviews(response.data);
  //     } else {
  //       console.error("Empty or invalid response data:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //   }
  // };

  function renderStars(averageRating) {
    const maxStars = 5;
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = maxStars - fullStars - halfStar;

    const starsArray = [];
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(
        <img
          key={i}
          src={"/icons/star.svg"}
          height={20}
          width={20}
          alt="star"
          className="h-[1em] w-[1em] hover:text-gray-600"
        />
      );
    }

    if (halfStar === 1) {
      starsArray.push(
        <img
          key={fullStars}
          src={"/icons/half-black-half-white.svg"}
          height={20}
          width={20}
          alt="half-star"
          className="h-[1em] w-[1em] hover:text-gray-600"
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      starsArray.push(
        <img
          key={fullStars + halfStar + i}
          src={"/icons/no-fill-star.svg"}
          height={20}
          width={20}
          alt="empty-star"
          className="h-[0.85em] w-[0.85em] hover:text-gray-600"
        />
      );
    }

    return starsArray;
  }

  useEffect(() => {
    fetchReviews();
    const stars = renderStars(3.6);
    setStars(stars);
  }, [props.id]);

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

  const [colorImage, setColorImage] = useState("")

  console.log(imageData);
  const [selectedColor, setSelectedColor] = useState("");

  const handleColor = (imagesrc) => {
    console.log(imagesrc)
    setColorImage(imagesrc)
  }

  const [Reviews, setReviews] = useState([])
  const [Starts, setStars] = useState()

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getReview?productId=${props.id}`
      );
      console.log("reviews", response.data);

      // if (Array.isArray(response.data) && response.data.length > 0) {
      //   setReviews(response.data);
      // } else {
      //   console.error("Empty or invalid response data:", response.data);
      // }

      setReviews(response.data)
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  function renderStars(averageRating) {
    const maxStars = 5;
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = maxStars - fullStars - halfStar;

    const starsArray = [];
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(
        <img
          key={i}
          src={"/icons/full-black.svg"}
          height={15}
          width={15}
          alt="star"
          className=" mr-[2px]  hover:text-gray-600"
        />
      );
    }

    if (halfStar === 1) {
      starsArray.push(
        <img
          key={fullStars}
          src={"/icons/half-black-half-white.svg"}
          height={15}
          width={15}
          alt="half-star"
          className=" mr-[2px] hover:text-gray-600"
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      starsArray.push(
        <img
          key={fullStars + halfStar + i}
          src={"/icons/full-white.svg"}
          height={15}
          width={15}
          alt="empty-star"
          className=" mr-[2px]  hover:text-gray-600"
        />
      );
    }

    return starsArray;
  }



  useEffect(() => {
    fetchReviews();

    // const stars = renderStars(3.6);
    // setStars(stars)

  }, [props.id]);

  // console.log(Reviews)

  function calculateAverageRating(reviews) {
    if (reviews.length > 0) {
      const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalRatings / reviews.length;
      return averageRating;
    }

    return 0
  }




  const [inCart, setInCart] = useState(props?.inCart)


  useEffect(() => {

    const averageRating = calculateAverageRating(Reviews);
    // console.log(averageRating);
    const stars = renderStars(averageRating); // Assuming renderStars is defined somewhere
    setStars(stars);

  }, [Reviews]);

  const quantity = useSelector(selectQuantity);

  const addProductToCart = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`, {
      deviceId: localStorage.getItem("deviceId"),
      productId: props.id,
      quantity: 1
    })
    if (response.status === 200) {
      setInCart(true)
      dispatch(updateQuantity(quantity + 1))

    }
    // console.log(response.data)
  }


  const [showCart, SetShowCart] = useState(false)

  useEffect(() => {
    setInCart(props.inCart);
    // console.log(inCart)
  }, [props.inCart]);

  useEffect(() => {
    if (imageData?.length > 0) {

      setColorImage(imageData[0]?.image)
    }
  }, [])

  console.log(props)



  return (
    <>
      <div
        key={props.cardkey}
        className="card pb-12 "
        style={{
          width: "100%",
          height: "100%",
        }}
        onTouchStart={() => setIsHovered(true)} // for touch devices
        onTouchEnd={() => setIsHovered(false)} // for touch devices
      >
        <div className={`relative`}>
          {props.demandtype ? (
            <div
              className={
                "flex text-[12px] justify-between text-black font-normal bg-white py-1 px-3 absolute top-2 left-2 z-10"
              }
            >
              {props.demandtype === "Ayatrio Member Favorite"
                ? "Top Rated"
                : props.demandtype}
            </div>
          ) : (
            ""
          )}

          {/* <div className="absolute z-10 top-2 right-2 opacity-85 hover:opacity-100 bg-white p-[6px] hover:scale-105 transition-transform rounded-full" style={{ boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.12)' }}>
            <Image src={"/icons/like.svg"} height={20} width={20} className="cursor-pointer" />
          </div> */}

          <div
            className="relative flex h-full w-full items-center justify-center cursor-pointer aspect-square"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered && slide !== 0 && (
              <Image
                src="/icons/left-icon.svg"
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
                      // src={isHovered ? props.imgSrc[2] : item}
                      src={isHovered ? props.imgSrc[1] : colorImage ? colorImage : item}
                      alt="NA"
                      key={idx}
                      height={300}
                      width={300}
                      onClick={() => handleclick(props.title, props.category)}
                      className={
                        slide === idx ? "aspect-square w-full" : "slide-hidden"
                      }
                    />
                  </Link>
                );
              })}
            </div>

            {isHovered && (
              <div className="z-50">
                <Image
                  src="/icons/right-icon.svg"
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
        <div onMouseEnter={() => SetShowCart(true)} onMouseLeave={() => SetShowCart(false)}>
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              {props.demandtype === "Ayatrio Member Favorite" && (
                <p className="font-medium text-[#0152be] mb-1 text-[12px]">{props.demandtype}</p>
              )}
              <div className="text-[15px] font-semibold">{props.title}</div>
            </div>
          </div>
          <div className="font-normal mb-1 text-[14px] py-[2px] font-[400px]">{props?.shortDescription}</div>

          <div className=" flex h-[40px] pb-[6px] items-center justify-between mt-2">
            {/* <span className="font-medium pr-[3px] pt-[3px]">Rs.</span>
            <h2 className="text-xl font-medium tracking-wide">{props.price}</h2> */}
            <div className="flex gap-1 items-end">
              <h2 className={`text-3xl flex font-semibold leading-[0.5] tracking-wide ${props.specialPrice?.price ? "bg-[#FFC21F] px-2 pt-3 pb-1 w-fit shadow-lg" : ""}`} style={props?.specialPrice?.price ? { boxShadow: '3px 3px #C31952' } : {}}>
                <span className={`text-sm ${props?.specialPrice?.price ? "" : "pt-3.5"}`}>Rs. &nbsp;</span>{" "}
                {props?.specialPrice?.price ? props?.specialPrice?.price : <p className="pt-3">{props?.price}</p>}
              </h2>
              {props.unitType ? <span className="tracking-wide text-sm font-semibold">{`/${props.unitType}`}</span> : ''}
            </div>



            {showCart && (
              <div className="bg-[#0152be] p-1.5 mr-2 rounded-full" onClick={addProductToCart}>
                <Image src={"/icons/ad-to-cart.svg"} height={20} width={20} className="cursor-pointer rounded-full" />
              </div>
            )}
          </div>
          {
            props?.specialPrice?.price && (
              <div className="flex flex-col my-3">
                <p className="text-[#757575] text-[12px] pt-[3px]">Regular price: Rs.{props?.price} (incl. of all taxes)</p>
                {
                  props?.specialPrice?.startDate && props?.specialPrice?.endDate && (
                    <p className="text-[#757575] text-[12px] ">Price valid {formattedStartDate} - {formattedEndDate}</p>
                  )
                }
              </div>
            )
          }
          {props?.rating > 0 && (
            <>
              <div className="card-rating">
                {props.rating}
              </div>
              {Starts && (
                <div className="flex items-center mt-1">
                  {Starts}
                  <p className="text-[14px] mt-1 ml-2">({Reviews?.length})</p>
                </div>
              )}
            </>
          )}

          {/* <div className="flex lg:gap-2 gap-1 mt-2 ">
            <Image src={"/icons/adtocart.svg"} height={25} width={25} className="mr-2 cursor-pointer" />
            <Image src={"/icons/like.svg"} height={30} width={25} className=" cursor-pointer" />
          </div> */}

          {/* {
            Starts &&
            <div className="flex items-center mt-1">
              {Starts}
              <p className="text-[14px] mt-1 ml-2">({Reviews.length})</p>
            </div>
          } */}



          {
            imageData?.length > 1 && (

              <div className="colorContainer flex flex-col sm:w-auto w-[80vw] mt-1 ">
                <div className="w-full flex justify-between mb-1">
                  <h1 className="] text-[12px] font-normal">Colours</h1>
                </div>
                {
                  <>
                    <div className="colors flex gap-1.5">
                      {imageData?.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleColor(item.image)}
                          // onMouseLeave={() => setColorImage(null)}

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

                          {
                            colorImage === item.image ||
                              (index === 0 && colorImage === "") ? (
                              <div className="w-[100%] h-[4px] bg-black mt-[50px]" />
                            ) : ""
                          }

                        </div>
                      ))}
                    </div>
                  </>
                }
              </div>

            )}
        </div>

      </div >
    </>
  );
}

export default Card;
