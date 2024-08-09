"use client";
import axios from "axios";
import { useState } from "react";

const page = () => {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
  });

  const handleCreateCustomer = async () => {
    console.log(user);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/create-user`,
        user
      );
      window.alert(response.data.message);
      console.log(response.data);
      setUser({ displayName: "", email: "" });
    } catch (error) {
      window.alert(error.response.data.message);
      console.error("Error creating customer:", error);
    }
  };

  return (
    <div className="md:mt-36 mt-10 h-screen">
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md ">
          <div className="flex flex-col items-center w-full gap-4">
            <h1 className="text-2xl font-bold">Create Customer</h1>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm font-bold" htmlFor="displayName">
                Name
              </label>
              <input
                id="displayName"
                type="text"
                value={user.displayName}
                onChange={(e) =>
                  setUser({ ...user, displayName: e.target.value })
                }
                className="border border-gray-300 rounded p-1"
                placeholder="Enter name"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm font-bold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="border border-gray-300 rounded p-1"
                placeholder="Enter email"
              />
            </div>
          </div>
          <button
            onClick={handleCreateCustomer}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Create Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
