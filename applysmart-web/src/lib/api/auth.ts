// API for auth routes
import { SigninFormType, SignupFormType } from "@/types/auth";

// Sign up user api function
export async function signUpUser(formData: SignupFormType) {
    const {confirmPassword, ...signUpData} = formData
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiURL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signUpData)
    })

    if (!res.ok) {
        const errorData = await res.json();
        throw errorData
    }

    return await res.json()
}

// Sign in user api function
export async function signInUser(formData: SigninFormType) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiURL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    if (!res.ok) {
        const errorData = await res.json();
        throw errorData
    }

    return await res.json()
}

// Get user api function
export async function getUser() {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiURL}/auth/me`, {
        method: "GET",
        credentials: "include"
    })

    if (!res.ok) {
        const errorData = await res.json()
        throw errorData
    }

    return await res.json()
}

// Logout user api function
export async function logoutUser() {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiURL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    })

    if (!res.ok) {
        const errorData = await res.json()
        throw errorData
    }

    return await res.json()
}