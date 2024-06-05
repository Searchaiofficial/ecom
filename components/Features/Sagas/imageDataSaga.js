import { call, put, takeEvery, select } from "redux-saga/effects";
import { setProductImages, setImages } from "../Slices/imageDataSlice";

export const FETCH_IMAGE_DATA = "FETCH_IMAGE_DATA";

const filterData = (data, color) => {
  return data.productImages.filter((item) => item.color === color);
};

const getFromStore = (state) => state.roomdetails.roomData;

function* fetchImageData(action) {
  try {
    const roomData = yield select(getFromStore);
    const color = action.payload;

    let filteredImages;
    if (roomData.productImages && roomData.productImages.length > 0 && color) {
      filteredImages = yield call(filterData, roomData, color);
      yield put(setProductImages(filteredImages));
    } else {
      filteredImages = roomData.images;
      yield put(setImages(roomData.images));
      yield put(setProductImages([]));

    }
  } catch (error) {
    console.error("Error fetching image data:", error);
  }
}

export function* watchFetchImageData() {
  yield takeEvery(FETCH_IMAGE_DATA, fetchImageData);
}
