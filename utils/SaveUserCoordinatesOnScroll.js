"use client";

import { useEffect, useState } from "react";
import SaveUserCoordinates from "./SaveUserCoordinates";

const SaveUserCoordinatesOnscroll = ({ threshold = 30 }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const currentPosition = window.scrollY;

    const scrollPercentage =
      (currentPosition / (fullHeight - windowHeight)) * 100;

    setScrollPercentage(scrollPercentage);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (scrollPercentage >= threshold) {
    return <SaveUserCoordinates />;
  }

  return null;
};

export default SaveUserCoordinatesOnscroll;
