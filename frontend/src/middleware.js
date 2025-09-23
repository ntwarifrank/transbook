import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define routes that should be protected (require authentication)
const isProtectedRoute = createRouteMatcher([
  '/profile(.*)', // Protect the user profile page
  '/api/translate(.*)', // Protect translation API
  '/api/user(.*)', // Protect user-related APIs
  '/api/progress(.*)', // Protect progress API
  '/api/download(.*)', // Protect download API
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth.protect();
  }
});

export const config = {
  // The following matcher ensures that the middleware runs on all routes
  // except for static assets and other Next.js internals.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
