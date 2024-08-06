import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { viewItemList } from "@/tag-manager/events/view_item_list";
import DataSliderSwiper from "./DataSliderSwiper";

const Dataslider = ({ category, data, sliderIndex }) => {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const Data = data.filter((item) => item.subcategory !== "Accessories");
    if (Data.length > 0) {
      setProductData(Data);
    }
  }, [data]);

  useEffect(() => {
    if (productData.length > 0) {
      viewItemList({
        items: productData.map((product) => ({
          item_id: product._id,
          item_name: product.productTitle,
          item_category: product.category,
          price: product.perUnitPrice,
          currency: "INR",
          quantity: 1,
        })),
        itemListId: "category-slider" + category,
        itemListName: category,
      });
    }
  }, [productData]);
  return (
    <div>
      <div className=" bg-white mt-[30px] lg:mt-0  px-[15px] ">
        <div className="w-full flex justify-between items-center">
          <h2 className="font-semibold text-2xl pb-[20px] pt-[30px]">
            {category}
          </h2>
          <div className="Slidenav flex text-2xl cursor-pointer text-white rounded-full gap-2">
            <div
              className={`custom-prev-button-${sliderIndex} hover:bg-400 hover:scale-110 hover:text-slate-100 pr-6`}
            >
              <Image
                loading="lazy"
                src="/icons/backarrowblack.svg"
                width={20}
                height={20}
                alt="Arrow"
                className="rounded-full h-7 w-7 sm:block hidden"
              />
            </div>
            <div
              className={`custom-next-button-${sliderIndex} hover:bg-400 sm:translate-y-0 translate-y-10 hover:scale-110 hover:text-slate-100`}
            >
              <Image
                loading="lazy"
                src="/icons/rightarrowblack.svg"
                width={20}
                height={20}
                alt="Arrow"
                className=" rounded-full h-7 w-7 sm:block hidden"
              />
            </div>
          </div>
        </div>{" "}
        <DataSliderSwiper productData={productData} sliderIndex={sliderIndex} />
        {/* <div className="">
          {itm1.map((item) => (
            <div key="item.label._id" className="flex flex-row gap-5">
              <p>Category: {item.parentCategory}</p>
              <p>Name: {item.label.name} </p>
              <img src={item.label.img} alt="" width={150} height={150} />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Dataslider;
