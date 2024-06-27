import React from "react";
import ProductPage from "../Meta";
import { BreadcrumbJsonLd } from "next-seo";
import { getCategoryByName } from "@/components/Features/api";

export async function generateMetadata({ params }) {
  const category = await getCategoryByName(params.parentCategory);

  return {
    title: category?.metadata?.title || params.parentCategory,
    description: category?.description || "",
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
      {/* <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section> */}
      <ProductPage params={params} />
    </>
  );
};

export default page;
