"use client";

import React, { useState } from "react";
import "./tabs.css";
import Image from "next/image";
import Label from "../Label/Label";
import Link from "next/link";
const TabImage = ({ src, alt, width, height, labelData, href }) => {
  const circledData = Array.isArray(labelData) ? labelData : [labelData];

  const [openData, setOpenData] = useState(
    new Array(circledData.length).fill(false)
  );

  return (
    <div className="child w-full h-full row-span-2 relative">
      {href ? (
        <Link href={href} className="h-full w-full">
          <Image
            className="h-full w-full object-cover"
            src={src}
            alt={alt}
            width={width}
            height={height}
          />
        </Link>
      ) : (
        <Image
          className="h-full w-full object-cover"
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
      )}
      <div className="cursor-pointer">
        {circledData.map((data, idx) => (
          <div
            key={idx}
            onClick={() => {
              setOpenData((prev) => {
                const next = [...prev];
                next[idx] = !next[idx];
                return next;
              });
            }}
            className="border-2 border-neutral-300 hover:border-white top-16 left-16 absolute hover:bg-[rgba(0,0,0,0.3)] rounded-full size-[30px] flex items-center justify-center transition-all duration-200 before:content-[''] before:size-3 before:bg-white  before:rounded-full before:hover:size-2 before:transition-all before:duration-200"
          >
            {openData[idx] ? <Label data={data} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabImage;
