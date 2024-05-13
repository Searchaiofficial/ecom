"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewForm = ({ addReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  //   useEffect(() => {
  //     // Prefill the rating state with a default value if needed
  //     setRating(0);
  //   }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      rating: rating,
      comment: comment,
    };
    addReview(newReview);
    setRating(0);
    setComment("");
  };

  return (
    <div className="my-8">
      <form onSubmit={handleSubmit}>
        <input type="hidden" id="name" />
        <input type="hidden" id="image" />
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-gray-700 font-bold mb-2"
          >
            Rating
          </label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-gray-700 font-bold mb-2"
          >
            Comment
          </label>
          <textarea
            id="comment"
            rows="4"
            className="resize-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
