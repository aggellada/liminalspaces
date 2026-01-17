import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const cookieName = "liminal_user_id";

  const FOUR_HOURS_IN_SECONDS = 4 * 60 * 60;

  if (!request.cookies.has(cookieName)) {
    const newId = crypto.randomUUID();

    response.cookies.set(cookieName, newId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: FOUR_HOURS_IN_SECONDS,
    });

    // 4. CRITICAL: Also add it to the request headers so the
    // Server Component sees it on this very first load
    response.headers.set("x-liminal-user-id", newId);
  }

  return response;
}

// Optimization: Only run on the home page or specific routes
export const config = {
  matcher: ["/zone"],
};
