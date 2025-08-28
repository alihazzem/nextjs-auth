"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [user, setUser] = useState({ email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const router = useRouter();

    const onLogin = async () => {
        const response = await toast.promise(
            axios.post("/api/users/login/", user),
            {
                loading: "Logging in...",
                success: "User logged in successfully 🎉 Redirecting...",
                error: (err) =>
                    err.response?.data?.error || err.message || "Login failed",
            }
        );

        setTimeout(() => {
            router.push(`/profile/${response.data.user.username}`);
        }, 2000);
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password));
    }, [user]);

    return (
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold dark:text-white mb-6 text-center">
                    Login
                </h1>

                {/* Email */}
                <div className="relative z-0 mb-5 group">
                    <input
                        type="email"
                        id="email"
                        value={user.email}
                        required
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
                    onClick={onLogin}
                    type="button"
                    disabled={buttonDisabled}
                    className="w-full px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    {buttonDisabled ? "Please fill all the fields" : "Login"}
                </button>

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
};