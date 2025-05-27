import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
const isprotectedroute=createRouteMatcher([
    "/dashboard(.*)",
    "/Resume(.*)",
    "/Interview(.*)",
    "/Cover(.*)",
    "onboarding(.*)",
])
//(.*) amything comes after it will be counted as private route only
export default clerkMiddleware(async(auth,req)=>{
    const {userId} =await auth();
    if(!userId && isprotectedroute(req)){
        const {redirectToSignIn} =await auth();
        return redirectToSignIn();
    }
    return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};