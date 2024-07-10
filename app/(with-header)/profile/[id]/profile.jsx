"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BlogRelatedProducts from "@/components/Cards/BlogRelatedProducts";

const Profile = ({ id }) => {
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [authorProduct, setAuthorProduct] = useState([]);

  const fetchUerById = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user/${id}`
      );
      console.log("user data", response.data);
      setUser(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchAllProductPyAuthor = async (authorId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllProductByAuthorId/${authorId}`
      );
      console.log("product data", response.data);
      setAuthorProduct(response.data);
    } catch (error) {
      console.log("error", error);
    }
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

      if (data.isAuthenticated) {
        setIsAuthenticated(true);
        setLoggedInUser(data.user);
      } else {
        setIsAuthenticated(false);
        setLoggedInUser(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const storeTokenInLocalStorage = async () => {
    const urlParams = new URLSearchParams(window?.location?.search);
    const token = urlParams.get("token");
    if (token) {
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
      if (data.isAuthenticated) {
        localStorage?.setItem("token", token);
      }
    }
    checkUser();
  };

  useEffect(() => {
    if (user && user.authorDetails && user.authorDetails.author) {
      fetchAllProductPyAuthor(user.authorDetails.author._id);
    }
    if (loggedInUser && user) {
      setIsCurrentUser(loggedInUser._id === user._id);
    }
  }, [user, loggedInUser]);

  useEffect(() => {
    storeTokenInLocalStorage();
    fetchUerById();
  }, []);
  //   if (!user) {
  //     return <div>User Not Found</div>;
  //   }

  // console.log(user);
  const handleLogout = () => {
    localStorage?.removeItem("token");
    window?.open(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
      "_self"
    );
  };

  return (
    <div>
      {user ? (
        <div className="sm:mt-[7rem] w-full px-[20px] sm:px-[50px] lg:px-[67px]">
          {isAuthenticated && isCurrentUser && (
            <div className="flex justify-end w-full gap-2 mb-2">
              <button
                //   onClick={handleUpdateProfile}
                className="bg-blue-500 text-white px-4 text-sm py-2 rounded-md"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 text-sm py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          )}
          <div className="flex flex-col p-4 items-center justify-center ">
            <Image
              src={user.image}
              alt="profile"
              width={100}
              height={100}
              className="rounded-full"
            />
            <h1 className="text-xl ">{user.displayName}</h1>
            <h1 className="text-gray-600">{user.email}</h1>
            <h1 className="text-slate-400">
              {user?.isLiveStreamHost && "Liveroom Host"}
            </h1>

            {user.authorDetails && user.authorDetails.author && (
              <div className="mt-8 flex flex-col items-center justify-center">
                <h1 className="text-xl text-red-500 font-bold">Author</h1>
                <h1 className="text-gray-600">
                  {user.authorDetails.author.description}
                </h1>
                <div className="mt-4">
                  <div className="mt-2 flex gap-2 ">
                    <h1 className=" font-semibold">Experience :</h1>
                    <h1 className="text-gray-600 ">
                      {user.authorDetails.author.experience} year of experience
                    </h1>
                  </div>
                  <div className="mt-2 flex gap-2 ">
                    <h1 className=" font-semibold">Rating :</h1>
                    <h1 className="text-gray-600 ">
                      {user.authorDetails.author.rating}
                    </h1>
                  </div>
                  <div className="mt-2 flex gap-2 ">
                    <h1 className=" font-semibold">Purchases :</h1>
                    <h1 className="text-gray-600 ">
                      {user.authorDetails.author.purchase}
                    </h1>
                  </div>
                  <div className="mt-2 flex gap-2 ">
                    <h1 className=" font-semibold">Awards :</h1>
                    <h1 className="text-gray-600 ">
                      {user.authorDetails.author.awards.join(", ")}
                    </h1>
                  </div>
                </div>
              </div>
            )}
          </div>
          {user.authorDetails &&
            user.authorDetails.author &&
            authorProduct &&
            authorProduct.length > 0 && (
              <div className="mt-8">
                <BlogRelatedProducts
                  relatedProducts={authorProduct}
                  title="Products by Author"
                />
              </div>
            )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen text-2xl">
          User not found
        </div>
      )}
    </div>
  );
};

export default Profile;
