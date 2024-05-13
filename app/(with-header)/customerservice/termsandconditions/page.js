import {
  ecommerce,
  familyMembership,
  familyRewards,
} from "@/Model/TermsAndConditions/termsAndConditions";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col sm:w-2/3 mt-20 sm:px-[50px] px-[20px] space-y-5">
      <div>
        <h1 className="text-4xl font-bold">
          AYATRIO Terms, Conditions and Privacy notice
        </h1>
      </div>
      <hr />
      {/* e-commerce section starts */}
      <div className="space-y-3">
        <p className="font-semibold">AYATRIO.in (E-commerce)</p>
        <p>
          We now bring AYATRIO to your doorstep with a full range of articles in
          various cities in India – Hyderabad; Mumbai; Pune; Ahmedabad; Surat;
          Vadodara; Bangalore.
        </p>
        {ecommerce.map((curElement) => {
          return <li>{curElement.text}</li>;
        })}
      </div>
      <hr />
      {/* family membership section starts */}
      <div className="space-y-3">
        <p className="font-semibold">AYATRIO Family membership</p>
        {familyMembership.map((curElement) => {
          return <li>{curElement.text}</li>;
        })}
      </div>
      <hr />
      {/* family rewards section starts */}
      <div className="space-y-3">
        <p className="font-semibold">AYATRIO Family Rewards</p>
        {familyRewards.map((curElement) => {
          return <li>{curElement.text}</li>;
        })}
      </div>
    </div>
  );
};

export default page;
