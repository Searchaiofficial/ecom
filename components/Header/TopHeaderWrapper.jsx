"use client";

import { usePathname } from "next/navigation";

const TopHeaderWrapper = ({ children }) => {
  const pathname = usePathname();

  if (pathname.includes("/checkout")) return null;
  if (pathname.includes("/profile")) return null;

  if (typeof window === "undefined") return null;

  if (window.scrollY < 20) return <>{children}</>;

  return null;
};

export default TopHeaderWrapper;
