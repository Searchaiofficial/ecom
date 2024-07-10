"use client";

import { useEffect, useState } from "react";
import "./styles.css"
import { useRouter } from "next/navigation";

const { default: axios } = require("axios");
const { default: Image } = require("next/image");
const { default: Link } = require("next/link");
const { useDispatch } = require("react-redux");
const { setDbItems } = require("../Features/Slices/cartSlice");

const RoomToolbar = ({ data }) => {
  const dispatch = useDispatch();
  const [openFreeSAmple, setOpenFreeSample] = useState(false)
  const router = useRouter()
  // const [openFreeSAmple, setOpenFreeSample] = useState(false)
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false)
  const [ColorfilterOpen, setColorFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedColor, setSelectedColor] = useState("All Colors")
  const [allColors, setAllColors] = useState([])

  const commonClasses =
    "px-[24px] py-3 mr-2.5 rounded-full flex  whitespace-nowrap";

  const handleJoinLive = () => {
    // Store category data in local storage
    localStorage.setItem("selectedCategory", category);
  };

  const [allProducts, setAllProducts] = useState([])
  const [allCategories, setAllCategories] = useState([])

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?limit=1000`);
      console.log("AllProducts :", response.data);
      setAllProducts(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`);
      console.log("AllCategories :", response.data);
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


  console.log(data)
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



  const handleFreeSampling = () => {
    console.log("Free Sampling")
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
      console.log("Free Sampling:", response.data);
      if (response.status === 200) {
        dispatch(setDbItems(response.data));
        router.push("/checkout");
      }
    } catch (error) {
      console.log("Free Sampling error", error);
    }
  };


  const fetchProductsbyCategory = async (category) => {
    console.log(category)
    try {
      if (category === "All Categories") {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?limit=1000`);
        console.log("AllProducts :", response.data);
        const excludeAccessories = response.data?.filter(item => item?.subcategory !== "Accessories")
        setFilteredProducts(excludeAccessories)
      } else {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchProductsByCategory/${category}`);
        console.log("AllCategories :", response.data);
        const excludeAccessories = response.data?.filter(item => item?.subcategory !== "Accessories")
        setFilteredProducts(excludeAccessories)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryFilter = (item) => {
    setSelectedCategory(item)
    console.log(item)
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

  const handleCategoryFilterOpen = () => {
    if (ColorfilterOpen === false) {
      setCategoryFilterOpen(!categoryFilterOpen)
    }
  }
  const handleColorFilterOpen = () => {
    if (categoryFilterOpen === false) {
      setColorFilterOpen(!ColorfilterOpen)
    }
  }



  return (
    <div className="flex items-center space-x-2 mt-4">
      {openFreeSAmple && <div className="background-overlay open"></div>}
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
          pathname: "/liveroom",
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
      {openFreeSAmple && (
        <div className={`fixed px-[24px] lg:px-[32px] gap-10 flex top-0 z-[9999] overflow-y-auto md:overflow-hidden right-0 w-[100%] lg:w-[70%] h-full bg-white shadow-lg transition-transform transform ${openFreeSAmple ? "translate-x-0" : "translate-x-full"}`}>
          <div className="w-[33.33%] mt-7 hidden md:flex flex-col gap-5 over">
            <div className="flex items-center gap-4">
              {
                selectedSamples && selectedSamples.length > 0 && (
                  selectedSamples.map((item) => (
                    <div key={item.id} className="max-w-[100px]">
                      <div className="cursor-pointer">
                        <div className="flex flex-col relative">
                          <div className="lg:mb-[10px] relative">
                            <Image
                              src={item.images[0]}
                              width={200}
                              height={130}
                              alt={item.productTitle}
                              className="w-[200px] h-[70px]"
                            />
                            <div
                              onClick={() => removeItem(item)}
                              className="absolute top-0 right-0 h-[20px] w-[20px] flex items-center justify-center rounded-full bg-white cursor-pointer"
                            >
                              <Image
                                loading="lazy"
                                src="/icons/closeicon.svg"
                                alt="close"
                                width={15}
                                height={15}
                                className="py-1"
                              />
                            </div>
                          </div>
                          <h2 className="text-[#333333] text-[14px] hover:underline line-clamp-1">
                            {item.productTitle}
                          </h2>
                        </div>
                      </div>
                    </div>
                  ))
                )
              }
            </div>

            <div className="flex  justify-between my-2">

              {
                selectedSamples && selectedSamples?.length > 0 && (
                  <div className=" w-full">
                    <button
                      onClick={handleBuySamples}
                      className={`bg-black w-full hover:bg-gray-900 text-white px-4 flex items-center justify-center sm:h-11 h-9 rounded-full transition duration-300`}
                    >
                      <p className="flex gap-2 text-center font-semibold text-[16px]">
                        Buy Free Samples
                      </p>
                    </button>
                  </div>
                )
              }

            </div>
            <div className=" flex flex-col">
              <Image src={selectedSamples[selectedSamples.length - 1]?.images[0] || data.images[0]} height={250} width={300} className="w-full h-[300px]" />
              <div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    {selectedSamples[selectedSamples.length - 1]?.productType === "special" || data.productType === "special" && (
                      <p className="font-medium text-[#0152be] mb-1 text-[12px]">
                        Ayatrio Member Favorite
                      </p>
                    )}
                    <h3 className="text-[15px] font-semibold">{selectedSamples[selectedSamples.length - 1]?.productTitle || data.productTitle}</h3>
                  </div>
                </div>
                <p className="font-normal mb-1 text-[14px] py-[2px]">
                  {selectedSamples[selectedSamples.length - 1]?.shortDescription || data.shortDescription}
                </p>
                <div className="flex gap-1 items-end">
                  <p
                    className={`text-3xl flex font-semibold leading-[0.5] tracking-wide ${selectedSamples[selectedSamples.length - 1]?.specialPrice?.price || data.specialPrice?.price
                      ? "bg-[#FFD209] px-2 pt-3 pb-1 w-fit shadow-lg"
                      : ""
                      }`}
                    style={
                      selectedSamples[selectedSamples.length - 1]?.specialPrice?.price || data.specialPrice?.price
                        ? { boxShadow: "3px 3px #C31952" }
                        : {}
                    }
                  >
                    <span
                      className={`text-sm ${selectedSamples[selectedSamples.length - 1]?.specialPrice?.price || data.specialPrice?.price ? "" : "pt-3.5"
                        }`}
                    >
                      Rs. &nbsp;
                    </span>{" "}
                    {selectedSamples[selectedSamples.length - 1]?.specialPrice?.price || data.specialPrice?.price ? (
                      selectedSamples[selectedSamples.length - 1]?.specialPrice?.price || data.specialPrice?.price
                    ) : (
                      <p className="pt-3">{selectedSamples[selectedSamples.length - 1]?.perUnitPrice || data.perUnitPrice}</p>
                    )}
                  </p>
                  {selectedSamples[selectedSamples.length - 1]?.unitType || data.unitType ? (
                    <span className="tracking-wide text-sm font-semibold">{`/${selectedSamples[selectedSamples.length - 1]?.unitType || data.unitType}`}</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[66.66%] w-[100%] lg:overflow-y-auto" >
            <div className="flex flex-col md:fixed top-0 bg-white w-full z-50 ">
              <div className="flex items-center  mt-5 justify-between lg:mr-[430px]">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-[16px] font-semibold">Free sample products</h1>
                    <p className="text-[12px] text-gray-600 hidden lg:flex font-medium">You can select a maximum of three samples at a time</p>
                  </div>

                </div>
                <button className="text-xl px-3 py-1 hover:bg-[#e5e5e5] rounded-full cursor-pointer" onClick={handleClose} >
                  <Image
                    loading="lazy"
                    src="/icons/closeicon.svg"
                    alt="close"
                    width={15}
                    height={15}
                    className="py-2"
                  />
                </button>
              </div>

              <div className="flex md:hidden items-center my-2 gap-4">
                {
                  selectedSamples && selectedSamples.length > 0 && (
                    selectedSamples.map((item) => (
                      <div key={item.id} className="max-w-[100px]">
                        <div className="cursor-pointer">
                          <div className="flex flex-col relative">
                            <div className="lg:mb-[10px] relative">
                              <Image
                                src={item.images[0]}
                                width={200}
                                height={130}
                                alt={item.productTitle}
                                className="w-[200px] h-[70px]"
                              />
                              <div
                                onClick={() => removeItem(item)}
                                className="absolute top-0 right-0 h-[20px] w-[20px] flex items-center justify-center rounded-full bg-white cursor-pointer"
                              >
                                <p className="text-sm">X</p>
                              </div>
                            </div>
                            <h2 className="text-[#333333] text-[14px] hover:underline line-clamp-1">
                              {item.productTitle}
                            </h2>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                }
              </div>

              <div className="flex md:hidden justify-between my-2 ">

                {
                  selectedSamples && selectedSamples?.length > 0 && (
                    <div className=" w-full">
                      <button
                        onClick={handleBuySamples}
                        className={`bg-black w-full hover:bg-gray-900 text-white px-4 flex items-center justify-center sm:h-11 h-9 rounded-full transition duration-300`}
                      >
                        <p className="flex gap-2 text-center font-semibold text-[16px]">
                          Buy Free Samples
                        </p>
                      </button>
                    </div>
                  )
                }

              </div>



              <div className="flex overflow-x-scroll lg:overflow-x-hidden items-center lg:gap-2 gap-2 my-3">
                <div onClick={handleCategoryFilterOpen} className={`${commonClasses} text-[14px] flex items-center gap-2 font-semibold rounded-full bg-gray-100`}>
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
                      <div className={`md:w-[300px] w-[150px] cursor-pointer absolute ${selectedSamples.length > 0 ? "top-[270px] md:top-[125px]" : "top-[150px] md:top-[125px]"}  z-50 h-fit bg-white border border-gray-200 rounded-lg`}>
                        <p onClick={() => handleCategoryFilter("All Categories")} className="flex text-[14px] font-semibold px-4 py-2">All Categories</p>
                        {
                          allCategories.map((item) => {
                            console.log(item)
                            return (
                              <p onClick={() => handleCategoryFilter(item.name)} className="flex cursor-pointer text-[14px] font-semibold px-4 py-2">{item.name}</p>
                            )
                          })
                        }
                      </div>
                    )
                  }

                </div>
                <div onClick={handleColorFilterOpen} className={`${commonClasses} text-[14px] flex items-center gap-2 font-semibold rounded-full bg-gray-100`}>
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
                      <div className={`md:w-[300px] w-[150px] cursor-pointer absolute ${selectedSamples.length > 0 ? "top-[270px] md:top-[125px]" : "top-[150px] md:top-[125px]"}  z-50 h-fit bg-white border border-gray-200 rounded-lg`}>
                        <p onClick={() => handleColorFilter("All Colors")} className="flex text-[14px] font-semibold px-4 py-2">All Colors</p>
                        {
                          allColors.map((item) => {
                            console.log(item)
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
            </div>

            <div className="grid lg:grid-cols-3 md:mt-36 grid-cols-2 gap-y-4 gap-4 ">
              {
                FilteredProducts && FilteredProducts.length > 0 && (
                  FilteredProducts.map((item) => (
                    <div key={item.id} className="">
                      <div className="cursor-pointer">
                        <div className="flex flex-col">
                          <div className="lg:mb-[10px] relative">
                            <Image
                              src={item.images[0]}
                              width={200}
                              height={130}
                              alt={item.productTitle}
                              className="w-full h-[150px] lg:h-[180px]"
                            />
                            {
                              selectedSamples && selectedSamples.length < 3 && (
                                <input
                                  type="checkbox"
                                  className="absolute top-0 right-0"
                                  checked={selectedSamples.includes(item)}
                                  onChange={() => handleChecked(item)}
                                />
                              )
                            }
                          </div>
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
    </div>
  );
};

export default RoomToolbar;
