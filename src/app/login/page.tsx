"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { loginSchema, type LoginSchemaType } from "@/lib/zod/zodSchema";
import { validate } from "@/lib/zod/zodValidate";
import { checkAuthClient } from "@/lib/chechAuthClient";

export default function LoginPage() {
    const [user, setUser] = useState<LoginSchemaType>({ email: "", password: "" });
    const router = useRouter();

    useEffect(() => {
        async function verifyAuth() {
            if (await checkAuthClient()) router.push("/profile");
        }
        verifyAuth();
    }, [router]);

    const onLogin = async () => {
        const validation = validate(loginSchema, user);

        if (!validation.success) {
            const errors = validation.errors;
            if (errors?.email) toast.error(errors?.email);
            if (errors?.password) toast.error(errors?.password);
            return;
        }

        try {
            await toast.promise(
                axios.post("/api/users/login/", user),
                {
                    loading: "Logging in...",
                    success: "Logged in successfully 🎉 Redirecting...",
                    error: (err) =>
                        err.response?.data?.error || err.message || "Login failed",
                }
            );
            router.push("/profile");
        } catch (error) {
            console.error(error);
            toast.error("Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold dark:text-white mb-6 text-center">
                    Login
                </h1>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onLogin();
                    }}
                >
                    {/* Email */}
                    <div className="relative z-0 mb-5 group">
                        <input
                            type="text"
                            id="email"
                            value={user.email}
                            placeholder=" "
                            autoComplete="email"
                            className="block w-full py-2.5 px-0 text-sm sm:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        <label
                            htmlFor="email"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
                        >
                            Email
                        </label>
                    </div>

                    {/* Password */}
                    <div className="relative z-0 mb-6 group">
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            placeholder=" "
                            className="block w-full py-2.5 px-0 text-sm sm:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <label
                            htmlFor="password"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
                        >
                            Password
                        </label>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
