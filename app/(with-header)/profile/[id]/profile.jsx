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

  const handleLogout = () => {
    localStorage?.removeItem("token");
    window?.open(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
      "_self"
    );
  };

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 pt-20">
      {user ? (
        <>
          <div className="flex flex-col items-center w-full mt-10">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
              <Image
                src={user.image}
                alt="profile"
                layout="fill"
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="mt-4 text-2xl sm:text-3xl font-semibold">
              {user.displayName}
            </h1>
            <h2 className="text-gray-600">{user.email}</h2>
            <h3 className="text-slate-400">
              {user?.isLiveStreamHost && "Liveroom Host"}
            </h3>
            {isAuthenticated && isCurrentUser && (
              <div className="flex justify-center w-full mt-4 gap-2">
                <button
                  className="bg-blue-500 text-white px-4 text-sm py-2 rounded-full"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 text-sm py-2 rounded-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {user.authorDetails && user.authorDetails.author && (
            <div className="mt-8 flex flex-col items-center w-full">
              <h2 className="text-xl text-red-500 font-bold">Author</h2>
              <p className="text-gray-600 text-center">
                {user.authorDetails.author.description}
              </p>
              <div className="mt-4 w-full max-w-2xl">
                <div className="mt-2 flex gap-2 ">
                  <span className="font-semibold">Experience:</span>
                  <span className="text-gray-600 ">
                    {user.authorDetails.author.experience} year of experience
                  </span>
                </div>
                <div className="mt-2 flex gap-2 ">
                  <span className="font-semibold">Rating:</span>
                  <span className="text-gray-600 ">
                    {user.authorDetails.author.rating}
                  </span>
                </div>
                <div className="mt-2 flex gap-2 ">
                  <span className="font-semibold">Purchases:</span>
                  <span className="text-gray-600 ">
                    {user.authorDetails.author.purchase}
                  </span>
                </div>
                <div className="mt-2 flex gap-2 ">
                  <span className="font-semibold">Awards:</span>
                  <span className="text-gray-600 ">
                    {user.authorDetails.author.awards.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          )}

          {user.authorDetails &&
            user.authorDetails.author &&
            authorProduct &&
            authorProduct.length > 0 && (
              <div className="mt-8 w-full">
                <h2 className="text-xl text-center font-bold">
                  Products by Author
                </h2>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {authorProduct.map((product) => (
                    <BlogRelatedProducts
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              </div>
            )}
        </>
      ) : (
        <div className="flex justify-center items-center h-screen text-2xl">
          User not found
        </div>
      )}
    </div>
  );
};

export default Profile;
