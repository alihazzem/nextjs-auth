"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        setLoading(true);
        try {
            await toast.promise(
                axios.post("/api/users/signup/", user),
                {
                    loading: "Creating your account...",
                    success: "Account created successfully 🎉 Redirecting...",
                    error: (err) =>
                        err.response?.data?.error || err.message || "Signup failed",
                }
            );

            // redirect after 2s if signup was successful
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 mx-w-md mx-auto">
            <h1 className="text-3xl font-bold dark:text-white mb-5">
                {loading ? "Processing" : "Sign Up"}
            </h1>
            <div className="relative z-0 w-1/2 sm:w-1/3 md:w-1/4 mb-5 group">
                <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    type="text"
                    id="username"
                    value={user.username}
                    placeholder=""
                    required
                    autoComplete="username"
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="username"
                >
                    Username</label>
            </div>
            <div className="relative z-0 w-1/2 sm:w-1/3 md:w-1/4 mb-5 group">
                <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    type="email"
                    id="email"
                    value={user.email}
                    placeholder=""
                    required
                    autoComplete="email"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="email"
                >
                    Email</label>
            </div>
            <div className="relative z-0 w-1/2 sm:w-1/3 md:w-1/4 mb-5 group">
                <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    type="password"
                    id="password"
                    value={user.password}
                    placeholder=""
                    required
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="email"
                >
                    Password</label>
            </div>
            <button
                onClick={onSignup}
                type="button"
                disabled={buttonDisabled}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5 cursor-pointer w-1/2 sm:w-1/3 md:w-1/4 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none">
                {buttonDisabled ? "Please fill all the fields" : "Sign Up"}
            </button>
            <p className="text-sm text-gray-700 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>
    );
}

