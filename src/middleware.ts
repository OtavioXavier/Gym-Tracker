import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isExercisesRoute = createRouteMatcher(['/exercises(.*)']);
const isPlansRoute = createRouteMatcher(['/dashboard(.*)']);
const isDashboardRoute = createRouteMatcher(['/plans(.*)']);
const isWorkoutRoute = createRouteMatcher(['/workout(.*)']);

export default clerkMiddleware((auth, req) => {
  // Restrict admin route to users with specific role
  // if (isAdminRoute(req)) auth().protect({ role: 'org:admin' });

  // Restrict dashboard routes to signed in users
  if (isExercisesRoute(req)) auth().protect();
  if (isPlansRoute(req)) auth().protect();
  if (isDashboardRoute(req)) auth().protect();
  if (isWorkoutRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};