"use client";

import LiveRoom from "@/components/LiveRoom/LiveRoom";
import LiveRoomAdmin from "@/components/LiveRoom/LiveRoomAdmin";
import Splashscreen from "@/components/Splashscreen/Splashscreen";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = async () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window?.location?.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);
  const { userInfo, isLoading } = useUserInfo();
  const router = useRouter();

  if (isLoading) {
    return <Splashscreen />;
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
