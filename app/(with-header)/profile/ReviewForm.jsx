"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const ReviewForm = ({ addReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [sidebarContent, setSidebarContent] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      rating: rating,
      comment: comment,
      images: images,
    };
    addReview(newReview);
    setRating(0);
    setComment("");
    setImages([]);
    setSidebarContent(null);
    document.body.classList.remove("no-scroll");
    // Reset the file input fields
    document.querySelectorAll("input[type=file]").forEach(input => (input.value = ""));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  useEffect(() => {
    if (sidebarContent) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [sidebarContent]);

  return (
    <div className="my-8">
      <button
        onClick={() => setSidebarContent("addReview")}
        className=" font-semibold py-2 px-4 rounded-full border hover:bg-zinc-100"
      >
        Add Review
      </button>

      {sidebarContent === "addReview" && (
        <div className="fixed z-[99999] h-full w-screen bg-black/50 backdrop-blur-sm top-0 left-0">
          <section className="text-black bg-white flex-col absolute right-0 top-0 h-full z-[99999] w-full lg:w-[35%] flex overflow-y-auto">
            <div className="flex flex-col">
              <div className="px-[40px] pb-[32px]">
                <div>
                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between pt-2 mt-[10px] mb-[10px] h-[72px]">
                      <p className="text-[24px] font-semibold text-[#111111]">
                        Add Your Review
                      </p>
                      <button
                        className="text-xl px-3 py-1 hover:bg-[#e5e5e5] rounded-full cursor-pointer"
                        onClick={() => setSidebarContent(null)}
                      >
                        <Image
                          loading="lazy"
                          src="/icons/closeicon.svg"
                          alt="close"
                          width={20}
                          height={30}
                          className="py-2"
                        />
                      </button>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-x-5">
                      {[...Array(4)].map((_, index) => (
                        <div className="mb-4" key={index}>
                          <label
                            htmlFor={`image${index}`}
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Image {index + 1}
                          </label>
                          <input
                            type="file"
                            id={`image${index}`}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleImageChange}
                          />
                        </div>
                      ))}
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
                        onChange={(e) => setRating(Number(e.target.value))}
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
                      className="bg-black hover:bg-grey-900 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
