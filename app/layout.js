import { Poppins } from "next/font/google";
// import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/provider";
import { GoogleTagManager } from "@next/third-parties/google";
import FooterWrapper from "@/components/FooterWrapper/FooterWrapper";
import NextTopLoader from "nextjs-toploader";
import { BASE_URL } from "@/constants/base-url";
// const myFont = localFont({
//   src: "../public/Font/Jost-Regular.ttf",
// });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Ayatrio",
    template: "Ayatrio - %s",
  },
  description:
    "Custom Wallpaper, Wooden Flooring, Laminate & Vinyl Floors in India India&#039;s first Virtual Reality based Interior Design Solution",
  openGraph: {
    title: "Ayatrio",
    description:
      "Custom Wallpaper, Wooden Flooring, Laminate & Vinyl Floors in India India&#039;s first Virtual Reality based Interior Design Solution",
    images: [
      {
        url: "https://ayatrio.com/api/og",
        width: 1200,
        height: 630,
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
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" className={poppins.className}>
      <GoogleTagManager gtmId={gtmId} />
      <body>
        <Providers>
          <NextTopLoader color="#000" showSpinner={false} zIndex={99999} />
          {children}
          <FooterWrapper />
        </Providers>
      </body>
    </html>
  );
}
