import { createSlice } from "@reduxjs/toolkit";

const productColorSlice = createSlice({
  name: "productColor",
  initialState: {
    color: "",
  },
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { setColor } = productColorSlice.actions;

export const selectColor = (state) => state.productColor.color;

export default productColorSlice.reducer;
