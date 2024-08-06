"use client";

import { useRef, useEffect } from "react";
import MultiCardContent from "../compounds/MultiCardContent";

const MulticardSlider = ({ multicardData }) => {
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
      scrollbar: {
        el: ".swiper-scrollbar-custom",
        draggable: true,
      },
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
          slidesPerView: 3.5,
          spaceBetween: 10,
        },
      },
      allowSlideNext: true,
      allowSlidePrev: true,
      noSwiping: true,
    };

    Object.assign(swiperRef.current, params);

    swiperRef.current.initialize();
  }, []);

  return (
    <swiper-container
      init="false"
      style={{ "--swiper-navigation-size": "24px" }}
      ref={swiperRef}
    >
      {multicardData.map((curElement, idx) => {
        return (
          <swiper-slide key={idx}>
            <MultiCardContent
              title={curElement.title}
              text={curElement.description}
              iconPath={curElement.icon}
              iconSize={40}
            />
          </swiper-slide>
        );
      })}
    </swiper-container>
  );
};

export default MulticardSlider;
