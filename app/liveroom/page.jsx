import { getLiveRoomAdminByEmail } from "@/actions/getLiveRoomAdminByEmail";
import { getUserInfo } from "@/actions/getUserInfo";
import LiveRoom from "@/components/LiveRoom/LiveRoom";
import LiveRoomAdmin from "@/components/LiveRoom/LiveRoomAdmin";

const page = async () => {
  // This is a server-side function
  const userInfo = await getUserInfo();
  const isLiveRoomAdmin = !!(await getLiveRoomAdminByEmail(
    userInfo?.user?.email
  ));

  return <div>{isLiveRoomAdmin ? <LiveRoomAdmin /> : <LiveRoom />}</div>;
};

export default page;
