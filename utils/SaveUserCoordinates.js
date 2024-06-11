"use client";

import { useEffect } from "react";
import { getPinFromCoordinates } from "./getPinFromCoordinates";
import { upsertUserLocation } from "@/components/Features/api";

export default () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userCoordinates = JSON.parse(
        localStorage.getItem("userCoordinates")
      );
      const userPincode = localStorage.getItem("userPincode");
      const deviceId = localStorage.getItem("deviceId");

      if (userCoordinates && userPincode) {
        return;
      } else if (userCoordinates && !userPincode) {
        getPinFromCoordinates(userCoordinates.lat, userCoordinates.lng).then(
          (pin) => {
            if (pin) {
              localStorage.setItem("userPincode", pin);

              upsertUserLocation({
                deviceId,
                pincode: pin,
                lat: userCoordinates.lat,
                lng: userCoordinates.lng,
              })
                .then(() => {
                  console.log("User location saved");
                })
                .catch((error) => {
                  console.error(`Error saving user location: ${error.message}`);
                });
            }
          }
        );

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

        getPinFromCoordinates(userCoordinates.lat, userCoordinates.lng).then(
          (pin) => {
            if (pin) {
              localStorage.setItem("userPincode", pin);

              upsertUserLocation({
                deviceId,
                pincode: pin,
                lat: userCoordinates.lat,
                lng: userCoordinates.lng,
              })
                .then(() => {
                  console.log("User location saved");
                })
                .catch((error) => {
                  console.error(`Error saving user location: ${error.message}`);
                });
            }
          }
        );
      });
    }
  }, []);
};
