import { createSlice } from "@reduxjs/toolkit";

export const imageDataSlice = createSlice({
  name: "images",
  initialState: {
    productImages: [],
    images: [],
  },
  reducers: {
    setProductImages: (state, action) => {
      console.log(action);
      state.productImages = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
  },
});

export const { setProductImages, setImages } = imageDataSlice.actions;
export const selectProductImages = (state) => state.images.productImages;
export const selectImages = (state) => state.images.images;

export default imageDataSlice.reducer;
