import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  loader: false,
  product: {},
};

export const offerProductsSlice = createSlice({
  name: "offerProducts",
  initialState,
  reducers: {
    loadOfferProductsFetch: (state) => {
      state.status = "loading";
    },
    getOfferProductsSuccess: (state, action) => {
      state.product = action.payload;
      state.status = "succeeded";
    },
    getOfferProductsFailure: (state) => {
      state.status = "failed";
    },
  },
});

export const {
    loadOfferProductsFetch,
    getOfferProductsSuccess,
    getOfferProductsFailure,
} = offerProductsSlice.actions;

export const selectOfferProducts = (state) => state.offerProducts.product;
export const selectOfferProductsStatus = (state) => state.offerProducts.status;

export default offerProductsSlice.reducer;
