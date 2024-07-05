import Image from "next/image";
import React, { useEffect, useRef } from "react";
// import "./styles.css";
function PopUp({ isPopupVisible, setPopupVisible, closePopup }) {
  const popupRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = isPopupVisible ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isPopupVisible]);
  return (
    <div>
      {isPopupVisible && (
        <>
          <div className="h-[100vh]" ref={popupRef}>
            <div className="bg-white px-4 w-[50%] h-full border rounded-3xl shadow-2xl overflow-y-scroll">
              <div className="flex justify-start mt-2 mr-2 cursor-pointer">
                <Image loading="lazy" width={10} height={10} alt="close" onClick={closePopup} className="text-2xl" />
              </div>
              <div className="grid grid-cols-2 ml-2 h-88 w-88 border rounded-xl shadow-xl mt-10">
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <Image
                      loading="lazy"
                      src="/images/temp.svg"
                      width={10}
                      height={10}
                      className="h-20 w-20 rounded-full cursor-pointer"
                      alt="Review Icon"
                    />
                  </div>
                  <div className="mt-4">
                    <span>Sagario</span>
                  </div>
                </div>
                <div className=" pl-10 pt-16 pb-10 ">
                  <div className="flex flex-col ">
                    <span className="font-bold text-2xl">176</span>
                    <span className="font-medium text-xs ">Reviews</span>
                    <hr className="mt-4 mr-6"></hr>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-2xl">
                      4.87
                      <Image loading="lazy" src="/icons/star.svg" width={10} height={10} alt="star" />
                    </span>
                    <span className="font-medium text-xs ">Reviews</span>
                    <hr className="mt-4 mr-6"></hr>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-2xl">7</span>
                    <span className="font-medium text-xs mb-4 ">
                      years hosting
                    </span>
                  </div>
                </div>
              </div>
              <div className=" mt-8 flex flex-col gap-4 ml-4">
                <div className="flex">
                  <Image loading="lazy" src="/icons/info.svg" width={10} height={10} alt="academic cap icon" className="text-4xl mr-2 " />
                  <p>
                    Where I went to school: Universidad de Psicología en
                    Valencia
                  </p>
                </div>
                <div className="flex">
                  <Image loading="lazy" src="/icons/info.svg" width={10} height={10} alt="shopping bag" className="text-xl mr-2 " />
                  <p>My work: coach</p>
                </div>
                <div className="flex">
                  <Image loading="lazy" src="/icons/info.svg" width={10} height={10} alt="light bulb" className="text-xl mr-2 " />
                  <p>Fun fact: No one believes my age</p>
                </div>
                <div className="flex">
                  <Image loading="lazy" src="/icons/info.svg" width={10} height={10} alt="twinkling stars" className="text-4xl mr-2 " />
                  <p>
                    What makes my home unique: Good energy and feeling at home
                  </p>
                </div>
                <div className="flex">
                  <Image loading="lazy" src="/icons/info.svg" width={10} height={10} alt="fast food" className="text-xl mr-2 " />
                  <p>For guests, I always: Help them enjoy Valencia</p>
                </div>
                <div className="flex">
                  <Image loading="lazy" src="/icons/info.svg" width={10} height={10} alt="balloons" className="text-xl mr-2 " />
                  <p>Born in the 60s</p>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-2xl">
                <h2 className="font-medium">Golwen&apos;s reviews</h2>
                <Image loading="lazy" src="/icons/right-arrow-in-circle-icon.svg" className="mt-1 text-gray-200" alt="Arrow" />
              </div>
              <div className="border border-gray-200 rounded-lg my-10">
                <p className="mx-5 mb-20 mt-5">
                  "...Warm welcome, I recommend, easy to walk to restraunts and
                  bars"
                </p>
                <div className="flex gap-5 mx-5 mb-5 text-sm">
                  <img
                    src={rev}
                    className="h-12 w-12 rounded-full cursor-pointer"
                    alt="Review Icon"
                  />
                  <div className="mt-1">
                    <h2 className="font-medium">Romain</h2>
                    <h2 className="text-[#b8b6b1]"> October 2023</h2>
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="mb-5">
                <div className="justify-center items-center mt-4 text-center">
                  <h2 className="font-medium text-2xl mb-5">
                    Sagario&apos;s Confirmed Information
                  </h2>
                </div>
                <div className="flex">
                  {/* <IoCheckmark className="mt-1 text-2xl mr-1" /> */}
                  <Image loading="lazy" src="/icons/checkmark-icon.svg" width={10} height={10} alt="checkmark icon" />
                  <span className="text-xl font-thin">Identity</span>
                </div>
                <div className="flex">
                  {/* <IoCheckmark className="mt-1 text-2xl mr-1" /> */}
                  <Image loading="lazy" src="/icons/checkmark-icon.svg" width={10} height={10} alt="checkmark icon" />
                  <span className="text-xl font-thin">Email Address</span>
                </div>
                <div className="flex">
                  {/* <IoCheckmark className="mt-1 text-2xl mr-1" /> */}
                  <Image loading="lazy" src="/icons/checkmark-icon.svg" width={10} height={10} alt="checkmark icon" />
                  <span className="text-xl font-thin">Phone</span>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </>
      )}
    </div>
  );
}

export default PopUp;
