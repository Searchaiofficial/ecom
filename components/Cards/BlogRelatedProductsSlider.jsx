"use client";

import { useEffect, useRef } from "react";
import Card from "./card";

const BlogRelatedProductsSlider = ({ data }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const params = {
      slidesPerView: 4.08,
      centeredSlides: false,
      spaceBetween: 5,
      navigation: {
        nextEl: ".custom-next-button",
        prevEl: ".custom-prev-button",
      },
      noSwiping: true,
      allowSlidePrev: true,
      allowSlideNext: true,
      mousewheel: {
        forceToAxis: true,
        invert: false,
      },
      freeMode: {
        enabled: false,
        sticky: true,
        momentum: true,
        momentumRatio: 0.5,
        momentumBounceRatio: 0.5,
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
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);

      swiperRef.current.initialize?.();
    }
  }, [swiperRef, swiperRef.current]);

  return (
    <swiper-container init="false" ref={swiperRef}>
      {!data ? (
        <swiper-slide>
          <div className="flex"></div>
        </swiper-slide>
      ) : (
        data.map((product, idx) => {
          return (
            <swiper-slide
              key={idx}
              style={{
                marginLeft: "0px",
              }}
            >
              <div className="grid grid-cols-1 w-full h-full fade-in ">
                <Card
                  title={product.productTitle}
                  productImages={product.productImages}
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
                  // inCart={inCart}
                  unitType={product.unitType}
                  productType={product.productType}
                  expectedDelivery={product.expectedDelivery}
                  discountedprice={product.discountedprice}
                  offer={product.offer}
                />
              </div>
            </swiper-slide>
          );
        })
      )}
    </swiper-container>
  );
};

export default BlogRelatedProductsSlider;
