import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/lib/zod/zodSchema";

connectToDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const validation = signupSchema.safeParse(reqBody);
        if (!validation.success) {
            const errors: Record<string, string[]> = {};
            validation.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                if (!errors[field]) errors[field] = [];
                errors[field].push(issue.message);
            });

            return NextResponse.json(
                { errors },
                { status: 400 }
            );
        }

        const { username, email, password } = validation.data;

        // Check if user exists
        const userExists = await User.findOne(
            { $or: [{ username }, { email }] });
        if (userExists) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password and create user
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified,
                isAdmin: user.isAdmin
            }
        });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json(
            { errors: { general: [message] } },
            { status: 500 }
        );
    }
}
