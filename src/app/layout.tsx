import type { Metadata } from "next";
import { ViewTransition } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ChatProvider from "@/components/ChatProvider";
import ChatSidebar from "@/components/ChatSidebar";
import TextSelectionPopover from "@/components/TextSelectionPopover";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karthick Arun | Entrepreneur + Engineer",
  description:
    "I'm Karthick — an entrepreneur who designs, ships, and markets.",
  openGraph: {
    title: "Karthick Arun | Entrepreneur + Engineer",
    description: "I'm Karthick — an entrepreneur who designs, ships, and markets.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthick Arun | Entrepreneur + Engineer",
    description: "I'm Karthick — an entrepreneur who designs, ships, and markets.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${libreBaskerville.variable} font-[family-name:var(--font-geist-sans)] bg-[#fafcfd]`}
      >
        <CustomCursor />
        <ChatProvider>
          <div className="flex h-[100dvh] overflow-hidden">
            <div className="flex-1 flex flex-col overflow-y-auto transition-all duration-200">
              <Navbar />
              <main className="flex-1">
                <ViewTransition>{children}</ViewTransition>
              </main>
              <Footer />
            </div>
            <ChatSidebar />
          </div>
          <TextSelectionPopover />
        </ChatProvider>
      </body>
    </html>
  );
}
