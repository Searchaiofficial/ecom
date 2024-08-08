"use client";

import React, { useState } from "react";

const Service = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const services = [
    {
      img: "/images/Business/pencil.jpg",
      text: "Commercial Space Design",
      link: "https://www.ikea.cn/cn/en/product-guides/sustainable-products/saving-energy/",
    },
    {
      img: "/images/Business/KeyBoard.jpg",
      text: "Remote Corporate Procurement",
      link: "https://store-companion.ikea.cn/design-leads/ib.html?channel=IRW+M2&cl_sr=IB_IRW+M2",
    },
    {
      img: "/images/Business/bars.jpg",
      text: "Bulk Purchase Service",
      link: "https://store-companion.ikea.cn/design-leads/ib.html?channel=IRW+M2&cl_sr=IB_IRW+M2",
    },
    {
      img: "/images/Business/gift.jpg",
      text: "Shopping Card Purchase",
      link: "https://store-companion.ikea.cn/design-leads/ib.html?channel=IRW+M2&cl_sr=IB_IRW+M2",
    },
    {
      img: "/images/Business/van.jpg",
      text: "Delivery Service",
      link: "https://store-companion.ikea.cn/design-leads/ib.html?channel=IRW+M2&cl_sr=IB_IRW+M2",
    },
    {
      img: "/images/Business/drilling.jpg",
      text: "Assembly Service",
      link: "https://store-companion.ikea.cn/design-leads/ib.html?channel=IRW+M2&cl_sr=IB_IRW+M2",
    },
    {
      img: "/images/Business/scroo-driver.jpg",
      text: "Install Service",
      link: "https://store-companion.ikea.cn/design-leads/ib.html?channel=IRW+M2&cl_sr=IB_IRW+M2",
    },
    {
      img: "/images/Business/plate.jpg",
      text: "Various Payment Methods",
      link: "https://store-companion.ikea.cn/design-leads/ib.html?channel=IRW+M2&cl_sr=IB_IRW+M2",
    },
  ];

  const itemsPerPage = 5;
  const totalItems = services.length;

  //next button to moving the items 5 on one time
  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (totalItems - itemsPerPage + 1)
    );
  };

  // back to prev like a noraml slider
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (totalItems - itemsPerPage + 1)) %
        (totalItems - itemsPerPage + 1)
    );
  };

  return (
    <section className="bg-white p-20 ">
      <h1 className="text-2xl mt-10 font-bold mb-4 font-bold text-black">
        Services We Provide
      </h1>
      <div className="relative overflow-hidden  mt-1">
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-[100] bg-[#484848] text-white p-2 rounded-full"
          onClick={handlePrev}
        >
          ‹
        </button>
        <div className="flex overflow-x-auto -hide ">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {services.map((service, index) => (
              <div key={index} className="flex-none w-1/5 p-2">
                <a href="#" className="block text-center">
                  <div>
                    <img src={service.img} alt="LOADING...." className="mb-2" />
                    <p className="text-sm font-medium text-black">
                      {service.text}
                    </p>
                  </div>
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
      <div className="relative flex items-center m-10">
        <div className="flex-grow border-t border-black"></div>
        <a
          className="mx-4 text-black font-bold"
          href="#"
        >
          Understand the Service Process
        </a>
        <div className="flex-grow border-t border-black"></div>
      </div>
    </section>
  );
};

export default Service;
