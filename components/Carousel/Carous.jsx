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
import ItemCard from "../Item/ItemCard";
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/relatedproducts?category=${data.category}`
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
  const swiperOptions2 = {
    slidesPerView: 4,
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

  // const [showHeader, setShowHeader] = useState(true);

  // // This hook will update the showHeader state based on scroll position
  // useScrollPosition(({ prevPos, currPos }) => {
  //   setShowHeader(currPos.y > prevPos.y || currPos.y < 100);
  // });

  const [showHeader, setShowHeader] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setShowHeader(
        currentScrollPos <= prevScrollPos || currentScrollPos < 100
      );
      setPrevScrollPos(currentScrollPos);
    };

    // Add event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]); // Dependency on prevScrollPos to update the effect when it changes
  // const [showHeader, setShowHeader] = useState(true);
  // console.log(relatedData)
  return (
    <>
      <div className="sm:w-full w-[80vw] sm:block hidden">

        <h1 className="mb-6 text-xl mt-5 font-semibold ml-1">Similar products</h1>
        <div className="swiper2 mt-5 sm:block hidden">
          <Swiper
            {...swiperOptions2}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {isLoading ? (
              <SwiperSlide>
                <div className="flex">Loading...</div>
              </SwiperSlide>
            ) : (
              relatedData.map((product, idx) => (
                <SwiperSlide key={idx}>
                  <div className="grid grid-cols-1 mt-2 h-full fade-in">
                    <Card
                      title={product.productName}
                      // date={product.date}
                      price={product.perUnitPrice}
                      desc={product.productTitle}
                      imgSrc={product.images}
                      rating={product.ratings}
                      key={idx}
                      id={product._id}
                      category={product.category}
                      productId={product.productId}
                      setPopupVisible={setPopupVisible}
                      cssClass={"card1flex"}
                    />
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
        {/* swiper only for mobile */}
        <div className="swiper3 mt-10 sm:hidden block">
          <Swiper
            {...swiperOptions3}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {isLoading ? (
              <SwiperSlide>
                <div className="flex">Loading...</div>
              </SwiperSlide>
            ) : (
              relatedData.map((product, idx) => (
                <SwiperSlide key={idx}>
                  <div className="grid grid-cols-1 mt-2 h-full fade-in">
                    <ItemCard
                      title={product.productTitle}
                      price={product.perUnitPrice}
                      desc={product.subcategory}
                      imgSrc={product.images[0]}
                      imagesArr={product.images}
                      rating={
                        product.ratings.length > 0 ? product.ratings[0] : 0
                      }
                      key={idx}
                      setPopupVisible={setPopupVisible}
                      cssClass={"card1flex"}
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
