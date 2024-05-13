"use client"
import React, { useRef, useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "./styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MultiCardContent from "../compounds/MultiCardContent";
import { useSelector, useDispatch } from "react-redux";
import { selectMultiCardData } from "../Features/Slices/multiCardSlice";
import MultiCardServiceContent from "../compounds/MultiCardServiceContect";

// a.Shop online with click and collect and delivery
// b.Furnishing Design service
// c.Measuring Service
// d.Installation Service
// f.Gif Card this 5 for bellow one

const data = [
    {
        id: 1,
        headerTitle: "Shop online with click and collect at store",
        iconPath: "/Ayatrio updated icon/click and collect.svg",
    },
    {
        id: 2,
        headerTitle: "Furnishing & Measuring service",
        iconPath: "/Ayatrio updated icon/meausaring.svg",
    },
    {
        id: 3,
        headerTitle: "Financing",
        iconPath: "/Ayatrio updated icon/payment.svg",
    },
    {
        id: 4,
        headerTitle: "buyback & resell",
        iconPath: "/Ayatrio updated icon/buy back.svg",
    },
    {
        id: 5,
        headerTitle: "warranty",
        iconPath: "/Ayatrio updated icon/warranty.svg",
    },
    {
        id: 6,
        headerTitle: "Installation Service",
        iconPath: "Ayatrio updated icon/instalation.svg",
    },
    {
        id: 7,
        headerTitle: "Gift registry",
        iconPath: "/Ayatrio updated icon/ayatrio giftcard.svg",
    },
    {
        id: 8,
        headerTitle: "Ayatrio Famaly Card",
        iconPath: "/Ayatrio updated icon/ayatrio giftcard.svg",
    },
]


const MulticardService = () => {
    const swiper1Ref = useRef(null);
    // const multiCardData = useState(data);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     if (multiCardData.length === 0) {
    //         dispatch({ type: "FETCH_MULTICARD_REQUEST", payload: "multiCard" });
    //     }
    // }, []);

    // console.log(multiCardData);

    return (
        <div>
            <div className="bg-zinc-50 pt-[5rem] pl-[20px] sm:pl-[50px]  lg:pl-[80px] overflow-x-auto pb-[80px] lg:pb-[80px]">
                <div className="text-2xl flex flex-col gap-[2px]  font-semibold w-full pb-8">
                    <p>Service and Financial help on shopping</p>
                </div>
                <Swiper
                    ref={swiper1Ref}
                    mousewheel={{
                        forceToAxis: true,
                        invert: false,
                    }}
                    freeMode={{
                        enabled: false,
                        sticky: true,
                    }}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    navigation={{
                        nextEl: ".right",
                        prevEl: ".back",
                    }}
                    draggable={true}
                    style={{ "--swiper-navigation-size": "24px" }}
                    breakpoints={{
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
                    }}
                >
                    {data.map((data) => {
                        return (
                            <SwiperSlide key={data.id}>
                                <MultiCardServiceContent
                                    title={data.headerTitle}

                                    iconPath={data.iconPath}
                                    iconSize={data.iconSize}
                                />
                            </SwiperSlide>
                        );
                    })}

                    <div className="flex flex-row items-end justify-end gap-4">
                        <Image
                            src="/ayatrio icon/left icon.svg"
                            width={20}
                            height={20}
                            alt="Arrow"
                            className="back  rounded-full h-7 w-7"
                        />
                        <Image
                            src="/ayatrio icon/right icon.svg"
                            width={20}
                            height={20}
                            alt="Arrow"
                            className="right mr-16   rounded-full h-7 w-7"
                        />
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default MulticardService;
