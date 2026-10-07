import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/User/Landing/ContactPage";
import {
  ArrowLeft, ShieldCheck, Lock, CreditCard, RefreshCw, HelpCircle,
  ChevronDown, ChevronUp, Bell, CheckCircle2, UserCheck, HeartHandshake, PhoneCall
} from "lucide-react";
import toast from "react-hot-toast";

const SecurePaymentsDetail = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const securityFeatures = [
    {
      icon: <Lock size={22} className="text-[#003580]" />,
      title: "End-to-End SSL Encryption",
      desc: "All transaction data is fully encrypted using bank-grade AES-256 protocols. Your credit card details are never stored on our servers."
    },
    {
      icon: <ShieldCheck size={22} className="text-green-600" />,
      title: "PCI-DSS Level 1 Compliance",
      desc: "We work exclusively with fully certified Level 1 PCI payment gateways (Stripe, Razorpay, and PayPal) to manage all transactions securely."
    },
    {
      icon: <RefreshCw size={22} className="text-blue-600" />,
      title: "Double-Refund Cancellation Promise",
      desc: "In case of any unexpected merchant cancellation or booking dispute, our security escrow holds funds to guarantee a prompt refund."
    },
    {
      icon: <CheckCircle2 size={22} className="text-indigo-600" />,
      title: "Instant Confirmation Guarantee",
      desc: "Your reservations are instantly hard-blocked at the hotel database. No overbookings, no reservation slip errors."
    },
    {
      icon: <UserCheck size={22} className="text-teal-600" />,
      title: "Fraud Prevention Systems",
      desc: "Real-time AI verification monitors transactions for abnormal behavior, preventing unauthorized charges and identity theft."
    },
    {
      icon: <PhoneCall size={22} className="text-orange-600" />,
      title: "24/7 Priority Dispute Line",
      desc: "Direct access to our dedicated trust team. We coordinate directly with hotel owners and airlines so you don't have to."
    }
  ];

  const faqData = [
    {
      q: "Is it safe to enter my credit/debit card details on Walkawaytrip?",
      a: "Yes, absolutely. Walkawaytrip uses banking-level Secure Socket Layer (SSL) encryption to encrypt all sensitive data. We route payment requests through PCI-DSS compliant processing networks, meaning our staff and system never see or retain your raw CVV or card number."
    },
    {
      q: "What is the Double-Refund Guarantee?",
      a: "If a booking is confirmed on our website but rejected by the host or hotel upon arrival, we will immediately rebook you in an equal or higher-grade property for free, OR process a full refund along with a travel credit voucher to compensate for the inconvenience."
    },
    {
      q: "Which payment options do you support?",
      a: "We support Visa, Mastercard, American Express, UPI (GPay, PhonePe, Paytm), Net Banking, and major international digital wallets. All transactions require standard 3D-Secure (OTP) authentication for your safety."
    },
    {
      q: "How does the reservation verification work?",
      a: "When you complete a booking, our API directly syncs with the property management system (PMS) of the hotel. A unique booking reference ID is generated instantly, which is legally recognized by the property. You can also print the secure booking voucher at any time."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 mt-14">

        {/* Navigation Breadcrumb */}
        <button
          onClick={() => navigate("/booking")}
          className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#003580] hover:text-blue-800 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Booking Center
        </button>

        {/* Hero Banner Header */}
        <div className="bg-gradient-to-r from-[#003580] to-blue-800 rounded-3xl p-6 sm:p-10 text-white shadow-md relative overflow-hidden mb-8">
          <div className="relative z-10 max-w-2xl">
            <span className="bg-white/20 text-white font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
              Trust & Security Center
            </span>
            <h1 className="text-2xl sm:text-4xl font-black mt-4 leading-tight">
              Booking With Confidence
            </h1>
            <p className="text-blue-100 font-medium text-xs sm:text-sm mt-3 leading-relaxed">
              We protect your payments, confirm your reservations, and offer immediate support so you can focus entirely on enjoying your journey. Learn more about our secure payment protocols below.
            </p>
          </div>

          {/* Decorative Shield Icon in background */}
          <ShieldCheck size={260} className="absolute right-[-40px] bottom-[-40px] text-white/5 pointer-events-none" />
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {securityFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="bg-gray-50 h-10 w-10 rounded-xl flex items-center justify-center mb-4 border border-gray-100">
                  {feat.icon}
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-gray-800">{feat.title}</h3>
                <p className="text-gray-500 font-medium text-[11px] sm:text-xs mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges / Certificates */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm mb-8 flex flex-col md:flex-row justify-around items-center gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-[#003580] font-black text-2xl tracking-tight">256-Bit</span>
            <span className="text-gray-400 font-semibold text-[10px] sm:text-xs uppercase mt-0.5">SSL Encryption Protection</span>
          </div>
          <div className="h-px w-24 md:h-12 md:w-px bg-gray-150" />
          <div className="flex flex-col items-center">
            <span className="text-green-600 font-black text-2xl tracking-tight">PCI-DSS</span>
            <span className="text-gray-400 font-semibold text-[10px] sm:text-xs uppercase mt-0.5">Compliant Gateway Routing</span>
          </div>
          <div className="h-px w-24 md:h-12 md:w-px bg-gray-150" />
          <div className="flex flex-col items-center">
            <span className="text-indigo-600 font-black text-2xl tracking-tight">100%</span>
            <span className="text-gray-400 font-semibold text-[10px] sm:text-xs uppercase mt-0.5">Instant Confirmation Promise</span>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
            <HelpCircle className="text-[#003580]" size={20} />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div
                key={idx}
                className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left py-2 hover:text-[#003580] transition-colors cursor-pointer"
                >
                  <span className="font-extrabold text-xs sm:text-sm text-gray-800 pr-4">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp size={16} className="text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="mt-2 text-gray-500 font-medium text-xs sm:text-sm leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default SecurePaymentsDetail;
