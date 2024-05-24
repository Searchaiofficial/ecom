// // calculationSlice.js

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   height: 0,
//   width: 0,
//   yourPrice: 0,
//   PINcode: "",
//   city: "",
// };

// export const calculationSlice = createSlice({
//   name: "calculation",
//   initialState,
//   reducers: {
//     updateCalculationData: (state, action) => {
//       return { ...state, ...action.payload };
//     },
//   },
// });

// export const { updateCalculationData } = calculationSlice.actions;
// export const selectCalculationData = (state) => state.calculation;

// export default calculationSlice.reducer;

// calculationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 0, // Set your initial quantity value
  pickup: "",
  schedular: false,
  deliveryPrice: null,
};

export const calculationSlice = createSlice({
  name: "calculation",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    pickupType: (state, action) => {
      state.pickup = action.payload;
    },
    schedularToogle: (state, action) => {
      state.schedular = action.payload;
    },
    deliveryPrice: (state, action) => {
      state.deliveryPrice = action.payload;
    },
  },
});

export const { updateQuantity, pickupType, schedularToogle, deliveryPrice } =
  calculationSlice.actions;
export const selectQuantity = (state) => state.calculation.quantity;
export const selectPickupOption = (state) => state.calculation.pickUpOption;
export const selectSchedular = (state) => state.calculation.schedular;
export const selectDeliveryPrice = (state) => state.calculation.deliveryPrice;

export default calculationSlice.reducer;
