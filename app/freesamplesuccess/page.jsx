"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
const page = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative top-[70px] ">
      <div className="flex items-center flex-col gap-10  w-[50vw] h-auto shadow-gray-400 shadow-xl border p-10">
        <h2 className="flex justify-center items-center w-full text-green-500 text-2xl  ">
          Free samples requested Successfully!
        </h2>
        {/* {
          orderId && <h2 className="flex justify-center items-center w-full text-purple-500 text-xl mt-4 ">
            Order Id: {orderId}
          </h2>
        } */}

        <Image
          src="/icons/tick.svg"
          alt="tick"
          width={80}
          height={80}
          loading="lazy"
        />
        <div className="w-full flex flex-row">
          <div className="text-left w-1/2">
            {/* <p className="my-1">Payment Type</p>
            <p className="my-1">Bank</p>
            <p className="my-1">Mobile</p>
            <p className="my-1">Email</p>
            <p className=" my-5">Amount paid</p>
            <p>Transaction id</p>
          </div>
          <div className="text-right w-1/2">
            <p className="my-1">Net banking</p>
            <p className="my-1"> HDFC</p>
            <p className="my-1">82889232020</p>
            <p className="my-1">google@gmail.com</p>
            <p className=" my-5">$5000</p>
            <p>34891230981</p> */}
          </div>
        </div>
        <div className="flex gap-1">
          {/* <button className=" bg-blue-500 px-5 py-2 rounded">PRINT</button> */}
          <Link href={"/"} className="bg-blue-500 px-5 py-2 rounded">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
