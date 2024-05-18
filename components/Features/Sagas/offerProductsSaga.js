import { call, put, takeEvery } from "redux-saga/effects";
import { fetchProductsFromOffers as fetchProductsFromOffersApi } from "../api";
import {
  getOfferProductsSuccess,
  loadOfferProductsFetch,
} from "../Slices/offerProductsSlice";

function* fetchProductsFromOffers(action) {
  try {
    const data = yield call(fetchProductsFromOffersApi, action.payload);
    yield put(getOfferProductsSuccess(data));
  } catch (error) {
    console.error("Error fetching products from offer:", error);
  } finally {
    yield put(loadOfferProductsFetch(false));
  }
}

export function* watchFetchProductsFromOffers() {
  yield takeEvery("FETCH_PRODUCTS_FROM_OFFER", fetchProductsFromOffers);
}
