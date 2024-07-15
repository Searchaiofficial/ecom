import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

import { FreeMode, Mousewheel, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const Amenities = ({ data }) => {
  const amenities = data.features || [];
  const [categoryDetails, setCategoryDetails] = useState()
  console.log(data)

  console.log({ amenities });
  const [showMore, setShowMore] = useState(false)


  const handleShowMore = () => {
    setShowMore(!showMore)
  }
  const fetchCategoryDetails = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCategoryByName/${data?.category}`)
    console.log(response.data)
    setCategoryDetails(response.data)
  }

  useEffect(() => {
    if (data?.category) {
      fetchCategoryDetails()
    }
  }, [data?.category])

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

  const groupedAmenities = [];
  for (let i = 0; i < amenities?.length; i += 3) {
    groupedAmenities.push(amenities.slice(i, i + 3));
  }

  return (
    <>
      {amenities.length > 0 && (
        <div className="place-offerings mt-[16px] pt-[32px] mb-[25px] ">
          <h3 className="mb-6 text-xl font-semibold">
            Amenities
          </h3>

          <div className={`hidden amenities md:grid ${amenities.length > 5 ? 'grid-cols-2' : 'grid-cols-1'} sm:w-auto`}>
            {amenities.map((amenity) => (
              <div key={amenity._id} className="flex items-center my-2">
                <div className="mr-4">
                  <Image
                    loading="lazy"
                    width={24}
                    height={24}
                    src={amenity.image}
                    alt={amenity.name}
                  />
                </div>
                <span className="font-medium">{amenity.text}</span>
              </div>
            ))}
          </div>

          <div className="md:hidden h-auto max-h-[300px] w-full">
            <Swiper
              {...swiperOptions}
              ref={swiper1Ref}
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
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
              }}
              allowSlideNext={true}
              allowSlidePrev={true}
              slideNextClass="custom-next-button"
              slidePrevClass="custom-prev-button"
              className="p-10"
            >
              {groupedAmenities.map((group, index) => (
                <SwiperSlide key={index}>
                  {group.map((amenity) => (
                    <div key={amenity._id} className="flex my-4 items-center w-auto">
                      <div className="mr-4">
                        <Image
                          loading="lazy"
                          width={24}
                          height={24}
                          src={amenity.image}
                          alt={amenity.name}
                        />
                      </div>
                      <span className="font-medium">{amenity.text}</span>
                    </div>
                  ))}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>


          {/* <button
            type="button"
            className="amenities-button mt-8 bg-white border-black inline-flex items-center gap-x-4 font-normal rounded-lg border"
          >
            Show All amenities
          </button> */}
          {/* <div className="flex gap-6 mt-8 items-center justify-center">
            <Image loading="lazy" src={"/icons/backarrowRevarce.svg"} height={35} width={35} alt="downarrow" className="rotate-90 h-[35px] w-[35px]  hover:text-gray-600" />

            <div className="flex flex-col items-center">
              <p className="font-semibold text-[#1D1D1F] text-xs">Have questions about Ayatrio?</p>
              <p className="text-[#0066CC] text-xs cursor-pointer font-normal hover:underline">Chat with a Specialist</p>
            </div>
          </div> */}
        </div >
      )}
    </>
  );
};

export default Amenities;

// import Image from "next/image";
// import React from "react";
// // import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
// // import WavesOutlinedIcon from "@mui/icons-material/WavesOutlined";
// // import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
// // import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
// // import FlatwareOutlinedIcon from "@mui/icons-material/FlatwareOutlined";
// // import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

// const CarbonMonoxideIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 32 32"
//     aria-hidden="true"
//     role="presentation"
//     focusable="false"
//     style={{
//       display: "block",
//       height: "24px",
//       width: "24px",
//       fill: "currentcolor",
//       marginRight: "0.75rem",
//     }}>
//     <path d="M2.05 6.3 4 8.23V25a3 3 0 0 0 2.82 3h16.94l1.95 1.95c-.16.02-.33.04-.5.04L25 30H7a5 5 0 0 1-5-4.78V7c0-.24.02-.48.05-.7zm1.66-4 26 26-1.42 1.4-26-26 1.42-1.4zM25 2a5 5 0 0 1 5 4.78V25a5 5 0 0 1-.05.7L28 23.77V7a3 3 0 0 0-2.82-3H8.24L6.3 2.05c.16-.02.33-.04.5-.04L7 2h18zM11.1 17a5 5 0 0 0 3.9 3.9v2.03A7 7 0 0 1 9.07 17h2.03zm5.9 4.24 1.35 1.36a6.95 6.95 0 0 1-1.35.33v-1.69zM21.24 17h1.69c-.07.47-.18.92-.34 1.35L21.24 17zM17 9.07A7 7 0 0 1 22.93 15H20.9a5 5 0 0 0-3.9-3.9V9.07zm-7.6 4.58L10.76 15H9.07c.07-.47.18-.92.33-1.35zM15 9.07v1.69L13.65 9.4A6.95 6.95 0 0 1 15 9.07zM23 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
//   </svg>
// );
// const SmokeIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 32 32"
//     aria-hidden="true"
//     role="presentation"
//     focusable="false"
//     style={{
//       display: "block",
//       height: "24px",
//       width: "24px",
//       fill: "currentcolor",
//       marginRight: "0.75rem",
//     }}>
//     <path d="m3.49 7.73 1.44 1.44A12.94 12.94 0 0 0 3 16a13 13 0 0 0 19.82 11.07l1.45 1.44A14.93 14.93 0 0 1 16 31 15 15 0 0 1 3.49 7.73zm.22-5.44 26 26-1.42 1.42-26-26 1.42-1.42zM16 1a15 15 0 0 1 12.52 23.27l-1.45-1.45A12.94 12.94 0 0 0 29 16 13 13 0 0 0 16 3a12.94 12.94 0 0 0-6.83 1.93L7.74 3.5A14.93 14.93 0 0 1 16 1zm-4.9 16a5 5 0 0 0 3.9 3.9v2.03A7 7 0 0 1 9.07 17h2.03zm5.9 4.24 1.35 1.36a6.95 6.95 0 0 1-1.35.33v-1.69zM21.24 17h1.69c-.07.47-.18.92-.34 1.35L21.24 17zM17 9.07A7 7 0 0 1 22.93 15H20.9a5 5 0 0 0-3.9-3.9V9.07zm-7.6 4.58L10.76 15H9.07c.07-.47.18-.92.33-1.35zM15 9.07v1.69L13.65 9.4A6.95 6.95 0 0 1 15 9.07zM23 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
//   </svg>
// );
// const CctvIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 32 32"
//     aria-hidden="true"
//     role="presentation"
//     focusable="false"
//     style={{
//       display: "block",
//       height: "24px",
//       width: "24px",
//       fill: "currentcolor",
//       marginRight: "0.75rem",
//     }}>
//     <path d="M23 3a2 2 0 0 1 2 1.85v1.67l5-2v11.96l-5-2V16a2 2 0 0 1-1.85 2H16.9a5 5 0 0 1-3.98 3.92A5 5 0 0 1 8.22 26H4v4H2V20h2v4h4a3 3 0 0 0 2.87-2.13A5 5 0 0 1 7.1 18H4a2 2 0 0 1-2-1.85V5a2 2 0 0 1 1.85-2H4zM12 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm11-9H4v11h3.1a5 5 0 0 1 9.8 0H23zm5 2.48-3 1.2v3.64l3 1.2zM7 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
//   </svg>
// );
// const WorkspaceIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 32 32"
//     aria-hidden="true"
//     role="presentation"
//     focusable="false"
//     style={{
//       display: "block",
//       height: "24px",
//       width: "24px",
//       fill: "currentcolor",
//       marginRight: "0.75rem",
//     }}>
//     <path d="M26 2a1 1 0 0 1 .92.61l.04.12 2 7a1 1 0 0 1-.85 1.26L28 11h-3v5h6v2h-2v13h-2v-2.54a3.98 3.98 0 0 1-1.73.53L25 29H7a3.98 3.98 0 0 1-2-.54V31H3V18H1v-2h5v-4a1 1 0 0 1 .88-1h.36L6.09 8.4l1.82-.8L9.43 11H12a1 1 0 0 1 1 .88V16h10v-5h-3a1 1 0 0 1-.99-1.16l.03-.11 2-7a1 1 0 0 1 .84-.72L22 2h4zm1 16H5v7a2 2 0 0 0 1.7 1.98l.15.01L7 27h18a2 2 0 0 0 2-1.85V18zm-16-5H8v3h3v-3zm14.24-9h-2.49l-1.43 5h5.35l-1.43-5z"></path>
//   </svg>
// );

// const amenties = [
//   {
//     icon: <Image src="/icons/garden-icon.svg" width={30} height={30} alt="garden" />,
//     text: "Gardern View",
//     available: true,
//   },
//   {
//     icon: <Image src="/icons/insert-image-icon.svg" width={30} height={30} alt="insert photo" />,
//     text: "Mountain view",
//     available: true,
//   },
//   {
//     icon: <Image src="/icons/sea-waves-icon.svg" width={30} height={30} alt="waves" />,
//     text: "Lake access",
//     available: true,
//   },
//   {
//     icon: <Image src="/icons/kitchen-icon.svg" width={30} height={30} alt="kitchen" />,
//     text: "Kitchen",
//     available: true,
//   },
//   {
//     icon: <Image src="/icons/wifi-icon.svg" width={30} height={30} alt="wifi"/>,
//     text: "Wifi",
//     available: true,
//   },
//   {
//     icon: <WorkspaceIcon />,
//     text: "Dedicated workspace",
//     available: true,
//   },
//   {
//     icon: <Image src="/icons/parking-icon.svg" width={30} height={30} alt="free parking" />,
//     text: "Free parking on premises",
//     available: true,
//   },
//   {
//     icon: <CctvIcon />,
//     text: "Security cameras on property",
//     available: true,
//   },
//   {
//     icon: <CarbonMonoxideIcon />,
//     text: "Carbon monoxide alarm",
//     available: false,
//   },
//   {
//     icon: <SmokeIcon />,
//     text: "Smoke alarm",
//     available: false,
//   },
// ];

// const Amenities = ({data}) => {
//   return (
//     <div className="place-offerings mt-14 py-12 border-t">
//       <h3 className="mb-6 text-xl font-semibold ml-1">
//         What this place offers
//       </h3>
//       <div className="amenties grid grid-cols-2 grid-rows-5 sm:w-auto w-[80vw] ">
//         {amenties.map((amenty, index) => (
//           <div className="flex my-2" key={index}>
//             {amenty.icon.type === "svg" ? (
//               <> {amenty.icon} </>
//             ) : (
//               <span style={{ marginRight: "0.75rem" }}>
//                 {React.cloneElement(amenty.icon, {
//                   style: { marginRight: "0.75rem" },
//                 })}
//               </span>
//             )}
//             <span
//               className={`font-normal text-lg ${
//                 amenty.available !== true ? "line-through" : ""
//               }`}>
//               {amenty.text}
//             </span>
//           </div>
//         ))}
//       </div>
//       <button
//         type="button"
//         className="amenities-button mt-8 bg-white border-black inline-flex items-center gap-x-4 font-normal rounded-lg border">
//         Show All amenities
//       </button>
//     </div>
//   );
// };

// export default Amenities;
