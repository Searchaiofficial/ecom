import React from "react";
import "./styles.css";


import PopUp from "../Reviews/PopUp";
import Image from "next/image";
import Link from "next/link";

function UserReviewPostsCard(props) {

    return (
        <>
            <div key={props.cardkey} className="pb-8  cursor-pointer group ">
                <Link href={`/suggestion/${props.id}`}>
                    <div className="absolute top-4 left-4 p-2 bg-white/70 rounded-full flex items-center gap-2 ">
                        <Image src={"/Ayatrio updated icon/instagram-white-icon.svg"} height={20} width={20} />
                        <p className="text-[12px] font-semibold text-[#111111] hidden opacity-0 transition-all duration-300 group-hover:block group-hover:opacity-100">Deepanshu</p>
                    </div>


                    <div className="flex h-full w-full items-center justify-center cursor-pointer  overflow-hidden">
                        <Image
                            src={props.imgSrc}
                            alt={props.title}
                            height={600}
                            width={600}
                            className={"aspect-square w-full lg:h-[500px] object-cover "}
                        />
                    </div>

                </Link>
            </div>
        </>
    );
}

export default UserReviewPostsCard;
