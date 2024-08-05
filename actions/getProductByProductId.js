"use server";

import axios from "axios";

export const getProductByProductId = async (productId) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getproductbyproductid/${productId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
