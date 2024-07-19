"use client";
import React, { useState, useEffect, useRef } from "react";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import "./styles.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setselectedproduct } from "../Features/Slices/compareSlice";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Scrollbar,
  Mousewheel,
  FreeMode,
} from "swiper/modules";
import {
  srtarr,
  typeContent,
  typearr,
  categoryarr,
  wallpaperCollectionArr,
  flooringCollectionArr,
  colorarr,
  Size,
} from "./tabsArray";
import {
  renderSortItem,
  renderColor,
  renderOffer,
  renderDemand,
  renderSubCategory,
} from "./tabsRender";
import TabsProductContent from "../compounds/TabsProductContent";
import Measure from "./meausrement";
import Link from "next/link";
import axios from "axios";
import TabsProductCard from "./TabsProductCard";
import { selecteddbItems } from "../Features/Slices/cartSlice";
import { viewItemList } from "@/tag-manager/events/view_item_list";
const Tabs = ({
  filteredProductData,
  heading,
  allTypes,
  subCategory,
  categoryName,
  description,
  setType,
  offerCategory,
  parentCategory,
  setSelectedOfferCategory,
  onPageChange,
  totalPages,
  currentPage,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const swiper1Ref = useRef(null);
  // const handlenav = (id) => {
  //   router.push(`/room/${id}`);
  // };
  const handlenav = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=${id}`;
    const response = await axios.get(url);
    const data = response.data;
    dispatch({ type: "FETCH_ROOM_REQUEST", payload: id });

    // router.push(`/product`);
  };
  const [filterData, setFilterdata] = useState([]);
  useEffect(() => {
    setFilterdata(filteredProductData);
    if (filteredProductData && filteredProductData.length > 0) {
      const colors = filteredProductData.flatMap((product) => product.colors);
      const uniqueColors = [...new Set(colors)];
      console.log("Unique colors:", uniqueColors);
      setAllColors(uniqueColors);

      const types = filteredProductData
        .map((product) => product.types)
        .filter((type) => type);
      const uniqueTypes = [...new Set(types)];
      setAllProductTypes(uniqueTypes);

      const offers = filteredProductData
        .map((product) => product.offer)
        .filter((offer) => offer);
      const uniqueOffers = [...new Set(offers)];
      console.log("unique colors : ", uniqueOffers);
      setAllOffers(uniqueOffers);

      const demandTypes = filteredProductData
        .map((product) => product.demandtype)
        .filter((demandType) => demandType);
      const uniqueDemandTypes = [...new Set(demandTypes)];
      console.log(uniqueDemandTypes);
      setAllDemandType(uniqueDemandTypes);

      const subcategory = filteredProductData
        .map((product) => product.subcategory)
        .filter((subcategory) => subcategory);
      const uniqueSubcategory = [...new Set(subcategory)];
      console.log(uniqueSubcategory);

      setAllSubcategory(uniqueSubcategory);
    }
  }, [filteredProductData]);

  const [allColors, setAllColors] = useState([]);
  const [allProductTypes, setAllProductTypes] = useState([]);
  // <<<<<<< Updated upstream
  const [allOffers, setAllOffers] = useState([]);
  const [allDemandType, setAllDemandType] = useState([]);
  const [AllsubCategory, setAllSubcategory] = useState([]);

  const [selectedResult, setselectedResult] = useState(0);
  const [clearSelectedResult, setClearSelectedResult] = useState(false);
  const handleColorChange = (color) => {
    console.log("Selected color:", color);
    // Filter products by color
    const filteredProducts = filteredProductData.filter((product) => {
      return product.colors.includes(color);
    });
    setFilterdata(filteredProducts);
    setClearSelectedResult(true);
    setselectedResult(filteredProducts?.length);
  };

  const handleSubCategoryChange = (selectedSubCategory) => {
    console.log("Selected subcategory:", selectedSubCategory);
    // Filter products by color
    const filteredProducts = filteredProductData.filter((product) => {
      return product.subcategory === selectedSubCategory;
    });

    console.log(filteredProducts);
    setFilterdata(filteredProducts);
    setClearSelectedResult(true);
    setselectedResult(filteredProducts?.length);
  };

  // >>>>>>> Stashed changes

  const handleTypeChange = (type) => {
    const filteredProducts = filteredProductData.filter((product) => {
      return product.type === type;
      // <<<<<<< Updated upstream
    });
    setFilterdata(filteredProducts);
  };

  const handleOfferChange = (offer) => {
    const filteredProducts = filteredProductData.filter((product) => {
      return product.offer === offer;
    });
    setFilterdata(filteredProducts);
    setClearSelectedResult(true);
    setselectedResult(filteredProducts?.length);
  };

  const handleDemandTypeChange = (demandType) => {
    console.log(demandType);
    const filteredProducts = filteredProductData.filter((product) => {
      return product.demandtype === demandType;
    });
    setFilterdata(filteredProducts);
    setClearSelectedResult(true);
    setselectedResult(filteredProducts?.length);
  };

  const [activeTab, setActiveTab] = useState("all");

  const [openSort, setOpenSort] = React.useState(false);

  const handleOpen = () => {
    if (
      openSize === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openAll === false &&
      openCaategory === false &&
      openOffer === false
    ) {
      setOpenSort(!openSort);
    }
  };

  useEffect(() => {
    if (filterData && filterData.length > 0) {
      viewItemList({
        items: filterData.map((product) => ({
          item_id: product._id,
          item_name: product.productTitle,
          item_category: product.category,
          price: product.perUnitPrice,
          currency: "INR",
          quantity: 1,
        })),
        itemListId: `category-${categoryName}`,
        itemListName: categoryName,
      });
    }
  }, [filterData]);

  const [openFilter, setOpenFilter] = useState("");

  const handleFilterClick = (Filter) => {};
  const [openAllsort, setopenallsort] = useState(false);
  const handleAllsort = () => {
    setopenallsort(!openAllsort);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [openSize, setOpenSize] = useState(false);
  const handleSize = () => {
    if (
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openAll === false &&
      openCaategory === false &&
      openOffer === false
    ) {
      setOpenSize(!openSize);
    }
  };

  const [openAllSize, setOpenAllSIze] = useState(false);
  const handleAllSize = () => {
    setOpenAllSIze(!openAllSize);
  };

  // collection
  const [openDemandTYpe, setopenDemandTYpe] = useState(false);
  const handleDemandType = () => {
    if (
      openSize === false &&
      openSort === false &&
      opencolor === false &&
      openType === false &&
      openAll === false &&
      openCaategory === false &&
      openOffer === false
    ) {
      setopenDemandTYpe(!openDemandTYpe);
    }
  };

  const [openAllDemandType, setOpenAllDemandType] = useState(false);
  const handleAllDemandType = () => {
    setOpenAllDemandType(!openAllDemandType);
  };

  const [openallOfferType, setopenallOfferType] = useState(false);
  const handleAllOfferType = () => {
    setopenallOfferType(!openallOfferType);
  };

  // ^^^^^^^^^^^^^^^^^^^^^^^^DemandType^^^^^^^^^^^^^^^^^^^^^^^^^^^

  const [openWidth, setOpenWidth] = useState(false);
  const handleWidth = () => {
    setOpenWidth(!openWidth);
  };

  const [openHeight, setOpenHeight] = useState(false);
  const handleHeight = () => {
    setOpenHeight(!openHeight);
  };

  const [opencolor, setOpenColor] = useState(false);
  const handlecolor = () => {
    if (
      openSize === false &&
      openSort === false &&
      openDemandTYpe === false &&
      openType === false &&
      openAll === false &&
      openCaategory === false &&
      openOffer === false
    ) {
      setOpenColor(!opencolor);
    }
  };

  const [openAllcolor, setOpenAllcolor] = useState(false);
  const handleAllcolor = () => {
    setOpenAllcolor(!openAllcolor);
  };

  const [openAllSubCategory, setOpenAllSuvbCategory] = useState(false);

  const handleallSubcategory = () => {
    setOpenAllSuvbCategory(!openAllSubCategory);
  };
  const [openCaategory, setOpenCategory] = useState(false);
  const handleCategory = () => {
    if (
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openAll === false &&
      openSize === false &&
      openOffer === false &&
      opensubcategory === false
    ) {
      setOpenCategory(!openCaategory);
    }
  };
  const [openAllCategory, setOpenAllCategory] = useState(false);
  const handleAllCategory = () => {
    setOpenAllCategory(!openAllCategory);
  };
  const [openAllType, setOpenAllType] = useState(false);
  const handleAllType = () => {
    setOpenAllType(!openAllType);
  };

  const [selectedCircle, setSelectedCircle] = useState([]);
  const handleClick = (idx) => {
    if (selectedCircle.includes(idx)) {
      setSelectedCircle(selectedCircle.filter((item) => item !== idx));
    } else {
      setSelectedCircle([...selectedCircle, idx]);
    }
  };

  const [openType, setOpenType] = useState(false);
  const handleType = () => {
    if (
      openSize === false &&
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openAll === false &&
      openCaategory === false &&
      openOffer === false &&
      opensubcategory === false
    ) {
      setOpenType(!openType);
    }
  };
  const [openContent, setOpenCOntent] = useState(false);
  const handleContent = () => {
    setOpenCOntent(!openContent);
  };

  const [openAll, setOpenAll] = useState(false);
  const handleAll = () => {
    if (
      openSize === false &&
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openCaategory === false &&
      openOffer === false &&
      opensubcategory === false
    ) {
      setOpenAll(true);
    }
  };

  const [openOffer, setOpenOffer] = useState(false);
  const handleOffer = () => {
    if (
      openSize === false &&
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openCaategory === false &&
      openAll === false &&
      opensubcategory === false
    ) {
      setOpenOffer(!openOffer);
    }
  };

  const [opensubcategory, setOpensubcategory] = useState(false);

  const handlesubCategory = () => {
    if (
      openSize === false &&
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openCaategory === false &&
      openAll === false
    ) {
      setOpensubcategory(!opensubcategory);
    }
  };

  const closeAll = () => {
    setOpenAll(false);
    setOpenAllType(false);
    setOpenAllCategory(false);
    setOpenAllcolor(false);
    setOpenAllSIze(false);
    setopenallsort(false);
    setOpenOffer(false);
  };

  const commonClasses =
    "px-[24px] py-3 mr-2.5 rounded-full flex  whitespace-nowrap";

  // logic for stikey
  useEffect(() => {
    const handleScroll = () => {
      const firstDiv = document.querySelector(".bloc-tabs2");
      const thirdDiv = document.querySelector(".main-image-pdt");

      if (firstDiv && thirdDiv) {
        const firstDivHeight = firstDiv.offsetHeight;
        const thirdDivBottom =
          thirdDiv.getBoundingClientRect().bottom + window.scrollY;
        const windowBottom = window.scrollY;

        if (thirdDivBottom <= windowBottom + firstDivHeight) {
          firstDiv.style.position = "relative"; // Stop being sticky
        } else {
          firstDiv.style.position = "sticky"; // Be sticky
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //sorting
  const handleSorting = (selectedOption) => {
    let filterer = [...filterData];
    console.log(selectedOption);

    if (selectedOption.name === "Best match") {
      filterer = [...filterData];
      setFilterdata(filterer);
    } else if (selectedOption.name === "Price: high to low") {
      filterer = filterer.sort((a, b) => a.perUnitPrice - b.perUnitPrice);
      setFilterdata(filterer);
    } else if (selectedOption.name === "Price: low to high") {
      filterer = filterer.sort((a, b) => b.perUnitPrice - a.perUnitPrice);
      setFilterdata(filterer);
    } else if (selectedOption.name === "Newest") {
      filterer = filterer.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFilterdata(filterer);
    } else if (selectedOption.name === "Name") {
      filterer = filterer.sort((a, b) =>
        a.productTitle.localeCompare(b.productTitle)
      );
      setFilterdata(filterer);
    } else {
      setFilterdata(filteredProductData);
    }

    setselectedResult(filterer?.length);

    // console.log(filterer);
  };

  const collectionArr =
    heading === "Wallpaper" ? wallpaperCollectionArr : flooringCollectionArr;
  // const [anyCheckboxSelected, setAnyCheckboxSelected] = useState(false);
  const [selectedpdt, selectedsetpdt] = useState([]);
  const handleCheckbox = (item, isChecked) => {
    if (isChecked) {
      selectedsetpdt([...selectedpdt, item]);
    } else {
      selectedsetpdt(selectedpdt.filter((i) => i._id !== item._id));
      if (selectedpdt.length === 1) {
      }
    }
  };
  const pathname = usePathname();

  const [showCompare, setShowcompare] = useState(false);
  const [activeCompare, setActiveCompare] = useState(true);
  const handleCompareClick = () => {
    // console.log("Selected Products:", selectedpdt);
    dispatch(setselectedproduct(selectedpdt));
    // console.log("length of array", selectedpdt.length);
    if (selectedpdt.length === 3) {
      setShowcompare(true);
      setActiveCompare(false);
      router.push(pathname + "/compare2");
    } else if (selectedpdt.length === 2) {
      setShowcompare(true);
      setActiveCompare(false);
      router.push(pathname + "/compare2");
    } else {
      alert("Please select minimum two items");
    }
  };

  const activebtn =
    selectedpdt.length < 2 ? "bg-gray-300 text-white" : "bg-black text-white";

  const stars = new Array(4)
    .fill("/icons/star-full-black.svg")
    .concat("/icons/star-half-black-half-white.svg");

  // const firstPart = filterData;
  // const firstPart = filterData.slice(0, 8);
  // console.log("firtst is ", firstPart);
  // console.log("gere")

  const swiperOptions2 = {
    slidesPerView: 4.08,
    centeredSlides: false,
    spaceBetween: 5,
    modules: [Pagination, Scrollbar, Mousewheel, FreeMode],
    noSwiping: true,
    allowSlidePrev: true,
    allowSlideNext: true,
  };

  // const [cartData, setCartData] = useState([]);
  const cartData = useSelector(selecteddbItems);

  console.log(cartData);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
  //         {
  //           params: {
  //             deviceId: localStorage.getItem("deviceId"),
  //           },
  //         }
  //       );
  //       if (response.status !== 200) {
  //         throw new Error("HTTP status " + response.status);
  //       }
  //       const data = response.data;
  //       console.log("Fetched cart data:", data);

  //       // Ensure cartData is an array
  //       if (data && Array.isArray(data.items)) {
  //         setCartData(data.items);
  //       } else {
  //         console.error("Cart data items are not an array:", data);
  //         setCartData([]);
  //       }
  //     } catch (error) {
  //       console.log("Error fetching cart data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const isProductInCart = (productId) => {
    return cartData?.items?.some((cartItem) => {
      console.log(
        "Comparing with cart item product ID:",
        cartItem?.productId?._id
      );
      return cartItem?.productId?._id === productId;
    });
  };

  const breakpoints = {
    300: {
      slidesPerView: Math.min(subCategory?.length, 2.5),
      spaceBetween: 10,
    },
    768: {
      slidesPerView: Math.min(subCategory?.length, 3),
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: Math.min(subCategory?.length, 7),
      spaceBetween: 10,
    },
  };

  console.log(filterData);

  // const handleFilterColor = (color) => {
  //   console.log(color);
  //   const newFilteredData = filterData?.filter((data) =>
  //     data.productImages?.some((imageSet) => imageSet.color === color)
  //   );
  //   console.log(newFilteredData);
  //   setFilterdata(newFilteredData)

  // }
  // let originalData = [...filterData];

  const handleFilterColor = (text) => {
    // const checkbox = event.target;
    // const color = checkbox.value;
    // const isChecked = checkbox.checked;

    console.log(text);

    // console.log(`Color: ${color}, Checked: ${isChecked}`);

    const newFilteredData = filterData?.filter((data) =>
      data.productImages?.some((imageSet) => imageSet.color === text)
    );
    console.log(newFilteredData);
    setFilterdata(newFilteredData);
  };

  // const renderColor = (text, idx) => (
  //   <div className="flex justify-between items-center" key={idx}>
  //     <label for="age1" className="">
  //       {text}
  //     </label>
  //     <div className="flex gap-2">
  //       {/* <Image loading="lazy" src={text.image} width={25} height={15} className="rounded-full w-5 h-5" /> */}
  //       <input type="radio" onClick={() => handleColorChange(text)} />
  //     </div>
  //   </div>
  // );
  // const renderDemand = (text, idx) => (
  //   <div className="flex justify-between items-center" key={idx}>
  //     <label for="age1" className="">
  //       {text}
  //     </label>
  //     <div className="flex gap-2">
  //       {/* <Image loading="lazy" src={text.image} width={25} height={15} className="rounded-full w-5 h-5" /> */}
  //       <input type="radio" onClick={() => handleDemandTypeChange(text)} />
  //     </div>
  //   </div>
  // );

  const handleRemoveallFilters = () => {
    setFilterdata(filteredProductData);
    setOpenAll(false);
    setselectedResult(0);
    setClearSelectedResult(false);
  };

  const handleViewResult = () => {
    setOpenAll(false);
    setselectedResult(0);
  };

  const renderPaginationControls = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`bg-gray-200 px-3 py-1 rounded ${
            currentPage === i ? "bg-gray-400" : ""
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  console.log(pathname.split("/")[3]);
  const [filteredSubCategory, setSubCategory] = useState(null);

  console.log(subCategory);

  useEffect(() => {
    if (pathname.split("/")[3] !== "all") {
      const filtered = subCategory?.filter(
        (data) => data.name === pathname.split("/")[3].replace(/-/g, " ")
      );
      setSubCategory(filtered);
      console.log(filteredSubCategory);
    }
  }, [subCategory]);

  return (
    <div className="">
      {openAll && <div className="background-overlay open"></div>}
      <div className="lg:px-[67px] sm:px-[50px] px-[20px]">
        <div className="flex flex-col overflow-hidden">
          <div className="md:mt-36 mt-10" />
          <h1 className="Blinds font-semibold text-2xl pb-[20px] lg:pt-[30px] capitalize">
            {pathname.split("/")[3] === "all" && <p>{heading}</p>}
            {pathname.split("/")[3] !== "all" && (
              <p>{pathname.split("/")[3].replace(/-/g, " ")}</p>
            )}
          </h1>
          <div className="flex items-center">
            {subCategory ? (
              <div className="group flex flex-row items-center justify-start gap-2 mb-4">
                <Swiper
                  ref={swiper1Ref}
                  {...swiperOptions2}
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  navigation={{
                    nextEl: ".right",
                    prevEl: ".back",
                  }}
                  draggable={true}
                  style={{
                    "--swiper-navigation-size": "24px",
                    maxHeight: "120px",
                  }}
                  scrollbar={{
                    hide: false,
                    draggable: true,
                  }}
                  mousewheel={{
                    forceToAxis: true,
                    invert: false,
                  }}
                  freeMode={{
                    enabled: false,
                    sticky: true,
                  }}
                  breakpoints={breakpoints}
                >
                  {pathname.split("/")[3] === "all"
                    ? subCategory?.map((curElement, idx) => {
                        return (
                          <SwiperSlide className="max-w-[130px]" key={idx}>
                            <div
                              className="cursor-pointer"
                              onClick={() => setType(curElement.name)}
                            >
                              <div className="flex flex-col ">
                                <div className="lg:mb-[12px] ">
                                  <Image
                                    src={curElement.img}
                                    width={200}
                                    height={130}
                                    alt={curElement.name}
                                    className="w-[200px] h-[70px]"
                                  />
                                </div>
                                <h2 className="text-[#333333] text-[14px] hover:underline line-clamp-1">
                                  {curElement.name}
                                </h2>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })
                    : filteredSubCategory?.map((curElement, idx) => {
                        return (
                          <div className="max-w-[130px]" key={idx}>
                            <div
                              className="cursor-pointer"
                              onClick={() => setType(curElement.name)}
                            >
                              <div className="flex flex-col ">
                                <div className="lg:mb-[12px] ">
                                  <Image
                                    src={curElement.img}
                                    width={200}
                                    height={130}
                                    alt={curElement.name}
                                    className="w-[200px] h-[70px]"
                                  />
                                </div>
                                <h2 className="text-[#333333] text-[14px] hover:underline line-clamp-1">
                                  {curElement.name}
                                </h2>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </Swiper>
              </div>
            ) : (
              parentCategory &&
              (parentCategory === "offers" && offerCategory ? (
                <div className="mt-4 grid mb-4 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 gap-y-4">
                  {offerCategory.map((category, idx) => (
                    <div key={idx} className=" gap-2">
                      <div className="flex items-center gap-4 cursor-pointer ">
                        <h1
                          className="text-black bg-zinc-200 hover:bg-zinc-100 px-4 py-2"
                          onClick={() => setSelectedOfferCategory(category)}
                        >
                          {category}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                parentCategory === "demandtype" &&
                allTypes && (
                  <div className="mt-2 grid mb-4 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 gap-y-4">
                    {allTypes.map((type, idx) => (
                      <div key={idx} className=" gap-2">
                        <div className="flex items-center gap-4 cursor-pointer ">
                          <h1
                            onClick={() => setType(type)}
                            className="text-black bg-zinc-200 hover:bg-zinc-100 px-4 py-2"
                          >
                            {type}
                          </h1>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ))
            )}
          </div>
        </div>
        <p className="leading-2 mb-4 text-[14px] pt-[5px] text-[#484848] lg:w-[70%] line-clamp-2">
          {description}
        </p>
        {/* <<<<<<< Updated upstream */}
        {/* <div className="flex sticky top-0 z-20 bg-white py-5  scrollbar"> */}
        {/* ======= */}
        <div className="flex sticky top-0 z-[9996] bg-white py-5 overflow-x-auto md:overflow-x-visible mb-[20px] md:mb-0">
          {/* <TabsProductContent
            filterName={"Sort"}
            isFilterOpen={openSort}
            handleFilter={handleOpen}
            filterArr={srtarr}
            renderFilter={(text, idx) =>
              renderSortItem(text, idx, handleSorting)
            }

          />
          <TabsProductContent
            filterName={"Colors"}
            isFilterOpen={opencolor}
            handleFilter={handlecolor}
          />
          <TabsProductContent
            filterName={"Type"}
            isFilterOpen={openType}
            handleFilter={handleType}
          /> */}

          {/* >>>>>>> Stashed changes */}
          {filteredProductData?.length > 0 && (
            <TabsProductContent
              filterName={"Sort"}
              commonClasses={commonClasses}
              isFilterOpen={openSort}
              handleAll={handleAll}
              handleTabClick={handleTabClick}
              handleFilter={handleOpen}
              handleAllFilter={handleAllsort}
              filterArr={srtarr}
              renderFilter={(text, idx) =>
                renderSortItem(text, idx, handleSorting)
              }
            />
          )}

          {/* <<<<<<< Updated upstream */}
          {/* Size - dropdown2 */}
          {/* ======= */}

          {/* >>>>>>> Stashed changes */}
          {/* <div className="">
            <TabsProductContent
              filterName={"Size"}
              commonClasses={commonClasses}
              isFilterOpen={openSize}
              handleAll={handleAll}
              handleTabClick={handleTabClick}
              handleFilter={handleSize}
              handleAllFilter={handleAllSize}
              filterArr={Size}
              renderFilter={rendersizewidth}
            />
          </div> */}

          {/* <<<<<<< Updated upstream */}
          {/* Design style - dropdown4 */}
          {/* {pathname.includes("Wallpaper") ? (
=======
          {pathname.includes("Wallpaper") ? (
>>>>>>> Stashed changes
            <TabsProductContent
              filterName={"Design style"}
              commonClasses={commonClasses}
              isFilterOpen={openCaategory}
              handleAll={handleAll}
              handleTabClick={handleTabClick}
              handleFilter={handleCategory}
              handleAllFilter={handleAllCategory}
              filterArr={categoryarr}
              renderFilter={rendercategory}
            />
          ) : null} */}

          {/* Color dropdown */}
          {filteredProductData &&
            filteredProductData?.length > 0 &&
            AllsubCategory &&
            AllsubCategory.length > 0 && (
              <TabsProductContent
                filterName={"Sub Category"}
                commonClasses={commonClasses}
                isFilterOpen={opensubcategory}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handlesubCategory}
                handleAllFilter={handleallSubcategory}
                filterArr={AllsubCategory}
                renderFilter={(text, idx) =>
                  renderSubCategory(text, idx, handleSubCategoryChange)
                }
              />
            )}
          {/* <<<<<<< Updated upstream */}
          {filteredProductData &&
            filteredProductData?.length > 0 &&
            allColors &&
            allColors.length > 0 && (
              <TabsProductContent
                filterName={"Colors"}
                commonClasses={commonClasses}
                isFilterOpen={opencolor}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handlecolor}
                handleAllFilter={handleAllcolor}
                filterArr={allColors}
                renderFilter={(text, idx) =>
                  renderColor(text, idx, handleColorChange)
                }
              />
            )}

          {filteredProductData &&
            filteredProductData.length > 0 &&
            allOffers &&
            allOffers.length > 0 && (
              <TabsProductContent
                filterName={"Offers"}
                commonClasses={commonClasses}
                isFilterOpen={openOffer}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handleOffer}
                handleAllFilter={handleAllOfferType}
                filterArr={allOffers}
                renderFilter={(text, idx) =>
                  renderOffer(text, idx, handleOfferChange)
                }
                openContent={openContent}
                handleContent={handleContent}
              />
            )}

          {/* {allStyles.length > 0 ? (
            <TabsProductContent
              filterName={"Styles"}
              commonClasses={commonClasses}
              isFilterOpen={openCaategory}
              handleAll={handleAll}
              handleTabClick={handleTabClick}
              handleFilter={handleCategory}
              handleAllFilter={handleAllCategory}
              filterArr={allStyles}
              renderFilter={rendercategory}
            />
          ) : null} */}

          {/* {allDimensions.length > 0 ? (
            <TabsProductContent
              filterName={"Dimensions"}
              commonClasses={commonClasses}
              isFilterOpen={openWidth}
              handleAll={handleAll}
              handleTabClick={handleTabClick}
              handleFilter={handleWidth}
              handleAllFilter={handleHeight}
              filterArr={allDimensions}
              renderFilter={rendersizewidth}
            />
          ) : null} */}

          {/* Collections - filter */}
          {filteredProductData &&
            filteredProductData?.length > 0 &&
            allDemandType &&
            allDemandType.length > 0 && (
              <TabsProductContent
                filterName={"New"}
                commonClasses={commonClasses}
                isFilterOpen={openDemandTYpe}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handleDemandType}
                handleAllFilter={handleAllDemandType}
                filterArr={allDemandType}
                renderFilter={(text, idx) =>
                  renderDemand(text, idx, handleDemandTypeChange)
                }
              />
            )}

          {filteredProductData?.length > 0 && (
            <button
              onClick={handleRemoveallFilters}
              className="bg-gray-100 px-[24px] text-[14px] font-medium mr-[10px] py-3 rounded-full min-w-fit"
            >
              Remove all filters
            </button>
          )}

          {/* Type - dropdown5 */}
          {/* <<<<<<< Updated upstream
          {
======= */}
          {/* {
>>>>>>> Stashed changes
            allTypes.length > 0 && (
              <TabsProductContent
                filterName={"Type"}
                commonClasses={commonClasses}
                isFilterOpen={openType}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handleType}
                handleAllFilter={handleAllType}
                filterArr={allTypes}
                renderFilter={renderType}
                openContent={openContent}
                handleContent={handleContent}
                typeContent={typeContent}
                renderTypeContent={(text, idx) => renderOfferItem(text, idx, setType)}
              />
            )
          } */}

          {/* <TabsProductContent
            filterName={"Colors"}
            commonClasses={commonClasses}
            isFilterOpen={opencolor}
            handleAll={handleAll}
            handleTabClick={handleTabClick}
            handleFilter={handlecolor}
            handleAllFilter={handleAllcolor}
            filterArr={allColors}
            renderFilter={renderColor}
          /> */}

          {/* <TabsProductContent
            filterName={"Collections"}
            commonClasses={commonClasses}
            isFilterOpen={openCollection}
            handleAll={handleAll}
            handleTabClick={handleTabClick}
            handleFilter={handleCollection}
            handleAllFilter={handleAllCollection}
            filterArr={collectionArr}
            renderFilter={renderCollection}
          /> */}

          {/* <TabsProductContent
            filterName={"Type"}
            commonClasses={commonClasses}
            isFilterOpen={openType}
            handleFilter={handleType}
            handleAll={handleAll}
            handleTabClick={handleTabClick}
            handleAllFilter={handleAllType}
            filterArr={typearr}
            renderFilter={renderType}
            openContent={openContent}
            handleContent={handleContent}
            typeContent={typeContent}
            renderTypeContent={renderTypeContent}
          /> */}
          {/* >>>>>>> Stashed changes */}

          {filteredProductData && filteredProductData?.length > 0 && (
            <div>
              <button
                onClick={() => {
                  handleAll();
                  handleTabClick();
                }}
                className={`Tabbtn z-0 bg-gray-100
                  ${
                    openAll
                      ? `active-tabs  border border-black px-[24px] text-[14px] font-medium ${commonClasses}`
                      : `tabS  border border-white px-[24px] ${commonClasses} text-[14px] font-medium`
                  }
                  ${
                    typeof window !== "undefined" && window.innerWidth <= 450
                      ? " justify-center px-[24px] text-[14px] font-medium"
                      : " justify-between px-[24px] text-[14px] font-medium"
                  }
                  `}
              >
                All Filters &nbsp;
                <Image
                  loading="lazy"
                  src="/icons/choserightfloor.svg"
                  width={40}
                  height={40}
                  className={`w-4 h-4 mt-1  sm:block hidden


                `}
                  alt=""
                />
              </button>
            </div>
          )}
        </div>
        <div>
          {openAll ? (
            <div className="menu-overlay z-[9999]  bg-white  border-2 fixed  sm:w-[30vw] w-[100vw] sm:h-[100vh] h-[80vh]  right-0  bottom-0 ">
              <div className="flex border-b py-4 mb-10 w-full items-center justify-center">
                <p className="text-center text-[16px] text-[#111111] font-semibold">
                  Filter and sort
                </p>

                <Image
                  loading="lazy"
                  className="absolute right-3 px-[2px]"
                  src="icons/cancel.svg"
                  width={20}
                  height={20}
                  onClick={closeAll}
                  color="black"
                  alt="close icon"
                />
              </div>
              <div className="menu-option bg-white  overflow-y-scroll mb-[20rem]  min-h-fit max-h-[50vh] md:max-h-[70vh]  pt-5  w-[100%]  border-slate-600 z-50">
                <div className="flex flex-col gap-6 px-4">
                  <div className="flex flex-col gap-7">
                    <div
                      onClick={handleAllsort}
                      className="flex justify-between text-left text-[14px] font-semibold "
                    >
                      Sort &nbsp;
                      <Image
                        loading="lazy"
                        src="/icons/backarrow.svg"
                        width={40}
                        height={40}
                        className={`w-5 h-5  mt-1
                ${openAllsort ? " rotate-90" : "-rotate-90"}

                `}
                        alt="arrow icon"
                      />
                    </div>
                    {openAllsort ? (
                      <div className="flex flex-col gap-7">
                        {srtarr.map((text, idx) =>
                          renderSortItem(text, idx, handleSorting)
                        )}
                      </div>
                    ) : null}
                  </div>
                  <hr />

                  {/* <div className="flex flex-col gap-7">
                      <div
                        onClick={handleAllSize}
                        className="flex justify-between text-left"
                      >
                        Size &nbsp;
                        <Image loading="lazy"
                          src="/icons/backarrow.svg"
                          width={40}
                          height={40}
                          className={`w-6 h-6  mt-1
                ${openAllSize ? " rotate-90" : "-rotate-90"}

                `}
                          alt=""
                        />
                      </div>
                      {openAllSize ? (
                        <div className="flex flex-col gap-7">

                          {Size.map(rendersizewidth)}

                        </div>
                      ) : null}
                    </div>
                    <hr /> */}

                  {pathname.includes("Wallpaper") ? (
                    <>
                      <div className="flex flex-col gap-7">
                        <div
                          onClick={handleAllCategory}
                          className="flex justify-between text-left"
                        >
                          Design style &nbsp;
                          <Image
                            loading="lazy"
                            src="/icons/backarrow.svg"
                            width={40}
                            height={40}
                            className={`w-6 h-6  mt-1
                ${openAllCategory ? " rotate-90" : "-rotate-90"}

                `}
                            alt="arrow icon"
                          />
                        </div>
                        {openAllCategory ? (
                          <div className="flex flex-col gap-7">
                            {categoryarr.map(rendercategory)}
                          </div>
                        ) : null}
                      </div>
                      <hr />
                    </>
                  ) : null}

                  <div className="flex flex-col gap-7">
                    <div
                      onClick={handleAllcolor}
                      className="flex justify-between text-left text-[14px] font-semibold "
                    >
                      Color &nbsp;
                      <Image
                        loading="lazy"
                        src="/icons/backarrow.svg"
                        width={40}
                        height={40}
                        className={`w-5 h-5  mt-1
                ${openAllcolor ? " rotate-90" : "-rotate-90"}

                `}
                        alt="arrow icon"
                      />
                    </div>
                    {openAllcolor ? (
                      <div className="flex flex-col gap-7">
                        {allColors.map((text, idx) =>
                          renderColor(text, idx, handleColorChange)
                        )}
                      </div>
                    ) : null}
                  </div>
                  <hr />

                  {heading === "Wallpaper" ? (
                    <>
                      <div className="flex flex-col gap-7">
                        <div
                          onClick={handleAllCategory}
                          className="flex justify-between text-left text-[14px] font-semibold "
                        >
                          Design style &nbsp;
                          <Image
                            loading="lazy"
                            src="/icons/backarrow.svg"
                            width={40}
                            height={40}
                            className={`w-5 h-5  mt-1
                ${openAllCategory ? " rotate-90" : "-rotate-90"}

                `}
                            alt="arrow icon"
                          />
                        </div>
                        {openAllCategory ? (
                          <div className="flex flex-col gap-7">
                            {categoryarr.map(rendercategory)}
                          </div>
                        ) : null}
                      </div>
                      <hr />
                    </>
                  ) : null}

                  <div className="flex flex-col gap-7">
                    <div
                      onClick={handleAllDemandType}
                      className="flex justify-between text-left text-[14px] font-semibold "
                    >
                      Latest &nbsp;
                      <Image
                        loading="lazy"
                        src="/icons/backarrow.svg"
                        width={40}
                        height={40}
                        className={`w-5 h-5  mt-1
                ${openAllDemandType ? " rotate-90" : "-rotate-90"}

                `}
                        alt="arrow icon"
                      />
                    </div>
                    {openAllDemandType ? (
                      <div className="flex flex-col gap-7">
                        {allDemandType.map((text, idx) =>
                          renderDemand(text, idx, handleDemandTypeChange)
                        )}
                      </div>
                    ) : null}
                  </div>
                  <hr />
                  <div className="flex flex-col gap-7">
                    <div
                      onClick={handleAllOfferType}
                      className="flex justify-between text-left text-[14px] font-semibold "
                    >
                      Offer &nbsp;
                      <Image
                        loading="lazy"
                        src="/icons/backarrow.svg"
                        width={40}
                        height={40}
                        className={`w-5 h-5  mt-1
                ${openallOfferType ? " rotate-90" : "-rotate-90"}

                `}
                        alt="arrow icon"
                      />
                    </div>
                    {openallOfferType ? (
                      <div className="flex flex-col gap-7">
                        {allOffers.map((text, idx) =>
                          renderOffer(text, idx, handleOfferChange)
                        )}
                      </div>
                    ) : null}
                  </div>
                  <hr />

                  {/* <div className="flex flex-col gap-7">
                      <div
                        onClick={handleAllType}
                        className="flex justify-between text-left text-[14px] font-semibold"
                      >
                        Type &nbsp;
                        <Image loading="lazy"
                          src="/icons/backarrow.svg"
                          width={40}
                          height={40}
                          className={`w-5 h-5  mt-1
                ${openAllType ? " rotate-90" : "-rotate-90"}

                `}
                          alt=""
                        />
                      </div>
                      {openAllType ? (
                        <div className="flex flex-col gap-7">
                          {typearr.map(renderType)}

                          <button
                            className={`text-left underline
                  ${openContent ? "hidden" : "block"}
                  `}
                            onClick={handleContent}
                          >
                            +7 more
                          </button>
                          {openContent
                            ? typeContent.map(renderTypeContent)
                            : null}

                          <button
                            onClick={handleContent}
                            className={`text-left underline ${openContent ? "block" : "hidden"
                              }`}
                          >
                            Less
                          </button>
                        </div>
                      ) : null}
                    </div> */}
                  {/* <hr /> */}
                </div>
              </div>
              <div className="flex bg-white z-50 flex-col absolute bottom-0 left-0 right-0 items-center justify-center gap-3 pt-3 px-4 pb-2">
                <button
                  onClick={handleViewResult}
                  className="bg-black text-white w-full h-9 text-[14px] font-semibold rounded-full "
                >
                  View {selectedResult}
                </button>
                <button
                  onClick={handleRemoveallFilters}
                  className={` ${
                    clearSelectedResult
                      ? "bg-white border-[1.5px] border-black"
                      : "bg-[#929292] opacity-50"
                  } text-[14px] font-semibold text-black  w-full h-9 rounded-full`}
                >
                  Clear all
                </button>
              </div>
            </div>
          ) : null}
        </div>
        {/* iimages */}
        <div div className="flex flex-col image-product">
          <div className="text-right">
            {showCompare && (
              <button
                onClick={handleCompareClick}
                disabled={selectedpdt.length < 2}
                className={`bg-black text-white px-3 py-2 whitespace-nowrap rounded-full ${activebtn} `}
              >
                Compare Products
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-4 grid-cols-2 cursor-pointer gap-4 py-3">
            {filterData && filterData.length > 0 ? (
              filterData.map((text, idx) => {
                const inCart = isProductInCart(text?._id);
                return (
                  <TabsProductCard
                    id={text._id}
                    text={text}
                    totalPrice={text.totalPrice}
                    discountedprice={text.discountedprice}
                    specialprice={text.specialprice}
                    productDescription={text.productDescription}
                    productTitle={text.productTitle}
                    images={text.images}
                    idx={idx}
                    handlenav={handlenav}
                    selectedpdt={selectedpdt}
                    handleCheckbox={handleCheckbox}
                    setShowcompare={setShowcompare}
                    demandtype={text.demandtype}
                    ratings={text.ratings}
                    stars={stars}
                    parentCategory={parentCategory}
                    offer={text.offer}
                    inCart={inCart}
                    shortDescription={text.shortDescription}
                    perUnitPrice={text.perUnitPrice}
                    productType={text.productType}
                    expectedDelivery={text.expectedDelivery}
                  />
                );
              })
            ) : (
              <div className="flex justify-center items-center h-[50vh] w-full">
                <h1 className="text-2xl">No Products Found</h1>
              </div>
            )}
          </div>

          {filteredProductData?.length > 0 && (
            <Measure category={filteredProductData[0].category} />
          )}

          <div className="self-center flex items-center  gap-2 mt-20">
            {renderPaginationControls()}
          </div>
          {/* <div className="main-image-pdt pt-[32px] grid sm:grid-cols-4 grid-cols-2 sm:gap-6 gap-0">
            {filteredProductData?.map((text, idx) => (
              <div
                className="flex flex-col gap-3 p-3 border-b border-r hover-divnine sm:border-none"
                key={idx}
                onClick={() => handlenav(text._id)}
              >
                <div className=" relative w-[250px] h-[250px]">
                  <div
                    onClick={(event) => event.stopPropagation()}
                    className={`flex justify-between text-black gap-4  checkbox-div absolute top-0 left-0 z-10 ${selectedpdt.includes(text) ? "visible" : ""
                      }`}
                  >
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        handleCheckbox(text, e.target.checked);
                        setShowcompare(true);
                      }}
                      checked={selectedpdt.includes(text)}
                    />
                  </div>
                  <Image loading="lazy"
                    src={text.images[0]}
                    alt=""
                    className="absolute "
                    layout="fill"
                  />
                </div>

                <p className="text-sm font-semibold">{text.productTitle}</p>
                <p className="text-sm">{text.productDescription}</p>
                <p className="flex items-center justify-center h-10 text-sm font-semibold bg-yellow-400 price-box w-28">
                  Rs.{" "}
                  <span className="sm:text-3xl text-xl">
                    {" "}
                    {text.totalPrice}
                  </span>
                </p>
                <p className="flex flex-row items-center gap-1 text-sm text-black">
                  {stars.map((star, index) => (
                    <Image loading="lazy"
                      key={index}
                      src={star}
                      alt="star"
                      width={15}
                      height={15}
                    />
                  ))}
                </p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
