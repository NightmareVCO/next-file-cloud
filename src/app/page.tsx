import { Button } from "@nextui-org/react";
import Link from "next/link";

import { RightIcon } from "@/ui/icons/RightIcon";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center rounded-2xl px-3 md:rounded-3xl md:px-0">
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
            <div className="bg-gradient-to-r from-primary via-primary to-primary-300 bg-clip-text text-transparent">
              Easiest way to <br /> to add your files to cloud.
            </div>
          </div>
          <p className="text-center font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]">
            Acme makes running global teams simple. HR, Payroll, International
            Employment, contractor management and more.
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
        <div className="z-20 mt-auto w-[calc(100%-calc(theme(spacing.4)*2))] max-w-6xl overflow-hidden rounded-tl-2xl rounded-tr-2xl border-1 border-b-0 border-[#FFFFFF1A] bg-background bg-opacity-0 p-4">
          {/* <AppScreenshot /> */}
        </div>
      </main>
    </>
  );
}

// <Button
//             endContent={
//               <span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full bg-default-100">
//                 {/* <Icon
//                   className="text-default-500 [&>path]:stroke-[1.5]"
//                   icon="solar:arrow-right-linear"
//                   width={16}
//                 /> */}
//               </span>
//             }
//             color="primary"
//             variant="bordered"
//           >
//             See our plans
//           </Button>

// <div className="pointer-events-none inset-0 top-[-25%] z-10 scale-150 select-none sm:absolute sm:scale-125">
//   {/* <FadeInImage
//     fill
//     priority
//     alt="Gradient background"
//     src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/backgrounds/bg-gradient.png"
//   /> */}
// </div>
