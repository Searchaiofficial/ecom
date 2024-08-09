import Image from "next/image";
import React from "react";
import axios from "axios";
import CategorySliderSwiper from "./CategorySliderSwiper";

const CategoriesSlider = async () => {
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trendingCategories`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const categories = await fetchCategory();
  return (
    <div className="flex items-center justify-start">
      <div className=" pt-[2rem] lg:pt-[52px] pl-[15px]  overflow-x-auto  relative w-full">
        {categories.length > 0 && (
          <div className="flex flex-row group items-center justify-end gap-2 lg:mb-4">
            <div className="back rounded-full   group-hover:opacity-60  opacity-0  absolute left-5 z-10">
              <Image
                loading="lazy"
                src="/icons/backarrowhite.svg"
                width={20}
                height={20}
                alt="Arrow"
                className=" h-[28px] lg:-mt-5  mb-[50px] sm:mb-0  w-[28px] "
              />
            </div>
            <CategorySliderSwiper categories={categories} />
            <div className="right rounded-full   group-hover:opacity-60 opacity-0   absolute right-5 z-10">
              <Image
                loading="lazy"
                src="/icons/rightarro-white.svg"
                width={20}
                height={20}
                alt="Arrow"
                className="  h-[28px] lg:-mt-5 -mt-10 w-[28px] "
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesSlider;
