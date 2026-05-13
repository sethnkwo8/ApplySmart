// API for auth routes
import { SigninFormType, SignupFormType } from "@/types/auth";

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

export async function signInUser(formData: SigninFormType) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiURL}/auth/login`, {
        method: "POST",
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