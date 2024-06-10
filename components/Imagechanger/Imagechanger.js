import React, { useEffect, useState } from "react";
import "./styles.css";
import Image from "next/image";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectedImagechanger } from "../Features/Slices/ImagechangerSlice";

const Imagechanger = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [openStates, setOpenStates] = useState([false, false, false]);
  const [apiData, setApiData] = useState([]);

  const ImagechangerData = useSelector(selectedImagechanger);
  // useEffect(() => {
  //   const fetchApiData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getMidInfoSection`
  //       );
  //       // console.log(response.data);
  //       setApiData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching API data:", error);
  //     }
  //   };
  //   if (apiData.length === 0) {
  //     //apiData length is zero everytime, I think that is why the data is being fetched
  //     // console.log("Imagechanger API fetched")
  //     fetchApiData();
  //   }
  // }, []);
  useEffect(() => {
    if (ImagechangerData.length === 0) {
      dispatch({ type: "FETCH_IMAGECHANGER_DATA", payload: "Imagechanger" });
    }
  }, []);

  const text = [
    "dsadasdorem ipsum dolor sit amet, consectetur adipissit amet, consect eiusmod tempor incididunt ut labore et dolore magnasit amet, consect eiusmod tempor incididunt ut labore et dolore magnacing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
    "orem ipsudolor sit amet, consect eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim v dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipisc dolor sit amet, consectetur adipisciieniam,",
    "lorem ipsum dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
  ];

  const handleToggle = (clickedIndex) => {
    setIndex(clickedIndex);
    setOpenStates((prevStates) =>
      prevStates.map((state, idx) => (idx === clickedIndex ? !state : false))
    );
  };

  return (
    <div className="main-trend imagechanger w-full h-full flex sm:flex-row flex-col gap-[10px]">
      <div className="left text-container flex flex-col w-1/2 h-full">
        <div className="text-container py-8 ">
          <h1 className="font-bold sm:text-3xl text-xl">
            Get to know your health
          </h1>

          <h3 className=" text-gray-500 pt-3.5 sm:pr-48 pr-0">
            Bands shown may be sold separately and may not be available in all
            countries
          </h3>
        </div>
        {ImagechangerData[0]?.sections?.map((value, idx) => (
          <div key={idx} className="trending-choice ">
            {idx === 1 && (
              <>
                <div
                  onClick={() => handleToggle(idx)}
                  className="flex  items-center "
                >
                  <h1 className="expanding-text my-4 sm:font-bold font-medium sm:text-2xl text-[20px] text-left cursor-pointer">
                    {value.heading}
                  </h1>
                  {index === idx ? (
                    <Image
                      src="/icons/up.svg"
                      width={20}
                      height={20}
                      alt="up"
                      className="text-2xl p-1 sm:ml-3 my-4 text-gray-500 text-left cursor-pointer "
                    />
                  ) : (
                    <Image
                      src="/icons/down.svg"
                      width={20}
                      height={20}
                      alt="up"
                      className="text-2xl p-1 sm:ml-3 my-4 text-gray-500 text-left cursor-pointer "
                    />
                  )}
                </div>
              </>
            )}
            {idx !== 1 && (
              <div
                onClick={() => handleToggle(idx)}
                className="flex items-center "
              >
                <h1 className="sm:font-bold font-medium sm:text-2xl text-[20px] mb-2  text-left cursor-pointer">
                  {value.heading}
                </h1>
                {openStates[idx] ? (
                  <Image
                    src="/icons/up.svg"
                    width={20}
                    height={20}
                    alt="up"
                    className="sm:font-bold font-medium sm:text-2xl text-lg text-gray-500 cursor-pointer"
                  />
                ) : (
                  <Image
                    src="/icons/down.svg"
                    width={20}
                    height={20}
                    alt="up"
                    className="sm:font-bold font-medium sm:text-2xl text-lg text-gray-500 cursor-pointer"
                  />
                )}
              </div>
            )}
            {openStates[idx] && (
              <div
                className={` sm:w-[90%] w-[80vw] sm:text-left text-justify `}
              >
                <p className={`${idx + 1}text`}>
                  {openStates[idx] ? text[idx] : ""}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="right  flex w-1/2 h-full">
        <div className="flex w-full h-[34rem] items-center relative">
          {ImagechangerData[0]?.sections?.map((image, i) => (
            <img
              key={i}
              src={image.imageUrl}
              alt=""
              className={` w-full h-full ${index === i ? "visible" : "hidden"
                } `}
            />
          ))}
          <div className="absolute bottom-4 left-4 flex text-white text-lg">
            Your text
          </div>
        </div>
      </div>
    </div>
  );
};
export default Imagechanger;
