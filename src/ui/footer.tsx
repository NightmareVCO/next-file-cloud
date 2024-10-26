import { Chip, Divider } from "@nextui-org/react";
import { AppLogo } from "@ui/icons/AppLogo";
import Link from "next/link";

import { AppIcon } from "@/ui/icons/AppIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex w-full flex-col">
      <Divider orientation="horizontal" />
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-4 md:order-1 md:mt-0">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <div className="flex items-center">
              <Link
                className="flex flex-row items-center justify-center gap-1"
                href="/"
              >
                <AppIcon />
                <AppLogo />
              </Link>
            </div>
            <Divider className="h-4" orientation="vertical" />
            <Chip
              className="border-none px-0 text-default-500"
              color="success"
              variant="dot"
            >
              All systems operational
            </Chip>
          </div>
          <p className="text-center text-tiny text-default-400 md:text-start hover:scale-105 hover:text-primary transition duration-300">
            &copy; {year}{" "}
            <Link
              rel="noopener"
              target="_blank"
              href="https://vladimircuriel.me"
            >
              Vladimir Curiel
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
