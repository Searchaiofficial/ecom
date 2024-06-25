"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/providers/SocketProvider";
import axios from "axios";

const LiveRoom = ({ user }) => {
  const { email, displayName, image } = user;
  const router = useRouter();

  const socket = useSocket();

  const [optionClick, setOptionClick] = useState("Instant Meeting");

  const handleSwitchOption = (option) => {
    setOptionClick(option);
  };

  
  const [selectedCategory, setSelectedCategory] = useState({});
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(() => {
        let allCategories = [];

        categories.forEach((category) => {
          allCategories = [...allCategories, ...category.subcategories];
        });

        return allCategories;
      });
    });
  }, []);

  // const [userData, setUserData] = useState({ name: "", mobile: "" });

  // const handleOnChange = (e) => {
  //   setUserData({ ...userData, [e.target.name]: e.target.value });
  // };

  const [message, setMessage] = useState({ status: null, text: "" });

  const requestJoin = () => {
    if (socket) {
      socket.emit("request_join", { email, displayName, image, category : selectedCategory.name });
      setMessage({ status: "pending", text: "Waiting for response..." });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("join_accepted", ({ roomId }) => {
        setMessage({
          status: "accepted",
          text: "Your request has been accepted!",
        });
        router.push(`/liveroom/${roomId}`);
      });
      socket.on("join_rejected", () => {
        setMessage({
          status: "rejected",
          text: "Your request has been rejected!",
        });
      });
    }
  }, [socket, router]);

  return (
    <div className="">
      <div className="sm:px-4 flex px-[20px] h-screen py-4 flex-col md:flex-row">
        <div className="relative w-full  md:w-[70%] bg-black py-4 border-2 border-black"></div>
      </div>

      <div className=" fixed h-full w-screen  bg-black/80 z-[9999] backdrop:blur-sm top-0 left-0">
        <section className="pt-[15vh] text-black bg-white flex-col absolute right-0 top-0 h-screen p-8 gap-8 z-50  w-[30%] flex ">
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
              {/* <div className="">
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
              </div> */}

              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm">Select Category</label>
                <select
                  // defaultValue={initialValue}
                  className="w-full border rounded-lg p-2"
                  onChange={(e) => {
                    const selectedCategory = categories.find(
                      (category) => category._id === e.target.value
                    );

                    setSelectedCategory(selectedCategory);
                  }}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="bg-black text-white w-full h-10 rounded-full mt-4"
                onClick={requestJoin}
              >
                Join
              </button>

              {message.status && (
                <p className="mt-4 text-center text-sm">{message.text}</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default LiveRoom;
