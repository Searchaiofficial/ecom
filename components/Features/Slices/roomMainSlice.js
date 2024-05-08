import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
    name: 'roomMainDetails',
    initialState: {
        status: 'idle',
        error: null,
        roomData: null,
        productData: null,
        roomMain: null,
    },
    reducers: {
        setRoomData: (state, action) => {
            state.roomData = action.payload;
        },
        setProductData: (state, action) => {
            state.productData = action.payload;
        },
        setRoomMain: (state, action) => {
            state.roomMain = action.payload;
        },

    },
});

export const { setRoomData, setProductData, setRoomMain } = roomSlice.actions;

// Selectors
export const selectRoomData = (state) => state.roomMainDetails.roomData;
export const selectProductData = (state) => state.roomMainDetails.productData;
export const selectRoomMain = (state) => state.roomMainDetails.roomMain;

export default roomSlice.reducer;