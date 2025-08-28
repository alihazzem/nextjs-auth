import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        };

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            );
        };

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true,
            user,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}   