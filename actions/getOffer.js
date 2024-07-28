"use server";

import { createApiEndpoint } from "@/components/Features/api";
import axios from "axios";

export const getOffer = async (offerType) => {
  try {
    const response = await axios.get(createApiEndpoint("offer"), {
      params: {
        type: offerType,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching offers: ${error.message}`);
  }
};
