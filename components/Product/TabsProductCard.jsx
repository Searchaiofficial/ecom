import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import axios from "axios";
import {
  selectQuantity,
  updateQuantity,
} from "../Features/Slices/calculationSlice";
import { setDbItems } from "../Features/Slices/cartSlice";

function TabsProductCard(props) {
  const [slide, setSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();

  // const [reviews, setReviews] = useState([]);
  const [Reviews, setReviews] = useState([]);

  // const [stars, setStars] = useState([]);
  const [Starts, setStars] = useState();

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
    // console.log(averageRating);
    const stars = renderStars(averageRating); // Assuming renderStars is defined somewhere
    setStars(stars);
  }, [Reviews]);

  const handleclick = async (title) => {
    console.log(title);
    dispatch({ type: "FETCH_ROOM_REQUEST", payload: title });
  };

  const [formattedDate, setFormattedDate] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const startDate = new Date(props.specialprice?.startDate);
    const endDate = new Date(props.specialprice?.endDate);

    const startMonth = startDate.toLocaleString("default", { month: "long" });
    const startDay = startDate.getDate();

    const endMonth = endDate.toLocaleString("default", { month: "long" });
    const endDay = endDate.getDate();
    setFormattedDate({
      startDate: `${startMonth} ${startDay}`,
      endDate: `${endMonth} ${endDay}`,
    });
  }, []);

  const nextSlide = () => {
    setSlide(slide === props.images.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? props.images.length - 1 : slide - 1);
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

  const [selectedColor, setSelectedColor] = useState("");
  const [colorImage, setColorImage] = useState("");
  const [showCart, SetShowCart] = useState(false);

  useEffect(() => {
    setInCart(props.inCart);
    // console.log(inCart)
  }, [props.inCart]);

  const imageData = props?.text?.productImages?.map((item) => {
    return {
      color: item.color,
      image: item.images[0],
    };
  });

  const handleColor = (imagesrc) => {
    console.log(imagesrc);
    setColorImage(imagesrc);
  };

  // const quantity = useSelector(selectQuantity);

  const addProductToCart = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
      {
        deviceId: localStorage.getItem("deviceId"),
        productId: props.id,
        quantity: 1,
      }
    );
    if (response.status === 200) {
      setInCart(true);
      dispatch(setDbItems(response.data));
    }
    // console.log(response.data)
  };
  console.log(imageData);
  useEffect(() => {
    if (imageData?.length > 0) {
      setColorImage(imageData[0]?.image);
    }
  }, []);

  console.log(props);
  return (
    <>
      <div
        key={props.idx}
        className="flex flex-col  border-b border-r  sm:border-none "
        onClick={() => props.handlenav(props.text._id)}
      >
        <div className="relative z[-999999] w-fit">
          <div
            onClick={(event) => event.stopPropagation()}
            className={`flex justify-between text-black   checkbox-div absolute top-0 right-0 z-10 ${
              props.selectedpdt.includes(props.text) ? "visible" : ""
            }`}
          >
            <input
              type="checkbox"
              onChange={(e) => {
                props.handleCheckbox(props.text, e.target.checked);
                props.setShowcompare(true);
              }}
              style={{
                border: "2px solid red",
              }}
              checked={props.selectedpdt.includes(props.text)}
              className="accent-black"
            />
          </div>
          {props.parentCategory === "offers" ? (
            <div
              className={
                "flex text-[12px] justify-between text-black font-normal bg-white py-[.1rem] px-[.5rem] absolute top-2 left-2 z-10"
              }
            >
              {props.offer}
            </div>
          ) : props.demandtype ? (
            <div
              className={
                "flex text-[12px] justify-between text-black font-normal bg-white py-[.1rem] px-[.5rem] absolute top-2 left-2 z-10"
              }
            >
              {props.demandtype === "Ayatrio Member Favorite"
                ? "Top Rated"
                : props.demandtype}
            </div>
          ) : (
            ""
          )}
          <div
            className="relative flex h-full w-full items-center justify-center  aspect-square"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)} // for touch devices
            onTouchEnd={() => setIsHovered(false)} // for touch devices
          >
            {isHovered && slide !== 0 && (
              <Image
                src="/icons/backarrow-w.svg"
                height={20}
                width={20}
                alt="arrow"
                onClick={prevSlide}
                className="arrow arrow-left hover:opacity-100"
              />
            )}
            {props.images?.map((item, idx) => {
              return (
                <Link
                  href={`/product/${props.productTitle}`}
                  onClick={() => handleclick(props.productTitle)}
                >
                  <Image
                    src={
                      isHovered
                        ? props.images[1]
                        : colorImage
                        ? colorImage
                        : item
                    }
                    alt="NA"
                    key={idx}
                    height={300}
                    width={300}
                    className={
                      slide === idx ? "aspect-square w-[400px]" : "hidden"
                    }
                  />
                </Link>
              );
            })}

            {isHovered && (
              <div>
                <Image
                  src="/icons/rightarrow-w.svg"
                  height={20}
                  width={20}
                  alt="arrow"
                  onClick={nextSlide}
                  className="arrow arrow-right hover:opacity-100"
                />
              </div>
            )}
            <span className="flex absolute bottom-[16px]">
              {props.images.map((_, idx) => {
                return (
                  <button
                    key={idx}
                    className={
                      slide === idx
                        ? "bg-white w-[0.4rem] h-[0.4rem] cursor-pointer rounded-[50%] mr-1"
                        : "bg-[#ccc] w-[0.4rem] h-[0.4rem] cursor-pointer rounded-[50%] mr-1"
                    }
                    onClick={() => setSlide(idx)}
                  ></button>
                );
              })}
            </span>
          </div>
        </div>
        {/* {props.demandtype === "Ayatrio Member Favorite" && (
          <p className="font-medium text-blue-500 mt-[10px] text-[12px]">
            {props.demandtype}
          </p>
        )} */}
        {/* <p className="text-lg font-semibold hover:underline">
          {props.productTitle}
        </p> */}
        <div
          onMouseEnter={() => SetShowCart(true)}
          onMouseLeave={() => SetShowCart(false)}
        >
          <div className="flex items-center justify-between pt-2 ">
            <div className=" flex flex-col">
              {props.demandtype === "Ayatrio Member Favorite" && (
                <p className="font-medium text-[#0152be]  mb-[3px] text-[12px]">
                  {props.demandtype}
                </p>
              )}
              <div
                className={` text-[14px] font-semibold ${
                  props.demandtype === "Ayatrio Member Favorite" ? "" : ""
                }`}
              >
                {props.productTitle}
              </div>
            </div>
          </div>
          {/* <p className="text-sm">{props.productDescription}</p> */}
          <div className=" font-normal mb-1 text-[14px] py-[2px] font-[400px]">
            {props?.shortDescription}
          </div>

          {props.productType === "normal" ? (
            <>
              <div className=" flex h-[40px] pb-[6px] items-center justify-between mt-2">
                <div className="flex gap-1 items-end">
                  <h2
                    className={`text-3xl flex font-semibold leading-[0.5]  tracking-wide ${
                      props?.specialprice?.price
                        ? "bg-[#FFC21F] px-2 pt-3 pb-1 w-fit shadow-lg"
                        : ""
                    } `}
                    style={
                      props?.specialprice?.price
                        ? { boxShadow: "3px 3px #C31952" }
                        : {}
                    }
                  >
                    <span
                      className={`text-sm ${
                        props?.specialprice?.price ? "" : "pt-3.5"
                      }`}
                    >
                      Rs. &nbsp;
                    </span>{" "}
                    {props?.specialprice?.price ? (
                      props?.specialprice?.price
                    ) : (
                      <p className="pt-3 ">{props.totalPrice}</p>
                    )}
                  </h2>
                  {props.unitType ? (
                    <span className="tracking-wide text-sm">{`/ ${props.unitType}`}</span>
                  ) : (
                    ""
                  )}
                </div>
                {showCart && (
                  <div
                    className="bg-[#0152be] p-[6px] mr-2 rounded-full"
                    onClick={addProductToCart}
                  >
                    <Image
                      src={"/icons/ad-to-cart.svg"}
                      height={20}
                      width={20}
                      className="cursor-pointer rounded-full"
                    />
                  </div>
                )}
              </div>
              {props?.specialprice?.price && (
                <div className="flex flex-col my-3">
                  <p className="text-[#757575] text-[12px] pt-[3px]">
                    Regular price: Rs.{props?.totalPrice} (incl. of all taxes)
                  </p>
                  {props?.specialPrice?.startDate &&
                    props?.specialPrice?.endDate && (
                      <p className="text-[#757575] text-[12px] ">
                        Price valid {formattedStartDate} - {formattedEndDate}
                      </p>
                    )}
                </div>
              )}
            </>
          ) : (
            <div className=" flex h-[40px] pb-[6px] items-center justify-between mt-2">
              <div className="flex gap-1 items-end">
                <h2
                  className={`text-xl flex font-semibold leading-[0.5]  tracking-wide bg-[#FFC21F] px-2 pt-3 pb-1 w-fit shadow-lg $ `}
                  style={{ boxShadow: "3px 3px #C31952" }}
                >
                  Request now
                </h2>
              </div>
            </div>
          )}

          {props?.rating > 0 && (
            <>
              <div className="card-rating">{props.rating}</div>
              {Starts && (
                <div className="flex items-center mt-1">
                  {Starts}
                  <p className="text-[14px] mt-1 ml-2">({Reviews?.length})</p>
                </div>
              )}
            </>
          )}

          {imageData?.length > 1 && (
            <div className="colorContainer flex flex-col sm:w-auto w-[80vw] mt-1 ">
              <div className="w-full flex justify-between mb-1">
                <h1 className="] text-[12px] font-medium">Colours</h1>
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
            ${
              selectedColor === item.color ||
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
                            colorImage === item.image && (

                              <div className="w-[100%] h-[2.5px] bg-black mt-[50px]" />
                            )


                          } */}

                        {colorImage === item.image ||
                        (index === 0 && colorImage === "") ? (
                          <div className="w-[100%] h-[2px] bg-black mt-[50px]" />
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                </>
              }
            </div>
          )}
        </div>

        {/* {props.discountedprice ? (
          <div>
            <p className="text-sm my-2 text-gray-500">Offer price</p>
            <p className=" text-sm font-semibold bg-yellow-400 price-box w-fit px-2 py-1">
              Rs.<span className="text-3xl">{props.discountedprice}</span>
            </p>
            <p className="text-sm mt-2 text-gray-500">
              Regular price: Rs.{props.totalPrice}
            </p>
          </div>
        ) : props.specialprice ? (
          <div>
            <p className=" text-sm font-semibold bg-yellow-400 price-box w-fit px-2 py-1">
              Rs.<span className="text-3xl">{props.specialprice?.price}</span>
            </p>
            <p className="text-sm mt-2 text-gray-500">
              Regular price: Rs.{props.totalPrice}
            </p>

            {props.specialprice.startDate && props.specialprice.endDate && (
              <p className="text-sm mt-1 text-gray-500">
                Price valid from {formattedDate.startDate} to{" "}
                {formattedDate.endDate}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm font-semibold">
            Rs.<span className="text-3xl">{props.totalPrice}</span>
          </p>
        )} */}
        {/* {props.ratings?.length > 0 && (
          <p className="flex flex-row items-center gap-1 text-sm text-black">
            {props.stars.map((star, index) => (
              <Image key={index} src={star} alt="star" width={15} height={15} />
            ))}
            ({props.ratings?.length})
          </p>
        )} */}
        {/* {reviews.length > 0 && (
          <div className="flex gap-2">
            <div className="flex items-center">{stars}</div>
            <p className="text-gray-800 underline w-[31px] h-[20px] cursor-pointer">
              {reviews.length}
            </p>
          </div>
        )} */}
      </div>
    </>
  );
}

export default TabsProductCard;
