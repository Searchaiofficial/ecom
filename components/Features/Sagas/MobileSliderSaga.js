import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchMobileSliderView } from '../api';
import { getMobileSliderSuccess, fetchMobileSliderRequest, getMobileSliderFailure } from '../Slices/MobileSliderSlice';

function* fetchMobileSliderViewSaga(action) {
  try {
    const { page, limit } = action.payload;
    yield put(fetchMobileSliderRequest(true));
    const data = yield call(fetchMobileSliderView, page, limit);
    yield put(getMobileSliderSuccess(data));
  } catch (error) {
    console.error("Error fetching slider data:", error);
    yield put(getMobileSliderFailure());
  } finally {
    yield put(fetchMobileSliderRequest(false));
  }
}

export function* watchFetchMobileSliderView() {
  yield takeLatest('FETCH_MOBILE_SLIDER_VIEW_REQUEST', fetchMobileSliderViewSaga);
}
