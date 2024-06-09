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
    console.log(item)
    props.setHoveredIndex(item)
    // props.setIsHovered(false)
    // console.log(props.)
  }

  return (
    <>
      {asideCategory && (
        <div
          initial={
            typeof window !== "undefined" &&
            window.innerWidth > 800 && { y: -10, opacity: 0 }
          }
          whileInView={{ y: 0, opacity: 1 }}
          style={{ overflowY: "auto" }}
          className="absolute top-[2.7rem]  lg:p-4 bg-white flex flex-col mt-[15px] md:flex-row noto-sans-200 transition-all duration-300 ease-linear w-full md:left-0 min-h-[90%] lg:min-h-[20rem] md:h-auto md:px-10"
        >
          <aside
            className="absolute lg:top-[2.8rem] space-y-2 mt-[15px] w-[100%] lg:w-[15%] md:top-0 md:static md:border-r md:pr-10 md:py-4"
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
                className={`lg:block flex items-center justify-between w-full lg:text-[14px] text-[18px] font-semibold ${defaultLinkIndex === idx ? "text-blue-600" : ""
                  }`}
                href="#"
                onClick={() => handleItemClick(value)} // Handle click event
              >
                <span className="p-2">{value.name}</span>
                <div className="pr-[24px] sm:hidden">
                  <Image src={"/Ayatrio updated icon/backarrow.svg"} height={15} width={15} />
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
      {(props.hoveredIndex === 3 || props.hoveredIndex == 4 || props.hoveredIndex == 5) && (
        <div
          initial={
            typeof window !== "undefined" &&
            window.innerWidth > 800 && { y: -10, opacity: 0 }
          }
          whileInView={{ y: 0, opacity: 1 }}
          className="absolute top-[2.7rem]  bg-white flex flex-col mt-[15px] md:flex-row noto-sans-200 transition-all duration-300 ease-linear w-full md:left-0 min-h-[10rem] md:h-auto "
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
