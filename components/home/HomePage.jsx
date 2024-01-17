"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
// import Cards from "../Cards";
const Cards = dynamic(() => import('../Cards'))
// import MobileSearchBar from "../MobileSearch";
const MobileSearchBar = dynamic(() => import('../MobileSearch'))
// import Filter from "../Filter";
const Filter = dynamic(() => import('../Filter'))
// import ayatrio_store from "../assets/icon/ayatrio_store.svg";
// import "./HomePage.css";
// import PopUp from "../PopUp/PopUp";
const PopUp = dynamic(() => import('../PopUp/PopUp'))
// import { Oval } from "react-loader-spinner";
// import Expandedbar from "../Header/Expandedbar";
const Expandedbar = dynamic(() => import('../Header/Expandedbar'))
import { useRouter } from "next/navigation";
import Image from "next/image";

const HomePage = () => {
  // const loader = false;
  const router = useRouter();

  const handleProfileNav = () => {
    console.log("Profile");
    router.push("/profile");
  };

  const onClose = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  //2nd
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  // const handleSearchIconClick = () => {
  //   setIsSearchBarVisible(!isSearchBarVisible);
  // };

  const [isFilterVisible, setIsFilterVisible] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsFilterVisible(
        currentScrollPos <= prevScrollPos || currentScrollPos < 100
      );
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const popUp =
    typeof window !== "undefined" ? localStorage?.getItem("popUp") : null;


  // const [isOpen, setIsOpen] = useState(false);
  const [isFilterHovered, setFilteredContent] = useState(null);
  const handleFilterHover = (content) => {
    setFilteredContent(content);
  };

  return (
    <>
      <div
        className={`fade-in
          
         overflow-x-hidden `}
      >
        {popUp ? null : <PopUp />}
        {isFilterVisible && (
          <>
            {isSearchBarVisible && <Expandedbar onClose={onClose} />}
            <MobileSearchBar />
          </>
        )}
        <Filter
          isFilterHovered={isFilterHovered}
          onFilterHover={handleFilterHover}
        />
        <Cards />
        {isFilterVisible && (
          <div className="fixed-ayatrio-map">
            <button
              type="button"
              className="fixed sm:hidden flex left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999]  -bottom-3 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={() => router.push("/ayatrio-map")}
            >
              Map{" "}
              <Image
                width={25}
                height={25}
                src="/ayatrio_store.svg"
                alt=""
                className="header-div-sStore-icon"
              />
            </button>
            <button
              type="button"
              className="fixed sm:flex hidden leading-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999]  -bottom-3 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={() => router.push("/ayatrio-map")}
            >
              Near Ayatrio{" "}
              <Image
                width={25}
                height={25}
                src="/ayatrio_store.svg"
                alt=""
                className="header-div-sStore-icon"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
