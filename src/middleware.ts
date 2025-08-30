import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPaths = ["/", "/login", "/signup"].includes(path);

    // Check NextAuth session cookie
    const sessionToken =
        request.cookies.get("__Secure-next-auth.session-token")?.value || // HTTPS
        request.cookies.get("next-auth.session-token")?.value; // HTTP/dev

    if (isPublicPaths && sessionToken) {
        // Logged-in user trying to access public pages
        const url = new URL("/profile", request.url);
        url.searchParams.set("message", "already-logged-in");
        return NextResponse.redirect(url);
    } else if (!isPublicPaths && !sessionToken) {
        // Logged-out user trying to access protected pages
        const url = new URL("/", request.url);
        url.searchParams.set("message", "login-required");
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ["/", "/login", "/signup", "/profile"],
};
