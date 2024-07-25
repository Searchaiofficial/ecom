"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { selecteddbItems, setDbItems } from "../Features/Slices/cartSlice";

function Card(props) {
  const dispatch = useDispatch();

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
          src={"/icons/star-full-black.svg"}
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
          src={"/icons/star-half-black-half-white.svg"}
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
          src={"/icons/star-full-white.svg"}
          height={20}
          width={20}
          alt="empty-star"
          className="h-[1em] w-[1em] hover:text-gray-600"
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

  const [slide, setSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setSlide(slide === props.imgSrc.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? props.imgSrc.length - 1 : slide - 1);
  };

  // const startDate = new Date(props?.specialPrice?.startDate);
  // const endDate = new Date(props?.specialPrice?.endDate);

  // const formattedStartDate = startDate.toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  // });
  // const formattedEndDate = endDate.toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  // });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  const imageData = props.productImages?.map((item) => {
    return {
      color: item.color,
      image: item.images[0],
    };
  });

  const colors = props.productImages?.map((item) => item.color);
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const productImages = props.productImages;

  console.log({
    selectedColor,
    colorImages: productImages.find((item) => item.color === selectedColor),
  });

  const [colorImage, setColorImage] = useState("");

  const [isNavigationHovered, setIsNavigationHovered] = useState(false);

  const [Reviews, setReviews] = useState([]);
  const [Starts, setStars] = useState();

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getReview?productId=${props.id}`
      );

      setReviews(response.data);
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
          src={"/icons/star-full-black.svg"}
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
          src={"/icons/star-half-black-half-white.svg"}
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
          src={"/icons/star-full-white.svg"}
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
  }, [props.id]);

  function calculateAverageRating(reviews) {
    if (reviews.length > 0) {
      const totalRatings = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRatings / reviews.length;
      return averageRating;
    }

    return 0;
  }

  const [inCart, setInCart] = useState(props?.inCart);

  useEffect(() => {
    const averageRating = calculateAverageRating(Reviews);
    const stars = renderStars(averageRating);
    setStars(stars);
  }, [Reviews]);

  const cartData = useSelector(selecteddbItems);

  const addProductToCart = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
      {
        deviceId: localStorage.getItem("deviceId"),
        productId: props.id,
        quantity: 1,
      }
    );
    console.log(response.data);
    if (response.status === 200) {
      setInCart(true);
      dispatch(setDbItems(response.data));
    }
  };

  const [showCart, SetShowCart] = useState(false);

  useEffect(() => {
    setInCart(props.inCart);
    // console.log(inCart)
  }, [props.inCart]);

  useEffect(() => {
    if (imageData?.length > 0) {
      setColorImage(imageData[0]?.image);
    }
  }, []);

  console.log(props);

  const getExpectedDeliveryDate = (expectedDelivery) => {
    const today = new Date();
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() + expectedDelivery);
    return expectedDate.toDateString(); // Format the date as a readable string
  };

  return (
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
        {props.demandtype && (
          <div
            className={
              "flex text-[12px] justify-between text-black font-normal bg-white absolute top-2 left-2 z-10 py-[.1rem] px-[.5rem]"
            }
          >
            {props.productType === "special" ? "Top Rated" : props.demandtype}
            {/* {props.demandtype} */}
          </div>
        )}

        <div
          className="relative flex h-full w-full items-center justify-center cursor-pointer aspect-square"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && slide !== 0 && (
            <Image
              onMouseEnter={() => setIsNavigationHovered(true)}
              onMouseLeave={() => setIsNavigationHovered(false)}
              loading="lazy"
              src="/icons/backarrow-w.svg"
              height={20}
              width={20}
              alt="arrow"
              onClick={prevSlide}
              className="arrow arrow-left hover:opacity-[1.0] hover:scale-105"
            />
          )}

          <div className="">
            {selectedColor !== ""
              ? productImages
                  .find((item) => item.color === selectedColor)
                  ?.images?.map((src, idx) => (
                    <Link
                      href={`/${props.title.replace(/ /g, "-")}`}
                      key={idx}
                      aria-label={`View details about ${props.title}`}
                    >
                      <Image
                        src={
                          isHovered && !isNavigationHovered
                            ? productImages.find(
                                (item) =>
                                  item.color ===
                                  colors.find((item) => item === selectedColor)
                              )?.images[1]
                            : src
                        }
                        alt={`Image of ${props.title}`}
                        height={300}
                        width={300}
                        // onClick={() => handleClick(props.title, props.category)}
                        // loading="eager"
                        className={
                          slide === idx
                            ? "aspect-square w-[400px]"
                            : "slide-hidden"
                        }
                      />
                    </Link>
                  ))
              : props.imgSrc?.map((item, idx) => (
                  <Link
                    href={`/${props.title.replace(/ /g, "-")}`}
                    key={idx}
                    aria-label={`View details about ${props.title}`}
                  >
                    <Image
                      src={
                        isHovered && !isNavigationHovered
                          ? props.imgSrc[1]
                          : colorImage || item
                      }
                      alt={`Image of ${props.title}`}
                      height={300}
                      width={300}
                      // onClick={() => handleClick(props.title, props.category)}
                      // loading="eager"
                      className={
                        slide === idx
                          ? "aspect-square w-[400px]"
                          : "slide-hidden"
                      }
                    />
                  </Link>
                ))}
          </div>

          {isHovered && (
            <Image
              onMouseEnter={() => setIsNavigationHovered(true)}
              onMouseLeave={() => setIsNavigationHovered(false)}
              src="/icons/rightarrow-w.svg"
              height={30}
              width={30}
              alt="arrow"
              onClick={nextSlide}
              className="arrow arrow-right hover:opacity-1"
            />
          )}

          <span className="flex items-center absolute bottom-[16px]">
            {props.imgSrc.map((_, idx) => (
              <div
                key={idx}
                className={`h-[0.4rem] w-[0.4rem] rounded-[50%] mr-1 ${
                  slide === idx ? "bg-white" : "bg-[#cccc]"
                }`}
              ></div>
            ))}
          </span>
        </div>
      </div>
      <div
        onMouseEnter={() => SetShowCart(true)}
        onMouseLeave={() => SetShowCart(false)}
      >
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            {props.productType === "special" && (
              <p className="font-medium text-[#0152be] mb-1 text-[12px]">
                Ayatrio Member Favorite
              </p>
            )}
            <h3 className="text-[15px] font-semibold">{props.title}</h3>
          </div>
        </div>
        <p className="font-normal mb-1 text-[14px] py-[2px]">
          {props?.shortDescription}
        </p>

        <div className=" flex h-[40px] pb-[6px] items-center justify-between mt-2">
          {props.productType === "normal" || props.productType === "special" ? (
            <div className="flex gap-1 items-end">
              <p
                className={`text-3xl flex font-semibold leading-[0.5] tracking-wide ${
                  props.specialPrice?.price
                    ? "bg-[#FFD209] px-2 pt-3 pb-1 w-fit shadow-lg"
                    : ""
                }`}
                style={
                  props?.specialPrice?.price
                    ? { boxShadow: "3px 3px #C31952" }
                    : {}
                }
              >
                <span
                  className={`text-sm ${
                    props?.specialPrice?.price ? "" : "pt-3.5"
                  }`}
                >
                  Rs. &nbsp;
                </span>{" "}
                {props?.specialPrice?.price ? (
                  props?.specialPrice?.price
                ) : (
                  <p className="pt-3">
                    {props?.discountedprice?.price
                      ? props?.discountedprice?.price
                      : props?.price}
                  </p>
                )}
              </p>
              {props.unitType ? (
                <span className="tracking-wide text-sm font-semibold">{`/${props.unitType}`}</span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="flex gap-1 items-end">Request Now</div>
          )}

          {showCart && (
            <div
              className="bg-[#0152be] p-1.5 mr-2 rounded-full"
              onClick={addProductToCart}
            >
              <Image
                loading="lazy"
                src={"/icons/ad-to-cart.svg"}
                height={20}
                width={20}
                className="cursor-pointer rounded-full"
              />
            </div>
          )}
        </div>

        {(props?.specialPrice?.price || props?.discountedprice?.price) && (
          <div className="flex flex-col my-3">
            <p className="text-[#757575] text-[12px] pt-[3px]">
              Regular price: Rs.{props?.price} (incl. of all taxes)
            </p>

            {props?.specialPrice?.startDate && props?.specialPrice?.endDate ? (
              <p className="text-[#757575] text-[12px] ">
                Price valid {formatDate(props?.specialPrice?.startDate)} -{" "}
                {formatDate(props?.specialPrice?.endDate)}
              </p>
            ) : props?.discountedprice?.startDate &&
              props?.discountedprice?.endDate ? (
              <p className="text-[#757575] text-[12px] ">
                Price valid {formatDate(props?.discountedprice?.startDate)} -{" "}
                {formatDate(props?.discountedprice?.endDate)}
              </p>
            ) : null}
          </div>
        )}
        {/* {props?.rating > 0 && ( */}
        <>
          {/* <div className="card-rating">{props.rating}</div> */}
          {Starts && (
            <div className="flex items-center mt-1">
              {Starts}
              <p className="text-[14px] mt-1 ml-2">({Reviews?.length})</p>
            </div>
          )}
        </>
        {/* )} */}
        {props.expectedDelivery && (
          <div className="flex flex-col items-start mt-2">
            <div className="flex items-center">
              {props.expectedDelivery <= 5 && (
                <img
                  alt="speedDelivery"
                  loading="lazy"
                  src={"/icons/speeddelivery.svg"}
                  height={25}
                  width={25}
                />
              )}
            </div>
            <p className="text-[#757575] text-[12px] mt-2">
              Expected delivery on &nbsp;
              <span className="text-[#0152be] font-md font-semibold">
                {getExpectedDeliveryDate(props.expectedDelivery)}
              </span>
            </p>
          </div>
        )}

        {imageData?.length > 1 && (
          <div className="colorContainer flex flex-col sm:w-auto w-[80vw] mt-1">
            <div className="w-full flex justify-between mb-1">
              <p className="text-[12px] font-normal">Colours</p>
            </div>
            <div className=" flex gap-1.5">
              {imageData.map((item, index) => (
                <div
                  key={index}
                  // onClick={() => handleColor(item.image)}
                  onClick={() => setSelectedColor(item.color)}
                  className={`relative w-[40px] h-[40px] text-center flex justify-center items-center cursor-pointer
            ${selectedColor === item.color ? "border-black" : "border-black"}
          `}
                >
                  <Image
                    className="w-full h-full object-cover"
                    src={item.image}
                    alt={item.color}
                    layout="fill"
                    objectFit="cover"
                    loading="lazy"
                  />
                  {selectedColor === item.color ? (
                    <div className="w-full h-[2px] bg-black mt-[50px]" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
