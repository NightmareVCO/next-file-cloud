"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
