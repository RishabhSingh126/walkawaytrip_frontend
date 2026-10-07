import { createContext, useReducer, useEffect } from "react"; // Import createContext, useReducer, useEffect
import authReducer from "./authReducers"; // Import the authReducer function
import { getUser } from "@/api/userAPI";
import { AUTH_ACTIONS } from "./constants";

const AuthContext = createContext(); // Create a new context

export const AuthProvider = ({ children }) => {
    let storedUser = null;
    try {
        const u = localStorage.getItem("user");
        if (u) {
            storedUser = JSON.parse(u);
        }
    } catch (e) {
        console.error("Failed to parse stored user", e);
    }

    const initialState = {
        user: storedUser || null, // User object to store user details
        loading: false, // Loading state to show loading spinner
        error: null, // Error state to show error message
    };

    // Use the useReducer hook to create a state and dispatch function
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Fetch user from DB if token exists to ensure fresh data
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const userData = await getUser();
                    dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: userData });
                } catch (error) {
                    console.error("Failed to fetch user from DB on load", error);
                }
            }
        };
        fetchUser();
    }, []);

    // Idle Timeout Auto-Logout Mechanism (1 hour)
    useEffect(() => {
        let timeoutId;

        const handleLogout = () => {
            dispatch({ type: AUTH_ACTIONS.LOGOUT });
            localStorage.removeItem("token");
            // Redirect to login page
            window.location.href = "/auth/sign-in";
        };

        const resetTimeout = () => {
            clearTimeout(timeoutId);
            // 3600000 ms = 1 hour
            timeoutId = setTimeout(handleLogout, 3600000);
        };

        if (state.user) {
            // Attach event listeners for user activity
            window.addEventListener("mousemove", resetTimeout);
            window.addEventListener("keydown", resetTimeout);
            window.addEventListener("scroll", resetTimeout);
            window.addEventListener("click", resetTimeout);

            // Initialize the timer
            resetTimeout();
        }

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("mousemove", resetTimeout);
            window.removeEventListener("keydown", resetTimeout);
            window.removeEventListener("scroll", resetTimeout);
            window.removeEventListener("click", resetTimeout);
        };
    }, [state.user, dispatch]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
