import React from "react";

const Products = ({ filteredProductData,heading }) => {
  // console.log("Filtered products:", filteredProducts);

  // Use the first product's category as the main heading
  const mainCategory = filteredProductData.length > 0 ? filteredProductData[0].category : "Products";

  return (
    <div className="relative top-20 sm:px-[50px] px-[20px] ">
      {/* main heading of pdt */}
      <h1 className="text-3xl font-bold mb-10">{heading}</h1>
      {/* img of product using flex and a fix width */}
      <div className="flex flex-row gap-3 sm:w-[65vw] sm:overflow-x-hidden overflow-x-auto mb-16">
        {filteredProductData.map((product, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            {/* Assuming the first image from the images array is used */}
            <img
              className="sm:min-w-[120px] sm:h-[70px] min-w-[120px] h-[70px]"
              src={product.images[0]}
              alt={product.productTitle}
            />
            <p>{product.productTitle}</p>
          </div>
        ))}
      </div>

      {/* relevant text */}
      <p className="sm:w-[50vw] w-[100%] text-base text-justify">
        Waking up to harsh sunlight can put your mornings to an unpleasant
        start. And more than that, uncovered windows also take away your privacy.
        Curtains and blinds keep your home secured, and at the same time,
        regulate the amount of light inside it. From Ayatrio’s wide range of
        curtains, there's a design for every individual taste. Smooth fabrics,
        unconventional patterns, and diverse colours make this collection truly
        unique. Apart from being stylish, these curtains also have excellent
        light blocking features that keep your interiors cool and safe.
      </p>
    </div>
  );
};

export default Products;
