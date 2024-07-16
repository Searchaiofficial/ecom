import { BreadcrumbJsonLd, ProductJsonLd } from "next-seo";
import axios from "axios";
import { getAggregateRating } from "@/utils/getAggregateRating";
import ProductPage from "@/components/ProductPage/ProductPage";

export async function generateMetadata({ params }) {
  const response = await axios.get(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/api/getSingleProduct?title=${params.title?.replace(/-/g, " ")}`
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
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/api/getSingleProduct?title=${params.title?.replace(/-/g, " ")}`
  );

  const productImages = response.data?.images;

  const ratings = response.data.ratings;

  const reviews = ratings?.map((review) => {
    return {
      author: review.name,
      name: review.comment,
      reviewBody: review.comment,
      reviewRating: {
        ratingValue: `${review.rating}`,
      },
    };
  });

  const aggregateRating = getAggregateRating(ratings);

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
            url: `https://www.ayatrio.com/${params.title?.replace(/-/g, " ")}`,
            seller: {
              name: response.data?.seller || "Ayatrio",
            },
          },
        ]}
        reviews={!!reviews?.length ? reviews : null}
        aggregateRating={!!reviews?.length ? aggregateRating : null}
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
            name:
              response.data?.productTitle || params.title?.replace(/-/g, " "),
            item: `https://www.ayatrio.com/${params.title?.replace(/-/g, " ")}`,
          },
        ]}
      />
      <ProductPage
        title={params.title.replace(/-/g, " ")}
        initialData={response.data}
      />
    </>
  );
};

export default page;
