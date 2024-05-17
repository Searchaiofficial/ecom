"use client";

import { useScrollVisibility } from "@/hooks/useScrollVisibility";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MapButton = ({}) => {
  const router = useRouter();
  const { isVisible } = useScrollVisibility();

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed-ayatrio-map">
      <button
        type="button"
        className="fixed sm:hidden flex left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999] -bottom-3 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={() => router.push("/ayatrio-map")}
      >
        Map{" "}
        <Image
          width={25}
          height={25}
          src="/svg/icon/ayatrio_store.svg"
          alt="Store icon"
          className="header-div-sStore-icon"
        />
      </button>
      <button
        type="button"
        className="fixed sm:flex hidden leading-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999] -bottom-3 text-white bg-[#222222] hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-500"
        onClick={() => router.push("/ayatrio-map")}
      >
        Near Ayatrio{" "}
        <Image
          width={25}
          height={25}
          src="/svg/icon/ayatrio_store.svg"
          alt="Store icon"
          className="header-div-sStore-icon"
        />
      </button>
    </div>
  );
};

export default MapButton;
