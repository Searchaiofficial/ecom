import HomePage from "@/components/home/HomePage";
import dynamic from "next/dynamic";
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
// import ChatPrompt from "../../components/ChatPromptWidget/chatprompt";
const ChatPrompt = dynamic(() => import("../../components/ChatPromptWidget/chatprompt"));
import SaveUserCoordinatesOnscroll from "@/utils/SaveUserCoordinatesOnScroll";
import { OrganizationJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo";

export default async function Home() {
  return (
    <>
      <OrganizationJsonLd
        useAppDir={true}
        type={"Organization"}
        url="https://www.ayatrio.com"
        name="Ayatrio"
        logo="https://ayatrio.com/api/og"
      />
      <SiteLinksSearchBoxJsonLd
        useAppDir={true}
        url="https://www.ayatrio.com"
        potentialActions={[
          {
            target: "https://www.ayatrio.com/?search={search_term_string}",
            queryInput: "required name=search_term_string",
          },
        ]}
      />
      <SaveDeviceIdLocalstorage />
      <SaveUserCoordinatesOnscroll threshold={50} />
      <Suspense fallback={<Splashscreen />}>
        <ChatPrompt />
        <HomePage />
      </Suspense>
    </>
  );
}

// export const dynamic = "force-dynamic"
