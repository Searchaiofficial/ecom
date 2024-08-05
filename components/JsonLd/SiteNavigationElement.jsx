import Script from "next/script";
import { getCategories } from "../Features/api";

const SiteNavigationElement = async () => {
  const categories = await getCategories();

  const siteNavigationElementListSchema = {
    "@context": "http://schema.org",
    "@type": "ItemList",
    itemListElement: categories.map((category, index) => {
      return {
        "@type": "SiteNavigationElement",
        position: index + 1,
        name: category.name,
        description: category.description,
        url: `https://www.ayatrio.com/${category.name.replace(
          / /g,
          "-"
        )}/category/all`,
      };
    }),
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteNavigationElementListSchema),
        }}
      />
    </>
  );
};

export default SiteNavigationElement;
