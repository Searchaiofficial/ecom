"use client";

import LiveRoom from "@/components/LiveRoom/LiveRoom";
import LiveRoomAdmin from "@/components/LiveRoom/LiveRoomAdmin";
import Splashscreen from "@/components/Splashscreen/Splashscreen";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page =  () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window?.location?.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // window.history.replaceState({}, "", `${window.location.pathname}`);
    }
  }, []);
  const { userInfo, isLoading } = useUserInfo();
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  return (
    <div>
      {userInfo &&
      !isLoading &&
      userInfo.user &&
      userInfo.user.liveStreamDetails?.isLiveStreamHost ? (
        <LiveRoomAdmin user={userInfo.user} />
      ) : (
        <LiveRoom userInfo={userInfo} />
      )}
    </div>
  );
};

export default page;
