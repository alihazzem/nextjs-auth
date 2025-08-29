"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleOAuthRedirect = (provider: "google" | "apple") => {
    router.push(`/auth/${provider}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to MyApp
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Sign up quickly using your favorite account.
        </p>

        <div className="flex flex-col gap-4">

          {/* Apple Button */}
          <button
            aria-label="Sign in with Apple"
            onClick={() => handleOAuthRedirect("apple")}
            type="button"
            className="text-white bg-black hover:bg-black/70 focus:ring-4 focus:outline-none focus:ring-black/50 font-medium rounded-lg text-sm sm:text-base px-5 py-3 inline-flex items-center justify-center transition-colors duration-200 cursor-pointer"
          >
            <svg
              className="w-5 h-5 mr-2"
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
              />
            </svg>
            Sign up with Apple
          </button>

          {/* Google Button */}
          <button
            onClick={() => handleOAuthRedirect("google")}
            type="button"
            className="bg-red-700 hover:bg-red-700/70 text-white ffocus:ring-4 focus:outline-none focus:ring-red-700/50 font-medium rounded-lg text-sm sm:text-base px-5 py-3 inline-flex items-center justify-center transition-colors duration-200 cursor-pointer">

            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48">
              <path
                fill="#EA4335"  // Red part
                d="M24 9.5c3.54 0 6.65 1.22 8.66 3.58l6.33-6.33C34.6 2.48 29.59 0 24 0 14.84 0 7.04 5.7 3.74 13.78l7.36 5.72C12.75 13.13 17.87 9.5 24 9.5z" />
              <path
                fill="#4285F4"  // Blue
                d="M46.49 24.1c0-1.62-.14-3.18-.38-4.7H24v9h12.76c-.55 2.9-2.2 5.37-4.66 7.04l7.18 5.6C44.18 36.55 46.49 30.71 46.49 24.1z" />
              <path
                fill="#FBBC05"  // Yellow
                d="M11.1 28.5c-.5-1.48-.78-3.07-.78-4.7s.28-3.22.78-4.7L3.74 13.78C1.37 17.3 0 21.46 0 24s1.37 6.7 3.74 10.22l7.36-5.72z" />
              <path
                fill="#34A853"  // Green
                d="M24 48c6.59 0 12.6-2.18 17.33-5.93l-7.18-5.6c-2.1 1.42-4.75 2.27-8.15 2.27-6.13 0-11.25-3.63-13.9-8.88l-7.36 5.72C7.04 42.3 14.84 48 24 48z" />
            </svg>

            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}
