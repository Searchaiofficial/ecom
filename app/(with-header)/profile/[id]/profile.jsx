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
  const [editedUser, setEditedUser] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const [authorProduct, setAuthorProduct] = useState([]);

  const fetchUserById = async () => {
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
    if (user && user.userType === "author") {
      fetchAllProductPyAuthor(user._id);
    }
    if (loggedInUser && user) {
      setIsCurrentUser(loggedInUser._id === user._id);
    }
  }, [user, loggedInUser]);

  useEffect(() => {
    setLoading(true);
    storeTokenInLocalStorage();
    fetchUserById();
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage?.removeItem("token");
    window?.open(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
      "_self"
    );
  };

  const handleUpdateProfile = async () => {
    setUpdateLoading(true);
    const formData = new FormData();
    formData.append("displayName", editedUser.displayName);
    formData.append("image", editedUser.image);
    formData.append("userType", editedUser.userType);
    formData.append(
      "authorDetails[description]",
      editedUser.authorDetails.description
    );
    formData.append(
      "authorDetails[experience]",
      editedUser.authorDetails.experience
    );
    formData.append("authorDetails[award]", editedUser.authorDetails.award);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/update-user/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response.data);
      setUser(response.data.user);
      setEditedUser({});
      setEditProfile(false);
      setUpdateLoading(false);
    } catch (error) {
      console.log("error", error);
      setUpdateLoading(false);
    }
  };

  const [preview, setPreview] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedUser({ ...editedUser, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <div className="flex flex-col items-start w-full px-4 sm:px-6 lg:px-8 pt-5 sm:pt-20">
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
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
              <h1 className="text-xl sm:text-3xl font-semibold">
                {user.displayName}
              </h1>
              <h2 className="text-gray-600 text-xs sm:text-base">{user.email}</h2>
              <h3 className="text-slate-400">
                {user?.isLiveStreamHost && "Liveroom Host"}
              </h3>
              {isAuthenticated && isCurrentUser && (
                <div className="flex justify-start w-full mt-4 gap-2">
                  <button
                    onClick={() => {
                      setEditProfile(true);
                      setEditedUser({
                        displayName: user.displayName,
                        image: user.image,
                        userType: user.userType,
                        authorDetails: user.authorDetails,
                      });
                      setPreview(user.image);
                    }}
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
          </div>

          {editProfile && (
            <div className="mt-8 w-full max-w-md m-auto shadow-md p-4">
              <h2 className="text-2xl  font-bold">Edit Profile</h2>
              <div className="mt-6 w-full">
                <div className="flex flex-col">
                  <label
                    htmlFor="displayName"
                    className="text-lg font-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
                    value={editedUser.displayName}
                    disabled={updateLoading}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        displayName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="image" className="text-lg font-semibold">
                    Profile Image
                  </label>

                  <div className="flex items-center gap-4 mt-2">
                    <div className="relative w-16 h-16">
                      <Image
                        src={preview}
                        alt="profile"
                        layout="fill"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <label
                      htmlFor="image"
                      className="font-medium cursor-pointer"
                    >
                      Change
                    </label>
                    <input
                      type="file"
                      id="image"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={updateLoading}
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="userType" className="text-lg font-semibold">
                    User Type
                  </label>
                  <select
                    id="userType"
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
                    value={editedUser.userType}
                    disabled={updateLoading}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, userType: e.target.value })
                    }
                  >
                    <option value="user">User</option>
                    <option value="author">Author</option>
                  </select>
                </div>
                {editedUser.userType === "author" && (
                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="description"
                      className="text-lg font-semibold"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
                      value={editedUser.authorDetails?.description}
                      disabled={updateLoading}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          authorDetails: {
                            ...editedUser.authorDetails,
                            description: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                )}
                {editedUser.userType === "author" && (
                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="experience"
                      className="text-lg font-semibold"
                    >
                      Experience
                    </label>
                    <input
                      type="text"
                      id="experience"
                      className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
                      value={editedUser.authorDetails?.experience}
                      disabled={updateLoading}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          authorDetails: {
                            ...editedUser.authorDetails,
                            experience: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                )}
                {editedUser.userType === "author" && (
                  <div className="flex flex-col mt-4">
                    <label htmlFor="award" className="text-lg font-semibold">
                      Awards
                    </label>
                    <input
                      type="text"
                      id="award"
                      className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
                      value={editedUser.authorDetails?.award}
                      disabled={updateLoading}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          authorDetails: {
                            ...editedUser.authorDetails,
                            award: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                )}
                <div className="flex justify-end w-full mt-4 gap-2">
                  <button
                    onClick={() => {
                      setEditedUser({});
                      setUpdateLoading(false);
                      setEditProfile(false);
                    }}
                    disabled={updateLoading}
                    className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md disabled:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    disabled={updateLoading}
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md disabled:bg-gray-400"
                  >
                    {updateLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {user.userType === "author" && user.authorDetails && (
            <div className="mt-8 flex flex-col items-center w-full">
              <h2 className="text-xl text-red-500 font-bold">Author</h2>
              <p className="text-gray-600 text-center">
                {user.authorDetails?.description}
              </p>
              <div className="mt-4 w-full max-w-2xl">
                {user.authorDetails?.experience && (
                  <div className="mt-2 flex gap-2 ">
                    <span className="font-semibold">Experience:</span>
                    <span className="text-gray-600 ">
                      {user.authorDetails?.experience} year of experience
                    </span>
                  </div>
                )}
                {user.authorDetails?.award && (
                  <div className="mt-2 flex gap-2 ">
                    <span className="font-semibold">Award:</span>
                    <span className="text-gray-600 ">
                      {user.authorDetails?.award}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {user.userType === "author" &&
            user.authorDetails &&
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
                    </div>
                    <div className="ratings flex mt-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Image
                          loading="lazy"
                          key={i}
                          src="/icons/star-full-black.svg"
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
