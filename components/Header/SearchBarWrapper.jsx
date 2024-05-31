"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
// import { useScrollVisibility } from "@/hooks/useScrollVisibility";
const MobileSearchBar = dynamic(() =>
  import("../MobileSearch").catch((err) => console.error(err))
);
const Expandedbar = dynamic(() =>
  import("../Header/Expandedbar").catch((err) => console.error(err))
);

const SearchBarWrapper = ({ }) => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  // const { isVisible } = useScrollVisibility();

  const onClose = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  // if (!isVisible) {
  //   return null;
  // }

  return (
    <>
      {isSearchBarVisible && <Expandedbar onClose={onClose} />}
      <MobileSearchBar />
    </>
  );
};

export default SearchBarWrapper;
