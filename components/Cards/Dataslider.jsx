import Card from "./card";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import { useSelector } from "react-redux";
import { Pagination, Scrollbar, Mousewheel, FreeMode } from "swiper/modules";
import {
  Items1selected,
  Items2selected,
  Items3selected,
} from "../Features/Slices/selectedItemsSlice";

const Dataslider = ({ category, data, sliderIndex }) => {
  const itm1 = useSelector(Items1selected);
  // console.log("from selecteditems1", itm1);

  const itm2 = useSelector(Items2selected);
  // console.log("from selecteditems2", itm2);

  const itm3 = useSelector(Items3selected);
  // console.log("from selecteditems3", itm3);

  const swiperRef = useRef(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const swiperOptions = {
    slidesPerView: 3,
    centeredSlides: false,
    spaceBetween: 5,
    modules: [Pagination, Scrollbar, Mousewheel, FreeMode],
    navigation: {
      nextEl: `.custom-next-button-${sliderIndex}`,
      prevEl: `.custom-prev-button-${sliderIndex}`,
    },
    noSwiping: true,
    allowSlidePrev: true,
    allowSlideNext: true,
  };

  const [productData, setProductData] = useState([]);
  useEffect(() => {
    setProductData(data);
  }, [data]);

  useEffect(() => {
    // console.log(productData);
  }, []);
  return (
    <div>
      <div className=" bg-white sm:px-[50px] px-[20px] mt-10">
        <div className="w-full flex justify-between items-center">
          <h2 className="font-semibold text-2xl py-[30px]">{category}</h2>
          <div className="Slidenav flex text-2xl cursor-pointer text-white rounded-full gap-2">
            <div
              onClick={() => swiperRef.current.swiper.slidePrev()}
              className={`custom-prev-button-${sliderIndex} hover:bg-400 hover:scale-110 hover:text-slate-100 pr-6`}
            >
              <Image
                src="/ayatrio icon/left icon.svg"
                width={20}
                height={20}
                alt="Arrow"
                className="bg-gray-300 rounded-full h-7 w-7 sm:block hidden"
              />
            </div>
            <div
              onClick={() => swiperRef.current.swiper.slideNext()}
              className={`custom-next-button-${sliderIndex} hover:bg-400 sm:translate-y-0 translate-y-10 hover:scale-110 hover:text-slate-100`}
            >
              <Image
                src="/ayatrio icon/right icon.svg"
                width={20}
                height={20}
                alt="Arrow"
                className="bg-gray-300 rounded-full h-7 w-7 sm:block hidden"
              />
            </div>
          </div>
        </div>{" "}
        <Swiper
          scrollbar={{
            hide: false,
            draggable: true,
          }}
          mousewheel={{
            forceToAxis: true,
            invert: false,
          }}
          breakpoints={{
            400: {
              slidesPerView: 1.2,
              spaceBetween: 5,
            },

            1024: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
          }}
          allowSlidePrev={true}
          allowSlideNext={true}
          slideNextClass={`custom-next-button-${sliderIndex}`}
          slidePrevClass={`custom-prev-button-${sliderIndex}`}
          ref={swiperRef}
          {...swiperOptions}
          className="mySwiper pl-5 overflow-x-auto"
        >
          {!productData ? (
            <div>
              <h1>loading</h1>
            </div>
          ) : (
            productData.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="grid grid-cols-1 mt-2 h-full fade-in ">
                  <Card
                    cardkey={product._id}
                    title={product.productTitle}
                    price={product.perUnitPrice}
                    desc={product.subcategory}
                    productId={product.productId}
                    imgSrc={product.images}
                    rating={product.ratings}
                    id={product._id}
                    setPopupVisible={setPopupVisible}
                    cssClass={"card1flex"}
                  />
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
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
