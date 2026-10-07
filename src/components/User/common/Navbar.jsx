import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import { AUTH_ACTIONS } from '@/context/constants';
import AuthContext from '@/context/AuthContext';
import { logout } from '@/api/authAPI';
import { getUser } from '@/api/userAPI';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { state, dispatch } = useContext(AuthContext);
    const [user, setUser] = useState(state.user); // Use context user for bypass
    const navigate = useNavigate();

    console.log("User:", user);
    const isAuthenticated = !!state.user;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: { token } });

            // Fetch user details
            getUser()
                .then((data) => setUser(data))
                .catch((err) => console.error("Failed to fetch user:", err));
        }
    }, [dispatch]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await logout(token);

            if (response.success) {
                localStorage.removeItem("token");
                dispatch({ type: AUTH_ACTIONS.LOGOUT });
                toast.success("Logged out successfully!");
                navigate("/");
                setUser(null); // Clear user state on logout
            } else {
                throw new Error("Logout failed. Please try again.");
            }
        } catch (error) {
            toast.error(error.message || "Failed to log out.");
            console.error("Logout Error:", error);
        }
    };

    return (
        <nav className="absolute top-0 left-0 w-full bg-white shadow-md p-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <img src="/vite.svg" alt="logo" className='h-10' />

                <div className="hidden md:flex space-x-4 items-center">
                    <input
                        type="text"
                        placeholder="Search destinations or activities"
                        className="px-4 py-2 border rounded-full w-64 md:w-80 lg:w-96 focus:outline-none"
                    />

                    {!isAuthenticated ? (
                        <>
                            <Link to="/auth/sign-up">
                                <button className="px-4 py-2 bg-white text-gray-700 rounded-full cursor-pointer">
                                    Sign up
                                </button>
                            </Link>
                            <Link to="/auth/sign-in">
                                <button className="px-4 py-2 bg-[#005fad] text-white rounded-full cursor-pointer">
                                    Log in
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/main">
                                <button className="px-4 py-2 bg-[#005fad] text-white rounded-full hover:bg-blue-700 transition-all font-semibold shadow-md cursor-pointer">
                                    Go to Dashboard
                                </button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500/10 text-red-600 rounded-full hover:bg-red-500 hover:text-white transition-all cursor-pointer border border-red-200"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden flex flex-col items-center space-y-3 mt-4">
                    <input
                        type="text"
                        placeholder="Search destinations..."
                        className="px-4 py-2 border rounded-md w-10/12 focus:outline-none"
                    />

                    {!isAuthenticated ? (
                        <>
                            <Link to="/auth/sign-up">
                                <button className="w-full px-4 py-2 bg-[#005fad] text-white rounded-full">
                                    Sign up
                                </button>
                            </Link>
                            <Link to="/auth/sign-in">
                                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-full">
                                    Log in
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className="flex flex-col items-center space-y-4">
                            <Link to="/main" className="w-10/12">
                                <button className="w-full px-4 py-2 bg-[#005fad] text-white rounded-full">
                                    Go to Dashboard
                                </button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-10/12 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};
