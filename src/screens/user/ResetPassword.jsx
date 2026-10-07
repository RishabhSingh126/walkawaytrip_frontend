import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "@/api/authAPI";
import { Loader2 } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const response = await resetPassword(newPassword, token);
            toast.success(response.message);
            navigate("/auth/sign-in");
        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* New Password Field */}
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 pr-10"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {newPassword.length > 0 && newPassword.length < 8 && (
                            <p className="text-red-500 text-sm mt-1">
                                Password must be at least 8 characters.
                            </p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 pr-10"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
                        disabled={loading || newPassword.length < 8 || confirmPassword.length < 8}
                    >
                        {loading ? <Loader2 className="mx-auto animate-spin" /> : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;