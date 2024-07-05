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
import ChatPrompt from "../../components/ChatPromptWidget/chatprompt";
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
        // logo="https://ayatrio.com/api/og"
        contactPoint={[
          {
            telephone: "(+91) 9007404292",
            areaServed: "IN",
            email: "info.ayatrio@gmail.com",
            contactType: "Customer Service",
          },
        ]}
        sameAs={[
          // "https://www.facebook.com/ayatrio.india/",
          // "https://twitter.com/ayatrio_india/",
          // "https://www.instagram.com/ayatrio_india/",
          // "https://in.pinterest.com/ayatrio_india/",
          // "https://www.youtube.com/ayatrio/",
        ]}
        address={{
          type: "PostalAddress",
          streetAddress: "25C, Elliot Road",
          addressLocality: "Kolkata",
          postalCode: "700016",
          contactType: "Customer Service",
        }}
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
