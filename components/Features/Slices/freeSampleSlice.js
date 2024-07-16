import { createSlice } from "@reduxjs/toolkit";

const freeSampleSlice = createSlice({
  name: "freeSample",
  initialState: {
    dbItems: null,
    orderId: null,
  },
  reducers: {
    setFreeSamples: (state, action) => {
      state.dbItems = action.payload;
    },
    setSampleOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const { setFreeSamples, setSampleOrderId } = freeSampleSlice.actions;

export const selectFreeSampleItems = (state) => state.freeSample.dbItems;
export const selectFreeSampleOrderId = (state) => state.freeSample.orderId;

export default freeSampleSlice.reducer;
