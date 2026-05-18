// Auth Provider component
"use client"

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function AuthProvider({children}: {children: React.ReactNode}) {
    // Get checkAuth action from useAuthStore
    const checkAuth = useAuthStore((state) => state.checkAuth)

    // useEffectthat runs on mount
    useEffect(() => {
        checkAuth()
    }, [])
    return <>{children}</>
}