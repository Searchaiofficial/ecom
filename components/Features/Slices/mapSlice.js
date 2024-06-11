import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    zoom: 5,
    coords: { lat: 20.5937, lng: 78.9629 },
    clickedItem: null,
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
        },
        setClickedItem: (state, action) => {
            state.clickedItem = action.payload;
        },
    },
});

export const { updateZoom, updateCoords, setClickedItem } = mapSlice.actions;
export const selectMapDataZoom = (state) => state.map.zoom;
export const selectMapDataCoords = (state) => state.map.coords;
export const selectClickedItem = (state) => state.map.clickedItem;

export default mapSlice.reducer;
