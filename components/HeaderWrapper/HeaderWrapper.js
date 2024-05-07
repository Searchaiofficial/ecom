"use client";
import dynamic from "next/dynamic";

import { usePathname } from "next/navigation";
import React from "react";
// import Header from "../Header";
const Header = dynamic(() => import("../Header"), { ssr: false });

const HeaderWrapper = () => {
  const pathname = usePathname();

  const routes = ["/login", "/success"];
  if (routes.includes(pathname)) {
    return null;
  } else {
    return <Header />;
  }
};

export default HeaderWrapper;
