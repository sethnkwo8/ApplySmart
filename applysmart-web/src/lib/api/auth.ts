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

    const data = await res.json();

    if (!res.ok) {
        throw data
    }

    return data
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

    const data = await res.json();

    if (!res.ok) {
        throw data
    }

    return data
}

// Get user api function
export async function getUser() {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiURL}/auth/me`, {
        method: "GET",
        credentials: "include"
    })

    const data = await res.json();

    if (!res.ok) {
        throw data
    }

    return data
}

// Logout user api function
export async function logoutUser() {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiURL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    })

    const data = await res.json();

    if (!res.ok) {
        throw data
    }

    return data
}

// Refresh token api function
export async function refreshToken() {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiURL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    })

    const data = await res.json();

    if (!res.ok) {
        throw data
    }

    return data
}

// Google auth login api function
export async function googleLogin(idToken: string) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiURL}/auth/google`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({idToken})
    })

    const data = await res.json()

    if (!res.ok) {
        throw data
    }

    return data
}