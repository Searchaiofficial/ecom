"use server";

import { createApiEndpoint } from "@/components/Features/api";
import axios from "axios";

export const fetchRoomData = async () => {
  try {
    const response = await axios.get(createApiEndpoint("rooms"));
    return response.data;
  } catch (error) {
    console.log("Error in fetching the Display data:", error);
  }
};
