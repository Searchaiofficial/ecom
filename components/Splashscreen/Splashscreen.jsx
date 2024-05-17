import React from "react";
// import mainlogo from '../../assets/ayatriologo.png';
import Image from "next/image";
const Splashscreen = () => {
  return (
    <div className="flex items-center justify-center fixed inset-0 z-[99999] bg-white  ">
      <div className="text-center">
        <Image
          src="/logo/ayatriologo.png"
          alt="Ayatrio logo"
          width={200}
          height={100}
          className="w-80 h-auto transition-all ease-linear duration-500"
        ></Image>
      </div>
    </div>
  );
};

export default Splashscreen;
