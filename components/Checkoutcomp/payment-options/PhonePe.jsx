"use client";

import { BASE_URL } from "@/constants/base-url";
import axios from "axios";
import { SHA256 } from "crypto-js";
import { v4 as uuid } from "uuid";

const { ChevronRight } = require("lucide-react");

const PhonePe = ({ totalPrice }) => {
  const apiEndpoint = "/pg/v1/pay";
  const phonePeBaseUrl = process.env.NEXT_PUBLIC_PHONEPE_API_BASE_URL;
  const saltKey = process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_KEY;
  const saltIndex = process.env.NEXT_PUBLIC_PHONEPE_KEY_INDEX;
  const merchantId = process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID;

  const makePayment = async () => {
    const transactionId = "T-" + uuid().toString(36).slice(-8); // Link this to database in future

    const payload = {
      merchantId: merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: "MUID123",
      amount: +totalPrice,
      redirectUrl: `${BASE_URL}/success`,
      redirectMode: "REDIRECT",

      callbackUrl: `${BASE_URL}/success`,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
      "base64"
    );

    const fullUrl = encodedPayload + apiEndpoint + saltKey;

    const checksum = SHA256(fullUrl) + "###" + saltIndex;

    try {
      const response = await axios.request({
        method: "POST",
        url: `${phonePeBaseUrl}${apiEndpoint}`,
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
        data: {
          request: encodedPayload,
        },
      });

      console.log(response.data);
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
