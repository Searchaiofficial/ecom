// sagas/index.js
import { all } from "redux-saga/effects";
import { watchFetchRecommendedProduct } from "./recommendationSaga";
import { watchFetchSliderView } from "./sliderSaga";
import { watchSearchProducts } from "./searchSaga";
import { watchFetchFirstCard } from "./FirstCardSaga";
import { watchSelectedItemsSaga } from "./selectedItemsSaga";
import { watchFetchProfileData } from "./profileSaga";
import { watchFetchRoomData } from "./roomSaga";
import { cartSaga } from "./cartSaga";
import { watchSelectedProductsSaga } from "./compareSaga";
import { watchVirtualGet } from "./virtualSaga";
import { watchFetchTrendingData } from "./trendingSaga";
import { watchMultiCardData } from "./multiCardSaga";
import { watchFetchImagechangerData } from "./ImageChangerSaga";
import { watchFetchDisplayData } from "./displaySaga";
import { watchFetchMusicData } from "./musicSaga";
import { watchFetchFirstImgChangerData } from "./firstImageChangerSaga";
import { watchFilterProducts } from "./FilteredProductSaga";
import { watchFetchAllProducts } from "./productSaga";
import { watchFetchImageData } from "./imageDataSaga";
import { watchFetchBlogCardData } from "./blogCardSage";
import { watchFetchSuggestionData } from "./suggestionDataSaga";
import { watchFetchRoomMainData } from "./roomMainSaga";
import { watchFetchProductsFromDemandType } from "./demandTypeProductsSaga";
import { watchFetchProductsFromOffers } from "./offerProductsSaga";
import { watchFetchMobileSliderView } from "./MobileSliderSaga";

export default function* rootSaga() {
  yield all([
    watchFetchRecommendedProduct(),
    watchFetchSliderView(),
    watchSearchProducts(),
    watchFetchFirstCard(),
    watchFetchProfileData(),
    watchFetchTrendingData(),
    watchFetchRoomData(),
    watchSelectedItemsSaga(),
    cartSaga(),
    watchVirtualGet(),
    watchSelectedProductsSaga(),
    watchMultiCardData(),
    watchFetchImagechangerData(),
    watchFetchDisplayData(),
    watchFetchMusicData(),
    watchFetchFirstImgChangerData(),
    watchFilterProducts(),
    watchFetchAllProducts(),
    watchFetchImageData(),
    watchFetchBlogCardData(),
    watchFetchSuggestionData(),
    watchFetchRoomMainData(),
    watchFetchProductsFromDemandType(),
    watchFetchProductsFromOffers(),
    watchFetchMobileSliderView(),
  ]);
}
