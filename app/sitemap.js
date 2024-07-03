import {
  fetchAllProducts,
  fetchHeaderCategoryData,
  getCategories,
  getOffers,
} from "@/components/Features/api";

import { BASE_URL } from "@/constants/base-url";

export default async function sitemap() {
  const homedecorData = await fetchHeaderCategoryData("homedecor");
  const homedecorPaths = [];

  for (let i = 0; i < homedecorData.length; i++) {
    for (let j = 0; j < homedecorData[i].subcategories.length; j++) {
      homedecorPaths.push(
        encodeURI(
          `/${homedecorData[i].name}/homedecor/${homedecorData[i].subcategories[j].name}`
        ).replace(/&/g, "&amp;")
      );
    }
  }

  const walldecorData = await fetchHeaderCategoryData("walldecor");
  const walldecorPaths = [];

  for (let i = 0; i < walldecorData.length; i++) {
    for (let j = 0; j < walldecorData[i].subcategories.length; j++) {
      walldecorPaths.push(
        encodeURI(
          `/${walldecorData[i].name}/walldecor/${walldecorData[i].subcategories[j].name}`
        ).replace(/&/g, "&amp;")
      );
    }
  }

  const flooringData = await fetchHeaderCategoryData("flooring");
  const flooringPaths = [];

  for (let i = 0; i < flooringData.length; i++) {
    for (let j = 0; j < flooringData[i].subcategories.length; j++) {
      flooringPaths.push(
        encodeURI(
          `/${flooringData[i].name}/flooring/${flooringData[i].subcategories[j].name}`
        ).replace(/&/g, "&amp;")
      );
    }
  }

  const categories = await getCategories();
  const categoryPaths = categories.map((category) => {
    return encodeURI(
      `/${category.name}/category/all`.replace(" ", "-")
    ).replace(/&/g, "&amp;");
  });

  const subcategoryPaths = [];
  categories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      subcategoryPaths.push(
        encodeURI(
          `/${category.name}/category/${subcategory.name}`.replace(" ", "-")
        ).replace(/&/g, "&amp;")
      );
    });
  });

  const products = await fetchAllProducts(100);
  const productPaths = products.map((product) =>
    encodeURI(`/${product.productTitle}`)
  );

  const offers = await getOffers();
  const offerPaths = offers.map((offer) =>
    encodeURI(`/offers/new/${offer.type}`.replace(" ", "-")).replace(
      /&/g,
      "&amp;"
    )
  );

  const paths = [
    "/",
    "/ayatrio-map",
    "/businesstobusiness",
    "/cart",
    "/customerservice",
    "/customerservice/contactus",
    "/customerservice/faq",
    "/customerservice/giftcards",
    "/customerservice/priceguarantee",
    "/customerservice/privacypolicy",
    "/customerservice/returnpolicy",
    "/customerservice/services",
    "/customerservice/shoppinginfo",
    "/customerservice/termsandconditions",
    "/deliveryservice",
    "/designservice",
    "/freedesign",
    "/freesample",
    "/installationservice",
    "/priceguarantee",
    "/profile",
    "/returnpolicy",
    "/thisisayatrio",
    ...homedecorPaths,
    ...walldecorPaths,
    ...flooringPaths,
    ...categoryPaths,
    ...productPaths,
    ...subcategoryPaths,
    ...offerPaths,
  ];

  return paths.map((path) => {
    return {
      url: `${BASE_URL}${path}`,
    };
  });
}
