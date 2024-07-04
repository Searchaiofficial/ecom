"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectFormData } from "../Features/Slices/formSlice";
import { selectRoomData, selectRoomStatus } from "../Features/Slices/roomSlice";
import Image from "next/image";
import OrderSum from "./OrderSum";

const Arrive = () => {
  // let navigate = useNavigate();
  const router = useRouter();
  const handleClick = () => {
    // navigate("/payment");
    router.push("/payment");
  };

  const handleEdit = () => {
    router.push("/checkout");
  };
  const roomData = useSelector(selectRoomData);
  // console.log("roomData in cart page", roomData);
  const roomStatus = useSelector(selectRoomStatus);
  // console.log("roomstatus", roomStatus);
  const formadata = useSelector(selectFormData);
  return (
    <div>
      <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-0 gap-7">
        <div className="col-span-1 order-2 sm:order-1">
          <h3 className="mb-4 text-lg font-lg">
            When would you like to get your order?
          </h3>
          <div className="col-span-2"></div>
          <div className="mb-10 flex items-center deliver border-black rounded-xl h-14 sm:w-80 w-[80vw] border-solid border-2 p-1">
            <a className="flex-grow pl-4 text-sm" href="#">
              Arrives Thu, 14 Dec - Wed, 3 Jan
            </a>
            <p className="flex items-end pr-4 text-gray-500 text-sm">1250.00</p>
          </div>
          {roomStatus === "succeeded" && (
            <div>
              <div>
                <h3 className="mb-4t text-lg font-medium">
                  Arrives Thu,14 Dec-Wed,3 Jan
                </h3>
                {/* <img src={shoe} alt="shoe" className="h-20 w-20" /> */}
                <Image loading="lazy"
                  src={roomData.images[0]}
                  alt="shoe"
                  width={80}
                  height={80}
                  className="my-10"
                />
              </div>
            </div>
          )}
          <h6 className="mt-4 text-gray-500 text-sm mb-6">
            This is an international shipment requiring customers clearance
          </h6>
          <button
            className="mt-4 bg-black text-white py-2 px-4 rounded-full sm:w-96 w-[70vw] sm:mb-0 mb-5"
            onClick={handleClick}
          >
            Continue
          </button>
          <hr className=" mt-10" />
          <div>
            <div className="flex flex-row justify-between items-center">
              <p className="mt-4 mb-8 text-xl font-semibold text-gray-400">
                Delivery
              </p>
              <button
                onClick={handleEdit}
                className=" outline outline-slate-300 border-black h-10 w-20 rounded-full"
              >
                Edit
              </button>
            </div>

            <div className="text-gray-400 mb-6">
              <p>
                {formadata.first} {formadata.last}
              </p>
              <p>{formadata.add1} </p>
              <p>{formadata.email} </p>
              <p>{formadata.number} </p>
              <p>{formadata.pan} </p>
            </div>

            <hr />
            <p className="mt-4 mb-8 text-xl font-semibold text-black">
              Shipping
            </p>
            <hr />
            <p className="mt-4 mb-8 text-xl font-semibold text-gray-400">
              Payment
            </p>
          </div>
        </div>
        <div className="col-span-1 order-1 sm:order-2">
          <OrderSum />
        </div>
      </div>
    </div>
  );
};

export default Arrive;
