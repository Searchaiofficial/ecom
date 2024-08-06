"use client";

import { useEffect, useRef } from "react";
import UserReviewPostsCard from "./UserReviewPostsCard";

const UserReviewSlider = ({ data, slidesPerView, handleClick }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const params = {
      centeredSlides: false,
      spaceBetween: 12,
      navigation: {
        nextEl: `.custom-next-button`,
        prevEl: `.custom-next-button`,
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
          slidesPerView: 1.1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: slidesPerView,
          spaceBetween: 10,
        },
      },
      noSwiping: true,
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
        paddingInline: "10px",
      }}
    >
      {!data ? (
        <swiper-slide>
          <div className="flex"></div>
        </swiper-slide>
      ) : (
        data.length > 0 &&
        data?.map((item, idx) => {
          return (
            <swiper-slide
              key={idx}
              style={{
                marginLeft: "0px",
              }}
              onClick={() => handleClick(item)}
            >
              <div className="">
                <UserReviewPostsCard
                  username={item.username}
                  imgSrc={item.mediaUrl}
                  id={item._id}
                  alt={item.categoryName}
                />
              </div>
            </swiper-slide>
          );
        })
      )}
    </swiper-container>
  );
};

export default UserReviewSlider;
