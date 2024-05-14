import { BASE_URL } from "@/constants/base-url";

export default function sitemap() {
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
  ];

  return paths.map((path) => {
    return {
      url: `${BASE_URL}${path}`,
    };
  });
}
