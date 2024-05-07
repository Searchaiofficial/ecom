import React from "react";

import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProfileContent from "./ProfileContent";

const Profile = () => {
  return (
    <div>
      <div className="pt-14 grid md:grid-cols-5 grid-cols-1 gap-4 bg-zinc-100 sm:px-[50px] px-[20px]  ">
        <div className="col-span-2 md:mb-auto mb-0">
          <div className="col-span-1  mt-4">
            <div className="mb-2 ">Inspiration to installation</div>
            <div className="font-bold text-3xl mb-4">
              {/* <span className="whitespace-nowrap">Meet our designers,</span>
              <br />
              <span className="whitespace-nowrap">to make your dream</span>
              <br />
              to true */}
              <p className="">Meet our designers , to make your dream to true</p>
            </div>
            <div className="sm:text-xl text-lg mb-8">
              <span className="whitespace-nowrap">
                We bring your vision to life with
              </span>
              <br />
              <span className="whitespace-nowrap">
                free white glove services
              </span>
              <br />
            </div>
            <button className="bg-black pt-3 pb-3 pr-[25px] pl-[25px] mb-12 rounded-full flex justify-center items-center text-white">
              Book an appointment
            </button>
          </div>
        </div>
        <div className=" col-span-3 my-auto overflow-x-auto">
          <ProfileContent />
        </div>
      </div>
    </div>
  );
};

export default Profile;
