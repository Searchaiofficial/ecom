import React, { useEffect, useState } from "react";
import "../styles.css";
import Carous from "@/components/Carousel/Carous";
import Image from "next/image";
import axios from "axios";
import ReviewForm from "../../../app/(with-header)/profile/ReviewForm";

const ratingsData = [
  {
    label: "Overall rating",
    value: (
      <div className="-ml-3 mt-3">
        {[5, 4, 3, 2, 1].map((number, index) => (
          <div
            key={index}
            className={`border mb-2 ${index === 0 ? "border-black bg-black" : "bg-gray-300"
              } rounded-full w-32 h-1.5 flex flex-row items-center ml-4 justify-start`}
          >
            <span className="-ml-3">{number}</span>
          </div>
        ))}
      </div>
    ),
    icon: null,
  },
  {
    label: "Accuracy",
    value: "5.0",
    icon: (
      <Image
        src="/rooms/checkmark-icon.svg"
        width={36}
        height={36}
        alt="accuracy"
        className="mt-5"
      />
    ),
  },
  {
    label: "Communication",
    value: "4.9",
    icon: (
      <Image
        src="/rooms/message-icon.svg"
        width={36}
        height={36}
        alt="communication"
        className="mt-5"
      />
    ),
  },
  {
    label: "Location",
    value: "4.0",
    icon: (
      <Image
        src="/rooms/map-location-icon.svg"
        width={36}
        height={36}
        alt="map"
        className="mt-5"
      />
    ),
  },
  {
    label: "Value",
    value: "5.0",
    icon: (
      <Image
        src="/rooms/price-tag-icon.svg"
        width={36}
        height={36}
        alt="value"
        className="mt-5"
      />
    ),
  },
];

const Reviews = ({ productId, data }) => {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReview, setIsReview] = useState(false);

  console.log(data._id);
  console.log("Reviews data", data)

  const handleReview = () => {
    setIsReview(!isReview);
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

      const userData = response.data;
      if (userData.isAuthenticated) {
        console.log("user data", userData);
        setUser(userData.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  console.log(productId);
  // const fetchReviews = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getReview?productId=${productId}`
  //     );
  //     console.log("reviews", response.data);

  //     setReviews(response.data);
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //   }
  // };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getReview?productId=${productId}`
      );
      console.log("reviews", response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
        setReviews(response.data);
      } else {
        console.error("Empty or invalid response data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const addReview = async (newReview) => {
    if (isAuthenticated) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/createReview`,
          {
            productId: productId,
            name: user.displayName,
            userEmail: user.email,
            rating: newReview.rating,
            comment: newReview.comment,
            image: user.image,
          }
        );
        console.log(response.data);
        fetchReviews();
        // Add any necessary logic after successful submission
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    } else {
      alert("Login first");
    }
  };

  const handleDelete = async (id) => {
    if (isAuthenticated) {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deleteReview/${id}`
        );
        console.log(response);
        fetchReviews();
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  const toggleShowMore = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].showFullComment =
      !updatedReviews[index].showFullComment;
    setReviews(updatedReviews);
  };

  return (
    <>
      <div className="py-12 sm:w-auto w-[90vw]  overflow-x-hidden">
        {
          data.demandtype === "Ayatrio Member Favorite" && (
            <div>
              <div className="flex flex-col justify-center mx-auto">
                <div className="flex items-center justify-center overflow-hidden flex-row ">
                  <img
                    src="https://a0.muscache.com/pictures/ec500a26-609d-440f-b5d0-9e5f92afd478.jpg"
                    className="h-28"
                    alt=""
                    data-original-uri="https://a0.muscache.com/pictures/ec500a26-609d-440f-b5d0-9e5f92afd478.jpg"
                  />
                  <div className="text-[6rem] font-bold text-gray-700 pb-5">
                    5.0
                  </div>
                  <img
                    className="h-28"
                    alt=""
                    src="https://a0.muscache.com/pictures/65bb2a6c-0bdf-42fc-8e1c-38cec04b2fa5.jpg"
                    data-original-uri="https://a0.muscache.com/pictures/65bb2a6c-0bdf-42fc-8e1c-38cec04b2fa5.jpg"
                  />
                </div>
                <div className="flex justify-center items-center flex-col ">
                  <div className="text-xl font-bold -mt-5">Guest favourite</div>
                  <div className="text-lg text-gray-500">
                    One of the most loved homes on Airbnb
                    <br />
                    based on ratings, reviews, and reliability
                  </div>
                </div>
              </div>
              <div className="rating-map flex flex-row justify-between mt-12 sm:w-auto w-[90vw] overflow-x-auto">
                {ratingsData.map((item, index) => (
                  <div
                    key={index}
                    className={` basis-1/7 flex pr-6 ${index < ratingsData.length - 1
                      ? "border-r border-gray-400 h-32 "
                      : ""
                      }flex-col pl-6`}
                  >
                    {item.label}
                    <div>{item.value}</div>
                    <div>{item.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        }

        <br />

        <h3 className="mb-1 text-xl font-semibold pt-4">
          {reviews.length}
          <span> reviews</span>
        </h3>
        <span className="font-normal text-sm text-gray-500">
          Average rating will appear after 3 reviews
        </span>
        <div
          className="reviews-container mt-6 grid sm:grid-cols-2 grids-col-1 grid-rows-2 gap-4 mx-auto "
          style={{ overflowX: "hidden" }}
        >
          {reviews.map((review, index) => (
            <div key={index} className="sm:mr-12 m-0 sm:block ">
              <div className="flex justify-between">
                <div className="review-header flex items-center">
                  <div className="w-[48px] h-[48px] mr-4">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={review.image}
                      alt="User Avatar"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[16px]">
                      {review.name}
                    </span>
                    <span className="font-normal text-[14px] text-gray-500">
                      {review.location}
                    </span>
                  </div>
                </div>
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
                    key={i}
                    src="/icon/star.svg"
                    width={15}
                    height={15}
                    alt="star"
                  />
                ))}
                <span className="text-sm font-semibold ml-2">
                  {review.date}
                </span>
              </div>

              <div className="review mt-2">
                <p className="text-gray-600 font-[16px] leading-6 mb-6 sm:w-auto text-left w-[100%]">
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
            </div>
          ))}
        </div>
        {isLoading ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          <>
            {!isReview ? (
              <>
                <button onClick={() => handleReview()}>
                  <h2 className="text-xl font-bold mb-4">Add Review</h2>
                </button>
              </>
            ) : (
              <>
                <div>
                  <div className="w-full">
                    <button
                      className="text-lg flex justify-end font-bold mb-4"
                      onClick={() => handleReview()}
                    >
                      Close
                    </button>
                  </div>
                  <ReviewForm addReview={addReview} />
                </div>
              </>
            )}
          </>
        )}
        <Carous data={data} />
      </div>
    </>
  );
};
export default Reviews;
