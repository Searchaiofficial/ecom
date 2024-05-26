"use client";
import React, { useEffect, useState } from "react";
import { allSelectedData } from "@/components/Features/Slices/virtualDataSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import LiveRoomProductCard from "./LiveRoomProductCard";
import Link from "next/link";

const LiveRoom = () => {
  const x = useSelector(allSelectedData);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    if (x.length > 0) {
      router.push("/virtualexperience/category");
    }
    const fetchVeProducts = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getVEFilter`;
        const response = await axios.post(apiUrl, x, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    const fetchProductByCategory = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchProductsByCategory/${x.category}`;
        const response = await axios.get(apiUrl);
        setSimilarProducts(response.data);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    fetchVeProducts();

    if (x.category) {
      fetchProductByCategory();
    }
  }, []);

  const [isDataFilled, setIsDataFilled] = useState(false);
  const [optionClick, setOptionClick] = useState("Instant Meeting");

  const handleSwitchOption = (option) => {
    setOptionClick(option);
  };

  const [userData, setUserData] = useState({ name: "", mobile: "" });

  const handleOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleJoin = () => {
    // Call Api
    setIsDataFilled(true);
  };

  const stars = new Array(4)
    .fill("/svg/icon/star.svg")
    .concat("/svg/icon/half-star.svg");

  return (
    <div className="">
      <div className="sm:px-4 flex px-[20px] h-screen py-4 ">
        <div className="relative w-[70%] bg-gray-200 py-4 border-2 border-black">
          <div className=" absolute bottom-4 w-full flex gap-2 justify-center">
            <button className="bg-red-500 hover:bg-red-400 text-xs text-center text-white font-medium shadow-sm  rounded-full w-10 h-10">
              Mute
            </button>
            <button className="bg-red-500 hover:bg-red-400 text-xs text-center text-white font-medium shadow-sm  rounded-full w-10 h-10">
              Mute
            </button>
            <button className="bg-red-500 hover:bg-red-400 text-xs text-center text-white font-medium shadow-sm  rounded-full w-10 h-10">
              Mute
            </button>
            <button className="bg-red-500 hover:bg-red-400 text-xs text-center text-white font-medium shadow-sm  rounded-full w-10 h-10">
              Mute
            </button>
            <button className="bg-red-500 hover:bg-red-400 text-xs text-center text-white font-medium shadow-sm  rounded-full w-10 h-10">
              Mute
            </button>
          </div>
        </div>
        <div className="relative flex flex-col w-[30%] pl-4">
          <div className="relative w-full overflow-y-scroll h-[92%]">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Related Products</h1>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <div className="grid grid-cols-1 w-full h-full fade-in ">
                    <LiveRoomProductCard
                      productTitle={product.productTitle}
                      price={product.perUnitPrice}
                      demandtype={product.demandtype}
                      specialprice={product.specialprice}
                      desc={product.productTitle}
                      imgSrc={product.images}
                      rating={product.ratings}
                      key={idx}
                      id={product._id}
                      category={product.category}
                      productId={product.productId}
                      ratings={product.ratings}
                      stars={stars}
                      totalPrice={product.totalPrice}
                      productDescription={product.productDescription}
                    />
                  </div>
                ))
              ) : (
                <div className="mt-2">No products found</div>
              )}
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-semibold mb-2">Similar Products</h1>
              {similarProducts.length > 0 ? (
                similarProducts.map((product, idx) => (
                  <div className="grid grid-cols-1 w-full h-full fade-in ">
                    <LiveRoomProductCard
                      productTitle={product.productTitle}
                      price={product.perUnitPrice}
                      demandtype={product.demandtype}
                      specialprice={product.specialprice}
                      desc={product.productTitle}
                      imgSrc={product.images}
                      rating={product.ratings}
                      key={idx}
                      id={product._id}
                      category={product.category}
                      productId={product.productId}
                      ratings={product.ratings}
                      stars={stars}
                      totalPrice={product.totalPrice}
                      productDescription={product.productDescription}
                    />
                  </div>
                ))
              ) : (
                <div className="mt-2">No products found</div>
              )}
            </div>
          </div>
          <div className="absolute p-2 w-full bottom-0 left-0 h-[8%] ">
            <input
              type="text"
              placeholder="Type here to chat..."
              className="w-full h-full border-1 bg-gray-200  rounded-full p-2 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {!isDataFilled && (
        <div className=" fixed h-full w-screen  bg-black/50 z-[9999] backdrop:blur-sm top-0 left-0">
          <section className="pt-[15vh] text-black bg-white flex-col absolute right-0 top-0 h-screen p-8 gap-8 z-50  w-[35%] flex ">
            <div className="flex justify-around text-lg font-medium">
              <h1
                className={`border-b-2 cursor-pointer ${
                  optionClick === "Instant Meeting"
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => handleSwitchOption("Instant Meeting")}
              >
                Instant Meeting
              </h1>
              <h1
                className={`border-b-2 cursor-pointer ${
                  optionClick === "Schedule Meeting"
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => handleSwitchOption("Schedule Meeting")}
              >
                Schedule Meeting
              </h1>
            </div>

            {optionClick === "Instant Meeting" && (
              <div>
                <div className="">
                  <h1 className="text-lg font-semibold">Enter Name</h1>
                  <input
                    type="text"
                    name="name"
                    placeholder="john doe"
                    className="w-full mt-2 h-10 border-1 bg-gray-100 px-4 rounded-full py-2 focus:outline-none"
                    onChange={handleOnChange}
                  />
                </div>

                <div className="mt-2">
                  <h1 className="text-lg font-semibold">Mobile no.</h1>
                  <input
                    type="number"
                    placeholder="9876543210"
                    name="mobile"
                    className="w-full mt-2 h-10 border-1 bg-gray-100  rounded-full px-4 py-2 focus:outline-none"
                    onChange={handleOnChange}
                  />
                </div>

                <button
                  className="bg-black text-white w-full h-10 rounded-full mt-4"
                  onClick={handleJoin}
                >
                  Join
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {filteredProducts.length === 0 && similarProducts.length === 0 && (
        <div
          className="relative z-[9999]"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex flex-col  items-center">
                    <p className="text-lg  mb-2">No Product Found</p>

                    <Link href="/category/virtualexperience">
                      <h1 className="bg-blue-500 p-2 text-white rounded-md">
                        Go Back
                      </h1>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveRoom;
