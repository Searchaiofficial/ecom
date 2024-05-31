"use client";

import { BASE_URL } from "@/constants/base-url";
import axios from "axios";
import { useRouter } from "next/navigation";

const { ChevronRight } = require("lucide-react");

const PhonePe = ({ totalPrice }) => {
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const makePayment = async () => {
    try {
      const response = await axios.request({
        method: "POST",
        url: `${apiBaseUrl}/api/makepayment`,
        data: {
          amount: +totalPrice * 100,
        },
      });

      const redirectUrl =
        response.data.data.data.instrumentResponse.redirectInfo.url;

      router.push(redirectUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={() => makePayment()}
      className="bg-gray-100 w-full rounded-md py-4 px-2 sm:px-4 flex gap-2 justify-between"
    >
      <span>Pay with PhonePe</span>
      <ChevronRight size={24} />
    </button>
  );
};

export default PhonePe;
