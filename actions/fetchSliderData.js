"use server";

import { createApiEndpoint } from "@/components/Features/api";
import axios from "axios";

export const fetchDefaultSliderData = async (page = 1, limit = 4) => {
  try {
    const response = await axios.get(
      createApiEndpoint("getImgCircle?limit=" + limit + "&page=" + page)
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchMobileSliderData = async (page = 1, limit = 4) => {
  try {
    const response = await axios.get(
      createApiEndpoint("getMobileSlider?limit=" + limit + "&page=" + page)
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}