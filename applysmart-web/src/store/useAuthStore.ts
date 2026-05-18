// Auth Zustand store file
import { create } from "zustand";
import { signInUser, logoutUser, refreshToken, googleLogin } from "@/lib/api/auth";
import { AuthState } from "@/types/auth";

// Initialize the store
export const useAuthStore = create<AuthState>((set) => ({
    user: null, // When app first boots up nobody is logged in
    accessToken: null,
    isLoading: true, // Start as true to show loading state

    // Login action
    login: async (formData) => {
        // Set loading state to true
        set({isLoading: true});
        try {
            const data = await signInUser(formData);
            set({user: data.user, accessToken: data.accessToken, isLoading: false}); // set user to signed in user and loading state to false
            return data.user; // Return data for toast success
        } catch(err) {
            set({isLoading: false});
            throw err;
        }
    },
    // Google login action
    loginWithGoogle: async (idToken) => {
        // Set loading state to true
        set({isLoading: true});
        try{
            const data = await googleLogin(idToken);
            set({user: data.user, accessToken: data.accessToken, isLoading:false});
            return data.user
        } catch(err) {
            set({isLoading: false});
            throw err;
        }
    },
    // Set user action
    setUser: (user) => (set({user})),

    // Refresh access token action
    refresh: async() => {
        try{
            const data = await refreshToken();
            // Set access token and user
            set({
                accessToken: data.accessToken,
                user: data.user
            })
        } catch(err) {
            set({user: null, accessToken: null})
        }
    },

    // Check auth action
    checkAuth: async() => {
        // Set loading state to true
        set({isLoading: true})
        try{
            const data = await refreshToken(); // Get user data
            set({user: data.user, accessToken: data.accessToken, isLoading: false}) // Set user data and loading state to false
        } catch(err) {
            set({user: null, accessToken: null, isLoading: false}) // Set user data to null and loading state to false
        }
    },

    // Logout user action
    logout: async() => {
        // Set loading state to true
        set({isLoading: true})
        try{
            await logoutUser();
            set({user: null, accessToken: null, isLoading: false}) // Set user to null
        } catch(err) {
            console.error("Logout failed:", err)
            set({ user: null, accessToken: null, isLoading: false });
        }
    }
}))