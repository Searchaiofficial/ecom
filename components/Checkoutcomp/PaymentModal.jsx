"use client";

import { XIcon } from "lucide-react";
import { useEffect } from "react";
import PhonePe from "./payment-options/PhonePe";

const PaymentModal = ({ totalPrice, closeModal }) => {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, []);

  return (
    <>
      <div
        onClick={() => closeModal()}
        className="h-screen w-screen fixed backdrop-brightness-50 z-[9999] bg-transparent"
      ></div>
      <div className="w-full max-w-lg bg-white fixed h-64 left-1/2 top-1/2 rounded-lg border shadow-md -translate-x-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-4 items-center py-4 px-2 sm:px-4">
        <button
          className="absolute right-2 sm:right-4 top-4"
          onClick={() => closeModal()}
        >
          <XIcon size={24} />
        </button>
        <h3 className="font-semibold text-lg">Select Payment Method</h3>
        <div className="flex flex-col gap-2 w-full">
          <PhonePe totalPrice={totalPrice} />
          <hr className="w-full" />
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
