import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Image from "next/image";
import LottieBackground from "@/components/LottieBackground"
import animationData from "@/components/Animation - 1718097462437.json"
import { useDispatch, useSelector } from "react-redux";
import { selectClickedItem, setClickedItem } from "../../Features/Slices/mapSlice";



const PopupPortal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

const MapMarker = ({ place, idx }) => {
  const clickedItem = useSelector(selectClickedItem)
  const dispatch = useDispatch()

  console.log(place)

  // console.log(clickedItem)
  const [isPopupOpen, setPopupOpen] = useState(false);
  // console.log(place)

  const handleMarkerClick = () => {
    // console.log("Marker clicked", place?.name);
    setPopupOpen(!isPopupOpen);
  };

  const handleClose = () => {
    setPopupOpen(false);
    dispatch(setClickedItem(null))
  };

  // console.log("Rendering MapMarker for", place);

  const defaultImageUrl =
    "https://bolt-gcdn.sc-cdn.net/3/Z2i0CKb1i5GtNvg8xNoP7.256.IRZXSOY?mo=GlgaFhoAGgAyAX06AQRCBgjm_5mrBlBJYAFaEERmTGFyZ2VUaHVtYm5haWyiARQIgAIiDwoCSAISACoHSVJaWFNPWaIBFAiaCiIPCgJIAxIAKgdJUlpYU09Z&uc=73";

  useEffect(() => {
    if (clickedItem?._id === place?._id) {
      handleMarkerClick()
    }
  }, [])

  return (
    <div className="marker-container gmap-marker">
      <>
        <div className="marker-info" onClick={handleMarkerClick}>
          <div className="info-wrapper wrapper" style={{ position: 'relative' }}>
            {
              idx === 5 && (
                <LottieBackground animationData={animationData} />
              )
            }
            {/* <div className="info-title">
          <span className="title-text">{place.name}</span>
        </div> */}
            <div
              className="info-image"
              style={{
                backgroundImage: `url(${place.thumbnail || defaultImageUrl})`,
                boxShadow: `${idx === 5 && "0 0 0 6px rgb(117, 56, 215)"}`,

              }}
            ></div>
          </div>
        </div>

        {isPopupOpen && (
          <PopupPortal>
            <div className="mt-6 custom-popup fixed rounded-lg  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  shadow-lg border  w-[270px]  mx-auto z-50">
              <button
                className="absolute top-2 right-2  hover:text-gray-800"
                onClick={handleClose}
              >
                X
              </button>
              <div className="flex flex-col rounded-lg">
                <Image loading="lazy"
                  src={place.images[0]}
                  height={100}
                  width={200}
                  alt="store-image"
                  className="w-full rounded-t-lg h-[125px] object-cover"
                />

                <div className="flex flex-col  px-2 mt-1">
                  <p className="text-[16px] sm:text-[14px] font-semibold">
                    {place.name}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {place.address}
                  </p>
                  <p className="text-gray-600 text-[14px] my-1 font-semibold w-full text-left">
                    {place.phone}
                  </p>
                </div>
              </div>
            </div>
          </PopupPortal>
        )}
      </>
    </div>
  );
};

export default MapMarker;
