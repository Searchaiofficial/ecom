"use server";

import { createApiEndpoint } from "@/components/Features/api";
import axios from "axios";

export const fetchDisplayData = async () => {
  try {
    const response = await axios.get(createApiEndpoint("getBannerSection"));
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log("Error in fetching the Display data:", error);
  }
};
