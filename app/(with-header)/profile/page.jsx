import React from "react";
import dynamic from "next/dynamic";
const ProfileComponent = dynamic(() => import("./main"), { ssr: false });

const page = () => {
  return (
    <>
      <ProfileComponent />
    </>
  );
};

export default page;
