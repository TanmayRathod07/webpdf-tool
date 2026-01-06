import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pdf.tanmayrathod.com'),
  title: {
    default: 'WebPDF | Free Online PDF Tools by Tanmay Rathod',
    template: '%s | WebPDF - Tanmay Rathod'
  },
  description: 'Free, secure, and fast PDF tools (Merge, Split, Edit) running entirely in your browser. Built by Full Stack Developer Tanmay Rathod.',
  keywords: [
    'Tanmay Rathod',
    'WebPDF',
    'PDF Tools',
    'Merge PDF',
    'Split PDF',
    'Tanmay Rathod Developer',
    'Pune Developer',
    'Edit PDF',
    'Free PDF Editor',
    'Online PDF Converter',
    'Image to PDF',
    'JPG to PDF',
    'PNG to PDF',
    'Client-side PDF',
    'Secure PDF Tools',
    'No Upload PDF',
    'Next.js Portfolio'
  ],
  authors: [{ name: 'Tanmay Rathod', url: 'https://tanmayrathod.com' }],
  creator: 'Tanmay Rathod',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pdf.tanmayrathod.com',
    title: 'WebPDF by Tanmay Rathod',
    description: 'Secure client-side PDF tools for students and professionals.',
    siteName: 'WebPDF',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '1tJRcz7Qu35CJdZmpr4PRasQAubM1zGRcnW91QxFxZ4',
  },
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
