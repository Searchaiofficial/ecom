import React from "react";
import Link from "next/link";

const Card = ({ category, products, colors }) => {
  return (
    <div className="swiper-slide">
      <div className="overflow-hidden w-full md:w-74 m-2 border">
        <div
          className={`px-4 py-5 text-white flex justify-between items-center`}
          style={{ backgroundColor: colors.header }}
        >
          <div>
            <h2 className="text-sm">Bestseller</h2>
            <Link href={`/${category}/category/all`}>
              <h2 className="text-xl font-semibold">{category}</h2>
            </Link>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 18l6-6-6-6"
              />
            </svg>
          </div>
        </div>
        <div className="p-4">
          {products.map((item, index) => (
            <div key={index} className="flex items-center mb-4 py-2 gap-4">
              <div
                className="text-2xl font-bold  text-center max-w-4 w-full"
                style={{
                  color:
                    index === 0
                      ? "gold"
                      : index === 1
                      ? "silver"
                      : index === 2
                      ? "bronze"
                      : "inherit",
                }}
              >
                {index + 1}
              </div>
              <Link href={`/${item.productTitle.replace(/ /g, "-")}`}>
                <img
                  src={item.images[0]}
                  alt={item.productTitle}
                  className="w-12 h-12 object-cover"
                />
              </Link>
              <div className="flex-grow">
                <Link
                  href={`/${item.productTitle.replace(/ /g, "-")}`}
                  className="text-lg font-medium"
                >
                  {item.productTitle}
                </Link>
                <div className="text-gray-600">
                  Rs.{" "}
                  {item.specialprice?.price ||
                    item.discountedprice?.price ||
                    item.perUnitPrice}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
