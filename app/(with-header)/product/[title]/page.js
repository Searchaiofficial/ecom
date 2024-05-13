import RoomPage from "../MainPage";
import axios from "axios";

export async function generateMetadata({params}) {
  // let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=`;

  // const response = await axios.get(`${url}${params.id}`);
  // const t = response?.data?.productTitle;

  return {
    title: params,
  };
}

const page = () => {
  return (
    <>
      <RoomPage  />
    </>
  );
};

export default page;
