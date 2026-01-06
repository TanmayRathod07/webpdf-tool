import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickPDF - Free Online PDF Tools",
  description: "Merge, Split, and Convert PDFs securely in your browser.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-background text-text-main min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Script
          id="adsense-init"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
