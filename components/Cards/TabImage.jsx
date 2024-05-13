import React from "react";
import "./tabs.css";
import Image from "next/image";
import Label from "../Label/Label";
const TabImage = ({ src, alt, width, height, labelData }) => {
  return (
    <div className="child w-full h-full row-span-2 overflow-hidden relative">
      <Image
        className="h-full w-full object-cover"
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
      <div className="cursor-pointer">
        <div className="border-2 border-neutral-300 hover:border-white lg:top-16 lg:left-16 top-8 left-16 absolute hover:bg-[rgba(0,0,0,0.3)] rounded-full size-[30px] flex items-center justify-center transition-all duration-200 before:content-[''] before:size-3 before:bg-white  before:rounded-full before:hover:size-2 before:transition-all before:duration-200">
          <Label labelData={labelData} />
        </div>
      </div>
    </div>
  );
};

export default TabImage;
