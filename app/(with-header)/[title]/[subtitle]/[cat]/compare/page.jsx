import React from "react";
import CompareDetails from "@/components/Product/CompareDetails";
import CompareImage from "@/components/Product/CompareImage";

const page = () => {
  return (
    <div className="relative top-20">
      <CompareImage />
      <CompareDetails />
    </div>
  );
};

export default page;
