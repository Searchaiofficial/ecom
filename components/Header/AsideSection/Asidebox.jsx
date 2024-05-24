import React, { useEffect, useState } from "react";
import Link from "next/link";
import Displaybox from "./Displaybox";
import axios from "axios";

const Asidebox = (props) => {
  const [asideCategory, setAsideCategory] = useState(null);
  // let asideCategory;
  let parentCategory;
  switch (props.hoveredIndex) {
    case 0:
      parentCategory = "homedecor";
      // asideCategory = homeDecorCategoryData;
      break;
    case 1:
      parentCategory = "walldecor";
      // asideCategory = wallDecorCategoryData;
      break;
    case 2:
      parentCategory = "flooring";
      // asideCategory = flooringCategoryData;
      break;
    // default:
    //   setAsideCategory(null);
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
          className="absolute top-[2.7rem]  p-4 bg-white flex flex-col mt-[15px] md:flex-row noto-sans-200 transition-all duration-300 ease-linear w-full md:left-0 min-h-[20rem] md:h-auto md:px-10"
        >
          <aside
            className="absolute top-[2.8rem] w-[15%] md:top-0 md:static md:border-r md:pr-10 md:py-4"
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
                className={`block p-2 text-[14px] font-semibold ${defaultLinkIndex === idx ? "text-blue-600" : ""
                  }`}
                href="#"
                onClick={() => setInnerData(true)}
              >
                <span>{value.name}</span>
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
              setAsideCategory={setAsideCategory}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Asidebox;
