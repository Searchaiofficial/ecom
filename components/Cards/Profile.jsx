import React from "react";

import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProfileContent from "./ProfileContent";
import { fetchProfileData } from "@/actions/fetchProfileData";
import Image from "next/image";
import Link from "next/link";


const Profile = async () => {
  const profileData = await fetchProfileData()

  return (
    <div>
      <div className="pt-14 lg:pt-[90px] grid md:grid-cols-5 grid-cols-1 gap-4 bg-[#fafafa] lg:pl-[67px] sm:pl-[50px] pl-[20px]  ">
        <div className="col-span-2 md:mb-auto mb-0">
          <div className="col-span-1 mt-4">
            <div className="mb-2 ">Let's exploring the future of living</div>
            <div className="font-bold text-3xl mb-4">
              <p className="leading-10">Great design starts by asking the right questions</p>
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
            <Link href="/freesample" className="bg-black pt-3 pb-3 pr-[25px] pl-[25px] mb-5 lg:mb-12 mt-16 md:mt-20  rounded-full flex justify-center items-center text-white w-72">
              <p>Book an appointment</p>
              <div className="ml-5">
                <Image src={"/icons/top_arrow-white.svg"} alt="arrow profile" height={15} width={15} loading="lazy" />
              </div>
            </Link>
          </div>
        </div>
        <div className="col-span-3 my-auto overflow-x-auto">
          <ProfileContent initialData={profileData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
