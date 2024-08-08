import { RoomsPage } from "@/components/Rooms/RoomsPage";
import axios from "axios";

export const generateMetadata = async ({ params }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getRoommain`,
    {
      params: {
        roomType: params.roomType.replace(/-/g, " "),
      },
    }
  );

  const roomData = response.data;

  return {
    title: roomData?.metadata?.title || roomData?.roomType || params.roomType,
    description: roomData?.description || "",
    openGraph: {
      title: roomData?.metadata?.title || roomData?.roomType || params.roomType,
      description: roomData?.description || "",
      images: [
        {
          url: "/ayatrio-room.jpg",
          width: 600,
          height: 600,
          alt: "Ayatrio India-Affordable Home Furnishing & Decor designs & ideas",
        },
      ],
    },
  };
};

const page = ({ params }) => {
  return (
    <>
      <RoomsPage params={params.roomType} />
    </>
  );
};

export default page;
