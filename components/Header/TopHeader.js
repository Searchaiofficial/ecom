
import React from "react";
import Link from "next/link";
import Image from "next/image";

const TopHeader = () => {

  return (
    <div className="hidden md:block">
      <div
        className={`bg-[#f5f5f5] top-0 fixed h-[35px] z-[9998] w-full flex items-center justify-between px-5`}
      >
        <div className="">
          <Link className="pr-[20px] text-sm underline underline-offset-4" href="#">For you</Link>
          <Link className="text-sm" href="category/virtualexperience">For business</Link>
        </div>
        {/* <div className="flex items-center">
          <div className="flex flex-row items-center gap-2  text-black  text-[12px]">
            <Link href="/category/virtualexperience" className="flex gap-[5px] items-center">
              <Image src={"/icons/liveshopping.svg"} width={22} height={22} className="w-[17px] mt-[2px] h-[17px]" alt="liveshopping" />
              <p>Live Shopping</p>
            </Link>
            <span className="">|</span>
            <div className="pr-[1px]">
              <Link href="/category/freedesign">Designer request</Link>
            </div>
            <span className="">|</span>
            <div className="pr-[1px]">
              <Link href="/category/freesample">Free sample request</Link>
            </div>
            <span className="">|</span>
            <div>
              <Link href="/customerservice">Help</Link>
            </div>
          </div>
        </div> */}
        <div className="flex items-center">
          <div className="flex flex-row items-center gap-2  text-black  text-[12px]">
            <Link href="/virtualexperience" className="flex gap-[5px] items-center">
              <Image src={"/icons/liveshopping.svg"} width={22} height={22} className="w-[17px] mt-[2px] h-[17px]" alt="liveshopping" />
              <p>Live Shopping</p>
            </Link>
            <span className="">|</span>
            <div className="pr-[1px]">
              <Link href="/freedesign">Designer request</Link>
            </div>
            <span className="">|</span>
            <div className="pr-[1px]">
              <Link href="/freesample">Free sample request</Link>
            </div>
            <span className="">|</span>
            <div>
              <Link href="/customerservice">Help</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
