"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to track the visibility of an element based on scroll position.
 *
 * @param {boolean} initialValue - The initial visibility state (default: true).
 * @param {number} threshold - The scroll position threshold for visibility change (default: 100).
 * @returns {Object} - An object containing the current visibility state.
 */
export const useScrollVisibility = (initialValue = true, threshold = 100) => {
  const [isVisible, setIsVisible] = useState(initialValue);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setIsVisible(
        currentScrollPos <= prevScrollPos || currentScrollPos < threshold
      );
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    isVisible
  };
};
