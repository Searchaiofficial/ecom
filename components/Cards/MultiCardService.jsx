"use client"
import React, { useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "./styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
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
        iconPath: "/icons/click and collect.svg",
    },
    {
        id: 2,
        headerTitle: "Furnishing & Measuring service",
        iconPath: "/icons/maserment.svg",
    },
    {
        id: 3,
        headerTitle: "Financing Service",
        iconPath: "/icons/payment.svg",
    },
    {
        id: 4,
        headerTitle: "buyback & resell",
        iconPath: "/icons/buy back.svg",
    },
    {
        id: 5,
        headerTitle: "warranty Service",
        iconPath: "/icons/warranty.svg",
    },
    {
        id: 6,
        headerTitle: "Installation Service",
        iconPath: "/icons/instalation.svg",
    },
    {
        id: 7,
        headerTitle: "Gift registry",
        iconPath: "/icons/gift.svg",
    },
    {
        id: 8,
        headerTitle: "Ayatrio Famaly Card",
        iconPath: "/icons/gift.svg",
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
            <div className="bg-zinc-50 pt-[5rem] pl-[20px] sm:pl-[50px]  lg:pl-[67px] overflow-x-auto">
                <div className="text-2xl font-semibold w-full pb-8">
                    <h2>Service and Financial help on shopping</h2>
                </div>
                <Swiper
                    ref={swiper1Ref}
                    mousewheel={{
                        forceToAxis: true, // Ensures vertical scrolling on touchpad
                        invert: false,     // Set to true if you want to invert scrolling direction
                    }}
                    freeMode={{
                        enabled: false,
                        sticky: true,
                    }}
                    modules={[Navigation, Pagination, Scrollbar, A11y, FreeMode, Mousewheel]}
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
                    touchEventsTarget="container" // Ensure Swiper listens for touch events on the container
                    touchRatio={1} // Adjust touch sensitivity (optional)
                    touchReleaseOnEdges={true} // Release touch event when the edge is reached
                    resistanceRatio={0.85} // Adjust resistance ratio for a smoother experience
                    initialSlide={0}
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

                    <div className="flex flex-row items-end justify-end gap-4 pt-[32px]">
                        <Image loading="lazy"
                            src="/icons/backarrowblack.svg"
                            width={20}
                            height={20}
                            alt="Arrow"
                            className="back rounded-full h-7 w-7 "
                        />
                        <Image loading="lazy"
                            src="/icons/rightarrowblack.svg"
                            width={20}
                            height={20}
                            alt="Arrow"
                            className="right lg:mr-16 mr-6 rounded-full h-7 w-7 "
                        />
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default MulticardService;
