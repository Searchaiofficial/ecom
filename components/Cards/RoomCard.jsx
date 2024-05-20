
import Image from "next/image";
import TabImage from "../Cards/TabImage";
import { fetchRoomData } from "@/actions/fetchRoomData";
import { fetchGalleryData } from "@/actions/fetchGalleryData";


const RoomCard = async () => {
  const roomData = await fetchRoomData()
  const gallery = await fetchGalleryData()


  return (
    <>
      <div className="px-[15px] flex justify-between mx-auto mb-10 ">
        <div className=" w-full flex justify-center ">
          <div className="w-full  h-[900px]  lg:h-[730px] grid grid-cols-2 lg:grid-cols-12  gap-x-4 auto-rows-fr">
            {/* 1 */}
            <div
              className="parent col-start-1 col-end-3 row-start-1 mb-4 lg:mb-0 row-end-6
              lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:row-end-12
            "
            >
              {gallery.length > 0 ? (
                <>
                  <div className="parent relative w-full h-full">
                    <Image
                      className="child object-cover rounded-sm"
                      src={gallery[0].items[0].img}
                      layout="fill"
                      alt="Image"
                      objectFit="cover"
                    />
                    <div className="absolute md:top-[20rem]  left-0 right-0 bottom-0 flex flex-col justify-center items-center p-2">
                      <h2 className="text-white absolute bottom-4 text-center left-7 lg:bottom-10 lg:left-20  text-lg lg:text-3xl  mb-4">
                        {gallery[0].items[0].heading}
                      </h2>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="child w-full h-full bg-gray-300 flex justify-center items-center">
                    <p>Data Loading...</p>
                  </div>
                </>
              )}
            </div>
            {/* 2 */}
            <div
              className="parent mb-4 col-start-1 col-end-2 row-start-6 row-span-2
              lg:col-start-7 lg:col-end-10 lg:row-start-1 lg:row-end-6
            "
            >
              {
                <>
                  <TabImage
                    src={roomData[0]?.imgSrc}
                    alt={`Image  of Children`}
                    width={1000}
                    height={338}
                    labelData={roomData[0].children}
                  />
                </>
              }
            </div>
            {/* 3 */}
            <div
              className=" parent mb-4  col-start-2 col-end-3 row-start-6 row-span-3
            lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-7
            "
            >
              {
                <>
                  <TabImage
                    src={roomData[1]?.imgSrc}
                    alt={`Image  of Children`}
                    width={1000}
                    height={300}
                    labelData={roomData[1]?.children}
                  />
                </>
              }
            </div>
            {/* 4 */}
            <div
              className=" parent col-start-1 col-end-2 row-start-8 row-span-3
              lg:col-start-7 lg:col-end-10 lg:row-start-6 lg:row-end-12
            "
            >
              {
                <>
                  <TabImage
                    src={roomData[2]?.imgSrc}
                    alt={`Image  of Children`}
                    width={1000}
                    height={300}
                    labelData={roomData[2]?.children}
                  />
                </>
              }
            </div>
            {/* 5 */}
            <div
              className=" parent col-start-2 col-end-3 row-start-9 row-span-2
              lg:col-start-10 lg:col-end-13 lg:row-start-7 lg:row-end-12
            "
            >
              {
                <>
                  <TabImage
                    src={roomData[3]?.imgSrc}
                    alt={`Image  of Children`}
                    width={1000}
                    height={300}
                    labelData={roomData[3]?.children}
                  />
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
