"use client";

import React, { useEffect, useRef, useState } from "react";
import ayatrioLogo from "../../public/images/ayatriologo.webp";
import "./Expandbar.css";
import axios from "axios";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useDebounceValue } from "usehooks-ts";
// import search from "../../assets/icons/search.svg";
// import mainlogo from "../../assets/ayatriologo.png";
import { searchProductsRequest } from "../Features/search/searchSlice"
import { STORE_MAP_DATA } from "@/constants/store-map-data";
import { setClickedItem, updateCoords, updateZoom } from "../Features/Slices/mapSlice";
import { fetchStores } from "../Features/api";

const Expandedbar = ({ searchText, onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(searchText);
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 500);
  const [popularSearchProducts, setPopularSearchProducts] = useState([]);
  const router = useRouter();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [stores, setStores] = useState([]);
  const [isStoreLoading, setIsStoreLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true)

  useEffect(() => {
    if (searchQuery !== "") {
      setIsStoreLoading(true);
      fetchStores(searchQuery).then((stores) => {
        setStores(stores);
        setIsStoreLoading(false);
      });
    }
  }, [searchQuery]);

  let cacheddata = JSON.parse(sessionStorage.getItem("cachedData"));

  console.log(searchQuery)

  const fetchData = async () => {
    try {
      setLoading(true);
      // const cachedData = sessionStorage.getItem("cachedData");
      const cachedSearchText = sessionStorage.getItem("cachedSearchText");


      if (debouncedSearchQuery !== cachedSearchText) {
        // Perform the search and update the cache
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?search=${searchQuery}`
        );
        // sessionStorage.setItem("cachedData", JSON.stringify(response.data));
        console.log(response.data)
        sessionStorage.setItem("cachedSearchText", debouncedSearchQuery);

        setData(response.data);
        // console.log("search api fetched");
        // console.log(response.data);
        onSearch(response.data);
      } else {
        setData(JSON.parse(cachedData));
        onSearch(JSON.parse(cachedData));
        // console.log(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularSearchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/popularSearchProducts`
      );
      setPopularSearchProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPopularSearchProducts();
  }, []);



  useEffect(() => {
    if (searchQuery === "") {
      setData([])
    }
  }, [searchQuery])


  useEffect(() => {
    setSearchQuery("")
    // onClose()
  }, [])



  // console.log("cached data is ", JSON.parse(cacheddata));
  useEffect(() => {
    if (debouncedSearchQuery && searchQuery?.length > 1) {
      fetchData();
    }

    router.push(`?search=${debouncedSearchQuery}`);
  }, [debouncedSearchQuery]);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const dispatch = useDispatch();
  const handleRoute = async (item) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=${item._id}`;
    const response = await axios.get(url);
    const data = response.data;
    dispatch({ type: "FETCH_ROOM_REQUEST", payload: item._id });
    // router.push(`/product`);
    // router.push("/room/" + item.id);
  };
  const handleclick = async (id, category) => { };
  const path = usePathname();
  // useEffect(() => {
  //   console.log("mounts")
  //   const handleRouteChange = (url) => {
  //     console.log("router changing", url);
  //   };

  //   Router.events.on("routeChangeStart", handleRouteChange);
  //   Router.events.on("routeChangeComplete",()=>{
  //     console.log("route changes")
  //   })
  // }, [Router,router]);

  const [overflowStyle, setOverflowStyle] = useState({});

  useEffect(() => {
    dispatch(searchProductsRequest(searchQuery));
    // console.log("search called");
  }, [dispatch, searchQuery]);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setOverflowStyle({ overflowY: "auto" });
      } else {
        setOverflowStyle({});
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // console.log(STORE_MAP_DATA)
  // console.log(path)
  const india_zoom = 5;
  const hotels_zoom = 11;
  const [zoom, setZoom] = useState(india_zoom);
  const [selectedCoords, setSelectedCoords] = useState({ lat: 20.5937, lng: 78.9629 });

  // const handleResultClick = ({ lat, lng }) => {

  //   if (lat && lng && lat !== null && lng !== null) {
  //     console.log(lat, lng)
  //     const latitude = parseFloat(lat);
  //     const longitude = parseFloat(lng);
  //     setSelectedCoords({ lat: 20.593, lng: 78.96 });
  //     // console.log(selectedCoords);
  //     if (selectedCoords.lat === 20.593 && selectedCoords.lng === 78.96) {
  //       setZoom(india_zoom);
  //     } else {
  //       setZoom(hotels_zoom);
  //     }
  //   }
  //   onClose()

  // };

  const handleResultClick = ({ lat, lng }, item) => {
    onClose();
    if (lat && lng && lat !== null && lng !== null) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      const newCoords = { lat: latitude, lng: longitude };
      setSelectedCoords(newCoords);
      dispatch(updateCoords(newCoords))
      if (newCoords.lat === 20.593 && newCoords.lng === 78.96) {
        setZoom(india_zoom);
        dispatch(updateZoom(india_zoom))
      } else {
        setZoom(hotels_zoom);
        dispatch(updateZoom(hotels_zoom))
      }
      dispatch(setClickedItem(item))
    }

  };

  const handlePopularSearch = (search) => {
    console.log(search)
    setSearchQuery(search)
    setIsStoreLoading(true);
    fetchStores(search).then((stores) => {
      setStores(stores);
      setIsStoreLoading(false);
    });
  }

  console.log(stores)


  return (
    <>
      {isModalOpen && (
        <div className="md:fixed md:inset-0 md:bg-black md:opacity-50 md:z-[9998]"></div>
      )}
      <div
        className={`expanded-search-box block pt-[12px]  bg-white sm:h-310px h-full  sm:w-full w-[100vw]  absolute right-0 top-0  z-[9999] md:mt-[-36px] ${path == "/" ? "sm:mt-[-36px]" : ""
          } `} style={overflowStyle}
      >
        <div className="flex flex-row pl-[24px] lg:pl-[0px] items-center  justify-between bg-white  w-full absolute left-0">
          <div className="logo hidden sm:block pl-[48px]">
            <Image src={ayatrioLogo} className="w-36 z-30" alt="Ayatrio Logo" priority />
          </div>
          <div className="searchDiv lg:px-40 lg:mr-[100px] h-[36px] lg:h-[45px] flex-1 rounded-full  flex flex-col">
            <div className="searchCon rounded-full relative w-full bg-zinc-100 p-2 ">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="search-input rounded bg-transparent h-full sm:w-full w-full pl-10 border-0 focus:outline-none"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <Image loading="lazy"
                src="/icons/search.svg"
                alt="Search icon"
                width={20}
                height={20}
                className=" search_icon_mar w-5 mx-1 my-1.5 top-[18%] left-[1%]  absolute z-10"
              />
            </div>
          </div>
          <div
            className="close text-base font-medium pr-[24px] pl-[10px] lg:pl-[0px]  lg:pr-[48px]  cursor-pointer"
            onClick={onClose}
          >
            Close
          </div>
        </div>
        <div
          className={`dropdown lg:mt-[48px] lg:pt-[32px] pb-[60px] mt-[60px]  sm:pb-[50px]  flex sm:flex-row flex-col   max-w-full bg-white ${searchQuery
            ? "sm:px-[48px] pl-0"
            : "sm:pr-[48px] sm:pl-[360px]"
            }`}
        >
          <div
            className={`items-start min-w-fit flex cursor-pointer pl-[24px] sm:pl-[0px] flex-col 
           
          `}
          >
            {
              path === "/ayatrio-map" ? (
                <>
                  <div className="dropdown-item sm:font-medium  pb-2 text-[14px]  text-[#707072]">
                    Popular Searches
                  </div>
                  <div className="dropdown-item sm:font-medium  py-2   text-[20px] font-medium " onClick={() => handlePopularSearch("Delhi")}>
                    Delhi
                  </div>
                  <div className="dropdown-item sm:font-medium  py-2  text-[20px] font-medium  " onClick={() => handlePopularSearch("Bengaluru")}>
                    Bengaluru
                  </div>
                  <div className="dropdown-item sm:font-medium  py-2   text-[20px] font-medium " onClick={() => handlePopularSearch("Hyderabad")}>
                    Hyderabad
                  </div>
                  <div className="dropdown-item sm:font-medium hidden sm:flex  py-2  text-[20px] font-medium " onClick={() => handlePopularSearch("Kolkata")}>
                    Kolkata
                  </div>
                </>
              )
                :
                (
                  <>
                    {/* <div className="dropdown-item sm:font-medium  pb-2 text-[14px]  text-[#707072]">
                      Popular Searches
                    </div>
                    <div className="dropdown-item sm:font-medium  py-2   text-[20px] font-medium ">
                      Engineering flooring
                    </div>
                    <div className="dropdown-item sm:font-medium  py-2  text-[20px] font-medium  ">
                      Luxurious curtains
                    </div>
                    <div className="dropdown-item sm:font-medium  py-2   text-[20px] font-medium ">
                      Wallpaper for home
                    </div>
                    <div className="dropdown-item sm:font-medium hidden sm:flex  py-2  text-[20px] font-medium ">
                      Vinyl
                    </div> */}

                    <div className="dropdown-item sm:font-medium  pb-2 text-[14px]  text-[#707072]">
                      Popular Searches
                    </div>
                    {popularSearchProducts.map((item) => (
                      <Link
                        key={item._id}
                        className="dropdown-item sm:font-medium  py-2  text-[20px] font-medium "
                        href={`/product/${item.category.replace(/\s/g, "-")}/${item.subcategory.replace(/\s/g, "-")}`}
                        onClick={onClose}
                      >
                        {item.productTitle}
                      </Link>
                    ))
                    }
                  </>
                )
            }
          </div>

          {
            data && path !== "/ayatrio-map" &&
            <div className="grid sm:grid-cols-5 grid-cols-2 gap-4 sm:ml-32 px-[24px] lg:px-[0px] lg:mt-0 mt-10">
              {(!data) || isLoading ? (
                <p className="flex flex-row justify-center items-center">
                  No results found
                </p>
              ) : (
                (data && data.length > 0
                  ? data
                  : []
                ).map((item) => (
                  <Link href={`/product/${item.productTitle}`} onClick={onClose}>
                    <div
                      key={item.id}
                      className="col-span-1"
                      onClick={() => handleRoute(item)}
                    >
                      <div className="lg:w-[170px] w-[150px] h-[150px] lg:h-[170px]">
                        <Image loading="lazy"
                          src={item.images[0]}
                          width={170}
                          height={170}
                          alt={item.productTitle}
                          className="w-[100%] h-[100%] object-fill"
                        />
                      </div>
                      <div className="lg:text-[16px] text-[14px] font-medium text-black pt-[20px] ">
                        {item.productTitle}
                      </div>
                      <div className="lg:text-[16px] text-[14px]  font-normal leading-6   text-[#707072]">
                        {item.category}
                      </div>
                      <div className="lg:text-[16px] text-[14px]  font-medium pt-[7px]  text-black">
                        Rs. {item.totalPrice}
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          }

          {
            path === "/ayatrio-map" && searchQuery && (

              <div className="grid sm:grid-cols-5 grid-cols-2 gap-2 sm:ml-44 px-[24px] lg:px-[0px] lg:mt-0 mt-10 ">
                {(!stores) ? (
                  <p className="flex flex-row justify-center items-center">
                    No results found
                  </p>
                ) : (
                  (stores && stores?.length > 0
                    ? stores
                    : []
                  ).map((item) => (
                    <div >
                      <div
                        key={item._id}
                        className="col-span-1 cursor-pointer"
                        // onClick={() => handleRoute(item)}
                        onClick={() => handleResultClick({
                          lat: item.address.lat,
                          lng: item.address.lng,
                        }, item)}
                      >
                        <div className="lg:w-[170px] w-[150px] h-[150px] lg:h-[170px]">
                          <Image loading="lazy"
                            src={"https://bolt-gcdn.sc-cdn.net/3/Z2i0CKb1i5GtNvg8xNoP7.256.IRZXSOY?mo=GlgaFhoAGgAyAX06AQRCBgjm_5mrBlBJYAFaEERmTGFyZ2VUaHVtYm5haWyiARQIgAIiDwoCSAISACoHSVJaWFNPWaIBFAiaCiIPCgJIAxIAKgdJUlpYU09Z&uc=73"}
                            width={170}
                            height={170}
                            alt={item.name}
                            className="w-[100%] h-[100%] object-fill"
                          />
                        </div>
                        <div className="lg:text-[16px] text-[14px] font-medium text-black pt-2 ">
                          {item.name}
                        </div>
                        <div className="lg:text-[12px] text-[12px]  font-normal py-[2px] line-clamp-2 text-[#707072]">
                          {item.address.streetAddress}
                        </div>
                        <div className="lg:text-[12px] text-[12px]  font-semibold  text-black">
                          {item.phone}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Expandedbar;
