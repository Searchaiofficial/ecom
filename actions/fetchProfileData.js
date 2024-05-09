"use server";

import { createApiEndpoint } from "@/components/Features/api";
import axios from "axios";

export const fetchProfileData = async () => {
  try {
    const response = await axios.get(createApiEndpoint("profileContent"));
    return response.data;
  } catch (error) {
    console.error(`Error fetching profile content: ${error.message}`);
    throw error;
  }
};
