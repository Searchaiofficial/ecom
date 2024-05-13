import HomePage from "@/components/home/HomePage";
import Splashscreen from "@/components/Splashscreen/Splashscreen";
import SaveDeviceIdLocalstorage from "@/utils/SaveDeviceIdLocalstorage ";
// <<<<<<< HEAD
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectSliderData } from "@/components/Features/Slices/sliderSlice";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import Link from "next/link";
// const HomePage = dynamic(() => import("@/components/home/HomePage"));

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import ChatPrompt from "../../components/ChatPromptWidget/chatprompt";


export default async function Home() {

  return (
    <>
      <SaveDeviceIdLocalstorage />

      <Suspense fallback={<Splashscreen />}>
        <ChatPrompt />
        <HomePage />
      </Suspense>
    </>
  );
}

// export const dynamic = "force-dynamic"