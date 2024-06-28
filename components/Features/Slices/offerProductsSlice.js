import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  loader: false,
  product: {},
  currentPage: 1,
  itemsPerPage: 2,
  totalPages: 1,
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
    setOfferProductCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setofferProductItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setOfferTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  loadOfferProductsFetch,
  getOfferProductsSuccess,
  getOfferProductsFailure,
  setOfferProductCurrentPage,
  setOfferTotalPages,
  setofferProductItemsPerPage
} = offerProductsSlice.actions;

export const selectOfferProducts = (state) => state.offerProducts.product;
export const selectOfferProductsStatus = (state) => state.offerProducts.status;
export const selectOfferProductCurrentPage = (state) =>
  state.offerProducts.currentPage;

export const selectofferProductItemsPerPage = (state) =>
  state.offerProducts.itemsPerPage;

export const selectOfferTotalPages = (state) => state.offerProducts.totalPages;

export default offerProductsSlice.reducer;
