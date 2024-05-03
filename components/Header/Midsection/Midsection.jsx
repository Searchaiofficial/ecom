import React from "react";
import SwiperComponent from "./SwiperComponent";
const Midsection = ({setHoveredIndex}) => {
  return (
    <>
      <div className="px-[50px] absolute top-[2.8rem] bg-transparent pt-4 p-2 left-0  flex noto-sans-200 transition-all duration-300 ease-linear w-full ">
        <SwiperComponent setHoveredIndex={setHoveredIndex}/>
      </div>
    </>
  );
};

export default Midsection;
