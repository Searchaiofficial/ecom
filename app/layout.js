import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/provider";
import { GoogleTagManager } from "@next/third-parties/google";
import FooterWrapper from "@/components/FooterWrapper/FooterWrapper";
import NextTopLoader from "nextjs-toploader";
import { BASE_URL } from "@/constants/base-url";
import SwiperProvider from "@/providers/SwiperProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Ayatrio India-Affordable Home Furnishing & Decor designs & ideas",
  },
  description:
    "Buy affordable Wallpaper, Flooring, Curtain, Blinds, Mattresses and more at online.✔55,000+ Choices ✔Free Shipping ✔No Cost EMI ✔Easy Returns",
  openGraph: {
    title: "Ayatrio India-Affordable Home Furnishing & Decor designs & ideas",
    description:
      "Buy affordable Wallpaper, Flooring, Curtain, Blinds, Mattresses and more at online.✔55,000+ Choices ✔Free Shipping ✔No Cost EMI ✔Easy Returns",
    images: [
      {
        url: "https://ayatrio.com/api/og",
        width: 1200,
        height: 630,
        rel: "preload",
      },
    ],
  },
  applicationName: "Ayatrio",
  keywords: [
    "Ayatrio",
    "Flooring store",
    "Wallpaper store",
    "Custom Wallpaper",
    "Wooden Flooring",
    "Curtains",
    "Blinds",
    "Laminate & Vinyl Floors",
  ],
  authors: [{ name: "Ayatrio" }],
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": "/en-US",
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" className={poppins.className}>
      <GoogleTagManager gtmId={gtmId} />
      <body>
        <Providers>
          <SwiperProvider>
            <NextTopLoader color="#000" showSpinner={false} zIndex={99999} />
            {children}
            <FooterWrapper />
          </SwiperProvider>
        </Providers>
      </body>
    </html>
  );
}
