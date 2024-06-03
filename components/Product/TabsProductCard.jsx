import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import "./styles.css";
import axios from "axios";

function TabsProductCard(props) {
  const [slide, setSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();

  const [reviews, setReviews] = useState([]);
  const [stars, setStars] = useState([]);

  const fetchReviews = async () => {
    try {
      console.log("props.id", props.id);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getReview?productId=${props.id}`
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

  function renderStars(averageRating) {
    const maxStars = 5;
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = maxStars - fullStars - halfStar;

    const starsArray = [];
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(
        <img
          key={i}
          src={"/icon/star.svg"}
          height={20}
          width={20}
          alt="star"
          className="h-[1em] w-[1em] hover:text-gray-600"
        />
      );
    }

    if (halfStar === 1) {
      starsArray.push(
        <img
          key={fullStars}
          src={"/icon/half-star.svg"}
          height={20}
          width={20}
          alt="half-star"
          className="h-[1em] w-[1em] hover:text-gray-600"
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      starsArray.push(
        <img
          key={fullStars + halfStar + i}
          src={"/ayatrio icon/no fill star.svg"}
          height={20}
          width={20}
          alt="empty-star"
          className="h-[0.85em] w-[0.85em] hover:text-gray-600"
        />
      );
    }

    return starsArray;
  }

  useEffect(() => {
    fetchReviews();
    const stars = renderStars(3.6);
    setStars(stars);
  }, [props.id]);

  const handleclick = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=${id}`;
    const response = await axios.get(url);
    const data = response.data;
    dispatch({ type: "FETCH_ROOM_REQUEST", payload: id });
  };

  const [formattedDate, setFormattedDate] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const startDate = new Date(props.specialprice?.startDate);
    const endDate = new Date(props.specialprice?.endDate);

    const startMonth = startDate.toLocaleString("default", { month: "long" });
    const startDay = startDate.getDate();

    const endMonth = endDate.toLocaleString("default", { month: "long" });
    const endDay = endDate.getDate();
    setFormattedDate({
      startDate: `${startMonth} ${startDay}`,
      endDate: `${endMonth} ${endDay}`,
    });
  }, []);

  const nextSlide = () => {
    setSlide(slide === props.images.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? props.images.length - 1 : slide - 1);
  };
  return (
    <>
      <div
        key={props.idx}
        className="flex flex-col gap-3 border-b border-r  sm:border-none "
        onClick={() => props.handlenav(props.text._id)}
      >
        <div className="relative z[-999999] w-fit">
          <div
            onClick={(event) => event.stopPropagation()}
            className={`flex justify-between text-black   checkbox-div absolute top-0 right-0 z-10 ${
              props.selectedpdt.includes(props.text) ? "visible" : ""
            }`}
          >
            <input
              type="checkbox"
              onChange={(e) => {
                props.handleCheckbox(props.text, e.target.checked);
                props.setShowcompare(true);
              }}
              style={{
                border: "2px solid red",
              }}
              checked={props.selectedpdt.includes(props.text)}
            />
          </div>
          {props.parentCategory === "offers" ? (
            <div
              className={
                "flex text-[12px] justify-between text-black font-normal bg-white py-1 px-3 absolute top-2 left-2 z-10"
              }
            >
              {props.offer}
            </div>
          ) : props.demandtype ? (
            <div
              className={
                "flex text-[12px] justify-between text-black font-normal bg-white py-1 px-3 absolute top-2 left-2 z-10"
              }
            >
              {props.demandtype === "Ayatrio Member Favorite"
                ? "Top Rated"
                : props.demandtype}
            </div>
          ) : (
            ""
          )}
          <div
            className="relative flex h-full w-full items-center justify-center  aspect-square"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered && slide !== 0 && (
              <Image
                src="/ayatrio icon/left-card.svg"
                height={20}
                width={20}
                alt="arrow"
                onClick={prevSlide}
                className="arrow arrow-left"
              />
            )}
            {props.images?.map((item, idx) => {
              return (
                <Link
                  href={`/product/${props.productTitle}`}
                  onClick={() => handleclick(props.productTitle)}
                >
                  <Image
                    src={isHovered ? props.images[2] : item}
                    alt="NA"
                    key={idx}
                    height={300}
                    width={300}
                    className={
                      slide === idx ? "aspect-square w-[400px]" : "hidden"
                    }
                  />
                </Link>
              );
            })}

            {isHovered && (
              <div>
                <Image
                  src="/ayatrio icon/right-card.svg"
                  height={20}
                  width={20}
                  alt="arrow"
                  onClick={nextSlide}
                  className="arrow arrow-right"
                />
              </div>
            )}
            <span className="flex absolute bottom-[16px]">
              {props.images.map((_, idx) => {
                return (
                  <button
                    key={idx}
                    className={
                      slide === idx
                        ? "bg-white w-[0.4rem] h-[0.4rem] cursor-pointer rounded-[50%] mr-1"
                        : "bg-[#ccc] w-[0.4rem] h-[0.4rem] cursor-pointer rounded-[50%] mr-1"
                    }
                    onClick={() => setSlide(idx)}
                  ></button>
                );
              })}
            </span>
          </div>
        </div>
        {props.demandtype === "Ayatrio Member Favorite" && (
          <p className="font-medium text-blue-500 mt-[10px] text-[12px]">
            {props.demandtype}
          </p>
        )}
        <p className="text-lg font-semibold hover:underline">
          {props.productTitle}
        </p>
        <p className="text-sm">{props.productDescription}</p>

        {props.discountedprice ? (
          <div>
            <p className="text-sm my-2 text-gray-500">Offer price</p>
            <p className=" text-sm font-semibold bg-yellow-400 price-box w-fit px-2 py-1">
              Rs.<span className="text-3xl">{props.discountedprice}</span>
            </p>
            <p className="text-sm mt-2 text-gray-500">
              Regular price: Rs.{props.totalPrice}
            </p>
          </div>
        ) : props.specialprice ? (
          <div>
            <p className=" text-sm font-semibold bg-yellow-400 price-box w-fit px-2 py-1">
              Rs.<span className="text-3xl">{props.specialprice?.price}</span>
            </p>
            <p className="text-sm mt-2 text-gray-500">
              Regular price: Rs.{props.totalPrice}
            </p>

            {props.specialprice.startDate && props.specialprice.endDate && (
              <p className="text-sm mt-1 text-gray-500">
                Price valid from {formattedDate.startDate} to{" "}
                {formattedDate.endDate}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm font-semibold">
            Rs.<span className="text-3xl">{props.totalPrice}</span>
          </p>
        )}
        {/* {props.ratings?.length > 0 && (
          <p className="flex flex-row items-center gap-1 text-sm text-black">
            {props.stars.map((star, index) => (
              <Image key={index} src={star} alt="star" width={15} height={15} />
            ))}
            ({props.ratings?.length})
          </p>
        )} */}
        {reviews.length > 0 && (
          <div className="flex gap-2">
            <div className="flex items-center">{stars}</div>
            <p className="text-gray-800 underline w-[31px] h-[20px] cursor-pointer">
              {reviews.length}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default TabsProductCard;
