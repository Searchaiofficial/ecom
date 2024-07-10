import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavigationItem = ({ product: data }) => {
  const [navigationItemData, setNavigationItemData] = useState(null);

  useEffect(() => {
    if (window !== undefined) {
      const navigationItem = JSON.parse(
        window.sessionStorage.getItem("navigationItem")
      );
      if (navigationItem) {
        setNavigationItemData(navigationItem);
        sessionStorage.removeItem("navigationItem");
      }
    }
  }, []);
  return (
    <div className="flex items-center gap-1">
      {navigationItemData ? (
        <>
          <Link href={`${navigationItemData.href}`}>
            <span className="hover:text-gray-600 cursor-pointer ">
              {navigationItemData.label}
            </span>
          </Link>
          <Image
            src="/icons/backarrowRevarce.svg"
            alt="tick"
            width={10}
            height={10}
            className="opacity-100 h-[8px]"
          />
        </>
      ) : (
        <>
          <Link href="/">
            <span className="hover:text-gray-600 cursor-pointer ">Home</span>
          </Link>
          <Image
            src="/icons/backarrowRevarce.svg"
            alt="tick"
            width={10}
            height={10}
            className="opacity-100 h-[8px]"
          />
        </>
      )}
      <Link href={`/${data?.category?.replace(/ /g, "-")}/category/all`}>
        <span className="hover:text-gray-500 cursor-pointer ">
          {data?.category}
        </span>
      </Link>
      <Image
        src="/icons/backarrowRevarce.svg"
        alt="tick"
        width={10}
        height={10}
        className="opacity-100 h-[8px]"
      />
      <Link
        href={`/${data?.category?.replace(
          / /g,
          "-"
        )}/category/${data?.subcategory?.replace(/ /g, "-")}`}
      >
        <span className="hover:text-gray-500 cursor-pointer ">
          {data?.subcategory}
        </span>
      </Link>
      <Image
        src="/icons/backarrowRevarce.svg"
        alt="tick"
        width={10}
        height={10}
        className="opacity-100 h-[8px]"
      />
      <span className="text-gray-500 cursor-pointer ">
        {data?.productTitle}
      </span>
    </div>
  );
};

export default NavigationItem;
