// Images
import bgsignup from "@/assets/image/Signup/image.png";
import taj from "@/assets/image/Signup/taj.png";
import group from "@/assets/image/Signup/Group.png";
import plane from "@/assets/image/Signup/plane.png";

import React, { useState, useMemo } from "react";
import { completeProfile } from "@/api/userAPI";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { Loader2 } from "lucide-react";
import countryCodes from "@/utils/countryCodes";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [formData, setFormData] = useState({
    nationality: "",
    customNationality: "",
    countryCode: "",
    customCountryCode: "",
    phone: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(5); // 5-second countdown

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "nationality") {
        return {
          ...prev,
          nationality: value,
          customNationality: value === "Other" ? prev.customNationality : "",
          countryCode: value === "Other" ? prev.customCountryCode || "+99" : countryCodes[value] || "",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });

    setError("");
  };

  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken?.userId || null; // Adjust the key based on your JWT payload
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!formData.nationality) {
      setError("Please select your nationality.");
      return;
    }

    // If nationality is "Other," ensure customNationality is provided
    if (formData.nationality === "Other" && !formData.customNationality) {
      setError("Please enter your custom nationality.");
      return;
    }

    setIsLoading(true);
    try {
      const userId = getUserIdFromToken();
      if (!userId) {
        setError("User not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      // Prepare data to send
      const profileData = {
        nationality: formData.nationality === "Other" ? formData.customNationality : formData.nationality,
        phone: formData.phone,
        countryCode: formData.nationality === "Other" ? formData.customCountryCode : countryCodes[formData.nationality],
      };

      await completeProfile(userId, profileData);
      toast.success("Updated successfully.");
      setSuccess("Updated successfully.");

      setRedirecting(true);
      startCountdown();

    } catch (error) {
      setError(error.response?.data?.message || "Update failed.");
      toast.error("Update failed.");
    } finally {
      setIsLoading(false); // 🔹 Reset loading state
    }
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          navigate("/main"); // Redirect to homepage
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSkip = () => {
    navigate("/main"); // Redirect immediately
  };

  const isFormValid = useMemo(() => {
    const isPhoneValid = validatePhone(formData.phone);
    const isNationalityValid = formData.nationality;
    const isCustomNationalityValid =
      formData.nationality !== "Other" || (formData.nationality === "Other" && formData.customNationality);

    return isPhoneValid && isNationalityValid && isCustomNationalityValid;
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
        <p className="text-gray-600 text-center">Create your Account</p>
        <h1 className="text-black text-[30px] text-center">Just one more step...</h1>

        {/* Show either success or error message */}
        {error ? (
          <p className="text-red-500 text-center mt-4">{error}</p>
        ) : success ? (
          <p className="text-blue-500 text-center mt-4">{success}</p>
        ) : null}

        {/* Redirection message */}
        {redirecting && (
          <div className="text-center mt-4">
            <div className="md:text-[30px] text-[#484848] font-[PlusJakartaSans] text-center">
              We are setting up your experience... Redirecting in {countdown} seconds!
            </div>
            <button
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition cursor-pointer"
              onClick={handleSkip}
            >
              Skip
            </button>
          </div>
        )}

        {/* Form */}
        {!redirecting && (
          <form onSubmit={handleSubmit} className="w-full max-w-xs md:max-w-sm">
            <div className="flex flex-col gap-3">
              {/* Nationality Field */}
              <label htmlFor="nationality" className="text-sm text-[#007CAD]">Nationality</label>
              <select
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-[#007CAD]"
                required
                disabled={isLoading}
              >
                <option value="" disabled>Select your nationality</option>
                {Object.keys(countryCodes).map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>

              {/* Custom Nationality Field */}
              {formData.nationality === "Other" && (
                <input
                  type="text"
                  name="customNationality"
                  placeholder="Enter your nationality"
                  value={formData.customNationality}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#007CAD]"
                  disabled={isLoading}
                />
              )}

              {/* Phone Number Field */}
              <label htmlFor="phone" className="text-sm text-[#007CAD]">Phone Number</label>
              <div className="flex border rounded overflow-hidden">
                <span className="flex items-center px-3 py-2 bg-gray-200 border-r text-gray-700">
                  {formData.nationality === "Other" ? formData.customCountryCode || "+" : formData.countryCode || "+"}
                </span>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 focus:ring-2 focus:ring-[#007CAD]"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-1/3 mt-4 p-3 rounded text-white text-lg transition ${isFormValid ?
                  "bg-[#007CAD] hover:bg-[#005f8c] cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
                  }`}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? <Loader2 className="mx-auto animate-spin text-white" size={24} /> : "Confirm"}
              </button>
            </div>
          </form>
        )}

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
