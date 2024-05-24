import Image from "next/image";
import TabImage from "../Cards/TabImage";
import { fetchRoomData } from "@/actions/fetchRoomData";
import { fetchGalleryData } from "@/actions/fetchGalleryData";
import Link from "next/link";

const RoomCard = async () => {
  const gallery = await fetchGalleryData();
  return (
    <>
      {gallery && (
        <div className="px-[15px] flex justify-between mx-auto mb-10 ">
          <div className=" w-full flex justify-center max-h-[915px] screens ">
            <div className="w-full  lg:h-[730px] grid grid-cols-2 lg:grid-cols-12 gap-y-4  gap-x-4 auto-rows-fr">
              {/* 1 */}
              <div
                className="parent col-start-1 col-end-3 row-start-1  lg:mb-0 row-end-6
              lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:row-end-12
            "
              >
                <Link
                  href={`heading/offers/${gallery.items[0].offer.replace(
                    / /g,
                    "-"
                  )}`}
                >
                  <div className="parent relative w-full h-full">
                    <Image
                      className="child object-cover rounded-sm"
                      src={gallery.items[0].img}
                      layout="fill"
                      alt="Image"
                    />
                    <div className="absolute md:top-[20rem] left-3  lg:left-16 lg:-bottom-60  bottom-8 flex flex-col justify-center items-center p-2">
                      <h2 className="text-white text-center text-xl lg:text-3xl">
                        {gallery.items[0].heading}
                      </h2>
                      {/* <button className="bg-black hover:bg-zinc-300 text-white  py-2 px-10 h-12 rounded-full">
                        {gallery.items[0].buttonText}
                      </button> */}
                    </div>
                  </div>
                </Link>
              </div>
              {/* 2 */}
              <div
                className="parent col-start-1 col-end-2 row-start-6 row-span-2
              lg:col-start-7 lg:col-end-10 lg:row-start-1 lg:row-end-6
            "
              >
                {
                  <>
                    {gallery.mode == "room" && (
                      <Link
                        href={`/rooms/${gallery.rooms[0].roomType.replace(
                          / /g,
                          "-"
                        )}`}
                      >
                        <TabImage
                          src={gallery.rooms[0].imgSrc}
                          alt={`Image  of Children`}
                          width={1000}
                          height={338}
                          labelData={gallery.rooms[0].children}
                        />
                      </Link>
                    )}
                  </>
                }
              </div>
              {/* 3 */}
              <div
                className=" parent  col-start-2 col-end-3 row-start-6 row-span-3
            lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-7
            "
              >
                {
                  <>
                    {gallery.mode === "room" && (
                      <Link
                        href={`/rooms/${gallery.rooms[1].roomType.replace(
                          / /g,
                          "-"
                        )}`}
                      >
                        <TabImage
                          src={gallery.rooms[1].imgSrc}
                          alt={`Image  of Children`}
                          width={1000}
                          height={338}
                          labelData={gallery.rooms[1].children}
                        />
                      </Link>
                    )}
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
                    {gallery.mode === "room" && (
                      <Link
                        href={`/rooms/${gallery.rooms[2].roomType.replace(
                          / /g,
                          "-"
                        )}`}
                      >
                        <TabImage
                          src={gallery.rooms[2].imgSrc}
                          alt={`Image  of Children`}
                          width={1000}
                          height={338}
                          labelData={gallery.rooms[2].children}
                        />
                      </Link>
                    )}
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
                    {gallery.mode === "room" && (
                      <Link
                        href={`/rooms/${gallery.rooms[3].roomType.replace(
                          / /g,
                          "-"
                        )}`}
                      >
                        <TabImage
                          src={gallery.rooms[3].imgSrc}
                          alt={`Image  of Children`}
                          width={1000}
                          height={338}
                          labelData={gallery.rooms[3].children}
                        />
                      </Link>
                    )}
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomCard;
