import Image from "next/image";
import React from "react";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const PlaceInfo = (data) => {
  console.log("Place info", data)
  return (
    <>
      {data?.data?.coreValues ? (
        <>
          <div className={`place-features mb-4 sm:w-auto ${data?.data?.coreValues.length > 3 ? 'grid grid-cols-2 gap-4' : ''}`}>
            {
              data?.data?.coreValues.length > 0 && data?.data?.coreValues.map((item, index) => (
                <div className="hosted-by flex flex-start items-center py-4 font-lg" key={index}>
                  <div className="mr-4 w-[40px] h-[40px]">
                    <img
                      className="w-full min-w-[40px] min-h-[40px]"
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      {item.heading}
                    </h4>
                    <span className="mt-1 text-gray-500">
                      {item.text}
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        </>
      ) : (
        <>
          <div className="place-features my-4 sm:w-auto">
            <div className="hosted-by flex flex-start py-4 border-b font-lg">
              <div className="mr-4">
                <img
                  className="w-[40px] h-[40px]"
                  src="https://a0.muscache.com/im/pictures/user/User-507131869/original/ab3b1e39-25e1-4e68-ad8d-a881b097af35.jpeg?im_w=240"
                  alt=""
                />
              </div>
              <div>
                <h4 className="font-semibold">Hosted by Nikita</h4>
                <span className="mt-1 text-gray-500">8 months hosting</span>
              </div>
            </div>
            <div className="workspace flex items-center py-4 font-lg">
              <div className="mr-4">
                <svg
                  className="w-[24px] h-[24px] block text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path d="M26 2a1 1 0 0 1 .92.61l.04.12 2 7a1 1 0 0 1-.85 1.26L28 11h-3v5h6v2h-2v13h-2v-2.54a3.98 3.98 0 0 1-1.73.53L25 29H7a3.98 3.98 0 0 1-2-.54V31H3V18H1v-2h5v-4a1 1 0 0 1 .88-1h.36L6.09 8.4l1.82-.8L9.43 11H12a1 1 0 0 1 1 .88V16h10v-5h-3a1 1 0 0 1-.99-1.16l.03-.11 2-7a1 1 0 0 1 .84-.72L22 2h4zm1 16H5v7a2 2 0 0 0 1.7 1.98l.15.01L7 27h18a2 2 0 0 0 2-1.85V18zm-16-5H8v3h3v-3zm14.24-9h-2.49l-1.43 5h5.35l-1.43-5z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Dedicated workspace</h4>
                <span className="mt-1 text-gray-500">
                  A room with wifi that’s well suited for working.
                </span>
              </div>
            </div>
            <div className="dine-in flex items-center pt-2 pb-8 border-b font-lg">
              <div className="mr-4">
                <svg
                  className="w-[24px] h-[24px] block text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path d="M24 26c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 28c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 26zm0-5c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 23c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 21zM20 3a4 4 0 0 1 4 3.8V9h4v2h-4v5a4 4 0 0 1 2.5.86l.17.15c.3.27.71.44 1.14.48l.19.01v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 18c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 16c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5a3.96 3.96 0 0 1 2.44-1H16v-5H4V9h12V7a2 2 0 0 0-4-.15V7h-2a4 4 0 0 1 7-2.65A3.98 3.98 0 0 1 20 3zm-2 13.52.46.31.21.18c.35.31.83.49 1.33.49a2 2 0 0 0 1.2-.38l.13-.11c.2-.19.43-.35.67-.49V11h-4zM20 5a2 2 0 0 0-2 1.85V9h4V7a2 2 0 0 0-2-2z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Dive right in</h4>
                <span className="mt-1 text-gray-500">
                  This is one of the few places in the area with a pool.
                </span>
              </div>
            </div>
          </div>
          {/* <div className="place-information pt-6 pb-8 border-b">
            <p className="text-lg text-gray-600 font-[16px] leading-6	mb-6 sm:w-auto text-justify w-[100%]">
              Red Tree Villa is designed to cater our guests for all seasons. A
              Premium villa near Karjat, Mumbai and Pune having a lap pool for
              beating the heat in summers, a lush green lawn to enjoy rain dance
              amidst lush green mountains, a breathtaking view of waterfalls and
              river streams during the monsoon whilst you lie in your bed. The
              major highlight is a trek to Bhimashankar Mandir one of the 12
              Jyotirlingas in India. Enjoy Star gazing at our open terrace with
              a sky deck during cold winters.
            </p>
            <div className=" flex gap-4 underline font-[16px]  mb-2 cursor-pointer">
              Show more
              <Image
                src="/icons/arrow-circle-right-icon.svg"
                width={25}
                height={25}
                alt="right icon"
              />
            </div>
          </div> */}
        </>
      )}
      <div className="flex flex-col gap-2">
        <p className="text-[#484848] text-xs font-normal">Pattern Number</p>
        <div className="flex">
          <p className="bg-black px-4 py-1 text-white text-xs font-bold min-w-min">{data?.data?.patternNumber}</p>
          <div />
        </div>
      </div>
    </>
  );
};

export default PlaceInfo;
