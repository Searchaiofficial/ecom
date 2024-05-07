import React, { useState } from "react";
import Link from "next/link";
import Displaybox from "./Displaybox";
import { homeDecorCategoryData } from "@/Model/Dropdown/CategoryData/HomeDecorCategoryData";
import { flooringCategoryData } from "@/Model/Dropdown/CategoryData/FlooringCategoryData";
import { wallDecorCategoryData } from "@/Model/Dropdown/CategoryData/WallDecorCategoryData";
import Midsection from "../Midsection/Midsection";
// import { AsideSectionList } from "@/Model/Dropdown/AsideData/AsideData";

const Asidebox = (props) => {
  let asideCategory;
  let parentCategory;
  switch (props.hoveredIndex) {
    case 0:
      asideCategory = homeDecorCategoryData;
      parentCategory = "homedecor";
      break;
    case 1:
      asideCategory = wallDecorCategoryData;
      parentCategory = "walldecor";
      break;
    case 2:
      asideCategory = flooringCategoryData;
      parentCategory = "flooring";
      break;
    default:
      asideCategory = null;
  }
  const [defaultLinkIndex, setDefaultLinkIndex] = useState(0);
  const [selectedData, setSelectedData] = useState(
    asideCategory ? asideCategory[0] : ""
  );

  const handleMouseEnter = (index, data) => {
    setDefaultLinkIndex(index);
    setSelectedData(data);
  };

  const [innerData, setInnerData] = useState(false);

  return (
    <>
      {asideCategory && (
        <div
          initial={
            typeof window !== "undefined" &&
            window.innerWidth > 800 && { y: -10, opacity: 0 }
          }
          whileInView={{ y: 0, opacity: 1 }}
          className="absolute top-[2.8rem] p-4 bg-white flex flex-col mt-[15px] md:flex-row noto-sans-200 transition-all duration-300 ease-linear w-full md:left-0 h-lvh md:h-auto md:px-10"
        >
          <aside
            className="absolute top-5 w-1/6 md:top-0 md:static md:border-r md:pr-10 md:py-4"
            initial={
              typeof window !== "undefined" &&
              window.innerWidth <= 800 && { x: 300, opacity: 0 }
            }
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "just" }}
          >
            {asideCategory?.map((value, idx) => (
              <Link
                key={idx}
                onMouseEnter={() => handleMouseEnter(idx, value)}
                className={`block p-2 text-lg font-medium ${defaultLinkIndex === idx ? "text-blue-600" : ""
                  }`}
                href="#"
                onClick={() => setInnerData(true)}
              >
                {value.categoryHeading}
              </Link>
            ))}
          </aside>
          <div
            className={`${innerData ? "block" : "hidden"
              } md:block absolute  bg-white md:h-auto md:w-auto md:static z-[99]`}
          >
            <Displaybox
              parentCategory={parentCategory}
              defaultLinkIndex={defaultLinkIndex}
              data={selectedData}
              setHoveredIndex={props.setHoveredIndex}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Asidebox;
