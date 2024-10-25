import "@styles/globals.css";

import type { Metadata } from "next";

import SideNav from "@/ui/side-nav";

export const metadata: Metadata = {
  title: "CloudNext | Files",
  description: "A cloud storage service for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container flex flex-row mx-auto mt-8">
      <section className="flex flex-col flex-1 min-h-[calc(100vh_-_125px)] mr-10 border-r gap-y-8">
        <h2 className="text-4xl font-bold">Categories</h2>
        <SideNav />
      </section>

      <section className="flex-4">{children}</section>
    </div>
  );
}
