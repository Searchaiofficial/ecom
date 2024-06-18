import React from "react";
import "@/components/Product/styles.css";
import Image from "next/image";

const TabsProductContent = (props) => {
  const {
    key,
    commonClasses,
    filterName,
    isFilterOpen,
    handleAll,
    handleTabClick,
    handleFilter,
    handleAllFilter,
    filterArr,
    renderFilter,
    openContent,
    handleContent,
    typeContent,
    renderTypeContent,
    stickyDrop,
    handleFilterClick,
    openFilter,
  } = props;

  const formatDimensions = (dimension) => {
    const { length, width, thickness } = dimension;
    return `${length.value}${length.unit} x ${width.value}${width.unit} x ${thickness.value}${thickness.unit}`;
  };

  const renderDimensions = (dimension, index) => (
    <div key={index} className="dimension-item">
      {formatDimensions(dimension)}
    </div>
  );

  return (
    <>
      <div className="">
        <div className="flex flex-col w-fit">
          <button
            onClick={() => {
              if (typeof window !== "undefined" && window.innerWidth <= 450) {
                handleAll();
                handleTabClick();
                handleAllFilter();
              } else {
                handleFilter();
                handleTabClick();
              }
            }}
            className={`bg-gray-100
                  ${isFilterOpen
                ? `relative active-tabs z-10 border text-[14px] font-medium border-black ${commonClasses}`
                : `relative tabS  border text-[14px] font-medium border-white ${commonClasses}`
              }
            ${() =>
                typeof window !== "undefined" && window.innerWidth <= 450
                  ? " justify-center"
                  : " justify-between"}
          `}
          >
            {filterName} &nbsp;
            <Image
              src="/icons/backarrow.svg"
              width={40}
              height={40}
              className={`w-4 h-4 mt-1 sm:block hidden
              ${isFilterOpen ? " rotate-90" : "-rotate-90"}
            `}
              alt=""
            />
          </button>
          {isFilterOpen ? (
            <div className="flex z-10 top-[65px] flex-col px-5 py-5 overflow-y-auto bg-white border gap-7 rounded-2xl w-72 max-h-80 absolute">
              {filterName === "Dimensions"
                ? filterArr.map(renderDimensions)
                : filterArr.map(renderFilter)}
              {filterName === "Type" ? (
                <button
                  className={`text-left underline
                  ${openContent ? "hidden" : "block"}
                `}
                  onClick={handleContent}
                >
                  +7 more
                </button>
              ) : null}
              {openContent ? typeContent.map(renderTypeContent) : null}
              {filterName === "Type" && openContent ? (
                <button
                  onClick={handleContent}
                  className={`text-left underline ${openContent ? "block" : "hidden"
                    }`}
                >
                  Less
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TabsProductContent;
