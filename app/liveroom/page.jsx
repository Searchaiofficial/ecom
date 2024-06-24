import { getUserInfo } from "@/actions/getUserInfo";
import LiveRoom from "@/components/LiveRoom/LiveRoom";

const page = async () => {
  // This is a server-side function
  const user = await getUserInfo();
  console.log(user);

  return (
    <div>
      <LiveRoom />
    </div>
  );
};

export default page;
