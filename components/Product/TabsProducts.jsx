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
  renderPrice,
} from "./tabsRender";
import TabsProductContent from "../compounds/TabsProductContent";
import Measure from "./meausrement";
import Link from "next/link";
import axios from "axios";
import TabsProductCard from "./TabsProductCard";
import CategoryGrid from "./CategoryGrid";
import { selecteddbItems } from "../Features/Slices/cartSlice";
import { viewItemList } from "@/tag-manager/events/view_item_list";
import { register } from "swiper/element";
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
  firstGrid,
  secondGrid,
  type,
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
  const allPrices = [
    { name: "Less than 1000", value: 1000 },
    { name: "Less than 5000", value: 5000 },
    { name: "Less than 10000", value: 10000 },
    { name: "Less than 20000", value: 20000 },
    { name: "Less than 50000", value: 50000 },
    { name: "Less than 100000", value: 100000 },
    { name: "Less than 100000", value: 100000 },
  ];

  const [selectedResult, setselectedResult] = useState(0);
  const [clearSelectedResult, setClearSelectedResult] = useState(false);
  const handleColorChange = (color) => {
    console.log("Selected color:", color);
    // Filter products by color
    // const filteredProducts = filteredProductData.filter((product) => {
    //   return product.colors.includes(color);
    // });

    let filteredProducts = [];
    if (color === "all") {
      filteredProducts = filteredProductData;
    } else {
      filteredProducts = filteredProductData.filter((product) => {
        return product.colors.includes(color);
      });
    }
    setFilterdata(filteredProducts);
    setClearSelectedResult(true);
    setselectedResult(filteredProducts?.length);
  };

  const handleSubCategoryChange = (selectedSubCategory) => {
    console.log("Selected subcategory:", selectedSubCategory);
    let filteredProducts = [];
    if (selectedSubCategory === "all") {
      filteredProducts = filteredProductData;
    } else {
      filteredProducts = filteredProductData.filter((product) => {
        return product.subcategory === selectedSubCategory;
      });
    }
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
    let filteredProducts = [];
    if (offer === "all") {
      filteredProducts = filteredProductData;
    } else {
      filteredProducts = filteredProductData.filter((product) => {
        return product.offer === offer;
      });
    }
    setFilterdata(filteredProducts);
    setClearSelectedResult(true);
    setselectedResult(filteredProducts?.length);
  };

  const handleDemandTypeChange = (demandType) => {
    console.log(demandType);
    // const filteredProducts = filteredProductData.filter((product) => {
    //   return product.demandtype === demandType;
    // });
    let filteredProducts = [];
    if (demandType === "all") {
      filteredProducts = filteredProductData;
    } else {
      filteredProducts = filteredProductData.filter((product) => {
        return product.demandtype === demandType;
      });
    }
    setFilterdata(filteredProducts);
    setClearSelectedResult(true);
    setselectedResult(filteredProducts?.length);
  };

  const handlePriceChange = (price) => {
    console.log(price);
    let filteredProducts = [];
    if (price === "all") {
      filteredProducts = filteredProductData;
    } else {
      filteredProducts = filteredProductData.filter((product) => {
        return (
          (product.specialprice.price ||
            product.discountedprice.price ||
            product.perUnitPrice) <= price
        );
      });
    }
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
      openOffer === false &&
      openPrice === false
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
        itemListId: `category-${parentCategory}`,
        itemListName: parentCategory,
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
      openOffer === false &&
      openPrice === false
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
      openOffer === false &&
      openPrice === false
    ) {
      setopenDemandTYpe(!openDemandTYpe);
    }
  };

  const [openPrice, setOpenPrice] = useState(false);
  const handlePrice = () => {
    if (
      openSize === false &&
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openAll === false &&
      openOffer === false
    ) {
      setOpenPrice(!openPrice);
    }
  };

  const [openAllDemandType, setOpenAllDemandType] = useState(false);
  const handleAllDemandType = () => {
    setOpenAllDemandType(!openAllDemandType);
  };

  const [openAllPrice, setOpenAllPrice] = useState(false);
  const handleAllPrice = () => {
    setOpenAllPrice(!openAllPrice);
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
      openOffer === false &&
      openPrice === false
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
      opensubcategory === false &&
      openPrice === false
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
      opensubcategory === false &&
      openPrice === false
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
      opensubcategory === false &&
      openPrice === false
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
      opensubcategory === false &&
      openPrice === false
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
      openAll === false &&
      openOffer === false &&
      openPrice === false
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

  const swiperOptions2 = {
    modules: [Pagination, Scrollbar, Mousewheel, FreeMode],
  };

  // const [cartData, setCartData] = useState([]);
  const cartData = useSelector(selecteddbItems);

  console.log(cartData);

  const isProductInCart = (productId) => {
    return cartData?.items?.some((cartItem) => {
      console.log(
        "Comparing with cart item product ID:",
        cartItem?.productId?._id
      );
      return cartItem?.productId?._id === productId;
    });
  };

  const handleFilterColor = (text) => {
    console.log(text);

    // console.log(`Color: ${color}, Checked: ${isChecked}`);

    const newFilteredData = filterData?.filter((data) =>
      data.productImages?.some((imageSet) => imageSet.color === text)
    );
    console.log(newFilteredData);
    setFilterdata(newFilteredData);
  };

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

  const [offerCategoryData, setOfferCategoryData] = useState([]);
  useEffect(() => {
    const fetchOfferCategory = async () => {
      const apiUrl = `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/api/getAllCategoryByOffer/${encodeURI(type)}`;
      const response = await axios.get(apiUrl);
      setOfferCategoryData(response.data);
    };
    if (parentCategory === "offers") {
      fetchOfferCategory();
    }
  }, [type]);

  useEffect(() => {
    register();

    const params = {
      slidesPerView: 4.08,
      centeredSlides: false,
      spaceBetween: 5,
      spaceBetween: 10,
      draggable: true,
      noSwiping: true,
      allowSlidePrev: true,
      allowSlideNext: true,
      mousewheel: {
        forceToAxis: true,
        invert: false,
      },
      breakpoints: {
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
      },
      scrollbar: {
        hide: false,
        draggable: true,
      },
      mousewheel: {
        forceToAxis: true,
        invert: false,
      },
      freeMode: {
        enabled: false,
        sticky: true,
      },
    };

    if (swiper1Ref.current) {
      Object.assign(swiper1Ref.current, params);
      swiper1Ref.current.initialize();
    }
  }, [swiper1Ref, swiper1Ref.current]);

  return (
    <div className="">
      {openAll && <div className="background-overlay open"></div>}
      <div className="lg:px-[67px] sm:px-[50px] px-[20px]">
        <div className="flex flex-col overflow-hidden">
          <div className="md:mt-36 mt-10" />
          <h1 className="Blinds font-semibold text-2xl pb-[20px] lg:pt-[30px] capitalize">
            {pathname.split("/")[3] === "all" && <p>{heading}</p>}
            {pathname.split("/")[3] !== "all" && (
              <p>
                {pathname
                  .split("/")[3]
                  .replace(/-/g, " ")
                  .replace(/percent/g, "%")}
              </p>
            )}
          </h1>
          <div className="flex items-center">
            {subCategory ? (
              <div className="group flex flex-row items-center justify-start gap-2 mb-4">
                <swiper-container
                  ref={swiper1Ref}
                  style={{
                    "--swiper-navigation-size": "24px",
                    maxHeight: "120px",
                    width: "100%",
                  }}
                >
                  {pathname.split("/")[3] === "all"
                    ? subCategory?.map((curElement, idx) => {
                        return (
                          <swiper-slide
                            style={{
                              maxWidth: "130px",
                            }}
                            key={idx}
                          >
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
                          </swiper-slide>
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
                </swiper-container>
              </div>
            ) : (
              parentCategory &&
              (parentCategory === "offers" && offerCategoryData ? (
                <div className="group flex flex-row items-center justify-start gap-2 mb-4">
                  <swiper-container
                    ref={swiper1Ref}
                    {...swiperOptions2}
                    style={{
                      "--swiper-navigation-size": "24px",
                      maxHeight: "120px",
                      width: "100%",
                    }}
                  >
                    {offerCategoryData.map((category, idx) => (
                      <swiper-slide
                        style={{
                          maxWidth: "130px",
                        }}
                        key={idx}
                      >
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            setSelectedOfferCategory(category.name)
                          }
                        >
                          <div className="flex flex-col ">
                            <div className="lg:mb-[12px] ">
                              <Image
                                src={category.image}
                                width={200}
                                height={130}
                                alt={category.name}
                                className="w-[200px] h-[70px]"
                              />
                            </div>
                            <h2 className="text-[#333333] text-center text-[14px] hover:underline line-clamp-1">
                              {category.name}
                            </h2>
                          </div>
                        </div>
                      </swiper-slide>
                    ))}
                  </swiper-container>
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
        <div className="flex sticky top-0 z-[9996] bg-white py-5 overflow-x-auto md:overflow-x-visible mb-[20px] md:mb-0">
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

          {filteredProductData &&
            filteredProductData?.length > 0 &&
            AllsubCategory &&
            AllsubCategory.length > 0 && (
              <TabsProductContent
                filterName={"Styles"}
                commonClasses={commonClasses}
                isFilterOpen={opensubcategory}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handlesubCategory}
                handleAllFilter={handleallSubcategory}
                filterArr={AllsubCategory}
                renderFilter={(text, idx) =>
                  renderSubCategory(
                    text,
                    idx,
                    handleSubCategoryChange,
                    AllsubCategory.length
                  )
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
                  renderColor(text, idx, handleColorChange, allColors.length)
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
                  renderOffer(text, idx, handleOfferChange, allOffers.length)
                }
                openContent={openContent}
                handleContent={handleContent}
              />
            )}

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
                  renderDemand(
                    text,
                    idx,
                    handleDemandTypeChange,
                    allDemandType.length
                  )
                }
              />
            )}

          {filteredProductData &&
            filteredProductData?.length > 0 &&
            allPrices &&
            allPrices.length > 0 && (
              <TabsProductContent
                filterName={"Price"}
                commonClasses={commonClasses}
                isFilterOpen={openPrice}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handlePrice}
                handleAllFilter={handleAllPrice}
                filterArr={allPrices}
                renderFilter={(text, idx) =>
                  renderPrice(text, idx, handlePriceChange, allPrices.length)
                }
              />
            )}

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
                  <div className="flex flex-col gap-7">
                    <div
                      onClick={handleAllPrice}
                      className="flex justify-between text-left text-[14px] font-semibold "
                    >
                      Price &nbsp;
                      <Image
                        loading="lazy"
                        src="/icons/backarrow.svg"
                        width={40}
                        height={40}
                        className={`w-5 h-5  mt-1
                ${openAllPrice ? " rotate-90" : "-rotate-90"}

                `}
                        alt="arrow icon"
                      />
                    </div>
                    {openAllPrice ? (
                      <div className="flex flex-col gap-7">
                        {allPrices.map((text, idx) =>
                          renderPrice(
                            text,
                            idx,
                            handlePriceChange,
                            allPrices.length
                          )
                        )}
                      </div>
                    ) : null}
                  </div>
                  <hr />
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
          <div className="grid md:grid-cols-4 grid-cols-2 cursor-pointer gap-x-4 py-3 gap-y-8">
            {filterData && filterData.length > 0 ? (
              filterData.map((text, idx) => {
                const inCart = isProductInCart(text?._id);
                return (
                  <>
                    <TabsProductCard
                      id={text._id}
                      text={text}
                      totalPrice={text.totalPrice}
                      discountedprice={text.discountedprice}
                      specialprice={text.specialprice}
                      productDescription={text.productDescription}
                      productTitle={text.productTitle}
                      productImages={text.productImages}
                      images={text.images}
                      productId={text.productId}
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
                      urgency={text.urgency}
                      expectedDelivery={text.expectedDelivery}
                    />

                    {firstGrid && idx == 2 && <CategoryGrid grid={firstGrid} />}
                    {secondGrid && idx == 6 && (
                      <CategoryGrid grid={secondGrid} />
                    )}
                  </>
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
        </div>
      </div>
    </div>
  );
};

export default Tabs;
