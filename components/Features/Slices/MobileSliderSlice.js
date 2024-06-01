import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: 'idle',
  loader: false,
mobileSliderData: [],
};

export const mobileSliderSlice = createSlice({
  name: "mobileSlider",
  initialState,
  reducers: {
    getsMobileSliderFetch: (state) => {
      state.status = "loading";
    },
    getMobileSliderSuccess: (state, action) => {
      state.mobileSliderData = action.payload;
      state.status = "succeeded";
    },
    getMobileSliderFailure: (state) => {
      state.status = "failed";
    },
    getData: (state) => {
      return state.mobileSliderData;
    },
    fetchMobileSliderRequest: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const {
  getsMobileSliderFetch,
  fetchMobileSliderRequest,
  getMobileSliderSuccess,
  getMobileSliderFailure,
  
} = mobileSliderSlice.actions;

export const selectMobileSliderData = (state) => state.mobileSlider.mobileSliderData;
export const selectMobileSliderLoader = (state) => state.mobileSlider.loader;
export const selectMobileSliderStatus = (state) => state.mobileSlider.status;

export default mobileSliderSlice.reducer;
