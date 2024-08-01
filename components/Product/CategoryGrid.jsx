"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CategoryGrid = ({ grid }) => {
  return (
    <>
      {grid.link ? (
        <Link
          href={grid.link}
          className={`flex flex-col ${
            !grid.image && "justify-center "
          } border-b border-r  sm:border-none bg-[#f5f5f5]`}
        >
          {grid.image && (
            <div className="relative z[-999999] w-fit">
              <div className="relative flex h-full w-full items-center justify-center  aspect-square">
                <Image
                  src={grid.image}
                  height={300}
                  width={300}
                  className="aspect-square w-[400px]"
                />
              </div>
            </div>
          )}
          <div className="p-8">
            {grid.title && (
              <p className="text-sm text-[#757575]">{grid.title}</p>
            )}
            {grid.description && (
              <p className="text-bold">{grid.description}</p>
            )}
          </div>
        </Link>
      ) : (
        <div
          className={`flex flex-col ${
            !grid.image && "justify-center "
          } border-b border-r  sm:border-none bg-[#f5f5f5]`}
        >
          {grid.image && (
            <div className="relative z[-999999] w-fit">
              <div className="relative flex h-full w-full items-center justify-center  aspect-square">
                <Image
                  src={grid.image}
                  height={300}
                  width={300}
                  className="aspect-square w-[400px]"
                />
              </div>
            </div>
          )}
          <div className="p-8">
            {grid.title && (
              <p className="text-sm text-[#757575]">{grid.title}</p>
            )}
            {grid.description && (
              <p className="text-bold">{grid.description}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryGrid;
