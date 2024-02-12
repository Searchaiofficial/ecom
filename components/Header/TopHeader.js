import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopHeader = () => {
  const pathname = usePathname();
  const homeRoute = "/home";
  return (
    <div>
      <div
        className={`bg-zinc-200 ${
          homeRoute === pathname ? "fixed" : ""
        } z-[99999] w-screen flex justify-between`}
      >
        <div className="pt-2 pb-2 pl-8">
          <Image
            src="/logo/favicon-32x32.png"
            height={20}
            width={20}
            alt="logo"
          />
        </div>
        <div>
          <div className="flex flex-row gap-2 text-gray-500 text-sm pt-2 pr-5 ">
            <div className="border-r border-gray-400 pr-3">
              Virtual Experience
            </div>
            <div className="pr-3 border-r border-gray-400 tracki">Free Design</div>
            <div className="pr-3 border-r border-gray-400">Free Sample</div>
            <div>Join Ayatrio Family</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
