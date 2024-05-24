// import axios from "axios";
import { fetchDisplayData } from "@/actions/fetchDisplayData";
import Image from "next/image";

import TabImage from "../Cards/TabImage";
import Link from "next/link";
import "./styles.css";

const Display = async () => {
  const apiData = await fetchDisplayData();

  return (
    <>
      <div className="px-[15px] flex flex-col  lg:grid lg:grid-cols-2 md:flex-row gap-4  items-center justify-between mx-auto my-8">
        <div className="w-full">
          {apiData && apiData.length > 0 ? (
            <>
              <div
                className={`relative w-full h-[449px] screen  lg:min-h-[730px] max-w-1/2`}
              >
                <TabImage
                  src={apiData[0].room.imgSrc}
                  alt={`Image  of Children`}
                  width={1000}
                  height={338}
                  labelData={apiData[0].room.children}
                  className="w-full h-full"
                />
                <div className="absolute bottom-0 left-0 justify-start p-[30px]">
                  <div>
                    <h2 className="text-white text-[12px]">
                      {apiData[0].text}
                    </h2>
                    <Link
                      href={`/rooms/${apiData[0].room.roomType.replace(
                        / /g,
                        "-"
                      )}`}
                    >
                      <p className="text-blue-500 text-[12px] font-semibold">
                        View More
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className={`relative bg-gray-300 flex justify-center items-center w-full h-[38rem] mr-[22px]`}
              >
                <p>Data Loading...</p>
              </div>
            </>
          )}
        </div>
        <div className="max-w-1/2 w-full">
          {apiData && apiData.length > 0 ? (
            <>
              <div
                className={`relative w-full h-[449px] screen lg:min-h-[730px]  max-w-1/2 `}
              >
                <TabImage
                  src={apiData[1].room.imgSrc}
                  alt={`Image  of Children`}
                  width={1000}
                  height={338}
                  labelData={apiData[1].room.children}
                />
                <div className="absolute bottom-0 left-0 justify-start p-[30px]">
                  <div>
                    <h2 className="text-white text-[12px]">
                      {apiData[1].text}
                    </h2>

                    <Link
                      href={`/rooms/${apiData[1].room.roomType.replace(
                        / /g,
                        "-"
                      )}`}
                    >
                      <p className="text-blue-500 text-[12px] font-semibold">
                        View More
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className={`relative bg-gray-300 flex justify-center items-center w-full h-[38rem] `}
              >
                <p>Data Loading...</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Display;
