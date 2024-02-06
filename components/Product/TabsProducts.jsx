"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setselectedproduct } from "../Features/Slices/compareSlice";
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
  renderType,
  renderTypeContent,
  rendercategory,
  renderCollection,
  rendersizewidth,
  renderSortItem,
} from "./tabsRender";
import TabsProductContent from "../compounds/TabsProductContent";
const Tabs = ({ filteredProducts, heading, param }) => {
  // console.log("Filtered products:", filteredProducts);
  const router = useRouter();
  const dispatch = useDispatch();
  const handlenav = (id) => {
    router.push(`/room/${id}`);
  };
  const [filterData, setFilterdata] = useState([]);
  useEffect(() => {
    setFilterdata(filteredProducts);
  }, [filteredProducts]);

  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        () => typeof window !== "undefined" && window.innerWidth <= 450
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [activeTab, setActiveTab] = useState("all");

  const [openSort, setOpenSort] = React.useState(false);

  const handleOpen = () => {
    setOpenSort(!openSort);
  };
  const [openAllsort, setopenallsort] = useState(false);
  const handleAllsort = () => {
    setopenallsort(!openAllsort);
  };
  // const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [openSize, setOpenSize] = useState(false);

  const handleSize = () => {
    setOpenSize(!openSize);
  };
  const [openAllSize, setOpenAllSIze] = useState(false);
  const handleAllSize = () => {
    setOpenAllSIze(!openAllSize);
  };

  // collection
  const [openCollection, setOpenCollection] = useState(false);
  const handleCollection = () => {
    setOpenCollection(!openCollection);
  };

  const [openAllCollection, setOpenAllCollection] = useState(false);
  const handleAllCollection = () => {
    setOpenAllCollection(!openAllCollection);
  };

  // ^^^^^^^^^^^^^^^^^^^^^^^^collection^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
    setOpenColor(!opencolor);
  };

  const [openAllcolor, setOpenAllcolor] = useState(false);
  const handleAllcolor = () => {
    setOpenAllcolor(!openAllcolor);
  };
  const [openCaategory, setOpenCategory] = useState(false);
  const handleCategory = () => {
    setOpenCategory(!openCaategory);
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
    setOpenType(!openType);
  };
  const [openContent, setOpenCOntent] = useState(false);
  const handleContent = () => {
    setOpenCOntent(!openContent);
  };

  const [openAll, setOpenAll] = useState(false);
  const handleAll = () => {
    setOpenAll(true);
  };
  const closeAll = () => {
    setOpenAll(false);
    setOpenAllType(false);
    setOpenAllCategory(false);
    setOpenAllcolor(false);
    setOpenAllSIze(false);
    setopenallsort(false);
  };

  const commonClasses =
    "px-3 py-2 mr-2.5 rounded-full flex items-center  bg-gray-100 whitespace-nowrap";

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
      setFilterdata(filteredProducts);
    }

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
      router.push(pathname + "/compare");
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

  return (
    <>
      <div className="wrapper  sm:px-[50px] px-[20px] mt-20 w-full h-full">
        <div>
          <h2 className="mb-5 text-xl font-bold">More ideas and inspiration</h2>
        </div>
        <div
          className={`
          sidebarforstickey
           cursor-pointer sm:mb-0 
      
       `}
        >
          {param === "virtualexperience" ? (
            ""
          ) : (
            <div
              className={`bg-white py-5 bloc-tabs2 flex flex-row relative z-20`}
            >
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

              {/* Size - dropdown2 */}
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

              {/* Color - dropdown3 */}

              <div>
                <button
                  onClick={() => {
                    if (window.innerWidth <= 450) {
                      handleAll();
                      handleTabClick();
                      handleAllcolor();
                    } else {
                      handlecolor();
                      handleTabClick();
                    }
                  }}
                  className={`Tabbtn 
                  ${
                    opencolor
                      ? `active-tabs  border border-black ${commonClasses}`
                      : `tabS  border border-white ${commonClasses}`
                  }
                  ${() =>
                    typeof window !== "undefined" && window.innerWidth <= 450
                      ? " justify-center"
                      : " justify-between"}
                  `}
                >
                  Color &nbsp;
                  <Image
                    src="/svg/dropdown/backarrow.svg"
                    width={40}
                    height={40}
                    className={`w-6 h-6  mt-1 sm:block hidden
                ${opencolor ? " rotate-90" : "-rotate-90"}
                
                `}
                    alt=""
                  />
                </button>
                {opencolor ? (
                  <div
                    className="flex flex-col items-center px-5 py-5 overflow-y-auto bg-white border gap-7 rounded-2xl w-72 h-80"
                    style={{ zIndex: "1000" }}
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {colorarr.map((text, idx) => (
                        <div
                          className="flex flex-col items-center justify-center"
                          key={idx}
                        >
                          <div
                            onClick={() => handleClick(idx)}
                            className={`${text.class}  ${
                              selectedCircle.includes(idx)
                                ? "outline outline-2"
                                : ""
                            } `}
                          ></div>
                          <p>{text.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Design style - dropdown4 */}
              {heading === "Wallpaper" ? (
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
              ) : null}

              {/* Collections - filter */}
              <TabsProductContent
                filterName={"Collections"}
                commonClasses={commonClasses}
                isFilterOpen={openCollection}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handleCollection}
                handleAllFilter={handleAllCollection}
                filterArr={collectionArr}
                renderFilter={renderCollection}
              />

              {/* Type - dropdown5 */}
              <TabsProductContent
                filterName={"Type"}
                commonClasses={commonClasses}
                isFilterOpen={openType}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handleType}
                handleAllFilter={handleAllType}
                filterArr={typearr}
                renderFilter={renderType}
                openContent={openContent}
                handleContent={handleContent}
                typeContent={typeContent}
                renderTypeContent={renderTypeContent}
              />

              {/* ddropdown6 */}
              <div>
                <button
                  onClick={() => {
                    handleAll();
                    handleTabClick();
                  }}
                  className={`Tabbtn z-0 
                  ${
                    openAll
                      ? `active-tabs  border border-black ${commonClasses}`
                      : `tabS  border border-white ${commonClasses}`
                  }
                  ${() =>
                    typeof window !== "undefined" && window.innerWidth <= 450
                      ? " justify-center"
                      : " justify-between"}
                  `}
                >
                  All Filters &nbsp;
                  <Image
                    src="/svg/icon/choserightfloor.svg"
                    width={40}
                    height={40}
                    className={`w-6 h-6  sm:block hidden
                
                
                `}
                    alt=""
                  />
                </button>
                {openAll ? (
                  <div className="menu-overlay overflow-y-auto bg-white  border-2 fixed  sm:w-[30vw] w-[100vw] sm:h-auto h-[80vh]  right-0 sm:top-16 bottom-0 z-[5000] rounded-2xl">
                    <div className="menu-option bg-white  pt-5  w-[100%] h-[100vh] border-slate-600 z-10">
                      <div className="flex flex-col gap-6 px-4">
                        <div className="flex justify-between gap-32">
                          <p>Filter and sort</p>

                          <Image
                            src="/svg/dropdown/close.svg"
                            width={24}
                            height={24}
                            onClick={closeAll}
                            color="black"
                          />
                        </div>
                        <hr />
                        {/* 1stt div */}
                        <div className="flex flex-col gap-7">
                          <div
                            onClick={handleAllsort}
                            className="flex justify-between text-left"
                          >
                            Sort &nbsp;
                            <Image
                              src="/svg/dropdown/backarrow.svg"
                              width={40}
                              height={40}
                              className={`w-6 h-6  mt-1
                ${openAllsort ? " rotate-90" : "-rotate-90"}
                
                `}
                              alt=""
                            />
                          </div>
                          {openAllsort ? (
                            <div className="flex flex-col gap-7">
                              {srtarr.map(renderSortItem)}
                            </div>
                          ) : null}
                        </div>
                        <hr />
                        {/* 2nd div */}

                        <div className="flex flex-col gap-7">
                          <div
                            onClick={handleAllSize}
                            className="flex justify-between text-left"
                          >
                            Size &nbsp;
                            <Image
                              src="/svg/dropdown/backarrow.svg"
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
                              {/* <p className="font-semibold text-left">Width</p> */}
                              {Size.map(rendersizewidth)}
                              {/* 
                            <p className="font-semibold text-left">Height</p>
                            {htarr.map(rendersizewidth)} */}
                            </div>
                          ) : null}
                        </div>
                        <hr />
                        {/* ****************************** */}
                        {/* 3rd div */}
                        <div className="flex flex-col gap-7">
                          <div
                            onClick={handleAllcolor}
                            className="flex justify-between text-left"
                          >
                            Color &nbsp;
                            <Image
                              src="/svg/dropdown/backarrow.svg"
                              width={40}
                              height={40}
                              className={`w-6 h-6  mt-1
                ${openAllcolor ? " rotate-90" : "-rotate-90"}
                
                `}
                              alt=""
                            />
                          </div>
                          {openAllcolor ? (
                            <div className="flex flex-col gap-7">
                              {colorarr.map(renderSortItem)}
                            </div>
                          ) : null}
                        </div>
                        <hr />

                        {/* 4th div */}
                        {heading === "Wallpaper" ? (
                          <>
                            <div className="flex flex-col gap-7">
                              <div
                                onClick={handleAllCategory}
                                className="flex justify-between text-left"
                              >
                                Design style &nbsp;
                                <Image
                                  src="/svg/dropdown/backarrow.svg"
                                  width={40}
                                  height={40}
                                  className={`w-6 h-6  mt-1
                ${openAllCategory ? " rotate-90" : "-rotate-90"}
                
                `}
                                  alt=""
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
                        {/* Collections div */}
                        <div className="flex flex-col gap-7">
                          <div
                            onClick={handleAllCollection}
                            className="flex justify-between text-left"
                          >
                            Collections &nbsp;
                            <Image
                              src="/svg/dropdown/backarrow.svg"
                              width={40}
                              height={40}
                              className={`w-6 h-6  mt-1
                ${openAllCollection ? " rotate-90" : "-rotate-90"}
                
                `}
                              alt=""
                            />
                          </div>
                          {openAllCollection ? (
                            <div className="flex flex-col gap-7">
                              {collectionArr.map(rendercategory)}
                            </div>
                          ) : null}
                        </div>
                        <hr />
                        {/* 5th div */}
                        <div className="flex flex-col gap-7">
                          <div
                            onClick={handleAllType}
                            className="flex justify-between text-left"
                          >
                            Type &nbsp;
                            <Image
                              src="/svg/dropdown/backarrow.svg"
                              width={40}
                              height={40}
                              className={`w-6 h-6  mt-1
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
                                className={`text-left underline ${
                                  openContent ? "block" : "hidden"
                                }`}
                              >
                                Less
                              </button>
                            </div>
                          ) : null}
                        </div>
                        <hr />
                      </div>
                      <div className="flex flex-row items-center justify-center gap-3 pt-10">
                        <button className="text-white bg-blue-900 rounded-full w-36 h-14">
                          View 96
                        </button>
                        <button className="text-white bg-blue-900 rounded-full w-36 h-14">
                          Clear all
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          <hr />
          {/* iimages */}
          <div className="relative z-10 flex flex-col image-product ">
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
            <div className="main-image-pdt pt-[32px] grid sm:grid-cols-4 grid-cols-2 sm:gap-6 gap-0">
              {filterData.map((text, idx) => (
                <div
                  className="flex flex-col gap-3 p-3 border-b border-r hover-divnine sm:border-none"
                  key={idx}
                  onClick={() => handlenav(text._id)}
                >
                  <div
                    onClick={(event) => event.stopPropagation()}
                    className={`flex justify-between text-black  checkbox-div ${
                      selectedpdt.includes(text) ? "visible" : ""
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
                  <div className=" relative w-[250px] h-[250px]">
                    <Image
                      src={text.images[0]}
                      alt=""
                      className="absolute "
                      layout="fill"
                    />
                  </div>
                  {console.log(text.images[0])}
                  <p className="text-sm font-semibold">{text.productTitle}</p>
                  <p className="text-sm">{text.productDescription}</p>
                  <p className="flex items-center justify-center h-10 text-sm font-semibold bg-yellow-400 price-box w-28">
                    Rs. <span className="text-3xl"> {text.totalPrice}</span>
                  </p>
                  <p className="flex flex-row items-center gap-1 text-sm text-black">
                    <Image
                      src="/svg/icon/star.svg"
                      alt="star"
                      width={15}
                      height={15}
                    />
                    <Image
                      src="/svg/icon/star.svg"
                      alt="star"
                      width={15}
                      height={15}
                    />
                    <Image
                      src="/svg/icon/star.svg"
                      alt="star"
                      width={15}
                      height={15}
                    />
                    <Image
                      src="/svg/icon/star.svg"
                      alt="star"
                      width={15}
                      height={15}
                    />
                    <Image
                      src="/svg/icon/half-star.svg"
                      alt="star"
                      width={15}
                      height={15}
                    />
                    ({text.count})
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/svg/icon/adtocart.svg"
                      width={40}
                      height={40}
                      className="w-10 h-10"
                      alt=""
                    />
                    {/* <img src={liketocart} className="w-5 h-5" alt="" /> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
