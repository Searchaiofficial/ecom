import { BASE_URL } from "@/constants/base-url";
import axios from "axios";
import { NextResponse } from "next/server";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request, { params }) {
  try {
    const data = await request.formData();
    const orderId = params.orderId;

    const code = data.get("code");
    const checksum = data.get("checksum");

    // if (!code || code !== "PAYMENT_SUCCESS") {
    //   const url = new URL("/success", BASE_URL);
    //   return NextResponse.redirect(url, {
    //     status: 301,
    //   });
    // }

    const response = await axios.post(
      `${apiUrl}/api/paymentCallback/${orderId}`,
      {
        checksum,
      }
    );

    // if (response.status !== 200) {
    //   const url = new URL("/success", BASE_URL);
    //   return NextResponse.redirect(url, {
    //     status: 301,
    //   });
    // }

    const isFreeSample = response.data.isFreeSample;

    if (isFreeSample) {
      const url = new URL("/freesamplesuccess", BASE_URL);
      return NextResponse.redirect(url, {
        status: 301,
      });
    }

    const url = new URL("/success", BASE_URL);
    return NextResponse.redirect(url, {
      status: 301,
    });
  } catch (error) {
    console.log(error);
  }
}
