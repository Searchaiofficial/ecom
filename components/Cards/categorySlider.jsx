"use client"
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

// import MultiCardContent from "../compounds/MultiCardContent";
// import { useSelector, useDispatch } from "react-redux";
// import { selectMultiCardData } from "../Features/Slices/multiCardSlice";
import Link from "next/link";
import axios from "axios";


const data = [
    {
        id: 1,
        title: "IPad",
        image: "/images/temp.svg"
    },
    {
        id: 2,
        title: "IPad",
        image: "/images/temp.svg"
    },
    {
        id: 3,
        title: "IPad",
        image: "/images/temp.svg"
    },
    {
        id: 4,
        title: "IPad",
        image: "/images/temp.svg"
    },
    {
        id: 5,
        title: "IPad",
        image: "/images/temp.svg"
    },
    {
        id: 6,
        title: "IPad",
        image: "/images/temp.svg"
    },

]


const CategoriesSlider = () => {
    const swiper1Ref = useRef(null);
    const [categories, setCategories] = useState([])
    // const multiCardData = useSelector(selectMultiCardData);
    // const dispatch = useDispatch();
    // useEffect(() => { 
    //     if (multiCardData.length === 0) {
    //         dispatch({ type: "FETCH_MULTICARD_REQUEST", payload: "multiCard" });
    //     }
    // }, [])


    const fetchCategory = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trendingCategories`

            );
            console.log("categories", response.data);

            if (response.data && response.data.length > 0) {
                setCategories(response.data);
            }

        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    // const handleIncrementCategoryPopularity = async (categoryName) => {
    //     try {
    //         await axios.get(
    //             `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/incrementCategoryPopularity?category=${categoryName}`
    //         );
    //     } catch (error) {
    //         console.error("Error incrementing category popularity:", error);
    //     }
    // };


    useEffect(() => {
        fetchCategory()
    }, [])

    const breakpoints = {
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
    };

    const swiperOptions2 = {
        slidesPerView: 4.08,
        centeredSlides: false,
        spaceBetween: 5,
        modules: [Pagination, Scrollbar, Mousewheel, FreeMode],
        navigation: {
            nextEl: ".custom-next-button",
            prevEl: ".custom-prev-button",
        },
        noSwiping: false,
        allowSlidePrev: true,
        allowSlideNext: true,
    };



    return (
        <div className="flex items-center justify-start">
            <div className=" pt-[2rem] lg:pt-[52px] pl-[15px]  overflow-x-auto  relative">
                {
                    categories.length > 0 && (
                        <div className="flex flex-row group items-center justify-end gap-2 lg:mb-4">
                            <div className="back rounded-full   group-hover:opacity-60  opacity-0  absolute left-5 z-10">
                                <Image loading="lazy"
                                    src="/icons/backarrow-w.svg"
                                    width={20}
                                    height={20}
                                    alt="Arrow"
                                    className=" h-[28px] lg:-mt-5  mb-[50px] sm:mb-0  w-[28px] "
                                />

                            </div>
                            <Swiper
                                ref={swiper1Ref}
                                {...swiperOptions2}
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                navigation={{
                                    nextEl: ".right",
                                    prevEl: ".back",
                                }}
                                sticky={true}
                                draggable={true}
                                style={{ "--swiper-navigation-size": "24px", maxHeight: "180px" }}
                                breakpoints={breakpoints}
                                // scrollbar={{
                                //     hide: false,
                                //     draggable: true,
                                // }}

                                mousewheel={{
                                    forceToAxis: true,
                                    invert: false,
                                }}
                                freeMode={{
                                    enabled: false,
                                    sticky: true,
                                }}
                                className="mt-[12px]"
                            >
                                {categories?.map((curElement, idx) => {
                                    return (
                                        <SwiperSlide className=" max-w-[100px] lg:max-w-[120px] mr-[10px] min-h-[95px] mb-[30px] md:mb-0 " key={idx}>
                                            <Link href={`/${curElement.name.replace(/ /g, "-")}/category/all`}
                                                // onClick={() => handleIncrementCategoryPopularity(curElement.name)}
                                            >
                                                <div className="flex flex-col  items-center ">
                                                    <div className="mb-[12px] ">

                                                        <Image src={curElement.image || "/images/temp.svg"} width={200} height={130} alt={curElement.name || "Swiper image"} className="w-[200px] h-[62px] lg:h-[95px] " />

                                                    </div>
                                                    <h2 className="text-[#333333] lg:text-center line-clamp-1 font-semibold text-[14px] hover:underline">{curElement.name}</h2>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                            <div className="right rounded-full   group-hover:opacity-60 opacity-0   absolute right-5 z-10">
                                <Image loading="lazy"
                                    src="/icons/rightarrow-w.svg"
                                    width={20}
                                    height={20}
                                    alt="Arrow"
                                    className="  h-[28px] lg:-mt-5 -mt-10 w-[28px] "
                                />

                            </div>

                        </div>
                    )
                }
            </div>
        </div>


    );
}

export default CategoriesSlider;