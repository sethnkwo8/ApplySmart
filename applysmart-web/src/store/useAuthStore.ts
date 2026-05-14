// Auth Zustand store file
import { create } from "zustand";
import { getUser, signInUser, logoutUser } from "@/lib/api/auth";
import { AuthState } from "@/types/auth";

// Initialize the store
export const useAuthStore = create<AuthState>((set) => ({
    user: null, // When app first boots up nobody is logged in
    isLoading: true, // Start as true to show loading state

    // Login action
    login: async (formData) => {
        // Set loading state to true
        set({isLoading: true});
        try {
            const data = await signInUser(formData);
            set({user: data.user, isLoading: false}); // set user to signed in user and loading state to false
        } catch(err) {
            set({isLoading: false});
            throw err;
        }
    },

    // Check auth action
    checkAuth: async() => {
        // Set loading state to true
        set({isLoading: true})
        try{
            const data = await getUser(); // Get user data
            set({user: data.user, isLoading: false}) // Set user data and loading state to false
        } catch(err) {
            set({user: null, isLoading: false}) // Set user data to null and loading state to false
        }
    },

    // Logout user action
    logout: async() => {
        // Set loading state to true
        try{
            await logoutUser();
            set({user: null}) // Set user to null
        } catch(err) {
            console.error("Logout failed:", err)
        }
    }
}))