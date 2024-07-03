"use client";

import React, { useEffect, useState } from "react";
import "./tabs.css";
import Image from "next/image";
import Label from "../Label/Label";
import Link from "next/link";
const TabImage = ({ src, alt, width, height, handleTab, labelData, href, firstData, hovered }) => {
  const circledData = Array.isArray(labelData) ? labelData : [labelData];

  console.log("labelData", labelData)
  console.log(circledData)


  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
    if (windowWidth > 600 && firstData) {
      setOpenData((prev) => {
        const next = [...prev];
        next[0] = true;
        return next;
      });
    } else {
      setOpenData((prev) => {
        const next = [...prev];
        next[0] = false;
        return next;
      });
    }
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

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
        {circledData.map((data, idx) => {
          console.log(data?.status)
          if (data?.status === "Active") {
            return (
              <div
                key={idx}
                onClick={() => {
                  setOpenData((prev) => {
                    const next = [...prev];
                    next[idx] = !next[idx];
                    return next;
                  });

                }}
                style={{
                  boxShadow: `0 1px 4px rgba(var(--colour-static-black, 17, 17, 17), 0.55)`,
                  top: `${data?.topPosition}%`,
                  left: `${data?.leftPosition}%`,
                }}
                className={`border-2  border-neutral-300 bg-black/40 hover:border-white  absolute hover:bg-black/70 rounded-full size-[30px] flex items-center justify-center transition-all duration-200 before:content-[''] before:size-3 before:bg-white  before:rounded-full before:hover:size-2 before:transition-all before:duration-200`}
              >
                {openData[idx] ? <Label data={data} /> : null}
              </div>
            )
          }
          if (data?.status === "ActiveWithData") {
            return (
              <div
                key={idx}
                onClick={() => {
                  setOpenData((prev) => {
                    const next = [...prev];
                    next[idx] = !next[idx];
                    return next;
                  });

                }}
                style={{
                  boxShadow: `0 1px 4px rgba(var(--colour-static-black, 17, 17, 17), 0.55)`,
                  top: `${data?.topPosition}%`,
                  left: `${data?.leftPosition}%`,
                }}
                className={`border-2  border-neutral-300 bg-black/40 hover:border-white  absolute hover:bg-black/70 rounded-full size-[30px] flex items-center justify-center transition-all duration-200 before:content-[''] before:size-3 before:bg-white  before:rounded-full before:hover:size-2 before:transition-all before:duration-200`}
              >
                <Label data={data} />
              </div>
            )
          }
          if (data?.status === "Inactive" && hovered) {
            return (
              <div
                key={idx}
                onClick={() => {
                  setOpenData((prev) => {
                    const next = [...prev];
                    next[idx] = !next[idx];
                    return next;
                  });

                }}
                style={{
                  boxShadow: `0 1px 4px rgba(var(--colour-static-black, 17, 17, 17), 0.55)`,
                  top: `${data?.topPosition}%`,
                  left: `${data?.leftPosition}%`,
                }}
                className={`border-2  border-neutral-300 bg-black/40 hover:border-white  absolute hover:bg-black/70 rounded-full size-[30px] flex items-center justify-center transition-all duration-200 before:content-[''] before:size-3 before:bg-white  before:rounded-full before:hover:size-2 before:transition-all before:duration-200`}
              >
                {openData[idx] ? <Label data={data} /> : null}
              </div>
            )
          }

          if (data?.status === undefined) {
            return (
              <div
                key={idx}
                onClick={() => {
                  setOpenData((prev) => {
                    const next = [...prev];
                    next[idx] = !next[idx];
                    return next;
                  });

                }}
                style={{
                  boxShadow: `0 1px 4px rgba(var(--colour-static-black, 17, 17, 17), 0.55)`,
                  top: `${data?.topPosition}%`,
                  left: `${data?.leftPosition}%`,
                }}
                className={`border-2  border-neutral-300 bg-black/40 hover:border-white  absolute hover:bg-black/70 rounded-full size-[30px] flex items-center justify-center transition-all duration-200 before:content-[''] before:size-3 before:bg-white  before:rounded-full before:hover:size-2 before:transition-all before:duration-200`}
              >
                {openData[idx] ? <Label data={data} /> : null}
              </div>
            )
          }

        })}
      </div>
    </div>
  );
};

export default TabImage;
