"use client";
import Image from "next/image";

import bedimageh from "../../public/testp/h.jpeg";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import "./styles.css";

// import required modules
import {
  Keyboard,
  Scrollbar,
  Navigation,
  Mousewheel,
  Pagination,
  FreeMode,
} from "swiper/modules";
import TabImage from "../Cards/TabImage";
import Card from "../Cards/card";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductData,
  selectRoomData,
  selectRoomMain,
} from "../Features/Slices/roomMainSlice";
import Link from "next/link";
import axios from "axios";

export const RoomsPage = ({ params }) => {
  const [productData, setProductData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [swiperRef, setSwiperRef] = useState(null);

  const [dataFetched, setDataFetched] = useState(false);
  const [roomMain, setRoomMain] = useState({});

  const dispatch = useDispatch();
  const roomSelect = useSelector(selectRoomData);
  const productSelect = useSelector(selectProductData);
  console.log({ productData });
  const roomMainSelect = useSelector(selectRoomMain);

  console.log({ roomData });


  const fetchRoomMain = async () => {
    const url = `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/api/getRoommain?roomType=${params.replace(/-/g, " ")}`;
    const response = await axios.get(url);
    setRoomMain(response.data);
  };

  useEffect(() => {
    fetchRoomMain();
    if (!dataFetched) {
      dispatch({ type: "FETCH_ROOM_MAIN_DATA_REQUEST", payload: { params } });
      setDataFetched(true);
    }
    setRoomData(roomSelect);
    setProductData(productSelect);
    // setRoomMain(roomMainSelect);
  }, [
    dispatch,
    params,
    dataFetched,
    roomSelect,
    productSelect,
    roomMainSelect,
  ]);

  const swiperUseref = useRef(null);
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
  const swiper2Ref = useRef(null);

  return (
    // <div className="pt-12 bg-white sm:px-[50px] px-[20px]">
    <div>
      <div className="pt-12 w-full flex justify-center ">
        <div className="w-10/12  p-5 p flex flex-col">
          <h1 className="text-2xl font-semibold">{roomMain?.title}</h1>
          <p className="mt-5 w-7/12">{roomMain?.description}</p>
          <a className="my-5" href="/">
            click here for size guide
          </a>

          <TabImage
            src={roomMain?.img}
            alt={`Image `}
            width={500}
            height={100}
            labelData={roomMain?.children}
          />
          <h1 className="mt-20 text-2xl font-semibold">
            {roomMain && roomMain.details && roomMain.details[0]?.title}
          </h1>
          <div className="mt-5  flex justify-between items-end">
            <p className="w-7/12">
              {roomMain && roomMain.details && roomMain.details[0]?.description}
            </p>
            <button className="border-2 border-black rounded-full p-3">
              see all double beds
            </button>
          </div>

          {roomMain &&
            roomMain.fiveRooms &&
            roomMain.fiveRooms.length === 5 && (
              <>
                <div className="px-[15px] flex justify-between mx-auto mb-10 ">
                  <div className=" w-full flex justify-center ">
                    <div className="w-full  h-[900px]  lg:h-[730px] grid grid-cols-2 lg:grid-cols-12  gap-x-4 auto-rows-fr">
                      {/* 1 */}
                      <div
                        className="parent col-start-1 col-end-3 row-start-1 mb-4 lg:mb-0 row-end-6
              lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:row-end-12
            "
                      >
                        <div className="parent relative w-full h-full">
                          <>
                            <TabImage
                              src={roomMain.fiveRooms[0].imgSrc}
                              alt={`Image  of Children`}
                              width={1000}
                              height={338}
                              labelData={roomMain.fiveRooms[0].children}
                            />
                          </>
                        </div>
                      </div>
                      {/* 2 */}
                      <div
                        className="parent mb-4 col-start-1 col-end-2 row-start-6 row-span-2
              lg:col-start-7 lg:col-end-10 lg:row-start-1 lg:row-end-6
            "
                      >
                        {
                          <>
                            <TabImage
                              src={roomMain.fiveRooms[1].imgSrc}
                              alt={`Image  of Children`}
                              width={1000}
                              height={338}
                              labelData={roomMain.fiveRooms[1].children}
                            />
                          </>
                        }
                      </div>
                      {/* 3 */}
                      <div
                        className=" parent mb-4  col-start-2 col-end-3 row-start-6 row-span-3
            lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-7
            "
                      >
                        {
                          <>
                            <TabImage
                              src={roomMain.fiveRooms[2].imgSrc}
                              alt={`Image  of Children`}
                              width={1000}
                              height={338}
                              labelData={roomMain.fiveRooms[2].children}
                            />
                          </>
                        }
                      </div>
                      {/* 4 */}
                      <div
                        className=" parent col-start-1 col-end-2 row-start-8 row-span-3
              lg:col-start-7 lg:col-end-10 lg:row-start-6 lg:row-end-12
            "
                      >
                        {
                          <>
                            <TabImage
                              src={roomMain.fiveRooms[3].imgSrc}
                              alt={`Image  of Children`}
                              width={1000}
                              height={338}
                              labelData={roomMain.fiveRooms[3].children}
                            />
                          </>
                        }
                      </div>
                      {/* 5 */}
                      <div
                        className=" parent col-start-2 col-end-3 row-start-9 row-span-2
              lg:col-start-10 lg:col-end-13 lg:row-start-7 lg:row-end-12
            "
                      >
                        {
                          <>
                            <TabImage
                              src={roomMain.fiveRooms[4].imgSrc}
                              alt={`Image  of Children`}
                              width={1000}
                              height={338}
                              labelData={roomMain.fiveRooms[4].children}
                            />
                          </>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          {/* <div>
                        <div className="mt-5 gap-3 flex">
                            <div className="w-1/2">
                                {roomData?.length > 0 && (
                                    <img
                                        className="w-full h-auto object-cover"
                                        src={roomData[0].imgSrc} // Use the first image of the first product
                                        alt="First Image of First Product"
                                    />
                                )}
                            </div>
                            <div className="w-1/2 columns-2 gap-3">
                                {roomData?.slice(1, 5).map((product, index) => (
                                    <div key={index}>

                                        <img
                                            key={product._id}
                                            src={product.imgSrc}
                                            className="w-full h-auto object-cover"
                                            alt={`Image of Product ${index + 2}`}
                                        />

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}

          <div className="mt-20  flex justify-between items-center">
            <h1 className=" text-2xl font-semibold">
              Looking for Bedroom Storage options ?
            </h1>
            <button className="border-2 border-black rounded-full p-3">
              Explore all Bedroom storage solution
            </button>
          </div>
          <div className="mt-20 flex bg-orange-500">
            <Image
              src={bedimageh}
              width={850}
              className=""
              height={100}
              alt="Image of bed"
            />
            <div className="py-20 pl-10 flex flex-col  justify-between ">
              <h1 className="text-xl  w-3/4 font-semibold">
                Explore all Bedroom storage solution
              </h1>
              <div className="bg-black w-14 h-14 flex justify-center items-center text-white rounded-full">
                A
              </div>
            </div>
          </div>
          <div className="mt-20">
            <h1 className="mt-20 text-2xl font-semibold">
              {roomMain && roomMain.details && roomMain.details[1]?.title}
            </h1>
            <div className="mt-5  flex justify-between items-end">
              <p className="w-7/12">
                {roomMain &&
                  roomMain.details &&
                  roomMain.details[1]?.description}
              </p>
              <button className="border-2 border-black rounded-full p-3">
                See all guest beds & day beds
              </button>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            {roomMain &&
              roomMain.rooms &&
              roomMain.rooms.length > 0 &&
              roomMain.rooms.map((room, index) => (
                <div key={index} className="w-1/2">
                  <TabImage
                    src={room.imgSrc}
                    alt={`Image ${index + 1} of Product`}
                    width={500}
                    height={100}
                    labelData={room.children}
                  />
                </div>
              ))}
          </div>
          <div className="mt-20">
            <h1 className="text-2xl font-semibold">
              {roomMain && roomMain.details && roomMain.details[2]?.title}
            </h1>
            <div className="mt-5  flex justify-between items-end">
              <p className="w-7/12 mb-10">
                {roomMain &&
                  roomMain.details &&
                  roomMain.details[2]?.description}
              </p>
            </div>
          </div>

          <div className="pt-12  mb-20  bg-white sm:px-[50px] px-[20px]">
            <div className="mb-2 w-full flex justify-between items-center">
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
                  slidesPerView: 1,
                  spaceBetween: 1,
                },

                // 640: {
                //   slidesPerView: 1.25,
                //   spaceBetween: 5,
                // },
                1024: {
                  slidesPerView: 4.07,
                  spaceBetween: 5,
                },
              }}
              allowSlideNext={true}
              allowSlidePrev={true}
              slideNextClass="custom-next-button"
              slidePrevClass="custom-prev-button"
              onSwiper={setSwiperRef}
              className="px-10"
            >
              {!productData ? (
                <SwiperSlide>
                  <div className="flex"></div>
                </SwiperSlide>
              ) : (
                productData.map((product, idx) => {
                  return (
                    <SwiperSlide key={idx} className="ml-0">
                      <div className="grid grid-cols-1 mt-2 w-full  h-full fade-in ">
                        <Card
                          title={product.productTitle}
                          // date={product.date}
                          price={product.perUnitPrice}
                          desc={product.productTitle}
                          imgSrc={product.images}
                          rating={product.ratings}
                          key={idx}
                          id={product._id}
                          category={product.category}
                          productId={product.productId}
                          cssClass={"card1flex"}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};
