"use client";
import React from "react";
import dynamic from "next/dynamic";
const Learn = dynamic(()=>import('./Learn'))
const Form = dynamic(()=>import('./Form'))
import { selectRoomStatus } from "../Features/Slices/roomSlice";
import { useSelector } from "react-redux";
const Checkoutmain = () => {
  const roomStatus = useSelector(selectRoomStatus);
  return (
    <div>
      {roomStatus === "succeeded" && <div>success</div>}
      <div className="grid grid-col-2">
        <div className="col-span-1 sm:mx-32 mx-7 mt-32">
          <Learn />
          <Form />
          <div>
            <p className="mt-4 mb-8 text-xl font-semibold">Delivery</p>
            <hr className="w-1/2" />
            <p className="mt-4 mb-8 text-xl font-semibold text-gray-400">
              Shipping
            </p>
            <hr className="w-1/2" />
            <hr className="w-1/2" />
            <p className="mt-4 mb-8 text-xl font-semibold text-gray-400">
              Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkoutmain;
