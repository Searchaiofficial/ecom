"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/Cards/card";

const Profile = ({ id }) => {
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [reviews, setReviews] = useState([]);
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

  const fetchAllReviewByUserId = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchAllReviewByUserId/${userId}`
      );
      console.log("review data", response.data);
      setReviews(response.data);
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
    if (user) {
      fetchAllReviewByUserId(user._id);
    }
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
    <div className="flex flex-col items-start w-full px-4 sm:px-6 lg:px-8 pt-5 sm:pt-20">
      {user ? (
        <>
          <div className="flex items-center gap-4 w-full mt-10 pb-8 border-b">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
              <Image
                src={user.image}
                alt="profile"
                layout="fill"
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                {user.displayName}
              </h1>
              <h2 className="text-gray-600">{user.email}</h2>
              <h3 className="text-slate-400">
                {user?.isLiveStreamHost && "Liveroom Host"}
              </h3>
              {isAuthenticated && isCurrentUser && (
                <div className="flex justify-start w-full mt-4 gap-2">
                  <button className="bg-blue-500 text-white px-4 text-sm py-2 rounded-full">
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
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
                  {authorProduct.map((product, idx) => (
                    <Card
                      title={product.productTitle}
                      productImages={product.productImages}
                      specialPrice={product?.specialprice}
                      price={product.perUnitPrice}
                      desc={product.productTitle}
                      shortDescription={product.shortDescription}
                      demandtype={product.demandtype}
                      imgSrc={product.images}
                      rating={product.ratings}
                      key={idx}
                      id={product._id}
                      category={product.category}
                      productId={product.productId}
                      // setPopupVisible={setPopupVisible}
                      cssClass={"card1flex"}
                      // inCart={inCart}
                      totalPrice={product.totalPrice}
                      unitType={product.unitType}
                      productType={product.productType}
                      expectedDelivery={product.expectedDelivery}
                    />
                  ))}
                </div>
              </div>
            )}

          {reviews && reviews.length > 0 && (
            <div className="mt-8 w-full">
              <h2 className="text-2xl  font-bold">Reviews</h2>
              <div
                className="w-full mt-6 grid sm:grid-cols-3 grids-col-1  gap-4 mx-auto "
                style={{ overflowX: "hidden" }}
              >
                {reviews.map((review, index) => (
                  <div key={index} className="sm:mr-12 mb-8 m-0 sm:block ">
                    <div className="flex justify-between">
                      <Link
                        className="review-header flex items-center"
                        href={`/profile/${review?.userId}`}
                      >
                        <div className="w-[48px] h-[48px] mr-4">
                          <img
                            className="w-full h-full rounded-full object-cover"
                            src={review.profilePic}
                            alt="User Avatar"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-[16px]">
                            {review.name}
                          </span>
                          <span className="font-normal text-[14px] text-gray-500">
                            {/* {review.location} */}
                          </span>
                        </div>
                      </Link>
                      {isAuthenticated && user.email === review.userEmail && (
                        <div className="flex items-center">
                          <button onClick={() => handleDelete(review._id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="ratings flex mt-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Image
                          loading="lazy"
                          key={i}
                          src="/icons/full-black.svg"
                          width={15}
                          height={15}
                          alt="star"
                          className="m-[2px]"
                        />
                      ))}
                      <span className="text-sm font-semibold ml-2">
                        {Date(review.createdAt).slice(0, 15)}
                      </span>
                    </div>

                    <div className="review mt-2">
                      <p className="text-gray-600 font-[16px] leading-6  sm:w-auto text-left w-[100%]">
                        {review.showFullComment
                          ? review.comment
                          : `${review.comment.slice(0, 80)}...`}
                        {review.comment.length > 80 && (
                          <button
                            className="underline font-medium cursor-pointer ml-1"
                            onClick={() => toggleShowMore(index)}
                          >
                            {review.showFullComment ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </p>
                    </div>

                    {review.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt="review"
                            className="w-[100px] h-[100px] object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
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
