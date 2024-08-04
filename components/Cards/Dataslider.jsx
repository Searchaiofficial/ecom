import Card from "./card";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import "./styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import { viewItemList } from "@/tag-manager/events/view_item_list";

const Dataslider = ({ category, data, sliderIndex }) => {
  const swiperRef = useRef(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const Data = data.filter((item) => item.subcategory !== "Accessories");
    if (Data.length > 0) {
      setProductData(Data);
    }
  }, [data]);

  useEffect(() => {
    register();

    const params = {
      centeredSlides: false,
      spaceBetween: 10,
      noSwiping: true,
      scrollbar: {
        el: `.swiper-scrollbar-dataslider-${sliderIndex}`,
        draggable: true,
      },
      mousewheel: {
        forceToAxis: true,
        invert: false,
      },
      breakpoints: {
        300: {
          slidesPerView: 1.2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      },
      allowSlidePrev: true,
      allowSlideNext: true,
      navigation: {
        nextEl: `.custom-next-button-${sliderIndex}`,
        prevEl: `.custom-prev-button-${sliderIndex}`,
      },
    };

    Object.assign(swiperRef.current, params);

    swiperRef.current.initialize();
  }, []);

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
                src="/icons/left-icon.svg"
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
                src="/icons/right-icon.svg"
                width={20}
                height={20}
                alt="Arrow"
                className=" rounded-full h-7 w-7 sm:block hidden"
              />
            </div>
          </div>
        </div>{" "}
        <swiper-container
          init="false"
          ref={swiperRef}
          className="mySwiper pl-5 overflow-x-auto"
        >
          {!productData ? (
            <div>
              <h1>loading</h1>
            </div>
          ) : (
            productData.map((product) => (
              <swiper-slide key={product._id}>
                <div className="grid grid-cols-1 mt-2 h-full fade-in ">
                  <Card
                    cardkey={product._id}
                    specialPrice={product?.specialprice}
                    title={product.productTitle}
                    price={product.perUnitPrice}
                    desc={product.subcategory}
                    productId={product.productId}
                    demandtype={product.demandtype}
                    imgSrc={product.images}
                    rating={product.ratings}
                    id={product._id}
                    setPopupVisible={setPopupVisible}
                    cssClass={"card1flex"}
                    productImages={product?.productImages}
                    productType={product.productType}
                    expectedDelivery={product.expectedDelivery}
                    discountedprice={product.discountedprice}
                    shortDescription={product.shortDescription}
                    offer={product.offer}
                    urgency={product.urgency}
                  />
                </div>
              </swiper-slide>
            ))
          )}
        </swiper-container>
        <div
          className={`swiper-scrollbar-dataslider-${sliderIndex} h-[2px]`}
        ></div>
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
