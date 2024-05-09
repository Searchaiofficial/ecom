import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

import MultiCardContent from "../compounds/MultiCardContent";
import { useSelector, useDispatch } from "react-redux";
import { selectMultiCardData } from "../Features/Slices/multiCardSlice";
import Link from "next/link";
import axios from "axios";


const data = [
    {
        id: 1,
        title: "IPad",
        image: "/ayatrio icon/demo1.png"
    },
    {
        id: 2,
        title: "IPad",
        image: "/ayatrio icon/demo1.png"
    },
    {
        id: 3,
        title: "IPad",
        image: "/ayatrio icon/demo1.png"
    },
    {
        id: 4,
        title: "IPad",
        image: "/ayatrio icon/demo1.png"
    },
    {
        id: 5,
        title: "IPad",
        image: "/ayatrio icon/demo1.png"
    },
    {
        id: 6,
        title: "IPad",
        image: "/ayatrio icon/demo1.png"
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
                "http://localhost:4000/api/categories"
            );
            console.log("categories", response.data);

            if (response.data && response.data.length > 0) {
                setCategories(response.data);
            }

        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        fetchCategory()
    }, [])

    console.log(categories)


    return (
        <div>
            <div className=" pt-[5rem] sm:pl-[50px] pl-[20px]  overflow-x-auto  relative">
                {
                    categories.length > 0 && (
                        <div className="flex flex-row group items-center justify-end gap-2 mb-4">
                            <div className="back rounded-full  bg-[#d2d2d7a3]  group-hover:opacity-60 opacity-0  absolute left-5 z-10">
                                <Image
                                    src="/ayatrio icon/left-card.svg"
                                    width={20}
                                    height={20}
                                    alt="Arrow"
                                    className=" h-[48px]   w-[48px] "
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
                                style={{ "--swiper-navigation-size": "24px" }}
                                breakpoints={{
                                    400: {
                                        slidesPerView: 2.5,
                                        spaceBetween: 10,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 10,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 10,
                                    },
                                }}
                            >
                                {categories?.map((curElement, idx) => {

                                    return (
                                        <SwiperSlide className="max-w-[140px]" key={idx}>
                                            <Link href={""} className="">
                                                <div className="flex flex-col items-center">
                                                    <div className="lg:mb-[12px] ">
                                                        <Image src={curElement.image || "/ayatrio icon/demo1.png"} width={200} height={130} alt="image" className="w-[200px] h-[130px]" />
                                                    </div>
                                                    <h2 className="text-[#333333] font-semibold text-[14px] hover:underline">{curElement.name}</h2>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                            <div className="right rounded-full  bg-[#d2d2d7a3] group-hover:opacity-60 opacity-0   absolute right-5 z-10">
                                <Image
                                    src="/ayatrio icon/right-card.svg"
                                    width={20}
                                    height={20}
                                    alt="Arrow"
                                    className="  h-[48px]   w-[48px] "
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