import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  recommendedProductData:null,
  loader:false
};

export const recommendationSlice = createSlice({
  name: "recommendedProduct",
  initialState,
  reducers: {
    recomendProduct: (state, action) => {
      state.recommendedProductData = action.payload;
    },
    recomendationLoader:(state,action)=>{
        state.loader = action.payload;
    },
    fetchRecommendationRequest: (state) => {
      state.status = 'loading';
    },
  },
});

export const {
  recomendProduct,
  recomendationLoader,
  fetchRecommendationRequest,
} = recommendationSlice.actions;

export const selectRecommendedProduct = (state) => state.recommendedProduct.recommendedProductData;
export const selectRecommendationLoader = (state) => state.recommendedProduct.recomendationLoader;
export const selectRecommendationStatus = (state) => state.recommendedProduct.status;

export default recommendationSlice.reducer;
