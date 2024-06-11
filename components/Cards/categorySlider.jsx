"use client"
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "./styles.css";

// import MultiCardContent from "../compounds/MultiCardContent";
// import { useSelector, useDispatch } from "react-redux";
// import { selectMultiCardData } from "../Features/Slices/multiCardSlice";
import Link from "next/link";
import axios from "axios";


const data = [
    {
        id: 1,
        title: "IPad",
        image: "/images/demo1.png"
    },
    {
        id: 2,
        title: "IPad",
        image: "/images/demo1.png"
    },
    {
        id: 3,
        title: "IPad",
        image: "/images/demo1.png"
    },
    {
        id: 4,
        title: "IPad",
        image: "/images/demo1.png"
    },
    {
        id: 5,
        title: "IPad",
        image: "/images/demo1.png"
    },
    {
        id: 6,
        title: "IPad",
        image: "/images/demo1.png"
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

    const handleIncrementCategoryPopularity = async (categoryName) => {
        try {
            await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/incrementCategoryPopularity?category=${categoryName}`
            );
        } catch (error) {
            console.error("Error incrementing category popularity:", error);
        }
    };


    useEffect(() => {
        fetchCategory()
    }, [])



    return (
        <div className="flex items-center justify-start">
            <div className=" pt-[2rem] lg:pt-[52px] pl-[15px]  overflow-x-auto  relative">
                {
                    categories.length > 0 && (
                        <div className="flex flex-row group items-center justify-end gap-2 mb-4">
                            <div className="back rounded-full   group-hover:opacity-60  opacity-0  absolute left-5 z-10">
                                <Image
                                    src="/icons/left-card.svg"
                                    width={20}
                                    height={20}
                                    alt="Arrow"
                                    className=" h-[28px] -mt-5  w-[28px] "
                                />

                            </div>
                            <Swiper
                                ref={swiper1Ref}
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                navigation={{
                                    nextEl: ".right",
                                    prevEl: ".back",
                                }}
                                draggable={true}
                                style={{ "--swiper-navigation-size": "24px", maxHeight: "180px" }}
                                breakpoints={{
                                    300: {
                                        slidesPerView: 3.1,
                                        spaceBetween: 5,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 5,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 5,
                                    },
                                }}
                            >
                                {categories?.map((curElement, idx) => {
                                    return (
                                        <SwiperSlide className=" max-w-[100px] lg:max-w-[140px] mr-[10px] min-h-[148px] " key={idx}>
                                            <Link href={`/category/${curElement.name.replace(/ /g, "-")}/all`}
                                                onClick={() => handleIncrementCategoryPopularity(curElement.name)}
                                            >
                                                <div className="flex flex-col py-[16px] ">
                                                    <div className="mb-[12px] ">
                                                        <Image src={curElement.image || "/images/demo1.png"} width={200} height={130} alt={curElement.name || "Swiper image"} className="w-[200px] h-[62px] lg:h-[130px] " />
                                                    </div>
                                                    <h2 className="text-[#333333] lg:text-center line-clamp-1 font-semibold text-[14px] hover:underline">{curElement.name}</h2>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                            <div className="right rounded-full   group-hover:opacity-60 opacity-0   absolute right-5 z-10">
                                <Image
                                    src="/icons/right-card.svg"
                                    width={20}
                                    height={20}
                                    alt="Arrow"
                                    className="  h-[28px] -mt-5  w-[28px] "
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