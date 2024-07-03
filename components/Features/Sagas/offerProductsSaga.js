import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchProductsFromOffers as fetchProductsFromOffersApi } from "../api";
import {
  getOfferProductsSuccess,
  loadOfferProductsFetch,
  selectOfferProductCurrentPage,
  selectOfferTotalPages,
  selectofferProductItemsPerPage,
  setOfferTotalPages,
} from "../Slices/offerProductsSlice";
import axios from "axios";
import { useSelector } from "react-redux";

function* fetchProductsFromOffers(action) {

  const currentPage = yield select(selectOfferProductCurrentPage);
  const itemsPerPage = yield select(selectofferProductItemsPerPage);
  // const totalPages = yield select(selectOfferTotalPages);


  try {
    // console.log(action.payload)
    // const data = yield call(fetchProductsFromOffersApi, action.payload);
    // console.log(currentPage)
    // console.log(itemsPerPage)
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllProductsByOffer/${action.payload}?page=${currentPage}&itemsPerPage=${itemsPerPage}`;
    const response = yield call(axios.get, apiUrl);
    console.log("saga",response.data.products)
    // console.log(response.data)
    // console.log(response.data.products.length)
    yield put(getOfferProductsSuccess(response.data.products));
    yield put(setOfferTotalPages(Math.ceil(response.data.totalproducts / itemsPerPage)));
  } catch (error) {
    console.error("Error fetching products from offer:", error);
  } finally {
    yield put(loadOfferProductsFetch(false));
  }
}

export function* watchFetchProductsFromOffers() {
  yield takeEvery("FETCH_PRODUCTS_FROM_OFFER", fetchProductsFromOffers);
}
