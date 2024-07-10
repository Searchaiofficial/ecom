import React from "react";
import dynamic from "next/dynamic";
import Profile from "./profile";

const page = ({ params }) => {
  return (
    <>
      <Profile id={params.id} />
    </>
  );
};

export default page;
