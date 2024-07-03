"use client"

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import { Pagination, Scrollbar, Mousewheel, FreeMode } from "swiper/modules";

import ShopByRoomCard from "./shopbyroomCard";
import axios from "axios";



const data = [
    {
        _id: '6683c2fc255e38eae3c21c80',
        roomType: 'Living Room',
        img:
            'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1719911162006_image_ayatrio-azul-tehuana-1a.webp',
        title: 'living room title',
        description: 'living room description',
        fiveGridHeader: ' 5 header',
        fiveGridDescription: '5 desc',
        twoGridHeader: '2 Grid Header',
        twoGridDescription: '2 Grid Description',
        details: [
            {
                description: ' sub description',
                _id: '6683c2fc255e38eae3c21c81',
                title: 'sub heading'
            }
        ],
        rooms: ['667c2ef8aaf306d1a08da763', '667c2f24aaf306d1a08daa93'],
        fiveRooms: [
            '667c2f24aaf306d1a08daa93', '667c2ef8aaf306d1a08da763', '667c2ef8aaf306d1a08da763',
            '667c2ef8aaf306d1a08da763', '667c2ef8aaf306d1a08da763'
        ],
        firstSlider: [],
        secondSlider: [],
        thirdSlider: [],
        children: [
            {
                productTitle: 'active',
                productCategory: 'category pr',
                topPosition: 30,
                leftPosition: 28,
                productLink: '',
                _id: '6683c2fc255e38eae3c21c82',
                status: 'Active',
                productPrice: 99
            },
            {
                productTitle: '',
                productCategory: '',
                topPosition: 0,
                leftPosition: 0,
                productLink: '',
                _id: '6683c2fc255e38eae3c21c83',
                status: 'undefined',
                productPrice: 0
            },
            {
                productTitle: 'Active with data',
                productCategory: '33',
                topPosition: 50,
                leftPosition: 37,
                productLink: '',
                _id: '6683c2fc255e38eae3c21c84',
                status: 'ActiveWithData',
                productPrice: 47
            }
        ],
        createdAt: '2024-07-02T09:06:04.189Z',
        updatedAt: '2024-07-02T09:06:04.189Z'
    }
]


const ShopByRoomSlider = () => {

    const backgroundColors = [
        "bg-[#FF5B45]",
        "bg-[#FFD209]",
        "bg-[#B6E3A0]",
        "bg-[#5680FF]",
        "bg-[#D8B4FE]",
        "bg-[#000000]",
        "bg-[#91D8FB ]",
    ];

    const [RoomDataSlider, setRoomDataSlider] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const responce = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllRoommain`)
                if (responce.data.length > 0) {
                    console.log(responce.data)
                    setRoomDataSlider(responce.data)
                }
            } catch (error) {
                console.log("Error fetching room main data")
            }
        }
        fetchData()
    }, [])



    console.log(RoomDataSlider)



    const swiperOptions2 = {
        slidesPerView: 4.08,
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
    const swiper1Ref = useRef(null);
    return (
        <div className="">
            <div className="pt-12 mb-20  bg-white sm:pl-[50px] pl-[20px] lg:pl-[67px] ">
                <div className="mb-2 w-full flex justify-between items-center">
                    <h2 className="font-semibold text-2xl py-[15px]">
                        Room discovery
                    </h2>
                    <div className="Slidenav flex  bg-white text-2xl cursor-pointer  text-white rounded-full gap-2">
                        <div
                            onClick={() => swiper1Ref.current.swiper.slidePrev()}
                            className="custom-prev-button bg-slate-500  rounded-full  hover:bg-400 hover:scale-110 hover:text-slate-100"
                        ></div>
                        <div
                            onClick={() => swiper1Ref.current.swiper.slideNext()}
                            className="custom-next-button bg-slate-500  rounded-full hover:bg-400 hover:scale-110 hover:text-slate-100"
                        ></div>
                    </div>
                </div>
                <Swiper
                    ref={swiper1Ref}
                    {...swiperOptions2}
                    scrollbar={{
                        hide: false,
                        draggable: true,
                    }}
                    mousewheel={{
                        forceToAxis: true,
                        invert: false,
                    }}
                    freeMode={{
                        enabled: false,
                        sticky: true,
                    }}
                    breakpoints={{
                        300: {
                            slidesPerView: 1.1,
                            spaceBetween: 5,
                        },

                        640: {
                            slidesPerView: 2.3,
                            spaceBetween: 5,
                        },
                        1024: {
                            slidesPerView: 3.5,
                            spaceBetween: 5,
                        },
                    }}
                    allowSlideNext={true}
                    allowSlidePrev={true}
                    slideNextClass="custom-next-button"
                    slidePrevClass="custom-prev-button"
                    // onSwiper={setSwiperRef}
                    className="px-10"
                >
                    {!RoomDataSlider ? (
                        <SwiperSlide>
                            <div className="flex"></div>
                        </SwiperSlide>
                    ) : (
                        RoomDataSlider.map((roomData, idx) => {
                            return (
                                <SwiperSlide key={idx} className="ml-0 min-w-[322px] sm:min-w-0">
                                    <div className="">
                                        <ShopByRoomCard
                                            title={roomData.roomType}
                                            desc={roomData.shortSummary}
                                            imgSrc={roomData.img}
                                            key={idx}
                                            summary={roomData.description}
                                            bgColorClass={
                                                backgroundColors[idx % backgroundColors.length]
                                            }
                                            id={roomData.roomType.replace(/\s+/g, "-")}

                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })
                    )}
                </Swiper>
            </div>
        </div>
    );
}

export default ShopByRoomSlider;