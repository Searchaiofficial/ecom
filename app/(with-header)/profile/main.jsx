"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ReviewForm from "./ReviewForm";

const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(window?.location?.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);

  let router = useRouter();

  const handleHomeClick = () => {
    router.push("/home");
  };

  const handleLogout = () => {
    localStorage?.removeItem("token");
    window?.open(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout", "_self"`
    );
  };

  const handleUpdateProfile = () => {
    setEditProfile(true);
  };

  const checkUser = async () => {
    try {
      const token = localStorage?.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log("user data", response.data);

      if (data.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(data.user);
        // Set the initial values for editing
        setNewName(data.user.displayName);
        setNewEmail(data.user.email);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Set loading state to false after the request completes
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleCancelUpdate = () => {
    setEditProfile(false);
    setNewName(user.displayName);
    setNewEmail(user.email);
  };

  const token = localStorage?.getItem("token");
  const handleUserUpdate = async () => {
    setEditProfile(false);

    const updatedProfile = {
      displayName: newName,
      email: newEmail,
      photoURL: user.image,
    };

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/update-profile`,
        updatedProfile,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleAccountDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/delete-profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      const data = response.data;
    } catch (error) {
      console.error("Error deleting user profile:", error);
    }
  };

  // loader
  //loader
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <h1>UnAutherized</h1>;
  }

  console.log("Token:", token);
  console.log("User:", user);

  // console.log(user);

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div
          className="nav absolute z-10 left-[1%] top-[0.1%] text-[2.5rem]"
          onClick={handleHomeClick}
        >
          <div className="back">
            {/* <Home /> */}
            {/* <img src={""} className="w-6 h-6" alt="" /> */}
            <h1>I am Home</h1>
          </div>
        </div>
        <div
          className="nav absolute z-10 right-[2.5%] top-[1%] "
          onClick={handleLogout}
        >
          <div className="back">
            <div className="font-semibold text-center text-white bg-red-600 rounded-lg shadow-xl cursor-pointer w-14 h-7 ">
              LogOut
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 py-4 overflow-hidden bg-white rounded-lg shadow-2xl">
          <div className="flex justify-around w-full my-4 items-right ">
            <div className="flex">
              {editProfile ? (
                <div className="text-right">
                  <button className="text-red-500" onClick={handleCancelUpdate}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="text-right align-right">
                  <button
                    className="text-sm text-green"
                    onClick={handleUpdateProfile}
                  >
                    {" "}
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-between hover:cursor-pointer">
              <button
                className="w-6 h-3 p-2 bg-red-500 rounded-lg"
                onClick={handleAccountDelete}
              >
                Delete
              </button>
            </div>
          </div>
          <img
            className="object-cover w-48 h-48 rounded-full s"
            src={user.image}
            alt="Profile"
          />
          <div className="flex flex-col p-6">
            <input
              className="mb-4 text-xl font-semibold text-center"
              type="text"
              value={newName}
              readOnly={!editProfile}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="email"
              className="text-center text-gray-600"
              value={newEmail}
              readOnly={!editProfile}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          {editProfile && (
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={handleUserUpdate}
            >
              Update Profile
            </button>
          )}
        </div>
        <div>
          <button onClick={handleHomeClick}>Home</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
