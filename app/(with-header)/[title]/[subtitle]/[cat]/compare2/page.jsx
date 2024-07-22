"use client"
import CompareDetails from "@/components/Product/CompareDetails";
import CompareImage2 from "@/components/Product/compareImage2";
import React, { useEffect, useState } from "react";
import { selectproductdata } from "../../../../../../components/Features/Slices/compareSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setDbItems } from "../../../../../../components/Features/Slices/cartSlice";


const page = () => {
  const data = useSelector(selectproductdata);
  const [totalProducts, setTotalProducts] = useState(0)
  useEffect(() => {
    if (data.length === 3) {
      setTotalProducts(3)
    } else if (data.length === 2) {
      setTotalProducts(2)
    }
  }, [data])
  // console.log(data)


  const dispatch = useDispatch()
  const router = useRouter()

  const addProductToCart = async (productId) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
      {
        deviceId: localStorage.getItem("deviceId"),
        productId: productId,
        quantity: 1,
      }
    );
    if (response.status === 200) {
      dispatch(setDbItems(response.data));
      router.push("/checkout")

    }
    // console.log(response.data)
  };
  return (
    <div className="relative top-20 lg:px-[67px] px-[20px]">
      <div className="py-[20px] mb-5 ">
        <h1 className="lg:text-5xl text-2xl py-[15px] ">Compare Products</h1>
        <p>
          Get help choosing.
          <span className="text-blue-600"> Chat with a Specialist</span>
        </p>
      </div>
      <div className={`grid ${totalProducts === 3 ? "grid-cols-3" : "grid-cols-2"} w-full gap-2 lg:gap-x-10 overflow-x-auto`}>
        {
          data.map((item) => (
            <div className="flex flex-col  gap-4">
              <div className="flex flex-col">
                <div className="">
                  <Image
                    src={item.images[0]}
                    height={300}
                    width={300}
                    alt={item.productTitle}
                    className=" min-h-[150px] min-w-[150px] lg:h-[300px] lg:w-[300px]"
                    style={{
                      // width: "100%",
                      // clipPath: `polygon(0% 0%, ${sliderValue}% 0%, ${sliderValue}% 100%, 0% 100%)`,
                    }}
                  />
                </div>
                <div
                  className="  flex  flex-col "
                >
                  <p className="lg:text-2xl text-[18px] font-semibold py-1">{item.productTitle}</p>
                  <p className="lg:text-[16px] text-[14px] font-semibold text-gray-500">{item.shortDescription}</p>
                  <div className="flex gap-1 items-end my-2 mb-4">
                    <h2
                      className={`text-3xl flex font-semibold leading-[0.5]  tracking-wide ${item?.specialprice?.price
                        ? "bg-[#FFC21F] px-2 pt-3 pb-1 w-fit shadow-lg"
                        : ""
                        } `}
                      style={
                        item?.specialprice?.price
                          ? { boxShadow: "3px 3px #C31952" }
                          : {}
                      }
                    >
                      <span
                        className={`text-sm ${item?.specialprice?.price ? "" : "pt-3.5"
                          }`}
                      >
                        Rs. &nbsp;
                      </span>{" "}
                      {item?.specialprice?.price ? (
                        item?.specialprice?.price
                      ) : (
                        <p className="pt-3 ">{item.perUnitPrice}</p>
                      )}
                    </h2>
                    {item.unitType ? (
                      <span className="tracking-wide text-sm">{`/ ${item.unitType}`}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <button
                    style={{ width: "fit-content" }}
                    className="bg-black rounded-full text-white font-medium  text-[16px] h-[40px] px-[50px] whitespace-nowrap"
                    onClick={() => addProductToCart(item._id)}
                  >
                    Buy
                  </button>
                  <hr className=" bg-slate-900 w-full mt-5" />
                </div>
                <div className="flex flex-col gap-5 items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    {/* <p className="text-sm">Length: {item.dimensions.length?.value}</p> */}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    {/* <p>Width</p> */}
                    {/* <p className="text-sm">Width: {item.dimensions.width.value}</p> */}
                  </div>
                  {/* <div className="flex flex-col items-center justify-center">
                    <p>Category</p>
                    <p className="text-sm">Category: {item.category} </p>
                  </div> */}
                  {/* <div className="flex flex-col items-center justify-center">
                    <p>Style</p>
                    <p className="text-sm">Style: {item.style} </p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p>Features</p>
                    <p className="text-sm">Features: {item.features}</p>
                  </div> */}
                  <div className="flex flex-col gap-2 self-start ">
                    <p className="text-[14px] underline font-semibold">Product description</p>
                    <p className="text-sm line-clamp-4 min-h-[100px]">Product description: {item.productDescription} </p>
                  </div>

                  <div className="flex flex-col self-start gap-1 border-t w-full pt-2">
                    <p className="text-[14px] underline font-semibold">Measurements</p>
                    <p className="text-[14px] text-gray-500">Measurements details.</p>
                  </div>
                  <div className="flex flex-col self-start gap-2 bg-gray-100 w-full py-2">
                    <div className="flex flex-col self-start gap-[2px] ">
                      <p className="text-[14px] font-semibold">patternNumber</p>
                      <p className="text-[14px]">{item.patternNumber}</p>
                    </div>
                    <div className="flex flex-col self-start gap-[2px] ">
                      <p className="text-[14px] font-semibold">Length</p>
                      <p className="text-[14px]">{item.dimensions[0]?.length?.value || "NA"}</p>
                    </div>
                    <div className="flex flex-col self-start gap-[2px] ">
                      <p className="text-[14px] font-semibold">Width</p>
                      <p className="text-[14px]">{item.dimensions[0]?.length?.value || "NA"}</p>
                    </div>
                    <div className="flex flex-col self-start gap-[2px] ">
                      <p className="text-[14px] font-semibold">Thinkness</p>
                      <p className="text-[14px]">{item.dimensions[0]?.length?.value || "NA"}</p>
                    </div>

                  </div>

                  <div className="flex flex-col self-start gap-1 border-t w-full pt-2">
                    <p className="text-[14px] underline font-semibold">Technical Information</p>
                    <p className="text-[14px] text-gray-500">Technical facts and Information about product.</p>
                  </div>
                  <div className="flex flex-col self-start gap-2 bg-gray-100 w-full py-2">
                    <div className="flex flex-col self-start gap-[2px] ">
                      <p className="text-[14px] font-semibold">Color</p>
                      <p className="text-[14px]">{item.colors[0] || "NA"}</p>
                    </div>
                    <div className="flex flex-col self-start gap-[2px] ">
                      <p className="text-[14px] font-semibold">Material</p>
                      <p className="text-[14px]">{item.material || "NA"}</p>
                    </div>
                    <div className="flex flex-col self-start gap-[2px] ">
                      <p className="text-[14px] font-semibold">Category</p>
                      <p className="text-[14px]">{item.category}</p>
                    </div>
                    <div className="flex flex-col self-start gap-[2px] ">
                      <p className="text-[14px] font-semibold">SubCategory</p>
                      <p className="text-[14px]">{item.subcategory}</p>
                    </div>
                  </div>


                  <div className="flex flex-col self-start gap-1 border-t w-full pt-2">
                    <p className="text-[14px] underline font-semibold">Core values</p>
                    <p className="text-[14px] text-gray-500">Some core values about product.</p>
                  </div>
                  <div className="flex flex-col self-start gap-2 bg-gray-100 w-full py-2">
                    {
                      item.coreValues && item.coreValues.map((core) => (
                        <div className="flex flex-col self-start gap-[2px] ">
                          <p className="text-[14px] font-semibold">{core.heading || "NA"}</p>
                          <p className="text-[14px]">{core.text || "NA"}</p>
                        </div>
                      ))
                    }
                  </div>


                  <div className="flex flex-col self-start gap-1 border-t w-full pt-2">
                    <p className="text-[14px] underline font-semibold">Features</p>
                    <p className="text-[14px] text-gray-500">Some features of this product.</p>
                  </div>
                  <div className="flex flex-col self-start gap-2 bg-gray-100 w-full py-2 mb-10">
                    {
                      item.features && item.features.map((core) => (
                        <div className="flex flex-col self-start gap-[2px] ">
                          <p className="text-[14px] font-semibold">{core.text || "NA"}</p>
                          {/* <p className="text-[14px]">{core.text || "NA"}</p> */}
                        </div>
                      ))
                    }
                  </div>
                  {/* <div className="flex flex-col items-center justify-center">
                    <p>Rating</p>
                    <p className="text-sm flex flex-row gap-1 items-center text-black">
                    {stars.map((star, index) => (
                      <Image
                        key={index}
                        src={star}
                        alt="star"
                        width={15}
                        height={15}
                      />
                    ))}
                  </p>
                  </div> */}
                </div>
                <hr className=" bg-slate-900 w-full" />
              </div>

            </div>
          ))
        }
      </div>
      {/* <CompareImage2 data={data} /> */}
      {/* <CompareDetails data={data} /> */}
    </div>
  );
};

export default page;
