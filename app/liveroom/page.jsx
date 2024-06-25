"use client";

import LiveRoom from "@/components/LiveRoom/LiveRoom";
import LiveRoomAdmin from "@/components/LiveRoom/LiveRoomAdmin";
import Splashscreen from "@/components/Splashscreen/Splashscreen";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";

const page = async () => {
  const { userInfo, isLoading } = useUserInfo();
  const router = useRouter();

  if (!isLoading && !userInfo) {
    router.push("/login");
  }

  if (isLoading) {
    return <Splashscreen />;
  }

  return (
    <div>
      {userInfo && userInfo.user && userInfo.user.isLiveStreamHost ? (
        <LiveRoomAdmin />
      ) : (
        <LiveRoom user={userInfo.user} />
      )}
    </div>
  );
};

export default page;
