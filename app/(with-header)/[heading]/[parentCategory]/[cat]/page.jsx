import React from "react";
import ProductPage from "../Meta";
import { BreadcrumbJsonLd, ProductJsonLd, WebPageJsonLd } from "next-seo";
import {
  createApiEndpoint,
  getCategoryByName,
} from "@/components/Features/api";
import { BASE_URL } from "@/constants/base-url";

export async function generateMetadata({ params }) {
  const category = await getCategoryByName(
    params.parentCategory.replace(/-/g, " ")
  );

  return {
    title: category?.metadata?.title || category?.name || params.parentCategory,
    description: category?.description || "",
  };
}

const page = async ({ params }) => {
  const category = await getCategoryByName(
    params.parentCategory.replace(/-/g, " ")
  );

  const subcategories = category.subcategories;

  const subcategoriesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: subcategories.map((subcategory, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: subcategory.name,
    })),
  };

  const categoryProductsResponse = await fetch(
    createApiEndpoint(
      `fetchProductsByCategory/${params.parentCategory.replace(/-/g, " ")}`
    )
  );
  const categoryProducts = await categoryProductsResponse.json();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(subcategoriesJsonLd),
        }}
      />
      <WebPageJsonLd
        useAppDir={true}
        name={
          category?.metadata?.title || category?.name || params.parentCategory
        }
        description={category?.description || ""}
        id={`https://www.ayatrio.com/${params.heading}/${params.parentCategory}/${params.cat}`}
      />
      <BreadcrumbJsonLd
        useAppDir={true}
        itemListElements={[
          {
            position: 1,
            name: "Home",
            item: "https://www.ayatrio.com/",
          },
          {
            position: 2,
            name: decodeURIComponent(params.heading),
            item: "https://www.ayatrio.com/" + params.heading,
          },
          {
            position: 3,
            name: decodeURIComponent(params.parentCategory),
            item:
              "https://www.ayatrio.com/" +
              params.heading +
              "/" +
              params.parentCategory,
          },
          {
            position: 4,
            name: decodeURIComponent(params.cat),
            item:
              "https://www.ayatrio.com/" +
              params.heading +
              "/" +
              params.parentCategory +
              "/" +
              params.cat,
          },
        ]}
      />
      {categoryProducts?.map((product) => {
        return (
          <ProductJsonLd
            key={product._id}
            useAppDir={true}
            productName={product.productTitle}
            description={product.productDescription}
            images={product.productImages}
            brand={product.brand || "Ayatrio"}
            offers={[
              {
                price: product.specialprice?.price,
                priceCurrency: "INR",
                priceValidUntil: product.specialprice?.endDate,
                itemCondition: "https://schema.org/NewCondition",
                availability: "https://schema.org/InStock",
                url: `${BASE_URL}/product/${product.productTitle}`,
                seller: {
                  name: "Ayatrio",
                },
              },
            ]}
            reviews={product.ratings.map((review) => {
              return {
                author: review.name,
                name: review.comment,
                reviewBody: review.comment,
                reviewRating: {
                  bestRating: "5",
                  ratingValue: review.rating,
                  worstRating: "1",
                },
              };
            })}
          />
        );
      })}
      <ProductPage params={params} />
    </>
  );
};

export default page;
