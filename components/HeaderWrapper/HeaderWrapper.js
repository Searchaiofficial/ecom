"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import Splashscreen from "../Splashscreen/Splashscreen";

const Header = dynamic(() => import("../Header"), { ssr: false });

const HeaderWrapper = () => {
  const [isHeaderMounted, setIsHeaderMounted] = useState(false);

  return (
    <>
      <Header setIsHeaderMounted={setIsHeaderMounted} />
      {isHeaderMounted ? null : <Splashscreen />}
    </>
  );
};

export default HeaderWrapper;
