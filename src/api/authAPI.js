import axios from "axios";
import { SIGNUP_USER_ROUTE, VERIFY_EMAIL_ROUTE, LOGIN_USER_ROUTE, LOGOUT_USER_ROUTE, GOOGLE_SIGNIN_ROUTE, REQUEST_PASSWORD_RESET_ROUTE, RESET_PASSWORD_ROUTE } from "@/utils/ApiRoutes";

// Function to send a POST request to the server and sign up a new user
export const signup = async (userData) => {
    const response = await axios.post(`${SIGNUP_USER_ROUTE}`, userData);
    return response.data;
};

// Function to send a POST request to the server and sign in a user using Google
export const googleSignIn = async (userData) => {
    const response = await axios.post(`${GOOGLE_SIGNIN_ROUTE}`, userData);
    return response.data;
};

// Function to send a POST request to the server and verify a user's email
export const verifyEmail = async (email, otp) => {
    const response = await axios.post(`${VERIFY_EMAIL_ROUTE}`, { email, otp });
    return response.data;
};

// Function to send a POST request to the server and log in a user
export const login = async (userData) => {
    const response = await axios.post(`${LOGIN_USER_ROUTE}`, userData);
    return response.data;
};

export const requestPasswordReset = async (email) => {
    const response = await axios.post(`${REQUEST_PASSWORD_RESET_ROUTE}`, { email });
    return response.data;
}

export const resetPassword = async (newPassword, token) => {
    const response = await axios.post(`${RESET_PASSWORD_ROUTE}`, { newPassword, token });
    return response.data;
}

// Function to send a POST request to the server and log out a user
export const logout = async () => {
    try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        if (!token) {
            throw new Error("No token found. Unauthorized request.");
        }

        const response = await axios.post(`${LOGOUT_USER_ROUTE}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Logout API error:", error);
        throw new Error(error.response?.data?.message || "Logout failed");
    }
};