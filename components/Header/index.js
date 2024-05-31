"use client";
import React from "react";
import "./styles.css";
import { useEffect, useState } from "react";
import Asidebox from "./AsideSection/Asidebox";
import Expandedbar from "./Expandedbar";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TopHeader from "./TopHeader";
import { selectQuantity } from "../Features/Slices/calculationSlice";
import { headerLinks } from "@/Model/Dropdown/AsideData/AsideData";
import Midsection from "./Midsection/Midsection";
import { useSelector } from "react-redux";
import { MenuIcon, X } from "lucide-react";
import TopHeaderWrapper from "./TopHeaderWrapper";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";

function Header({ setIsHeaderMounted }) {
  useEffect(() => {
    if (setIsHeaderMounted) {
      setIsHeaderMounted(true);
    }
  });

  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const quantity = useSelector(selectQuantity);
  const [sidebarNavigationItem, setSidebarNavigationItem] = useState("")


  // Filter

  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get("search");

  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  // aside section toggle
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    if (document.body.style.overflow != "hidden") {
      document.body.style.overflow = "hidden"
    }
    else if (document.body.style.overflow = "hidden") {
      document.body.style.overflow = "auto";
    }

    if (pathname !== "/") {
      if (document.body.style.overflow = "visible") {
        document.body.style.overflow = "visible"
      }
    }

  };

  const toggleDropdown = (item) => {
    setSidebarNavigationItem(item)
    setIsOpen(!isOpen);
  };


  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsOpen(false);
  };

  // const handleClick = (idx) => {
  //   if (idx === 3) router.push("/customerservice");
  // };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const router = useRouter();

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
  const handleLoginNav = () => {
    router.push("/login");
  };
  const handleProfileNav = () => {
    // console.log("Profile");
    handleLinkClick("/login");
  };
  const onClose = () => {
    setSearchQuery("");
  };
  const loginStatus =
    typeof window !== "undefined" ? localStorage.getItem("Login") : null;

  const [isLoading, setIsLoading] = useState(false);
  const handleLinkClick = (path) => {
    // console.log(isLoading);
    setIsLoading(true);
    // console.log(isLoading);
    setTimeout(() => {
      router.push(path);
      setIsLoading(false);
    }, 1310);
  };

  const [isModalOPen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
    // document.body.style.overflow = "hidden";
    if (window.matchMedia("(max-width: 768px)").matches) {
      document.body.style.overflow = "hidden";
    }
  };
  const handleModalClose = (event) => {
    event.stopPropagation();
    setModalOpen(false);
    document.body.style.overflow = "auto";
    onClose();
  };

  const { isVisible: isFilterVisible } = useScrollVisibility();
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const homeRoute = "/";

  const [displayedText, setDisplayedText] = useState("");
  const phrases = [` ' Wallpapers '`, ` ' Curtains '`, ` ' Blinds '`];

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


  const handleLoginClick = () => {
    router.push("/login")
  }

  const handleLogoutClick = () => {
    localStorage?.removeItem("token");
    window?.open(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout", "_self"`
    );
  }


  const handleClick = (link) => {

    toggleMobileMenu()
    // router.push("/customerservice")
    router.push(link)
  }


  return (
    <div className="">
      <TopHeaderWrapper>
        <TopHeader />
      </TopHeaderWrapper>
      <div
        className={`fixed w-full sm:bg-none ${!pathname.includes("/checkout")
          ? typeof window !== "undefined" && window.scrollY < 20
            ? "md:top-[35px] top-[0px]"
            : "top-0"
          : "top-0"
          } z-[9998]
       ${isScrolled ? "bg-white" : "bg-white"} 
      ${isFilterVisible ? "block" : "hidden"}
      `}
      >
        {/* {isLoading && <TopLoader />} */}
        {!searchQuery ? (
          <>
            <div
              className={`${isScrolled ? " border-b-[0.5px] border-slate-200" : ""
                } flex flex-row justify-between z-[99999px] items-center sm:px-[20px] px-[20px] h-[60px]`}
            >
              {/* main-logo */}
              <div className=" flex mainlogo items-center mr-20 justify-start">
                <Link href="/">
                  <Image
                    src="/images/ayatriologo.webp"
                    alt="Ayatrio Logo"
                    width={300}
                    height={40}
                    priority
                    className="w-36 lg:w-36 object-cover"
                  />
                </Link>
              </div>
              {/* center-list */}
              <div className=" flex justify-center items-center gap-1 md:gap-5 ">
                {/* <div className=" profile-menu font-bold p-[9px] hover:bg-zinc-100 hover:rounded-full">
                <Menu />
              </div> */}
                {/* for only mobile search */}

                <div className="">
                  <nav className="hidden md:flex gap-4">
                    {headerLinks.map((value, idx) => (
                      <div
                        key={idx}
                        onMouseEnter={() => handleMouseEnter(idx)}
                        onMouseLeave={handleMouseLeave}
                      // onClick={() => handleClick(idx)}
                      >
                        <Link
                          className={`text-md  font-semibold  ${isOpen ? "border-b-2 border-black" : ""
                            }`}
                          href={
                            value.label === "Offers"
                              ? "/heading/offers/all"
                              : "#"
                          }
                          onClick={() => toggleDropdown(value.label)}
                        >
                          <p
                            className={`block font-medium py-[15px] px-[5px] border-b-2  ${hoveredIndex === idx
                              ? "border-black"
                              : "border-transparent"
                              }`}
                          >
                            {value.label}
                          </p>
                        </Link>
                        {hoveredIndex === idx && (
                          // <Asidebox asideSectionList={value.asideSectionList} />
                          <Asidebox hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} label={value.label} />
                        )}
                        {/* {value.label === "Rooms" && hoveredIndex === idx && (
                          <Midsection />
                        )} */}
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
              {/* search-bar */}

              <div className="flex flex-row items-center justify-between  lg:gap-2">
                <div
                  onClick={handleModalOpen}
                  className="bg-[#f5f5f5] items-center justify-end rounded-full w-[13rem] h-10 p-[9px] hover:bg-[#e5e5e5] hover:rounded-full cursor-pointer lg:block hidden"
                >
                  <span>
                    <Image
                      src="/svg/icon/search.svg"
                      alt="Search Icon"
                      className="absolute z-10 seachbar-div2-icon"
                      width={27}
                      height={27}
                    />
                  </span>
                  <p className="ml-7 self-center lg:text-[13px] text-[12px] mt-0.5   text-gray-400"> Search for {displayedText}</p>
                </div>
                {/* <div
                  className="md:hidden block w-10 h-10 p-[9px] hover:bg-zinc-100 hover:rounded-full cursor-pointer"
                  onClick={handleModalOpen}
                >
                  <Image
                    src="/svg/icon/search.svg"
                    alt="Search Icon"
                    width={20}
                    height={20}
                    className="header-div-icon"
                  />
                </div> */}
                <div className="sm:block hidden w-10 h-10 p-[9px] hover:bg-zinc-100 hover:rounded-full cursor-pointer">
                  <Link href={"/login"}>
                    <Image
                      src="/svg/icon/like.svg"
                      alt="Like Icon"
                      className="header-div-icon"
                      width={22}
                      height={22}
                    />
                  </Link>
                </div>
                <div className="flex items-center flex-row-reverse lg:flex-row">
                  <div className="w-10 h-10 p-[9px] hover:bg-zinc-100 hover:rounded-full cursor-pointer">
                    <Link href={"/cart"}>
                      <Image
                        src="/svg/icon/adtocart.svg"
                        alt="Cart Icon"
                        className="header-div-icon"
                        width={22}
                        height={22}
                      />
                    </Link>
                    {
                      quantity > 0 && <div className="cart-notification">{quantity}</div>
                    }
                  </div>
                  {loginStatus === "true" ? (
                    <div
                      className="pro w-10 h-10 flex p-[9px] hover:bg-zinc-100 hover:rounded-full whitespace-nowrap "
                      onClick={handleProfileNav}
                    >
                      <Image
                        src="/svg/icon/profile.svg"
                        alt="Profile Icon"
                        className="header-div-icon"
                        width={22}
                        height={22}
                      />
                    </div>
                  ) : (
                    <div
                      className="pro w-10 h-10 flex p-[9px] hover:bg-zinc-100 hover:rounded-full whitespace-nowrap cursor-pointer "
                      onClick={handleProfileNav}
                    >
                      <Image
                        src="/svg/icon/profile.svg"
                        onClick={handleLoginNav}
                        alt="Profile Icon"
                        width={18}
                        height={18}
                        className="header-div-icon"
                      />
                    </div>
                  )}
                </div>

                <div className="w-10 h-10 p-[9px] hover:bg-zinc-100 hover:rounded-full cursor-pointer md:hidden">
                  {/* <MenuIcon onClick={toggleMobileMenu} /> */}
                  <Image src={"/Ayatrio updated icon/manu.svg"} height={50} width={50} alt="Menu Icon" className="h-[21px] w-[21px]" onClick={toggleMobileMenu} />
                </div>

                {/* for only mobole search */}
                {isModalOPen && (
                  /* <SearchModal
                isOpen={isModalOPen}
                onClose={handleModalClose}
                onSearch={(e) =>
                  dispatch(searchProductsRequest(e.target.value))
                }
              /> */
                  <Expandedbar
                    searchText={searchQuery}
                    onClose={handleModalClose}
                    onSearch={handleSearchChange}
                  />
                )}
              </div>
            </div>
            {atTop && <div className="flex  w-full items-center  md:hidden px-[20px] sm:px-[50px] lg:px-[67px] mb-3">
              <div
                className="md:hidden py-[8px] flex items-center justify-between w-full bg-zinc-100 rounded-full   h-[45px] p-[9px] hover:bg-zinc-200 hover:rounded-full cursor-pointer"
                onClick={handleModalOpen}
              >
                <div className="flex items-center">
                  <Image
                    src="/svg/icon/search.svg"
                    alt="Search Icon"
                    width={20}
                    height={20}
                    className="ml-[10px]"
                  />
                  <p className="ml-3 line-clamp-1 text-[13px] mt-[2px]  text-gray-400">Search for {displayedText}</p>
                </div>
                <Image src={"/Ayatrio updated icon/camera.svg"} width={20} height={20} className="mr-[10px] ml-[10px]" />
              </div>
            </div>}
          </>
        ) : (
          <Expandedbar
            searchText={searchQuery}
            onClose={onClose}
            onSearch={handleSearchChange}
          />
        )}
      </div>
      {isMobileMenuOpen && (
        <>
          <div
            initial={
              typeof window !== "undefined" &&
              window.innerWidth <= 800 && { x: 300, opacity: 0 }
            }
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "just" }}
            className="fixed inset-0 flex flex-col px-[10px] overflow-y-hidden bg-white z-[9998] md:hidden"
          >
            <div className="flex justify-between items-center py-[5px] w-full h-fit mb-4">
              <div className=" flex items-center">
                {/* <Image src={"/Ayatrio updated icon/backarrow.svg"} height={20} width={20} className="rotate-180" /> */}
                <div className="mainlogo">
                  <Link href="/">
                    <Image
                      src="/images/ayatriologo.webp"
                      alt="logo"
                      width={300}
                      height={40}
                      priority
                      className="py-2 pr-2  sm:w-44"
                    />
                  </Link>
                </div>
              </div>

              <div className="w-10 h-10 p-[9px] hover:bg-zinc-100 hover:rounded-full cursor-pointer md:hidden">
                <X onClick={toggleMobileMenu} />
              </div>
            </div>

            {/* <div className="flex"> */}
            <div className="flex flex-col space-y-2  ">
              {headerLinks.map((value, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                // onClick={() => handleClick(idx)}
                >
                  <Link
                    className={`text-md  font-semibold flex items-center justify-between  ${isOpen ? "border-b-2 border-black" : ""
                      }`}
                    href="#"
                    onClick={toggleDropdown}
                  >
                    <p
                      className={`block p-2 text-lg font-medium border-b-2 ${hoveredIndex === idx
                        ? "border-black"
                        : "border-transparent"
                        }`}
                    >
                      {value.label}
                    </p>
                    <div className="pr-[14px]">
                      <Image src={"/Ayatrio updated icon/backarrow.svg"} height={15} width={15} />

                    </div>                  </Link>
                  {idx < 3 && hoveredIndex === idx && (
                    <Asidebox hoveredIndex={hoveredIndex} selectedItem={"Home decor"} />
                  )}
                  {idx === 3 && hoveredIndex === idx && <Midsection />}
                </div>
              ))}
            </div>
            <div className="border-t pt-6 pl-2">
              <div className="flex flex-col">
                <div onClick={() => handleClick("category/virtualexperience")} className="">
                  <p className="text-[14px] py-[8px] font-normal">Live shopping</p>
                </div>
                <div onClick={() => handleClick("category/freedesign")}>
                  <p className="text-[14px] py-[8px] font-normal">Designer request</p>
                </div>
                <div onClick={() => handleClick("category/freesample")} >
                  <p className="text-[14px] py-[8px] font-normal">Free sample request</p>
                </div>
                <div onClick={() => handleClick("/customerservice")}>
                  <p className="text-[14px] py-[8px] font-normal">Help</p>
                </div>
                {
                  loginStatus === true ? <p className="text-[14px] font-medium" onClick={handleLogoutClick}>Logout</p> : <p className="text-[14px] font-medium" onClick={handleLoginClick}>Login</p>
                }
              </div>
            </div>
            {/* </div> */}
          </div>
        </>
      )}

    </div>
  );
}
export default Header;
