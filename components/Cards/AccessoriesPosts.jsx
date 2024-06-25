import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, Mousewheel, FreeMode } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import Image from "next/image";
import Card from "../../components/Cards/card";


// const Data1 = [
//     {
//         specialprice: { price: null, startDate: null, endDate: null },
//         _id: '6675568ddfcbf055ed98b534',
//         productId: '1255',
//         patternNumber: '1255',
//         productTitle: 'Fevicol',
//         roomCategory: ['Living Room'],
//         category: 'Flooring New',
//         subcategory: 'Accessories ',
//         demandtype: '',
//         style: 'design style',
//         shortDescription: 'short description',
//         images: [

//             'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1718965899917_image_thumbFevi.jpg',
//             'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1718965899949_image_images.png',

//             'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1718965899950_image_images.png',

//             'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1718965899951_image_thumbFevi.jpg'
//         ],
//         perUnitPrice: 98,
//         ratings: [],
//         colors: [],
//         units: 1,
//         unitType: 'pcs',
//         perUnitType: 'pcs',
//         totalPrice: 100,
//         discountedprice: null,
//         popularity: 2,
//         purchaseMode: ['Only Online'],
//         otherRoom: [],
//         productDescription: 'product description here',
//         coreValues: [
//             {
//                 heading: 'core value 1',
//                 text: 'core value 1 sub heading',
//                 image:
//                     'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1718965900049_corevalues_images.png',
//                 _id: '6675568ddfcbf055ed98b535'
//             }
//         ],
//         features: [
//             {
//                 text: 'feature 1',
//                 image:
//                     'https://ayatrio-bucket.s3.ap-south-1.amazonaws.com/1718965900049_features_images.png',
//                 _id: '6675568ddfcbf055ed98b536'
//             }
//         ],
//         maintainanceDetails: 'product maintranance details',
//         createdAt: '2024-06-21T09:48:15.562Z',
//         productImages: [],
//         dimensions: [],
//         circles: [],
//         __v: 0
//     }
// ]

const AccessoriesPosts = ({ data, accessories }) => {

    const swiper1Ref = useRef(null);

    const swiperOptions = {
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




    return (
        <div>
            {
                accessories && accessories.length > 0 && (
                    <div>
                        <h2 className="font-semibold text-2xl pb-[8px] ">
                            Accessories
                        </h2>
                    </div>
                )
            }
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
                        slidesPerView: 1.5,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 3.5,
                        spaceBetween: 10,
                    },
                }}
                allowSlideNext={true}
                allowSlidePrev={true}
                slideNextClass="custom-next-button"
                slidePrevClass="custom-prev-button"
                className=""
            >

                {
                    accessories && accessories.length > 0 && (
                        accessories.map((product, idx) => (
                            <SwiperSlide>
                                <Card
                                    title={product.productTitle}
                                    productImages={product?.productImages}
                                    specialPrice={product?.specialprice}
                                    price={product.perUnitPrice}
                                    desc={product.productTitle}
                                    shortDescription={product.shortDescription}
                                    demandtype={product.demandtype}
                                    imgSrc={product.images}
                                    rating={product.ratings}
                                    key={idx}
                                    id={product._id}
                                    category={product.category}
                                    productId={product.productId}
                                    // setPopupVisible={setPopupVisible}
                                    cssClass={"card1flex"}
                                    // inCart={inCart}
                                    totalPrice={product.totalPrice}
                                    unitType={product.unitType}
                                />
                            </SwiperSlide>
                        ))
                    )
                }


            </Swiper>

        </div>
    );
}

export default AccessoriesPosts;