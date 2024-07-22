"use client";

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
import UserReviewPostsCard from "./UserReviewPostsCard";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserReviewPosts = ({ slidesPerView, SubcategoryName }) => {
    const pathname = usePathname();
    // console.log(pathname.split('/')[1]);
    const [postDetails, setPostDetails] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    // const [selectPostByCategory, setSelectedPostBtCategory] = useState([])
    const [FilteredPosts, setFilteredPosts] = useState([])

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hashtagPost`);
            // console.log("1111", response.data);
            // console.log(response.data[0].categoryName);
            setPostDetails(response.data);
        } catch (error) {
            console.log(" Some Error Occurred");
        }
    };
    // console.log(SubcategoryName)


    useEffect(() => {
        const filteredPosts = []
        if (SubcategoryName) {
            const filterPosts = () => {
                postDetails.forEach((post) => {
                    if (post.categoryName === SubcategoryName) {
                        filteredPosts.push(post)
                    }
                })

                // console.log(filteredPosts)
                setFilteredPosts(filteredPosts)
            }
            filterPosts()
        }

    }, [SubcategoryName, postDetails])






    useEffect(() => {
        fetchDetails();
    }, []);



    const swiperOptions = {
        slidesPerView,
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

    const handleClick = (post) => {
        setOpenModal(true);
        setSelectedPost(post);
    };
    console.log(selectedPost);

    const handleClose = () => {
        setOpenModal(false);
        setSelectedPost(null);
    };


    const postsToRender = FilteredPosts && FilteredPosts.length > 0 ? FilteredPosts : postDetails;
    // console.log(postsToRender)

    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "short" };
        return new Date(dateString).toLocaleDateString("en-GB", options).replace(/ /g, '-');
    };

    console.log("postsToRender", postsToRender)

    if (postsToRender.length == 0) {
        return null
    }


    return (
        <div>
            {openModal && <div className="background-overlay open"></div>}
            <div className={`bg-white ${openModal ? 'overflow-hidden' : ''}`}>
                <div className="mb-2 pr-[20px] w-full flex justify-between items-center">
                    <div className="mb-[32px]">
                        <h2 className="font-semibold text-2xl pb-[8px] ">
                            As seen on Instagram
                        </h2>
                        <p className="text-[14px] line-clamp-2 lg:line-clamp-none md:w-[75%]">
                            Get inspired by other Ayatrio shoppers! Share your photos on Instagram and tag @Ayatrio for a chance to be featured.
                        </p>
                    </div>
                </div>
                <Swiper
                    ref={swiper1Ref}
                    {...swiperOptions}
                    scrollbar={{
                        hide: false,
                        draggable: true,
                    }}
                    mousewheel={{
                        forceToAxis: true,
                        invert: false,
                    }}
                    freeMode={{
                        enabled: true,
                        sticky: true,
                    }}
                    breakpoints={{
                        300: {
                            slidesPerView: 1.1,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: slidesPerView,
                            spaceBetween: 10,
                        },
                    }}
                    allowSlideNext={true}
                    allowSlidePrev={true}
                    slideNextClass="custom-next-button"
                    slidePrevClass="custom-prev-button"
                    className="px-10"
                >
                    {!postsToRender ? (
                        <SwiperSlide>
                            <div className="flex"></div>
                        </SwiperSlide>
                    ) : (
                        postsToRender.length > 0 && postsToRender?.map((item, idx) => {
                            return (
                                <SwiperSlide key={idx} className="ml-0" onClick={() => handleClick(item)}>
                                    <div className="">

                                        <UserReviewPostsCard
                                            username={item.username}
                                            imgSrc={item.mediaUrl}
                                            id={item._id}
                                            alt={item.categoryName}
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })
                    )}
                </Swiper>

                {openModal && (
                    <div className={`fixed top-0 z-[9999] overflow-y-auto right-0 w-[100%] lg:w-[70%] h-full bg-white shadow-lg transition-transform transform ${openModal ? "translate-x-0" : "translate-x-full"}`}>
                        <div className="flex items-center px-[24px] lg:px-[32px] my-5 justify-between">
                            <div className="flex flex-col">
                                <h1 className="text-[16px] font-semibold">As seen on Instagram</h1>
                                <div className="flex gap-2 lg:hidden">
                                    <p className="text-[12px] font-semibold">@{selectedPost.username}</p>
                                </div>
                            </div>
                            <button className="text-xl px-3 py-1 hover:bg-[#e5e5e5] rounded-full cursor-pointer" onClick={handleClose}>
                                X
                            </button>
                        </div>
                        {selectedPost && (
                            <div className="lg:px-[32px] px-[24px] cursor-pointer flex justify-between">
                                <div className="group hidden md:flex mr-[40px]">
                                    <div className="absolute top-[90px] left-12 p-2 rounded-full flex items-center gap-2">
                                        <Image src={"/icons/instagram-white-icon.svg"} height={25} width={25} alt="instagram icon" loading="lazy" />
                                        <p className="text-[14px] font-semibold text-white transition-all duration-300">@{selectedPost.username}</p>
                                    </div>
                                    <Image src={selectedPost.mediaUrl} width={200} height={200} className="w-[400px] h-[550px]" alt={`${selectedPost.username} post`} loading="lazy" />
                                </div>
                                <div className="flex-1">
                                    {
                                        selectedPost.products.map((item) => (

                                            <Link href={`product/${item.productTitle}`} key={item._id}>
                                                <div className="flex w-full pr-[20px] lg:pr-[0px] py-[30px] gap-5 items-center justify-between border-b">
                                                    <div>
                                                        <Image src={item.images[0]} height={100} width={100} className="object-cover min-h-[85px] min-w-[85px] lg:min-w-[100px] lg:min-h-[100px]" alt={item.productTitle} loading="lazy" />
                                                    </div>
                                                    <div className="flex flex-col flex-1 w-full">
                                                        <p className="text-[12px] font-semibold text-red-500 mb-[4px]">{item.demandtype}</p>
                                                        <h1 className="text-[14px] font-semibold">{item.productTitle}</h1>
                                                        <p className="text-[14px] text-[#484848]">{item.collectionName}</p>

                                                        {/* {
                                                            item.discountedprice ? (<p className="lg:text-[28px] text-[24px] font-semibold">{item.discountedprice}</p>) : (<p className="lg:text-[28px] text-[24px] font-semibold">{item.perUnitPrice}</p>)
                                                        } */}
                                                        <h2 className={`text-3xl flex font-semibold leading-[0.5]  tracking-wide ${item.specialprice ? "bg-[#FFD209] px-2 pt-3 w-fit shadow-lg" : ""} `} style={item?.specialprice ? { boxShadow: '3px 3px #ad3535' } : {}}>
                                                            <span className={`text-sm ${item?.specialprice?.price ? "" : "pt-3.5"}`}>Rs. &nbsp;</span>{" "}
                                                            {item?.specialprice?.price ? item?.specialprice.price : <p className="pt-3">{item.perUnitPrice}</p>}
                                                        </h2>{" "}
                                                        {
                                                            item?.specialprice && (
                                                                <div className="flex flex-col mt-2">
                                                                    <p className="text-[#757575] text-[12px] pt-[3px]">Regular price: Rs.{item?.perUnitPrice} (incl. of all taxes)</p>
                                                                    {
                                                                        item?.specialprice?.startDate && item?.specialprice?.endDate && (
                                                                            <p className="text-[#757575] text-[12px] pb-[10px]">Price valid {formatDate(item.specialprice.startDate)} - {formatDate(item.specialprice.endDate)} or while supply lasts</p>
                                                                        )
                                                                    }
                                                                    {/* <p className="text-[#757575] text-[12px] pb-[10px]">Price valid May 02 - May 29 or while supply lasts</p> */}
                                                                </div>
                                                            )
                                                        }

                                                        <div className="flex lg:gap-2 gap-1">
                                                            <Image src={"/icons/adtocart.svg"} loading="lazy" height={35} width={35} className="border-2 rounded-full p-1" alt="add to cart icon" />
                                                            <Image src={"/icons/like.svg"} loading="lazy" height={35} width={35} className="border-2 rounded-full p-1" alt="like icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    }

                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserReviewPosts;
