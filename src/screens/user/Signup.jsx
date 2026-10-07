// Images
import bgsignup from "@/assets/image/Signup/image.png";
import taj from "@/assets/image/Signup/taj.png";
import group from "@/assets/image/Signup/Group.png";
import plane from "@/assets/image/Signup/plane.png";

import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
// import { FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthContext from "@/context/AuthContext";
import { googleSignIn, signup } from "@/api/authAPI";
import { AUTH_ACTIONS } from "@/context/constants";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { signInWithGoogle } from "@/firebase";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showOtpSection, setShowOtpSection] = useState(false);
    const [otp, setOtp] = useState("");

    const navigate = useNavigate();

    const { state, dispatch } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error when user types
    };

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    // Google Sign-in
    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            dispatch({ type: AUTH_ACTIONS.LOGIN_REQUEST });

            const user = await signInWithGoogle();

            const userData = {
                name: user.displayName,
                email: user.email,
                googleId: user.uid,
                avatarUrl: user.photoURL,
            };

            const response = await googleSignIn(userData);
            dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: response.user });
            localStorage.setItem("token", response.token);
            toast.success(`Welcome ${user.displayName}!`);
            navigate("/user/welcome");
        } catch (error) {
            console.error(error.message || "Google Sign-in Error", error);
            toast.error(error.message || "Google Sign-in Failed");
            dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: error.message || "Google Sign-in Failed" });
        } finally {
            setIsGoogleLoading(false);
        }
    };

    // Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setError("Please enter a valid email address.");
            toast.error("Please enter a valid email address.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            toast.error("Password must be at least 8 characters long.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            toast.error("Passwords do not match!");
            return;
        }

        try {
            dispatch({ type: AUTH_ACTIONS.SIGNUP_REQUEST });
            const userData = await signup(formData);
            dispatch({ type: AUTH_ACTIONS.SIGNUP_SUCCESS, payload: userData.user });
            toast.success("Signup successful. Please check your email for the OTP.");
            setShowOtpSection(true);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Signup failed";
            dispatch({ type: AUTH_ACTIONS.SIGNUP_ERROR, payload: errorMessage });
            toast.error(errorMessage);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        
        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            toast.error("Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            dispatch({ type: AUTH_ACTIONS.LOGIN_REQUEST });
            const data = await import('@/api/authAPI').then(m => m.verifyEmail(formData.email, otp));
            
            dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: data.user });
            localStorage.setItem("token", data.token);
            
            toast.success("Email verified successfully!");
            navigate("/user/welcome");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "OTP verification failed";
            dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: errorMessage });
            toast.error(errorMessage);
        }
    };

    const isFormValid =
        formData.name &&
        validateEmail(formData.email) &&
        formData.password.length >= 8 &&
        formData.confirmPassword.length >= 8;

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left Section */}
            <div className="hidden md:block md:w-1/2 relative">
                <img
                    src={bgsignup}
                    alt="Travelista Tours"
                    className="w-full h-full object-cover z-0"
                />
                <div className="absolute top-24 left-[10%] lg:left-[22%] text-white text-[32px] md:text-[22px] md:text-[44px] font-bold custom-font">
                    Travelista Tours
                </div>
                <div className="absolute top-40 left-[10%] lg:left-[22%] text-white text-md md:text-lg max-w-sm text-center">
                    Travel is the only purchase that enriches you in ways beyond material wealth.
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-8 bg-white relative">
                <h2 className="text-[24px] md:text-[48px] md:text-[37px] md:text-[74px] font-bold text-[#007CAD]">Welcome</h2>
                <img src={plane} alt="plane" className="hidden md:block absolute top-7 right-1 max-w-[193px] w-full" />
                <p className="text-gray-600 text-center">
                    {showOtpSection ? "Verify your Email" : "Create your Account"}
                </p>

                {!showOtpSection ? (
                    <form onSubmit={handleSubmit} className="w-full max-w-xs md:max-w-sm mt-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm text-[#007CAD]">
                                Full Name*
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border rounded"
                                required
                            />

                            <label htmlFor="email" className="text-sm text-[#007CAD]">
                                Email*
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border rounded"
                                required
                            />

                            {/* Password Field */}
                            <label htmlFor="password" className="text-sm text-[#007CAD]">
                                Password*
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded pr-10"
                                    required
                                />
                                <span
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm">Must be at least 8 characters.</p>

                            {/* Confirm Password Field */}
                            <label htmlFor="confirmPassword" className="text-sm text-[#007CAD]">
                                Confirm Password*
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded pr-10"
                                    required
                                />
                                <span
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <p className="pb-5 text-gray-500 text-sm">Must be at least 8 characters.</p>
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className={`w-full sm:w-2/3 md:w-1/2 p-3 rounded text-white text-lg uppercase ${isFormValid
                                    ? "bg-[#007cad] hover:bg-[#005f8c] cursor-pointer"
                                    : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                disabled={!isFormValid || state.loading}
                            >
                                {state.loading ? (
                                    <Loader2 className="mx-auto animate-spin text-white" size={24} />
                                )
                                    : "Register"
                                }
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="w-full max-w-xs md:max-w-sm mt-4">
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-gray-600 text-center mb-2">
                                We've sent a 6-digit code to <strong>{formData.email}</strong>. Please enter it below to verify your account.
                            </p>
                            
                            <label htmlFor="otp" className="text-sm text-[#007CAD]">
                                Verification Code*
                            </label>
                            <input
                                id="otp"
                                type="text"
                                name="otp"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => {
                                    setOtp(e.target.value);
                                    setError("");
                                }}
                                className="w-full p-3 border rounded text-center text-xl tracking-widest font-bold"
                                maxLength={6}
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-red-500 text-sm my-4 text-center">{error}</p>}

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className={`w-1/2 p-3 rounded text-white text-lg uppercase ${otp.length === 6
                                    ? "bg-[#007cad] hover:bg-[#005f8c] cursor-pointer"
                                    : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                disabled={otp.length !== 6 || state.loading}
                            >
                                {state.loading ? (
                                    <Loader2 className="mx-auto animate-spin text-white" size={24} />
                                )
                                    : "Verify"
                                }
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <button 
                                type="button"
                                onClick={() => setShowOtpSection(false)}
                                className="text-sm text-gray-500 hover:underline cursor-pointer"
                            >
                                Back to Registration
                            </button>
                        </div>
                    </form>
                )}

                <div className="my-4 text-gray-500">OR</div>

                {/* Social Media Login Buttons */}
                <div className="flex gap-3">
                    <div className="flex gap-3">
                        <button
                            onClick={handleGoogleSignIn}
                            className="p-3 border rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center w-24 h-12 cursor-pointer"
                            disabled={isGoogleLoading}
                        >
                            {isGoogleLoading ? (
                                <Loader2 className="animate-spin text-xl" />
                            ) : (
                                <FcGoogle className="text-xl" />
                            )}
                        </button>
                    </div>

                    {/* <button className="p-3 border rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center w-12 h-12">
                        <FaFacebook className="text-blue-600 text-xl" />
                    </button> */}
                    {/* <button className="p-3 border rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center w-12 h-12">
                        <FaApple className="text-black text-xl" />
                    </button> */}
                </div>

                {/* Login Link */}

                <p className="mt-4 text-gray-600 text-center">
                    Have an account?{" "}
                    <Link to="/auth/sign-in" className="text-blue-600 hover:underline">
                        Log in
                    </Link>
                </p>

                {/* Background Images */}
                <div className="hidden md:block absolute bottom-0 left-0 max-w-[193px] w-full">
                    <img src={taj} alt="taj" />
                </div>
                <div className="hidden md:block absolute bottom-0 right-0 max-w-[193px] w-full">
                    <img src={group} alt="group" />
                </div>
            </div>
        </div>
    );
};
