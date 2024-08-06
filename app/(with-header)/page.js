import HomePage from "@/components/home/HomePage";
import dynamic from "next/dynamic";
import Splashscreen from "@/components/Splashscreen/Splashscreen";
import SaveDeviceIdLocalstorage from "@/utils/SaveDeviceIdLocalstorage ";

import { Suspense } from "react";
const ChatPrompt = dynamic(() =>
  import("../../components/ChatPromptWidget/chatprompt")
);
import SaveUserCoordinatesOnscroll from "@/utils/SaveUserCoordinatesOnScroll";
import { OrganizationJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo";
import SiteNavigationElement from "@/components/JsonLd/SiteNavigationElement";

export default async function Home() {
  return (
    <>
      <SiteNavigationElement />
      <OrganizationJsonLd
        useAppDir={true}
        type={"Organization"}
        url="https://www.ayatrio.com"
        name="Ayatrio"
        hasMerchantReturnPolicy={{
          "@type": "MerchantReturnPolicy",
          applicableCountry: ["IN"],
          returnPolicyCountry: "IN",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 30,
          returnMethod: "https://schema.org/ReturnByMail",
          returnFees: "https://schema.org/FreeReturn",
          refundType: "https://schema.org/FullRefund",
        }}
        contactPoint={[
          {
            telephone: "(+91) 9007404292",
            areaServed: "IN",
            email: "info.ayatrio@gmail.com",
            contactType: "Customer Service",
          },
        ]}
        sameAs={[
          "https://www.facebook.com/ayatrio.india/",
          "https://twitter.com/ayatrio_india/",
          "https://www.instagram.com/ayatrio_india/",
          "https://in.pinterest.com/ayatrio_india/",
          "https://www.youtube.com/ayatrio/",
        ]}
        address={{
          type: "PostalAddress",
          streetAddress: "25C, Elliot Road",
          addressLocality: "Kolkata",
          postalCode: "700016",
          contactType: "Customer Service",
        }}
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
        <HomePage />
        <ChatPrompt />
      </Suspense>
    </>
  );
}
