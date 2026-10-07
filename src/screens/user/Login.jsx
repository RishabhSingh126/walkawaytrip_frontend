// Images
import bgsignup from "@/assets/image/Signup/image.png";
import taj from "@/assets/image/Signup/taj.png";
import group from "@/assets/image/Signup/Group.png";
import plane from "@/assets/image/Signup/plane.png";

import React, { useState, useMemo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "@/context/AuthContext";
import { AUTH_ACTIONS } from "@/context/constants";
import { googleSignIn, login } from "@/api/authAPI";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { signInWithGoogle } from "@/firebase";

export default function Login() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    state.error = ""
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_REQUEST });

      const response = await login(formData);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: response.user });

      // Store JWT token in localStorage
      localStorage.setItem("token", response.token);

      toast.success("Login successful!");

      // Redirect to home page
      navigate("/main");
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: error.response?.data?.message || "Login failed" });
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_REQUEST });

      // Sign in with Google
      const user = await signInWithGoogle();

      // Prepare user data for your backend
      const userData = {
        name: user.displayName,
        email: user.email,
        googleId: user.uid,
        avatarUrl: user.photoURL,
      };

      // Send user data to your backend
      const response = await googleSignIn(userData);

      // Store the token in localStorage
      localStorage.setItem("token", response.token);

      // Update AuthContext
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: response.user });

      // Show success message
      toast.success("Login successful!");

      // Redirect to home page
      navigate("/main");
    } catch (error) {
      console.error(error.message || "Google Sign-In Error:", error);
      toast.error(error.message || "Google Sign-In failed. Please try again.");
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR, payload: error.message || "Google Sign-In failed" });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const isFormValid = useMemo(() => {
    return validateEmail(formData.email) && formData.password.length >= 8;
  }, [formData]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src={bgsignup}
          alt="Travelista Tours"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-24 left-[10%] lg:left-[22%] text-white text-[32px] md:text-[22px] md:text-[44px] font-bold custom-font">
          Travelista Tours
        </div>
        <div className="absolute top-40 left-[10%] lg:left-[22%] text-white text-md md:text-lg max-w-sm text-center">
          Travel is the only purchase that enriches you in ways beyond material
          wealth.
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-8 bg-white relative">
        <h2 className="text-[24px] md:text-[48px] md:text-[37px] md:text-[74px] font-bold text-[#007CAD]">
          Welcome
        </h2>
        <img
          src={plane}
          alt="plane"
          className="hidden md:block absolute top-7 right-1 max-w-[193px] w-full"
        />
        <p className="text-gray-600 text-center">Login with Email</p>

        <form onSubmit={handleSubmit} className="w-full max-w-xs md:max-w-sm">
          <div className="flex flex-col gap-3">
            {/* Email Field */}
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
              autoComplete="email"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-[#007CAD]"
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-[#007CAD] pr-10"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              Must be at least 8 characters.
            </p>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/auth/request-password-reset" className="text-[#007CAD] hover:underline text-sm">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {state.error && <p className="text-red-500 text-sm mb-4 text-center">{state.error}</p>}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-full sm:w-2/3 md:w-1/2 mt-4 p-3 rounded text-white text-lg transition ${isFormValid
                ? "bg-[#007CAD] hover:bg-[#005f8c] cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
                }`}
              disabled={!isFormValid || state.loading}
            >
              {state.loading ? (
                <Loader2 className="mx-auto animate-spin text-white" size={24} />
              )
                : "Login"
              }
            </button>
          </div>
        </form>

        <div className="my-4 text-gray-500">OR</div>

        {/* Social Media Login Buttons */}
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
          {/* <button className="p-3 border rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center w-12 h-12">
              <FaFacebook className="text-blue-600 text-xl" />
          </button> */}
          {/* <button className="p-3 border rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center w-12 h-12">
              <FaApple className="text-black text-xl" />
          </button> */}
        </div>

        {/* Register Link */}
        <p className="mt-4 text-gray-600 text-center">
          Don’t have an account?{" "}
          <Link to="/auth/sign-up" className="text-blue-600 hover:underline">
            Register Now
          </Link>
        </p>

        {/* Background Images */}
        <img
          src={taj}
          alt="taj"
          className="hidden md:block absolute bottom-0 left-0 max-w-[193px] w-full"
        />
        <img
          src={group}
          alt="group"
          className="hidden md:block absolute bottom-0 right-0 max-w-[193px] w-full"
        />
      </div>
    </div>
  );
}
