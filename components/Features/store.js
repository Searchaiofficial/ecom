import { configureStore } from "@reduxjs/toolkit";
import recommendationReducer from "./Slices/recommendationSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./Sagas/index";
import sliderReducer from "./Slices/sliderSlice";
import roomReducer from "./Slices/roomSlice";
import searchReducer from "./search/searchSlice";
import calculationReducer from "./Slices/calculationSlice";
import formReducer from "./Slices/formSlice";
import FirstCardReducer from "./Slices/FIrstCardSlice";
import authReducer from "./auth/authSlice";
import profileReducer from "./Slices/profileSlice";
import selectedItemsReducer from "./Slices/selectedItemsSlice";
import cartReducer from "./Slices/cartSlice";
import selectedProductReducer from "./Slices/compareSlice";
import virtualReducer from "./Slices/virtualSlice";
import virtualDataReducer from "./Slices/virtualDataSlice";
import trendingReducer from "./Slices/trendingSlice";
import blogCardReducer from "./Slices/blogCardSlice";
import multiCardReducer from "./Slices/multiCardSlice";
import imageChangerReducer from "./Slices/ImagechangerSlice";
import displayReducer from "./Slices/displaySlice";
import musicReducer from "./Slices/musicSectionSlice";
import firstImageChangerReducer from "./Slices/firstImageChangerSlice";
import allProductsReducer from "./Slices/productSlice";
import imageDataSliceReducer from "./Slices/imageDataSlice";
import suggestionDataReducer from "./Slices/suggestionDataSlice";
import roomMainReducer from "./Slices/roomMainSlice";
import demandTypeProductsSlice from "./Slices/demandTypeProductsSlice";
import offerProductsSlice from "./Slices/offerProductsSlice";
import freeSampleSliceReducer from "./Slices/freeSampleSlice";
import filteredProductReducer from "./Slices/FilteredProduct";
import roomCardReducer from "./Slices/roomCardSlice";
import mapSlice from "./Slices/mapSlice";
import productColorReducer from "./Slices/productColorSlice";

const sagaMiddleware = createSagaMiddleware();

const roomsReducer = (state = { selectedActivity: {} }, action) => {
  switch (action.type) {
    case "SET_SELECTED_ACTIVITY":
      return {
        ...state,
        selectedActivity: action.payload,
      };
    default:
      return state;
  }
};

// Action
export const setSelectedActivity = (payload) => ({
  type: "SET_SELECTED_ACTIVITY",
  payload,
});
export default roomsReducer;
export const store = configureStore({
  reducer: {
    virtualData: virtualDataReducer,
    virtual: virtualReducer,
    recommendedProduct: recommendationReducer,
    slider: sliderReducer,
    FirstCard: FirstCardReducer,
    productWithSearch: searchReducer,
    auth: authReducer,
    rooms: roomsReducer,
    roomdetails: roomReducer,
    calculation: calculationReducer,
    form: formReducer,
    profile: profileReducer,
    selectedItems: selectedItemsReducer,
    cart: cartReducer,
    selectedproduct: selectedProductReducer,
    trending: trendingReducer,
    blogCard: blogCardReducer,
    multiCard: multiCardReducer,
    Imagechanger: imageChangerReducer,
    Display: displayReducer,
    music: musicReducer,
    firstImageChanger: firstImageChangerReducer,
    filteredProduct: filteredProductReducer,
    allProducts: allProductsReducer,
    images: imageDataSliceReducer,
    suggestionData: suggestionDataReducer,
    roomCard: roomCardReducer,
    roomMainDetails: roomMainReducer,
    demandTypeProducts: demandTypeProductsSlice,
    offerProducts: offerProductsSlice,
    map: mapSlice,
    freeSample: freeSampleSliceReducer,
    productColor: productColorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
