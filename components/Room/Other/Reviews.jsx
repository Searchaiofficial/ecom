import React, { useEffect, useState } from "react";
import "../styles.css";
import Carous from "@/components/Carousel/Carous";
import Image from "next/image";
import axios from "axios";
import ReviewForm from "../../../app/(with-header)/profile/ReviewForm";
import Link from "next/link";
import {
  createApiEndpoint,
  getCategoryByName,
} from "@/components/Features/api";

// const ratingsData = [
//   {
//     label: "Overall rating",
//     value: (
//       <div className="-ml-3 mt-3">
//         {[1, 2, 3, 4, 5].map((number, index) => (
//           <div
//             key={index}
//             className={`border mb-2 ${index === 0 ? "border-black bg-black" : "bg-gray-300"
//               }  w-32 h-1.5 flex flex-row items-center justify-start`}
//           >
//             <span className="-ml-3 text-sm">{number}</span>
//           </div>
//         ))}
//       </div>
//     ),
//     icon: null,
//   },
//   {
//     label: "Accuracy",
//     value: "5.0",
//     icon: (
//       <Image
//         loading="lazy"
//         src="/icons/checkmark-icon.svg"
//         width={36}
//         height={36}
//         alt="accuracy"
//         className="mt-5"
//       />
//     ),
//   },
//   {
//     label: "Communication",
//     value: "4.9",
//     icon: (
//       <Image
//         loading="lazy"
//         src="/icons/message-icon.svg"
//         width={36}
//         height={36}
//         alt="communication"
//         className="mt-5"
//       />
//     ),
//   },
//   {
//     label: "Location",
//     value: "4.0",
//     icon: (
//       <Image
//         loading="lazy"
//         src="/icons/location-pin-icon.svg"
//         width={36}
//         height={36}
//         alt="map"
//         className="mt-5"
//       />
//     ),
//   },
//   {
//     label: "Value",
//     value: "5.0",
//     icon: (
//       <Image
//         loading="lazy"
//         src="/icons/price-tag-icon.svg"
//         width={36}
//         height={36}
//         alt="value"
//         className="mt-5"
//       />
//     ),
//   },
//   {
//     label: "waterprof",
//     value: "5.0",
//     icon: (
//       <Image
//         loading="lazy"
//         src="/icons/price-tag-icon.svg"
//         width={36}
//         height={36}
//         alt="value"
//         className="mt-5"
//       />
//     ),
//   },
// ];

const Reviews = ({ productId, data }) => {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReview, setIsReview] = useState(false);

  const [categoryData, setCategoryData] = useState(null);
  const [showRatingTypes, setShowRatingTypes] = useState(null);
  const [averageRatings, setAverageRatings] = useState({});


  useEffect(() => {
    const fetchCategoryRatingTypes = async () => {
      try {
        if (data && data.category) {
          const category = await getCategoryByName(data.category);
          setCategoryData(category);
          setShowRatingTypes(category.availableRatingTypes)
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategoryRatingTypes();
  }, [data.category]);


  console.log(data._id);
  console.log("Reviews data", data);
  console.log("ratings  data", showRatingTypes);
  console.log("category  data", reviews);

  useEffect(() => {
    const computeAverageRatings = () => {
      const avgRatings = {};

      if (reviews.length > 0 && showRatingTypes) {
        showRatingTypes.forEach((type) => {
          const ratingsForType = reviews.map((review) => {
            const dynamicRating = review.dynamicRatings.find(
              (r) => r.name === type.name
            );
            return dynamicRating ? Number(dynamicRating.value) : 0;
          });
          const sum = ratingsForType.reduce((acc, rating) => acc + rating, 0);
          const avg = sum / ratingsForType.length || 0; // Handle division by zero

          avgRatings[type._id] = avg.toFixed(1); // Store the average with one decimal place
        });
      }

      setAverageRatings(avgRatings);
    };

    computeAverageRatings();
  }, [reviews, showRatingTypes]);


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
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("name", user.displayName);
    formData.append("userEmail", user.email);
    formData.append("userId", user._id);
    formData.append("rating", newReview.rating);
    formData.append("comment", newReview.comment);
    formData.append("profilePic", user.image);
    newReview.images.forEach((image) => {
      formData.append("image", image);
    });

    // Append dynamicRatings to FormData
    newReview.dynamicRatings?.forEach((rating, index) => {
      formData.append(`dynamicRatings[${index}][name]`, rating.name);
      formData.append(`dynamicRatings[${index}][value]`, rating.value);
    });

    if (isAuthenticated) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/createReview`,
          formData
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
      <div className="pb-12 sm:w-auto w-[80vw] overflow-x-hidden">
        {(data.productType === "special" ||
          data.productType === "requested") && (
            <div>
              <div className="flex flex-col justify-center mx-auto">
                {data.productType === "requested" && (
                  <div className="flex items-center justify-center overflow-hidden flex-row ">
                    <img
                      className="h-36 scale-x-[-1]"
                      alt=""
                      src="/icons/amf/rightGold.svg"
                    />
                    <div className="text-[6rem] font-bold text-[#bf9b30] pb-5">
                      5.0
                    </div>
                    <img
                      className="h-36 "
                      alt=""
                      src="/icons/amf/rightGold.svg"
                    />
                  </div>
                )}
                {data.productType === "special" && (
                  <div className="flex items-center justify-center overflow-hidden flex-row ">
                    <img
                      className="h-36 scale-x-[-1]"
                      alt=""
                      src="/icons/amf/rightBlack.svg"
                    />
                    <div className="text-[6rem] font-bold text-gray-700 pb-5">
                      5.0
                    </div>
                    <img
                      className="h-36 "
                      alt=""
                      src="/icons/amf/rightBlack.svg"
                    />
                  </div>
                )}
                <div className="flex justify-center items-center flex-col ">
                  <div className={`text-xl font-bold -mt-5  ${data.productType === "requested" ? "text-[#bf9b30]" : "text-black"}`} >Guest favourite</div>
                  <div className="text-lg text-gray-500">
                    One of the most loved homes on Ayatrio
                    <br />
                    based on ratings, reviews, and reliability
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* <div className="rating-map flex justify-around mt-12 w-full overflow-x-auto">
          {ratingsData.map((item, index) => (
            <div key={index} className={`flex flex-col items-center text-center flex-grow px-4 ${ratingsData.length - 1 !== index ? 'border-r' : ''}`}>
              <div className="font-semibold text-gray-700 mb-2">{item.label}</div>
              <div className="text-lg font-semibold text-gray-900">{item.value}</div>
              <div>{item.icon}</div>
            </div>
          ))}
        </div> */}

        <div className="rating-map flex justify-around mt-2 w-full overflow-x-auto">

          <div className="flex flex-col items-center pr-4 border-r ">
            <div className="font-semibold text-gray-700 mb-2 capitalize">overall ratings</div>
            <div className="ml-4 mt-3">
              {[1, 2, 3, 4, 5].map((number, index) => (
                <div
                  key={index}
                  className={`border mb-2 ${index === 0 ? "border-black bg-black" : "bg-gray-300"
                    }  w-32 h-1.5 flex flex-row items-center justify-start`}
                >
                  <span className="-ml-3 text-sm">{number}</span>
                </div>
              ))}
            </div>

          </div>

          {showRatingTypes && showRatingTypes.map((item, index) => (
            <div key={item._id} className={`flex flex-col items-center text-center flex-grow px-4 ${showRatingTypes.length - 1 !== index ? 'border-r' : ''}`}>
              <div className="font-semibold text-gray-700 mb-2 capitalize">{item.name}</div>
              <div className="text-lg font-semibold text-gray-900 my-2">{averageRatings[item._id]}</div>
              <Image
                src={`${item.image}`}
                alt={`${item.name}`}
                width={30}
                height={30}
                loading="lazy"
              />
            </div>
          ))}
        </div>


        <div className="flex justify-between items-baseline pt-4">
          <h3 className="mb-1 text-xl font-semibold ">
            {reviews.length}
            <span> reviews</span>
          </h3>
          <>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              !isReview ? (
                <ReviewForm addReview={addReview} categoryData={categoryData} />
              ) : (
                <div>
                  {/* This section can be used for further review-related content */}
                </div>
              )
            )}
          </>
        </div>
        <span className="font-normal text-sm text-gray-500">
          Average rating will appear after 3 reviews
        </span>
        <div
          className="reviews-container mt-6 grid sm:grid-cols-2 grids-col-1  gap-4 mx-auto "
          style={{ overflowX: "hidden" }}
        >
          {reviews.map((review, index) => (
            <div key={index} className="sm:mr-12 mb-8 m-0 sm:block ">
              <div className="flex justify-between">
                <Link className="review-header flex items-center" href={`/profile/${review?.userId}`}>
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


        {/* <Carous data={data} /> */}
      </div>
    </>
  );
};
export default Reviews;
