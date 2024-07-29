import { call, put, takeEvery } from "redux-saga/effects";
import { fetchRankedProductsFoEachCategory } from "../api";
import {
  getRankedProductsSuccess,
  loadRankedProductsFetch,
} from "../Slices/rankedProductsSlice";

function* fetchRankedProductsData() {
  try {
    const data = yield call(fetchRankedProductsFoEachCategory);
    yield put(getRankedProductsSuccess(data));
  } catch (error) {
    console.error("Error fetching Ranked Products data:", error);
  } finally {
    yield put(loadRankedProductsFetch(false));
  }
}

export function* watchFetchRankedProductsData() {
  yield takeEvery("FETCH_RANKED_DATA", fetchRankedProductsData);
}
