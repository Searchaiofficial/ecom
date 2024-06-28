import React, { useEffect, useState } from "react";
import Link from "next/link";
import Displaybox from "./Displaybox";
import axios from "axios";
import SwiperComponent from "./SwiperComponent";
import Image from "next/image";

const Asidebox = (props) => {
  const [asideCategory, setAsideCategory] = useState(null);
  let parentCategory;
  switch (props.hoveredIndex) {
    case 0:
      parentCategory = "homedecor";
      break;
    case 1:
      parentCategory = "walldecor";
      break;
    case 2:
      parentCategory = "flooring";
      break;
  }

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCategoriesByType/${parentCategory}`;
    const fetchHomeDecorCategoryData = async () => {
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.length === 0 || !response.data) {
        return;
      }
      setAsideCategory(response.data);
      setSelectedData(response.data[0]);
    };

    fetchHomeDecorCategoryData();
  }, [parentCategory]);

  const [defaultLinkIndex, setDefaultLinkIndex] = useState(0);
  const [selectedData, setSelectedData] = useState(
    asideCategory ? asideCategory[0] : ""
  );

  const handleMouseEnter = (index, data) => {
    setDefaultLinkIndex(index);
    setSelectedData(data);
  };

  const handleItemClick = (data) => {
    props.onItemClick(data); // Call the parent component's function with the data
    setInnerData(true);
  };

  const [innerData, setInnerData] = useState(false);

  const HandleClick = (item) => {
    if (window.innerWidth > 800) {
      props.setHoveredIndex(item);
    }
  };

  if (props.hoveredIndex === 0 || props.hoveredIndex === 1 || props.hoveredIndex === 2) {
    if (!asideCategory) {
      return (
        <div className="absolute top-[2.7rem] lg:p-4 bg-white flex flex-col mt-[15px] md:flex-row noto-sans-200 transition-all duration-300 ease-linear w-full md:left-0 min-h-[90%] lg:min-h-[20rem] md:h-auto md:px-10 border-t">
        </div>
      );
    }
  }

  return (
    <>
      {asideCategory && (
        <div
          className="absolute top-[2.7rem] bg-white flex flex-col mt-[15px] md:flex-row noto-sans-200 w-full md:left-0 min-h-[90%] lg:min-h-[20rem] md:h-auto md:px-10 border-t"
        >
          <aside
            className="w-full md:w-1/4 lg:w-1/5 md:sticky md:top-0 h-full overflow-y-auto p-2"
          >
            {asideCategory?.map((value, idx) => (
              <Link
                key={idx}
                onMouseEnter={() => handleMouseEnter(idx, value)}
                className={`lg:block flex items-center justify-between w-full lg:text-[14px] text-[18px] font-semibold ${defaultLinkIndex === idx ? "text-blue-600" : ""
                  } p-2 pt-0 hover:underline`}
                href="#"
                onClick={() => handleItemClick(value)} // Handle click event
              >
                <span>{value.name}</span>
                <div className="pr-[24px] sm:hidden right-0">
                  <Image src={"/icons/backarrowRevarce.svg"} height={15} width={15} />
                </div>
              </Link>
            ))}
          </aside>
          <div
            className={`${innerData ? "block" : "hidden"} md:block absolute w-full bg-white md:h-auto md:w-auto md:static z-[99]`}
          >
            <Displaybox
              toggleMobileMenu={props.toggleMobileMenu}
              parentCategory={parentCategory}
              defaultLinkIndex={defaultLinkIndex}
              data={selectedData}
              setAsideCategory={setAsideCategory}
              HandleClick={HandleClick}
              handleChange={props.handleChange}
            />
          </div>
        </div>
      )}
      {(props.hoveredIndex === 3 || props.hoveredIndex === 4 || props.hoveredIndex === 5) && (
        <div
          className="absolute top-[2.7rem] bg-white flex flex-col mt-[15px] md:flex-row noto-sans-200 transition-all duration-300 ease-linear w-full md:left-0 min-h-[10rem] md:h-auto"
        >
          <SwiperComponent
            handleChange={props.handleChange}
            setHoveredIndex={props.setHoveredIndex}
            hoveredIndex={props.hoveredIndex}
          />
        </div>
      )}
    </>
  );
};

export default Asidebox;
