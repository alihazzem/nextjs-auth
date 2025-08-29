"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

type UserType = {
    username: string;
    email?: string;
};

export default function ProfilePage() {
    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            try {
                await toast.promise(
                    axios.get("/api/users/profile", { withCredentials: true }),
                    {
                        loading: "Loading your profile...",
                        success: "Profile loaded!",
                        error: "Failed to load profile",
                    }
                ).then((res) => setUser(res.data.user));
            } catch (err) {
                router.push("/login");
            }
        }

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        try {
            await toast.promise(
                axios.get("/api/users/logout", { withCredentials: true }),
                {
                    loading: "Logging out...",
                    success: "Logged out successfully 🎉",
                    error: "Logout failed",
                }
            );
            router.push("/login");
        } catch (err) {
            console.error(err);
            toast.error("Logout failed");
        }
    };

    if (!user) return null;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-lg bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 text-center">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome, <span className="text-blue-600 dark:text-blue-400">{user.username}</span> 🎉
                </h1>
                {user.email && <p className="text-gray-600 dark:text-gray-300 mb-6">{user.email}</p>}
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
