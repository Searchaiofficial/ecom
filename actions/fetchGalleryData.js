"use server";

import { createApiEndpoint } from "@/components/Features/api";
import axios from "axios";

export const fetchGalleryData = async () => {
  try {
    const response = await axios.get(createApiEndpoint("getnewProductSection"));

    return response.data[0];
  } catch (error) {
    console.log("Error in fetching the Gallery data:", error);
  }
};
