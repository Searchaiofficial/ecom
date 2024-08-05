"use client";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  selectproductdata,
  selectproductstatus,
} from "../Features/Slices/compareSlice";
import { useRouter } from "next/navigation";

const CompareDetails = ({ data }) => {
  // const datas = useSelector(selectproductdata);
  // const statuses = useSelector(selectproductstatus);

  // console.log(filteredProducts)
  // console.log(datas)
  // console.log(datas.length)
  // console.log(statuses)

  const router = useRouter();
  const handlenav = (id) => {
    router.push(`/room/${id}`);
  };
  // const stars = new Array(4)
  //   .fill("/icons/star full black.svg")
  //   .concat("/icons/half black half white.svg");
  console.log(data)
  return (
    <div className="py-40">
      <div className="flex items-center justify-center sm:flex-row flex-wrap sm:gap-28 gap-10 overflow-x-auto">
        {
          data.map((item) => (
            <div
              className="  flex justify-center items-center flex-col gap-3"
              key={item._id}
            >

              <p className="text-2xl font-semibold">{item.productTitle}</p>

              <p>
                ₹<span className="text-3xl">{item.perUnitPrice}</span>
              </p>
              <button
                style={{ width: "fit-content" }}
                className="bg-blue-500 rounded-full px-4 py-0 whitespace-nowrap"
                onClick={() => handlenav(item._id)}
              >
                Buy
              </button>
              <hr className=" bg-slate-900 w-full" />
              <div className="flex flex-col gap-5 items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  {/* <p className="text-sm">Length: {item.dimensions.length?.value}</p> */}
                </div>
                <div className="flex flex-col items-center justify-center">
                  {/* <p>Width</p> */}
                  {/* <p className="text-sm">Width: {item.dimensions.width.value}</p> */}
                </div>
                <div className="flex flex-col items-center justify-center">
                  {/* <p>Category</p> */}
                  <p className="text-sm">Category: {item.category} </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  {/* <p>Style</p> */}
                  <p className="text-sm">Style: {item.style} </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  {/* <p>Features</p> */}
                  <p className="text-sm">Features: {item.features}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  {/* <p>Product description</p> */}
                  <p className="text-sm">Product description: {item.productDescription} </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p>Rating</p>
                  {/* <p className="text-sm flex flex-row gap-1 items-center text-black">
                    {stars.map((star, index) => (
                      <Image
                        key={index}
                        src={star}
                        alt="star"
                        width={15}
                        height={15}
                      />
                    ))}
                  </p> */}
                </div>
              </div>
              <hr className=" bg-slate-900 w-full" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CompareDetails;
