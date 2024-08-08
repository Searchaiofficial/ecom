"use client";

import React, { useState } from "react";

const Purchasing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const services = [
    {
      img: "/images/Business/tables.jpg",
      text: "Office",
      link: "https://www.ikea.cn/cn/en/ikea-business/office-furnishings/",
    },
    {
      img: "/images/Business/laps.jpg",
      text: "Welcome and socialize",
      link: "https://www.ikea.cn/cn/en/ikea-business/Welcome-and-Socialize/",
    },
    {
      img: "/images/Business/shower.jpg",
      text: "Hospitality",
      link: "https://www.ikea.cn/cn/en/ikea-business/hospitality-furnishings/",
    },
    {
      img: "/images/Business/man.jpg",
      text: "Restaurents and Cafes",
      link: "https://www.ikea.cn/cn/en/ikea-business/restaurant-cafe-furnishings/",
    },
    {
      img: "/images/Business/bed.jpg",
      text: "Reatil",
      link: "https://store-companion.ikea.cn/design-leads/ib.html?channel=IRW+M2&cl_sr=IB_IRW+M2",
    },
    {
      img: "/images/Business/company.jpg",
      text: "Residential Construction",
      link: "https://www.ikea.cn/cn/en/ikea-business/Welcome-and-Socialize/",
    },
  ];

  const itemsPerPage = 5;
  const totalItems = services.length;

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (totalItems - itemsPerPage + 1)
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (totalItems - itemsPerPage + 1)) %
        (totalItems - itemsPerPage + 1)
    );
  };

  return (
    <section className="bg-white p-20">
      <div className="text-black mb-10">
        <h1 className="text-2xl font-bold mb-4">
          We offer professional and convenient one-stop purchasing at Ayatrio.
        </h1>
        <p className="mt-2">
          Here, you'll find all the products and customized solutions you're
          looking for, regardless of which industry you're in, from large
          furniture to fine decorative touches.
        </p>
      </div>
      <div className="relative overflow-hidden mt-4">
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-[100] bg-[#484848] text-white p-2 rounded-full"
          onClick={handlePrev}
        >
          ‹
        </button>
        <div className="flex overflow-x-auto">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {services.map((service, index) => (
              <div key={index} className="flex-none w-1/5 p-2">
                <a href="#" className="block text-center">
                  <img
                    src={service.img}
                    alt="LOading...."
                    className="mb-2 object-cover w-full h-[380px]"
                  />
                  <p className="text-sm font-medium text-black relative mb-10">
                    {service.text}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={handleNext}
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default Purchasing;
