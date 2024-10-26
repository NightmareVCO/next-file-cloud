import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import { RightIcon } from "@/ui/icons/RightIcon";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center px-3 overflow-x-hidden rounded-2xl md:rounded-3xl md:px-0">
        <section className="z-20 my-14 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
          <Button
            className="h-9 overflow-hidden border-1 border-default-100 bg-default-50 px-[18px] py-2 text-small font-normal leading-5 text-primary-400"
            endContent={<RightIcon />}
            radius="full"
            variant="bordered"
          >
            New onboarding experience
          </Button>
          <div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
            <div className="text-transparent bg-gradient-to-r from-primary via-primary to-primary-300 bg-clip-text">
              Easiest way to <br /> to add your files to cloud.
            </div>
          </div>
          <p className="text-center font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]">
            Store, share and manage your files with ease. Get started with our
            free plan today.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <Button
              as={Link}
              href="/dashboard/files"
              color="primary"
              variant="shadow"
            >
              Get Started
            </Button>
          </div>
        </section>
        <section className="px-8 pb-8 max-w-7xl">
          <Image
            src="/app-mockup.png"
            alt="Hero image"
            width={1920}
            height={1280}
            className="rounded-xl"
          />
        </section>
      </main>
    </>
  );
}
