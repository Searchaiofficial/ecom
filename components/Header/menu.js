// import * as React from "react";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { menutext } from "@/Model/Menu/MenuCategoryData/MenuCategoryData";
import Link from "next/link";
import CategoryContent from "../molecules/CategoryContent";
import Image from "next/image";
import { useParams } from "next/navigation";
export default function BasicMenu() {
  const param = useParams()
  useEffect(() => {
    setAnchorEl(false);
  }, [param])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectectedMenu, setSelectedmenu] = useState(null);
  // const open = Boolean(anchorEl);

  const [mainContent, SetMainContent] = useState(true);

  const handleClick = (index) => {
    setSelectedmenu(index);
    setIsMenuOpen(true);
    SetMainContent(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedmenu(null);
    SetMainContent(true);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleOpenmenu = () => {
    setIsMenuOpen(true);
    SetMainContent(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    SetMainContent(true);
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
  };
  const [openchild, setOPenchild] = useState(false);
  const handleOpenmenuchild = () => {
    setOPenchild(true);
    SetMainContent(true);
  };
  const handleClosemenuchild = () => {
    setOPenchild(false);
    SetMainContent(true);
  };

  return (
    <div>
      <Image loading="lazy" src="/icons/menu.svg" height={20} width={20} alt="menu"
        className="font-bold text-2xl"
        onClick={(event) => {
          setAnchorEl(!anchorEl);
          handleOpenmenu();
          event.stopPropagation();
        }}
      />

      {anchorEl ? (
        <>
          <div
            className={`absolute dropdown-content z-50 h-auto pb-[30px] overflow-auto top-12 left-0 w-full bg-white flex flex-col
transition-all ease-linear duration-2000 shadow-[0_350px_60px_100px_rgba(0,0,0,0.5)]
${mainContent ? "block" : "hidden"}
`}
            onClick={(event) => event.stopPropagation()} // Prevent clicks inside the dropdown from closing it
          >
            {/* for desktop */}
            <div className="px-[60px] mt-[50px] sm:flex sm:gap-16 hidden">
              {
                menutext.map((category) => {
                  return (
                    <div>
                      <CategoryContent
                        categoryHeading={category.lebel}
                        categoryData={category.text}
                        headingSize="text-md"
                        headingStyle="font-semibold"
                        headingColor="text-black"
                        gapHeadingItems="gap-8"
                        itemsGap="gap-5"
                        textSize="text-sm"
                        textStyle="font-medium"
                        textColor="text-gray-600"
                        displayedOn="menu"
                      />
                    </div>
                  )
                })
              }
            </div>

            {/* for mobile only */}

            <div className="sm:hidden flex">
              {isMenuOpen && (
                <div className="menu-overlay overflow-y-auto  border-2 fixed  w-[85vw] top-0 right-0 h-full bg-white">
                  <div
                    className="menu-option bg-white  pt-5  w-[100%] h-[100vh] border-slate-600"
                    onClick={handleMenuClick}
                  >
                    <div className="flex flex-col px-4 gap-6 justify-evenly">
                      {menutext.map((text, index) => (
                        <div
                          key={index}
                          className="flex flex-row justify-between"
                        >
                          <p>{text.lebel}</p>
                          <img
                            src="/icons/downarrow.svg"
                            className="w-5 h-5 rotate-180"
                            alt="back arrow icon"
                            onClick={() => {
                              handleClick(index);
                              handleOpenmenuchild();
                            }}
                          />

                          {openchild && selectectedMenu === index && (
                            <div className="menu-overlay overflow-y-auto  border-2 fixed z-10 w-[80vw] top-0 right-0   bg-white h-full">
                              <div
                                className={`flex flex-col px-4 gap-6 justify-evenly pt-5 ${selectectedMenu === index ? "flex" : "hidden"
                                  }`}
                              >
                                {text.text.map((txt, idx) => (
                                  <p key={idx}>{txt.text}</p>
                                ))}
                              </div>
                              <div>
                                <button
                                  onClick={handleClosemenuchild}
                                  className="border m-auto relative top-6 px-3 py-1 bg-black text-white font-bold flex rounded-2xl justify-center items-center "
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      <Link href="/virtualexperience/vrooms">
                        <button className="bg-blue-500 whitespace-nowrap text-white sm:px-4 px-1 py-2 rounded-md transition duration-300 cursor-pointer hover:bg-blue-700">
                          Virtual Experience
                        </button>
                      </Link>
                      <button className="bg-blue-500 whitespace-nowrap w-20 h-auto text-white sm:px-4 px-1 py-2 rounded-md transition duration-300 cursor-pointer hover:bg-blue-700">
                        Sign In
                      </button>
                      <button className="bg-red-500 text-white w-24 h-auto px-4 py-2 rounded-md transition duration-300 cursor-pointer hover:bg-red-600">
                        Sign Up
                      </button>
                      <button className="border w-44 h-auto border-green-600 text-green-600 px-4 py-2 rounded-md transition duration-300 cursor-pointer hover:bg-green-600 hover:text-white">
                        Airbnb your home
                      </button>{" "}
                      <button className="border w-32 bg-yellow-300 px-4 py-2 rounded-md transition duration-300 cursor-pointer hover:bg-yellow-600 hover:text-white">
                        Help Centre
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          handleCloseMenu();
                          handleClose();
                        }}
                        className="border m-auto relative top-6 px-3 py-1 bg-black text-white font-bold flex rounded-2xl justify-center items-center "
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
