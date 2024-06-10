"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  setCategory,
} from "../Features/Slices/virtualDataSlice";

// import { handleSetStep } from "@/components/Features/Slices/ayatrioSlice";

const FreeSample = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [dataStep, setDataStep] = useState({ step: 1 });

  const steps = [
    {
      step: 1,
      selected: dataStep.step > 0,
    },
    {
      step: 2,
      selected: dataStep.step > 1,
    },
    {
      step: 3,
      selected: dataStep.step > 2,
    },
    {
      step: 4,
      selected: dataStep.step > 3,
    },
    // {
    //   step: 5,
    //   selected: dataStep.step > 4,
    // },
  ];
  const handleNextButton = () => {
    if (dataStep.step === 4) {
      handleNext();
      // } else dispatch(handleSetStep(dataStep.step + 1));
    } else setDataStep({ step: dataStep.step + 1 });
  };

  const handlePreviousButton = () => {
    // dispatch(handleSetStep(dataStep.step - 1));
    setDataStep({ step: dataStep.step - 1 });
  };

  // const [catDatas, setcatDatas] = useState([]);
  const dataSelector = useSelector(selectVirtualData);
  console.log({ dataSelector });
  const [selectedActivity, setSelectedActivity] = useState({});

  const [status, setStatus] = useState("");
  const [showCircle, setShowCircle] = useState(false);
  const [serviceState, setServiceState] = useState(-1);
  const [categoryState, setCategoryState] = useState(-1);
  const [subCategoryState, setSubCategoryState] = useState("");
  const [roomstate, setRoomstate] = useState(-1);
  const [colorstate, setColorstate] = useState("");
  const [stylestate, setStylestate] = useState("");
  const [priceState, setPriceState] = useState(-1);
  const [filters, setFilters] = useState([]);

  const search = useSearchParams();

  const searchparams = useSearchParams();
  // const category = searchparams.get("category");

  // useEffect(() => {
  //   if (dataSelector && search.get("category")) {
  //     let tempData = dataSelector?.filter(
  //       (item) => item.category === search.get("category")
  //     );
  //     setcatDatas(tempData);
  //   }
  // }, [dataSelector]);

  const handleAddress = () => {
    router.push("/cart");
  };

  const handleSelect = () => {
    setShowCircle(!showCircle);
  };

  const handleSelectValue = (section, value) => {
    switch (section) {
      case "category": {
        const data = {
          [value]: true,
        };
        dispatch(setCategory(value));
        setSelectedCategory(value);
        break;
      }
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

  let url2 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`;
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response1 = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
        );
        console.log(response1.data);
        const response = await axios.get(url2);
        if (response.status !== 200) {
          throw new Error("HTTP status" + response.status);
        }
        console.log("products", response.data);
        const responseData = response.data;

        const filteredData = responseData.filter(
          (item) => item.category === selectedCategory
        );
        console.log("filteredData", filteredData);
        setProducts((prevData) => {
          const newData = filteredData;
          if (JSON.stringify(newData) !== JSON.stringify(prevData)) {
            return newData;
          } else {
            return prevData;
          }
        });
      } catch (error) {
        console.error("Error ocurrs here", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
        );
        if (response.status !== 200) {
          throw new Error("HTTP status" + response.status);
        }
        console.log(response.data);
        setAllCategories(response.data);
      } catch (error) {
        console.error("Error occured:", error);
      }
    };

    fetchAllCategories();
  }, []);

  const [rooms, setRooms] = useState([]);

  const getRooms = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllRooms`
      );
      console.log(response.data);
      const uniqueResponseRooms = response.data.filter(
        (room, index, self) =>
          index === self.findIndex((t) => t.roomType === room.roomType)
      );
      console.log({ products });
      const fetchAllRooms = products.map((item) => item.roomCategory);
      // console.log({ fetchAllRooms });
      const allRooms = fetchAllRooms.flat();
      const uniqueRooms = [...new Set(allRooms)];
      console.log(uniqueRooms);

      const roomMap = uniqueResponseRooms.map(({ roomType, imgSrc }) => ({
        roomType,
        imgSrc,
      }));
      console.log(roomMap);
      const x = uniqueRooms.map((roomResponse) => {
        const imgSrc =
          roomMap.find((room) => room.roomType === roomResponse)?.imgSrc ||
          "https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1715509176918_image_x2.jpg";
        return {
          roomType: roomResponse,
          imgSrc,
        };
      });

      // const x = uniqueResponseRooms
      //   .filter((room) => uniqueRooms.includes(room.roomType))
      //   .map(({ roomType, imgSrc }) => ({ roomType, imgSrc }));
      setRooms(x);
    } catch (error) {
      console.error("Error ocurrs here", error);
    }
  };

  useEffect(() => {
    getRooms();
  }, [products]);

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
    if (pathname === "/freesample" || pathname === "/freedesign")
      router.push(`/products/virtualexperience/${selectedCategory}`);
    else if (pathname === "/virtualexperience") router.push("/liveroom");
    // router.push("/liveroom")
  };
  const usersfilters = useSelector(allSelectedData);
  console.log(usersfilters);

  useEffect(() => {
    console.log("Selected Product:", selectedProduct);
  }, [selectedProduct]);

  const stepOneData = [
    {
      icon: "/icons/furniture.svg",
      label: "Furnituring",
    },
    {
      icon: "/icons/furnishing.svg",
      label: "Furnishing",
    },
    {
      icon: "/icons/storage-planing.svg",
      label: "Storage plan",
    },
  ];

  return (
    <div className="pt-[120px] relative h-content  md:min-h-screen">
      {dataStep.step === 1 && (
        <div className="px-[20px] md:px-[67px] justify-between  flex flex-col md:flex-row  ">
          <div>
            <h1 className="md:text-[18px] text-[16px] font-semibold">Step 1</h1>
            <h2 className="mt-6 md:text-[32px] text-[20px] font-medium">
              Tell us about what service looking for
            </h2>
            <p className="md:text-[16px] text-[14px]">
              in this step, we'll ask you what are type service you looking at .
            </p>

            <div className="md:flex md:flex-wrap gap-4 mt-10 grid grid-cols-2 ">
              {stepOneData.map((data, index) => {
                return (
                  <div
                    key={data.label + index}
                    onClick={() => setServiceState(index)}
                    className={`flex flex-col md:w-48 border hover:border-black hover:border-2 p-2 md:p-4 cursor-pointer ${serviceState === index

                      ? "border-black text-black border-2"
                      : "text-neutral-500 border-neutral-300"

                      }`}
                  >
                    <Image src={data.icon} width={45} height={45} />
                    <span className="text-[16px] mt-[4px] font-medium">{data.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="md:absolute md:right-[67px] mt-10 md:mt-0">
            {pathname === "/freesample" && (
              <div className="bg-zinc-50 md:w-[22rem]  px-6 py-6">
                <div className="flex gap-4 items-center mb-6">
                  <Image
                    src="/icons/payment.svg"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-[16px]">Select your personal choice</h1>
                    <p className="text-sm font-normal mt-2 text-[#666666]">
                      Add 1 to 5 designs that catch your eye to your Try At Home
                      cart.
                    </p>
                  </div>
                </div>
                {/* <div className="flex gap-4 items-center mb-6">
                  <Image
                    src="/icons/payment.svg"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-[16px]">Select your personal choice</h1>
                    <p className="text-sm font-normal mt-2 text-[#666666]">
                      Add 1 to 5 designs that catch your eye to your Try At Home
                      cart.
                    </p>
                  </div>
                </div> */}
                <div className="flex gap-4 items-center mb-6">
                  <Image
                    src="/icons/payment.svg"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-[16px]">Schedule your try at home</h1>
                    <p className="text-sm font-normal mt-2 text-[#666666]">
                      We'll be there anytime between Monday to Sunday, at home or
                      office.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center mb-6">
                  <Image
                    src="/icons/payment.svg"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-[16px]">We respect your choice</h1>
                    <p className="text-sm font-normal mt-2 text-[#666666]">
                      Try At Home stress-free, with no obligation to purchas
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 mb-[80px]  ">
            {pathname === "/freedesign" && (
              <div className="bg-zinc-50 md:w-[22rem]  px-6 py-6">
                <div className="flex gap-4 items-center mb-6">
                  <Image
                    src="/icons/virtual-online.svg"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-[16px]">
                      Book a free virtual interior design appointment for home
                    </h1>
                    <p className="text-sm font-normal mt-2 text-[#666666]">
                      Please fill out the online questionnaire about your project
                      needs so that we can prepare for our first meeting together.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center mb-6">
                  <Image
                    src="/icons/vision.svg"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-[16px]">
                      We understand your project needs to build a vision for you
                    </h1>
                    <p className="text-sm font-normal mt-2 text-[#666666]">
                      We will share a mood board and rough plans based on your
                      online questionnaire to create alignment on the vision for
                      your space.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center mb-6">
                  <Image
                    src="/icons/onsite-management.svg"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-[16px]">On-site measurement</h1>
                    <p className="text-sm font-normal mt-2 text-[#666666]">
                      Meet with your interior designer to approve floor plans,
                      elevations, and product selections to move toward your final
                      design solution.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center mb-6">
                  <Image
                    src="/icons/final-design.svg"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-[16px]">Final design solution</h1>
                    <p className="text-sm font-normal mt-2 text-[#666666]">
                      Your final design package contains a mood board, floor plan, product selection, detailed drawings, material suggestions, and services offer.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center mb-6">
                  <Image
                    src="/icons/instalation.svg"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-[16px]">Delivery and installation</h1>
                    <p className="text-sm font-normal mt-2 text-[#666666]">
                      Once the design is confirmed, we will provide fast and convenient delivery as time conform and installation services.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {dataStep.step === 2 && (
        <div className="px-[20px] md:px-[100px] flex flex-col md:flex-row  justify-between">
          <div>
            {/* <h1 className="text-[18px] font-semibold">Step 2</h1>
            <h2 className="mt-6 text-[32px] font-medium">
              Tell us about what category looking for
            </h2>
            <p className="text-[16px]">
              in this step, we'll ask you what type of category you looking at .
            </p> */}
            <h1 className="md:text-[18px] text-[16px] font-semibold">Step 2</h1>
            <h2 className="mt-6 md:text-[32px] text-[20px] font-medium">
              Tell us about what category looking for
            </h2>
            <p className="md:text-[16px] text-[14px]">
              in this step, we'll ask you what type of category you looking at .
            </p>
            {/* <h1 className="text-2xl font-medium">Step 2</h1>
            <h2 className="mt-8 text-2xl font-medium">
              Tell us about what category looking for
            </h2>
            <p className="my-2 text-lg">
              in this step, we'll ask you what type of category you looking at .
            </p> */}

            <div className="md:flex md:flex-wrap gap-4 mt-10 grid grid-cols-2 mb-[80px] md:mb-0  ">
              {allCategories.map((item, index) => {
                return (
                  <div key={index} className=" relative group  overflow-hidden ">
                    <div
                      onClick={() => {
                        handleSelectValue("category", item.name);
                        setCategoryState(index);
                      }}
                      className={`relative flex flex-col  w-full opacity-100 h-full cursor-pointer `}
                    >
                      <div className="hover:border-2 border border-black">
                        <Image
                          className={`object-cover w-[272px]  h-[150px]  ${categoryState === index && "border-black border-[3px]"
                            }`}
                          width={300}
                          height={300}
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <h3 className={` text-[16px] text-[#666666] group-hover:text-black text-center mt-2 font-medium ${categoryState === index && "text-black"}`}>
                        {item.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {dataStep.step === 3 && (
        <div className="px-[20px] md:px-[100px] flex flex-col md:flex-row  justify-between">
          <div>
            {/* <h1 className="text-[18px] font-semibold">Step 3</h1>
            <h2 className="mt-6 text-[32px] font-medium">
              Tell us about your place
            </h2>
            <p className="text-[16px]">
              in this step, we'll ask you what type of room you want to design.
            </p> */}


            <h1 className="md:text-[18px] text-[16px] font-semibold">Step 3</h1>
            <h2 className="mt-6 md:text-[32px] text-[20px] font-medium">
              Tell us about your place
            </h2>
            <p className="md:text-[16px] text-[14px]">
              in this step, we'll ask you what type of room you want to design.
            </p>


            <div className="md:flex md:flex-wrap gap-4 mt-10 grid grid-cols-2 mb-[80px] md:mb-0  ">
              {rooms.map((item, index) => {
                return (
                  <div key={index} className=" relative  overflow-hidden ">
                    <div
                      onClick={() => {
                        handleSelectValue("room", item.roomType);
                        setRoomstate(index);
                      }}
                      className={`relative flex flex-col  w-full opacity-100 h-full cursor-pointer `}
                    >
                      <div className="hover:border-2 border border-black">

                        <Image
                          className={`object-cover w-[272px] h-[150px]  ${roomstate === index && "border-black border-[3px]"
                            }`}
                          width={300}
                          height={300}
                          src={item.imgSrc}
                          alt={item.name}
                        />
                      </div>
                      <h3 className=" md:text-xl text-[16px] text-center mt-2 font-medium">
                        {item.roomType}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {dataStep.step === 4 && (
        <div className="px-[20px] md:px-[100px] flex flex-col md:flex-row  justify-between">
          <div>
            {/* <h1 className="text-2xl font-medium">Step 4</h1>
            <h2 className="mt-8 text-2xl font-medium">
              Tell us about how much finance
            </h2>
            <p className="my-2 text-lg">
              in this step, we'll ask you what are type room do you want design.
            </p> */}

            {/* <h1 className="text-[18px] font-semibold">Step 4</h1>
            <h2 className="mt-6 text-[32px] font-medium">
              Tell us about how much finance
            </h2>
            <p className="text-[16px]">
              in this step, we'll ask you what are type room do you want design.
            </p> */}

            <h1 className="md:text-[18px] text-[16px] font-semibold">Step 4</h1>
            <h2 className="mt-6 md:text-[32px] text-[20px] font-medium">
              Tell us about how much finance
            </h2>
            <p className="md:text-[16px] text-[14px]">
              in this step, we'll ask you what are type room do you want design.
            </p>

            <div className="md:flex md:flex-wrap gap-4 mt-10 grid grid-cols-2 ">
              {price.map((item, index) => {
                return (
                  <div key={index} className=" relative md:w-48   overflow-hidden ">
                    <div
                      onClick={() => {
                        handleSelectValue("price", item.price);
                        setPriceState(index);
                      }}
                      className={`relative  flex flex-col p-2 md:p-4 min-h-[86px] md:max-h-[102px]  hover:border-2 border hover:border-black  justify-center  opacity-100 cursor-pointer ${priceState === index && "border-black border-2"
                        }`}
                    >
                      <h3 className=" text-xl text-center mt-2 font-medium">
                        {item.price}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <section className=" fixed w-full mt-16 h-20  bottom-0 bg-white">
        <div className="flex items-center gap-2 w-full">
          {steps.map((step, index) => {
            return (
              <div
                key={step.step + index}
                className={` h-[3px] w-full rounded ${step.selected ? "bg-black" : "bg-gray-300"
                  } `}
              ></div>
            );
          })}
        </div>
        <div className="h-14 flex justify-between items-center  container mx-auto px-[10px] md:px-0 ">
          <button
            className="text-lg font-medium underline border-transparent hover:border-black  py-1 px-6 hover:bg-gray-100 cursor-pointer"
            disabled={dataStep.step === 1}
            onClick={() => handlePreviousButton()}
          >
            Back
          </button>
          <button
            className="text-lg font-medium bg-black text-white py-1 px-6 rounded-full hover:bg-gray-800 disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed"
            // disabled={dataStep.step === 4}
            disabled={dataStep.step === 2 && categoryState < 0 || dataStep.step === 3 && roomstate < 0 || dataStep.step === 4 && priceState < 0}
            onClick={() => handleNextButton()}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default FreeSample;
