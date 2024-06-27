import { BreadcrumbJsonLd, ProductJsonLd } from "next-seo";
import RoomPage from "../MainPage";
import axios from "axios";

export async function generateMetadata({ params }) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?title=${params.title}`
  );

  return {
    title: response.data?.productTitle?.replace(/^./, (match) => {
      return match.toUpperCase();
    }),
    description: response.data?.productDescription,
  };
}

const page = async ({ params }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?title=${params.title}`
  );

  const productImages = response.data.proudctImages;

  return (
    <>
      <ProductJsonLd
        useAppDir={true}
        productName={response.data?.productTitle}
        images={productImages}
        description={response.data?.productDescription}
        brand="Ayatrio"
        offers={[
          {
            price: response.data?.specialprice?.price,
            priceCurrency: "INR",
            priceValidUntil: response.data?.specialprice?.endDate,
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            url: `https://www.ayatrio.com/product/${params.title}`,
            seller: {
              name: "Ayatrio",
            },
          },
        ]}
      />
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
