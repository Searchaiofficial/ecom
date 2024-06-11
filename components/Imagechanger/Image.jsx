import React, { useEffect, useState } from "react";
import Image from "next/image";

const Imagechanger = () => {
  // const [index, setIndex] = useState(0);
  const [openStates, setOpenStates] = useState([false, false, false]); // State to track open/close state

  const text = [
    "dsadasdorem ipsum dolor sit amet, consectetur adipissit amet, consect eiusmod tempor incididunt ut labore et dolore magnasit amet, consect eiusmod tempor incididunt ut labore et dolore magnacing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
    "orem ipsudolor sit amet, consect eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim v dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipisc dolor sit amet, consectetur adipisciieniam,",
    "lorem ipsum dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipisci dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
  ];

  const img = [
    "https://images.unsplash.com/photo-1701295463149-e8ab9a5acc71?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1701293773241-de1a7bff8e3d?q=80&w=1141&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1701293773299-423854fabb0a?q=80&w=1138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const img2 = [
    "https://images.unsplash.com/photo-1701293773241-de1a7bff8e3d?q=80&w=1141&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1701295463149-e8ab9a5acc71?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1701293773299-423854fabb0a?q=80&w=1138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const img3 = [
    "https://images.unsplash.com/photo-1701293773299-423854fabb0a?q=80&w=1138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1701295463149-e8ab9a5acc71?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1701293773241-de1a7bff8e3d?q=80&w=1141&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const [imageSrc, setImageSrc] = useState(img);
  const Heading = [
    "Watch your heart",
    "Tune into your wellness",
    "Improve your sleep habits",
  ];

  const handleToggle = (clickedIndex) => {
    const newOpenStates = openStates.map((state, idx) =>
      idx === clickedIndex ? !state : false
    );
    setOpenStates(newOpenStates);

    // Reset progress values when manually toggling
    setProgress1(0);
    setProgress2(0);
    setProgress3(0);

    if (clickedIndex === 0) {
      setimgIndex(0);
      setImageSrc(img);
    } else if (clickedIndex === 1) {
      setimgIndex(0);

      setImageSrc(img2);
    } else if (clickedIndex === 2) {
      setimgIndex(0);

      setImageSrc(img3);
    }
  };
  //progress
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);
  const [imgindex, setimgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress1((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1
      );

      if (progress1 === 100) {
        setimgIndex(1);
        setProgress2((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 1
        );
      }

      if (progress2 === 100 && progress1 === 100) {
        setimgIndex(2);
        setProgress3((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 1
        );
      }
    }, 30);

    return () => clearInterval(interval);
  }, [progress1, progress2, progress3]);

  //
  return (
    <>
      <div className="w-full h-full py-20 flex sm:flex-row flex-col sm:px-[50px] px-[20px]">
        <div className="left text-container flex flex-col sm:w-1/2 w-[80vw] h-full">
          <div className="text-container  py-8">
            <h1 className="font-bold sm:text-3xl  text-xl">
              Get to know your health
            </h1>
            <h3 className=" text-gray-500 pt-3.5 ">
              Bands shown may be sold seperately and may not be <br />
              available in all countries
            </h3>
          </div>
          {Heading.map((value, idx) => (
            <div key={idx} className="pb-5">
              {idx === 1 && <div className="" />}
              <div
                onClick={() => handleToggle(idx)}
                className="flex  items-center "
              >
                <h1
                  className={`sm:text-2xl text-[20px] font-medium  text-left cursor-pointer ${openStates[idx] && "open"
                    }`}
                >
                  {value}
                </h1>
                {openStates[idx] ? (
                  <Image
                    src="/icons/uparrow.svg"
                    width={20}
                    height={20}
                    alt="up"
                    className="text-2xl p-1 ml-3 my-4 text-gray-500 text-left cursor-pointer"
                  />
                ) : (
                  <Image
                    src="/icons/downarrow.svg"
                    width={20}
                    height={20}
                    alt="down"
                    className="text-2xl p-1 ml-3 my-4 text-gray-500 text-left cursor-pointer"
                  />
                )}
              </div>
              <div
                className={`sm:w-[23rem] w-[80vw] ${openStates[idx] ? "open" : ""
                  }`}
              >
                <p className={`${idx + 1}text`}>
                  {openStates[idx] ? text[idx] : ""}
                </p>
                {idx === 1 && <hr className="border-0" />}
              </div>
            </div>
          ))}
        </div>
        <div className="right image-container flex w-1/2 h-full">
          <div className="flex w-full h-full justify-center items-center relative">
            <div className=" absolute top-0 left-0 w-full h-6 z-20 flex justify-center gap-2 items-center">
              <div className="progressContainer1 bg-white bg-opacity-50 w-3/12  h-[3px]">
                <div
                  className="progressLine  bg-white h-full"
                  style={{ width: `${progress1}%` }}
                ></div>
              </div>
              <div className="progressContainer2 bg-white bg-opacity-50 w-3/12  h-[3px]">
                <div
                  className="progressLine  bg-white h-full"
                  style={{ width: `${progress2}%` }}
                ></div>
              </div>
              <div className="progressContainer3 bg-white bg-opacity-50 w-3/12  h-[3px]">
                <div
                  className="progressLine  bg-white  h-full"
                  style={{ width: `${progress3}%` }}
                ></div>
              </div>
            </div>
            <img
              src={imageSrc[imgindex]}
              alt=""
              className=" w-[100%] h-[34rem] lazyload"
            />
            <div className="absolute bottom-4 left-4 flex text-white text-lg">
              Your text
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Imagechanger;
