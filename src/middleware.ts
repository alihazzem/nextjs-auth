import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPaths = path === "/login" || path === "/signup" || path === "/";
    const token = request.cookies.get("token")?.value;

    if (isPublicPaths && token) {
        const url = new URL("/profile", request.url);
        url.searchParams.set("message", "already-logged-in");
        return NextResponse.redirect(url);
    } else if (!isPublicPaths && !token) {
        const url = new URL("/", request.url);
        url.searchParams.set("message", "login-required");
        return NextResponse.redirect(url);
    }
};

export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/profile",
    ]
};