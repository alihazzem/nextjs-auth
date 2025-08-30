"use client";

import { SessionProvider } from "next-auth/react";
import ToasterProvider from "./reactToaster";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
            <ToasterProvider />
        </SessionProvider>
    );
}
