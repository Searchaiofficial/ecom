import React from "react";
import { privacyPolicy } from "@/Model/PrivacyPolicy/privacyPolicyData";

const page = () => {
  return (
    <div className="flex flex-col mt-20 sm:px-[50px] px-[20px] space-y-20 sm:w-2/3">
      <div>
        <h1 className="text-4xl font-bold">
          AYATRIO India Customer Privacy Policy
        </h1>
      </div>
      {privacyPolicy.map((curElement) => {
        return (
          <div className="space-y-2">
            <p className="font-semibold text-lg">{curElement.title}</p>
            <p>{curElement.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default page;
