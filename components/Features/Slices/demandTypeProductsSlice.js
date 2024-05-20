import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  loader: false,
  product: {},
};

export const demandTypeProductsSlice = createSlice({
  name: "demandTypeProducts",
  initialState,
  reducers: {
    loadDemandTypeProductsFetch: (state) => {
      state.status = "loading";
    },
    getDemandTypeProductsSuccess: (state, action) => {
      state.product = action.payload;
      state.status = "succeeded";
    },
    getDemandTypeProductsFailure: (state) => {
      state.status = "failed";
    },
  },
});

export const {
  loadDemandTypeProductsFetch,
  getDemandTypeProductsSuccess,
  getDemandTypeProductsFailure,
} = demandTypeProductsSlice.actions;

export const selectDemandTypeProducts = (state) =>
  state.demandTypeProducts.product;
export const selectDemandTypeProductsStatus = (state) =>
  state.demandTypeProducts.status;

export default demandTypeProductsSlice.reducer;
