// formSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    zoom: 5,
    coords: { lat: 20.5937, lng: 78.9629 }
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        updateZoom: (state, action) => {
            state.zoom = action.payload;
        },
        updateCoords: (state, action) => {
            state.coords = action.payload;
        }
    },
});

export const { updateZoom, updateCoords } = mapSlice.actions;
export const selectMapDataZoom = (state) => state.map.zoom;
export const selectMapDataCoords = (state) => state.map.coords;

export default mapSlice.reducer;
