"use client";

import MultiCardServiceContent from "../compounds/MultiCardServiceContect";

const { useRef, useEffect } = require("react");

const MultiCardServiceSlider = ({ data }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const params = {
      centeredSlides: false,
      spaceBetween: 10,
      navigation: {
        nextEl: ".right",
        prevEl: ".back",
      },
      noSwiping: false,
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
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4.5,
          spaceBetween: 10,
        },
      },
      allowSlideNext: true,
      allowSlidePrev: true,
      noSwiping: true,
      touchRatio: 1,
      touchReleaseOnEdges: true,
      resistanceRatio: 0.85,
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);

      swiperRef.current.initialize?.();
    }
  }, [swiperRef, swiperRef.current]);

  return (
    <swiper-container
      init="false"
      style={{ "--swiper-navigation-size": "24px" }}
      ref={swiperRef}
    >
      {data.map((data) => {
        return (
          <swiper-slide key={data.id}>
            <MultiCardServiceContent
              title={data.headerTitle}
              iconPath={data.iconPath}
              iconSize={data.iconSize}
            />
          </swiper-slide>
        );
      })}
    </swiper-container>
  );
};

export default MultiCardServiceSlider;
