import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  loader: false,
  galleryData: [],
  roomData: [],
};

export const roomCardSlice = createSlice({
  name: "roomCard",
  initialState,
  reducers: {
    getsGalleryFetch: (state) => {
      state.status = "loading";
    },
    getGallerySuccess: (state, action) => {
      state.galleryData = action.payload;
      state.status = "succeeded";
    },
    getGalleryFailure: (state) => {
      state.status = "failed";
    },
    getRoomDataSuccess: (state, action) => {
      state.roomData = action.payload;
      state.status = "succeeded";
    },
  },
});

export const {
  getsGalleryFetch,
  getGallerySuccess,
  getGalleryFailure,
  getRoomDataSuccess,
} = roomCardSlice.actions;

export const selectGalleryData = (state) => state.roomCard.galleryData;
export const selectGalleryLoader = (state) => state.roomCard.loader;
export const selectRoomData = (state) => state.roomCard.roomData;

export default roomCardSlice.reducer;
