import React, { useState, useEffect } from "react";
import MainNavbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/user/common/Footer";
import MainSearchBar from "@/components/User/main/Home/MainSearchBar";
import { Bus, MapPin, ShieldCheck, Clock, CreditCard, ChevronRight, ChevronDown, ChevronUp, Star, CheckCircle, Wifi, Monitor, Info, BatteryCharging } from "lucide-react";

// Using existing image assets
import img1 from "@/assets/image/Home/img1.png";
import img2 from "@/assets/image/Home/img2.png";
import img4 from "@/assets/image/Home/img4.png";
import img5 from "@/assets/image/Home/img5.png";
import img8 from "@/assets/image/Home/img8.png";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white shadow-lg shadow-blue-900/5' : 'bg-gray-50/50 hover:bg-white hover:border-gray-200'}`}>
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className={`font-bold pr-8 transition-colors ${isOpen ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-500'}`}>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'}`}
      >
        <p className="text-gray-600 font-medium leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const Buses = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  useEffect(() => {
    document.title = "Bus Tickets Booking - WalkawayTrip";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans flex flex-col justify-between">
      <MainNavbar />

      <main className="flex-grow pt-[36px] md:pt-[72px] pb-12">
        {/* --- Hero Section & Search Bar --- */}
        <section className="relative w-full pb-20">
          <div className="relative h-[450px] sm:h-[520px] w-full bg-[#0a2351] overflow-hidden">
            {/* Background Image using img5 */}
            <img 
              src={img5} 
              alt="Bus Travel" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity scale-105 hover:scale-100 transition-transform duration-[10s]"
            />
            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a2351]/90 via-[#0a2351]/70 to-transparent"></div>
            
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pb-24 sm:pb-32">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[Unbounded] font-extrabold text-white tracking-tight mb-4 max-w-2xl drop-shadow-lg leading-tight">
                Premium Bus <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-300">Travel.</span>
              </h1>
              <p className="text-blue-100 text-base sm:text-lg font-medium max-w-xl mb-8 leading-relaxed">
                Book Volvo, AC, and Luxury buses to any city in India. Unbeatable prices, instant confirmation.
              </p>
            </div>
          </div>

          {/* Search Bar Container */}
          <div className="relative z-20 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-[-100px] sm:mt-[-120px]">
             {/* The MainSearchBar already handles the active tab logic via route ('/buses') */}
             <MainSearchBar />
          </div>
        </section>

        {/* --- Why Choose Us Section --- */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-[#0a2351] tracking-tight mb-3">
              Why Book Buses With Us?
            </h2>
            <p className="text-gray-500 font-medium">India's most trusted premium bus booking platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex items-start gap-5 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Operators</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">We only partner with top-rated, verified bus operators to ensure your safety and comfort.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex items-start gap-5 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">On-Time Guarantee</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">Get real-time tracking for your bus. Over 98% of our premium buses depart exactly on time.</p>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex items-start gap-5 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <CreditCard size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Lowest Price</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">No hidden fees or surprise charges. We guarantee the lowest price for luxury bus travel.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Top Routes Banner --- */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-[#0a2351] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-center relative shadow-2xl">
            <div className="md:w-1/2 p-10 lg:p-16 relative z-10">
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-500/30">Trending Now</span>
              <h2 className="text-3xl lg:text-4xl font-[Unbounded] font-extrabold text-white mt-6 mb-4 leading-tight">
                Explore the <br/> Top Bus Routes.
              </h2>
              <p className="text-blue-200 mb-8 font-medium leading-relaxed">
                From bustling metropolitan cities to serene hill stations, travel across India in unparalleled comfort. Book your tickets now and get up to 20% off on your first ride.
              </p>
              <button className="bg-white text-[#0a2351] font-extrabold px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-gray-100 transition-colors">
                View All Routes <ChevronRight size={18} />
              </button>
            </div>
            
            <div className="md:w-1/2 h-64 md:h-full w-full relative">
              <img src={img2} alt="Travel Destination" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-[#0a2351]"></div>
            </div>
          </div>
        </section>

        {/* --- Know Your Bus Types --- */}
        <section className="bg-white py-20 border-t border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-[#0a2351] tracking-tight mb-3">
                Know Your Bus Types
              </h2>
              <p className="text-gray-500 font-medium">Choose the perfect comfort level for your journey</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Monitor className="text-blue-600" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Volvo AC</h3>
                <p className="text-gray-500 text-sm font-medium mb-4">Premium multi-axle buses with pushback seats, personal entertainment, and climate control.</p>
                <div className="flex gap-2">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-md">WIFI</span>
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-md">WATER</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BatteryCharging className="text-emerald-600" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">AC Sleeper</h3>
                <p className="text-gray-500 text-sm font-medium mb-4">Fully flat horizontal berths with curtains for privacy. Perfect for overnight long-distance travel.</p>
                <div className="flex gap-2">
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-md">BLANKET</span>
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-md">CHARGING</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-orange-900/5 transition-all group">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Bus className="text-orange-600" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">AC Seater</h3>
                <p className="text-gray-500 text-sm font-medium mb-4">Comfortable pushback seats with air conditioning. The perfect balance of cost and comfort for daytime trips.</p>
                <div className="flex gap-2">
                  <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-md">AC</span>
                  <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-md">PUSHBACK</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-purple-900/5 transition-all group">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="text-purple-600" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Non-AC Seater</h3>
                <p className="text-gray-500 text-sm font-medium mb-4">Standard economical buses perfect for short distances and budget-conscious travelers.</p>
                <div className="flex gap-2">
                  <span className="bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-1 rounded-md">BUDGET</span>
                  <span className="bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-1 rounded-md">LOCAL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Top Bus Operators --- */}
        <section className="bg-gray-50 py-20 border-t border-gray-200">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div>
                <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-[#0a2351] tracking-tight mb-3">
                  Trusted Partners
                </h2>
                <p className="text-gray-500 font-medium">Over 3,000+ top-rated bus operators across India</p>
              </div>
              <button className="text-blue-600 font-bold flex items-center gap-1 hover:text-blue-800 transition-colors">
                View All Operators <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {['VRL Travels', 'SRS Travels', 'Kallada', 'Orange Tours', 'Neeta Bus', 'IntrCity'].map((operator, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                    <Bus size={24} />
                  </div>
                  <span className="font-bold text-gray-800 text-sm text-center">{operator}</span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    4.{8 - (index % 3)} <Star size={10} className="fill-current" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Smart Boarding Tips --- */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-[#0a2351] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 md:w-1/3">
              <h2 className="text-3xl lg:text-4xl font-[Unbounded] font-extrabold text-white mb-4 leading-tight">
                Smart <br/> Boarding Tips
              </h2>
              <p className="text-blue-200 font-medium">Make your bus journey completely hassle-free with these expert tips.</p>
            </div>
            
            <div className="relative z-10 md:w-2/3 grid sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-white">
                  <Clock size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Arrive Early</h3>
                <p className="text-blue-100 text-sm font-medium">Aim to reach your boarding point at least 15-20 minutes before the scheduled departure time.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-white">
                  <Info size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Track Your Bus</h3>
                <p className="text-blue-100 text-sm font-medium">Use the Live Tracking link sent via SMS/WhatsApp to know the exact location of your bus.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-white">
                  <CheckCircle size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">M-Ticket Valid</h3>
                <p className="text-blue-100 text-sm font-medium">No need to print! Showing the M-Ticket on your phone along with a valid ID is completely fine.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-white">
                  <MapPin size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Verify Boarding</h3>
                <p className="text-blue-100 text-sm font-medium">Large cities have multiple boarding points. Double-check your exact pickup location on the ticket.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQs Section --- */}
        <section className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-[#0a2351] tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 font-medium">Everything you need to know about booking buses</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Do I need to carry a physical printout of my ticket?",
                answer: "No, you do not need a physical printout for most operators. Showing the M-Ticket (SMS/WhatsApp/Email) on your phone along with a valid Government ID (Aadhaar, PAN, Voter ID) is sufficient."
              },
              {
                question: "What happens if my bus is delayed or cancelled?",
                answer: "If a bus is cancelled by the operator, you will receive a 100% refund automatically. For significant delays, operators usually inform passengers via SMS. You can also use our Live Tracking feature to see the current status."
              },
              {
                question: "Can I change my boarding point after booking?",
                answer: "In some cases, yes! You can contact the bus operator directly (number provided on the ticket) at least 4 hours before departure. Subject to availability and operator policy, they may allow boarding from a different listed stop."
              },
              {
                question: "What is the baggage allowance on buses?",
                answer: "Generally, passengers are allowed up to 15 kg of luggage stored in the bus boot, and one small cabin bag. Excessive luggage may incur additional charges payable directly to the operator at boarding."
              },
              {
                question: "Are pets allowed on the bus?",
                answer: "Most private bus operators do not allow pets on board for the comfort of other passengers. If you absolutely need to travel with a pet, you must contact the specific operator beforehand for permission."
              }
            ].map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Buses;
