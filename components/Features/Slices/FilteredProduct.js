import { createSlice } from "@reduxjs/toolkit";

const filteredProductSlice = createSlice({
  name: "filteredProduct",
  initialState: {
    filteredproductitem: [],
    currentPage: 1,
    itemsPerPage: 2,
    totalPages: 1,
  },
  reducers: {
    setFilteredProduct: (state, action) => {
      state.filteredproductitem = action.payload;
    },
    setFilteredProductCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilteredProductItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

  },
});

export const { setFilteredProduct, setFilteredProductCurrentPage, setFilteredProductItemsPerPage, setTotalPages } = filteredProductSlice.actions;

export const selectedFilteredProduct = (state) =>
  state.filteredProduct.filteredproductitem;
export const selectFilteredProductCurrentPage = (state) =>
  state.filteredProduct.currentPage;

export const selectFilteredProductItemsPerPage = (state) =>
  state.filteredProduct.itemsPerPage;

export const selectTotalPages = (state) => state.filteredProduct.totalPages;
export default filteredProductSlice.reducer;
