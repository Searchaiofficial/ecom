import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const CategorySlider = ({ categories }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const params = {
      slidesPerView: 4.08,
      centeredSlides: false,
      spaceBetween: 5,
      navigation: {
        nextEl: ".right",
        prevEl: ".back",
      },
      draggable: true,
      breakpoints: {
        300: {
          slidesPerView: Math.min(categories?.length, 3.2),
          spaceBetween: 10,
        },
        768: {
          slidesPerView: Math.min(categories?.length, 3),
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: Math.min(categories?.length, 8),
          spaceBetween: 10,
        },
      },
      mousewheel: {
        forceToAxis: true,
        invert: false,
      },
    };

    Object.assign(swiperRef.current, params);

    swiperRef.current.initialize();
  }, []);

  return (
    <div className="w-full category-slider">
      <swiper-container
        ref={swiperRef}
        init="false"
        className="swiper-test"
        style={{
          "--swiper-navigation-size": "24px",
          maxHeight: "180px",
          marginTop: "12px",
        }}
      >
        {categories?.map((curElement, idx) => {
          return (
            <swiper-slide key={idx}>
              <Link
                href={`/${curElement.name.replace(/ /g, "-")}/category/all`}
              >
                <div className="flex flex-col  items-center ">
                  <div className="mb-[12px] ">
                    <Image
                      src={curElement.image || "/images/temp.svg"}
                      width={200}
                      height={130}
                      alt={"category image"}
                      className="w-[200px] h-[62px] lg:h-[95px] "
                    />
                  </div>
                  <h2 className="text-[#333333] lg:text-center line-clamp-1 font-semibold text-[14px] hover:underline">
                    {curElement.name}
                  </h2>
                </div>
              </Link>
            </swiper-slide>
          );
        })}
      </swiper-container>
    </div>
  );
};

export default CategorySlider;
