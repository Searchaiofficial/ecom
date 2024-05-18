import { BreadcrumbJsonLd } from "next-seo";
import RoomPage from "../MainPage";

export async function generateMetadata({ params }) {
  // let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=`;

  // const response = await axios.get(`${url}${params.id}`);
  // const t = response?.data?.productTitle;

  return {
    title: params,
  };
}

const page = ({ params }) => {
  return (
    <>
      <BreadcrumbJsonLd
        useAppDir={true}
        itemListElements={[
          {
            position: 1,
            name: "Home",
            item: "https://www.ayatrio.com",
          },
          {
            position: 2,
            name: "Product",
            item: "https://www.ayatrio.com/product",
          },
          {
            position: 3,
            name: params.title,
            item: `https://www.ayatrio.com/product/${params.title}`,
          },
        ]}
      />
      <RoomPage />
    </>
  );
};

export default page;
