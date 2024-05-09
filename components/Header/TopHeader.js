
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const TopHeader = () => {
  const pathname = usePathname();
  const homeRoute = "/";
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
        <div className="flex items-center">
          <div className="flex flex-row items-center gap-2  text-black  text-[12px]">
            <Link href="category/virtualexperience" className="flex gap-[5px] items-center">
              <Image src={"/ayatrio icon/liveshopping.svg"} width={22} height={22} className="w-[17px] mt-[2px] h-[17px]" alt="liveshopping" />
              <p>Live Shopping</p>
            </Link>
            <span className="">|</span>
            <div className="pr-[1px]">
              <Link href="category/freedesign">Designer request</Link>
            </div>
            <span className="">|</span>
            <div className="pr-[1px]">
              <Link href="category/freesample">Free sample request</Link>
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
