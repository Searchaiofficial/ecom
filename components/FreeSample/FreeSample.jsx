"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "../styles/virtualexperience.css";
import { dataRooms } from "@/Model/data";
import { datarooms, dataTiles, colorTiles } from "@/Model/sampledata";
import { selectVirtualData } from "@/components/Features/Slices/virtualSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setselectedproduct } from "../Features/Slices/compareSlice";
import {
  allSelectedData,
  setSelectedBudget,
  setSelectedColor,
  setSelectedRoom,
  setSelectedStyle,
  setSelectedSubcategory,
} from "../Features/Slices/virtualDataSlice";

const FreeSample = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [catDatas, setcatDatas] = useState([]);
  const dataSelector = useSelector(selectVirtualData);
  console.log({ dataSelector });
  const [selectedActivity, setSelectedActivity] = useState({});

  const [status, setStatus] = useState("");
  const [showCircle, setShowCircle] = useState(false);
  const [subCategoryState, setSubCategoryState] = useState("");
  const [roomstate, setRoomstate] = useState("");
  const [colorstate, setColorstate] = useState("");
  const [stylestate, setStylestate] = useState("");
  const [priceState, setPriceState] = useState("");
  const [filters, setFilters] = useState([]);

  const search = useSearchParams();

  const searchparams = useSearchParams();
  const category = searchparams.get("category");

  useEffect(() => {
    if (dataSelector && search.get("category")) {
      let tempData = dataSelector?.filter(
        (item) => item.category === search.get("category")
      );
      setcatDatas(tempData);
    }
  }, [dataSelector]);

  const handleAddress = () => {
    router.push("/cart");
  };

  const handleSelect = () => {
    setShowCircle(!showCircle);
  };

  // const handleClick = (roomId, roomPrice, roomTitle, roomImage) => {
  //   setSelectedActivity((prevSelectedRooms) => {
  //     if (prevSelectedRooms[roomId]) {
  //       const updatedSelectedRooms = { ...prevSelectedRooms };
  //       delete updatedSelectedRooms[roomId];
  //       return updatedSelectedRooms;
  //     } else {
  //       return {
  //         ...prevSelectedRooms,
  //         [roomId]: {
  //           id: roomId,
  //           price: roomPrice,
  //           title: roomTitle,
  //           image: roomImage,
  //         },
  //       };
  //     }
  //   });

  // Toggle showCircle state
  //   setShowCircle((prevShowCircle) => !prevShowCircle);
  //   // Toggle showButtonContent state
  //   setShowbuttoncontent((prevShowButtonContent) => !prevShowButtonContent);

  //   // Update selectedImage state
  //   setSelectedImage((prevSelectedImage) =>
  //     prevSelectedImage === roomImage ? null : roomImage
  //   );
  // };

  const handleSelectValue = (section, value) => {
    switch (section) {
      case "room": {
        const data = {
          [value]: true,
        };
        dispatch(setSelectedRoom(data));
        break;
      }
      case "price":
        dispatch(setSelectedBudget(value));
        break;
      case "color": {
        const data = {
          [value]: true,
        };
        dispatch(setSelectedColor(data));
        break;
      }
      case "subcategory": {
        const data = {
          [value]: true,
        };
        dispatch(setSelectedSubcategory(data));
        break;
      }
      case "style": {
        const data = {
          [value]: true,
        };
        dispatch(setSelectedStyle(data));
        break;
      }
      default:
        break;
    }
  };

  const [count, setCount] = useState(0);
  const handleres = (roomId, roomPrice, roomTitle, roomImage) => {
    setSelectedActivity((prevSelectedRooms) => {
      if (prevSelectedRooms[roomId]) {
        // Unselect the room
        const updatedSelectedRooms = { ...prevSelectedRooms };
        delete updatedSelectedRooms[roomId];

        // Decrease the count
        setCount((prev) => prev - 1);
        return updatedSelectedRooms;
      } else {
        // Select the room
        setCount((prev) => prev + 1);

        return {
          ...prevSelectedRooms,
          [roomId]: {
            id: roomId,
            price: roomPrice,
            title: roomTitle,
            image: roomImage,
          },
        };
      }
    });
    console.log({ selectedActivity });

    // Toggle showCircle state
    setShowCircle((prevShowCircle) => !prevShowCircle);

    // Toggle showButtonContent state
  };

  //posting to order api

  const [variant, setVariant] = useState("subcategory");

  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`;
  const [subCategory, setSubCategory] = useState([]);
  // useEffect(() => {
  //   const fetchSubCategory = async () => {
  //     try {
  //       setStatus("loading");

  //       const response = await axios.get(url);

  //       if (response.status !== 200) {
  //         throw new Error("HTTP status " + response.status);
  //       }

  //       const responseData = response.data;

  //       const filteredData = responseData.filter(
  //         (item) => item.name.toLowerCase() === searchparams.get("category")
  //       );

  //       if (filteredData.length > 0) {
  //         const newSubCategories = filteredData[0].subcategories;
  //         setSubCategory(newSubCategories); // Update subCategory state with new data
  //         setVariant("subcategory");
  //         setStatus("succeeded");
  //       } else {
  //         setVariant("rooms");
  //       }
  //     } catch (error) {
  //       console.error("Error occurred:", error);
  //       setStatus("failed");
  //     }
  //   };

  //   fetchSubCategory(); // Call fetchSubCategory when component mounts
  // }, []); // Empty dependency array ensures this effect runs only once on mount

  let url2 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/relatedProducts`;
  // let url2 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`;
  const [datastat, setDatastat] = useState("");

  const [subCatImg, setSubCatImg] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setDatastat("loading");
        const response1 = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
        );
        console.log(response1.data);
        const Subcat = response1.data.filter(
          (item) => item.name === searchparams.get("category")
        );
        console.log(Subcat[0].subcategories);
        const response = await axios.get(url2, {
          params: {
            category: searchparams.get("category"),
          },
        });
        // const response = await axios.get(url2);
        if (response.status !== 200) {
          throw new Error("HTTP status" + response.status);
        }
        console.log("products", response.data);
        const responseData = response.data;

        const filteredData = responseData.filter(
          (item) => item.category === searchparams.get("category")
        );
        console.log("filteredData", filteredData);

        // pick all subcategory from filtered data
        const subcategory = filteredData.map((item) => item.subcategory);
        const uniqueSubcategory = [...new Set(subcategory)];
        console.log(uniqueSubcategory);
        const x = Subcat[0].subcategories.filter((subcategory) => {
          return uniqueSubcategory.includes(subcategory.name);
        });

        console.log(x);
        setSubCategory(x);
        // console.log("subcategory", subcategory);

        setProducts((prevData) => {
          const newData = filteredData;
          if (JSON.stringify(newData) !== JSON.stringify(prevData)) {
            return newData;
          } else {
            return prevData;
          }
        });

        setDatastat("succeeded");
      } catch (error) {
        console.error("Error ocurrs here", error);
        setDatastat("failed");
      }
    };

    fetchProducts();
  }, []);

  const [rooms, setRooms] = useState([]);

  const getRooms = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/rooms`
      );
      console.log(response.data);
      const uniqueResponseRooms = response.data.filter(
        (room, index, self) =>
          index === self.findIndex((t) => t.roomType === room.roomType)
      );
      console.log({ products });
      const fetchAllRooms = products.map((item) => item.roomCategory);
      console.log({ fetchAllRooms });
      const allRooms = fetchAllRooms.flat();
      const uniqueRooms = [...new Set(allRooms)];
      console.log(uniqueRooms);
      const x = uniqueResponseRooms
        .filter((room) => uniqueRooms.includes(room.roomType))
        .map(({ roomType, imgSrc }) => ({ roomType, imgSrc }));
      setRooms(x);
      console.log(x);
    } catch (error) {
      console.error("Error ocurrs here", error);
    }
  };

  useEffect(() => {
    getRooms();
  }, [subCategory]);

  const [colors, setColors] = useState([]);
  useEffect(() => {
    const fetchColors = products.map((item) => item.colors);
    // console.log(fetchColors);
    const allColors = fetchColors
      .flat()
      .flatMap((colorsString) => colorsString.split(","));
    console.log(allColors);
    const uniqueColors = [...new Set(allColors)];
    console.log(uniqueColors);
    setColors(uniqueColors);
  }, [rooms]);

  const [styles, setStyles] = useState([]);
  useEffect(() => {
    const fetchStyles = products.map((item) => item.style);
    console.log(fetchStyles);
    const allStyles = fetchStyles.flat();
    console.log(allStyles);
    const uniqueStyles = [...new Set(allStyles)];
    console.log(uniqueStyles);
    setStyles(uniqueStyles);
  }, [colors]);

  // const [price, setPrice] = useState([]);
  // useEffect(() => {
  //   // Filter and categorize prices based on the number of digits
  //   const categorizedPrices = products.map((item) => {
  //     const price = item.perUnitPrice;
  //     if (price >= 0 && price <= 999) {
  //       return { price: price, category: "0-999" };
  //     } else if (price >= 1000 && price <= 9999) {
  //       return { price: price, category: "1000-9999" };
  //     } else if (price >= 10000 && price <= 99999) {
  //       return { price: price, category: "10000-99999" };
  //     } else if (price >= 100000 && price <= 999999) {
  //       return { price: price, category: "100000-999999" };
  //     } else {
  //       return { price: price, category: "unknown" };
  //     }
  //   });

  //   // Extract unique prices from categorized array
  //   const uniquePrices = [...new Set(categorizedPrices)];
  //   console.log(uniquePrices);
  //   setPrice(uniquePrices);
  // }, [products]);

  const price = [
    {
      price: 500,
    },
    {
      price: 1000,
    },
    {
      price: 10000,
    },
    {
      price: 50000,
    },
    {
      price: 100000,
    },
  ];

  const [filteredProducts, setFilteredProducts] = useState(products | []);
  useEffect(() => {
    const applyFilters = () => {
      console.log(filters);
      const filtered = products.filter((product) => {
        for (let filter of filters) {
          let { title, value } = filter;

          switch (title) {
            // case "subcategory":
            //   if (product.subcategory !== value) {
            //     return false;
            //   }
            //   break;
            // case "color":
            //   if (!product.colors.includes(value)) {
            //     return false;
            //   }
            //   break;
            // case "style":
            //   if (!product.colors.includes(value)) {
            //     return false;
            //   }
            //   break;
            // case "room":
            //   if (!product.roomCategory.some((room) => value.includes(room))) {
            //     return false;
            //   }
            //   break;

            case "subcategory": {
              return product.subcategory === value;
            }
            case "room":
              return product.roomCategory.includes(value);
            case "color":
              const colors = value.split(",").map((color) => color.trim());
              return colors.every((color) => product.colors.includes(color));
            case "style":
              return product.style === value;
            case "price":
              return product.perUnitPrice === parseInt(value); // Assuming value is a string representation of price
            default:
              true;
          }
        }
        return true;
      });

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [products, filters]);

  const previousVariant = (prevVariant, title) => {
    setVariant(prevVariant);
    setFilters(filters.filter((item) => item.title !== title));
  };

  const nextVariant = (nextVariant, title, value) => {
    setVariant(nextVariant);
    // check if the value is '' and remove the title from the filter
    if (value === "") {
      setFilters(filters.filter((item) => item.title !== title));
      return;
    }

    // check if the filter already exists and update the value
    const isFilterExist = filters.find((item) => item.title === title);
    if (isFilterExist) {
      setFilters(
        filters.map((item) => (item.title === title ? { title, value } : item))
      );
    }
    // if the filter doesn't exist, add the filter
    else {
      setFilters([...filters, { title, value }]);
    }
  };

  const [selectedProduct, setSelectedProduct] = useState({});
  const handleSelectProduct = (productId) => {
    setSelectedProduct({ productId: productId });
  };

  if (typeof window !== "undefined") {
    var id = localStorage.getItem("deviceId");
    // console.log("deviceId : ", id);
  }
  const posturl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order`;

  const postproductdata = async (postData) => {
    try {
      const response = await axios.post(posturl, postData);

      if (response.status !== 200) {
        throw new Error("HTTP status" + response.status);
      }

      console.log("Data posted successfully:", postData);
    } catch (error) {
      console.error("Error posting room data:", error);
    }
  };

  const handleClickDB = async () => {
    try {
      // const selectedProduct = Object.values(selectedActivity)[0];
      // console.log("Selected Product:", selectedProduct);
      console.log("Selected Product:", selectedProduct);

      if (!selectedProduct || !selectedProduct.productId) {
        console.error("Invalid product details");
        return;
      }

      const postData = {
        deviceId: id,
        productId: selectedProduct.productId,
      };
      console.log("postData:", postData);
      await postproductdata(postData);
    } catch (error) {
      console.error("Error handling click:", error);
    }
  };

  const handleNext = () => {
    router.push("/products/virtualexperience/ayatrio");
    // router.push("/liveroom")
  };
  const usersfilters = useSelector(allSelectedData);
  console.log(usersfilters);

  useEffect(() => {
    console.log("Selected Product:", selectedProduct);
  }, [selectedProduct]);

  return (
    <div className="sm:m-[4rem] m-0 px-[20px]">
      <div>
        {variant === "subcategory" &&
          (catDatas && catDatas[0] ? (
            <>
              <div className="text-3xl font-bold flex justify-center items-center mt-12">
                Choose a Subcategory
              </div>
              <div className="py-4 relative w-full h-full flex flex-col  justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1 mb-4 my-0 mx-2">
                  {subCategory.map((item, index) => (
                    <div
                      key={index}
                      className=" relative  overflow-hidden m-1  group rounded-2xl"
                    >
                      <div
                        onClick={() => {
                          handleSelectValue("subcategory", item.name);
                          setSubCategoryState(item.name);
                        }}
                        style={{ width: "272px", height: "150px" }}
                        className={`parent relative rounded-2xl object-cover w-full opactiy-100 h-full block bg-gray-500 
                        ${subCategoryState === item.name
                            ? " border-2 border-black"
                            : ""
                          }`}
                      >
                        <img
                          className="child absolute object-cover w-full h-full"
                          src={item.img}
                          alt={item.name}
                        />
                        <h3 className="child absolute right-0 bottom-0 bg-white text-black">
                          {" "}
                          {item.name}
                        </h3>
                      </div>

                      {subCategoryState === item.name && (
                        <div className="room-item absolute top-2 right-2 z-10  flex items-center opacity-50 justify-center">
                          <div className="circle-container relative flex justify-center items-center rounded-full bg-none">
                            <Image
                              src="/svg/icon/tick.svg"
                              alt="tick"
                              width={30}
                              height={30}
                              className=" opacity-100 rounded-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setSubCategoryState("");
                    }}
                  >
                    Remove category Filter
                  </button>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => router.push("/category/freesample")}
                  >
                    Back
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() =>
                      nextVariant("rooms", "subcategory", subCategoryState)
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
              {console.log(subCategoryState)}
            </>
          ) : (
            <p>No data found</p>
          ))}

        {variant === "rooms" &&
          (rooms ? (
            <>
              <div className="text-3xl font-bold flex justify-center items-center mt-12">
                Shop by Room
              </div>
              <div className="py-4 relative w-full h-full flex flex-col  justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1 mb-4 my-0 mx-2">
                  {rooms.map((room, index) => (
                    <div
                      key={index}
                      className=" relative  overflow-hidden m-1  group rounded-2xl"
                    >
                      <div
                        onClick={() => {
                          handleSelectValue("room", room.roomType);
                          setRoomstate(room.roomType);
                        }}
                        style={{ width: "272px", height: "150px" }}
                        className={` rounded-2xl object-cover w-full opactiy-100 h-full block bg-gray-500 
                        ${roomstate === room ? " border-2 border-black" : ""}`}
                      >
                        <img
                          className="child absolute object-cover w-full h-full"
                          src={room.imgSrc}
                          alt={room.roomType}
                        />
                        <h3 className="child absolute right-0 bottom-0 bg-white text-black">
                          {" "}
                          {room.roomType}
                        </h3>
                      </div>
                      {/* <h3
                        className={` p-1 rounded-sm absolute right-0 bottom-0 ${
                          roomstate === room.roomType
                            ? "font-semibold text-white absolute left-2 bottom-2 bg-transparent"
                            : "bg-white"
                        }`}
                      >
                        {room.roomType}
                      </h3> */}

                      {roomstate === room.roomType && (
                        <div className="room-item absolute top-2 right-2 z-10  flex items-center opacity-50 justify-center">
                          <div className="circle-container relative flex justify-center items-center rounded-full bg-none">
                            <Image
                              src="/svg/icon/tick.svg"
                              alt="tick"
                              width={30}
                              height={30}
                              className=" opacity-100 rounded-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setRoomstate("");
                    }}
                  >
                    Remove Room Filter
                  </button>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                    onClick={() => previousVariant("subcategory", "room")}
                    disabled={variant === "subcategory"}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => nextVariant("color", "room", roomstate)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p>No data found</p>
          ))}

        {variant === "color" &&
          (colors ? (
            <>
              <div className="text-3xl font-bold flex justify-center items-center mt-12">
                Shop by Color
              </div>
              <div className="py-4 relative w-full h-full flex flex-col  justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1 mb-4 my-0 mx-2">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className=" relative  overflow-hidden m-1  group rounded-2xl"
                    >
                      <div
                        onClick={() => {
                          handleSelectValue("color", color);
                          setColorstate(color);
                        }}
                        style={{ width: "272px", height: "150px" }}
                        className={` rounded-2xl object-cover w-full opactiy-100 h-full block p-1 bg-gray-500 
                        ${colorstate === color ? " border-2 border-black" : ""
                          }`}
                      ></div>
                      <h3
                        className={` p-1 rounded-sm absolute right-0 bottom-0 ${colorstate === color
                            ? "font-semibold text-white absolute left-2 bottom-2 bg-transparent"
                            : "bg-white"
                          }`}
                      >
                        {color}
                      </h3>

                      {colorstate === color && (
                        <div className="room-item absolute top-2 right-2 z-10  flex items-center opacity-50 justify-center">
                          <div className="circle-container relative flex justify-center items-center rounded-full bg-none">
                            <Image
                              src="/svg/icon/tick.svg"
                              alt="tick"
                              width={30}
                              height={30}
                              className=" opacity-100 rounded-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setColorstate("");
                    }}
                  >
                    Remove Room Filter
                  </button>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                    onClick={() => previousVariant("rooms", "color")}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => nextVariant("style", "color", colorstate)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p>No data found</p>
          ))}

        {variant === "style" &&
          (styles ? (
            <>
              <div className="text-3xl font-bold flex justify-center items-center mt-12">
                Shop by style
              </div>
              <div className="py-4 relative w-full h-full flex flex-col  justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1 mb-4 my-0 mx-2">
                  {styles.map((style) => (
                    <div
                      key={style}
                      className=" relative  overflow-hidden m-1  group rounded-2xl"
                    >
                      <div
                        onClick={() => {
                          handleSelectValue("style", style);
                          setStylestate(style);
                        }}
                        style={{ width: "272px", height: "150px" }}
                        className={` rounded-2xl object-cover w-full opactiy-100 h-full block p-1 bg-gray-500 
                        ${stylestate === style ? " border-2 border-black" : ""
                          }`}
                      ></div>
                      <h3
                        className={` p-1 rounded-sm absolute right-0 bottom-0 ${stylestate === style
                            ? "font-semibold text-white absolute left-2 bottom-2 bg-transparent"
                            : "bg-white"
                          }`}
                      >
                        {style}
                      </h3>

                      {stylestate === style && (
                        <div className="room-item absolute top-2 right-2 z-10  flex items-center opacity-50 justify-center">
                          <div className="circle-container relative flex justify-center items-center rounded-full bg-none">
                            <Image
                              src="/svg/icon/tick.svg"
                              alt="tick"
                              width={30}
                              height={30}
                              className=" opacity-100 rounded-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setStylestate("");
                    }}
                  >
                    Remove color Filter
                  </button>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                    onClick={() => previousVariant("color", "style")}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => nextVariant("price", "style", stylestate)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p>No data found</p>
          ))}

        {variant === "price" &&
          (price ? (
            <>
              <div className="text-3xl font-bold flex justify-center items-center mt-12">
                Shop by price
              </div>
              <div className="py-4 relative w-full h-full flex flex-col  justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1 mb-4 my-0 mx-2">
                  {price.map((item, index) => (
                    <div
                      key={index}
                      className=" relative  overflow-hidden m-1  group rounded-2xl"
                    >
                      <div
                        onClick={() => {
                          handleSelectValue("price", item.price);
                          setPriceState(item.price);
                        }}
                        style={{ width: "272px", height: "150px" }}
                        className={` rounded-2xl object-cover w-full opactiy-100 h-full block p-1 bg-gray-500 
                        ${priceState === item.price
                            ? " border-2 border-black"
                            : ""
                          }`}
                      ></div>
                      <h3
                        className={` p-1 rounded-sm absolute right-0 bottom-0 ${priceState === item.price
                            ? "font-semibold text-white absolute left-2 bottom-2 bg-transparent"
                            : "bg-white"
                          }`}
                      >
                        {item.price}
                      </h3>

                      {priceState === item.price && (
                        <div className="room-item absolute top-2 right-2 z-10  flex items-center opacity-50 justify-center">
                          <div className="circle-container relative flex justify-center items-center rounded-full bg-none">
                            <Image
                              src="/svg/icon/tick.svg"
                              alt="tick"
                              width={30}
                              height={30}
                              className=" opacity-100 rounded-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setPriceState("");
                    }}
                  >
                    Remove color Filter
                  </button>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                    onClick={() => previousVariant("style", "price")}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    // onClick={() => nextVariant("products", "price", priceState)}
                    onClick={() => handleNext()}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p>No data found</p>
          ))}

        {variant === "products" && (
          <>
            <div>
              {filters.length > 0 && (
                <div>
                  <h1>Your Filters</h1>
                  {filters.map((item) => (
                    <div key={item.title} className="bg-yellow-200">
                      <span>{item.title} : </span>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
              <button
                className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                onClick={() => previousVariant("color", "color")}
              >
                Previous
              </button>
              <button
                className="bg-blue-500 text-white ml-4 px-4 py-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                onClick={() => handleNext()}
              >
                Next
              </button>
              <h1 className="mt-20">Choose a Product</h1>
              {filteredProducts?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1 mb-4 my-0 mx-2">
                  {filteredProducts?.map((item) => (
                    <div
                      key={item._id}
                      className=" relative  overflow-hidden m-1 aspect-w-16 aspect-h-9 group"
                    >
                      <img
                        src={item.images}
                        alt={item.productTitle}
                        onClick={() => {
                          console.log({ item });
                          // handleres(
                          //   item.productId,
                          //   item.images[0],
                          //   item.perUnitPrice,
                          //   item.productTitle
                          // );
                          handleSelectProduct(item.productId);
                          handleSelect();

                          console.log(
                            selectedProduct.productId === item.productId
                          );
                        }}
                        className={`room-item rounded-2xl object-cover w-full opactiy-100 h-full block p-1
                    ${selectedProduct.productId === item.productId
                            ? " "
                            : "overlay z-10 "
                          }  ${selectedProduct.productId === item.productId
                            ? " border-2 border-black "
                            : ""
                          }
                  `}
                      />

                      {/* Your existing code for displaying product title */}
                      <h3
                        className={` p-1 rounded-sm absolute right-0 bottom-0
                    ${selectedProduct.productId === item.productId
                            ? "font-semibold text-white absolute left-2 bottom-2 bg-transparent"
                            : "bg-white"
                          }
                  `}
                      >
                        {item.productTitle}
                      </h3>

                      {/* Your existing code for displaying the tick icon */}
                      {selectedProduct.productId === item.productId && (
                        <div className="room-item absolute top-2 right-2 z-10  flex items-center opacity-50 justify-center">
                          <div className="circle-container relative flex justify-center items-center">
                            <Image
                              src="/svg/icon/tick.svg"
                              alt="tick"
                              width={30}
                              height={30}
                              className=" opacity-100"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div>No products found based on selected filters.</div>
              )}
            </div>
            <Link
              href={{
                pathname: "/checkout",
                query: {
                  search: "freesample",
                },
              }}
              className="memberCheckout my-4 flex items-center justify-center"
            >
              <button
                onClick={() => handleClickDB()}
                className="bg-black text-white sm:w-40 w-40 sm:h-16 h-8 rounded-full hover:bg-gray-900 transition duration-300"
              >
                Free Sample
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default FreeSample;
