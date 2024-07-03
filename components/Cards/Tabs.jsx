"use client";
import React, { useState, useEffect } from "react";
import "../MainSlider/Mainslidestyle.css";
// import work from "@/public/images/work.webp";
import "./tabs.css";
import TabImage from "./TabImage";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";


const Tabs = ({ data }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [isSticky, setIsSticky] = useState(false);
  const [newdata, setNewData] = useState([])

  // console.log(data)

  useEffect(() => {
    fetchAllRoom()
  }, [])

  const fetchAllRoom = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getTabsRoom`
      );
      setNewData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(newdata.length)

  // console.log(newdata)

  // useEffect(() => {
  //   if (data) {
  //     const defaultActiveTab = data[0]?.roomCategory[0]?.toLowerCase();
  //     setActiveTab(defaultActiveTab);
  //   }
  // }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      const thirdDiv = document.querySelector(".classic-tabs");

      if (thirdDiv) {
        const thirdDivTop = thirdDiv.getBoundingClientRect().top;
        const elementVisible =
          thirdDivTop <= 0 && thirdDivTop + thirdDiv.clientHeight > 0;
        setIsSticky(elementVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const recommendedProducts = newdata.flatMap((product) => product.roomType);

  const tabsData = [];
  const tabImages = {};
  const labelData = {};

  let uniqueRoomCategories = [...new Set(recommendedProducts)];

  // console.log(uniqueRoomCategories)
  console.log(uniqueRoomCategories)

  uniqueRoomCategories?.forEach((category) => {
    const products = newdata.filter((item) =>
      item.roomType.includes(category)
    );

    // console.log(products)

    // const sorted = products.sort((a, b) => b.popularity - a.popularity)
    // console.log(sorted)
    if (products.length > 0) {
      // products.sort((a, b) => parseInt(b.productObjectId.popularity) - parseInt(a.productObjectId.popularity));
      const images = products.map((product) => product.imgSrc);
      const labels = products.map((product) => {
        // const { productTitle, perUnitPrice } = product;
        console.log()
        const productTitle = product.children[0].productTitle
        const perUnitPrice = product.children[0].productPrice
        const topPosition = product.children[0].topPosition
        const leftPosition = product.children[0].leftPosition
        const ProductLink = product.children[0].productLink
        return {
          productTitle,
          productCategory: category,
          productPrice: perUnitPrice,
          topPosition,
          leftPosition,
          ProductLink
        };
      });
      tabsData.push({
        key: category.toLowerCase(),
        label: category,
        img: images[0], // Assuming you want to use the first image as the main image
      });
      // Set tabImages and labelData for the current category
      tabImages[category.toLowerCase()] = images;
      console.log(tabImages)
      labelData[category.toLowerCase()] = labels;
    }
  });

  console.log(labelData)

  uniqueRoomCategories = uniqueRoomCategories.map(category => category.toLowerCase());

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleTab = (productLink) => {
    // router.push(`/${productLink}`);
    console.log(productLink)
  };

  // console.log("tabsData", tabsData);
  // console.log("tabImages", tabImages);
  // console.log("labelDatazzz", labelData)
  const [loadMoreAll, setLoadMoreAll] = useState(false)
  const handleLoadMoreAll = () => {
    setLoadMoreAll(true)
  }
  const [loadMore, setLoadMore] = useState(false)
  const handleLoadMore = () => {
    setLoadMore(true)
  }

  console.log(tabImages)

  return (
    <>
      <div className="lg:px-[15px] px-[20px] sm:px-[50px] pb-20 pt-10 h-full">
        <div>
          <h2 className="text-xl font-bold mb-5">More ideas and inspiration</h2>
        </div>
        <div
          className={` py-2.5 bloc-tabsnone flex flex-row tabcategory ${isSticky ? "sticky-tabcategory" : ""
            }`}
          style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
        >
          <div
            className={` px-5 py-2 tabS cursor-pointer
            ${activeTab === "all"
                ? "active-tabs  border border-black mr-2.5 rounded-full flex items-center justify-center bg-gray-100 whitespace-nowrap"
                : "tabs  border border-white mr-2.5 rounded-full flex items-center justify-center bg-gray-100 whitespace-nowrap"
              }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </div>
          {tabsData.map((tab, i) => (
            <div
              key={i}
              className={` px-5 py-2 tabS cursor-pointer
            ${activeTab === tab.key
                  ? "active-tabs  border border-black mr-2.5 rounded-full flex items-center justify-center bg-gray-100 whitespace-nowrap"
                  : "tabs  border border-white mr-2.5 rounded-full flex items-center justify-center bg-gray-100 whitespace-nowrap"
                }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </div>
          ))}

        </div>



        {activeTab === "all" ? (
          <>

            <div className="classic-tabs text-green-800 grid sm:grid-cols-3 grid-cols-2 gap-3 grid-rows-3">
              <TabImage
                width={450}
                height={700}
                src={tabImages[uniqueRoomCategories[0]]?.[0]}
                alt="Room"
                handleTab={handleTab}
                labelData={labelData[uniqueRoomCategories[0]]?.[0] || []}
              />

              <div className="overflow-hidden relative">
                <Image
                  className="h-full w-full object-cover "
                  src={tabImages[uniqueRoomCategories[1]]?.[0]}
                  alt="Room"
                  width={450}
                  height={350}
                />
              </div>

              <TabImage
                src={tabImages[uniqueRoomCategories[2]]?.[0]}
                labelData={labelData[uniqueRoomCategories[2]]?.[0] || []}
                alt="Room"
                width={450}
                height={700}
                handleTab={handleTab}
              />
              <div className="overflow-hidden sm:hidden block">
                <Image
                  className="h-full w-full object-cover "
                  src="/images/temp.svg"
                  alt="Room"
                  width={200}
                  height={200}
                />
              </div>

              <TabImage
                src={tabImages[uniqueRoomCategories[3]]?.[0]}
                labelData={labelData[uniqueRoomCategories[3]]?.[0] || []}
                alt="Room"
                handleTab={handleTab}
                width={450}
                height={700}
              />

              <div className="overflow-hidden">
                <Image
                  className="h-full w-full object-cover 11"
                  src={tabImages[uniqueRoomCategories[4]]?.[0]}
                  alt="Room"
                  width={450}
                  height={350}
                />

              </div>
              <div className="bg-teal-100 overflow-hidden ">
                <Image
                  className="h-full w-full object-cover"
                  src={tabImages[uniqueRoomCategories[5]]?.[0]}
                  alt="Room"
                  width={450}
                  height={350}
                />
              </div>
              {
                loadMoreAll && (
                  <TabImage
                    width={450}
                    height={700}
                    src={tabImages[uniqueRoomCategories[6]]?.[0]}
                    alt="Room"
                    handleTab={handleTab}
                    labelData={labelData[uniqueRoomCategories[6]]?.[0] || []}
                  />
                )

              }

              {
                loadMoreAll && (
                  <div className="overflow-hidden relative">
                    <Image
                      className="h-full w-full object-cover "
                      src={tabImages[uniqueRoomCategories[7]]?.[0]}
                      alt="Room"
                      width={450}
                      height={350}
                    />
                  </div>
                )
              }

              {
                loadMoreAll && (
                  <TabImage
                    src={tabImages[uniqueRoomCategories[8]]?.[0]}
                    labelData={labelData[uniqueRoomCategories[8]]?.[0] || []}
                    alt="Room"
                    width={450}
                    height={700}
                    handleTab={handleTab}
                  />
                )
              }
              {
                loadMoreAll && (
                  <div className="overflow-hidden sm:hidden block">
                    <Image
                      className="h-full w-full object-cover "
                      src="/images/temp.svg"
                      alt="Room"
                      width={200}
                      height={200}
                    />
                  </div>
                )
              }

              {
                loadMoreAll && (
                  <TabImage
                    src={tabImages[uniqueRoomCategories[9]]?.[0]}
                    labelData={labelData[uniqueRoomCategories[9]]?.[0] || []}
                    alt="Room"
                    handleTab={handleTab}
                    width={450}
                    height={700}
                  />
                )
              }

              {
                loadMoreAll && (
                  <div className="overflow-hidden">
                    <Image
                      className="h-full w-full object-cover 11"
                      src={tabImages[uniqueRoomCategories[10]]?.[0]}
                      alt="Room"
                      width={450}
                      height={350}
                    />

                  </div>
                )
              }
              {
                loadMoreAll && (
                  <div className="bg-teal-100 overflow-hidden ">
                    <Image
                      className="h-full w-full object-cover"
                      src={tabImages[uniqueRoomCategories[11]]?.[0]}
                      alt="Room"
                      width={450}
                      height={350}
                    />
                  </div>
                )
              }

            </div>
            {
              !loadMoreAll && (
                <div className="flex items-center justify-center">
                  <p onClick={handleLoadMoreAll} className="text-center text-[14px] font-semibold border max-w-fit p-2 px-4 rounded-full  border-black cursor-pointer">Load 6 more</p>
                </div>
              )
            }
          </>
        ) : (
          <>

            <div className="classic-tabs text-green-800 grid sm:grid-cols-3 grid-cols-2 gap-3 grid-rows-3">
              <TabImage
                width={450}
                height={700}
                src={
                  tabImages[activeTab]
                    ? tabImages[activeTab][0]
                    : tabImages[activeTab]?.alt
                }
                alt="Room"
                handleTab={handleTab}
                labelData={labelData[activeTab]?.[0] || []}
              />

              <div className="overflow-hidden relative">
                <Image
                  className="h-full w-full object-cover "
                  src={
                    tabImages[activeTab]
                      ? tabImages[activeTab][1]
                      : tabImages[activeTab]?.alt
                  }
                  alt="Room"
                  width={450}
                  height={350}
                />
              </div>

              <TabImage
                src={
                  tabImages[activeTab]
                    ? tabImages[activeTab][2]
                    : tabImages[activeTab]?.alt
                }
                labelData={labelData[activeTab]?.[2] || []}
                alt="Room"
                width={450}
                height={700}
                handleTab={handleTab}
              />
              <div className="overflow-hidden sm:hidden block">
                <Image
                  className="h-full w-full object-cover "
                  src="/images/temp.svg"
                  alt="Room"
                  width={200}
                  height={200}
                />
              </div>

              <TabImage
                src={
                  tabImages[activeTab]
                    ? tabImages[activeTab][3]
                    : tabImages[activeTab]?.alt
                }
                labelData={labelData[activeTab]?.[3] || []}
                alt="Room"
                handleTab={handleTab}
                width={450}
                height={700}
              />
              <div className="overflow-hidden">
                <Image
                  className="h-full w-full object-cover"
                  src={
                    tabImages[activeTab]
                      ? tabImages[activeTab][4]
                      : tabImages[activeTab]?.alt
                  }
                  alt="Room"
                  width={450}
                  height={350}
                />
              </div>
              <div className="bg-teal-100 overflow-hidden ">
                <Image
                  className="h-full w-full object-cover"
                  src={
                    tabImages[activeTab]
                      ? tabImages[activeTab][5]
                      : tabImages[activeTab]?.alt
                  }
                  alt="Room"
                  width={450}
                  height={350}
                />
              </div>
              {
                loadMore && (
                  <TabImage
                    width={450}
                    height={700}
                    src={
                      tabImages[activeTab]
                        ? tabImages[activeTab][6]
                        : tabImages[activeTab]?.alt
                    }
                    alt="Room"
                    handleTab={handleTab}
                    labelData={labelData[activeTab]?.[6] || []}
                  />
                )
              }

              {
                loadMore && (
                  <div className="overflow-hidden relative">
                    <Image
                      className="h-full w-full object-cover "
                      src={
                        tabImages[activeTab]
                          ? tabImages[activeTab][7]
                          : tabImages[activeTab]?.alt
                      }
                      alt="Room"
                      width={450}
                      height={350}
                    />
                  </div>
                )
              }

              {
                loadMore && (
                  <TabImage
                    src={
                      tabImages[activeTab]
                        ? tabImages[activeTab][8]
                        : tabImages[activeTab]?.alt
                    }
                    labelData={labelData[activeTab]?.[8] || []}
                    alt="Room"
                    width={450}
                    height={700}
                    handleTab={handleTab}
                  />
                )
              }
              {
                loadMore && (
                  <div className="overflow-hidden sm:hidden block">
                    <Image
                      className="h-full w-full object-cover "
                      src="/images/temp.svg"
                      alt="Room"
                      width={200}
                      height={200}
                    />
                  </div>
                )
              }

              {
                loadMore && (
                  <TabImage
                    src={
                      tabImages[activeTab]
                        ? tabImages[activeTab][9]
                        : tabImages[activeTab]?.alt
                    }
                    labelData={labelData[activeTab]?.[9] || []}
                    alt="Room"
                    handleTab={handleTab}
                    width={450}
                    height={700}
                  />
                )
              }
              {
                loadMore && (
                  <div className="overflow-hidden">
                    <Image
                      className="h-full w-full object-cover"
                      src={
                        tabImages[activeTab]
                          ? tabImages[activeTab][10]
                          : tabImages[activeTab]?.alt
                      }
                      alt="Room"
                      width={450}
                      height={350}
                    />
                  </div>
                )
              }
              {
                loadMore && (
                  <div className="bg-teal-100 overflow-hidden ">
                    <Image
                      className="h-full w-full object-cover"
                      src={
                        tabImages[activeTab]
                          ? tabImages[activeTab][11]
                          : tabImages[activeTab]?.alt
                      }
                      alt="Room"
                      width={450}
                      height={350}
                    />
                  </div>
                )
              }
            </div>
            {
              !loadMore && (
                <div className="flex items-center justify-center">
                  <p onClick={handleLoadMore} className="text-center text-[14px] font-semibold border max-w-fit p-2 px-4 rounded-full  border-black cursor-pointer">Load 6 more</p>
                </div>
              )
            }

          </>
        )}
      </div>
    </>
  );
};

export default Tabs;
