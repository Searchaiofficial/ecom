import React from "react";
import ProductPage from "../Meta";

export function generateMetadata({ params, searchParams }, parent) {
  // console.log("f", params, searchParams);
  return {
    title: decodeURIComponent(params.cat),
  };
}

const page = ({ params }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: decodeURIComponent(params.cat),
  };
  return (
    <>
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section>
      <ProductPage params={params} />
    </>
  );
};

export default page;
