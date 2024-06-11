import Card from "./card";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import { Pagination, Scrollbar, Mousewheel, FreeMode } from "swiper/modules";

const Blinds = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const swiperOptions = {
    slidesPerView: 3.2,
    centeredSlides: false,
    spaceBetween: 1,
    modules: [Pagination, Scrollbar, Mousewheel, FreeMode],
    navigation: {
      nextEl: ".custom-next-button",
      prevEl: ".custom-prev-button",
    },
    noSwiping: true,
    allowSlidePrev: true,
    allowSlideNext: true,
  };

  const closePopup = () => {
    setPopupVisible(false);
  };
  const swiper1Ref = useRef(null);
  const swiper2Ref = useRef(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  const [blindsProducts, setBlindsProducts] = useState([]);
  return (
    <div>
      {blindsProducts && (
        <div className="my-10  bg-white sm:px-[50px] px-[20px]">
          <div className="w-full flex justify-between items-center">
            <h2 className="font-semibold text-2xl py-[5px]">
              {blindsProducts ? "Blinds" : ""}
            </h2>
            <div className="Slidenav flex bg-white text-2xl cursor-pointer  text-white rounded-full gap-2">
              <div
                onClick={() => swiper2Ref.current.swiper.slidePrev()}
                className="custom-prev-button hover:bg-400 hover:scale-110 hover:text-slate-100  "
              >
                <img className="w-8 h-8" src="/icons/backarrow.svg" alt="left" />
              </div>
              <div
                onClick={() => swiper2Ref.current.swiper.slideNext()}
                className="custom-next-button hover:bg-400 hover:scale-110 hover:text-slate-100"
              >
                <img className="w-7 h-9" src="/icons/backarrowRevarce.svg" alt="right" />
              </div>
            </div>
          </div>

          <Swiper
            scrollbar={{
              hide: false,

              draggable: true,
            }}
            mousewheel={{
              forceToAxis: true,
              invert: false,
            }}
            allowSlidePrev={true}
            allowSlideNext={true}
            slideNextClass="custom-next-button"
            slidePrevClass="custom-prev-button"
            ref={swiper2Ref}
            onSwiper={setSwiperRef}
            {...swiperOptions}
            className="mySwiper  pl-5"
          >
            {isLoading ? (
              <SwiperSlide>
                <div className="flex">""</div>
              </SwiperSlide>
            ) : (
              blindsProducts.map((product, idx) => {
                return (
                  <SwiperSlide key={idx} className="">
                    <div className="grid grid-cols-1 mt-2 h-full fade-in">
                      <Card
                        title={product.productName}
                        // date={product.date}
                        price={product.price}
                        desc={product.subcategory}
                        imgSrc={product.images}
                        rating={product.ratings}
                        key={idx}
                        setPopupVisible={setPopupVisible}
                        cssClass={"card1flex"}
                      />
                    </div>
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Blinds;
