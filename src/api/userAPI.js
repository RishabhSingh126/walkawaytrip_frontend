import axios from "axios";
import { COMPLETE_PROFILE_ROUTE, GET_USER_ROUTE } from "@/utils/ApiRoutes";

// Function to send a PUT request to the server and complete the user profile
export const completeProfile = async (userId, data) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("No token found. Unauthorized request.");
        }

        const response = await axios.put(`${COMPLETE_PROFILE_ROUTE}/${userId}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Complete profile API error:", error);
        throw new Error(error.response?.data?.message || "Complete profile failed");
    }
};

// Function to send a GET request to the server and get the user
export const getUser = async () => {
    try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        if (!token) {
            throw new Error("No token found. Unauthorized request.");
        }

        const response = await axios.get(`${GET_USER_ROUTE}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.user;
    } catch (error) {
        console.error("Get user API error:", error);
        throw new Error(error.response?.data?.message || "Get user failed");
    }
}