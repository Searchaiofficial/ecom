"use client";
import Card from "@/components/Room/Other/Card";
import Reviews from "@/components/Room/Other/Reviews";
import RoomImageList from "@/components/Room/RoomImageList";
import RoomInfo from "@/components/Room/RoomInfo";
import React, { useEffect, useState } from "react";
import ImageCaresoul from "@/components/Room/imagecaresoul";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQuantity,
  updateQuantity,
} from "@/components/Features/Slices/calculationSlice";
import {
  selectRoomData,
  setRoomData,
} from "@/components/Features/Slices/roomSlice";
import "./styles.css"
import axios from "axios";
import Carous from "@/components/Carousel/Carous";
import { useParams, useRouter } from "next/navigation";
import UserReviewPosts from "@/components/Cards/UserReviewPosts";
import AccessoriesPosts from "@/components/Cards/AccessoriesPosts";
import Link from "next/link";
import Image from "next/image";
import { setDbItems } from "@/components/Features/Slices/cartSlice";
import { Router } from "next/dist/client/router";
import TabsProductContent from "@/components/compounds/TabsProductContent";

const RoomPage = () => {
  const [navigationItemData, setNavigationItemData] = useState(null);
  const router = useRouter()
  const [openFreeSAmple, setOpenFreeSample] = useState(false)
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false)
  const [ColorfilterOpen, setColorFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedColor, setSelectedColor] = useState("All Colors")
  const [allColors, setAllColors] = useState([])


  useEffect(() => {
    if (window !== undefined) {
      const navigationItem = JSON.parse(
        window.sessionStorage.getItem("navigationItem")
      );
      if (navigationItem) {
        setNavigationItemData(navigationItem);
        sessionStorage.removeItem("navigationItem");
      }
    }
  }, []);

  const dispatch = useDispatch();
  const quantity = useSelector(selectQuantity);
  // const { title } = useParams();
  const params = useParams();
  const title = params.title.replace(/-/g, " ");
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=`;
  const [data, setData] = useState([]);
  const selectedData = useSelector(selectRoomData);

  useEffect(() => {
    // Fetch room data based on the title
    dispatch({ type: "FETCH_ROOM_REQUEST", payload: title });
  }, [title, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = sessionStorage?.getItem("roomData");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setData(parsedData);
          dispatch(setRoomData({ roomData: parsedData }));
          if (parsedData?.productImages?.[0]?.color) {
            dispatch({
              type: "FETCH_IMAGE_DATA",
              payload: parsedData?.productImages[0]?.color,
            });
          } else {
            dispatch({
              type: "FETCH_IMAGE_DATA",
              payload: null,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching cached data:", error);
      }
    };

    fetchData();
  }, [dispatch]); // Fetch cached data only once when component mounts

  useEffect(() => {
    if (selectedData && Object.keys(selectedData).length !== 0) {
      // Update cached data with selected data
      sessionStorage?.setItem("roomData", JSON.stringify(selectedData));
      setData(selectedData); // Update component state with selectedData
      if (selectedData?.productImages?.[0]?.color) {
        dispatch({
          type: "FETCH_IMAGE_DATA",
          payload: selectedData?.productImages[0]?.color,
        });
      } else {
        dispatch({
          type: "FETCH_IMAGE_DATA",
          payload: null,
        });
      }
    }
  }, [selectedData, dispatch]);



  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setHowMuchScrolled(window.scrollY);
  //     } else {
  //       setHowMuchScrolled(0);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [howMuchScrolled]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // const [isFilterVisible, setIsFilterVisible] = useState(true);

  // useEffect(() => {
  //   let prevScrollPos = window.scrollY;

  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;
  //     setIsFilterVisible(
  //       currentScrollPos <= prevScrollPos || currentScrollPos < 100
  //     );
  //     prevScrollPos = currentScrollPos;
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // console.log("11111", data);

  const [accessories, setAccessories] = useState([]);
  const commonClasses =
    "px-[24px] py-3 mr-2.5 rounded-full flex  whitespace-nowrap";
  const fetchAccessories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/productByCategoryAndSubCategory?category=${data?.category}&subcategory=Accessories`);
      setAccessories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.category) {
      fetchAccessories();
    }
  }, [data]);


  const [allProducts, setAllProducts] = useState([])
  const [allCategories, setAllCategories] = useState([])

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?limit=1000`);
      setAllProducts(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`);
      setAllCategories(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts()
    fetchAllCategories()

  }, []);

  const [FilteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const ExcludedAccessories = allProducts?.filter(item => item?.subcategory !== "Accessories")
    const colors = allProducts.flatMap((product) => product.colors);
    const uniqueColors = [...new Set(colors)];
    setAllColors(uniqueColors)
    setFilteredProducts(ExcludedAccessories)

  }, [allProducts])


  const [selectedSamples, setSelectedSamples] = useState([]);

  // useEffect(() => {
  //   setSelectedSamples([]);
  // }, [data]);

  // const handleChecked = (item) => {
  //   if (selectedSamples.length < 2) {
  //     setSelectedSamples(prevSamples => [...prevSamples, item]);
  //   }
  //   else {
  //     window.alert("You can select only 2 samples")
  //   }

  // };
  const handleChecked = (item) => {
    setSelectedSamples((prevSamples) => {
      if (prevSamples.includes(item)) {
        // If item is already in the selected samples, remove it
        return prevSamples.filter((sample) => sample !== item);
      } else {
        // If item is not in the selected samples, add it
        if (prevSamples.length < 3) {
          return [...prevSamples, item];
        } else {
          window.alert("You can select only 2 samples")
        }
      }
    });
  };
  // console.log(selectedSamples.length)

  const removeItem = (item) => {
    const filteredSamples = selectedSamples.filter((sample) => sample !== item);
    setSelectedSamples(filteredSamples);
  }

  const handleJoinLive = () => {
    // Store category data in local storage
    localStorage.setItem('selectedCategory', category);
  };

  const handleFreeSampling = () => {
    setOpenFreeSample(true)
    document.body.style.overflow = "hidden";
    if (selectedSamples.length < 3) {
      if (selectedSamples.includes(data)) {
        return
      } else {
        setSelectedSamples((prev) => [...prev, data])
      }
    }

  }

  const handleClose = () => {
    setOpenFreeSample(false)
    document.body.style.overflow = "auto";
  }

  const handleBuySamples = async () => {
    setOpenFreeSample(false)
    document.body.style.overflow = "auto";
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/freeSampling`, {
        deviceId: localStorage.getItem("deviceId"),
        freeSampleIds: selectedSamples.map(sample => sample._id),
      });
      if (response.status === 200) {
        dispatch(setDbItems(response.data));
        router.push("/checkout");
      }
    } catch (error) {
      console.log("Free Sampling error", error);
    }
  };


  const fetchProductsbyCategory = async (category) => {
    try {
      if (category === "All Categories") {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?limit=1000`);
        const excludeAccessories = response.data?.filter(item => item?.subcategory !== "Accessories")
        setFilteredProducts(excludeAccessories)
      } else {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchProductsByCategory/${category}`);
        const excludeAccessories = response.data?.filter(item => item?.subcategory !== "Accessories")
        setFilteredProducts(excludeAccessories)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryFilter = (item) => {
    setSelectedCategory(item)
    fetchProductsbyCategory(item)

  }

  const handleColorFilter = async (color) => {
    setSelectedColor(color)
    if (color === "All Colors") {
      setFilteredProducts(FilteredProducts)
    } else {
      // await fetchProductsbyCategory("All Categories")
      const filteredProducts = FilteredProducts.filter((product) => {
        return product.colors.includes(color);
      });
      setFilteredProducts(filteredProducts);
    }

  }

  const handleRemoveAllFilters = () => {
    setSelectedCategory("All Categories")
    setSelectedColor("All Colors")
    fetchProductsbyCategory("All Categories")
  }


  return (
    <>
      {openFreeSAmple && <div className="background-overlay open"></div>}
      <div className="overflow-y-auto overflow-x-hidden container-rooms flex sm:block items-center px-[20px] sm:px-[50px] lg:px-[27px] ">
        <div className="sm:mt-[65px] w-full">
          {/* <div className="mt-[65px] w-full"> */}
          <div className=" sm:flex-row gap-8 flex-col flex overflow-hidden">
            {/* <div className="relative sm:basis-2/3 flex lg:pl-[40px] mt-[50px] sm:mt-[40px] flex-col sm:flex-grow"> */}
            <div className="relative sm:basis-2/3 flex lg:pl-[40px]  sm:mt-[40px] flex-col sm:flex-grow">
              {/* <div className=" font-sans font-normal text-xs sm:text-sm md:pb-[10px]  sticky top-10 mb-[20px] md:mb-[7px] md:mt-0 mt-[20px] flex items-center gap-1"> */}
              <div className=" font-sans font-normal text-xs sm:text-sm md:pb-[10px]  sticky top-2 mb-[20px] md:mb-[7px] md:mt-0 mt-[20px] flex items-center gap-1">
                {navigationItemData ? (
                  <>
                    <Link href={`${navigationItemData.href}`}>
                      <span className="hover:text-gray-600 cursor-pointer ">
                        {navigationItemData.label}
                      </span>
                    </Link>
                    <Image
                      src="/icons/backarrowRevarce.svg"
                      alt="tick"
                      width={10}
                      height={10}
                      className="opacity-100 h-[8px] mt-[5px]"
                    />
                  </>
                ) : (
                  <>
                    <Link href="/">
                      <span className="hover:text-gray-600 cursor-pointer ">
                        Home
                      </span>
                    </Link>
                    <Image
                      src="/icons/backarrowRevarce.svg"
                      alt="tick"
                      width={10}
                      height={10}
                      className="opacity-100 h-[8px] mt-[5px]"
                    />
                  </>
                )}
                <Link
                  href={`/${data?.category?.replace(/ /g, "-")}/category/all`}
                >
                  <span className="hover:text-gray-500 cursor-pointer ">
                    {data?.category}
                  </span>
                </Link>
                <Image
                  src="/icons/backarrowRevarce.svg"
                  alt="tick"
                  width={10}
                  height={10}
                  className="opacity-100 h-[8px] mt-[5px]"
                />
                <Link
                  href={`/${data?.category?.replace(
                    / /g,
                    "-"
                  )}/category/${data?.subcategory?.replace(/ /g, "-")}`}
                >
                  <span className="hover:text-gray-500 cursor-pointer ">
                    {data?.subcategory}
                  </span>
                </Link>
                <Image
                  src="/icons/backarrowRevarce.svg"
                  alt="tick"
                  width={10}
                  height={10}
                  className="opacity-100 h-[8px] mt-[5px]"
                />
                <span className="text-gray-500 cursor-pointer ">
                  {data?.productTitle}
                </span>
              </div>
              <RoomImageList images={data?.images} alt={data?.productTitle} />
              <ImageCaresoul images={data?.images} />
              <div className="block md:hidden">
                <Card data={data} productId={data._id} accessories={accessories} />
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <div className="flex flex-row bg-red-500 gap-2 p-1">
                  <Image
                    src="/icons/golive.svg"
                    alt="live icon"
                    width={16}
                    height={16}
                    loading="lazy"
                  />
                  <span className="text-white text-xs">Live</span>
                </div>
                <Link
                  href={{
                    pathname: '/liveroom',
                  }}
                  passHref
                  onClick={handleJoinLive}
                  className="py-2 focus:outline-none text-black flex items-center ml-2 h-8"
                >
                  <span className="text-sm">Join Live</span>
                </Link>
                <span></span>
                <div
                  onClick={handleFreeSampling}
                  className="py-2 focus:outline-none h-8 flex items-center cursor-pointer space-x-2 "
                >
                  <Image
                    src="/icons/free-sample.svg"
                    alt="free-sample"
                    width={20}
                    height={25}
                    loading="lazy"
                  />
                  <span className="text-sm">Free Sampling</span>
                </div>
              </div>

              <RoomInfo data={data} />
              <Reviews productId={data._id} data={data} />
              {/* <div className="w-[77%]">
                <UserReviewPosts />
              </div> */}
            </div>
            <div className="md:basis-2/3 hidden md:flex flex-col"  >
              <div className="md:relative flex top-14 mb-16 ml-0 ">
                <Card data={data} productId={data._id} />
              </div>
            </div>
          </div>

          <div className="lg:pl-[40px] w-full lg:w-[66%] ">
            <AccessoriesPosts data={data} accessories={accessories} />
          </div>
          <div className="lg:pl-[40px] w-full lg:w-[66%]">
            <UserReviewPosts
              slidesPerView={2.2}
              SubcategoryName={data.subcategory}
            />
          </div>
          <div className="lg:pl-[40px] w-full">
            <Carous data={data} />
          </div>
        </div>
      </div>
      {openFreeSAmple && (
        <div className={`fixed top-0 z-[9999] overflow-y-auto right-0 w-[100%] lg:w-[70%] h-full bg-white shadow-lg transition-transform transform ${openFreeSAmple ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center px-[24px] lg:px-[32px] my-5 justify-between">
            <div className="flex flex-col">
              <h1 className="text-[16px] font-semibold">Free sample products</h1>
              <p className="text-[12px] text-gray-600 hidden lg:flex font-medium">You can select a maximum of three samples at a time</p>

            </div>
            <button className="text-xl px-3 py-1 hover:bg-[#e5e5e5] rounded-full cursor-pointer" onClick={handleClose} >
              X
            </button>
          </div>
          <div className="px-[24px] lg:px-[32px]">
            <div className="flex  justify-between">
              <div className="flex  items-center gap-4">
                {
                  selectedSamples && selectedSamples?.length > 0 && (
                    selectedSamples.map((item) => {

                      return (
                        <div className="max-w-[130px]" >
                          <div
                            className="cursor-pointer"

                          >
                            <div className="flex flex-col ">
                              <div className="lg:mb-[10px] ">
                                <Image
                                  src={item.images[0]}
                                  width={200}
                                  height={130}
                                  alt={item.productTitle}
                                  className="w-[200px] h-[70px]"
                                />
                              </div>
                              <div onClick={() => removeItem(item)} className="h-[20px] flex items-center justify-center  absolute w-[20px] rounded-full bg-white">
                                <p>X</p>
                              </div>
                              <h2 className="text-[#333333] text-[14px] hover:underline line-clamp-1">
                                {item.productTitle}
                              </h2>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )
                }
              </div>
              {
                selectedSamples && selectedSamples?.length > 0 && (
                  <div className="lg:max-w-[250px]  ">
                    <button
                      onClick={handleBuySamples}
                      className={`bg-black hover:bg-gray-900 text-white px-4 w-full sm:h-11 h-9 rounded-full transition duration-300`}
                    >
                      <p className="flex gap-2">
                        Buy <span className="lg:flex hidden">Samples</span>
                      </p>
                    </button>
                  </div>
                )
              }

            </div>
            <div className="flex overflow-x-scroll lg:overflow-x-hidden items-center lg:gap-2 gap-2 mt-6">
              <div onClick={() => setCategoryFilterOpen(!categoryFilterOpen)} className={`${commonClasses} text-[14px] flex items-center gap-2 font-semibold rounded-full bg-gray-100`}>
                <p>{selectedCategory}</p>
                <Image loading="lazy"
                  src="/icons/backarrow.svg"
                  width={40}
                  height={40}
                  className={`w-4 h-4 mt-1 block  ${categoryFilterOpen && "rotate-90"} -rotate-90`}
                  alt="arrow icon"
                />
                {
                  categoryFilterOpen && allCategories && allCategories.length > 0 && (
                    <div className={`w-[300px] cursor-pointer absolute ${selectedSamples.length > 0 ? "top-64" : "top-40"}  z-50 h-fit bg-white border border-gray-200 rounded-lg`}>
                      <p onClick={() => handleCategoryFilter("All Categories")} className="flex text-[14px] font-semibold px-4 py-2">All Categories</p>
                      {
                        allCategories.map((item) => {
                          return (
                            <p onClick={() => handleCategoryFilter(item.name)} className="flex cursor-pointer text-[14px] font-semibold px-4 py-2">{item.name}</p>
                          )
                        })
                      }
                    </div>
                  )
                }

              </div>
              <div onClick={() => setColorFilterOpen(!ColorfilterOpen)} className={`${commonClasses} text-[14px] flex items-center gap-2 font-semibold rounded-full bg-gray-100`}>
                <p>{selectedColor}</p>
                <Image loading="lazy"
                  src="/icons/backarrow.svg"
                  width={40}
                  height={40}
                  className={`w-4 h-4 mt-1 block  ${ColorfilterOpen && "rotate-90"} -rotate-90`}
                  alt="arrow icon"
                />
                {
                  ColorfilterOpen && allColors && allColors.length > 0 && (
                    <div className={`w-[300px] cursor-pointer absolute ${selectedSamples.length > 0 ? "top-64" : "top-40"}  z-50 h-fit bg-white border border-gray-200 rounded-lg`}>
                      <p onClick={() => handleColorFilter("All Colors")} className="flex text-[14px] font-semibold px-4 py-2">All Colors</p>
                      {
                        allColors.map((item) => {
                          return (
                            <p onClick={() => handleColorFilter(item)} className="flex cursor-pointer text-[14px] font-semibold px-4 py-2">{item}</p>
                          )
                        })
                      }
                    </div>
                  )
                }

              </div>
              <div onClick={() => handleRemoveAllFilters()} className={`${commonClasses} text-[14px] cursor-pointer flex items-center gap-2 font-semibold rounded-full bg-gray-100`}>
                <p>Remove all filters</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-2 gap-y-4 gap-4 mt-10">
              {
                FilteredProducts && FilteredProducts.length > 0 && (
                  FilteredProducts.map((item) => (
                    <div className="" >
                      <div
                        className="cursor-pointer"

                      >
                        <div className="flex flex-col ">
                          <div className="lg:mb-[10px] ">
                            <Image
                              src={item.images[0]}
                              width={200}
                              height={130}
                              alt={item.productTitle}
                              className="w-full h-[150px] lg:h-[230px]"
                            />
                          </div>
                          {
                            selectedSamples && selectedSamples.length < 3 && (
                              <input type="checkbox" className="absolute" checked={selectedSamples.includes(item)} onChange={() => handleChecked(item)} />
                            )
                          }
                          <h2 className="text-[#333333] text-[16px] font-medium hover:underline line-clamp-1">
                            {item.productTitle}
                          </h2>
                        </div>
                      </div>
                    </div>
                  ))
                )
              }
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default RoomPage;
