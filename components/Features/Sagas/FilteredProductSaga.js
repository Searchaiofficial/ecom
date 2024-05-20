import { call, put, takeEvery } from "redux-saga/effects";
import { setFilteredProduct } from "../Slices/FilteredProduct";
import axios from "axios";
function* fetchFilteredProduct(action) {
  try {
    if (action.payload.heading === "category" && !action.payload.cat) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchProductsByCategory/${action.payload.parentCategoryVar}`;
      const response = yield call(axios.get, apiUrl);
      yield put(setFilteredProduct(response.data));
    } else  {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/productByCategoryAndSubCategory?category=${action.payload.parentCategoryVar}&subcategory=${action.payload.cat}`;
      const response = yield call(axios.get, apiUrl);
      yield put(setFilteredProduct(response.data));
    }
  } catch (error) {
    console.error("Error fetching filtered product:", error);
  }
}
export function* watchFilterProducts() {
  yield takeEvery("FETCH_FILTER_PRODUCTS", fetchFilteredProduct);
}
