import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function TabsProductCard(props) {
  const [slide, setSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [formattedDate, setFormattedDate] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const startDate = new Date(props.specialprice?.startDate);
    const endDate = new Date(props.specialprice?.endDate);

    const startMonth = startDate.toLocaleString("default", { month: "long" });
    const startDay = startDate.getDate();

    const endMonth = endDate.toLocaleString("default", { month: "long" });
    const endDay = endDate.getDate();
    setFormattedDate({
      startDate: `${startMonth} ${startDay}`,
      endDate: `${endMonth} ${endDay}`,
    });
  }, []);

  const nextSlide = () => {
    setSlide(slide === props.images.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? props.images.length - 1 : slide - 1);
  };
  return (
    <>
      <div
        key={props.idx}
        className="card flex flex-col gap-3 border-b border-r hover-divnine sm:border-none"
        style={{
          width: "100%",
          height: "100%",
        }}
        onClick={() => props.handlenav(props.text._id)}
      >
        <div className="relative z[-999999] w-fit">
          <div
            onClick={(event) => event.stopPropagation()}
            className={`flex justify-between text-black   checkbox-div absolute top-0 right-0 z-10 ${props.selectedpdt.includes(props.text) ? "visible" : ""
              }`}
          >
            <input
              type="checkbox"
              onChange={(e) => {
                props.handleCheckbox(props.text, e.target.checked);
                props.setShowcompare(true);
              }}
              style={{
                border: "2px solid red",
              }}
              checked={props.selectedpdt.includes(props.text)}
            />
          </div>

          {props.demandtype ? (
            <div
              className={
                "flex text-[12px] justify-between text-black font-normal bg-white py-1 px-3 absolute top-2 left-2 z-10"
              }
            >
              {props.demandtype === "Ayatrio Member Favorite" ? "Top Rated" : props.demandtype}
            </div>
          ) : (
            ""
          )}
          <div
            className="relative flex h-full w-full items-center justify-center  aspect-square"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered && slide !== 0 && (
              <Image
                src="/svg/dropdown/leftvector.svg"
                height={20}
                width={20}
                alt="arrow"
                onClick={prevSlide}
                className="arrow arrow-left sm:mt-4"
              />
            )}
            {props.images?.map((item, idx) => {
              return (
                <Link href={`/product/${props.productTitle}`}>
                  <Image
                    src={item}
                    alt="NA"
                    key={idx}
                    height={300}
                    width={300}
                    className={
                      slide === idx ? "aspect-square w-[400px]" : "hidden"
                    }
                  />
                </Link>
              );
            })}

            {isHovered && (
              <div>
                <Image
                  src="/svg/dropdown/rightvector.svg"
                  height={20}
                  width={20}
                  alt="arrow"
                  onClick={nextSlide}
                  className="arrow arrow-right"
                />
              </div>
            )}
            <span className="flex absolute bottom-[16px]">
              {props.images.map((_, idx) => {
                return (
                  <button
                    key={idx}
                    className={
                      slide === idx
                        ? "indicator"
                        : "indicator indicator-inactive"
                    }
                    onClick={() => setSlide(idx)}
                  ></button>
                );
              })}
            </span>
          </div>
        </div>
        {
          props.demandtype === "Ayatrio Member Favorite" && (

            <p className="font-medium text-blue-500 mt-[10px] text-[12px]">{props.demandtype}</p>
          )
        }
        <p className="text-lg font-semibold hover:underline">
          {props.productTitle}
        </p>
        <p className="text-sm">{props.productDescription}</p>

        {props.specialprice ? (
          <div>
            <p className=" text-sm font-semibold bg-yellow-400 price-box w-fit px-2 py-1">
              Rs.<span className="text-3xl">{props.specialprice?.price}</span>
            </p>
            <p className="text-sm mt-2 text-gray-500">
              Regular price: Rs.{props.totalPrice}
            </p>

            {props.specialprice.startDate && props.specialprice.endDate && (
              <p className="text-sm mt-1 text-gray-500">
                Price valid from {formattedDate.startDate} to{" "}
                {formattedDate.endDate}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm font-semibold">
            Rs.<span className="text-3xl">{props.totalPrice}</span>
          </p>
        )}
        {props.ratings?.length > 0 && (
          <p className="flex flex-row items-center gap-1 text-sm text-black">
            {props.stars.map((star, index) => (
              <Image key={index} src={star} alt="star" width={15} height={15} />
            ))}
            ({props.ratings?.length})
          </p>
        )}
      </div>
    </>
  );
}

export default TabsProductCard;
