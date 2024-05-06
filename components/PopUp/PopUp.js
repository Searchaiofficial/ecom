import React, { useState, useEffect } from "react";
import "./popup.css";
import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import {
  setSelectedcomItems1,
  setSelectedcomItems2,
  setSelectedcomItems3,
} from "../Features/Slices/selectedItemsSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import SwiperCore from "swiper/core";
SwiperCore.use([Autoplay, Navigation]);
// import {
//   recomendProduct,
//   recomendationLoader,
// } from "../../Features/Slices/recommendationSlice";

function App() {
  const [fetchedCategories, setFetchedCategories] = useState(null);
  const [fetchCities, setFetchedCities] = useState(null);
  const [fetchHobbies, setFetchedHobbies] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
      );
      console.log(response.data);
      setFetchedCategories(response.data);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };
  // console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
  console.log(fetchedCategories);
  const fetchCitiesAndHobbies = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/citiesAndHobbies`
      );
      console.log(response.data);
      setFetchedCities(response.data[0].cities);
      setFetchedHobbies(response.data[0].hobbies);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching cities and hobbies:", error.message);
    }
  };

  // const t0 = performance.now();

  useEffect(() => {
    fetchCategories();
  }, []);

  // const t1 = performance.now();
  // console.log(`fetchCategories took ${t1 - t0} milliseconds.`);
  // console.log(fetchedCategories);
  const [openPopUp1, setOpenPopUp1] = useState(true);
  const [openPopUp2, setOpenPopUp2] = useState(false);
  const [openPopUp3, setOpenPopUp3] = useState(false);

  const [selectedItems1, setSelectedItems1] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);
  const [selectedItems3, setSelectedItems3] = useState([]);

  const handleNext = () => {
    // call backend api for fetching cities and hobbies
    fetchCitiesAndHobbies();
    setOpenPopUp1(false);
    setOpenPopUp2(true);
  };

  // const resetPopups = () => {
  //   setOpenPopUp1(true);
  //   setOpenPopUp2(false);
  //   setOpenPopUp3(false);
  // };

  const goTo = () => {
    setOpenPopUp3(true);
    setOpenPopUp2(false);
  };

  const goTo2 = () => {
    setOpenPopUp2(false);
    setOpenPopUp1(true);
  };

  const toggleItemSelection1 = (label, parentCategory) => {
    const isSelected = selectedItems1.some(
      (item) => item.label === label && item.parentCategory === parentCategory
    );

    const newSelectedItems1 = isSelected
      ? selectedItems1.filter(
        (item) =>
          !(item.label === label && item.parentCategory === parentCategory)
      )
      : [...selectedItems1, { label, parentCategory }];

    setSelectedItems1(newSelectedItems1);
    // setSelectedItems1((prevSelectedItems) =>
    //   isSelected
    //     ? prevSelectedItems.filter(
    //         (item) =>
    //           !(item.label === label && item.parentCategory === parentCategory)
    //       )
    //     : [...prevSelectedItems, { label, parentCategory }]
    // );

    dispatch(setSelectedcomItems1({ items1: selectedItems1 }));
  };

  const toggleItemSelection2 = (label) => {
    const isSelected = selectedItems2.includes(label);
    setSelectedItems2((prevSelectedItems) =>
      isSelected
        ? prevSelectedItems.filter((item) => item !== label)
        : [...prevSelectedItems, label]
    );

    dispatch(setSelectedcomItems2({ items2: selectedItems2 }));
  };

  const toggleItemSelection3 = (label) => {
    const isSelected = selectedItems3.includes(label);
    setSelectedItems3((prevSelectedItems) =>
      isSelected
        ? prevSelectedItems.filter((item) => item !== label)
        : [...prevSelectedItems, label]
    );
    dispatch(setSelectedcomItems3({ items3: selectedItems3 }));
  };

  useEffect(() => {
    document.body.style.overflow =
      openPopUp1 || openPopUp2 || openPopUp3 ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [openPopUp1, openPopUp2, openPopUp3]);

  function segregateData(data) {
    const segregatedData = {};

    // Iterate through the data array
    data.forEach((item) => {
      const parentCategory = item.parentCategory;

      // If the parent category doesn't exist in the segregatedData, create an array for it
      if (!segregatedData[parentCategory]) {
        segregatedData[parentCategory] = [];
      }

      // Add the current item to the array corresponding to its parent category
      segregatedData[parentCategory].push(item.label.name);
    });

    return segregatedData;
  }

  const selectedCategoriesData = segregateData(selectedItems1);

  const convertToPreferencesSchema = (categories, cities, hobbies) => {
    const preferences = {
      preferredCities: [],
      preferredHobbies: [],
      preferredCategories: [],
    };

    // Convert hobbies data
    preferences.preferredHobbies = hobbies.map((hobby) => hobby.name);

    // convert cities data
    preferences.preferredCities = cities.map((city) => city.name);

    // Convert categories data
    for (const categoryName in categories) {
      const category = {
        name: categoryName,
        subcategories: categories[categoryName],
      };

      preferences.preferredCategories.push(category);
    }

    return preferences;
  };

  const preferencesDataToSendToBackend = convertToPreferencesSchema(
    selectedCategoriesData,
    selectedItems2,
    selectedItems3
  );

  let id;

  if (typeof window !== "undefined") {
    id = localStorage.getItem("deviceId");
  }

  const done = async () => {
    setOpenPopUp3(false);
    setOpenPopUp2(false);
    setOpenPopUp1(false);
    localStorage.setItem("popUp", "true");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/preferences`,
        {
          deviceId: id,
          userPreferredCities: preferencesDataToSendToBackend.preferredCities,
          userPreferredHobbies: preferencesDataToSendToBackend.preferredHobbies,
          userPreferredCategories:
            preferencesDataToSendToBackend.preferredCategories,
        }
      );

      // console.log("tahir", preferencesDataToSendToBackend.preferredCategories);

      const data = response.data;
      setIsloading(false);
      dispatch({ type: "RECOMMENDATION_REQUEST" });

      // console.log(data);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error during request setup:", error.message);
      }
    }
  };

  const [isMinItemsSelected, setIsMinItemsSelected] = useState(false);

  // Update isMinItemsSelected whenever selectedItems1 changes
  // useEffect(() => {
  //   setIsMinItemsSelected(selectedItems1.length >= 5);
  // }, [selectedItems1]);

  // console.log("from selecteditems1", Items1selected);
  // console.log("from selecteditems2", Items2selected);
  // console.log("from selecteditems3", Items3selected);

  useEffect(() => {
    const value =
      JSON.stringify(preferencesDataToSendToBackend.preferredCities) +
      "," +
      JSON.stringify(preferencesDataToSendToBackend.preferredHobbies) +
      "," +
      JSON.stringify(preferencesDataToSendToBackend.preferredCategories) +
      ",";

    const date = new Date();
    date.setTime(date.getTime() + 12 * 30 * 24 * 60 * 60 * 1000); // Cookie will expire after 1 year
    const expires = "; expires=" + date.toUTCString();

    document.cookie = "preference=" + value + expires + "; path=/";
  }, [preferencesDataToSendToBackend]);

  return (
    <div className="App ">
      {openPopUp1 && (
        <div className="popup1 flex flex-col">
          <div className="cont1">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <div className="flex-grow basis-1/6 sm:text-lg text-base sm:font-bold font-medium">
                  Select according to your choice
                </div>
                <div className="flex-grow basis-4/6 overflow-auto overflow-x-hidden overflow-y-scroll images">
                  {fetchedCategories &&
                    fetchedCategories.map((category, index) => (
                      <div key={index}>
                        <p className="text">{category.name}</p>
                        <Swiper
                          className="my-swiper-slider"
                          centeredSlides={false}
                          grabCursor={true}
                          mousewheel={false}
                          keyboard={{
                            enabled: true,
                          }}
                          navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                          }}
                          breakpoints={{
                            320: {
                              slidesPerView: 3,
                              spaceBetween: 5,
                            },
                            1024: {
                              slidesPerView: 4,
                              spaceBetween: 5,
                            },
                          }}
                        >
                          {category.subcategories && (
                            <div className="row">
                              {category.subcategories.map(
                                (subcategory, subIndex) => (
                                  <SwiperSlide key={subIndex}>
                                    <div
                                      className={`box firstbox ${selectedItems1.some(
                                        (item) =>
                                          item.label === subcategory &&
                                          item.parentCategory ===
                                          category.name
                                      )
                                        ? "selected"
                                        : " "
                                        }`}
                                      onClick={() =>
                                        toggleItemSelection1(
                                          subcategory,
                                          category.name
                                        )
                                      }
                                      style={{
                                        background: `url('${subcategory.img}')`,
                                      }}
                                    >
                                      <Image
                                        src="/svg/icon/tick.svg"
                                        height={20}
                                        width={20}
                                        alt="tick"
                                        className={`absolute tickicon ${selectedItems1.includes(subcategory)
                                          ? "block"
                                          : "hidden"
                                          }`}
                                      />
                                      <b className="bel">{subcategory.name}</b>
                                    </div>
                                  </SwiperSlide>
                                )
                              )}
                            </div>
                          )}
                          <div className="swiper-pagination"></div>
                          <Image
                            src="/svg/dropdown/leftvector.svg"
                            width={30}
                            height={30}
                            alt="arrow"
                            className="swiper-button-prev sm:-translate-y-[150px] sm:-translate-x-[460px]"
                          />
                          <Image
                            src="/ayatrio icon/right-white.svg"
                            width={30}
                            height={30}
                            alt="arrow"
                            className="swiper-button-next sm:-translate-y-[150px]"
                          />
                        </Swiper>
                      </div>
                    ))}
                </div>
                <div className="flex-grow basis-1/6">
                  <button className="next" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
          {/* <div className="sm:w-[600px] [w-90vw] p-2 sm:pl-6 pl-0 fixed-button"></div> */}
        </div>
      )}
      {openPopUp2 && (
        <div className="popup1 flex flex-col">
          <div className="cont1">
            <div className="flex-grow basis-1/6 sm:text-lg text-base sm:font-bold font-medium">
              Select according to your choice
            </div>
            <div className="head images3">
              <img
                src="/images/back.webp"
                className="back"
                onClick={goTo2}
                alt="Back"
              />
              <p className="text">Last Step! Choose your subcategories</p>
            </div>
            <div className="grid grid-cols-3 gap-x-4 basis-4/6 overflow-auto overflow-x-hidden flex-grow ">
              {fetchCities &&
                fetchCities.map((city, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`box firstbox ${selectedItems2.includes(city) ? "selected" : ""
                        }`}
                      onClick={() => toggleItemSelection2(city)}
                      style={{
                        backgroundImage: `url('${city.img}')`,
                        backgroundSize: "cover",
                      }}
                    >
                      <Image
                        src="/svg/icon/tick.svg"
                        height={20}
                        width={20}
                        alt="close"
                        className={`absolute tickicon ${selectedItems2.includes(city) ? "block" : "hidden"
                          }`}
                      />
                      <b className="bel">{city.name}</b>
                    </div>
                  </React.Fragment>
                ))}
            </div>
            <div className="flex-grow basis-1/6">
              <button
                className={`next self-end mt-6 
                    ${isMinItemsSelected ? "bg-red-700" : "bg-red-200"}
                    `}
                onClick={done}
              // disabled={!isMinItemsSelected}
              >
                Done
              </button>
            </div>
          </div>
          {/* <div className="w-[600px] p-2 pl-6 fixed-button"></div> */}
        </div>
      )}
    </div>
  );
}

export default App;
