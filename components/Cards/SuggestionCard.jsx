import React from "react";
import "./styles.css";


import PopUp from "../Reviews/PopUp";
import Image from "next/image";
import Link from "next/link";

function SuggestionCard(props) {

  return (
    <>
      <div key={props.cardkey} className="pb-8  cursor-pointer ">
        <Link href={`/suggestion/${props.id}`}>
          <div className="flex h-full w-full items-center justify-center cursor-pointer  overflow-hidden">
            <Image
              src={props.imgSrc}
              alt={props.title}
              height={600}
              width={600}
              className={"aspect-square w-full object-cover "}
            />
          </div>

          <div
            className={`${props.bgColorClass} p-8 h-[220px] overflow-hidden`}
          >
            <div className="text-lg font-semibold hover:underline  text-ellipsis mb-1">
              {props.title}
            </div>
            <div className={`text-sm overflow-hidden text-ellipsis `}>
              {props.desc}
            </div>
          </div>
        </Link>
      </div>
      {props.isPopupVisible && (
        <PopUp
          isPopupVisible={props.isPopupVisible}
          closePopup={props.closePopup}
        />
      )}
    </>
  );
}

export default SuggestionCard;
