import React, { useState, useEffect } from "react";
import Image from "next/image";

const ReviewForm = ({ addReview, categoryData }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [sidebarContent, setSidebarContent] = useState(null);
  const [dynamicRatings, setDynamicRatings] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  

  useEffect(() => {
    if (categoryData) {
      setDynamicRatings(
        categoryData.availableRatingTypes.map((ratingType) => ({
          id: ratingType.id,
          name: ratingType.name,
          value: 0,
        }))
      );
    }
  }, [categoryData]);

  useEffect(() => {
    const totalDynamicRatings = dynamicRatings.reduce((acc, rating) => acc + rating.value, 0);
    const averageRating = dynamicRatings.length > 0 ? totalDynamicRatings / dynamicRatings.length : 0;
    setOverallRating(Math.floor(averageRating));
  }, [dynamicRatings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      rating: overallRating,
      comment: comment,
      images: images,
      dynamicRatings: dynamicRatings,
    };
    addReview(newReview);
    setRating(0);
    setComment("");
    setImages([]);
    setSidebarContent(null);
    document.body.classList.remove("no-scroll");
    document.querySelectorAll("input[type=file]").forEach((input) => (input.value = ""));
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length + images.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
    const newImages = selectedFiles.filter((selectedFile) =>
      images.every((image) => image.name !== selectedFile.name)
    );
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRatingChange = (index, value) => {
    setDynamicRatings((prevRatings) =>
      prevRatings.map((prevRating, i) =>
        i === index ? { ...prevRating, value: value } : prevRating
      )
    );
  };

  return (
    <div className="my-8">
      <button
        onClick={() => {
          setSidebarContent("addReview");
        }}
        className="font-semibold py-2 px-4 rounded-full border hover:bg-zinc-100"
      >
        Add Review
      </button>

      {sidebarContent === "addReview" && (
        <div className="fixed z-[99999] h-full w-screen bg-black/50 backdrop-blur-sm top-0 left-0">
          <section className="text-black bg-white flex-col absolute right-0 top-0 h-full z-[99999] w-full lg:w-[35%] flex overflow-y-auto">
            <div className="flex flex-col">
              <div className="px-[25px] pb-[32px]">
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
                    <div>
                      <div className="grid grid-cols-2 gap-4">
                        {dynamicRatings.map((ratingType, index) => (
                          <div key={index} className="mb-4">
                            <label className="block font-bold mb-2">
                              {ratingType.name}
                            </label>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() =>
                                    handleRatingChange(index, i + 1)
                                  }
                                  className={`w-8 h-[4px] mr-1 focus:outline-none ${i < ratingType.value ? "bg-black" : "bg-gray-300"
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mb-4">
                        <label htmlFor="rating" className="block font-bold mb-2">
                          Overall Rating
                        </label>
                        <input
                          type="number"
                          id="rating"
                          min="1"
                          max="5"
                          className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                          value={overallRating}
                          onChange={(e) => setOverallRating(Number(e.target.value))}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="comment" className="block font-bold mb-2">
                          Comment
                        </label>
                        <textarea
                          id="comment"
                          rows="4"
                          className="resize-none appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          required
                        ></textarea>
                      </div>

                      <label htmlFor="images" className="block font-bold mb-2">
                        Upload Images
                      </label>
                      <label
                        htmlFor="imageUpload"
                        className="w-full cursor-pointer bg-white border border-black rounded-lg flex items-center justify-center px-3 py-1 h-12"
                      >
                        Upload Image(s)
                        <input
                          id="imageUpload"
                          type="file"
                          multiple
                          accept=".jpg, .jpeg, .png"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>

                      <div className="grid grid-cols-5 gap-x-5 mt-4">
                        {images.map((image, index) => (
                          <div className="mb-4 relative" key={index}>
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-auto"
                            />
                            <button
                              type="button"
                              className="absolute top-0 right-0 bg-white rounded-full w-5 h-5 flex items-center justify-center"
                              onClick={() => handleImageRemove(index)}
                            >
                              <Image
                                loading="lazy"
                                src="/icons/closeicon.svg"
                                alt="close"
                                width={15}
                                height={15}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-black hover:bg-grey-900 text-white font-bold py-2 px-4 rounded-full h-9"
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
