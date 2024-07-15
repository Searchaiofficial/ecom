import React, { useState } from "react";
import "./styles.css";
import Image from "next/image";
import PopUp from "../Reviews/PopUp";
import { useRouter } from "next/navigation";
import { getAggregateRating } from "@/utils/getAggregateRating";

function ItemCard(props) {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleImageClick = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };
  // console.log(props)
  const router = useRouter();
  const handleClick = (id) => {
    router.push(`/room/${id}`);
  };

  const { ratingValue } = getAggregateRating(props.ratings);

  return (
    <>
      <div className="card m-2" style={{ width: "100%", height: "100%" }}>
        <div
          className={`card-flex ${props.cssClass}  `}
          onClick={() => handleClick(props.id)}
        >
          <img src={props.imgSrc} className="card-img w-full h-full" alt="" />

          <div className="review-icon-container">
            <Image
              loading="lazy"
              src="/images/temp.svg"
              width={10}
              height={10}
              className="h-8 rounded-md cursor-pointer"
              onClick={handleImageClick}
              alt="Review Icon"
            />
          </div>
        </div>
        <div
          className="card-title"
        // onClick={() => navigate('/rooms')}
        >
          <div className="card-title-desc">{props.title}</div>
          <div className="card-rating">
            <Image
              loading="lazy"
              src="/icons/star-full-black.svg"
              width={20}
              height={20}
              alt="star"
            />
            {ratingValue}
          </div>
        </div>
        <div className="card-date">{props.desc}</div>
        <div className="card-price">
          <strong>₹{props.price}</strong>
        </div>
      </div>
      {isPopupVisible && (
        <PopUp isPopupVisible={isPopupVisible} closePopup={closePopup} />
      )}
    </>
  );
}

export default ItemCard;
