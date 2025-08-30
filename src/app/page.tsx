"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function HomePage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "login-required") {
      toast.error("Please log in to continue.");
    } else if (message === "already-logged-in") {
      toast.success("You are already logged in!");
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to Auth App
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Sign up quickly using your favorite account.
        </p>

        <div className="flex flex-col gap-4">
          {/* Google Button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/profile" })}
            type="button"
            className="bg-red-700 hover:bg-red-700/70 text-white focus:ring-4 focus:outline-none focus:ring-red-700/50 font-medium rounded-lg text-sm sm:text-base px-5 py-3 inline-flex items-center justify-center transition-colors duration-200 cursor-pointer"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.65 1.22 8.66 3.58l6.33-6.33C34.6 2.48 29.59 0 24 0 14.84 0 7.04 5.7 3.74 13.78l7.36 5.72C12.75 13.13 17.87 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.49 24.1c0-1.62-.14-3.18-.38-4.7H24v9h12.76c-.55 2.9-2.2 5.37-4.66 7.04l7.18 5.6C44.18 36.55 46.49 30.71 46.49 24.1z" />
              <path fill="#FBBC05" d="M11.1 28.5c-.5-1.48-.78-3.07-.78-4.7s.28-3.22.78-4.7L3.74 13.78C1.37 17.3 0 21.46 0 24s1.37 6.7 3.74 10.22l7.36-5.72z" />
              <path fill="#34A853" d="M24 48c6.59 0 12.6-2.18 17.33-5.93l-7.18-5.6c-2.1 1.42-4.75 2.27-8.15 2.27-6.13 0-11.25-3.63-13.9-8.88l-7.36 5.72C7.04 42.3 14.84 48 24 48z" />
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="mx-3 text-gray-500 dark:text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Links */}
          <Link
            href="/login"
            className="w-full py-2 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-md transition cursor-pointer"
          >
            Already have an account? Login
          </Link>

          <Link
            href="/signup"
            className="w-full py-2 px-6 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-md transition cursor-pointer"
          >
            Sign up using Email
          </Link>
        </div>
      </div>
    </div>
  );
}
