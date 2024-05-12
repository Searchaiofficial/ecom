import React, { useState, useEffect } from "react";
import "./styles.css";

import Carousel from "./swip";

import PopUp from "../Reviews/PopUp";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";

function ShopByRoomCard(props) {

    return (
        <>
            <div key={props.cardkey} className="pb-8  cursor-pointer ">
                <Link href={`/rooms/${props.id}`}>
                    <div className="flex h-full w-full items-center justify-center cursor-pointer ">
                        <Image
                            src={props.imgSrc}
                            alt="NA"
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
                        <div className={` line-clamp-4 text-sm overflow-hidden text-ellipsis`}>
                            {props.summary}
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

export default ShopByRoomCard;
