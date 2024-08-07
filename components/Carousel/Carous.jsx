import React, { useState, useEffect, useRef } from "react";
import { Pagination, Scrollbar, Mousewheel, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
// import { useScrollPosition } from "react-scroll-position";
// import Cards from '../components/Cards';
import axios from "axios";
import Card from "../Cards/card";
// import imageurl1.jpg from '..
// import image from "../assets/roomswiper.jpg";

const Carous = ({ data }) => {
  const [showFilter, setShowFilter] = useState(true);
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
  const swiperOptions3 = {
    slidesPerView: 1,
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
  const swiperRef = useRef(null);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setShowFilter(
        currentScrollPos <= prevScrollPos || currentScrollPos < 100
      );
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [showHeader, setShowHeader] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setShowHeader(
        currentScrollPos <= prevScrollPos || currentScrollPos < 100
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

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
