"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ChatPrompt = () => {
    const [showContent, setShowContent] = useState(true);
    const [isRendered, setIsRenderd] = useState(false)



    useEffect(() => {
        setIsRenderd(true)
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowContent(false);
            } else {
                setShowContent(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!isRendered) {
        return null;
    }

    return (
        <Link href={"https://wa.me/message/SJJ5WR6RYEJKN1"} className={`flex items-center lg:right-6 right-7 bottom-4 lg:bottom-3.5 gap-[8px] rounded-lg fixed z-50 ${!showContent && "lg:mr-1.5 lg:mb-1.5"}`}>
            <div>
                <Image src="/ayatrio icon/store-chat.jpg" width={35} height={35} className={`lg:w-[35px] w-[45px] h-[45px] lg:h-[35px] rounded-full`} />
            </div>
            {showContent && (
                <div className="lg:flex hidden lg:flex-col">
                    <p className="text-[14px] font-semibold text-[#1D1D1F]">Need shopping help?</p>
                    <Link href="#">
                        <p className="text-blue-500 text-[14px] font-normal">Ask a specialist</p>
                    </Link>
                </div>
            )}
        </Link>
    );
};

export default ChatPrompt;
