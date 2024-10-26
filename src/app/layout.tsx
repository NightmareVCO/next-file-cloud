import "@styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/ui/footer";

import Header from "../ui/header";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CloudNext",
  description: "A cloud storage service for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Header />
          {children}
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
