"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        // global defaults (optional)
        duration: 3500,
        success: { duration: 2500 },
        error: { duration: 4000 },
      }}
    />
  );
}