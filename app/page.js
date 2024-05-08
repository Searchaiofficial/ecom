import HomePage from "@/components/home/HomePage";
import Splashscreen from "@/components/Splashscreen/Splashscreen";
import SaveDeviceIdLocalstorage from "@/utils/SaveDeviceIdLocalstorage ";
import { Suspense } from "react";

export default async function Home() {
  
  return (
    <>
      <SaveDeviceIdLocalstorage />
      <Suspense fallback={<Splashscreen />}>
        <HomePage />
      </Suspense>
    </>
  );
}

export const dynamic = "force-dynamic"