import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { Clock, MapPin, Trash2, Globe } from "lucide-react";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/User/Landing/ContactPage";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(items);
    } catch (e) {
      setWishlist([]);
    }
  }, []);

  const handleRemove = (title) => {
    try {
      const updated = wishlist.filter((item) => item.title !== title);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setWishlist(updated);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Top blue section — contains back link, title, and container.svg */}
        <div
          style={{
            background: "linear-gradient(to bottom, #C8E9F0 0%, #E8F6FA 60%, #ffffff 100%)",
          }}
          className="pt-20 pb-6 px-4 sm:px-8 lg:px-16"
        >
          <div className="max-w-[1440px] mx-auto">
            {/* Back Link */}
            <Link
              to="/my-account"
              className="flex items-center gap-2 text-gray-800 font-medium mb-4 mt-4 hover:text-[#0093CB] transition-colors inline-flex"
            >
              <MdArrowBack size={18} />
              <span className="text-sm">Back to My Account</span>
            </Link>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-black text-[#1A1A1A] tracking-tight mb-6">
              Wishlist
            </h1>

            {/* Container Section — top */}
            <section className="w-full relative">
              <img
                src="/menuLogo/container.svg"
                alt="Explore more"
                className="w-full h-auto block rounded-xl"
              />
              {/* Explore button overlay */}
              <div className="absolute bottom-[18%] left-[4%]">
                <Link
                  to="/"
                  className="bg-white text-[#1A1A1A] font-bold px-8 py-2.5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all text-sm tracking-wide inline-block"
                >
                  Explore
                </Link>
              </div>
            </section>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <div className="bg-white pb-16 px-4 sm:px-8 lg:px-16">
          <div className="max-w-[1440px] mx-auto">
            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/30">
                <span className="text-4xl mb-4">🏝️</span>
                <h3 className="text-lg font-bold text-gray-800">Your wishlist is empty</h3>
                <p className="text-gray-500 text-sm mt-1 max-w-sm">
                  Explore our premium destination plans and luxury hotels to start adding your favorites here.
                </p>
                <Link
                  to="/"
                  className="mt-6 bg-[#005fad] text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#004a8a] transition-all tracking-wide"
                >
                  Explore Trips & Hotels
                </Link>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-6 font-[Unbounded]">
                  My Saved Items ({wishlist.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {wishlist.map((item, index) => (
                    <div
                      key={index}
                      className="group bg-white rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                    >
                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <span className="absolute top-3 left-3 bg-[#005fad] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 tracking-wider">
                          {item.type}
                        </span>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 flex-grow flex flex-col">
                        {item.type === "destination" && (
                          <div className="flex items-center gap-4 text-[10px] text-gray-500 font-semibold mb-2">
                            <div className="flex items-center gap-1">
                              <Clock size={11} className="text-[#005fad]" />
                              {item.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={11} className="text-[#005fad]" />
                              {item.locations}
                            </div>
                          </div>
                        )}

                        <h3 className="text-sm font-bold text-gray-800 leading-snug mb-3 line-clamp-2 min-h-[36px] font-[Unbounded]">
                          {item.title}
                        </h3>

                        <div className="mt-auto">
                          <p className="text-[10px] text-gray-500 mb-0.5">Price</p>
                          <p className="text-sm font-semibold text-gray-900">{item.price}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-row gap-1.5 px-3 pb-4">
                        <button
                          onClick={() => handleRemove(item.title)}
                          className="w-full py-1.5 text-[11px] font-semibold bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Trash2 size={12} />
                          Remove
                        </button>
                        <button
                          onClick={() => {
                            if (item.type === "destination") {
                              window.location.href = "https://www.booking.com/";
                            } else {
                              window.location.href = "https://www.booking.com/";
                            }
                          }}
                          className="w-full py-1.5 text-[11px] font-semibold bg-[#005fad] text-white border border-[#005fad] hover:bg-white hover:text-black hover:border-[#005fad] transition-colors duration-200 cursor-pointer tracking-wide flex items-center justify-center gap-1"
                        >
                          <Globe size={12} />
                          {item.type === "destination" ? "Book Trip" : "Visit Site"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default Wishlist;
