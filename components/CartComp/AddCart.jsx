"use client";

// import { Delete, HeartBroken } from "@mui/icons-material";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRoomData } from "../Features/Slices/roomSlice";
import { selectRoomStatus } from "../Features/Slices/roomSlice";
import { selectQuantity } from "../Features/Slices/calculationSlice";
import { Link } from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
// import Footer from "../Footer/Footer";
const AddCart = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/checkout");
  };
  const selectedItems = useSelector((state) => state.rooms.selectedActivity);
  // console.log("Cart component re-rendered");
  // const roomsData = useSelector((state) => state.roomdetails.roomData);
  const roomData = useSelector(selectRoomData);
  // console.log("roomData in cart page", roomData);
  const roomStatus = useSelector(selectRoomStatus);
  // console.log("roomstatus", roomStatus);
  // console.log("selecteditems", selectedItems);
  const quantity = useSelector(selectQuantity);
  const [cartdata, setcartdata] = useState(null);
  const [cartStatus, setCartStaus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCartStaus("Loading");
        const response = await axios.get("http://3.224.109.20:8080/api/cart");
        setcartdata(response.data);
        setCartStaus("db is successfull");
      } catch (error) {
        console.error("Error Fetching data from DB : ", error);
        setCartStaus("db is failed");
      }
    };
    fetchData();
  }, []);




  return (
    <div>
      <div className="main-cart flex justify-center items-center min-h-screen">
        <div className="cartContainer flex flex-col sm:flex-row w-4/5 h-4/5 bg-white sm:gap-0 gap-10 sm:my-0 my-20 ">
          {/* getting data from redux store */}
          {roomStatus === "succeeded" && (
            <div className="left-cart flex-col flex sm:w-2/3 w-[90vw] pr-8">
              <h1 className="sm:text-4xl text-2xl mb-6 font-semibold">Bag</h1>
              <div className="bagContainer">
                <div className="cartitem flex mb-6 border-b pb-4">
                  <div className="img w-48 h-48 mr-8">
                    <img
                      src={roomData.images[0]}
                      className="w-full h-full object-cover rounded-md"
                      alt="Product"
                    />
                  </div>
                  <div className="cartContent flex flex-col justify-between">
                    <div className="mainright">
                      <div className="leftContent flex flex-col">
                        <h2 className="sm:text-xl text-lg sm:font-semibold font-medium  mb-2">
                          {roomData.productTitle}
                        </h2>
                        <h3 className="text-gray-600">{roomData.category}</h3>
                      </div>
                      <div className="rightContent sm:text-xl text-lg sm:font-semibold font-medium">
                        ${roomData.totalPrice}
                      </div>
                      <div className="icons flex items-center space-x-2 mt-4">
                        <Image
                          src="/CartIcons/delete-icon.svg"
                          width={25}
                          height={25}
                          alt="delete"
                          className="hover:text-slate-500 cursor-pointer"
                        />
                        <Image
                          src="/CartIcons/broken-heart-icon.svg"
                          width={25}
                          height={25}
                          alt=""
                          className="text-red-700 hover:text-red-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="right-cart flex flex-col sm:w-1/3 w-[80vw]">
            <h1 className="sm:text-4xl text-2xl font-semibold mb-6">
              Order Summary
            </h1>
            <div className="subtotal flex justify-between items-center mb-4">
              <div className="text-lg">Subtotal</div>
              <div className="text-lg sm:font-semibold font-medium">
                {roomData.totalPrice * quantity}
              </div>
            </div>
            <div className="deliveryCharges flex justify-between items-center mb-4">
              <div className="text-lg">Delivery Charges</div>
              <div className="text-lg sm:font-semibold font-medium">₹7</div>
            </div>
            <hr className="my-4" />
            <div className="total flex justify-between items-center mb-6">
              <div className="sm:text-xl text-lg sm:font-semibold font-medium">
                Total
              </div>
              <div className="sm:text-xl text-lg sm:font-semibold font-medium">
                ₹ {roomData.totalPrice * quantity + 7}
              </div>
              <div>Quantity: {quantity}</div>
            </div>

            <div
              onClick={handleClick}
              className="guestCheckout flex items-center justify-center my-4"
            >
              {" "}
              <button className="bg-black text-white sm:w-full w-[40vw] sm:h-14 h-9 rounded-full	 hover:bg-gray-900 transition duration-300">
                Guest Checkout
              </button>
            </div>

            <div
              onClick={handleClick}
              className="memberCheckout my-4 flex items-center justify-center"
            >
              <button className="bg-black text-white sm:w-full w-[40vw] sm:h-14 h-9 rounded-full	 hover:bg-gray-900 transition duration-300">
                Member Checkout
              </button>
            </div>
          </div>

          <div className="middle-cart">
            {Object.values(selectedItems).map((item) => (
              <div key={item.id} className="cartitem flex mb-6 border-b pb-4">
                <div className="img w-48 h-48 mr-8">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover rounded-md"
                    alt={item.title}
                  />
                </div>
                <div className="cartContent flex flex-col justify-between">
                  <div className="mainright">
                    <div className="leftContent flex flex-col">
                      <h2 className="sm:text-xl text-lg sm:font-semibold font-medium  mb-2">
                        {item.title}{" "}
                        {/* Use the correct property from your data */}
                      </h2>
                      <h3 className="text-gray-600">
                        {item.category}{" "}
                        {/* Use the correct property from your data */}
                      </h3>
                    </div>
                    <div className="rightContent sm:text-xl text-lg sm:font-semibold font-medium">
                      ₹{item.price}{" "}
                      {/* Use the correct property from your data */}
                    </div>
                    <div className="icons flex items-center space-x-2 mt-4">
                      <img
                        src={Delete}
                        alt=""
                        className="w-6 h-6 hover:text-slate-500 cursor-pointer "
                      />
                      <img
                        src={HeartBroken}
                        alt=""
                        className="text-red-700 hover:text-red-500 cursor-pointer w-6 h-6"
                      />
                      {/* <Delete className="hover:text-slate-500 cursor-pointer " /> */}
                      {/* <HeartBroken className="text-red-700 hover:text-red-500 cursor-pointer" /> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* this is from DB */}

          <h1>This is comming from DB</h1>
          {cartStatus === "loading" && <p>Loading...</p>}
          {cartStatus === "failed" && <p>Error loading data from DB.</p>}
          {cartStatus === "succeeded" && cartdata && (
            <div>
              <h1>Cart</h1>
              <ul>
                {cartdata.items.map((item) => (
                  <li key={item._id}>
                    <div>Name: {item.name}</div>
                    <div>Price: {item.price}</div>
                    <div>Quantity: {item.quantity}</div>
                    <div></div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* important data */}
      {/* <div>
        {roomStatus === "succeeded" && (
          <div>
           
            <div>Category: {roomData.category}</div>
            <div>Pattern Number: {roomData.patternNumber}</div>
            <div> Image: <img src={roomData.images[0]} alt="" style={{width:"100px", height:"100px"}} /> </div>
            
          </div>
        )}
        {roomStatus === "failed" && (
          <div>Error loading room data.</div>
        )}
      </div> */}

      {/* important data */}

      {/* new */}
      {/* <Footer /> */}
    </div>
  );
};

export default AddCart;
