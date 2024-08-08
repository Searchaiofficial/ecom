import { getProductByProductId } from "@/actions/getProductByProductId";
import ProductPage from "@/components/ProductPage/ProductPage";
import { getAggregateRating } from "@/utils/getAggregateRating";
import { BreadcrumbJsonLd, ProductJsonLd } from "next-seo";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }) => {
  const productId = params.subtitle;

  if (params.title === "category") {
    return null;
  }

  if (productId?.endsWith(".html") || productId?.endsWith(".svg")) {
    return null;
  }

  const product = await getProductByProductId(productId);

  if (product?.error) {
    return null;
  }

  if (!product) {
    return null;
  }

  return {
    title: product?.productTitle || params.title?.replace(/-/g, " "),
    description: product?.productDescription || "",
    openGraph: {
      title: product?.productTitle || params.title?.replace(/-/g, " "),
      description: product?.productDescription,
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

const Page = async ({ params }) => {
  const productId = params.subtitle;

  if (params.title === "category") {
    notFound();
  }

  if (productId?.endsWith(".html") || productId?.endsWith(".svg")) {
    return null;
  }

  const product = await getProductByProductId(productId);

  if (product?.error) {
    notFound();
  }

  if (!product) {
    return null;
  }

  const productImages = product?.images;

  const ratings = product?.ratings;

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
        productName={product?.productTitle}
        images={productImages}
        description={product?.productDescription}
        brand="Ayatrio"
        offers={[
          {
            price: product?.specialprice?.price,
            priceCurrency: "INR",
            priceValidUntil: product?.specialprice?.endDate,
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            url: `https://www.ayatrio.com/${params.title?.replace(/-/g, " ")}`,
            seller: {
              name: product?.seller || "Ayatrio",
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
            name: product?.productTitle || params.title?.replace(/-/g, " "),
            item: `https://www.ayatrio.com/${params.title?.replace(/-/g, " ")}`,
          },
        ]}
      />
      <ProductPage
        title={params.title.replace(/-/g, " ")}
        productId={productId}
        initialData={product}
      />
    </>
  );
};

export default Page;
