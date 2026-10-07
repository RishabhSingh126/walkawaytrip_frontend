import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack as BackIcon } from "react-icons/md";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/user/common/Footer";
import ContactFooter from "@/components/user/landing/ContactPage";
import {
  FileText,
  Calendar,
  FileUp,
  Sparkles,
  Globe,
  Award,
  Headphones,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
  Calculator,
  Camera,
  Search,
  Clock,
  Download,
  Info
} from "lucide-react";
import toast from "react-hot-toast";

const visaRequirements = {
  Maldives: {
    status: "Visa on Arrival (Free)",
    validity: "30 Days",
    info: "🎉 Indian passport holders get free Visa on Arrival. Ensure you have hotel confirmation, return ticket, and minimum 6 months passport validity.",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    color: "text-emerald-700",
    fee: 0,
    serviceFee: 0,
    expressAvailable: false,
    docs: [
      "Original Passport with 6 months validity from travel date",
      "Confirmed round-trip flight tickets",
      "Confirmed hotel accommodation voucher",
      "Submitted IMUGA Traveller Declaration within 96 hours of departure",
      "Proof of sufficient funds (Min $50 per day)"
    ]
  },
  Thailand: {
    status: "Visa on Arrival / eVisa",
    validity: "15-30 Days",
    info: "🏖️ Visa on Arrival available at major airports. You can also pre-apply for an eVisa. Requires ₹10,000 equivalent cash proof per person.",
    bg: "bg-blue-50",
    border: "border-blue-100",
    color: "text-blue-700",
    fee: 4500,
    serviceFee: 850,
    expressAvailable: true,
    docs: [
      "Passport valid for at least 6 months from arrival date",
      "One recent photograph (4x6 cm) with white background",
      "Confirmed return flight ticket within 15 days",
      "Proof of accommodation / Hotel reservation",
      "Proof of funds (10,000 THB per individual or 20,000 THB per family)"
    ]
  },
  France: {
    status: "Schengen Visa Required",
    validity: "Based on itinerary",
    info: "⚠️ Requires a Schengen Visa applied in advance. You must book a biometric slot at VFS Global and provide travel insurance & bank statements.",
    bg: "bg-amber-50",
    border: "border-amber-100",
    color: "text-amber-700",
    fee: 7200,
    serviceFee: 2450,
    expressAvailable: false,
    docs: [
      "Schengen visa application form signed by candidate",
      "Two recent photos (3.5x4.5 cm), white background, 80% face coverage",
      "Travel insurance with minimum coverage of €30,000 including repatriation cover",
      "6 months salary slips or business registration proofs",
      "Personal bank statements for the last 6 months stamped by the bank",
      "ITR (Income Tax Returns) for the last 2-3 financial years"
    ]
  },
  UAE: {
    status: "Pre-arranged eVisa Required",
    validity: "30 or 60 Days",
    info: "✈️ Easily processed online as an eVisa. Requires passport scan, passport-size photo, and hotel/flight confirmations. Processing time: 3-4 days.",
    bg: "bg-sky-50",
    border: "border-sky-100",
    color: "text-sky-700",
    fee: 6800,
    serviceFee: 950,
    expressAvailable: true,
    docs: [
      "Clear color scan of passport bio-data pages",
      "Clear color scan of passport last page",
      "Passport size photograph with white background",
      "Confirmed onward/return flight ticket booking",
      "Observation page (if any) in passport"
    ]
  },
  Japan: {
    status: "eVisa Required",
    validity: "Up to 90 Days",
    info: "🌸 Eligible for a simple eVisa processed online. Upload your travel itinerary, employment certificate, and passport bio-page scan.",
    bg: "bg-pink-50/50",
    border: "border-pink-100",
    color: "text-pink-700",
    fee: 500,
    serviceFee: 1200,
    expressAvailable: false,
    docs: [
      "Original passport with at least two blank pages",
      "Completed visa application form",
      "One photograph (2x2 inches) with white background",
      "Daily travel itinerary / Schedule of stay details",
      "Proof of financial sufficiency (Bank statements of past 6 months)"
    ]
  },
  USA: {
    status: "B1/B2 Visa Required",
    validity: "Up to 10 Years",
    info: "🗽 Requires a standard B1/B2 tourist visa. You must submit Form DS-160, schedule biometric and physical interview appointments at the embassy.",
    bg: "bg-purple-50",
    border: "border-purple-100",
    color: "text-purple-700",
    fee: 15540,
    serviceFee: 1800,
    expressAvailable: false,
    docs: [
      "DS-160 visa confirmation page barcode printout",
      "US Embassy visa appointment confirmation letter",
      "Original passport valid for at least 6 months",
      "Covering letter stating purpose of travel",
      "Financial proof (ITR, investment proofs, bank statements)",
      "Employment details (Salary slips, NOC letter from employer)"
    ]
  }
};

const VisaPassport = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState("checker"); // checker | calculator | photo | tracker
  
  // Checker states
  const [passportFrom, setPassportFrom] = useState("India");
  const [travelingTo, setTravelingTo] = useState("");
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  // Application Form states
  const [applyName, setApplyName] = useState("");
  const [applyEmail, setApplyEmail] = useState("");
  const [applyPhone, setApplyPhone] = useState("");
  const [applyDate, setApplyDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // Fee Calculator States
  const [calcCountry, setCalcCountry] = useState("Thailand");
  const [calcUrgency, setCalcUrgency] = useState("standard"); // standard | express
  const [calcApplicants, setCalcApplicants] = useState(1);

  // Tracker states
  const [trackInquiryId, setTrackInquiryId] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleCheckRequirements = (e) => {
    e.preventDefault();
    if (!travelingTo) {
      toast.error("Please select your destination country!");
      return;
    }
    setChecking(true);
    setCheckResult(null);
    setAppliedSuccess(false);

    setTimeout(() => {
      setChecking(false);
      setCheckResult(visaRequirements[travelingTo] || {
        status: "Visa Required",
        validity: "Depends on visa type",
        info: `✈️ Requires visa in advance. Please submit an inquiry below, and our visa consultants will coordinate your paperwork.`,
        bg: "bg-gray-50",
        border: "border-gray-200",
        color: "text-gray-700",
        fee: 5000,
        serviceFee: 1500,
        expressAvailable: false,
        docs: [
          "Original Passport with 6 months validity",
          "Recent passport size photos",
          "Confirmed return air tickets",
          "Proof of sufficient funds"
        ]
      });
    }, 800);
  };

  const handleApplyVisa = (e) => {
    e.preventDefault();
    if (!applyName || !applyEmail || !applyPhone) {
      toast.error("Please fill in all details to apply!");
      return;
    }
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setAppliedSuccess(true);
      toast.success("Visa Application Inquiry Submitted Successfully!");
      setApplyName("");
      setApplyEmail("");
      setApplyPhone("");
      setApplyDate("");
    }, 1500);
  };

  const handleCalculateFee = () => {
    const rules = visaRequirements[calcCountry];
    if (!rules) return { base: 0, service: 0, express: 0, total: 0 };
    const base = rules.fee * calcApplicants;
    const service = rules.serviceFee * calcApplicants;
    const express = (calcUrgency === "express" && rules.expressAvailable ? 1500 : 0) * calcApplicants;
    return {
      base,
      service,
      express,
      total: base + service + express
    };
  };

  const handleTrackVisa = (e) => {
    e.preventDefault();
    if (!trackInquiryId.trim()) {
      toast.error("Please enter your visa inquiry/receipt number!");
      return;
    }
    setTrackingLoading(true);
    setTrackingResult(null);

    setTimeout(() => {
      setTrackingLoading(false);
      // Simulate static timeline response
      setTrackingResult({
        id: trackInquiryId.toUpperCase(),
        status: "In Progress",
        country: "Thailand",
        applicant: "Amit Sharma",
        timeline: [
          { label: "Application Submitted", date: "10 Jul 2026", status: "completed" },
          { label: "Document Verification", date: "11 Jul 2026", status: "completed" },
          { label: "Submitted to Embassy / VFS", date: "12 Jul 2026", status: "current" },
          { label: "Visa Approved & Dispatched", date: "Pending", status: "pending" }
        ]
      });
      toast.success("Visa status retrieved successfully!");
    }, 1200);
  };

  const simulatedDownloadChecklist = (country) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Generating PDF Checklist...",
        success: `Successfully downloaded ${country} Visa checklist!`,
        error: "Failed to compile checklist."
      }
    );
  };

  const feeData = handleCalculateFee();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between overflow-x-hidden">
      <div>
        {/* Navbar */}
        <Navbar transparent={false} />

        {/* Content Section */}
        <main className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">

          {/* Back Button */}
          <div className="mb-8 text-left">
            <Link
              to="/booking"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#0093CB] transition-colors"
            >
              <BackIcon size={15} />
              Back to Booking Screen
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <span className="inline-block px-3.5 py-1.5 text-[10px] sm:text-[11px] font-black text-[#0093CB] bg-[#0093CB]/8 border border-[#0093CB]/10 rounded-full tracking-widest uppercase mb-4 shadow-2xs">
              Visa Hub
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 font-[Unbounded] tracking-tight mb-4 leading-tight">
              Tourist Visa <span className="text-[#0093CB]">Assistance</span>
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold max-w-xl mx-auto leading-relaxed">
              Verify tourist visa specifications, download requirement checklists, calculate fees, and monitor application status instantly.
            </p>
          </div>

          {/* ═══ TAB HEADERS ═══ */}
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-2 py-1 scrollbar-none justify-start sm:justify-center">
            {[
              { id: "checker", label: "Requirement Checker", icon: Globe },
              { id: "calculator", label: "Visa Fee Calculator", icon: Calculator },
              { id: "photo", label: "Photo Guidelines", icon: Camera },
              { id: "tracker", label: "Track Status", icon: Clock }
            ].map(tab => {
              const TabIcon = tab.icon;
              const isSelected = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border-none whitespace-nowrap ${
                    isSelected
                      ? "bg-[#0093CB] text-white shadow-sm"
                      : "bg-white text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <TabIcon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ═══ TAB 1: REQUIREMENT CHECKER ═══ */}
          {activeSubTab === "checker" && (
            <div className="bg-white border border-gray-150 rounded-[2rem] p-6 sm:p-8 shadow-md mb-12 text-left">
              <h2 className="text-base sm:text-lg font-black text-gray-900 font-[Unbounded] mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Globe size={18} className="text-[#0093CB]" /> Visa Requirement & Checklist Checker
              </h2>
              <form onSubmit={handleCheckRequirements} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase leading-none mb-2">
                    My Passport Country
                  </label>
                  <select
                    value={passportFrom}
                    onChange={(e) => setPassportFrom(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-xs font-bold text-gray-800 bg-gray-50 outline-none focus:border-sky-400"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Singapore</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase leading-none mb-2">
                    I Am Traveling To
                  </label>
                  <select
                    value={travelingTo}
                    onChange={(e) => setTravelingTo(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-xs font-bold text-gray-800 bg-gray-50 outline-none focus:border-sky-400 animate-pulse border-sky-200"
                  >
                    <option value="">Select Destination</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Thailand">Thailand</option>
                    <option value="France">France (Schengen)</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="Japan">Japan</option>
                    <option value="USA">United States</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={checking}
                  className="bg-[#0093CB] hover:bg-[#007ba8] text-white text-xs font-extrabold p-3 rounded-xl cursor-pointer transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-1.5 border-none shadow-xs w-full h-11"
                >
                  {checking ? (
                    <><Loader2 size={14} className="animate-spin" /> Verifying...</>
                  ) : (
                    "Check Requirements"
                  )}
                </button>
              </form>

              {/* RESULTS VIEW */}
              {checkResult && (
                <div className="mt-8 space-y-6">
                  {/* Status header banner */}
                  <div className={`border rounded-2xl p-5 ${checkResult.bg} ${checkResult.border} text-left transition-all duration-300`}>
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                      <span className={`text-xs font-black uppercase tracking-wider ${checkResult.color}`}>
                        {checkResult.status}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500">
                        Validity: {checkResult.validity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                      {checkResult.info}
                    </p>
                  </div>

                  {/* Checklist Section */}
                  <div className="bg-gray-50/50 border border-gray-150 rounded-2xl p-5">
                    <div className="flex items-center justify-between gap-3 flex-wrap mb-4 pb-2 border-b border-gray-200">
                      <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest flex items-center gap-1.5">
                        <FileText size={14} className="text-[#0093CB]" /> Required Document Checklist ({travelingTo})
                      </h3>
                      <button
                        type="button"
                        onClick={() => simulatedDownloadChecklist(travelingTo)}
                        className="bg-white hover:bg-gray-100 border border-gray-250 text-gray-700 font-extrabold text-[9px] uppercase px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition shadow-xs"
                      >
                        <Download size={10} /> Download PDF Checklist
                      </button>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {checkResult.docs.map((doc, idx) => (
                        <li key={idx} className="bg-white border border-gray-150 rounded-xl p-3 flex gap-2.5 items-start">
                          <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-[11px] text-gray-600 font-bold leading-relaxed">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visa inquiry subform */}
                  <div className="pt-6 border-t border-gray-200/50">
                    <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-3">
                      ✉️ Request Online Visa Assistance
                    </h3>
                    
                    {appliedSuccess ? (
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-2.5 text-emerald-700 text-xs font-semibold leading-relaxed">
                        <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-500" />
                        <div>
                          <strong>Inquiry Submitted!</strong> We've registered your request for {travelingTo} visa assistance. A visa expert will contact you via email shortly.
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyVisa} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Your Full Name"
                            value={applyName}
                            onChange={(e) => setApplyName(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs outline-none focus:border-sky-400 font-medium"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={applyEmail}
                            onChange={(e) => setApplyEmail(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs outline-none focus:border-sky-400 font-medium"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="tel"
                            required
                            placeholder="Phone / Mobile Number"
                            value={applyPhone}
                            onChange={(e) => setApplyPhone(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs outline-none focus:border-sky-400 font-medium"
                          />
                          <input
                            type="date"
                            placeholder="Estimated Travel Date"
                            value={applyDate}
                            onChange={(e) => setApplyDate(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs outline-none focus:border-sky-400 font-medium cursor-pointer"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={submitting}
                            className="bg-[#0093CB] hover:bg-[#007ba8] text-white text-[10px] font-extrabold px-5 py-2.5 rounded-lg active:scale-95 transition cursor-pointer border-none flex items-center gap-1.5 shadow-sm"
                          >
                            {submitting ? (
                              <><Loader2 size={11} className="animate-spin" /> Submitting...</>
                            ) : (
                              "Submit Visa Inquiry"
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══ TAB 2: VISA FEE CALCULATOR ═══ */}
          {activeSubTab === "calculator" && (
            <div className="bg-white border border-gray-150 rounded-[2rem] p-6 sm:p-8 shadow-md mb-12 text-left">
              <h2 className="text-base sm:text-lg font-black text-gray-900 font-[Unbounded] mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Calculator size={18} className="text-[#0093CB]" /> Visa Fee & Service Charge Calculator
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase leading-none mb-2">
                      Destination Country
                    </label>
                    <select
                      value={calcCountry}
                      onChange={(e) => setCalcCountry(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs font-bold text-gray-800 bg-gray-50 outline-none focus:border-sky-400"
                    >
                      <option value="Thailand">Thailand</option>
                      <option value="France">France</option>
                      <option value="UAE">United Arab Emirates</option>
                      <option value="Japan">Japan</option>
                      <option value="USA">United States</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase leading-none mb-2">
                      Processing Plan
                    </label>
                    <select
                      value={calcUrgency}
                      onChange={(e) => setCalcUrgency(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs font-bold text-gray-800 bg-gray-50 outline-none focus:border-sky-400"
                    >
                      <option value="standard">Standard Processing (5-7 Days)</option>
                      <option value="express" disabled={!visaRequirements[calcCountry]?.expressAvailable}>
                        Express Processing (2-3 Days) {!visaRequirements[calcCountry]?.expressAvailable && "(Unavailable)"}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase leading-none mb-2">
                      Number of Applicants
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={calcApplicants}
                      onChange={(e) => setCalcApplicants(parseInt(e.target.value) || 1)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs font-bold text-gray-800 bg-gray-50 outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                {/* Calculation breakdown */}
                <div className="md:col-span-5 bg-gray-50 border border-gray-150 rounded-2xl p-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">
                      Fee Breakdown ({calcApplicants} Pax)
                    </h3>
                    
                    <div className="flex justify-between text-xs font-semibold text-gray-600">
                      <span>Embassy Fee</span>
                      <span>₹{feeData.base.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-xs font-semibold text-gray-600">
                      <span>Service & Processing Charges</span>
                      <span>₹{feeData.service.toLocaleString()}</span>
                    </div>

                    {feeData.express > 0 && (
                      <div className="flex justify-between text-xs font-semibold text-orange-600">
                        <span>Express Surcharge</span>
                        <span>₹{feeData.express.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-baseline">
                    <span className="text-xs font-black text-gray-800 uppercase tracking-wide">Total Estimated Cost</span>
                    <span className="text-xl font-black text-[#0093CB] font-[Unbounded]">₹{feeData.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══ TAB 3: PHOTO GUIDELINES ═══ */}
          {activeSubTab === "photo" && (
            <div className="bg-white border border-gray-150 rounded-[2rem] p-6 sm:p-8 shadow-md mb-12 text-left space-y-6">
              <h2 className="text-base sm:text-lg font-black text-gray-900 font-[Unbounded] mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Camera size={18} className="text-[#0093CB]" /> Visa Photo Dimensions & Specifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Most visa rejections occur due to non-compliant photographs. Make sure your uploaded files strictly follow consulate specifications:
                  </p>
                  
                  <div className="space-y-2.5">
                    {[
                      "Dimensions: 3.5 cm x 4.5 cm (Schengen, UK) or 2 x 2 inches (US)",
                      "Background: Plain off-white or solid white ONLY (No patterns/borders)",
                      "Face Coverage: Face should cover 70-80% of the photo",
                      "Expression: Neutral facial expression with mouth closed",
                      "Recency: The photograph must not be older than 3-6 months",
                      "Glasses: No specs/tinted glasses allowed unless medically required"
                    ].map((spec, idx) => (
                      <div key={idx} className="flex gap-2 items-center text-xs font-bold text-gray-700">
                        <Check size={14} className="text-emerald-500 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center border border-dashed border-gray-300">
                  <div className="w-[180px] h-[220px] bg-white rounded shadow-md border-2 border-emerald-500 relative overflow-hidden flex flex-col items-center justify-center p-4">
                    {/* Simulated correct photo illustration */}
                    <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300 mb-2 relative">
                      <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-gray-600"></div>
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gray-600"></div>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-2 rounded-b-full border-t border-gray-400 bg-transparent"></div>
                    </div>
                    <div className="w-24 h-12 rounded-t-xl bg-gray-300"></div>
                    
                    <span className="absolute bottom-1 bg-emerald-500 text-white font-extrabold text-[8px] px-2 py-0.5 rounded uppercase">
                      ✓ Standard Compliant Face Coverage
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-450 font-semibold mt-3 text-center">Correct facial centering & white background example</span>
                </div>
              </div>
            </div>
          )}

          {/* ═══ TAB 4: TRACK STATUS ═══ */}
          {activeSubTab === "tracker" && (
            <div className="bg-white border border-gray-150 rounded-[2rem] p-6 sm:p-8 shadow-md mb-12 text-left">
              <h2 className="text-base sm:text-lg font-black text-gray-900 font-[Unbounded] mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Clock size={18} className="text-[#0093CB]" /> Live Visa Application tracker
              </h2>

              <form onSubmit={handleTrackVisa} className="flex gap-3 flex-col sm:flex-row items-end max-w-xl">
                <div className="flex-grow w-full">
                  <label className="block text-[10px] font-black text-gray-400 uppercase leading-none mb-2">
                    Inquiry Reference / Receipt ID
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. WT-V-88219"
                    value={trackInquiryId}
                    onChange={(e) => setTrackInquiryId(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-xs font-bold text-gray-800 bg-gray-50 outline-none focus:border-sky-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={trackingLoading}
                  className="bg-[#0093CB] hover:bg-[#007ba8] text-white text-xs font-extrabold px-6 h-11 rounded-xl cursor-pointer transition active:scale-95 border-none flex items-center gap-1.5 shadow-sm justify-center whitespace-nowrap w-full sm:w-auto"
                >
                  {trackingLoading ? (
                    <><Loader2 size={13} className="animate-spin" /> Searching...</>
                  ) : (
                    "Search Status"
                  )}
                </button>
              </form>

              {/* TRACKING TIMELINE RESULT */}
              {trackingResult && (
                <div className="mt-8 border border-gray-200 rounded-2xl p-6 bg-gray-50/50">
                  <div className="flex flex-wrap justify-between items-center gap-3 border-b border-gray-200 pb-3 mb-6">
                    <div>
                      <span className="text-[10px] text-gray-450 font-black block uppercase">APPLICATION REFERENCE</span>
                      <span className="text-sm font-black text-gray-900">{trackingResult.id}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-450 font-black block uppercase">APPLICANT</span>
                      <span className="text-sm font-black text-gray-900">{trackingResult.applicant} ({trackingResult.country})</span>
                    </div>
                  </div>

                  {/* Vertical Timeline */}
                  <div className="relative pl-6 space-y-6">
                    <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200"></div>

                    {trackingResult.timeline.map((step, idx) => {
                      const isCompleted = step.status === "completed" || step.status === "current";
                      const isCurrent = step.status === "current";
                      return (
                        <div key={idx} className="relative flex gap-4 items-start">
                          <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                            isCurrent
                              ? "bg-sky-500 border-sky-500 text-white animate-pulse"
                              : isCompleted
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "bg-white border-gray-300 text-gray-400"
                          }`}>
                            {isCompleted ? <Check size={10} className="stroke-[3px]" /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>}
                          </div>
                          <div>
                            <h4 className={`text-xs font-black ${isCurrent ? "text-sky-600" : "text-gray-800"}`}>{step.label}</h4>
                            <p className="text-[10px] text-gray-400 font-bold mt-0.5">{step.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-16">

            {/* Section: Easy Steps */}
            <section className="space-y-8 pt-6">
              <div className="text-center">
                <span className="inline-block px-3 py-1 text-[10px] font-black text-[#0093CB] bg-[#0093CB]/10 rounded-full tracking-wider uppercase mb-3">
                  How It Works ?
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 font-[Unbounded] tracking-tight text-center">
                  Get Your Visa in 4 Easy Steps
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 max-w-xl mx-auto">
                  A simple, streamlined, and guided roadmap for a quick visa acquisition.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: "Step 1",
                    title: "Apply Online",
                    desc: "Visit our exclusive platform and fill in the required details hassle-free to meet criteria.",
                    icon: FileText,
                    color: "text-blue-500",
                    bg: "bg-blue-50",
                  },
                  {
                    step: "Step 2",
                    title: "Get An Appointment",
                    desc: "Effortlessly receive an appointment schedule & meet our professionals for expert guidance.",
                    icon: Calendar,
                    color: "text-yellow-600",
                    bg: "bg-yellow-50",
                  },
                  {
                    step: "Step 3",
                    title: "Submit Documents",
                    desc: "Send us all the relevant documents to verify and process your visa application.",
                    icon: FileUp,
                    color: "text-[#0093CB]",
                    bg: "bg-sky-50",
                  },
                  {
                    step: "Step 4",
                    title: "Receive Your Visas",
                    desc: "Once approved, you’ll receive your visas instantly with our hassle-free procedure.",
                    icon: Sparkles,
                    color: "text-emerald-500",
                    bg: "bg-emerald-50",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group flex flex-col justify-between p-6 bg-white border border-gray-100 rounded-2xl shadow-xs hover:shadow-md hover:scale-[1.02] hover:border-[#0093CB]/20 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="text-left">
                        {/* Icon and Step Indicator */}
                        <div className="flex items-center justify-between mb-5">
                          <div className={`p-3.5 rounded-xl ${item.bg} ${item.color} transition-colors duration-300`}>
                            <Icon size={22} className="stroke-[2px]" />
                          </div>
                          <span className="text-[10px] font-black tracking-widest text-[#0093CB] bg-[#0093CB]/5 border border-[#0093CB]/10 px-2 py-0.5 rounded-md uppercase">
                            {item.step}
                          </span>
                        </div>

                        {/* Text details */}
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-gray-500 font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      {/* Micro line indicator at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#0093CB] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section: Easy Passport steps */}
            <section className="space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 font-[Unbounded] tracking-tight">
                  Easy steps to get your passport
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2">
                  Follow these step-by-step guidelines for passport applications through PSK or RPO systems.
                </p>
              </div>

              {/* Passport Image Card */}
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white p-2 sm:p-4 hover:scale-[1.005]">
                <img
                  src="https://yourdoorstep.co/wp-content/uploads/2025/07/Step-by-Step-Guide-Passport-Application-Process-Through-PSK-Or-RPO-1024x566.png"
                  alt="Easy steps to get your passport"
                  className="w-full h-auto block object-contain rounded-2xl mx-auto max-h-[850px] shadow-2xs select-none"
                  loading="eager"
                />
              </div>
            </section>

            {/* Section 4: We Are Different */}
            <section className="space-y-8 pt-6">
              <div className="text-center">
                <span className="inline-block px-3 py-1 text-[10px] font-black text-[#0093CB] bg-[#0093CB]/10 rounded-full tracking-wider uppercase mb-3">
                  We Are Different
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 font-[Unbounded] tracking-tight">
                  What Are We Known For?
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 max-w-xl mx-auto">
                  Discover how our standards and customer-centric approach ensure the highest visa success rates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {[
                  {
                    title: "Special Visa Services for Diverse Countries",
                    desc: "Custom solutions for travelers flying to a wide range of global destinations, making complex paperwork simple.",
                    icon: Globe,
                    bg: "bg-blue-505/10 text-blue-600",
                  },
                  {
                    title: "Years of Unrivaled Expertise in Visa Processing",
                    desc: "A proven track record of successful approvals and document handling with strict alignment to consulate regulations.",
                    icon: Award,
                    bg: "bg-yellow-505/10 text-yellow-600",
                  },
                  {
                    title: "Dedicated End-to-End Visa Assistance",
                    desc: "Continuous, end-to-end support throughout your visa application lifecycle, answering queries at every stage.",
                    icon: Headphones,
                    bg: "bg-sky-505/10 text-[#0093CB]",
                  },
                  {
                    title: "Optimal Level of Safety & Confidentiality",
                    desc: "Your sensitive files and identity details are secured using standard encryption and strict privacy protocols.",
                    icon: ShieldCheck,
                    bg: "bg-emerald-505/10 text-emerald-600",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex gap-4 p-5 sm:p-6 bg-white border border-gray-100 rounded-2xl shadow-xs hover:shadow-sm hover:scale-[1.005] hover:border-[#0093CB]/10 transition-all duration-300"
                    >
                      <div className={`p-4 rounded-2xl shrink-0 h-fit bg-[#0093CB]/10 text-[#0093CB]`}>
                        <Icon size={24} className="stroke-[2px]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-gray-500 font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 5: Frequently Asked Questions */}
            <section className="space-y-8 pt-6">
              <div className="text-center">
                <span className="inline-block px-3 py-1 text-[10px] font-black text-[#0093CB] bg-[#0093CB]/10 rounded-full tracking-wider uppercase mb-3">
                  FAQ
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 font-[Unbounded] tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 max-w-xl mx-auto">
                  Find fast answers to common questions about tourist visa application, processing duration, and approval details.
                </p>
              </div>

              <div className="max-w-[760px] mx-auto space-y-4">
                {[
                  {
                    question: "What documents are required to apply for a tourist visa?",
                    answer: (
                      <div className="space-y-3">
                        <p className="text-[11px] sm:text-xs text-gray-600 font-medium leading-relaxed">
                          Here’s the extensive list of crucial documents that every individual needs to submit for tourist visa application processing:
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] sm:text-[11px] text-gray-500 font-bold">
                          {[
                            "Tourist Application Form",
                            "Passport photocopies with minimum validity of 3 to 6 months and 2 blank pages",
                            "Travel insurance",
                            "Valid evidence for finances",
                            "Accommodation proof",
                            "Return flight ticket proof",
                            "Essential civil documents",
                            "Other supporting documents"
                          ].map((doc, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 bg-gray-50 p-2 rounded-lg border border-gray-100/50">
                              <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                              <span className="leading-snug">{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  },
                  {
                    question: "How many steps are usually involved in visa processing?",
                    answer: (
                      <div className="space-y-3">
                        <p className="text-[11px] sm:text-xs text-gray-600 font-medium leading-relaxed">
                          When it comes to visa processing, only 4 simple steps are involved. These steps include:
                        </p>
                        <ol className="space-y-2 text-[10px] sm:text-[11px] text-gray-500 font-bold pl-4 list-decimal">
                          <li>Applying online for Visa</li>
                          <li>Get an appointment for consultation</li>
                          <li>Submitting of essential documents for verification</li>
                          <li>Pay the amount, visit for an interview and on approval receive your Visa.</li>
                        </ol>
                      </div>
                    )
                  },
                  {
                    question: "How long does it take to approve the tourist visa application?",
                    answer: (
                      <p className="text-[11px] sm:text-xs text-gray-600 font-medium leading-relaxed">
                        Presently, visa processing takes around <strong>21 workdays</strong> from the date on which the embassy received your application. It may exceed up to 30 days in certain cases. We further advise you to avoid making travel plans until you receive your passport and the application process is completed.
                      </p>
                    )
                  },
                  {
                    question: "Will I get the visa on an estimated date as mentioned on the platform?",
                    answer: (
                      <p className="text-[11px] sm:text-xs text-gray-600 font-medium leading-relaxed">
                        You will likely receive your visa on the estimated date mentioned on the platform. However, please note that visa processing times can be subject to change due to internal or external factors such as additional documentation requirements, security checks, and change of policy (if any).
                      </p>
                    )
                  },
                  {
                    question: "Why do Visa applications get rejected?",
                    answer: (
                      <div className="space-y-3">
                        <p className="text-[11px] sm:text-xs text-gray-600 font-medium leading-relaxed">
                          There are multiple reasons that can lead to visa rejections. Some of the common reasons include:
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] sm:text-[11px] text-gray-500 font-bold">
                          {[
                            "Incomplete Application",
                            "Violation of Embassy Rules",
                            "Issues in Passport",
                            "Not Meeting the Criteria",
                            "Submission of Incomplete Travel Details",
                            "Insufficient Travel Insurance",
                            "Inadequate Amount of Funds",
                            "Issues in Visa Interview"
                          ].map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 bg-red-50/50 p-2 rounded-lg border border-red-100/50 text-red-700">
                              <AlertCircle size={13} className="text-red-500 shrink-0 mt-0.5" />
                              <span className="leading-snug">{reason}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium italic mt-2">
                          Therefore, we highly recommend you to be very careful and precise while filling your visa applications.
                        </p>
                      </div>
                    )
                  },
                  {
                    question: "Can I reapply for a visa after it has been rejected?",
                    answer: (
                      <p className="text-[11px] sm:text-xs text-gray-600 font-medium leading-relaxed">
                        Absolutely yes, you can further reapply for a visa if it was rejected previously.
                      </p>
                    )
                  }
                ].map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`border rounded-2xl overflow-hidden bg-white transition-all duration-300 ${isOpen ? "border-[#0093CB] shadow-xs" : "border-gray-100 hover:border-[#0093CB]/30"}`}
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-5 text-left font-bold text-xs sm:text-sm text-gray-900 transition-colors hover:text-[#0093CB] cursor-pointer focus:outline-none"
                      >
                        <span>{item.question}</span>
                        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-[#0093CB]" : "text-gray-400"}`}>
                          <ChevronDown size={16} />
                        </span>
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[800px] border-t border-gray-50 p-5 bg-gray-50/30" : "max-h-0"
                          }`}
                      >
                        {item.answer}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        </main>
      </div>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default VisaPassport;
