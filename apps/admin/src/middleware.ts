import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { CustomJwtSessionClaims } from "@repo/types";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/unauthorized(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();

    const { userId, sessionClaims } = await auth();

    if (userId && sessionClaims) {
      // Add these debug logs
      console.log('=== CLERK DEBUG ===');
      console.log('userId:', userId);
      console.log('sessionClaims:', JSON.stringify(sessionClaims, null, 2));
      console.log('publicMetadata:', sessionClaims.publicMetadata);

      const userRole = (sessionClaims as CustomJwtSessionClaims).metadata?.role;

      console.log('Extracted role:', userRole);
      console.log('=================');

      if (userRole !== "admin") {
        return Response.redirect(new URL("/unauthorized", req.url));
      }
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};