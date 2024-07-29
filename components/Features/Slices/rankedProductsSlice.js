import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  loader: false,
  rankedProductsData: [],
};

export const rankedProductsSlice = createSlice({
  name: "rankedProducts",
  initialState,
  reducers: {
    loadRankedProductsFetch: (state) => {
      state.status = "loading";
    },
    getRankedProductsSuccess: (state, action) => {
      state.rankedProductsData = action.payload;
      state.status = "succeeded";
    },
    getRankedProductsFailure: (state) => {
      state.status = "failed";
    },
  },
});

export const {
  loadRankedProductsFetch,
  getRankedProductsSuccess,
  getRankedProductsFailure,
} = rankedProductsSlice.actions;

export const selectRankedProductsData = (state) =>
  state.rankedProducts.rankedProductsData;
export const selectRankedProductsStatus = (state) =>
  state.rankedProducts.status;

export default rankedProductsSlice.reducer;
