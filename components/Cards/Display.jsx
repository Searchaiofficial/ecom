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
      <div className="px-[15px] mt-[20px] lg:mt-0 pt-[30px] mb-[32px]">
        <div>
          <h1 className="mb-[8px] text-2xl font-semibold">{apiData[0]?.mainHeading}</h1>
          <div className="flex items-center justify-between">
            <p className="text-[14px] lg:w-[70%] line-clamp-2 lg:line-clamp-none font-normal">{apiData[0]?.description}</p>
            <div class="border hidden border-black rounded-full lg:flex items-center justify-center h-[40px] cursor-pointer hover:border-gray-700 transition-colors">
              <Link
                href={`/rooms/${apiData[0].room.roomType.replace(
                  / /g,
                  "-"
                )}`}
              >

                <div className="flex items-center px-6 gap-5">
                  <p class="text-[12px] font-semibold">For more floor inspiration</p>
                  <Image src={"/Ayatrio updated icon/Back_arrow.svg"} height={15} width={15} />
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
      <div className="px-[15px] flex flex-col  lg:grid lg:grid-cols-2 md:flex-row gap-4  items-center justify-between mx-auto my-8">
        <div className="w-full">
          {apiData && apiData.length > 0 ? (
            <>
              <div
                className={`relative w-full h-[492px] screen  lg:min-h-[730px] max-w-1/2`}
              >
                <TabImage
                  src={apiData[0].room.imgSrc}
                  alt={`Image  of Children`}
                  width={1000}
                  height={338}
                  firstData
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
                className={`relative w-full h-[492px] screen lg:min-h-[730px]  max-w-1/2 `}
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
      <div className="flex h-[60px] border-b px-[15px] items-center justify-between lg:hidden">
        <Link
          href={`/rooms/${apiData[0].room.roomType.replace(
            / /g,
            "-"
          )}`}
        >

          <p class="text-[14px] font-semibold">For more floor inspiration</p>
        </Link>
        <Image src={"Ayatrio updated icon/backarrow.svg"} width={15} height={15} className="" />
      </div>
    </>
  );
};

export default Display;
