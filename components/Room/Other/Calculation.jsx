"use client";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";



const Calculation = ({ priceData }) => {

  const [widthstate, setwidthstate] = useState(0);
  const [heightstate, setheightstate] = useState(0);
  const [pricestate, setpricestate] = useState(0);
  const [coststate, setcoststate] = useState(0);
  const [rollstate, setrollstate] = useState(0);

  const priceCal = () => {
    const area = (widthstate * heightstate) / 50;
    const calculatedPrice = area * coststate;
    setpricestate(calculatedPrice.toFixed(2));
    setrollstate(area.toFixed(2));
  };
  useEffect(() => {
    setcoststate(priceData?.perUnitPrice);
  }, [priceData]);
  useEffect(() => {
    priceCal();
    // dispatch(
    //   updateCalculationData({
    //     height: heightstate,
    //     width: widthstate,
    //     yourPrice: pricestate,
    //     PINcode: "", // Set PINcode as per your implementation
    //     city: "", // Set city as per your implementation
    //   })
    // );
  }, [widthstate, heightstate, coststate, pricestate]);

  const [hidden, setHidden] = useState(false);
  const handleCal = () => {
    setHidden(!hidden);
  };
  return (
    <div>
      <div className="calculation-container sm">
          {/* <div>
            <Image
              src="/icons/calculator-icon.svg"
              width={20}
              height={20}
              alt="calculate"
              className="flex-start -ml-3 mr-3 mb-3"
            />
          </div> */}
          {/* <span className=" self-start">Calculate</span> */}
          {/* {!hidden ? (
            <Image
              src="/icons/arrow-circle-right-icon.svg"
              width={23}
              height={23}
              alt="arrow right"
              onClick={handleCal}
              className="cursor-pointer ml-28"
            />
          ) : (
            <Image
              src="/icons/arrow-circle-down.svg"
              width={23}
              height={23}
              alt="arrow down"
              onClick={handleCal}
              className="cursor-pointer ml-32"
            />
          )} */}

        {/* <div className="pb-3 text-gray-600 sm:pl-5 -mt-4 pt-1">
          As per your requirement
        </div> */}
          <div className="calc mr-4 mb-4 mt-4 flex-col">
            {/* Dimension Inputs */}
            <div className="dim flex flex-row">
              <div
                className="height border border-gray-300  w-1/2 p-2 flex flex-col"
                style={{
                  borderRadius: "10px 0px 0px 0px",
                }}
              >
                <h3 className="mb-2 ml-2 font-semibold">Height (Meters)</h3>
                <input
                  onChange={(e) => {
                    setheightstate(e.target.value);
                    priceCal();
                  }}
                  value={heightstate}
                  type="text"
                  className="input-field focus:outline-none w-full h-full ml-2 active:border-none"
                />
              </div>
              <div
                className="width border border-gray-300  w-1/2 p-2 flex flex-col"
                style={{
                  borderRadius: "0px 10px 0px 0px",
                }}
              >
                <h3 className="mb-2 ml-2 font-semibold">Width (Meters)</h3>
                <input
                  onChange={(e) => {
                    setwidthstate(e.target.value);
                    priceCal();
                  }}
                  value={widthstate}
                  type="text"
                  className="input-field focus:outline-none w-full h-full active:border-none ml-2"
                />
              </div>
            </div>

            <div
              className="price border border-gray-300  w-full p-2 flex flex-col"
              style={{
                borderRadius: "0px 0px 10px 10px",
              }}
            >
              <h3 className="mb-2 ml-2 font-semibold">Price</h3>
              <h2 className="ml-2 mb-2">
                {pricestate} ({rollstate} Rolls Requires)
              </h2>
            </div>
          </div>
      
      </div>
    </div>
  );
};  

export default Calculation;
