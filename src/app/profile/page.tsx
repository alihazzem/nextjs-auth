"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Show toast for already-logged-in message
    useEffect(() => {
        const message = searchParams.get("message");
        if (message === "already-logged-in") {
            toast.success("You are already logged in!");
        }
    }, [searchParams]);

    // Redirect if unauthenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading profile...</p>
            </div>
        );
    }

    const user = session?.user;

    if (!user) return null;

    const handleLogout = () => {
        signOut({ callbackUrl: "/" });
        toast.success("Logged out successfully 🎉");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-lg bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 text-center">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome, <span className="text-blue-600 dark:text-blue-400">{user.name}</span> 🎉
                </h1>
                {user.email && (
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Email: {user.email}</p>
                )}
                {user.image && (
                    <Image
                        src={user.image}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="rounded-full mx-auto mb-6"
                    />
                )}
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Here you can manage your account and settings.
                </p>

                <button
                    onClick={handleLogout}
                    className="w-full py-2 px-6 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium shadow-md transition cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
