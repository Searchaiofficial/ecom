import React, { useEffect, useState } from "react";
import ListContent from "./ListContent";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const Displaybox = (props) => {
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState("");

  const handleClick = (value) => {
    // const category = value.replace(/\s+/g, "-").toLowerCase();
    if (window.innerWidth < 800) {
      props.toggleMobileMenu();
    }
    // handleIncrementCategoryPopularity();
    // handleIncrementSubCategoryPopularity(value);
    const category = value.replace(/ /g, "-");
    const newPath = `/${props.parentCategory}/${currentCategory}/${category}`;
    router.push(newPath);
    props.setAsideCategory(null);
    props.HandleClick(false);
    if (window.innerWidth > 800) {
      props.handleChange(false);
    }
  };

  useEffect(() => {
    if (props.data.name) {
      const category = props.data.name.replace(/ /g, "-");
      setCurrentCategory(category);
    }
  }, [props.data.name]);

  // const handleIncrementCategoryPopularity = async () => {
  //   try {
  //     await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/incrementCategoryPopularity?category=${props.data.name}`
  //     );
  //   } catch (error) {
  //     console.error("Error incrementing category popularity:", error);
  //   }
  // };

  // const handleIncrementSubCategoryPopularity = async (subCategory) => {
  //   try {
  //     const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/incrementSubCategoryPopularity?category=${props.data.name}&subCategory=${subCategory}`;
  //     console.log(url);
  //     const encodedUrl = encodeURI(url);
  //     await axios.get(encodedUrl);
  //   } catch (error) {
  //     console.error("Error incrementing category popularity:", error);
  //   }
  // };

  return (
    <main className="w-full noto-sans-200 h-full border-l px-4">
      <h1 className="lg:text-[14px] text-[18px] p-2 mb-2 font-semibold w-full">
        {props.data?.name}
      </h1>
      <div className="grid grid-cols-2 gap-3 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {props.data?.subcategories && props.data.subcategories.length > 0 ? (
          props.data.subcategories.map((item, index) => (
            <div
              key={index}
              className="flex flex-row gap-1 lg:gap-4 p-2 items-center cursor-pointer hover:bg-[#f5f5f5]  min-w-[200px]"
              onClick={() => handleClick(item.name)}
            >
              <Image
                src={item.img}
                alt={item.name}
                width={100}
                height={100}
                className="w-[50px] h-[56px] bg-transparent"
              />
              <h2 className="text-[14px] font-normal text-[#111111] lg:justify-start">
                {item.name}
              </h2>
            </div>
          ))
        ) : (
          <p className="text-lg text-center font-medium">No data available</p>
        )}
      </div>
    </main>
  );
};

export default Displaybox;
