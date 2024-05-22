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
// import search from "../../assets/icon/search.svg";
// import mainlogo from "../../assets/ayatriologo.png";

const Expandedbar = ({ searchText, onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(searchText);
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 500);

  const router = useRouter();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  let cacheddata = JSON.parse(sessionStorage.getItem("cachedData"));

  const fetchData = async () => {
    try {
      setLoading(true);
      const cachedData = sessionStorage.getItem("cachedData");
      const cachedSearchText = sessionStorage.getItem("cachedSearchText");

      if (debouncedSearchQuery !== cachedSearchText) {
        // Perform the search and update the cache
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?search=${searchQuery}`
        );
        sessionStorage.setItem("cachedData", JSON.stringify(response.data));
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

  // console.log("cached data is ", JSON.parse(cacheddata));
  useEffect(() => {
    if (debouncedSearchQuery) {
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
  const handleclick = async (id, category) => {};
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

  return (
    <>
      <div
        className={`expanded-search-box block pt-[10px] bg-white sm:h-310px h-full  sm:w-full w-[100vw]  absolute right-0 top-0 sm:shadow-[0_350px_60px_500px_rgba(0,0,0,0.5)] z-[9999] ${
          path == "/" ? "sm:mt-[-36px]" : ""
        } `}
      >
        <div className="flex flex-row gapofsearchclose  justify-between bg-white rounded-lg w-full absolute left-0">
          <div className="logo hidden sm:block pl-[50px]">
            <Image src={ayatrioLogo} className="w-40 z-30" alt="Ayatrio Logo" />
          </div>
          <div className="searchDiv  flex flex-col">
            <div className="searchCon relative sm:w-[600px] w-[60vw] bg-zinc-100 p-2 rounded-none">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="search-input bg-transparent h-full sm:w-full w-[60vw] pl-10 border-0 focus:outline-none"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <Image
                src="/svg/icon/search.svg"
                alt="Search icon"
                width={20}
                height={20}
                className=" search_icon_mar w-5 mx-1 my-1.5 top-[18%] left-[1%]  absolute z-10"
              />
            </div>
          </div>
          <div
            className="close text-base font-medium mr-4 pt-2.5 mr-[80px] cursor-pointer"
            onClick={onClose}
          >
            Close
          </div>
        </div>
        <div
          className={`dropdown   sm:pt-20 pt-0 sm:pb-[50px] pb-0 flex sm:flex-row flex-col justify-center gap-4 max-w-full bg-white ${
            searchQuery
              ? "sm:pl-[50px] pl-0 "
              : "items-center sm:pr-[50px] pr-0 sm:pl-[50px] pl-0 "
          }`}
        >
          <div
            className={`items flex cursor-pointer sm:w-70 w-[200px]  flex-col 
           
          `}
          >
            <div className="dropdown-item sm:font-medium font-base py-2 sm:text-xl text-lg  text-black">
              Popular Searches
            </div>
            <div className="dropdown-item sm:font-medium font-base py-2 sm:text-lg  text-lg text-[#707072]">
              Engineering flooring
            </div>
            <div className="dropdown-item sm:font-medium font-base py-2 sm:text-lg  text-lg text-[#707072]">
              Luxurious curtains
            </div>
            <div className="dropdown-item sm:font-medium font-base py-2 sm:text-lg  text-lg text-[#707072]">
              Wallpaper for home
            </div>
            <div className="dropdown-item sm:font-medium font-base py-2 sm:text-lg  text-lg text-[#707072]">
              Vinyl
            </div>
          </div>

          <div className="grid sm:grid-cols-5 grid-cols-2 gap-6 sm:ml-32 ml-5 mt-3">
            {(!cacheddata && !data) || isLoading ? (
              <p className="flex flex-row justify-center items-center">
                No results found
              </p>
            ) : (
              (data && data.length > 0
                ? data
                : cacheddata && cacheddata.length > 0
                ? cacheddata
                : []
              ).map((item) => (
                <Link href={`/product/${item.productTitle}`} onClick={onClose}>
                  <div
                    key={item.id}
                    className="col-span-1"
                    onClick={() => handleRoute(item)}
                  >
                    <div className="w-[170px] h-[170px]">
                      <Image
                        src={item.images[0]}
                        width={170}
                        height={170}
                        alt="Product"
                        className="w-[100%] h-[100%] object-fill"
                      />
                    </div>
                    <div className="text-sm leading-6 text-black pt-[20px] text-[#000000]">
                      {item.category}
                    </div>
                    <div className="text-sm leading-6 text-black  text-[#707072]">
                      {item.collectionName}
                    </div>
                    <div className="text-sm leading-6 pt-[7px] font-medium text-black">
                      {item.totalPrice}₹
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Expandedbar;
