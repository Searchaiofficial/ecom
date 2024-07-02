"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewForm = ({ addReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    console.log(images);
    e.preventDefault();
    const newReview = {
      rating: rating,
      comment: comment,
      images: images
    };
    addReview(newReview);
    setRating(0);
    setComment("");
  };

  const handleImageChange = (e) => {
    
    const files = e.target.files;
    console.log(files)
    setImages((prevImages) => [...prevImages, files[0]]);
  };

  console.log(images)

  return (
    <div className="my-8">
      <form onSubmit={handleSubmit}>
        <input type="hidden" id="name" />
        <input type="hidden" id="image" />
        <div className="grid grid-cols-2 gap-x-5">
        <div className="mb-4">
            <label
              htmlFor="image1"
              className="block text-gray-700 font-bold mb-2"
            >
              Image 1
            </label>
            <input
              type="file"
              id="image1"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleImageChange}
              // required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image1"
              className="block text-gray-700 font-bold mb-2"
            >
              Image 2
            </label>
            <input
              type="file"
              id="image1"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleImageChange}
              // required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image1"
              className="block text-gray-700 font-bold mb-2"
            >
              Image 3
            </label>
            <input
              type="file"
              id="image1"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleImageChange}
              // required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image1"
              className="block text-gray-700 font-bold mb-2"
            >
              Image 4
            </label>
            <input
              type="file"
              id="image1"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleImageChange}
              // required
            />
          </div>
        </div>
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
