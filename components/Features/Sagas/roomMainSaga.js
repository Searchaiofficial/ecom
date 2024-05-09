import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import { setProductData, setRoomData, setRoomMain } from '../Slices/roomMainSlice';

function* fetchRoomMainDataSaga(action) {
    try {
        const { params } = action.payload;

        const apiUrl1 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/rooms?roomType=${params.replace(/-/g, " ")}`;
        const apiUrl2 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/productsByRoomType?roomType=${params.replace(/-/g, " ")}`;
        const apiUrl3 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getRoommain?roomType=${params.replace(/-/g, " ")}`;

        const [roomResponse, productsResponse, roomMainResponse] = yield all([
            call(axios.get, apiUrl1),
            call(axios.get, apiUrl2),
            call(axios.get, apiUrl3),
        ]);

        const roomData = roomResponse.data;
        const productData = productsResponse.data;
        const roomMain = roomMainResponse.data;

        yield put(setRoomData(roomData));
        yield put(setProductData(productData));
        yield put(setRoomMain(roomMain));
    } catch (error) {
        console.error('Error fetching room data:', error);
    }
}

export function* watchFetchRoomMainData() {
    yield takeEvery("FETCH_ROOM_MAIN_DATA_REQUEST", fetchRoomMainDataSaga);
}