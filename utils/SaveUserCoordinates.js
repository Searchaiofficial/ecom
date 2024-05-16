"use client";

import { useEffect } from "react";

export default () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userCoordinates = localStorage.getItem("userCoordinates");

      if (userCoordinates) {
        return;
      }

      navigator.geolocation.getCurrentPosition((position) => {
        const userCoordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        localStorage.setItem(
          "userCoordinates",
          JSON.stringify(userCoordinates)
        );
      });
    }
  }, []);
};
