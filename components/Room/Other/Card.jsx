"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import IncDecCounter from "@/components/Count/Count";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useState, useEffect } from "react";
import Calculation from "./Calculation";
import { useDispatch, useSelector } from "react-redux";
import { selectQuantity } from "@/components/Features/Slices/calculationSlice";
import {
  selectRoomData,
  selectRoomStatus,
} from "@/components/Features/Slices/roomSlice";
import "../styles.css";
import axios from "axios";
import Image from "next/image";
import { selectProductImages } from "@/components/Features/Slices/imageDataSlice";
import { colorsData } from "../../../Model/ColorsData/Colors.js";
import ResponseCache from "next/dist/server/response-cache";
import { updateQuantity } from "../../Features/Slices/calculationSlice.js";
import { setDbItems } from "@/components/Features/Slices/cartSlice";

const Card = ({ data, productId }) => {
  const quantity = useSelector(selectQuantity);
  const [Stars, setStars] = useState()
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [widthstate, setwidthstate] = useState(0);
  const [heightstate, setheightstate] = useState(0);
  const [pricestate, setpricestate] = useState(0);
  const [coststate, setcoststate] = useState(7000);
  const [rollstate, setrollstate] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [paletteType, setPaletteType] = useState("color");
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState("EMI Plans")
  const [openOfferDetails, setOpenOfferDetails] = useState(false)
  const [EmiOption, setEmiOption] = useState("Credit Card EMI")
  const [openEmiDetails, setOpenEMIDetails] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const specifications = ['1.5mm', '3mm', '5mm'];

  // State to hold the selected specification
  const [selectedSpec, setSelectedSpec] = useState(null);

  // Handler for clicking a specification
  const handleSpecClick = (spec) => {
    setSelectedSpec(spec);
  };


  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getReview?productId=${productId}`
      );
      console.log("reviews", response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
        setReviews(response.data);
      } else {
        console.error("Empty or invalid response data:", response.data);
      }
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
          src={"/icons/full-white.svg"}
          height={20}
          width={20}
          alt="empty-star"
          className="h-[0.85em] w-[0.85em] hover:text-gray-600"
        />
      );
    }

    return starsArray;
  }


  // useEffect(() => {
  //   fetchReviews();

  //   const stars = renderStars(0);
  //   setStars(stars)

  // }, [productId]);

  // console.log("Reviews Data", reviews)

  useEffect(() => {
    fetchReviews();

    // const stars = renderStars(3.6);
    // setStars(stars)

  }, [productId]);

  // console.log(Reviews)

  function calculateAverageRating(reviews) {
    if (reviews.length > 0) {
      const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalRatings / reviews.length;
      return averageRating;
    }

    return 0
  }

  useEffect(() => {

    const averageRating = calculateAverageRating(reviews);
    // console.log(averageRating);
    const stars = renderStars(averageRating); // Assuming renderStars is defined somewhere
    setStars(stars);

  }, [reviews]);


  const [sidebarContect, setsidebarContent] = useState(null)


  const handlePaletteType = (value) => {
    setPaletteType(value === "color" ? "image" : "color");
  };
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };
  const [hidden, setHidden] = useState(false);
  const handlefunc = () => {
    setHidden(!hidden);
  };

  const priceCal = () => {
    const area = (widthstate * heightstate) / 50;
    const calculatedPrice = area * coststate;
    setpricestate(calculatedPrice.toFixed(2));
    setrollstate(area.toFixed(2));
  };
  useEffect(() => {
    priceCal();
  }, [widthstate, heightstate, coststate]);

  const imageData = data.productImages?.map((item) => {
    return {
      color: item.color,
      image: item.images[0],
    };
  });

  console.log(imageData);

  const colorSep = data.productImages?.map((item) => {
    let hexCode = "";
    for (const category of colorsData) {
      for (const key in category) {
        if (category[key][item.color]) {
          hexCode = category[key][item.color];
          break;
        }
      }
      if (hexCode) break;
    }

    return {
      ...item,
      hexCode: hexCode,
    };
  });
  console.log(colorSep);
  const roomData = useSelector(selectRoomData);
  console.log(roomData);
  const roomStatus = useSelector(selectRoomStatus);
  //posting data to database
  if (typeof window !== "undefined") {
    var id = localStorage.getItem("deviceId");
    console.log("deviceId : ", id);
  }




  const handleColor = (color) => {
    setSelectedColor(color);
    dispatch({
      type: "FETCH_IMAGE_DATA",
      payload: color,
    });
    console.log(color)
  };

  const postUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`;
  const postRoomData = async () => {
    try {
      console.log("Posting room data:", {
        deviceId: id,
        productId: roomData._id,
        quantity: quantity,
      });

      const postData = {
        deviceId: id,
        productId: roomData._id,
        quantity: quantity,
      };

      const response = await axios.post(postUrl, postData);
      if (response.status === 200) console.log(response);
    } catch (error) {
      console.error("Error posting room data:", error);
    }
  };
  // const dispatch = useDispatch()

  const [inCart, setInCart] = useState(false)
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
          {
            params: {
              deviceId: localStorage.getItem("deviceId"),
            },
          }
        );
        if (response.status !== 200) {
          throw new Error("HTTP status " + response.status);
        }
        const data = response.data;
        console.log("Fetched cart data:", data);

        // Ensure cartData is an array
        if (data && Array.isArray(data.items)) {
          setCartData(data.items);
        } else {
          console.error("Cart data items are not an array:", data);
          setCartData([]);
        }
      } catch (error) {
        console.log("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, []);

  const isProductInCart = (productId) => {
    console.log("Checking product ID:", productId);
    return cartData.some((cartItem) => {
      console.log("Comparing with cart item product ID:", cartItem?.productId?._id);
      return cartItem?.productId?._id === productId;
    });
  };

  useEffect(() => {
    if (cartData) {
      if (isProductInCart(roomData._id) === true) {
        setInCart(true)
      }
    }
  }, [roomData._id, cartData])


  const handleBuyNow = async () => {
    if (inCart) {
      router.push("/checkout")
    }
    try {
      // Validate quantity, productId, and deviceId
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`, {
        deviceId: localStorage.getItem("deviceId"),
        productId: roomData._id,
        quantity: 1
      })

      console.log(response.data)
      if (response.status === 200) {
        setInCart(true)
        dispatch(setDbItems(response.data))

      }

      // Redirect to the checkout page
      router.push("/checkout")
    } catch (error) {
      console.error("Error handling click:", error);
      setInCart(true)
    }
  }

  const handleClickDB = async () => {
    setsidebarContent("addToBag")
    if (inCart) {
      return
    }
    try {
      // Validate quantity, productId, and deviceId
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`, {
        deviceId: localStorage.getItem("deviceId"),
        productId: roomData._id,
        quantity: 1
      })

      console.log(response.data)
      if (response.status === 200) {
        setInCart(true)
        dispatch(setDbItems(response.data))

      }

      // Redirect to the checkout page
    } catch (error) {
      console.error("Error handling click:", error);
      setInCart(true)
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      // Validate quantity, productId, and deviceId
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`, {
        deviceId: localStorage.getItem("deviceId"),
        productId: productId,
        quantity: 1
      })
      if (response.status === 200) {
        // setInCart(true)
        dispatch(setDbItems(response.data))

      }

      // Redirect to the checkout page
    } catch (error) {
      console.error("Error handling click:", error);
      // setInCart(true)
    }
  }
  //posting data to database

  const handleClicks = () => {
    router.push("/checkout");
  };

  console.log(data);

  const [Modal, setModal] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [store, setStore] = useState(false);
  // const handleModal = () => {
  //   setModal(!Modal);
  // };
  const [modalContent, setModalContent] = useState(null);

  const handleOptionClick = (content) => {
    setsidebarContent(content);
  };




  const startDate = new Date(data?.specialprice?.startDate);
  const endDate = new Date(data?.specialprice?.endDate);

  const formattedStartDate = startDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const [formattedDate, setFormattedDate] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const startDate = new Date(data.specialprice?.startDate);
    const endDate = new Date(data.specialprice?.endDate);

    const startMonth = startDate.toLocaleString("default", { month: "long" });
    const startDay = startDate.getDate();

    const endMonth = endDate.toLocaleString("default", { month: "long" });
    const endDay = endDate.getDate();
    setFormattedDate({
      startDate: `${startMonth} ${startDay}`,
      endDate: `${endMonth} ${endDay}`,
    });
  }, []);

  console.log("ProductData", data)

  // const fetchCategoryDetails = async () => {
  //   const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCategoryByName/${data?.category}`)
  //   console.log(response.data)
  // }

  const [categoryProducts, setCategoryProducts] = useState([])

  const fetchCategoryProducts = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchProductsByCategory/${data?.category}`)
    console.log(response.data)
    const filteredProducts = response.data.filter(product => product._id !== productId);
    setCategoryProducts(filteredProducts)
  }

  useEffect(() => {
    if (data?.category) {
      fetchCategoryProducts()
    }
  }, [data?.category])


  return (
    <>
      <div className="flex justify-start md:min-w-[25vw] gap-1 mt-2.5 w-[100%] ml-0">
        <div className=" w-[100%] prefence-text">
          <div className="textHolders flex flex-col">
            {
              data.demandtype && (
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#C31952] text-[15px]">{data.demandtype}</p>

                  {reviews.length > 0 && (
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        {Stars}
                      </div>
                      <p className="text-gray-800 underline h-[20px] cursor-pointer">{reviews.length}</p>
                    </div>
                  )}

                </div>
              )
            }
            {
              !data.demandtype ? (
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl  font-bold mb-1">
                    {data?.productTitle}
                  </h1>

                  {reviews.length > 0 && (
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        {Stars}
                      </div>
                      <p className="text-gray-800 underline h-[20px] cursor-pointer">{reviews.length}</p>
                    </div>
                  )}

                </div>
              ) :
                <h1 className="text-2xl  font-bold mb-1">
                  {data?.productTitle}
                </h1>

            }
            <div className="flex text-[14px] font-medium tracking-wider text-[#757575] ">
              <h3>{data?.shortDescription}</h3>
            </div>
            {/* <div className="font-medium tracking-wider text-[#757575] flex mb-1">
              Pattern Number:&nbsp;
              <h3>{data?.patternNumber}</h3>
            </div> */}
            <div className="price">
              <div className="font-bold items-end flex mb-1 mt-[10px]">

                <h2 className={`text-3xl leading-[0.5] tracking-wide ${data?.specialprice?.price ? "bg-[#FFC21F] px-2 pt-3 w-fit shadow-lg" : ""} `} style={data?.specialprice?.price ? { boxShadow: '3px 3px #ad3535' } : {}}>
                  <span className="text-sm">Rs. &nbsp;</span>{" "}
                  {data?.specialprice?.price ? data?.specialprice.price : data.perUnitPrice}
                </h2>{" "}
                <span> &nbsp;/roll</span>
              </div>

              {
                data?.specialprice?.price && (
                  <div className="flex flex-col">
                    <p className="text-[#757575] text-[12px] pt-[3px]">Regular price: Rs.{data?.totalPrice} (incl. of all taxes)</p>
                    {
                      data?.specialprice?.startDate && data?.specialprice?.endDate && (
                        <p className="text-[#757575] text-[12px] pb-[10px]">Price valid {formattedStartDate} - {formattedEndDate} or while supply lasts</p>
                      )
                    }
                    {/* <p className="text-[#757575] text-[12px] pb-[10px]">Price valid May 02 - May 29 or while supply lasts</p> */}
                  </div>
                )
              }


            </div>
            <IncDecCounter />
          </div>

          <div>
            <div className="py-4">
              <h2 className="text-lg font-semibold mb-4">Specification</h2>
              <div className="flex space-x-4">
                {specifications.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => handleSpecClick(spec)}
                    className={`px-2 py-1 ${selectedSpec === spec ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'
                      }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* color-container */}
          <div className="colorContainer flex flex-col mt-[30px] sm:w-auto w-[80vw]">
            <div className="w-full flex justify-between">
              {
                imageData && imageData?.length > 1 && (
                  <h1 className="mb-2 font-bold">Colours</h1>
                )
              }
            </div>
            {
              imageData?.length > 1 &&
              <>
                <div className="colors flex gap-3">
                  {imageData?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleColor(item.color)}
                      className={`parent relative w-[60px] h-[60px] text-gray-900 text-center text-xs flex justify-center items-center cursor-pointer
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
                        selectedColor === item.color ||
                          (index === 0 && selectedColor === "") ? (
                          <div className="w-[100%] h-[4px] bg-black mt-[70px]" />
                        ) : ""
                      }

                    </div>
                  ))}
                </div>
              </>
            }
          </div>

          {/* calculations */}
          <div className="border-black w-[100%] sm:w-full mt-[30px] bg-zinc-100 relative">
            <div className="flex flex-row">
              <div
                className="w-[1px] h-full bg-[#e5e7eb] absolute"
                style={{ left: "calc(50%)", top: "0" }}
              ></div>
              <div
                className="flex flex-col col-span-1 w-1/2 p-[14px]  hover:bg-zinc-200 cursor-pointer"
                onClick={() => handleOptionClick("zeroCostEMI")}
              >
                <div className="flex flex-row gap-1">
                  <Image
                    src="/icons/payment.svg"
                    height={25}
                    width={25}
                    alt="icon"
                    className=" w-[23px] h-[23px]"
                  />
                  <h1 className="font-medium text-sm">ZERO Cost EMI</h1>
                </div>
                <p className="text-[11px] pt-[5px]">Ayatrio payment option</p>
              </div>

              <div
                className="flex flex-col col-span-2 w-1/2 p-[14px] hover:bg-zinc-200  cursor-pointer"
                onClick={() => handleOptionClick("inStoreRequest")}
              >
                <div className="flex flex-row gap-1">
                  <Image
                    src="/icons/ayatrio_store_black.svg"
                    height={25}
                    width={25}
                    alt="icon"
                    className=" w-[23px] h-[23px]"
                  />
                  <h1 className="font-medium text-sm">In-Store Request</h1>
                </div>
                <p className="text-[11px] pt-[5px]">Check in-store stock</p>
              </div>
            </div>
            <hr />
            <div className="flex flex-row ">
              <div
                className="flex flex-col col-span-2 w-1/2 p-[14px] hover:bg-zinc-200 cursor-pointer"
                onClick={() => handleOptionClick("deliveryOption")}
              >
                <div className="flex flex-row gap-2">
                  <Image
                    src="/icons/delivary.svg"
                    height={25}
                    width={25}
                    alt="icon"
                    className=" w-[25px] h-[25px]"
                  />
                  <h1 className="font-medium text-sm">Delivery Option</h1>
                </div>
                <p className="text-[11px] pt-[5px]">Check availability</p>
              </div>
              <div
                className="flex flex-col col-span-2 w-1/2 p-[14px] hover:bg-zinc-200 cursor-pointer"
                onClick={() => handleOptionClick("calculator")}
              >
                <div className="flex flex-row gap-2">
                  <Image
                    src="/icons/calculator.svg"
                    height={25}
                    width={25}
                    alt="icon"
                    className=" w-[25px] h-[25px]"
                  />
                  <h1 className="font-medium text-sm">Calculator</h1>
                </div>
                <p className="text-[11px] pt-[5px]">As per your requirement</p>
              </div>
            </div>

            {/* Modal */}
            {sidebarContect && (
              <div className="">
                <div className="w-1/2 flex flex-col justify-between gap-4 h-full bg-white rounded-3xl p-7">
                  {sidebarContect === "zeroCostEMI" && (
                    <div className="fixed z-[9999] h-full w-screen bg-black/50 backdrop:blur-sm top-0 left-0">
                      <section className="text-black bg-white flex-col absolute right-0 top-0 h-full  z-[99999] w-full  lg:w-[35%] flex overflow-y-auto">
                        <div className="flex flex-col w-full">
                          <div className="px-[40px] pb-[32px]">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 flex">
                                <div
                                  onClick={() => setIsActive("Offers for you")}
                                  className={`flex-1 cursor-pointer flex items-center justify-center h-[50px] ${isActive === "Offers for you"
                                    ? "border-b-4 border-[#2e2e2e] text-black"
                                    : "border-[#8E8E8E] text-[#8E8E8E]"
                                    }`}
                                >
                                  <p className="text-[16px]">Offers for you</p>
                                </div>
                                <div
                                  onClick={() => setIsActive("EMI Plans")}
                                  className={`flex-1 cursor-pointer flex items-center justify-center h-[50px] ${isActive === "EMI Plans"
                                    ? "border-b-4 border-[#2e2e2e] text-black"
                                    : "border-[#8E8E8E] text-[#8E8E8E]"
                                    }`}
                                >
                                  <p className="text-[16px]">EMI Plans</p>
                                </div>
                              </div>
                              <div className="flex h-[72px] items-center justify-end">
                                <button
                                  className="text-xl px-3 py-1 hover:bg-[#e5e5e5] rounded-full cursor-pointer"
                                  onClick={() => setsidebarContent(null)}
                                >
                                  <Image
                                    src="/icons/closeicon.svg"
                                    alt="close"
                                    width={20}
                                    height={30}
                                    className="py-2"
                                  />

                                </button>
                              </div>
                            </div>
                            {
                              isActive === "Offers for you" && (
                                <div className="">
                                  <div className="pt-[32px] flex items-center justify-between">
                                    <p className="text-[#2E2E2E] text-[16px] font-[470px]">All Offers</p>
                                    <p className="text-[#8E8E8E] text-[16px] font-normal">How to avail?</p>
                                  </div>
                                  <div onClick={() => setOpenOfferDetails((prev) => !prev)} className="py-[20px]  border-b border-[#D1D1D1] cursor-pointer ">
                                    <div className="flex items-center">
                                      <div className="mr-[15px] p-1  ">
                                        <Image src="/icons/adtocart.svg" height={25} width={25} alt="arrow-right" />
                                      </div>
                                      <p className="text-[#2E2E2E] text-[14px] flex-1">Get cashback up to Rs 200, Pay using CRED UPI</p>
                                      {
                                        openOfferDetails ? <Image src="/icons/arrow_right.svg" className="-rotate-90" height={20} width={20} alt="arrow-right" /> : <Image src="/icons/arrow_right.svg" className="rotate-90" height={20} width={20} alt="arrow-right" />
                                      }
                                    </div>

                                    {
                                      openOfferDetails && (
                                        <div className="pt-[10px] ml-[55px]">
                                          <div className="flex flex-col pb-[12px]">
                                            <p className="text-[#8E8E8E] text-[14px]">Get cashback up to Rs 200, Pay using CRED UPI, Applicable once per user per month</p>
                                            <p className="text-blue-500 underline text-xs">Terms and Conditions</p>
                                          </div>
                                          <p className="text-xs text-[#2E2E2E] pb-[12px]">Offer applicable on:</p>
                                          <p className="px-[8px] py-[5px] text-[12px] text-center text-[#8E8E8E] w-[85px] border bg-[#f3f5f5]">UPI</p>
                                        </div>

                                      )
                                    }
                                  </div>
                                </div>
                              )
                            }

                            {
                              isActive === "EMI Plans" && (
                                <div className="">
                                  <div className="flex items-center gap-[10px] pb-[20px] pt-[32px] ">
                                    <button onClick={(e) => setEmiOption("Credit Card EMI")} className={`${EmiOption === "Credit Card EMI" ? "bg-black text-white py-[16px] hover:bg-gray-900 px-[30px] text-center text-[14px] rounded-full" : "py-[16px] border-2  px-[30px] rounded-full  text-[14px] text-center"}`}>Credit Card EMI</button>
                                    <button onClick={(e) => setEmiOption("Debit Card")} className={`${EmiOption === "Debit Card" ? "bg-black hover:bg-gray-900 flex-1 text-white py-[16px] px-[30px] text-center text-[14px]  rounded-full" : "py-[16px] flex-1 border-2 px-[30px]  rounded-full  text-[14px] text-center"}`}>Debit Card & EMI</button>
                                  </div>
                                  {
                                    EmiOption === "Credit Card EMI" && (
                                      <div>

                                        <div className="flex items-center justify-between">
                                          <p className="text-[#2E2E2E] text-[16px] font-[470px]">All Offers</p>
                                          <p className="text-[#8E8E8E] text-[16px] font-normal">How to avail?</p>
                                        </div>
                                        <div onClick={(e) => setOpenEMIDetails(prev => !prev)} className="flex flex-col items-center py-[20px] border-b cursor-pointer">
                                          <div className="flex items-center w-full ">
                                            <div className="mr-[15px] p-1 ">
                                              <Image src="/icons/icic.svg" height={24} width={24} alt="arrow-right" />
                                            </div>
                                            <div className="flex flex-col flex-1 ">
                                              <p className="text-[#2E2E2E] text-[14px]">ICIC Bank</p>
                                              <p className="text-[#8E8E8E] text-xs">from ₹294/month</p>
                                            </div>
                                            {
                                              openEmiDetails ? <Image src="/icons/arrow_right.svg" className="-rotate-90" height={20} width={20} alt="arrow-right" /> : <Image src="/icons/arrow_right.svg" className="rotate-90" height={20} width={20} alt="arrow-right" />
                                            }
                                          </div>
                                          {
                                            openEmiDetails && (
                                              <div className="w-[90%] mt-5 ml-12 flex flex-col gap-1">
                                                <table className=" bg-white border border-gray-200 rounded-lg text-xs">
                                                  <tbody>
                                                    <tr className="hover:bg-gray-50 border-b border-gray-200">
                                                      <td className="py-2 px-4">₹294 X 24 months</td>
                                                      <td className="py-2 px-4">₹7049</td>
                                                      <td className="py-2 px-4">15.99%</td>
                                                    </tr>
                                                    <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                                                      <td className="py-2 px-4">₹377 X 18 months</td>
                                                      <td className="py-2 px-4">₹6787</td>
                                                      <td className="py-2 px-4">15.99%</td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-50 border-b border-gray-200">
                                                      <td className="py-2 px-4">₹544 X 12 months</td>
                                                      <td className="py-2 px-4">₹6531</td>
                                                      <td className="py-2 px-4">15.99%</td>
                                                    </tr>
                                                    <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                                                      <td className="py-2 px-4">₹712 X 9 months</td>
                                                      <td className="py-2 px-4">₹6406</td>
                                                      <td className="py-2 px-4">15.99%</td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-50 border-b border-gray-200">
                                                      <td className="py-2 px-4">₹1047 X 6 months</td>
                                                      <td className="py-2 px-4">₹6282</td>
                                                      <td className="py-2 px-4">15.99%</td>
                                                    </tr>
                                                    <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                                                      <td className="py-2 px-4">₹2053 X 3 months</td>
                                                      <td className="py-2 px-4">₹6160</td>
                                                      <td className="py-2 px-4">15.99%</td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                                <div className="p-[12px] text-[#10846d] text-[12px] bg-[#f8f9f3] border border-[#10846d] mt-2 max-w-fit">
                                                  Save for payment
                                                </div>
                                              </div>
                                            )
                                          }
                                        </div>
                                      </div>
                                    )
                                  }
                                  {
                                    EmiOption === "Debit Card" && (
                                      <div>
                                        <div className="flex items-center justify-between">
                                          <p className="text-[#2E2E2E] text-[16px] font-[470px]">Debit Card EMIs</p>
                                          <p className="text-[#8E8E8E] text-[16px] font-normal">How to avail?</p>
                                        </div>
                                        {/* <div className="flex items-center py-[20px] border-b cursor-pointer">
                                          <div className="mr-[15px] p-1 shadow-lg ">
                                            <Image src="/icons/utib.svg" height={24} width={24} alt="arrow-right" />
                                          </div>
                                          <div className="flex flex-col flex-1 ">
                                            <p className="text-[#2E2E2E] text-[14px]">ICIC Bank</p>
                                            <p className="text-[#8E8E8E] text-xs">from ₹294/month</p>
                                          </div>
                                          <Image src="/icons/arrow_right.svg" className="rotate-90" height={20} width={20} alt="arrow-right" />
                                        </div> */}
                                        <div onClick={(e) => setOpenEMIDetails(prev => !prev)} className="flex flex-col items-center py-[20px] border-b cursor-pointer">
                                          <div className="flex items-center w-full ">
                                            <div className="mr-[15px] p-1 ">
                                              <Image src="/icons/icic.svg" height={24} width={24} alt="arrow-right" />
                                            </div>
                                            <div className="flex flex-col flex-1 ">
                                              <p className="text-[#2E2E2E] text-[14px]">ICIC Bank</p>
                                              <p className="text-[#8E8E8E] text-xs">from ₹294/month</p>
                                            </div>
                                            {
                                              openEmiDetails ? <Image src="/icons/arrow_right.svg" className="-rotate-90" height={20} width={20} alt="arrow-right" /> : <Image src="/icons/arrow_right.svg" className="rotate-90" height={20} width={20} alt="arrow-right" />
                                            }
                                          </div>
                                          {
                                            openEmiDetails && (
                                              <div className="w-[90%] mt-5 ml-12 flex flex-col gap-1">
                                                <table className=" bg-white border border-gray-200 rounded-lg text-xs">
                                                  <tbody>
                                                    <tr className="hover:bg-gray-50 border-b border-gray-200">
                                                      <td className="py-2 px-4">₹294 X 24 months</td>
                                                      <td className="py-2 px-4">₹7049</td>
                                                      <td className="py-2 px-4">15.99%</td>
                                                    </tr>
                                                    <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                                                      <td className="py-2 px-4">₹377 X 18 months</td>
                                                      <td className="py-2 px-4">₹6787</td>
                                                      <td className="py-2 px-4">15.99%</td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-50 border-b border-gray-200">
                                                      <td className="py-2 px-4">₹544 X 12 months</td>
                                                      <td className="py-2 px-4">₹6531</td>
                                                      <td className="py-2 px-4">15.99%</td>
                                                    </tr>
                                                    <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                                                      <td className="py-2 px-4">₹712 X 9 months</td>
                                                      <td className="py-2 px-4">₹6406</td>
                                                      <td className="py-2 px-4">15.99%</td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-50 border-b border-gray-200">
                                                      <td className="py-2 px-4">₹1047 X 6 months</td>
                                                      <td className="py-2 px-4">₹6282</td>
                                                      <td className="py-2 px-4">15.99%</td>
                                                    </tr>
                                                    <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                                                      <td className="py-2 px-4">₹2053 X 3 months</td>
                                                      <td className="py-2 px-4">₹6160</td>
                                                      <td className="py-2 px-4">15.99%</td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                                <div className="p-[12px] text-[#10846d] text-[12px] bg-[#f8f9f3] border border-[#10846d] mt-2 max-w-fit">
                                                  Save for payment
                                                </div>
                                              </div>
                                            )
                                          }
                                        </div>
                                        <div className="mt-[32px]">
                                          <p className="text-[#2E2E2E] text-[16px] font-[470px]">Cardless and Other EMIs</p>
                                          <p className=" text-center w-full mt-[40px] text-[14px]">No Cardless EMI plans avaliable</p>
                                        </div>
                                      </div>
                                    )
                                  }
                                </div>
                              )
                            }
                          </div>
                        </div>
                      </section>
                    </div>
                  )}
                  {sidebarContect === "inStoreRequest" && (
                    <div className="fixed z-[99999] h-full w-screen bg-black/50 backdrop:blur-sm top-0 left-0">
                      <section className="text-black bg-white flex-col absolute right-0 top-0 h-full z-[99999] w-full  lg:w-[35%] flex overflow-y-auto">

                        <div className="flex flex-col">
                          <div className="px-[40px] pb-[32px]">
                            <div>
                              <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between pt-2 mt-[10px] mb-[10px] h-[72px]">
                                  <h1 className="text-[24px] font-semibold text-[#111111]">
                                    Visit us at your preferred Ayatrio store
                                  </h1>
                                  <button
                                    className="text-xl px-3 py-1 hover:bg-[#e5e5e5] rounded-full cursor-pointer"
                                    onClick={() => setsidebarContent(null)}
                                  >
                                    <Image
                                      src="/icons/closeicon.svg"
                                      alt="close"
                                      width={30}
                                      height={30}
                                      className="py-2"
                                    />


                                  </button>
                                </div>
                              </div>

                              <div className="my-[16px] flex flex-col">
                                <label className="text-[14px] font-normal text-[#484848]">Search by city</label>
                                <div className="w-full px-[6px] border-2 border-[#484848] rounded-md h-[48px]">
                                  <input className="w-full h-full focus-within:outline-none" />
                                </div>
                                <div className="flex items-start justify-between mt-[32px]">
                                  <p>Stores with available stock</p>
                                  <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                  </label>
                                </div>
                              </div>
                              {/* 1 location */}
                              <div className="py-[32px] border-t flex items-center">
                                <div>
                                  <h3 className="text-[14px] font-bold">Hyderabad</h3>
                                  <p className="text-[14px] text-[#484848] font-normal mb-[8px]">Raidurg, Serilingampally, Mandal, Survey no. 83/1, plot No.25, 26, Part 29 Panmaqath, Rangareddy, Hyderabad, Hyderabad</p>
                                  <div className="flex gap-2 items-center">
                                    <div className="h-3 w-3 border-red-700 border-2 rounded-full" />
                                    <p className="text-[14px] font-normal text-[#484848]">Click & Collect - Currently unavailable</p>
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <div className="h-3 w-3 bg-green-600 rounded-full" />
                                    <p className="text-[14px] font-normal text-[#484848]">Store - In stock</p>
                                  </div>
                                </div>
                                <div>
                                  <Image src="/icons/arrow_right.svg" height={50} width={50} alt="arrow-right" />
                                </div>
                              </div>
                              {/* 2 Location */}
                              <div className="py-[32px] border-t flex items-center">
                                <div>
                                  <h3 className="text-[14px] font-bold">Hyderabad</h3>
                                  <p className="text-[14px] text-[#484848] font-normal mb-[8px]">Raidurg, Serilingampally, Mandal, Survey no. 83/1, plot No.25, 26, Part 29 Panmaqath, Rangareddy, Hyderabad, Hyderabad</p>
                                  <div className="flex gap-2 items-center">
                                    <div className="h-3 w-3 border-red-700 border-2 rounded-full" />
                                    <p className="text-[14px] font-normal text-[#484848]">Click & Collect - Currently unavailable</p>
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <div className="h-3 w-3 bg-green-600 rounded-full" />
                                    <p className="text-[14px] font-normal text-[#484848]">Store - In stock</p>
                                  </div>
                                </div>
                                <div>
                                  <Image src="/icons/arrow_right.svg" height={50} width={50} alt="arrow-right" />
                                </div>
                              </div>
                              {/* 3 Location */}
                              <div className="py-[32px] border-t flex items-center">
                                <div>
                                  <h3 className="text-[14px] font-bold">Hyderabad</h3>
                                  <p className="text-[14px] text-[#484848] font-normal mb-[8px]">Raidurg, Serilingampally, Mandal, Survey no. 83/1, plot No.25, 26, Part 29 Panmaqath, Rangareddy, Hyderabad, Hyderabad</p>
                                  <div className="flex gap-2 items-center">
                                    <div className="h-3 w-3 border-red-700 border-2 rounded-full" />
                                    <p className="text-[14px] font-normal text-[#484848]">Click & Collect - Currently unavailable</p>
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <div className="h-3 w-3 bg-green-600 rounded-full" />
                                    <p className="text-[14px] font-normal text-[#484848]">Store - In stock</p>
                                  </div>
                                </div>
                                <div>
                                  <Image src="/icons/arrow_right.svg" height={50} width={50} alt="arrow-right" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}
                </div>



                {sidebarContect === "deliveryOption" && (
                  <div className=" fixed z-[99999] h-full w-screen  bg-black/50  backdrop:blur-sm top-0 left-0">
                    <section className="text-black z-[99999] bg-white flex-col absolute right-0 top-0 h-screen w-full  lg:w-[35%] flex ">

                      <div className="flex flex-col">
                        <div className="px-[40px] pb-[32px]">
                          <div>
                            <div className="flex items-center justify-between  h-[72px]">
                              <h1 className="text-[24px] font-semibold text-[#111111]">
                                Use your location
                              </h1>
                              <button
                                className="text-xl px-3 py-1 hover:bg-[#e5e5e5] rounded-full cursor-pointer"
                                onClick={() => setsidebarContent(null)}
                              >
                                <Image
                                  src="/icons/closeicon.svg"
                                  alt="close"
                                  width={20}
                                  height={30}
                                  className="py-2"
                                />

                              </button>
                            </div>
                            <div className="mt-[16px]">
                              <p className="text-[14px] text-[#484848]">Get updated information about product delivery and stock availability for your area.</p>
                            </div>
                            <div className="my-[16px] flex flex-col">
                              <lable className="text-[14px] font-normal text-[#484848]">Enter a PIN code</lable>
                              <div className="w-full px-[6px] border-2 border-[#484848]  rounded-md h-[48px]">
                                <input className="w-full h-full focus-within:outline-none" />
                              </div>
                              <p className="text-xs text-[#767676]">e.g. 560075</p>
                            </div>
                            <div className="mb-[32px]">
                              <p className="text-[14px] text-[#767676]">We use cookies to provide this service. Read more about how we use cookies in our policy . Please note that your location won’t be shared.</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 border-t lg:mt-32">
                          <button
                            className="bg-black text-white w-[100%] sm:h-14 h-10 rounded-full hover:bg-gray-900 transition duration-300 px-4"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
                {sidebarContect === "calculator" && (
                  <div className=" fixed h-full w-screen  bg-black/50  backdrop:blur-sm top-0 left-0 z-[99999]">
                    <section className="text-black bg-white flex-col absolute right-0 top-0 h-screen z-[99999] w-full  lg:w-[35%] flex ">


                      <div className="flex flex-col">
                        <div className="px-[40px] pb-[32px]">
                          <div className="flex items-center justify-between h-[72px] mb-10">
                            <h1 className="text-[24px] font-semibold text-[#111111]">
                              Calculator
                            </h1>
                            <button
                              className="text-xl px-3 py-1 hover:bg-[#e5e5e5] rounded-full cursor-pointer"
                              onClick={() => setsidebarContent(null)}
                            >
                              <Image
                                src="/icons/closeicon.svg"
                                alt="close"
                                width={20}
                                height={30}
                                className="py-2"
                              />

                            </button>
                          </div>
                          <Calculation priceData={data} />
                        </div>
                      </div>



                    </section>
                  </div>
                )}
                {sidebarContect === "addToBag" && (
                  <div className=" fixed h-full w-screen  bg-black/50  backdrop:blur-sm top-0 left-0 z-[99999]">
                    <section className="text-black bg-white flex-col absolute right-0 top-0 h-screen z-[99999] w-full  lg:w-[35%] flex ">


                      <div className="flex flex-col ">
                        <div className="md:px-[40px] pb-[32px] px-[20px]">
                          <div className="flex items-center justify-between h-[72px] mb-2">
                            <h1 className="text-[14px] font-medium text-[#484848]">
                              Added to cart
                            </h1>
                            <button
                              className="text-xl px-3 py-1 hover:bg-[#e5e5e5] rounded-full cursor-pointer"
                              onClick={() => setsidebarContent(null)}
                            >
                              <Image
                                src="/icons/closeicon.svg"
                                alt="close"
                                width={20}
                                height={30}
                                className="py-2"
                              />

                            </button>
                          </div>
                          <div className="flex items-start w-[100%]  pb-10 absolute ">

                            <Image src={data?.images[0]} height={100} width={100} className=" mr-[16px] mt-[6px] h-[100px] min-w-[100px]" />

                            <div className="flex flex-col mx-[12px] md:w-[100%] w-[50%]">
                              <p className="text-[14px] font-bold text-[#484848]">{data?.productTitle}</p>
                              <p className="text-[#484848] text-[12px] mb-[5px] line-clamp-1">{data?.shortDescription}</p>
                              <div className="font-bold items-end flex mb-1 my-[5px]">
                                <h2 className={`text-3xl leading-[0.5] tracking-wide ${data?.specialprice?.price ? "bg-[#FFC21F] px-2 pt-3 w-fit shadow-lg" : ""} `} style={data?.specialprice?.price ? { boxShadow: '3px 3px #ad3535' } : {}}>
                                  <span className="text-sm">Rs. &nbsp;</span>{" "}
                                  {data?.specialprice?.price ? data?.specialprice?.price : data.perUnitPrice}
                                </h2>{" "}
                                <span> &nbsp;/roll</span>
                              </div>
                              {
                                data?.specialprice?.price && (
                                  <div className="flex flex-col">
                                    <p className="text-[#757575] text-[12px] pt-[3px]">Regular price: Rs.{data?.totalPrice} </p>
                                    {
                                      data?.specialprice?.startDate && data?.specialprice?.endDate && (
                                        <p className="text-[#757575] text-[12px] pb-[10px]">Price valid {formattedStartDate} - {formattedEndDate} </p>
                                      )
                                    }
                                    {/* <p className="text-[#757575] text-[12px] pb-[10px]">Price valid May 02 - May 29 or while supply lasts</p> */}
                                  </div>
                                )
                              }


                            </div>
                          </div>
                          <div className="w-full border-t mt-[155px] pb-28 h-[500px] overflow-y-auto">
                            <h2 className="md:text-[24px] text-[18px] font-bold mt-2">Complement your order</h2>
                            <div className="">
                              {
                                categoryProducts && categoryProducts.length > 0 ? (
                                  categoryProducts.map((product) => (
                                    <div key={product._id} className="flex items-start  justify-between cursor-pointer  mt-[30px]  pb-10" onMouseEnter={() => setShowCart(true)} onMouseLeave={() => setShowCart(false)}>
                                      <div className="flex">
                                        <Image src={product?.images[0]} height={100} width={100} className="mr-[16px] h-[100px] w-[100px]" />
                                        <div className="flex flex-col mx-[12px] max-w-[220px]">
                                          <p className="text-[14px] font-bold text-[#484848]">{product.productTitle}</p>
                                          <p className="text-[#484848] text-[12px] mb-[5px] line-clamp-1">{product?.shortDescription}</p>
                                          <div className="font-bold items-end flex mb-1 my-[5px]">
                                            <h2 className={`text-3xl leading-[0.5] tracking-wide ${product?.specialprice?.price ? "bg-[#FFC21F] px-2 pt-3 w-fit shadow-lg" : ""} `} style={product?.specialprice?.price ? { boxShadow: '3px 3px #ad3535' } : {}}>
                                              <span className="text-sm">Rs. &nbsp;</span>{" "}
                                              {product?.specialprice?.price ? product?.specialprice?.price : product.perUnitPrice}
                                            </h2>{" "}
                                            <span> &nbsp;/roll</span>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="bg-[#0152be] p-1.5 rounded-full max-w-fit self-center md:mr-10 " onClick={() => handleAddToCart(product._id)}>
                                        <Image src={"/icons/ad-to-cart.svg"} height={20} width={20} className="cursor-pointer rounded-full min-w-[20px] min-h-[20px]" />
                                      </div>
                                    </div>
                                  ))
                                )
                                  :
                                  (
                                    <div className="mt-5">
                                      <p>No related products found !</p>
                                    </div>
                                  )
                              }
                              {/* <div className="flex items-start  justify-between cursor-pointer  mt-[30px]  pb-10" onMouseEnter={() => setShowCart(true)} onMouseLeave={() => setShowCart(false)}>
                                <div className="flex">
                                  <Image src={"/images/room/bathroom.jpg"} height={100} width={100} className="mr-[16px] h-[100px] w-[100px]" />
                                  <div className="flex flex-col mx-[12px] max-w-[220px]">
                                    <p className="text-[14px] font-bold text-[#484848]">Baggego</p>
                                    <p className="text-[#484848] text-[12px] mb-[5px] line-clamp-1">Cabinate with door</p>
                                    <div className="flex items-end">
                                      <p className="text-[12px] font-bold pb-[5px]">Rs.</p>
                                      <p className="text-[24px] font-bold ">3,000</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-[#0152be] p-1.5 rounded-full max-w-fit self-center md:mr-10 ">
                                  <Image src={"/icons/ad-to-cart.svg"} height={20} width={20} className="cursor-pointer rounded-full min-w-[20px] min-h-[20px]" />
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full px-[16px] py-[24px] gap-4  md:py-0 md:px-0  md:flex-row flex-col items-center justify-around absolute bottom-0 left-0 border-t bg-white z-10 ">
                          <button className="md:px-[42px] w-full px-[24px] md:h-[56px] h-[40px] border   rounded-full md:my-[24px] text-[12px] md:text-[14px] font-semibold md:ml-[24px] hover:border-black" onClick={() => setsidebarContent(null)}>Continue shopping</button>
                          <button className="md:px-[42px] w-full px-[24px] md:h-[56px] h-[40px] border rounded-full md:my-[24px] bg-black text-white text-[12px] md:text-[14px] font-semibold md:mr-[24px] hover:bg-gray-900">
                            <Link
                              href={{
                                pathname: "/checkout",
                                query: {
                                  search: "rooms",
                                },
                              }}
                            >
                              Go to shopping bag
                            </Link>
                          </button>
                        </div>
                      </div>



                    </section>
                  </div>
                )}
              </div>

            )}
          </div>

          {/* //buttons */}
          < div className="buttons mt-4 sm:w-auto w-[100%] sm:block flex flex-col items-center justify-center" >
            <div className="guestCheckout w-[100%] flex justify-center items-center mb-[10px] " >
              <button
                onClick={() => {
                  handleBuyNow();
                }}
                className={` bg-black hover:bg-gray-900 text-white px-4   w-[100%] sm:h-14 h-10 rounded-full  transition duration-300`}
              >
                Buy Now
              </button>
            </div>
            <div className="guestCheckout w-[100%] flex justify-center items-center mb-[16px] " >
              <button
                onClick={() => {
                  handleClickDB();
                  // {
                  //   roomStatus === "succeeded" &&
                  //     toast.success("Succesfully added", {
                  //       toastId: "success1",
                  //     });
                  // }
                }}
                className={` bg-black hover:bg-gray-900 text-white px-4   w-[100%] sm:h-14 h-10 rounded-full  transition duration-300`}
              >
                Add to bag
              </button>
            </div>

            {/* <Link
              href={{
                pathname: "/checkout",
                query: {
                  search: "sample",
                },
              }}
              className="memberCheckout w-[100%] my-2 flex items-center justify-center"
            >
              <button className="border-2 px-4 text-black border-solid   w-[100%] sm:h-14 h-10 rounded-full  transition duration-300">
                Buy Now with in-store request
              </button>
            </Link> */}
          </div>
          <div className="flex gap-3 mt-8 items-center justify-center">
            <Image
              src={"/icons/ayatrio_comment_button.svg"}
              height={35}
              width={35}
              alt="downarrow"
              className="hover:text-gray-600"
            />

            <div className="flex flex-col items-center">
              <p className="font-semibold text-[#1D1D1F] text-xs">
                Have questions about Ayatrio?
              </p>
              <p className="text-[#0066CC] text-xs cursor-pointer font-normal hover:underline">
                Chat with a Specialist
              </p>
            </div>
          </div>
        </div >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop={true}
          theme="light"
          style={{ zIndex: "9999999999999" }}
        />
      </div >
    </>
  );
};

export default Card;
