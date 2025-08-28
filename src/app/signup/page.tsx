"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { signupSchema, type SignupSchemaType } from "@/lib/zod/zodSchema";
import { validate } from "@/lib/zod/zodValidate";

export default function SignupPage() {
    const [user, setUser] = useState<SignupSchemaType>({
        username: "",
        email: "",
        password: "",
    });

    const router = useRouter();

    const onSignup = async () => {
        const validation = validate(signupSchema, user);

        if (!validation.success) {
            const errors = validation.errors;

            if (errors?.username) toast.error(errors?.username);
            if (errors?.email) toast.error(errors?.email);
            if (errors?.password) toast.error(errors?.password);

            return;
        }

        try {
            await toast.promise(
                axios.post("/api/users/signup/", user),
                {
                    loading: "Creating your account...",
                    success: "Account created successfully 🎉 Redirecting...",
                    error: (err) => err.response?.data?.error || err.message || "Signup failed",
                }
            );
            router.push("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold dark:text-white mb-6 text-center">
                    Sign Up
                </h1>

                {/* Username */}
                <div className="relative z-0 mb-5 group">
                    <input
                        type="text"
                        id="username"
                        value={user.username}
                        required
                        autoComplete="name"
                        placeholder=" "
                        className="block w-full py-2.5 px-0 text-sm sm:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                    <label
                        htmlFor="username"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
                    >
                        Username
                    </label>
                </div>

                {/* Email */}
                <div className="relative z-0 mb-5 group">
                    <input
                        type="email"
                        id="email"
                        value={user.email}
                        required
                        autoComplete="email"
                        placeholder=" "
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
                        required
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
                    onClick={onSignup}
                    type="button"
                    className="w-full px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-blue cursor-pointer"
                >
                    Sign Up
                </button>

                {/* Footer */}
                <p className="mt-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
