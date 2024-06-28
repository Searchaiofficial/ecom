import { call, put, select, takeEvery } from "redux-saga/effects";
import { selectFilteredProductCurrentPage, selectFilteredProductItemsPerPage, selectTotalPages, setFilteredProduct, setFilteredProductCurrentPage, setTotalPages } from "../Slices/FilteredProduct";
import axios from "axios";
function* fetchFilteredProduct(action) {
  try {
    const currentPage = yield select(selectFilteredProductCurrentPage);
    const itemsPerPage = yield select(selectFilteredProductItemsPerPage);
    const totalPages = yield select(selectTotalPages);


    console.log(totalPages);

    if (action.payload.heading === "category" && !action.payload.cat) {

      let apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchProductsByCategory/${action.payload.parentCategoryVar}?page=${currentPage}&itemsPerPage=${itemsPerPage}`;

      const response = yield call(axios.get, apiUrl);

      yield put(setFilteredProduct(response.data.products));
      yield put(setTotalPages(Math.ceil(response.data.totalproducts / itemsPerPage)));
    } else {
      yield put(setFilteredProductCurrentPage(1))
      yield put(setTotalPages(1))
      let apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/productByCategoryAndSubCategory?category=${action.payload.parentCategoryVar}&subcategory=${action.payload.cat}&page=${currentPage}&itemsPerPage=${itemsPerPage}`;
      const response = yield call(axios.get, apiUrl);
      yield put(setFilteredProduct(response.data.products));
      yield put(setTotalPages(Math.ceil(response.data.totalproducts / itemsPerPage)));
    }
  } catch (error) {
    console.error("Error fetching filtered product:", error);
  }
}
export function* watchFilterProducts() {
  yield takeEvery("FETCH_FILTER_PRODUCTS", fetchFilteredProduct);
}
