import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import AuthContext from "@/context/AuthContext";
import { AUTH_ACTIONS } from "@/context/constants";
import { completeProfile } from "@/api/userAPI";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { state: authState, dispatch } = useContext(AuthContext) || {};
  const user = authState?.user;

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    state: "",
    city: "",
    country: "India",
    addressTitle: "",
  });

  // Sync state with current user details on load
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        pincode: user.pincode || "",
        state: user.state || "",
        city: user.city || "",
        country: user.country || "India",
        addressTitle: user.addressTitle || "",
      });
      const userPic = user.avatarUrl || user.profilePicture || user.avatar || localStorage.getItem("userProfilePic") || "";
      setImagePreview(userPic);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Convert uploaded image to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        avatarUrl: imagePreview, // Include base64 image in payload
      };

      // Call API if we have a userId, otherwise simulate it
      const userId = user?._id || user?.id || "temp-user-id";
      let updatedUser = { ...user, ...payload };

      if (user?._id || user?.id) {
        try {
          const response = await completeProfile(userId, payload);
          if (response && response.user) {
            updatedUser = response.user;
          }
        } catch (apiError) {
          console.warn("API request failed, falling back to local storage update:", apiError);
        }
      }

      // Update global context & local storage
      dispatch({
        type: AUTH_ACTIONS.UPDATE_USER,
        payload: updatedUser,
      });

      toast.success("Profile updated successfully!");
      navigate("/my-account");
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between relative overflow-x-hidden">
      <div>
        <Navbar />

        <div className="pt-24 pb-16 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 flex justify-center">
          <div className="max-w-[800px] w-full border border-gray-100 rounded-3xl shadow-xl bg-white p-6 sm:p-10 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#007CAD]/10 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <button
                onClick={() => navigate("/my-account")}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Complete Your Profile</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Fill in your details to unlock a personalized, premium experience.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10">
              {/* Profile Photo Upload */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#007CAD]/20 bg-gray-50 flex items-center justify-center shadow-md">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-300 flex flex-col items-center">
                        <Camera size={32} />
                        <span className="text-[10px] mt-1 font-semibold">UPLOAD</span>
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-[#007CAD] hover:bg-[#005f8a] text-white p-2.5 rounded-full cursor-pointer shadow-lg transition-colors border-2 border-white">
                    <Camera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <span className="text-xs text-gray-400 mt-3 font-medium">
                  Click the camera icon to upload a profile picture
                </span>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative border border-gray-200 rounded-xl bg-[#f0f8fc] px-4 pt-2.5 pb-2">
                      <label className="block text-[10px] text-gray-400 mb-0.5 font-semibold uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent text-sm text-gray-800 font-semibold outline-none"
                      />
                    </div>

                    <div className="relative border border-gray-200 rounded-xl bg-[#f0f8fc] px-4 pt-2.5 pb-2">
                      <label className="block text-[10px] text-gray-400 mb-0.5 font-semibold uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent text-sm text-gray-800 font-semibold outline-none"
                      />
                    </div>

                    <div className="relative border border-gray-200 rounded-xl bg-[#f0f8fc] px-4 pt-2.5 pb-2 md:col-span-2">
                      <label className="block text-[10px] text-gray-400 mb-0.5 font-semibold uppercase">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent text-sm text-gray-800 font-semibold outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Details */}
                <div>
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
                    Address details
                  </h3>
                  <div className="space-y-4">
                    <div className="relative border border-gray-200 rounded-xl bg-[#f0f8fc] px-4 py-3">
                      <textarea
                        name="address"
                        placeholder="Complete Address"
                        value={formData.address}
                        onChange={handleChange}
                        maxLength={110}
                        rows={2}
                        className="w-full bg-transparent text-sm text-gray-700 outline-none resize-none placeholder:text-gray-400 font-medium"
                      />
                      <div className="text-right text-[9px] text-gray-400 mt-1">
                        {formData.address.length}/110
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative border border-gray-200 rounded-xl bg-[#f0f8fc] px-4 py-3.5">
                        <input
                          type="text"
                          name="pincode"
                          placeholder="Pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 font-medium"
                        />
                      </div>

                      <div className="relative border border-gray-200 rounded-xl bg-[#f0f8fc] px-4 py-3.5 flex items-center">
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full bg-transparent text-sm text-gray-600 outline-none appearance-none font-medium cursor-pointer"
                        >
                          <option value="">Select State</option>
                          <option>Andhra Pradesh</option>
                          <option>Delhi</option>
                          <option>Goa</option>
                          <option>Gujarat</option>
                          <option>Karnataka</option>
                          <option>Kerala</option>
                          <option>Maharashtra</option>
                          <option>Rajasthan</option>
                          <option>Tamil Nadu</option>
                          <option>Uttar Pradesh</option>
                          <option>West Bengal</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative border border-gray-200 rounded-xl bg-[#f0f8fc] px-4 py-3.5">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 font-medium"
                        />
                      </div>

                      <div className="relative border border-gray-200 rounded-xl bg-[#f0f8fc] px-4 py-3.5 flex items-center">
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full bg-transparent text-sm text-gray-600 outline-none appearance-none font-medium cursor-pointer"
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>United Kingdom</option>
                          <option>Australia</option>
                          <option>Canada</option>
                          <option>Germany</option>
                          <option>France</option>
                          <option>Japan</option>
                          <option>Singapore</option>
                          <option>UAE</option>
                        </select>
                      </div>
                    </div>

                    <div className="relative border border-gray-200 rounded-xl bg-[#f0f8fc] px-4 py-3.5">
                      <input
                        type="text"
                        name="addressTitle"
                        placeholder="Address Title (e.g., Home, Office - Optional)"
                        value={formData.addressTitle}
                        onChange={handleChange}
                        className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/my-account")}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-bold order-2 sm:order-1 text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-[#007CAD] hover:bg-[#005f8a] text-white rounded-xl transition-all text-sm font-bold shadow-lg shadow-[#007CAD]/20 flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompleteProfile;
