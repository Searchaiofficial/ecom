import RoomPage from "../product/MainPage";
import axios from "axios";

export async function generateMetadata() {
  // let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=`;

  // const response = await axios.get(`${url}${params.id}`);
  // const t = response?.data?.productTitle;

  // return {
  //   title: t,
  // };
}

const page = ({ params }) => {
  return (
    <>
      <RoomPage params={params} />
    </>
  );
};

export default page;
