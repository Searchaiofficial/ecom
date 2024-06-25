"use client"
import React from 'react';
import Card from '../../../components/Rank/Card';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import SwiperCore, {
    Pagination,
    Navigation,
    Scrollbar,
    Mousewheel,
    FreeMode,
    A11y,
} from "swiper/core";

SwiperCore.use([Pagination, Navigation, Scrollbar, Mousewheel, FreeMode, A11y]);


const swiperOptions = {
    slidesPerView: 3.08,
    centeredSlides: false,
    spaceBetween: 5,
    navigation: {
        nextEl: ".custom-next-button",
        prevEl: ".custom-prev-button",
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
    scrollbar: {
        hide: false,
        draggable: true,
    },
    mousewheel: {
        forceToAxis: true,
        invert: false,
    },
    freeMode: {
        enabled: true,
        sticky: true,
        momentum: true,
        momentumRatio: 0.5,
        momentumBounceRatio: 0.5,
    },
    draggable: true,
    touchEventsTarget: 'wrapper',
};


const dummyData = [
    {
        title: 'Chest of drawers',
        items: [
            { name: 'MALM', price: '¥699.00', image: 'images/temp.svg' },
            { name: 'MALM', price: '¥299.00', image: 'images/temp.svg' },
            { name: 'KULLEN', price: '¥199.00', image: 'images/temp.svg' }
        ],
        colors: { header: '#7c6e65', rank: '#f5c518' }
    },
    {
        title: 'Clothes Storage Box',
        items: [
            { name: 'PÄRKLA', price: '¥9.99', image: 'images/temp.svg' },
            { name: 'SKUBB', price: '¥29.99', image: 'images/temp.svg' },
            { name: 'BRUKSVARA', price: '¥14.99', image: 'images/temp.svg' }
        ],
        colors: { header: '#848c71', rank: '#f5c518' }
    },
    {
        title: 'Sheets & Fitted Sheets',
        items: [
            { name: 'DVALA', price: '¥99.99', image: 'images/temp.svg' },
            { name: 'DVALA', price: '¥79.99', image: 'images/temp.svg' },
            { name: 'BRUKSVARA', price: '¥39.99', image: 'images/temp.svg' }
        ],
        colors: { header: '#7c6e65', rank: '#f5c518' }
    },
    {
        title: 'Clothes Storage Box',
        items: [
            { name: 'PÄRKLA', price: '¥9.99', image: 'images/temp.svg' },
            { name: 'SKUBB', price: '¥29.99', image: 'images/temp.svg' },
            { name: 'BRUKSVARA', price: '¥14.99', image: 'images/temp.svg' }
        ],
        colors: { header: '#848c71', rank: '#f5c518' }
    },
    {
        title: 'Sheets & Fitted Sheets',
        items: [
            { name: 'DVALA', price: '¥99.99', image: 'images/temp.svg' },
            { name: 'DVALA', price: '¥79.99', image: 'images/temp.svg' },
            { name: 'BRUKSVARA', price: '¥39.99', image: 'images/temp.svg' }
        ],
        colors: { header: '#7c6e65', rank: '#f5c518' }
    },
];

const HomePage = () => {
    return (
        <div className='pt-40 px-10'>

            <Swiper {...swiperOptions} style={{ paddingRight: "10px", paddingBottom: "10px" }}>
                {dummyData.map((data, index) => (
                    <SwiperSlide key={index}>
                        <Card title={data.title} items={data.items} colors={data.colors} />
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
};

export default HomePage;
