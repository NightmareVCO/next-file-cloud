import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const allFilesRoute = createRouteMatcher(["/dashboard/files"]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware((auth, request) => {
  // Restrict admin route to users with specific role
  if (isAdminRoute(request)) auth().protect({ role: "org:admin" });

  // Restrict dashboard routes to signed in users
  if (allFilesRoute(request)) auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    // eslint-disable-next-line unicorn/prefer-string-raw
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
