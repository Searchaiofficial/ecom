"use client";

import { register } from "swiper/element/bundle";
import { useEffect } from "react";

const SwiperProvider = ({ children }) => {
  useEffect(() => {
    register();
  }, []);

  return <>{children}</>;
};

export default SwiperProvider;
