"use client";

import { useEffect, useRef } from "react";
import Card from "../../components/Cards/card";

const AccessoriesSlider = ({ accessories }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const params = {
      centeredSlides: false,
      spaceBetween: 1,
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
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3.5,
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
    <swiper-container
      init="false"
      ref={swiperRef}
      style={{
        maxWidth: "768px",
        marginRight: "auto",
        marginLeft: "0",
      }}
    >
      {accessories &&
        accessories.length > 0 &&
        accessories.map((product, idx) => (
          <swiper-slide key={idx}>
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
              id={product._id}
              category={product.category}
              productId={product.productId}
              cssClass={"card1flex"}
              unitType={product.unitType}
              productType={product.productType}
              expectedDelivery={product.expectedDelivery}
              discountedprice={product.discountedprice}
              offer={product.offer}
              urgency={product.urgency}
            />
          </swiper-slide>
        ))}
    </swiper-container>
  );
};

export default AccessoriesSlider;
