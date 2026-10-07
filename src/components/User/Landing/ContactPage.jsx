import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitContactForm } from "@/api/contactAPI";
import toast from "react-hot-toast";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaGoogle
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ContactFooter = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await submitContactForm(data);
    },
    onSuccess: () => {
      toast.success("Contact form submitted successfully!");
      setFormData({ fullName: "", email: "", message: "" });
    },
    onError: (error) => {
      toast.error("Failed to submit contact form. Please try again.");
      console.error(error);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.fullName) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!formData.email) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <div className="bg-[#f7ffff] px-6 py-8 md:py-10 lg:py-12 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Contact Form Section */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left pl-8 md:pl-12">
          <h2 className="text-4xl font-bold text-[#2a99b5] tracking-tight">
            DON'T MISS OUT
          </h2>
          <p className="text-gray-800 font-medium mt-1 uppercase text-sm tracking-wider">
            Contact If You Have Any Question
          </p>

          <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-800 mb-1">NAME *</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter Your Full Name"
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2a99b5] text-sm"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-800 mb-1">EMAIL ADDRESS *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email Address"
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2a99b5] text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-6 w-full flex flex-col">
            <label className="text-[10px] font-bold text-gray-800 mb-1">ENQUIRY / MESSAGE</label>
            <textarea
              name="message"
              placeholder="Enter Your Enquiry or Message"
              rows="4"
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2a99b5] text-sm resize-none"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            onClick={handleSubmit}
            disabled={mutation.isPending || mutation.isLoading}
            style={{ cursor: mutation.isPending || mutation.isLoading ? 'not-allowed' : 'pointer' }}
            className={`mt-6 py-1.5 w-full border-2 font-bold text-sm tracking-widest transition duration-300 ${
              mutation.isPending || mutation.isLoading
                ? "bg-gray-100 text-gray-400 border-gray-200"
                : "border-[#2a99b5] text-[#2a99b5] hover:bg-[#2a99b5] hover:text-white"
            }`}
          >
            {mutation.isPending || mutation.isLoading ? "SENDING..." : "CONTACT"}
          </button>

          <p className="text-gray-900 mt-4 text-[10px] font-medium max-w-sm leading-relaxed">
            Thanks For Getting In Touch! We're Here To Assist You And Will Respond As Quickly As Possible. Your Message Means A Lot To Us.
          </p>

          <div className="mt-10">
            <p className="text-gray-800 font-bold text-[10px] mb-4">Required Information *</p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-[#1877F2] text-white rounded-full">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white rounded-lg">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-[#0077b5] text-white rounded-md">
                <FaLinkedinIn size={18} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-md">
                <FaXTwitter size={18} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-[#E60023] text-white rounded-full">
                <FaPinterestP size={18} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-[#EA4335] text-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 488 512">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Links Sections */}
        <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-sm text-black mb-6 tracking-widest">COMPANY</h3>
            <ul className="space-y-4 text-[11px] font-medium text-gray-700">
              <li><a href="#" className="hover:text-[#2a99b5]">ABOUT US</a></li>
              <li><a href="#" className="hover:text-[#2a99b5]">CONTACT</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-black mb-6 tracking-widest">CUSTOMER SERVICE</h3>
            <ul className="space-y-4 text-[11px] font-medium text-gray-700">
              <li><a href="#" className="hover:text-[#2a99b5]">CONTACT US</a></li>
              <li><a href="#" className="hover:text-[#2a99b5]">MY ACCOUNT</a></li>
              <li><a href="#" className="hover:text-[#2a99b5]">TRIP PLAN WITH AI</a></li>
              <li><a href="#" className="hover:text-[#2a99b5]">DESTINATION PLAN</a></li>
              <li><a href="#" className="hover:text-[#2a99b5]">TRIP WITH FAMILY</a></li>
              <li><a href="#" className="hover:text-[#2a99b5]">ASKED YOUR QUESTION</a></li>
              <li><a href="#" className="hover:text-[#2a99b5]">CHAT WITH AI</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-black mb-6 tracking-widest">MORE TO EXPLORE</h3>
            <ul className="space-y-4 text-[11px] font-medium text-gray-700">
              <li><a href="#" className="hover:text-[#2a99b5]">OFFERS</a></li>
              <li><a href="#" className="hover:text-[#2a99b5]">GELLARY</a></li>
              <li><a href="#" className="hover:text-[#2a99b5]">HOTEL NEAR BY YOU</a></li>
              <li><a href="#" className="hover:text-[#2a99b5]">BEST PLACES</a></li>
              <li><a href="#" className="hover:text-[#2a99b5]">COMPARE YOUR TRIP</a></li>
              <li><a href="#" className="hover:text-[#2a99b5]">UPLOAD PHOTO</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFooter;
