import React, { useState, useEffect, useRef } from "react";
import { Pagination, Scrollbar, Mousewheel, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import axios from "axios";
import Card from "../Cards/card";

const Carous = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [relatedData, setrelatedData] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchProductsByCategory/${data.category}`
        );
        setrelatedData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [data]);

  const [newRelatedData, setNewrelatedData] = useState([]);

  useEffect(() => {
    const Data = relatedData.filter(
      (item) => item.subcategory !== "Accessories"
    );
    console.log(Data);
    if (Data.length > 0) {
      setNewrelatedData(Data);
    }
  }, [relatedData]);

  const swiperOptions2 = {
    slidesPerView: 4,
    centeredSlides: false,
    spaceBetween: 10,
    modules: [Pagination, Scrollbar, Mousewheel, FreeMode],
    navigation: {
      nextEl: ".custom-next-button",
      prevEl: ".custom-prev-button",
    },
    noSwiping: true,
    allowSlidePrev: true,
    allowSlideNext: true,
  };

  const swiperRef = useRef(null);

  return (
    <>
      <div className="w-full">
        <h2 className="mb-4 text-xl mt-5 font-semibold">Similar products</h2>
        <div className="swiper2 mt-5 sm:block block">
          <Swiper
            {...swiperOptions2}
            breakpoints={{
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
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {isLoading ? (
              <SwiperSlide>
                <div className="flex">Loading...</div>
              </SwiperSlide>
            ) : (
              newRelatedData.map((product, idx) => (
                <SwiperSlide key={idx}>
                  <div className="grid grid-cols-1 mt-2 h-full fade-in">
                    <Card
                      title={product.productTitle}
                      productImages={product?.productImages}
                      specialPrice={product?.specialprice}
                      price={product.perUnitPrice}
                      desc={product.productTitle}
                      shortDescription={product.shortDescription}
                      demandtype={product.demandtype}
                      imgSrc={product.images}
                      rating={product.ratings}
                      key={idx}
                      id={product._id}
                      category={product.category}
                      productId={product.productId}
                      setPopupVisible={setPopupVisible}
                      cssClass={"card1flex"}
                      discountedprice={product.discountedprice}
                      unitType={product.unitType}
                      productType={product.productType}
                      expectedDelivery={product.expectedDelivery}
                      urgency={product.urgency}
                    />
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Carous;
