import React, { useState } from "react";
import Image from "next/image";
import "./styles.css";

function Carousel({ data }) {
  const [slide, setSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };


  return (
    <div
      className="carousel cursor-pointer bg-blue-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && slide !== 0 && (
        <Image src='/svg/dropdown/leftvector.svg' height={20} width={20} alt="arrow"
          onClick={prevSlide}
          className="arrow arrow-left"
        />
      )}
      {data?.map((item, idx) => {

        return (
          <Image
            src={item}
            alt="NA"
            key={idx}
            height={300}
            width={300}

            className={slide === idx ? "h-full w-full" : "slide-hidden"}
          />
        );
      })}

      {isHovered && (
        <div>
          <Image src='/svg/dropdown/rightvector.svg' height={20} width={20} alt="arrow"
            onClick={nextSlide}
            className="arrow arrow-right"
          />
        </div>
      )}
      <span className="flex absolute bottom-[16px]">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
}

export default Carousel;
