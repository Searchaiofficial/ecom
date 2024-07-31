"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
import IncDecCounter from "@/components/Count/Count";
// import "react-toastify/dist/ReactToastify.css";
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
import {
  selectProductImages,
  setProductImages,
} from "@/components/Features/Slices/imageDataSlice";
import { colorsData } from "../../../Model/ColorsData/Colors.js";
import ResponseCache from "next/dist/server/response-cache";
import { updateQuantity } from "../../Features/Slices/calculationSlice.js";
import { setDbItems } from "@/components/Features/Slices/cartSlice";
import { addToCart } from "@/tag-manager/events/add_to_cart";
import {
  selectColor,
  setColor,
} from "@/components/Features/Slices/productColorSlice";

const Card = ({ data, productId, isModalOpen, setIsModalOpen }) => {
  const quantity = useSelector(selectQuantity);
  const [Stars, setStars] = useState();
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [widthstate, setwidthstate] = useState(0);
  const [heightstate, setheightstate] = useState(0);
  const [pricestate, setpricestate] = useState(0);
  const [coststate, setcoststate] = useState(7000);
  const [rollstate, setrollstate] = useState(0);
  // const [selectedColor, setSelectedColor] = useState("");
  const [paletteType, setPaletteType] = useState("color");
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState("EMI Plans");
  const [openOfferDetails, setOpenOfferDetails] = useState(false);
  const [EmiOption, setEmiOption] = useState("Credit Card EMI");
  const [openEmiDetails, setOpenEMIDetails] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const selectedColor = useSelector(selectColor);

  const [STORE_MAP_DATA, SET_STORE_MAP_DATA] = useState([]);
  const [userPincode, setUserPincode] = useState("");
  const [nearestShop, setNearestShop] = useState([]);

  const fetchMapData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mapPlaces`
      );
      SET_STORE_MAP_DATA(response.data);
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  const fetchDistances = async () => {
    try {
      const distances = await Promise.all(
        STORE_MAP_DATA.map(async (store) => {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/distance`,
            {
              params: {
                origins: userPincode,
                destinations: store.pincode,
              },
            }
          );

          const distanceText = response.data.rows[0].elements[0].distance.text;
          const distanceValue =
            response.data.rows[0].elements[0].distance.value;
          return {
            id: store.id,
            name: store.name,
            address: store.address,
            pincode: store.pincode,
            distanceText: distanceText,
            distanceValue: distanceValue,
          };
        })
      );

      distances.sort((a, b) => a.distanceValue - b.distanceValue);
      setNearestShop(distances);
    } catch (error) {
      console.error("Error fetching distances:", error);
    }
  };

  useEffect(() => {
    fetchMapData();
    if (typeof window !== "undefined") {
      const userPincode = localStorage.getItem("userPincode");
      setUserPincode(userPincode);
    }
  }, []);

  useEffect(() => {
    if (STORE_MAP_DATA.length > 0 && userPincode) {
      fetchDistances();
    } else {
      console.log("No data in STORE_MAP_DATA");
    }
  }, [STORE_MAP_DATA, userPincode]);

  const setSelectedColor = (color) => {
    dispatch(setColor(color));
  };

  const colors = data.productImages?.map((item) => item.color);

  useEffect(() => {
    setSelectedColor(colors[0]);
  }, []);

  // State to hold the selected specification
  const [selectedSpec, setSelectedSpec] = useState(null);
  // const [accessoriesData, setAccessoriesData] = useState([])
  const [accessories, setAccessories] = useState([]);
  const fetchAccessories = async () => {
    try {
      const responce = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/productByCategoryAndSubCategory?category=${data?.category}&subcategory=Accessories `
      );
      setAccessories(responce.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.category) {
      fetchAccessories();
    }
  }, [data]);

  // Handler for clicking a specification
  const handleSpecClick = (spec) => {
    setSelectedSpec(spec);
  };

  const selectedSpecData = data?.dimensions?.find(
    (dim) => dim._id === selectedSpec
  );

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getReview?productId=${productId}`
      );

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
          src={"/icons/star-full-black.svg"}
          height={15}
          width={15}
          alt="star"
          className="h-[1em] w-[0.8em] hover:text-gray-600 ml-[2px]"
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
          className="h-[1em] w-[0.8em] hover:text-gray-600 ml-[2px]"
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
          className="h-[1em] w-[0.8em] hover:text-gray-600 ml-[2px]"
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
      const totalRatings = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRatings / reviews.length;
      return averageRating;
    }

    return 0;
  }

  useEffect(() => {
    const averageRating = calculateAverageRating(reviews);
    // console.log(averageRating);
    const stars = renderStars(averageRating); // Assuming renderStars is defined somewhere
    setStars(stars);
  }, [reviews]);

  const [sidebarContect, setsidebarContent] = useState(null);

  useEffect(() => {
    if (!!sidebarContect) {
      setIsModalOpen?.(true);
    } else {
      setIsModalOpen?.(false);
    }
  }, [sidebarContect, setIsModalOpen]);

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
  // console.log(colorSep);
  const roomData = useSelector(selectRoomData);
  // console.log(roomData);
  const roomStatus = useSelector(selectRoomStatus);
  //posting data to database
  if (typeof window !== "undefined") {
    var id = localStorage.getItem("deviceId");
  }

  const handleColor = (color) => {
    setSelectedColor(color);
    dispatch({
      type: "FETCH_IMAGE_DATA",
      payload: color,
    });
  };

  const postUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`;

  // const dispatch = useDispatch()

  const [inCart, setInCart] = useState(false);
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
    return cartData.some((cartItem) => {
      console.log(
        "Comparing with cart item product ID:",
        cartItem?.productId?._id
      );
      return cartItem?.productId?._id === productId;
    });
  };

  useEffect(() => {
    if (cartData) {
      if (isProductInCart(roomData._id) === true) {
        setInCart(true);
      }
    }
  }, [roomData._id, cartData]);

  // const handleBuyNow = async () => {
  //   setsidebarContent("buyNow");
  //   document.body.style.overflow = "hidden";
  // };

  const handleClickDB = async () => {
    addToCart({
      item: data,
    });
    setsidebarContent("addToBag");
    document.body.style.overflow = "hidden";
    if (inCart) {
      return;
    }
    try {
      // Validate quantity, productId, and deviceId
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
        {
          deviceId: localStorage.getItem("deviceId"),
          productId: productId,
          quantity: 1,
        }
      );

      if (response.status === 200) {
        setInCart(true);
        dispatch(setDbItems(response.data));
      }

      // Redirect to the checkout page
    } catch (error) {
      console.error("Error handling click:", error);
      setInCart(true);
    }
  };

  // console.log(localStorage.getItem("deviceId"))

  const handleAddToCart = async (productId) => {
    try {
      addToCart({
        item: data,
      });

      // Validate quantity, productId, and deviceId
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
        {
          deviceId: localStorage.getItem("deviceId"),
          productId: productId,
          quantity: 1,
        }
      );
      if (response.status === 200) {
        // setInCart(true)
        dispatch(setDbItems(response.data));
      }

      // Redirect to the checkout page
    } catch (error) {
      console.error("Error handling click:", error);
      // setInCart(true)
    }
  };

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  const handleServiceChange = (service) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.some((s) => s.name === service.name)) {
        return prevSelectedServices.filter((s) => s.name !== service.name);
      } else {
        return [...prevSelectedServices, service];
      }
    });
  };

  const handleAccessoriesChange = (product) => {
    setSelectedAccessories((prevSelectedAccessories) => {
      if (prevSelectedAccessories.some((s) => s._id === product._id)) {
        return prevSelectedAccessories.filter((s) => s._id !== product._id);
      } else {
        return [...prevSelectedAccessories, product];
      }
    });
  };
  // console.log(cartData)

  // const cartItem = cartData.filter((item) => item.productId._id === productId)

  // console.log(cartItem)
  // console.log(cartItem[0]?.selectedServices)

  // useEffect(() => {
  //   // Initialize selected services from cart item
  //   if (cartItem && cartItem.selectedServices) {
  //     setSelectedServices(cartItem[0]?.selectedServices);
  //     console.log(selectedServices)
  //   }
  // }, [cartItem]);

  // console.log(selectedServices)

  const handleBuy = async () => {
    document.body.style.overflow = "auto";
    try {
      // Validate quantity, productId, and deviceId
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
        {
          deviceId: localStorage.getItem("deviceId"),
          productId: productId,
          quantity: 1,
          selectedServices,
          selectedAccessories,
        }
      );
      if (response.status === 200) {
        // setInCart(true)
        dispatch(setDbItems(response.data));
        router.push("/checkout");
      }
      // Redirect to the checkout page
    } catch (error) {
      console.error("Error handling click:", error);
      // setInCart(true)
    }
  };
  //posting data to database

  // const handleClicks = () => {
  //   router.push("/checkout");
  // };

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

  // const startDate = new Date(data?.specialprice?.startDate);
  // const endDate = new Date(data?.specialprice?.endDate);

  // const formattedStartDate = startDate.toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  // });
  // const formattedEndDate = endDate.toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  // });

  // const [formattedDate, setFormattedDate] = useState({
  //   startDate: "",
  //   endDate: "",
  // });

  // useEffect(() => {
  //   const startDate = new Date(data.specialprice?.startDate);
  //   const endDate = new Date(data.specialprice?.endDate);

  //   const startMonth = startDate.toLocaleString("default", { month: "long" });
  //   const startDay = startDate.getDate();

  //   const endMonth = endDate.toLocaleString("default", { month: "long" });
  //   const endDay = endDate.getDate();
  //   setFormattedDate({
  //     startDate: `${startMonth} ${startDay}`,
  //     endDate: `${endMonth} ${endDay}`,
  //   });
  // }, []);

  // const fetchCategoryDetails = async () => {
  //   const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCategoryByName/${data?.category}`)
  //   console.log(response.data)
  // }

  const [categoryProducts, setCategoryProducts] = useState([]);

  const fetchCategoryProducts = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchProductsByCategory/${data?.category}`
    );
    // console.log(response.data)
    const filteredProducts = response.data.filter(
      (product) => product._id !== productId
    );
    setCategoryProducts(filteredProducts);
  };

  const [avaliableServices, setavaliableServices] = useState([]);
  const fetchCategoryData = async () => {
    const responce = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCategoryByName/${data?.category}`
    );
    // console.log(responce.data)
    setavaliableServices(responce.data?.availableServices);
  };

  // console.log(avaliableServices)
  useEffect(() => {
    if (data?.category) {
      fetchCategoryProducts();
      fetchCategoryData();
    }
  }, [data?.category]);

  const handleGoToShoppingBag = () => {
    router.push("/checkout");
    document.body.style.overflow = "auto";
  };
  // console.log(avaliableServices);

  const [initialServiceQuantity, setinitialServiceQuantity] = useState(1);
  // console.log(selectedServices);

  const handleServiceIncrease = (serviceId) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.map((service) =>
        service._id === serviceId
          ? { ...service, quantity: service.quantity + 1 }
          : service
      )
    );
  };

  const handleServiceDecrease = (serviceId) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.map((service) =>
        service._id === serviceId
          ? { ...service, quantity: service.quantity - 1 }
          : service
      )
    );
  };

  const [accessoryQuantities, setAccessoryQuantities] = useState(
    selectedAccessories.reduce((acc, accessory) => {
      acc[accessory._id] = 1;
      return acc;
    }, {})
  );

  const handleIncreaseAccessory = (productId) => {
    setSelectedAccessories((prevSelected) =>
      prevSelected.map((item) =>
        item._id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  // console.log(selectedAccessories);

  const handleDecreaseAccessory = (productId) => {
    setSelectedAccessories((prevSelected) =>
      prevSelected
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const checkUser = async () => {
    try {
      const token = localStorage?.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = response.data;
      if (userData.isAuthenticated) {
        // console.log("user data", userData);
        setUser(userData.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleRequest = async () => {
    if (isAuthenticated) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/requestForProduct`,
          {
            id: productId,
            email: user.email,
            name: user.displayName,
          }
        );
        if (response.status === 200) {
          // toast.success("Request sent successfully");
          console.log("success");
        }

        alert("Successfully requested!");

        // Redirect to the checkout page
      } catch (error) {
        console.error("Error handling click:", error);
      }
    } else {
      alert("Login first");
    }
  };

  const contentData = [
    {
      title: "Free Delivery, Free Returns",
      icon: "delivary",
      content: (
        <>
          For all orders, delivery and Returns are free. If you are not entirely
          satisfied with your order, you may be entitled to a refund. Read our{" "}
          <Link
            href="/customerservice/returnpolicy"
            className="underline cursor-pointer"
          >
            Returns Terms & Conditions
          </Link>{" "}
          for more details.
        </>
      ),
    },
    {
      title: "Delivery: Metro cities: 2-5 days, Others: 5-15 days",
      icon: "free-shipping",
      content: (
        <>
          Get free delivery on all orders above ₹3000. A shipping charge of ₹100
          is applicable on orders below ₹3000. Check out our{" "}
          <Link
            href="/customerservice/returnpolicy"
            className="underline cursor-pointer"
          >
            delivery Terms & Conditions
          </Link>{" "}
          for more details.
        </>
      ),
    },
    {
      title: "COD available for orders below ₹3000",
      icon: "tick",
      content: "Cash on Delivery is available for all orders below ₹3000.",
    },
    {
      title:
        "Secure transactions with hassle free 14 days Exchange and Returns",
      icon: "payment",
      content: (
        <>
          Tried on your item(s) and need a different size? Exchange your item(s)
          within 14 days and have your perfect fit shipped for free. Or did you
          change your mind? You can also return your item(s) for free within 14
          days for a full refund. Read more on{" "}
          <Link
            href="/customerservice/returnpolicy"
            className="underline cursor-pointer"
          >
            Exchange
          </Link>{" "}
          and{" "}
          <Link
            href="/customerservice/returnpolicy"
            className="underline cursor-pointer"
          >
            Return
          </Link>
          .
        </>
      ),
    },
    {
      title: "Save 5% on all Online Payments under ₹3000",
      icon: "price-tag-icon",
      content:
        "Pay 5% less on all orders under ₹3000 when you choose online payment options. That's right – simply opt for online payment at checkout and enjoy instant savings on your purchase.",
    },
  ];

  const [categoryDetails, setCategoryDetails] = useState(null);
  const fetchCategoryDetails = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCategoryByName/${data?.category}`
    );
    console.log(response.data);
    setCategoryDetails(response.data);
  };

  useEffect(() => {
    if (data?.category) {
      fetchCategoryDetails();
    }
  }, [data?.category]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  const splitPeriod = (startDate, endDate, chunkSize) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const result = [];

    while (start <= end) {
      const chunkEnd = new Date(start);
      chunkEnd.setDate(start.getDate() + chunkSize - 1);
      result.push({
        from: start.toISOString().split("T")[0],
        to:
          chunkEnd <= end
            ? chunkEnd.toISOString().split("T")[0]
            : end.toISOString().split("T")[0],
      });
      start.setDate(start.getDate() + chunkSize);
    }

    return result;
  };

  const [currentPeriod, setCurrentPeriod] = useState(null);

  useEffect(() => {
    const currentDate = new Date(); // Use current date
    const startDate =
      data.specialPrice?.startDate || data.discountedprice?.startDate;
    const endDate = data.specialPrice?.endDate || data.discountedprice?.endDate;
    const chunkSize =
      data.specialPrice?.chunkSize || data.discountedprice?.chunkSize; // Example chunk size

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
      <div className="flex justify-start md:min-w-[25vw] gap-1 mt-2.5 w-[100%] ml-0 z-[9997]">
        <div className=" w-[100%] prefence-text">
          <div className="textHolders flex flex-col">
            {data.demandtype && (
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[#C31952] text-[15px]">
                  {data.demandtype}
                </p>

                {reviews.length > 0 && (
                  <div className="flex gap-2">
                    <div className="flex items-center mt-1">{Stars}</div>
                    <p className="text-gray-800 underline h-[20px] cursor-pointer">
                      {reviews.length}
                    </p>
                  </div>
                )}
              </div>
            )}
            {!data.demandtype ? (
              <div className="flex items-center justify-between">
                <p className="text-2xl  font-bold mb-0.5 mt-3">
                  {data?.productTitle}
                </p>

                {reviews.length > 0 && (
                  <div className="flex gap-2">
                    <div className="flex items-center">{Stars}</div>
                    <p className="text-gray-800 underline h-[20px] cursor-pointer">
                      {reviews.length}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <h1 className="mb-0.5 font-semibold text-2xl">
                {data?.productTitle}
              </h1>
            )}
            <div className="flex text-[14px] font-medium tracking-wider text-[#757575] pb-3">
              <h3>{data?.shortDescription}</h3>
            </div>
            {/* <div className="font-medium tracking-wider text-[#757575] flex mb-1">
              Pattern Number:&nbsp;
              <h3>{data?.patternNumber}</h3>
            </div> */}
            {(data?.productType === "normal" ||
              data?.productType === "special") && (
              <div className="price">
                <div className="font-bold items-end flex mb-1 mt-[10px]">
                  <p
                    className={`text-3xl leading-[0.5] tracking-wide ${
                      data?.specialprice?.price
                        ? "bg-[#FFD209] px-2 pt-3 w-fit shadow-lg"
                        : ""
                    } `}
                    style={
                      data?.specialprice?.price
                        ? { boxShadow: "3px 3px #ad3535" }
                        : {}
                    }
                  >
                    <span className="text-sm">Rs. &nbsp;</span>{" "}
                    {/* {data?.specialprice?.price ? data?.specialprice.price : data.perUnitPrice} */}
                    {/* {data?.specialprice?.price
                      ? data?.specialprice.price
                      : selectedSpecData?.specialprice
                      ? selectedSpecData?.price
                      : data?.discountedprice?.price
                      ? data?.discountedprice?.price
                      : selectedSpecData?.discountedprice
                      ? selectedSpecData.discountedprice
                      : data.perUnitPrice} */}
                    {selectedSpecData
                      ? selectedSpecData?.specialprice?.price ||
                        selectedSpecData?.discountedprice ||
                        selectedSpecData?.price
                      : data?.specialprice?.price ||
                        data?.discountedprice?.price ||
                        data.perUnitPrice}
                  </p>{" "}
                  <span> &nbsp;/{data.unitType}</span>
                </div>

                {(data?.specialprice?.price ||
                  data?.discountedprice?.price) && (
                  <div className="flex flex-col my-3">
                    <p className="text-[#757575] text-[12px] pt-[3px]">
                      Regular price:{" "}
                      <span className="font-bold text-black">
                        Rs.{" "}
                        <span className="line-through  text-base">
                          {data?.perUnitPrice}
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

                    {/* {data?.specialprice?.startDate &&
                    data?.specialprice?.endDate ? (
                      <p className="text-[#757575] text-[12px] ">
                        <span>Price valid </span>{" "}
                        {formatDate(data?.specialprice?.startDate)} -{" "}
                        {formatDate(data?.specialprice?.endDate)}
                      </p>
                    ) : data?.discountedprice?.startDate &&
                      data?.discountedprice?.endDate ? (
                      <p className="text-[#757575] text-[12px] ">
                        <span>Price valid </span>{" "}
                        {formatDate(data?.discountedprice?.startDate)} -{" "}
                        {formatDate(data?.discountedprice?.endDate)}
                      </p>
                    ) : null} */}
                  </div>
                )}
              </div>
            )}
            {/* <div className="py-2 mt-[10px]">
              <IncDecCounter />
            </div> */}
          </div>

          {data?.dimensions?.length > 0 && (
            <div>
              <div className="py-2 mt-[10px]">
                <h2 className="font-bold mb-2">Specification</h2>
                <div className="flex space-x-4">
                  {data?.dimensions?.map((dim) => (
                    <button
                      key={dim._id}
                      onClick={() => handleSpecClick(dim._id)}
                      className={`px-2 py-1  ${
                        selectedSpec === dim._id
                          ? "bg-green-500 text-white"
                          : "bg-zinc-100 text-black hover:bg-zinc-200"
                      }`}
                    >
                      {`${dim.dimension}`}
                      {/* {`${dim.thickness.value} ${dim.length.unit}`} */}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* color-container */}
          <div className="colorContainer flex flex-col mt-[10px] sm:w-auto w-[80vw]">
            <div className="w-full flex justify-between">
              {imageData && imageData?.length > 1 && (
                <p className="mb-2 font-bold">Colours</p>
              )}
            </div>
            {imageData?.length > 1 && (
              <>
                <div className="colors flex gap-3">
                  {imageData?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleColor(item.color)}
                      className={`parent relative w-[55px] h-[55px] text-gray-900 text-center text-xs flex justify-center items-center cursor-pointer
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
                      {selectedColor === item.color ||
                      (index === 0 && selectedColor === "") ? (
                        <div className="w-[100%] h-[2px] bg-black mt-[57px]" />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* calculations */}
          <div className="border-black w-[100%] sm:w-full mt-[30px] relative">
            <div className="flex flex-row ">
              <div
                className="w-[1px] h-full bg-[#e5e7eb] absolute"
                style={{ left: "calc(50%)", top: "0" }}
              ></div>
              <div
                className="flex flex-col col-span-1 w-1/2 p-[14px]  hover:bg-[#f5f5f5] cursor-pointer border-t-[1px] border-l-[1px] border-[#e5e7eb]"
                onClick={() => handleOptionClick("zeroCostEMI")}
              >
                <div className="flex flex-row gap-1">
                  <Image
                    loading="lazy"
                    src="/icons/payment.svg"
                    height={25}
                    width={25}
                    alt="icon"
                    className=" w-[23px] h-[23px]"
                  />
                  <p className="font-medium text-sm">ZERO Cost EMI</p>
                </div>
                <p className="text-[11px] pt-[5px]">Ayatrio payment option</p>
              </div>

              <div
                className="flex flex-col col-span-2 w-1/2 p-[14px] hover:bg-[#f5f5f5]  cursor-pointer border-t-[1px] border-r-[1px] border-[#e5e7eb]"
                onClick={() => handleOptionClick("inStoreRequest")}
              >
                <div className="flex flex-row gap-1">
                  <Image
                    loading="lazy"
                    src="/icons/store-b.svg"
                    height={25}
                    width={25}
                    alt="icon"
                    className=" w-[23px] h-[23px]"
                  />
                  <p className="font-medium text-sm">In-Store Request</p>
                </div>
                <p className="text-[11px] pt-[5px]">Check in-store stock</p>
              </div>
            </div>
            <hr className="border-[#e5e7eb]" />
            {categoryDetails && categoryDetails.showCalculator && (
              <div className="flex flex-row ">
                <div
                  className="flex flex-col col-span-2 w-1/2 p-[14px] hover:bg-[#f5f5f5] cursor-pointer border-b-[1px] border-l-[1px] border-[#e5e7eb]"
                  onClick={() => handleOptionClick("deliveryOption")}
                >
                  <div className="flex flex-row gap-2">
                    <Image
                      loading="lazy"
                      src="/icons/delivary.svg"
                      height={25}
                      width={25}
                      alt="icon"
                      className=" w-[25px] h-[25px]"
                    />
                    <p className="font-medium text-sm">Delivery Option</p>
                  </div>
                  <p className="text-[11px] pt-[5px]">Check availability</p>
                </div>
                <div
                  className="flex flex-col col-span-2 w-1/2 p-[14px] hover:bg-[#f5f5f5] cursor-pointer border-b-[1px] border-r-[1px] border-[#e5e7eb]"
                  onClick={() => handleOptionClick("calculator")}
                >
                  <div className="flex flex-row gap-2">
                    <Image
                      loading="lazy"
                      src="/icons/calculator.svg"
                      height={25}
                      width={25}
                      alt="icon"
                      className=" w-[25px] h-[25px]"
                    />
                    <p className="font-medium text-sm">Calculator</p>
                  </div>
                  <p className="text-[11px] pt-[5px]">
                    As per your requirement
                  </p>
                </div>
              </div>
            )}

            {/* Modal */}
            {sidebarContect && (
              <div>
                <div className="w-1/2 flex flex-col justify-between gap-4 h-full bg-white rounded-3xl p-7">
                  {sidebarContect === "zeroCostEMI" && (
                    <div className="fixed z-[9999] h-full w-screen bg-black/50 top-0 left-0">
                      <section className="text-black bg-white flex-col absolute right-0 top-0 h-full  z-[99999] w-full  lg:w-[35%] flex overflow-y-auto">
                        <div className="flex flex-col w-full">
                          <div className="px-[40px] pb-[32px]">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 flex">
                                <div
                                  onClick={() => setIsActive("Offers for you")}
                                  className={`flex-1 cursor-pointer flex items-center justify-center h-[50px] ${
                                    isActive === "Offers for you"
                                      ? "border-b-4 border-[#2e2e2e] text-black"
                                      : "border-[#8E8E8E] text-[#8E8E8E]"
                                  }`}
                                >
                                  <p className="text-[16px]">Offers for you</p>
                                </div>
                                <div
                                  onClick={() => setIsActive("EMI Plans")}
                                  className={`flex-1 cursor-pointer flex items-center justify-center h-[50px] ${
                                    isActive === "EMI Plans"
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
                                    loading="lazy"
                                    src="icons/cancel.svg"
                                    alt="close"
                                    width={20}
                                    height={30}
                                    className="py-2"
                                  />
                                </button>
                              </div>
                            </div>
                            {isActive === "Offers for you" && (
                              <div className="">
                                <div className="pt-[32px] flex items-center justify-between">
                                  <p className="text-[#2E2E2E] text-[16px] font-[470px]">
                                    All Offers
                                  </p>
                                  <p className="text-[#8E8E8E] text-[16px] font-normal">
                                    How to avail?
                                  </p>
                                </div>
                                <div
                                  onClick={() =>
                                    setOpenOfferDetails((prev) => !prev)
                                  }
                                  className="py-[20px]  border-b border-[#D1D1D1] cursor-pointer "
                                >
                                  <div className="flex items-center">
                                    <div className="mr-[15px] p-1  ">
                                      <Image
                                        loading="lazy"
                                        src="/icons/adtocart.svg"
                                        height={25}
                                        width={25}
                                        alt="arrow-right"
                                      />
                                    </div>
                                    <p className="text-[#2E2E2E] text-[14px] flex-1">
                                      Get cashback up to Rs 200, Pay using CRED
                                      UPI
                                    </p>
                                    {openOfferDetails ? (
                                      <Image
                                        loading="lazy"
                                        src="/icons/arrow_right.svg"
                                        className="-rotate-90"
                                        height={20}
                                        width={20}
                                        alt="arrow-right"
                                      />
                                    ) : (
                                      <Image
                                        loading="lazy"
                                        src="/icons/arrow_right.svg"
                                        className="rotate-90"
                                        height={20}
                                        width={20}
                                        alt="arrow-right"
                                      />
                                    )}
                                  </div>

                                  {openOfferDetails && (
                                    <div className="pt-[10px] ml-[55px]">
                                      <div className="flex flex-col pb-[12px]">
                                        <p className="text-[#8E8E8E] text-[14px]">
                                          Get cashback up to Rs 200, Pay using
                                          CRED UPI, Applicable once per user per
                                          month
                                        </p>
                                        <p className="text-blue-500 underline text-xs">
                                          Terms and Conditions
                                        </p>
                                      </div>
                                      <p className="text-xs text-[#2E2E2E] pb-[12px]">
                                        Offer applicable on:
                                      </p>
                                      <p className="px-[8px] py-[5px] text-[12px] text-center text-[#8E8E8E] w-[85px] border bg-[#f3f5f5]">
                                        UPI
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {isActive === "EMI Plans" && (
                              <div className="">
                                <div className="flex items-center gap-[10px] pb-[20px] pt-[32px] ">
                                  <button
                                    onClick={(e) =>
                                      setEmiOption("Credit Card EMI")
                                    }
                                    className={`${
                                      EmiOption === "Credit Card EMI"
                                        ? "bg-black text-white py-[16px] hover:bg-gray-900 px-[30px] text-center text-[14px] rounded-full"
                                        : "py-[16px] border-2  px-[30px] rounded-full  text-[14px] text-center"
                                    }`}
                                  >
                                    Credit Card EMI
                                  </button>
                                  <button
                                    onClick={(e) => setEmiOption("Debit Card")}
                                    className={`${
                                      EmiOption === "Debit Card"
                                        ? "bg-black hover:bg-gray-900 flex-1 text-white py-[16px] px-[30px] text-center text-[14px]  rounded-full"
                                        : "py-[16px] flex-1 border-2 px-[30px]  rounded-full  text-[14px] text-center"
                                    }`}
                                  >
                                    Debit Card & EMI
                                  </button>
                                </div>
                                {EmiOption === "Credit Card EMI" && (
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <p className="text-[#2E2E2E] text-[16px] font-[470px]">
                                        All Offers
                                      </p>
                                      <p className="text-[#8E8E8E] text-[16px] font-normal">
                                        How to avail?
                                      </p>
                                    </div>
                                    <div
                                      onClick={(e) =>
                                        setOpenEMIDetails((prev) => !prev)
                                      }
                                      className="flex flex-col items-center py-[20px] border-b cursor-pointer"
                                    >
                                      <div className="flex items-center w-full ">
                                        <div className="mr-[15px] p-1 ">
                                          <Image
                                            loading="lazy"
                                            src="/icons/icic.svg"
                                            height={24}
                                            width={24}
                                            alt="arrow-right"
                                          />
                                        </div>
                                        <div className="flex flex-col flex-1 ">
                                          <p className="text-[#2E2E2E] text-[14px]">
                                            ICIC Bank
                                          </p>
                                          <p className="text-[#8E8E8E] text-xs">
                                            from ₹294/month
                                          </p>
                                        </div>
                                        {openEmiDetails ? (
                                          <Image
                                            loading="lazy"
                                            src="/icons/arrow_right.svg"
                                            className="-rotate-90"
                                            height={20}
                                            width={20}
                                            alt="arrow-right"
                                          />
                                        ) : (
                                          <Image
                                            loading="lazy"
                                            src="/icons/arrow_right.svg"
                                            className="rotate-90"
                                            height={20}
                                            width={20}
                                            alt="arrow-right"
                                          />
                                        )}
                                      </div>
                                      {openEmiDetails && (
                                        <div className="w-[90%] mt-5 ml-12 flex flex-col gap-1">
                                          <table className=" bg-white border border-gray-200 rounded-lg text-xs">
                                            <tbody>
                                              <tr className="hover:bg-gray-50 border-b border-gray-200">
                                                <td className="py-2 px-4">
                                                  ₹294 X 24 months
                                                </td>
                                                <td className="py-2 px-4">
                                                  ₹7049
                                                </td>
                                                <td className="py-2 px-4">
                                                  15.99%
                                                </td>
                                              </tr>
                                              <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                                                <td className="py-2 px-4">
                                                  ₹377 X 18 months
                                                </td>
                                                <td className="py-2 px-4">
                                                  ₹6787
                                                </td>
                                                <td className="py-2 px-4">
                                                  15.99%
                                                </td>
                                              </tr>
                                              <tr className="hover:bg-gray-50 border-b border-gray-200">
                                                <td className="py-2 px-4">
                                                  ₹544 X 12 months
                                                </td>
                                                <td className="py-2 px-4">
                                                  ₹6531
                                                </td>
                                                <td className="py-2 px-4">
                                                  15.99%
                                                </td>
                                              </tr>
                                              <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                                                <td className="py-2 px-4">
                                                  ₹712 X 9 months
                                                </td>
                                                <td className="py-2 px-4">
                                                  ₹6406
                                                </td>
                                                <td className="py-2 px-4">
                                                  15.99%
                                                </td>
                                              </tr>
                                              <tr className="hover:bg-gray-50 border-b border-gray-200">
                                                <td className="py-2 px-4">
                                                  ₹1047 X 6 months
                                                </td>
                                                <td className="py-2 px-4">
                                                  ₹6282
                                                </td>
                                                <td className="py-2 px-4">
                                                  15.99%
                                                </td>
                                              </tr>
                                              <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                                                <td className="py-2 px-4">
                                                  ₹2053 X 3 months
                                                </td>
                                                <td className="py-2 px-4">
                                                  ₹6160
                                                </td>
                                                <td className="py-2 px-4">
                                                  15.99%
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>

                                          <div className="p-[12px] text-[#10846d] text-[12px] bg-[#f8f9f3] border border-[#10846d] mt-2 max-w-fit">
                                            Save for payment
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                                {EmiOption === "Debit Card" && (
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <p className="text-[#2E2E2E] text-[16px] font-[470px]">
                                        Debit Card EMIs
                                      </p>
                                      <p className="text-[#8E8E8E] text-[16px] font-normal">
                                        How to avail?
                                      </p>
                                    </div>
                                    {/* <div className="flex items-center py-[20px] border-b cursor-pointer">
                                          <div className="mr-[15px] p-1 shadow-lg ">
                                            <Image loading="lazy" src="/icons/utib.svg" height={24} width={24} alt="arrow-right" />
                                          </div>
                                          <div className="flex flex-col flex-1 ">
                                            <p className="text-[#2E2E2E] text-[14px]">ICIC Bank</p>
                                            <p className="text-[#8E8E8E] text-xs">from ₹294/month</p>
                                          </div>
                                          <Image loading="lazy" src="/icons/arrow_right.svg" className="rotate-90" height={20} width={20} alt="arrow-right" />
                                        </div> */}
                                    <div
                                      onClick={(e) =>
                                        setOpenEMIDetails((prev) => !prev)
                                      }
                                      className="flex flex-col items-center py-[20px] border-b cursor-pointer"
                                    >
                                      <div className="flex items-center w-full ">
                                        <div className="mr-[15px] p-1 ">
                                          <Image
                                            loading="lazy"
                                            src="/icons/icic.svg"
                                            height={24}
                                            width={24}
                                            alt="arrow-right"
                                          />
                                        </div>
                                        <div className="flex flex-col flex-1 ">
                                          <p className="text-[#2E2E2E] text-[14px]">
                                            ICIC Bank
                                          </p>
                                          <p className="text-[#8E8E8E] text-xs">
                                            from ₹294/month
                                          </p>
                                        </div>
                                        {openEmiDetails ? (
                                          <Image
                                            loading="lazy"
                                            src="/icons/arrow_right.svg"
                                            className="-rotate-90"
                                            height={20}
                                            width={20}
                                            alt="arrow-right"
                                          />
                                        ) : (
                                          <Image
                                            loading="lazy"
                                            src="/icons/arrow_right.svg"
                                            className="rotate-90"
                                            height={20}
                                            width={20}
                                            alt="arrow-right"
                                          />
                                        )}
                                      </div>
                                      {openEmiDetails && (
                                        <div className="w-[90%] mt-5 ml-12 flex flex-col gap-1">
                                          <table className=" bg-white border border-gray-200 rounded-lg text-xs">
                                            <tbody>
                                              <tr className="hover:bg-gray-50 border-b border-gray-200">
                                                <td className="py-2 px-4">
                                                  ₹294 X 24 months
                                                </td>
                                                <td className="py-2 px-4">
                                                  ₹7049
                                                </td>
                                                <td className="py-2 px-4">
                                                  15.99%
                                                </td>
                                              </tr>
                                              <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                                                <td className="py-2 px-4">
                                                  ₹377 X 18 months
                                                </td>
                                                <td className="py-2 px-4">
                                                  ₹6787
                                                </td>
                                                <td className="py-2 px-4">
                                                  15.99%
                                                </td>
                                              </tr>
                                              <tr className="hover:bg-gray-50 border-b border-gray-200">
                                                <td className="py-2 px-4">
                                                  ₹544 X 12 months
                                                </td>
                                                <td className="py-2 px-4">
                                                  ₹6531
                                                </td>
                                                <td className="py-2 px-4">
                                                  15.99%
                                                </td>
                                              </tr>
                                              <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                                                <td className="py-2 px-4">
                                                  ₹712 X 9 months
                                                </td>
                                                <td className="py-2 px-4">
                                                  ₹6406
                                                </td>
                                                <td className="py-2 px-4">
                                                  15.99%
                                                </td>
                                              </tr>
                                              <tr className="hover:bg-gray-50 border-b border-gray-200">
                                                <td className="py-2 px-4">
                                                  ₹1047 X 6 months
                                                </td>
                                                <td className="py-2 px-4">
                                                  ₹6282
                                                </td>
                                                <td className="py-2 px-4">
                                                  15.99%
                                                </td>
                                              </tr>
                                              <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                                                <td className="py-2 px-4">
                                                  ₹2053 X 3 months
                                                </td>
                                                <td className="py-2 px-4">
                                                  ₹6160
                                                </td>
                                                <td className="py-2 px-4">
                                                  15.99%
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>

                                          <div className="p-[12px] text-[#10846d] text-[12px] bg-[#f8f9f3] border border-[#10846d] mt-2 max-w-fit">
                                            Save for payment
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <div className="mt-[32px]">
                                      <p className="text-[#2E2E2E] text-[16px] font-[470px]">
                                        Cardless and Other EMIs
                                      </p>
                                      <p className=" text-center w-full mt-[40px] text-[14px]">
                                        No Cardless EMI plans avaliable
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </section>
                    </div>
                  )}
                  {sidebarContect === "inStoreRequest" && (
                    <div className="fixed z-[99999] h-full w-screen bg-black/50 top-0 left-0">
                      <section className="text-black bg-white flex-col absolute right-0 top-0 h-full z-[99999] w-full  lg:w-[35%] flex overflow-y-auto">
                        <div className="flex flex-col">
                          <div className="px-[40px] pb-[32px]">
                            <div>
                              <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between pt-2 mt-[10px] mb-[10px] h-[72px]">
                                  <p className="text-[24px] font-semibold text-[#111111]">
                                    Visit us at your preferred Ayatrio store
                                  </p>
                                  <button
                                    className="text-xl px-3 py-1 hover:bg-[#e5e5e5] rounded-full cursor-pointer"
                                    onClick={() => setsidebarContent(null)}
                                  >
                                    <Image
                                      loading="lazy"
                                      src="icons/cancel.svg"
                                      alt="close"
                                      width={30}
                                      height={30}
                                      className="py-2"
                                    />
                                  </button>
                                </div>
                              </div>

                              <div className="my-[16px] flex flex-col">
                                <label className="text-[14px] font-normal text-[#484848]">
                                  Search by city
                                </label>
                                <div className="w-full px-[6px] border-2 border-[#484848] rounded-md h-[48px]">
                                  <input className="w-full h-full focus-within:outline-none" />
                                </div>
                                <div className="flex items-start justify-between mt-[32px]">
                                  <p>Stores with available stock</p>
                                  <label className="inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      value=""
                                      className="sr-only peer"
                                    />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                  </label>
                                </div>
                              </div>
                              {/* 1 location */}
                              <div className="py-[32px] border-t flex items-center">
                                <div>
                                  <h3 className="text-[14px] font-bold">
                                    Hyderabad
                                  </h3>
                                  <p className="text-[14px] text-[#484848] font-normal mb-[8px]">
                                    Raidurg, Serilingampally, Mandal, Survey no.
                                    83/1, plot No.25, 26, Part 29 Panmaqath,
                                    Rangareddy, Hyderabad, Hyderabad
                                  </p>
                                  <div className="flex gap-2 items-center">
                                    <div className="h-3 w-3 border-red-700 border-2 rounded-full" />
                                    <p className="text-[14px] font-normal text-[#484848]">
                                      Click & Collect - Currently unavailable
                                    </p>
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <div className="h-3 w-3 bg-green-600 rounded-full" />
                                    <p className="text-[14px] font-normal text-[#484848]">
                                      Store - In stock
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <Image
                                    loading="lazy"
                                    src="/icons/arrow_right.svg"
                                    height={50}
                                    width={50}
                                    alt="arrow-right"
                                  />
                                </div>
                              </div>
                              {/* 2 Location */}
                              <div className="py-[32px] border-t flex items-center">
                                <div>
                                  <h3 className="text-[14px] font-bold">
                                    Hyderabad
                                  </h3>
                                  <p className="text-[14px] text-[#484848] font-normal mb-[8px]">
                                    Raidurg, Serilingampally, Mandal, Survey no.
                                    83/1, plot No.25, 26, Part 29 Panmaqath,
                                    Rangareddy, Hyderabad, Hyderabad
                                  </p>
                                  <div className="flex gap-2 items-center">
                                    <div className="h-3 w-3 border-red-700 border-2 rounded-full" />
                                    <p className="text-[14px] font-normal text-[#484848]">
                                      Click & Collect - Currently unavailable
                                    </p>
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <div className="h-3 w-3 bg-green-600 rounded-full" />
                                    <p className="text-[14px] font-normal text-[#484848]">
                                      Store - In stock
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <Image
                                    loading="lazy"
                                    src="/icons/arrow_right.svg"
                                    height={50}
                                    width={50}
                                    alt="arrow-right"
                                  />
                                </div>
                              </div>
                              {/* 3 Location */}
                              <div className="py-[32px] border-t flex items-center">
                                <div>
                                  <h3 className="text-[14px] font-bold">
                                    Hyderabad
                                  </h3>
                                  <p className="text-[14px] text-[#484848] font-normal mb-[8px]">
                                    Raidurg, Serilingampally, Mandal, Survey no.
                                    83/1, plot No.25, 26, Part 29 Panmaqath,
                                    Rangareddy, Hyderabad, Hyderabad
                                  </p>
                                  <div className="flex gap-2 items-center">
                                    <div className="h-3 w-3 border-red-700 border-2 rounded-full" />
                                    <p className="text-[14px] font-normal text-[#484848]">
                                      Click & Collect - Currently unavailable
                                    </p>
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <div className="h-3 w-3 bg-green-600 rounded-full" />
                                    <p className="text-[14px] font-normal text-[#484848]">
                                      Store - In stock
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <Image
                                    loading="lazy"
                                    src="/icons/arrow_right.svg"
                                    height={50}
                                    width={50}
                                    alt="arrow-right"
                                  />
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
                  <div className=" fixed z-[99999] h-full w-screen  bg-black/50  top-0 left-0 ">
                    <section className="text-black z-[99999] bg-white flex-col absolute right-0 top-0 h-screen overflow-y-scroll w-full  lg:w-[35%] flex ">
                      <div className="flex flex-col">
                        <div className="px-[40px] pb-[32px]">
                          <div>
                            <div className="flex items-center justify-between  h-[72px]">
                              <p className="text-[24px] font-semibold text-[#111111]">
                                Use your location
                              </p>
                              <button
                                className="text-xl px-3 py-1 hover:bg-[#e5e5e5] rounded-full cursor-pointer"
                                onClick={() => setsidebarContent(null)}
                              >
                                <Image
                                  loading="lazy"
                                  src="icons/cancel.svg"
                                  alt="close"
                                  width={20}
                                  height={30}
                                  className="py-2"
                                />
                              </button>
                            </div>
                            <div className="mt-[16px]">
                              <p className="text-[14px] text-[#484848]">
                                Get updated information about product delivery
                                and stock availability for your area.
                              </p>
                            </div>
                            <div className="my-[16px] flex flex-col">
                              <label className="text-[14px] font-normal text-[#484848]">
                                Enter a PIN code
                              </label>
                              <div className="w-full px-[6px] border-2 border-[#484848]  rounded-md h-[48px]">
                                <input
                                  onChange={(e) => {
                                    setUserPincode(e.target.value);
                                    // e.target.value.length === 6 &&
                                    //   fetchDistances(userPincode);
                                  }}
                                  value={userPincode}
                                  type="number"
                                  className="w-full h-full focus-within:outline-none"
                                />
                              </div>
                              <p className="text-xs text-[#767676]">
                                e.g. 560075
                              </p>
                            </div>
                            <div className="mb-[32px]">
                              <p className="text-[14px] text-[#767676]">
                                We use cookies to provide this service. Read
                                more about how we use cookies in our policy .
                                Please note that your location won’t be shared.
                              </p>
                            </div>

                            {nearestShop &&
                              nearestShop.length > 0 &&
                              nearestShop.map((shop) => (
                                <div className="py-[32px] border-t flex items-center">
                                  <div>
                                    <h3 className="text-[14px] font-bold">
                                      {shop.name}
                                    </h3>
                                    <p className="text-[14px] text-[#484848] font-normal mb-[8px]">
                                      {shop.address}
                                    </p>
                                    <div className="flex gap-2 items-center">
                                      <div className="h-3 w-3 border-red-700 border-2 rounded-full" />
                                      <p className="text-[14px] font-normal text-[#484848]">
                                        Click & Collect - Currently unavailable
                                      </p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <div className="h-3 w-3 bg-green-600 rounded-full" />
                                      <p className="text-[14px] font-normal text-[#484848]">
                                        Store - In stock
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <Image
                                      loading="lazy"
                                      src="/icons/arrow_right.svg"
                                      height={50}
                                      width={50}
                                      alt="arrow-right"
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="p-6 border-t lg:mt-32">
                          <button className="bg-black text-white w-[100%] sm:h-14 h-10 rounded-full hover:bg-gray-900 transition duration-300 px-4">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
                {sidebarContect === "calculator" && (
                  <div className=" fixed h-full w-screen  bg-black/50  top-0 left-0 z-[99999]">
                    <section className="text-black bg-white flex-col absolute right-0 top-0 h-screen z-[99999] w-full  lg:w-[35%] flex ">
                      <div className="flex flex-col">
                        <div className="px-[40px] pb-[32px]">
                          <div className="flex items-center justify-between h-[72px] mb-10">
                            <p className="text-[24px] font-semibold text-[#111111]">
                              Calculator
                            </p>
                            <button
                              className="text-xl px-3 py-1 hover:bg-[#e5e5e5] rounded-full cursor-pointer"
                              onClick={() => setsidebarContent(null)}
                            >
                              <Image
                                loading="lazy"
                                src="icons/cancel.svg"
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
                  <div className=" fixed h-full w-screen  bg-black/50  top-0 left-0 z-[99999]">
                    <section className="text-black bg-white flex-col absolute right-0 top-0 h-screen z-[99999] w-full  lg:w-[35%] flex ">
                      <div className="flex flex-col ">
                        <div className="md:px-[40px] pb-[32px] px-[20px]">
                          <div className="flex items-center justify-between h-[72px] mb-2">
                            <p className="text-[14px] font-medium text-[#484848]">
                              Added to cart
                            </p>
                            <button
                              className="text-xl px-3 py-1 hover:bg-[#e5e5e5] rounded-full cursor-pointer"
                              onClick={() => {
                                setsidebarContent(null);
                                document.body.style.overflow = "auto";
                              }}
                            >
                              <Image
                                loading="lazy"
                                src="icons/cancel.svg"
                                alt="close"
                                width={20}
                                height={30}
                                className="py-2"
                              />
                            </button>
                          </div>
                          <div className="flex items-start w-[100%]  pb-10 absolute ">
                            <Image
                              loading="lazy"
                              src={data?.images[0]}
                              height={100}
                              width={100}
                              alt={data?.productTitle || "product image"}
                              className=" mr-[16px] mt-[6px] h-[100px] min-w-[100px]"
                            />

                            <div className="flex flex-col mx-[12px] md:w-[100%] w-[50%]">
                              <p className="text-[14px] font-bold text-[#484848]">
                                {data?.productTitle}
                              </p>
                              <p className="text-[#484848] text-[12px] mb-[5px] line-clamp-1">
                                {data?.shortDescription}
                              </p>
                              <div className="font-bold items-end flex mb-1 my-[5px]">
                                <h2
                                  className={`text-3xl leading-[0.5] tracking-wide ${
                                    data?.specialprice?.price
                                      ? "bg-[#FFD209] px-2 pt-3 w-fit shadow-lg"
                                      : ""
                                  } `}
                                  style={
                                    data?.specialprice?.price
                                      ? { boxShadow: "3px 3px #ad3535" }
                                      : {}
                                  }
                                >
                                  <span className="text-sm">Rs. &nbsp;</span>{" "}
                                  {data?.specialprice?.price
                                    ? data?.specialprice?.price
                                    : data?.discountedprice?.price
                                    ? data?.discountedprice?.price
                                    : data.perUnitPrice}
                                </h2>{" "}
                                <span> &nbsp;/{data.unitType}</span>
                              </div>
                              {(data?.specialprice?.price ||
                                data?.discountedprice?.price) && (
                                <div className="flex flex-col my-3">
                                  <p className="text-[#757575] text-[12px] pt-[3px]">
                                    Regular price:{" "}
                                    <span className="font-bold text-black">
                                      Rs.{" "}
                                      <span className="line-through text-base">
                                        {data?.perUnitPrice}
                                      </span>{" "}
                                    </span>
                                    (incl. of all taxes)
                                  </p>

                                  {data?.specialprice?.startDate &&
                                  data?.specialprice?.endDate ? (
                                    <p className="text-[#757575] text-[12px] ">
                                      <span className="font-bold text-black">
                                        Price valid{" "}
                                      </span>
                                      {formatDate(
                                        data?.specialprice?.startDate
                                      )}{" "}
                                      -{" "}
                                      {formatDate(data?.specialprice?.endDate)}
                                    </p>
                                  ) : data?.discountedprice?.startDate &&
                                    data?.discountedprice?.endDate ? (
                                    <p className="text-[#757575] text-[12px] ">
                                      <span className="font-bold text-black">
                                        Price valid{" "}
                                      </span>
                                      {formatDate(
                                        data?.discountedprice?.startDate
                                      )}{" "}
                                      -{" "}
                                      {formatDate(
                                        data?.discountedprice?.endDate
                                      )}
                                    </p>
                                  ) : null}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="w-full border-t mt-[155px] pb-28 h-[500px] overflow-y-auto">
                            <h2 className="md:text-[24px] text-[18px] font-bold mt-2">
                              Similar products
                            </h2>
                            <div className="">
                              {categoryProducts &&
                              categoryProducts.length > 0 ? (
                                categoryProducts.map((product) => (
                                  <div
                                    key={product._id}
                                    className="flex items-start  justify-between cursor-pointer  mt-[30px]  pb-10"
                                    onMouseEnter={() => setShowCart(true)}
                                    onMouseLeave={() => setShowCart(false)}
                                  >
                                    <div className="flex">
                                      <Image
                                        loading="lazy"
                                        src={product?.images[0]}
                                        height={100}
                                        width={100}
                                        className="mr-[16px] h-[100px] w-[100px]"
                                        alt={
                                          data?.productTitle || "product image"
                                        }
                                      />
                                      <div className="flex flex-col mx-[12px] max-w-[220px]">
                                        <p className="text-[14px] font-bold text-[#484848]">
                                          {product.productTitle}
                                        </p>
                                        <p className="text-[#484848] text-[12px] mb-[5px] line-clamp-1">
                                          {product?.shortDescription}
                                        </p>
                                        <div className="font-bold items-end flex mb-1 my-[5px]">
                                          <h2
                                            className={`text-3xl leading-[0.5] tracking-wide ${
                                              product?.specialprice?.price
                                                ? "bg-[#FFD209] px-2 pt-3 w-fit shadow-lg"
                                                : ""
                                            } `}
                                            style={
                                              product?.specialprice?.price
                                                ? {
                                                    boxShadow:
                                                      "3px 3px #ad3535",
                                                  }
                                                : {}
                                            }
                                          >
                                            <span className="text-sm">
                                              Rs. &nbsp;
                                            </span>{" "}
                                            {product?.specialprice?.price
                                              ? product?.specialprice?.price
                                              : product?.discountedprice?.price
                                              ? product?.discountedprice?.price
                                              : product.perUnitPrice}
                                          </h2>{" "}
                                          <span> &nbsp;/{data.unitType}</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      className="bg-[#0152be] p-1.5 rounded-full max-w-fit self-center md:mr-10 "
                                      onClick={() =>
                                        handleAddToCart(product._id)
                                      }
                                    >
                                      <Image
                                        loading="lazy"
                                        src={"/icons/ad-to-cart.svg"}
                                        height={20}
                                        width={20}
                                        alt="add to cart image"
                                        className="cursor-pointer rounded-full min-w-[20px] min-h-[20px]"
                                      />
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="mt-5">
                                  <p>No related products found !</p>
                                </div>
                              )}
                              {/* <div className="flex items-start  justify-between cursor-pointer  mt-[30px]  pb-10" onMouseEnter={() => setShowCart(true)} onMouseLeave={() => setShowCart(false)}>
                                <div className="flex">
                                  <Image loading="lazy" src={"/images/room/bathroom.jpg"} height={100} width={100} className="mr-[16px] h-[100px] w-[100px]" />
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
                                  <Image loading="lazy" src={"/icons/ad-to-cart.svg"} height={20} width={20} className="cursor-pointer rounded-full min-w-[20px] min-h-[20px]" />
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full px-[16px] py-[24px] gap-4  md:py-0 md:px-0  md:flex-row flex-col items-center justify-around absolute bottom-0 left-0 border-t bg-white z-10 ">
                          <button
                            className="md:px-[42px] w-full px-[24px] md:h-[56px] h-[40px] border   rounded-full md:my-[24px] text-[12px] md:text-[14px] font-semibold md:ml-[24px] hover:border-black"
                            onClick={() => {
                              setsidebarContent(null);
                              document.body.style.overflow = "auto";
                            }}
                          >
                            Continue shopping
                          </button>
                          <button className="md:px-[42px] w-full px-[24px] md:h-[56px] h-[40px] border rounded-full md:my-[24px] bg-black text-white text-[12px] md:text-[14px] font-semibold md:mr-[24px] hover:bg-gray-900">
                            <div onClick={handleGoToShoppingBag}>
                              Go to shopping bag
                            </div>
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
          {data.productType === "normal" || data.productType === "special" ? (
            <div className="flex items-center justify-between mt-4">
              <div className="">
                <IncDecCounter />
              </div>
              <div className="ml-3 w-full mt-[4px]">
                <button
                  onClick={() => {
                    handleClickDB();
                  }}
                  className={`bg-black hover:bg-gray-900 text-white px-4 w-full h-11 rounded-full transition duration-300`}
                >
                  Add to bag
                </button>
              </div>
            </div>
          ) : (
            <div className="buttons mt-4 sm:w-auto w-[100%] sm:block flex flex-col items-center justify-center">
              <div className="guestCheckout w-[100%] flex justify-center items-center mb-[10px] ">
                <button
                  onClick={() => {
                    handleRequest();
                  }}
                  className={` bg-black hover:bg-gray-900 text-white px-4   w-[100%] sm:h-14 h-10 rounded-full  transition duration-300`}
                >
                  Request Now
                </button>
              </div>
            </div>
          )}
          <div className="flex gap-3 mt-4 items-center justify-center">
            {/* <Image 
              src={"/icons/ayatrio_comment_button.svg"}
              height={30}
              width={30}
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
            </div> */}

            <div className="flex flex-col items-center">
              {contentData.map((item, index) => (
                <div key={index} className="w-full max-w-md py-1">
                  <details className="cursor-pointer">
                    <summary className="custom-summary underline">
                      <Image
                        loading="lazy"
                        src={`/icons/${item.icon}.svg`}
                        alt={item.icon}
                        width={25}
                        height={25}
                        className="mr-2"
                      />
                      <p className="md:text-[14px] text-[12px]">{item.title}</p>
                    </summary>
                    <p className="mb-2">{item.content}</p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop={true}
          theme="light"
          style={{ zIndex: "9999999999999" }}
        /> */}
      </div>
    </>
  );
};

export default Card;
