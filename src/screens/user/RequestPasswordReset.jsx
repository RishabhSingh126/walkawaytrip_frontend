import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { requestPasswordReset } from "@/api/authAPI";
import { Loader2 } from "lucide-react";

const RequestPasswordReset = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email.");
            return;
        }

        setLoading(true);
        try {
            const response = await requestPasswordReset(email);
            toast.success(response.message);
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
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                        {loading ? <Loader2 className="mx-auto animate-spin" /> : "Send Reset Email"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/auth/sign-in" className="text-blue-600 hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RequestPasswordReset;