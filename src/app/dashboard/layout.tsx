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
    <div className="container flex flex-col mx-auto mt-8 lg:flex-row">
      <section className="flex flex-col flex-1  lg:min-h-[calc(100vh_-_125px)] mb-10 lg:mb-0 lg:mr-10 lg:border-r gap-y-8 items-center lg:items-normal">
        <h2 className="text-4xl font-bold">Categories</h2>
        <SideNav />
      </section>

      <section className="flex-5">{children}</section>
    </div>
  );
}
