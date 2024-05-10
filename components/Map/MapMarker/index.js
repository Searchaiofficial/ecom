import { IoClose } from "react-icons/io5";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const PopupPortal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

const MapMarker = ({ place }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleMarkerClick = () => {
    // console.log("Marker clicked", place?.name);
    setPopupOpen(!isPopupOpen);
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  // console.log("Rendering MapMarker for", place);

  const defaultImageUrl =
    "https://bolt-gcdn.sc-cdn.net/3/Z2i0CKb1i5GtNvg8xNoP7.256.IRZXSOY?mo=GlgaFhoAGgAyAX06AQRCBgjm_5mrBlBJYAFaEERmTGFyZ2VUaHVtYm5haWyiARQIgAIiDwoCSAISACoHSVJaWFNPWaIBFAiaCiIPCgJIAxIAKgdJUlpYU09Z&uc=73";

  return (
    <div className="marker-container gmap-marker">
      <>
        <div className="marker-info" onClick={handleMarkerClick}>
          <div className="info-wrapper wrapper">
            <div className="info-title">
              <span className="title-text">{place.name}</span>
            </div>
            <div
              className="info-image"
              style={{
                backgroundImage: `url(${place.thumbnail || defaultImageUrl})`,
              }}
            ></div>
          </div>
        </div>

        {isPopupOpen && (
          <PopupPortal>
            <div className="mt-6 custom-popup fixed p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white pb-4 shadow-lg border rounded-md w-[320px]  mx-auto z-50">
              {/* <div className="relative flex">
                <img
                  className="rounded w-full h-auto"
                  // src={place.images[0]}
                  // alt={place.name}
                /> */}
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={handleClose}
              >
                <IoClose />
              </button>
              {/* </div> */}

              <div className="flex flex-col gap-2 items-center">
                <p className="text-lg sm:text-xl font-semibold">{place.name}</p>
                <p className="text-sm text-gray-500">{place.address}</p>
                <p className="text-gray-600 text-sm font-semibold w-full text-left">
                  {place.phone}
                </p>
              </div>
            </div>
          </PopupPortal>
        )}
      </>
    </div>
  );
};

export default MapMarker;
