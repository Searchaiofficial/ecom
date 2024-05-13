import { Poppins } from "next/font/google";
// import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/provider";

import FooterWrapper from "@/components/FooterWrapper/FooterWrapper";
import NextTopLoader from "nextjs-toploader";
// const myFont = localFont({
//   src: "../public/Font/Jost-Regular.ttf",
// });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata = {
  metadataBase: new URL("http://localhost:3000/"),

  title: {
    default: "Ayatrio",
    template: "Ayatrio - %s ",
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
  keywords: ["Ayatrio", "Flooring store"],
  authors: [{ name: "Ayatrio" }],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Providers>
          <NextTopLoader color="#000" showSpinner={false} />
          {children}
          <FooterWrapper />
        </Providers>
      </body>
    </html>
  );
}
