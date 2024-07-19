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
        <HomePage />
        <ChatPrompt />
      </Suspense>
    </>
  );
}

