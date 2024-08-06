"use client";

import { useEffect, useRef } from "react";
import Card from "./card";
import { viewItemList } from "@/tag-manager/events/view_item_list";

const TrendingSlider = ({ trendingData, isProductInCart, setPopupVisible }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const params = {
      centeredSlides: false,
      spaceBetween: 12,
      navigation: {
        nextEl: ".custom-next-button",
        prevEl: ".custom-prev-button",
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
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      },
      allowSlideNext: true,
      allowSlidePrev: true,
      noSwiping: true,
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);

      swiperRef.current.initialize?.();
    }
  }, [swiperRef, swiperRef.current]);

  useEffect(() => {
    if (trendingData?.length) {
      viewItemList({
        items: trendingData.map((product) => ({
          item_id: product._id,
          item_name: product.productTitle,
          item_category: product.category,
          price: product.perUnitPrice,
          currency: "INR",
          quantity: 1,
        })),
        itemListId: "trending",
        itemListName: "Trending",
      });
    }
  }, [trendingData]);

  return (
    <div>
      <swiper-container
        init="false"
        ref={swiperRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {!trendingData?.length ? (
          <swiper-slide>
            <div className="flex"></div>
          </swiper-slide>
        ) : (
          trendingData.map((product, idx) => {
            const inCart = isProductInCart(product?._id);

            return (
              <>
                <swiper-slide
                  key={idx}
                  style={{
                    marginLeft: "0px",
                  }}
                >
                  <div className="grid grid-cols-1 w-full h-full fade-in">
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
                      inCart={inCart}
                      unitType={product.unitType}
                      productType={product.productType}
                      expectedDelivery={product.expectedDelivery}
                      discountedprice={product.discountedprice}
                      offer={product.offer}
                      urgency={product.urgency}
                    />
                  </div>
                </swiper-slide>
              </>
            );
          })
        )}
      </swiper-container>
      <div className="swiper-scrollbar-custom h-[2px]"></div>
    </div>
  );
};

export default TrendingSlider;
