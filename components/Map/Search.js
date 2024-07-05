import React, { useState, useEffect } from "react";
import Menu from "../Header/menu";
import Image from "next/image";
import { searchProductsRequest } from "../Features/search/searchSlice";
import { useDispatch } from "react-redux";
// import Expandedbar from "../Header/Expandedbar";
import "./styles.css";

const Search = ({ places, onResultClick }) => {
  const [data, setData] = useState(places);
  const [hoveredItem, setHoveredItem] = useState(null);

  const [isScrolled, setIsScrolled] = useState(false);
  //section for search-icon click(down)
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  // const handleSearchIconClick = () => {
  //   setIsSearchBarVisible(!isSearchBarVisible);
  // };
  //section for search-icon click (above)

  //const [isFilterVisible, setIsFilterVisible] = useState(true);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // console.log(places);

  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchProductsRequest(searchQuery));
    // console.log("search called");
  }, [dispatch, searchQuery]);

  // const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  // const onClose = () => {
  //   setSearchQuery("");
  // };
  useEffect(() => {
    setData(places);
  }, [places]);

  let filteredData = [];
  if (data && data.length > 0) {
    filteredData = data
      .filter(
        (item) => item.address.streetAddress && item.address.country === "India"
      )
      .slice(0, 4);

    // console.log(filteredData.map((item) => item.address_obj.country));
  }

  const handleItemHover = (item) => {
    setHoveredItem(item);
  };
  const handleResultClick = (item) => {
    if (onResultClick && item) {
      onResultClick({
        lat: item.address.lat,
        lng: item.address.lng,
      });
    } else {
      onResultClick({ lat: 20.593, lng: 78.96 });
    }
    // console.log(item);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

  useEffect(() => {
    // Update isMobile state on window resize
    const handleResize = () => {
      setIsMobile(
        () => typeof window !== "undefined" && window.innerWidth <= 450
      );
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const [displayedText, setDisplayedText] = useState("");
  const phrases = [` ' Bengaluru '`, ` ' Ahmedabad '`, ` ' Mumbai '`];

  useEffect(() => {
    let currentPhraseIndex = 0;
    let index = 0;
    let typingTimeout;
    let phraseTimeout;

    const typeWriter = () => {
      if (index < phrases[currentPhraseIndex].length) {
        setDisplayedText(`${phrases[currentPhraseIndex].slice(0, index + 1)}`);
        index++;
        typingTimeout = setTimeout(typeWriter, 50);
      } else {
        phraseTimeout = setTimeout(() => {
          index = 0;
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
          typeWriter();
        }, 1000);
      }
    };

    if (searchQuery) {
      setDisplayedText(`Search for ${searchQuery}`);
      clearTimeout(typingTimeout);
      clearTimeout(phraseTimeout);
    } else {
      typeWriter();
    }

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(phraseTimeout);
    };
  }, [searchQuery]);



  return (
    <>
      {isMobile ? (
        <div className="flex flex-row items-center justify-between w-full h-16 map-bg">
          <div
            className=" font-bold p-[7px] hover:bg-slate-200 hover:rounded-full bg-opacity-5 bg-transparent"
            style={{
              backgroundColor: "transparent",
              background: "transparent",
            }}
          >
            <Menu />
          </div>
          <div
            className="w-full absolute shadow-lg z-20 top-[20%] "
            style={{
              backgroundColor: "transparent",
              background: "transparent",
            }}
          >
            {/* <div className="px-[20px] absolute  -top-[73px] right-0 left-0 bg-white pb-[10px]">
              <div
                className="flex items-center bg-zin c-100 border-none search w-full py-[8px] px-[9px] rounded-full h-[45px]"

              >

                <Image loading="lazy"
                  src="icons/search.svg"
                  alt="Search Icon"
                  width={20}
                  height={20}
                  className="ml-[10px]"
                />

                <input
                  type="text"
                  placeholder={`Search for ${displayedText}`}
                  className="searchTerm w-full text-[13px] ml-[12px]  bg-transparent rounded-full  active:border-none focus:outline-none"

                />

                <Image loading="lazy" src={"/icons/camera.svg"} width={20} height={20} className="mr-[10px] ml-[10px]" />

              </div>
            </div> */}

            <div
              className="dropdown-container bg-white hidden  w-[19rem] h-44 border border-gray-200 shadow-md overflow-auto"
              style={{
                borderRadius: "0px 0px 15px 15px",
              }}
            >
              {places.map((item, index) => (
                <div
                  className={`flex justify-evenly items-center hover:bg-gray-100`}
                  key={item._id}
                  onClick={() =>
                    index === 0 ? handleResultClick() : handleResultClick(item)
                  }
                  onMouseEnter={() => handleItemHover(item)}
                  onMouseLeave={() => handleItemHover(null)}
                >
                  {/* {index === 0 ? (
                    <Image loading="lazy"
                      src="/icons/info.svg"
                      height={20}
                      width={20}
                      alt="home"
                      className="text-xl text-gray-700"
                    />
                  ) : ( */}
                  <Image loading="lazy"
                    src="/icons/info.svg"
                    height={20}
                    width={20}
                    alt="time"
                    className="text-xl text-gray-700"
                  />
                  {/* )} */}
                  <div className="px-4 py-2 text-gray-700 cursor-pointer">
                    {index === 0 ? "India" : `${item.name}`}
                  </div>
                  <Image loading="lazy"
                    src="/icons/closeicon.svg"
                    height={20}
                    width={20}
                    alt="close"
                    className={`text-gray-800 text-xl 
      ${hoveredItem === item ? "opacity-100" : "opacity-0"}
      `}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="main-search absolute shadow-lg z-20 top-[14%] left-3">
          {/* <div
            className="flex items-center bg-white border-none search "
          >
            <input
              type="text"
              placeholder="Search Ayatrio Maps"
              value={searchQuery}
              onChange={handleSearchChange}
              className="searchTerm w-[17rem] h-10 border-white p-4 active:border-none focus:outline-none rounded-full "
              style={{
                borderRadius: ` ${searchQuery.length > 0 ? "0px 0px" : "0px 0px"
                  }`,
              }}
            />
            <div className="searchIcon bg-white flex justify-center items-center w-[1rem] mr-3">
              <Image loading="lazy"
                src="/icons/search.svg"
                height={20}
                width={20}
                alt="close"
                className="text-xl text-gray-400"
              />
            </div>
          </div> */}

          {searchQuery && (
            <div
              className="dropdown-container custom-scrollbar bg-white w-[19rem] h-44 border border-gray-200 shadow-md  overflow-y-scroll "
            // style={{
            //   borderRadius: "0px 0px 10px 10px",
            // }}
            >
              {places.map((item, index) => (
                <div
                  className={`flex justify-around items-center hover:bg-gray-100 pl-4`}
                  key={item._id}
                  onClick={() =>
                    index === 0 ? handleResultClick() : handleResultClick(item)
                  }
                  onMouseEnter={() => handleItemHover(item)}
                  onMouseLeave={() => handleItemHover(null)}
                >
                  <Image loading="lazy"
                    src="/icons/info.svg"
                    height={20}
                    width={20}
                    alt="close"
                    className="text-xl text-gray-700"
                  />
                  {/* ) : (
                    <Image loading="lazy"
                      src="/svg/icons/time.svg"
                      height={20}
                      width={20}
                      alt="close"
                      className="text-xl text-gray-700"
                    />
                  )} */}
                  <div className="px-4 py-2 text-gray-700 cursor-pointer">
                    {`${item.name} ${item.address.streetAddress.slice(0, 20)}`}
                  </div>
                  <Image loading="lazy"
                    src="/icons/closeicon.svg"
                    height={20}
                    width={20}
                    alt="close"
                    className={`text-gray-800 text-xl 
      ${hoveredItem === item ? "opacity-100" : "opacity-0"}
      `}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
