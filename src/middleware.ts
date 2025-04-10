import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(async function middleware() {}, {
  publicPaths: ["/", "/contact", "/about", "/billing", "/signup-choice"],

  loginPage: "/signup-choice",
});

export const config = {
  matcher: [
    // Skip _next, static files, AND any /api/* routes
    "/((?!_next|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|pdf?|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
