"use server";

import { createApiEndpoint } from "@/components/Features/api";
import axios from "axios";

export const fetchGalleryData = async () => {
  try {
    const response = await axios.get(createApiEndpoint("getnewProductSection"));
    console.log(response.data)

    return response.data[1];
  } catch (error) {
    console.log("Error in fetching the Gallery data:", error);
  }
};
