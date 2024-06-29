import {call,put,takeEvery} from 'redux-saga/effects'
import {fetchBlogCardDataApi} from '../api'
import {getBlogCardSuccess,loadBlogCardFetch, getBlogCardFailure} from '../Slices/blogCardSlice'

function* fetchBlogCardData(){
    try{
        const data = yield call(fetchBlogCardDataApi);
        yield put(getBlogCardSuccess(data));
    }
    catch(error){
        console.error("Error fetching blogCard data:", error);
        yield put(getBlogCardFailure());
    }
    finally{
        yield put(loadBlogCardFetch(false));
    }
}

export function* watchFetchBlogCardData(){
    yield takeEvery('FETCH_BLOG_CARD_DATA',fetchBlogCardData);
}