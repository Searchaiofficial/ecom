import { fetchHeaderCategoryData } from "@/components/Features/api";
import { BASE_URL } from "@/constants/base-url";

export default async function sitemap() {
  const homedecorData = await fetchHeaderCategoryData("homedecor");
  const homedecorPaths = [];

  for (let i = 0; i < homedecorData.length; i++) {
    for (let j = 0; j < homedecorData[i].subcategories.length; j++) {
      homedecorPaths.push(
        encodeURI(
          `/homedecor/${homedecorData[i].name}/${homedecorData[i].subcategories[j].name}`
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
          `/walldecor/${walldecorData[i].name}/${walldecorData[i].subcategories[j].name}`
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
          `/flooring/${flooringData[i].name}/${flooringData[i].subcategories[j].name}`
        ).replace(/&/g, "&amp;")
      );
    }
  }

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
  ];

  return paths.map((path) => {
    return {
      url: `${BASE_URL}${path}`,
    };
  });
}
