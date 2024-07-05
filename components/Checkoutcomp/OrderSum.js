"use client";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectRoomData, selectRoomStatus } from "../Features/Slices/roomSlice";
import { selectQuantity } from "../Features/Slices/calculationSlice";
// import { setDbItems } from "../Features/Slices/cartSlice";
import { useRouter, useSearchParams } from "next/navigation";
const OrderSum = () => {
  const router = useRouter();
  const roomData = useSelector(selectRoomData);
  // console.log("roomData in cart page", roomData);
  const roomStatus = useSelector(selectRoomStatus);
  // console.log("roomstatus", roomStatus);
  const quantity = useSelector(selectQuantity);
  const dbItemset = useSelector((state) => state.cart.dbItems);
  // console.log("from redux and db", dbItemset);
  // const dataReceived = router.query.data;
  // console.log(dataReceived);
  // const isFromCart = router.asPath.includes("/cart");

  const searchParams = useSearchParams();
  // console.log(searchParams.get("search")); // Logs "search"
  const properties = searchParams.get("search");

  let totalPrices = 0;
  if (properties === "cart") {
    totalPrices = dbItemset.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  return (
    <div className="sm:w-auto w-[80vw]">
      {(properties === "rooms" || properties === "sample") &&
        roomStatus === "succeeded" && (
          <div>
            <h3 className=" font-lg text-2xl">Order Summary</h3>
            <br />
            <div className="grid grid-cols-2">
              <div className="col-span-1 text-gray-500 flex flex-col gap-2">
                Subtotal <br /> <br />
                Delivery/Shipping
                <br />
                <hr />
                <h3 className="mt-2 mb-2 text-black">Total</h3>
                <hr />
              </div>
              <div className="col-span-1 ">
                ₹{roomData.totalPrice * quantity}
                <br />
                <br />
                ₹ 1250.00
                <br />
                <br />₹ {roomData.totalPrice * quantity + 1250.0}
                <br />
              </div>
            </div>
            <h6 className="text-xs mt-2 mb-6 sm:w-[90%] w-[70vw]">
              (The total reflects the price of your order, including all duties
              and taxes)
            </h6>
            {/* from here show start */}
            <h3 className="font-bold">Arrives Thu, 13 Dec-Wed, 3 Jan</h3>
            <div className="grid grid-cols-2 gap-10">
              <div className="col-span-1">
                {/* <img src={shoe} alt='shoes'/> */}
                <Image loading="lazy"
                  src={roomData.images[0]}
                  alt={roomData.productTitle}
                  width={180}
                  height={180}
                />
              </div>
              <div className="col-span-1">
                <h5 className="text-sm">
                  {roomData.productTitle}
                  <br />
                  {roomData.category}
                </h5>
                <h6 className="text-sm text-gray-500">Qty : {quantity}</h6>
                <h6 className="text-sm text-gray-500">Size UK 7.5</h6>
                <h6 className="text-sm text-gray-500">
                  {" "}
                  ₹{roomData.totalPrice + 1250.0}
                </h6>
              </div>
            </div>
          </div>
        )}

      {properties === "cart" && (
        <div>
          <h3 className=" font-lg text-xl">Order Summary</h3>
          <br />
          <div className="grid grid-cols-2">
            <div className="col-span-1 text-gray-500 flex flex-col gap-2">
              Subtotal <br /> <br />
              Delivery/Shipping
              <br />
              <hr />
              <h3 className="mt-2 mb-2 text-black">Total</h3>
              <hr />
            </div>
            <div className="col-span-1 ">
              {/* ₹{roomData.totalPrice * quantity} */}₹ {totalPrices}
              <br />
              <br />
              ₹ 7
              <br />
              <br />₹ {totalPrices + 7.0}
              <br />
            </div>
          </div>
          <h6 className="text-xs mt-2 mb-6 sm:w-[90%] w-[70vw]">
            (The total reflects the price of your order, including all duties
            and taxes)
          </h6>
          {/* from here show start */}
          <div>
            {dbItemset &&
              dbItemset.items &&
              dbItemset.items.map((item) => (
                <div key={item._id}>
                  <h3 className="font-bold">Arrives Thu, 13 Dec-Wed, 3 Jan</h3>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="col-span-1">
                      {/* <img src={shoe} alt='shoes'/> */}
                      <Image loading="lazy"
                        src={item.productId.images[0]}
                        alt={item.productId.productTitle}
                        width={180}
                        height={180}
                      />
                    </div>
                    <div className="col-span-1">
                      <h5 className="text-sm">
                        {item.productId.productTitle}
                        <br />
                        {item.productId.category}
                      </h5>
                      <h6 className="text-sm text-gray-500">
                        Qty : {item.quantity}
                      </h6>
                      <h6 className="text-sm text-gray-500">Size UK 7.5</h6>
                      <h6 className="text-sm text-gray-500">
                        {" "}
                        ₹ {item.quantity * item.price}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSum;
