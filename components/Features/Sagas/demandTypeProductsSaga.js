import { call, put, takeEvery } from "redux-saga/effects";
import { fetchProductsFromDemandType as fetchProductsFromDemandTypeApi } from "../api";
import {
  getDemandTypeProductsSuccess,
  loadDemandTypeProductsFetch,
} from "../Slices/demandTypeProductsSlice";

function* fetchProductsFromDemandType(action) {
  try {
    const data = yield call(fetchProductsFromDemandTypeApi, action.payload);
    yield put(getDemandTypeProductsSuccess(data));
  } catch (error) {
    console.error("Error fetching products from Demand Type:", error);
  } finally {
    yield put(loadDemandTypeProductsFetch(false));
  }
}

export function* watchFetchProductsFromDemandType() {
  yield takeEvery("FETCH_PRODUCTS_FROM_DEMAND_TYPE", fetchProductsFromDemandType);
}
