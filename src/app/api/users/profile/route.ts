import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // session.user contains info from JWT (name, email, id)
        return NextResponse.json({ user: session.user });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to load profile" }, { status: 500 });
    }
}
