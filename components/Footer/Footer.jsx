"use client"

import React from "react";
import "./styles.css";
import JoinAyatrioFamily from "./Footer_child/JoinAyatrioFamily";
import { footerData } from "../../Model/FooterColumnData/FooterColumnData";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
const FooterContent = dynamic(() => import('../molecules/FooterContent'), {
  ssr: false
})

const Footer = () => {
  const pathname = usePathname();
  const liveRoomRoute = "/liveroom"
  return (
    <div className={`${liveRoomRoute === pathname && "hidden"} bg-gray-100 lg:px-[80px] sm:px-[50px] px-[20px] p mt-20 pt-[70px]`}>
      <div className="grid md:grid-cols-6 grid-cols-1 pb-9">
        <div className="md:col-span-2 row-span-1 col-span-1 mr-12 mb-5">
          <JoinAyatrioFamily />
        </div>
        <hr className="border w-[75vw] sm:hidden block" />
        {footerData.map((column) => {
          return (
            <FooterContent
              key={column.id}
              headingId={column.id}
              categoryHeading={column.categoryHeading}
              categoryData={column.categoryData}
            />
          );
        })}
      </div>
      <div className="flex sm:border-t sm:border-solid sm:border-gray-200 sm:flex-row flex-col justify-between py-[20px]">
        <div className="flex  items-center space-x-4 text-lg font-semibold tracking-tight">
          <ul className="flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
            <li className="flex">
              <a href="#" className="me-4 hover:underline">
                <img
                  width={35}
                  height={35}
                  className="list-socialicon"
                  src="/social-icon/facebook-icon.svg"
                  alt=""
                />
              </a>
            </li>
            <li className="flex">
              <a href="#" className="me-4 hover:underline">
                <img
                  className="list-socialicon"
                  src="/social-icon/instagram-icon.svg"
                  alt=""
                />
              </a>
            </li>
            <li className="flex">
              <a href="#" className="me-4 hover:underline">
                <img
                  className="list-socialicon"
                  src="/social-icon/twitter-icon.svg"
                  alt=""
                />
              </a>
            </li>
            <li className="flex">
              <a href="#" className="me-4 hover:underline">
                <img
                  className="list-socialicon"
                  src="/social-icon/youtube-icon.svg"
                  alt=""
                />
              </a>
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <ul className="flex flex-wrap pt-2.5 justify-center text-gray-900 dark:text-white">
            <li>
              <a href="#" className="me-4 text-xs">
                © Ayatrio furnishing · 2015-2023
              </a>
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <ul className="flex flex-wrap pt-2.5 justify-center text-gray-900 dark:text-white">
            <li>
              <a href="#" className="me-4 text-xs hover:underline">
                Cookie policy
              </a>
            </li>
            <li>
              <a href="#" className="me-4 text-xs hover:underline">
                Cookie settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
