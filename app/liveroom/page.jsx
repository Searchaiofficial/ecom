import { getLiveRoomAdminByEmail } from "@/actions/getLiveRoomAdminByEmail";
import { getUserInfo } from "@/actions/getUserInfo";
import LiveRoom from "@/components/LiveRoom/LiveRoom";
import LiveRoomAdmin from "@/components/LiveRoom/LiveRoomAdmin";
import { redirect } from "next/navigation";

const page = async () => {
  // This is a server-side function
  const userInfo = await getUserInfo();
  console.log(userInfo);
  if(!userInfo) {
    redirect("/login");
  }
  // const isLiveRoomAdmin = !!(await getLiveRoomAdminByEmail(
  //   userInfo?.user?.email
  // ));

  return (
    //  <div>{isLiveRoomAdmin ? <LiveRoomAdmin /> : <LiveRoom />}</div>;
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
