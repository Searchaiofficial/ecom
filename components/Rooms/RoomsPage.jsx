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
import Tabs from "../Cards/Tabs";
import BlogRelatedProducts from "../Cards/BlogRelatedProducts";

export const RoomsPage = ({ params }) => {
  const [productData, setProductData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [swiperRef, setSwiperRef] = useState(null);

  const [dataFetched, setDataFetched] = useState(false);
  const [roomMain, setRoomMain] = useState({});

  const dispatch = useDispatch();
  const roomSelect = useSelector(selectRoomData);
  const productSelect = useSelector(selectProductData);
  const roomMainSelect = useSelector(selectRoomMain);

  const fetchRoomMain = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL
      }/api/getRoommain?roomType=${params.replace(/-/g, " ")}`;
    const response = await axios.get(url);
    setRoomMain(response.data);
  };

  const [reviewRoom, setReviewRoom] = useState({});
  const [reviewData, setReviewData] = useState([]);

  const fetchRoomData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getRoomByQuery`,
        {
          params: {
            roomType: params.replace(/-/g, " "),
          },
        }
      );
      setReviewRoom(response.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const fetchReviewData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSpecialReview`
      );
      setReviewData(response.data[0]);
    } catch (error) {
      console.error("Error fetching review data:", error);
    }
  };

  useEffect(() => {
    fetchRoomData();
    fetchReviewData();
  }, [params]);

  useEffect(() => {
    // fetchRoomMain();
    if (!dataFetched) {
      dispatch({ type: "FETCH_ROOM_MAIN_DATA_REQUEST", payload: { params } });
      setDataFetched(true);
    }
    setRoomData(roomSelect);
    setProductData(productSelect);
    console.log(productSelect);
    setRoomMain(roomMainSelect);
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

  console.log(roomMain)

  return (
    // <div className="pt-12 bg-white sm:px-[50px] px-[20px]">
    <div className="w-full">
      <div className=" px-[20px] sm:px-[50px] lg:px-[67px] flex justify-center ">
        <div className="mt-36 w-full flex flex-col">
          <h1 className="lg:text-[30px] text-[24px] font-semibold">{roomMain?.title}</h1>
          <div className="mt-5 lg:w-[70%] w-full">
            <p className="line-clamp-3 mb-5">
              {roomMain?.description}
            </p>
          </div>
          <a className="my-5" href="/">
            click here for size guide
          </a>

          <div className="w-full lg:min-h-[730px] lg:max-h-[730px] min-h-[449px]">
            <TabImage
              src={roomMain?.img}
              alt={`Image `}
              width={500}
              height={100}
              labelData={roomMain?.children}
            />
          </div>
          <h1 className=" text-2xl font-semibold">
            {roomMain && roomMain.details && roomMain.details[0]?.title}
          </h1>
          <div className="flex justify-between items-end">
            <p className="">
              {roomMain && roomMain.details && roomMain.details[0]?.description}
            </p>
            <button className="mt-5 border-2 border-black rounded-full p-2 lg:p-3">
              see all double beds
            </button>
          </div>

          {roomMain &&
            roomMain.firstSlider &&
            roomMain.firstSlider.length > 0 && (
              <BlogRelatedProducts relatedProducts={roomMain.firstSlider} />
            )}

          {roomMain &&
            roomMain.fiveRooms &&
            roomMain.fiveRooms.length === 5 && (
              <>
                <div className=" flex justify-between  mb-10 ">
                  <div className=" w-full flex justify-center max-h-[915px] screens">
                    <div className="w-full  lg:h-[730px] grid grid-cols-2 lg:grid-cols-12 gap-y-4  gap-x-4 auto-rows-fr">
                      {/* 1 */}
                      <div
                        className="parent col-start-1 col-end-3 row-start-1 lg:mb-0 row-end-6 lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:row-end-12">
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
                        className="parent col-start-1 col-end-2 row-start-6 row-span-2
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
                        className=" parent  col-start-2 col-end-3 row-start-6 row-span-3
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
          {roomMain &&
            roomMain.secondSlider &&
            roomMain.secondSlider.length > 0 && (
              <BlogRelatedProducts relatedProducts={roomMain.secondSlider} />
            )}
          {/* <div>
                        <div className="mt-5 gap-3 flex">
                            <div className="w-1/2">
                                {roomData?.length > 0 && (
                                    <img
                                        className=" object-cover"
                                        src={roomData[0].imgSrc}
                                        alt="First Image of First Product"
                                    />
                                )}
                            </div>
                            <div className=" grid grid-cols-2 gap-3">
                                {roomData?.slice(1, 5).map((product, index) => (
                                    <div key={index}>
                                        <img
                                            key={product._id}
                                            src={product.imgSrc}
                                            className="object-cover"
                                            alt={`Image of Product ${index + 2}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}

          <div className="flex lg:flex-row flex-col justify-between items-center">
            <h1 className=" text-[24x] lg:text-[30px] font-semibold">
              Looking for Bedroom Storage options ?
            </h1>
            <button className="border-2 border-black rounded-full p-3">
              Explore all Bedroom storage solution
            </button>
          </div>
          {/* <div className="mt-8 flex w-[100%] lg:max-h-[490px] lg:flex-row flex-col screens bg-orange-500">
            <div className="lg:w-2/3">
              <Image
                src={bedimageh}
                width={850}
                className="w-full min-h-[446px] object-cover"
                height={100}
                alt="Image of bed"
              />
            </div>
            <div className="lg:p-12 p-10 lg:w-1/3  flex flex-col min-h-[363px]  justify-between ">
              <h1 className="text-xl  w-3/4 font-semibold">
                Explore all Bedroom storage solution
              </h1>
              <div className="bg-black w-14 h-14 flex justify-center items-center text-white rounded-full">
                A
              </div>
            </div>
          </div> */}

          <div className="flex mt-8  lg:max-h-[490px] lg:flex-row w-full flex-col relative  ">
            <div className="relative lg:w-2/3 min-h-[446px]">
              {reviewRoom && (
                <TabImage
                  src={reviewRoom.imgSrc}
                  alt={`Image  of Children`}
                  width={1000}
                  height={338}
                  labelData={reviewRoom.children}
                />
              )}
            </div>
            <div className="md:w-1/3 min-h-[363px]   bg-zinc-100  lg:p-12 p-10 ">
              <div className="flex flex-col ">
                <div>
                  <p>{reviewData && reviewData.comment}</p>
                </div>
                <div className="flex mt-5 flex-row items-center gap-2 ">
                  <Image
                    src={reviewData && reviewData.image}
                    width={45}
                    height={45}
                    alt="arrow"
                    className=" aspect-square object-cover rounded-full"
                  />
                  <p>{reviewData && reviewData.name}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:mt-20 mt-10">
            <h1 className="text-2xl font-semibold">
              {roomMain && roomMain.details && roomMain.details[1]?.title}
            </h1>
            <div className="mt-5  flex justify-between items-end">
              <p className="">
                {roomMain &&
                  roomMain.details &&
                  roomMain.details[1]?.description}
              </p>
              <button className="border-2 border-black rounded-full p-3">
                See all guest beds & day beds
              </button>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col gap-3 mt-5">
            {roomMain &&
              roomMain.rooms &&
              roomMain.rooms.length > 0 &&
              roomMain.rooms.map((room, index) => (
                <div key={index} className="lg:w-1/2 lg:max-h-[730px]">
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
          <div className="">
            <h1 className="text-2xl font-semibold">
              {roomMain && roomMain.details && roomMain.details[2]?.title}
            </h1>
            <div className="flex justify-between items-end">
              <p className="">
                {roomMain &&
                  roomMain.details &&
                  roomMain.details[2]?.description}
              </p>
            </div>
          </div>

          {roomMain &&
            roomMain.thirdSlider &&
            roomMain.thirdSlider.length > 0 && (
              <BlogRelatedProducts relatedProducts={roomMain.thirdSlider} />
            )}

          <div className="bg-white ">
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
              {!productSelect ? (
                <SwiperSlide>
                  ll
                  <div className="flex"></div>
                </SwiperSlide>
              ) : (
                productSelect.map((product, idx) => {
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

          {productSelect && productSelect.length > 0 && (
            <Tabs data={productSelect} />
          )}
        </div>
      </div>
    </div>
  );
};
