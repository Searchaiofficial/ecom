import React from "react";
import "./styles.css";


import PopUp from "../Reviews/PopUp";
import Image from "next/image";
import Link from "next/link";

function UserReviewPostsCard(props) {

    return (
        <>
            <div key={props.cardkey} className="cursor-pointer group h-[449px] lg:pb-[48px] lg:h-[600px] ">
                <div className="h-full">
                    <div className="absolute top-4 left-4 p-2  rounded-full flex items-center gap-2 ">
                        <Image src={"/Ayatrio updated icon/instagram-white-icon.svg"} height={25} width={25} />
                        <p className="text-[14px] font-semibold text-white transition-all duration-300 ">@{props.username}</p>
                    </div>


                    <div className="flex h-full w-full items-center justify-center cursor-pointer  overflow-hidden">
                        <Image
                            src={props.imgSrc}
                            alt={props.title}
                            height={600}
                            width={600}
                            className={"aspect-square w-full h-[100%] lg:h-[100%] object-cover "}
                        />
                    </div>

                </div>
            </div>
        </>
    );
}

export default UserReviewPostsCard;
