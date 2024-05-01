"use client";
import React, { useState, useEffect } from "react";
import "../MainSlider/Mainslidestyle.css";
import room from "@/public/images/room.webp";
import work from "@/public/images/work.webp";
import living from "@/public/images/living.webp";
import kitchen from "@/public/images/kitchen.webp";
import "./tabs.css";
import TabImage from "./TabImage";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "../Features/Slices/productSlice";

const Tabs = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectData = useSelector(selectAllProducts);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  useEffect(() => {
    if (!dataFetched) {
      dispatch({
        type: "ALL_PRODUCTS_REQUEST",
        payload: { limit: 10 },
      });

      setDataFetched(true);
    }

    if (selectData) {
      setData(selectData);
    }

    setLoading(false);
  }, [dispatch, selectData, dataFetched]); // Include dataFetched in the dependency array
<<<<<<< HEAD
=======
  console.log({ data });
>>>>>>> 56fc513b83c9d9707cad2bcca545697d48aaafc9

  const [activeTab, setActiveTab] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (data) {
      const defaultActiveTab = data[0]?.roomCategory[0]?.toLowerCase();
      setActiveTab(defaultActiveTab);
    }
  }, [data]);

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

  const recommendedProducts = data.flatMap((product) => product.roomCategory);

  const tabsData = [];
  const tabImages = {};
  const labelData = {};

  const uniqueRoomCategories = [...new Set(recommendedProducts)];

  uniqueRoomCategories?.forEach((category) => {
    const products = data.filter((item) =>
      item.roomCategory.includes(category)
    );

    if (products.length > 0) {
      const images = products.map((product) => product.images[1]);
      const labels = products.map((product) => {
        const { productTitle, perUnitPrice } = product;
        return {
          productTitle,
          productCategory: category,
          productPrice: perUnitPrice,
        };
      });
      tabsData.push({
        key: category.toLowerCase(),
        label: category,
        img: images[0], // Assuming you want to use the first image as the main image
      });
      // Set tabImages and labelData for the current category
      tabImages[category.toLowerCase()] = images;
      labelData[category.toLowerCase()] = labels;
    }
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleTab = () => {
    router.push("/room");
  };

  // console.log("tabsData", tabsData);
  // console.log("tabImages", tabImages);
  // console.log("labelDatazzz", labelData);

  return (
    <>
      <div className=" sm:px-[50px] px-[20px] py-20 h-full">
        <div>
          <h2 className="text-xl font-bold mb-5">More ideas and inspiration</h2>
        </div>
        <div
<<<<<<< HEAD
          className={` py-2.5 bloc-tabsnone   flex flex-row tabcategory ${isSticky ? "sticky-tabcategory" : ""
            }`}
=======
          className={` py-2.5 bloc-tabsnone flex flex-row tabcategory ${
            isSticky ? "sticky-tabcategory" : ""
          }`}
>>>>>>> 56fc513b83c9d9707cad2bcca545697d48aaafc9
          style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
        >
          {tabsData.map((tab, i) => (
            <div
              key={i}
              className={` px-5 py-2 tabS cursor-pointer
            ${
              activeTab === tab.key
                ? "active-tabs  border border-black mr-2.5 rounded-full flex items-center justify-center bg-gray-100 whitespace-nowrap"
                : "tabs  border border-white mr-2.5 rounded-full flex items-center justify-center bg-gray-100 whitespace-nowrap"
            }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </div>
          ))}
        </div>

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
                  ? tabImages[activeTab][3]
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
                ? tabImages[activeTab][1]
                : tabImages[activeTab]?.alt
            }
            labelData={labelData[activeTab]?.[1] || []}
            alt="Room"
            width={450}
            height={700}
            handleTab={handleTab}
          />
          <div className="overflow-hidden sm:hidden block">
            <Image
              className="h-full w-full object-cover "
              src={work}
              alt="Room"
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
        </div>
      </div>
    </>
  );
};

export default Tabs;
