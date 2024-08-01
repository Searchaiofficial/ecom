import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import "./styles.css";
import axios from "axios";
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

  // const [formattedDate, setFormattedDate] = useState({
  //   startDate: "",
  //   endDate: "",
  // });

  // useEffect(() => {
  //   const startDate = new Date(props.specialprice?.startDate);
  //   const endDate = new Date(props.specialprice?.endDate);

  //   const startMonth = startDate.toLocaleString("default", { month: "long" });
  //   const startDay = startDate.getDate();

  //   const endMonth = endDate.toLocaleString("default", { month: "long" });
  //   const endDay = endDate.getDate();
  //   setFormattedDate({
  //     startDate: `${startMonth} ${startDay}`,
  //     endDate: `${endMonth} ${endDay}`,
  //   });
  // }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

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

  // const [selectedColor, setSelectedColor] = useState("");
  const [colorImage, setColorImage] = useState("");
  // const [showCart, SetShowCart] = useState(false);

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

  const getExpectedDeliveryDate = (expectedDelivery) => {
    const today = new Date();
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() + expectedDelivery);
    return expectedDate.toDateString(); // Format the date as a readable string
  };

  const colors = props.productImages?.map((item) => item.color);
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const productImages = props.productImages;
  const [isNavigationHovered, setIsNavigationHovered] = useState(false);

  console.log({ productImagesTest: props.images });

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
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
  }, [props._id]);

  useEffect(() => {
    if (loggedInUser) {
      const checkProductLiked = loggedInUser.likedProducts.includes(props.id);
      setIsLiked(checkProductLiked);
    }
  }, [loggedInUser]);

  const handleLike = async () => {
    setLoading(true);
    if (loggedInUser && !isLiked) {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/likeProduct`,
        {
          productId: props.id,
          userId: loggedInUser._id,
        }
      );

      if (response.status === 200) {
        setIsLiked(true);
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
          productId: props.id,
          userId: loggedInUser._id,
        }
      );

      if (response.status === 200) {
        setIsLiked(false);
      }
    }
    setLoading(false);
  };

  const splitPeriod = (startDate, endDate, chunkSize) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const result = [];

    while (start <= end) {
      const chunkEnd = new Date(start);
      chunkEnd.setDate(start.getDate() + chunkSize - 1);
      result.push({
        from: new Date(start), // Store date objects directly
        to:
          chunkEnd <= end
            ? new Date(chunkEnd.setHours(23, 59, 59, 999))
            : new Date(end.setHours(23, 59, 59, 999)),
      });
      start.setDate(start.getDate() + chunkSize);
      start.setHours(0, 0, 0, 0); // Reset time to start of the day
    }
    return result;
  };

  const [currentPeriod, setCurrentPeriod] = useState(null);

  useEffect(() => {
    const currentDate = new Date(); // Use current date
    const startDate =
      props.specialprice?.startDate || props.discountedprice?.startDate;
    const endDate =
      props.specialprice?.endDate || props.discountedprice?.endDate;
    const chunkSize =
      props.specialprice?.chunkSize || props.discountedprice?.chunkSize; // Example chunk size

    const fetchAndSplitPeriod = async () => {
      const splitPeriods = splitPeriod(startDate, endDate, chunkSize);
      const periodWithCurrentDate = splitPeriods.find((period) => {
        const from = new Date(period.from);
        const to = new Date(period.to);
        return currentDate >= from && currentDate <= to;
      });
      setCurrentPeriod(periodWithCurrentDate);
    };

    if (chunkSize) {
      fetchAndSplitPeriod();
    } else {
      setCurrentPeriod({ from: startDate, to: endDate });
    }
  }, []);

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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)} // for touch devices
            onTouchEnd={() => setIsHovered(false)} // for touch devices
            className={`flex justify-between text-black ${
              isHovered ? "flex" : "hidden"
            }    checkbox-div absolute top-0 right-0 z-50 ${
              props.selectedpdt.includes(props.text) ? "visible" : "visible"
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

          <div className="absolute top-2 left-2 z-10 flex gap-2">
            {props.demandtype && (
              <p className="text-[12px] text-black font-normal bg-white py-[.1rem] px-[.5rem]">
                {props.demandtype}
              </p>
            )}
            {props.offer && (
              <p className="text-[12px] text-[#C31952] font-normal bg-white py-[.1rem] px-[.5rem]">
                {props.offer}
              </p>
            )}
          </div>
          <div
            className="relative flex h-full w-full items-center justify-center  aspect-square bg-[#f5f5f5]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)} // for touch devices
            onTouchEnd={() => setIsHovered(false)} // for touch devices
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
                className="arrow arrow-left hover:opacity-100"
              />
            )}
            {selectedColor !== ""
              ? productImages
                  .find((item) => item.color === selectedColor)
                  ?.images?.map((src, idx) => {
                    return (
                      <Link
                        href={`/${props.productTitle.replace(/ /g, "-")}`}
                        onClick={() => handleclick(props.productTitle)}
                      >
                        <Image
                          loading="lazy"
                          src={
                            isHovered && !isNavigationHovered
                              ? productImages.find(
                                  (item) =>
                                    item.color ===
                                    colors.find(
                                      (item) => item === selectedColor
                                    )
                                )?.images[1]
                              : src
                          }
                          alt={props.productTitle}
                          key={idx}
                          height={300}
                          width={300}
                          className={
                            slide === idx ? "aspect-square w-[400px]" : "hidden"
                          }
                        />
                      </Link>
                    );
                  })
              : props.images?.map((item, idx) => {
                  return (
                    <Link
                      href={`/${props.productTitle.replace(/ /g, "-")}`}
                      onClick={() => handleclick(props.productTitle)}
                    >
                      <Image
                        loading="lazy"
                        src={
                          isHovered && !isNavigationHovered
                            ? props.images[1]
                            : item
                        }
                        alt={props.productTitle}
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
                  onMouseEnter={() => setIsNavigationHovered(true)}
                  onMouseLeave={() => setIsNavigationHovered(false)}
                  loading="lazy"
                  src="/icons/rightarrow-w.svg"
                  height={20}
                  width={20}
                  alt="arrow icon"
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
        // onMouseEnter={() => SetShowCart(true)}
        // onMouseLeave={() => SetShowCart(false)}
        >
          <div className="flex items-center justify-between pt-2 ">
            <div className=" flex flex-col">
              {props.urgency && (
                <p className="font-medium text-[#0152be]  mb-[3px] text-[12px]">
                  {props.urgency}
                </p>
              )}
              <h3 className={` text-[14px] font-semibold `}>
                {props.productTitle}
              </h3>
            </div>
          </div>
          {/* <p className="text-sm">{props.productDescription}</p> */}
          <p className="font-normal mb-1 text-[14px] py-[2px]">
            {props?.shortDescription}
          </p>

          {props.productType === "normal" || props.productType === "special" ? (
            <>
              <div className=" flex h-[40px] items-center justify-between mt-2">
                <div className="flex gap-1 items-end">
                  <h2
                    className={`text-3xl flex font-semibold leading-[0.5]  tracking-wide ${
                      props?.specialprice?.price
                        ? "bg-[#FFD209] px-2 pt-3 pb-1 w-fit shadow-lg"
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
                      <p className="pt-3 ">
                        {props?.discountedprice?.price
                          ? props?.discountedprice?.price
                          : props.perUnitPrice}
                      </p>
                    )}
                  </h2>
                  {props.unitType ? (
                    <span className="tracking-wide text-sm">{`/ ${props.unitType}`}</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {(props?.specialprice?.price ||
                props?.discountedprice?.price) && (
                <div className="flex flex-col mb-3">
                  <p className="text-[#757575] text-[12px] pt-[3px]">
                    Regular price:{" "}
                    <span className="font-bold text-black">
                      Rs.
                      <span className="line-through  text-base">
                        {props?.perUnitPrice}
                      </span>
                    </span>{" "}
                    (incl. of all taxes)
                  </p>
                  {currentPeriod && (
                    <p className="text-[#757575] text-[12px] ">
                      Price valid {formatDate(currentPeriod?.from)} -{" "}
                      {formatDate(currentPeriod?.to)}
                    </p>
                  )}
                  {/* {props?.specialprice?.startDate &&
                  props?.specialprice?.endDate ? (
                    <p className="text-[#757575] text-[12px] ">
                      <span>Price valid </span>{" "}
                      {formatDate(props?.specialprice?.startDate)} -{" "}
                      {formatDate(props?.specialprice?.endDate)}
                    </p>
                  ) : props?.discountedprice?.startDate &&
                    props?.discountedprice?.endDate ? (
                    <p className="text-[#757575] text-[12px] ">
                      <span>Price valid </span>
                      {formatDate(props?.discountedprice?.startDate)} -{" "}
                      {formatDate(props?.discountedprice?.endDate)}
                    </p>
                  ) : null} */}
                </div>
              )}
            </>
          ) : (
            <div className=" flex h-[40px] pb-[6px] items-center justify-between mt-2">
              <div className="flex gap-1 items-end">
                <h2
                  className={`text-xl flex font-semibold leading-[0.5]  tracking-wide bg-[#FFD209] px-2 pt-3 pb-1 w-fit shadow-lg $ `}
                  style={{ boxShadow: "3px 3px #C31952" }}
                >
                  Request now
                </h2>
              </div>
            </div>
          )}

          <div className="card-rating">{props.rating}</div>
          {Starts && (
            <div className="flex items-center mt-1">
              {Starts}
              <p className="text-[14px] mt-1 ml-2">({Reviews?.length})</p>
            </div>
          )}

          <div className="flex my-2 items-center gap-4">
            <div
              className="bg-[#0152be] p-1.5 mr-2 rounded-full"
              onClick={addProductToCart}
            >
              <Image
                loading="lazy"
                src={"/icons/ad-to-cart.svg"}
                height={25}
                width={25}
                className="cursor-pointer rounded-full"
              />
            </div>

            {loggedInUser ? (
              <div className="flex items-center">
                {isLiked ? (
                  <button disabled={loading} onClick={handleUnlike}>
                    <Image
                      loading="lazy"
                      src={"/icons/like-fill.svg"}
                      height={25}
                      width={25}
                      className={`cursor-pointer  hover:scale-105 transition-transform`}
                      alt="like icon"
                    />
                  </button>
                ) : (
                  <button disabled={loading} onClick={handleLike}>
                    <Image
                      loading="lazy"
                      src={"/icons/like.svg"}
                      height={25}
                      width={25}
                      className={`cursor-pointer hover:scale-105 transition-transform`}
                      alt="like icon"
                    />
                  </button>
                )}
              </div>
            ) : (
              <Link href={"/login"}>
                <Image
                  loading="lazy"
                  src={"/icons/like.svg"}
                  height={25}
                  width={25}
                  className="cursor-pointer  hover:scale-105 transition-transform"
                  alt="like icon"
                />
              </Link>
            )}
          </div>

          {/* {props?.rating > 0 && (
            <> */}

          {/* </>
          )} */}

          {props.expectedDelivery && (
            <div className="flex flex-col items-start mt-2">
              <div className="flex items-center">
                {props.expectedDelivery <= 5 && (
                  <img
                    alt="speedDelivery"
                    loading="lazy"
                    src={"/icons/speeddelivery.svg"}
                    height={50}
                    width={50}
                  />
                )}
              </div>
              <p className="text-[#757575] text-[12px] mt-1">
                Expected delivery on &nbsp;
                <span className="text-[#0152be] font-md font-semibold">
                  {getExpectedDeliveryDate(props.expectedDelivery)}
                </span>
              </p>
            </div>
          )}

          {imageData?.length > 1 && (
            <div className="colorContainer flex flex-col sm:w-auto w-[80vw] mt-1 ">
              <div className="w-full flex justify-between mb-1">
                <p className="text-[12px] font-medium text-[#757575]">
                  More options
                </p>
              </div>
              {
                <>
                  <div className="colors flex gap-1.5">
                    {imageData?.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedColor(item.color);
                          handleColor(item.image);
                        }}
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
                          loading="lazy"
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
              Regular price: Rs.{props.perUnitPrice}
            </p>
          </div>
        ) : props.specialprice ? (
          <div>
            <p className=" text-sm font-semibold bg-yellow-400 price-box w-fit px-2 py-1">
              Rs.<span className="text-3xl">{props.specialprice?.price}</span>
            </p>
            <p className="text-sm mt-2 text-gray-500">
              Regular price: Rs.{props.perUnitPrice}
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
            Rs.<span className="text-3xl">{props.perUnitPrice}</span>
          </p>
        )} */}
        {/* {props.ratings?.length > 0 && (
          <p className="flex flex-row items-center gap-1 text-sm text-black">
            {props.stars.map((star, index) => (
              <Image loading="lazy" key={index} src={star} alt="star" width={15} height={15} />
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
