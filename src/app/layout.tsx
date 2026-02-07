import type { Metadata } from "next";
import { ViewTransition } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Rachel Chen | Product Designer + Engineer",
  description:
    "I'm Rachel, a product designer who engineers.",
  openGraph: {
    title: "Rachel Chen | Product Designer + Engineer",
    description: "I'm Rachel, a product designer who engineers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rachel Chen | Product Designer + Engineer",
    description: "I'm Rachel, a product designer who engineers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-[family-name:var(--font-geist-sans)] bg-[#fafcfd]`}
      >
        <CustomCursor />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <ViewTransition>{children}</ViewTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
