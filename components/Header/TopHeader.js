
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopHeader = () => {
  const pathname = usePathname();
  const homeRoute = "/home";
  return (
    <div className="hidden md:block">
      <div
        className={`bg-[#f5f5f5] h-[35px] ${homeRoute === pathname ? "fixed" : ""
          } z-[99999] w-full flex items-center justify-between px-5`}
      >
        <div className="">
          <Link className="pr-[20px] text-sm underline underline-offset-4" href="#">For you</Link>
          <Link className="text-sm" href="category/virtualexperience">For business</Link>
        </div>
        <div>
          <div className="flex flex-row items-center gap-2  text-black  text-[12px]">
            <div className="pr-[1px]">
              <Link href="category/virtualexperience">My choices</Link>
            </div>
            <span className="">|</span>
            <div className="pr-[1px]">
              <Link href="category/freedesign">Designer request</Link>
            </div>
            <span className="">|</span>
            <div className="pr-[1px]">
              <Link href="category/freesample">Sample request</Link>
            </div>
            <span className="">|</span>
            <div>
              <Link href="/login">Help</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
