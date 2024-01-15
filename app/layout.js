import { Jost } from "next/font/google";
import "./globals.css";
import { Providers } from "@/provider";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer/Footer";
import HeaderWrapper from "@/components/HeaderWrapper/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper/FooterWrapper";

const jost = Jost({ 
  subsets: ["latin"],
  variable:'--font-jost',
 });

export const metadata = {
  title: "Ayatrio",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={jost.className}>
        {/* <Link rel="icon" href="/favicon-32x32.png" sizes="any" ></Link> */}

        <Providers>
          <HeaderWrapper />
          {children}
          <FooterWrapper />
        </Providers>
      </body>
    </html>
  );
}
