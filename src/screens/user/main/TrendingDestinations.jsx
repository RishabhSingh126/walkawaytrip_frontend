import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/User/main/common/Navbar';
import Footer from '../../../components/User/common/Footer';
import ContactFooter from '../../../components/User/Landing/ContactPage';

const TrendingDestinations = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [destinations, setDestinations] = useState([
    { id: 1, title: "Nature Escape", location: "Switzerland", img: "/menuLogo/Link.svg" },
    { id: 2, title: "Golden Desert", location: "Dubai", img: "/menuLogo/Link (3).svg" },
    { id: 3, title: "Tropical Island", location: "Maldives", img: "/menuLogo/Link (2).svg" },
    { id: 4, title: "Ancient City", location: "Rome", img: "/menuLogo/Link (1).svg" },
    { id: 5, title: "Mountain Peak", location: "Nepal", img: "/menuLogo/Link.svg" },
    { id: 6, title: "Coastal Breeze", location: "Greece", img: "/menuLogo/Link (3).svg" },
    { id: 7, title: "Urban Lights", location: "New York", img: "/menuLogo/Link (2).svg" },
    { id: 8, title: "Cherry Blossom", location: "Japan", img: "/menuLogo/Link (1).svg" },
  ]);

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const searchResults = [
        { id: 1, title: "Eiffel Tower", location: "Paris, France", img: "/menuLogo/Link.svg" },
        { id: 2, title: "Louvre Museum", location: "Paris, France", img: "/menuLogo/Link (3).svg" },
        { id: 3, title: "Notre-Dame", location: "Paris, France", img: "/menuLogo/Link (2).svg" },
        { id: 4, title: "Arc de Triomphe", location: "Paris, France", img: "/menuLogo/Link (1).svg" },
        { id: 5, title: "Seine River", location: "Paris, France", img: "/menuLogo/Link.svg" },
        { id: 6, title: "Montmartre", location: "Paris, France", img: "/menuLogo/Link (3).svg" },
        { id: 7, title: "Versailles", location: "Paris, France", img: "/menuLogo/Link (2).svg" },
        { id: 8, title: "Disney Paris", location: "Paris, France", img: "/menuLogo/Link (1).svg" },
      ];

      // If location matches Paris, show Paris results, otherwise just scramble
      if (location.toLowerCase().includes('paris')) {
        setDestinations(searchResults);
        setSearchPerformed(true);
      } else {
        setDestinations([...destinations].sort(() => Math.random() - 0.5));
        setSearchPerformed(true);
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-0">
        {/* Full-width Hero Section */}
        <div className="w-full h-[350px] relative overflow-hidden">
          <img
            src="/menuLogo/Frame 735.svg"
            alt="Trending Destinations Header"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Placeholder for more content */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-1 ml-1">Popular Trending Destination near you</h2>
          <p className="text-sm font-medium text-gray-500 mb-6 ml-1">Find deals on Trending Destination near by your location</p>

          {/* Search Bar Section */}
          <div className="flex gap-4 mb-8 max-w-7xl">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Enter your Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-12 px-6 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0093CB] focus:ring-1 focus:ring-[#0093CB] transition-all"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-[#0093CB] text-white px-10 h-12 rounded-lg font-bold text-base hover:bg-[#007094] transition-all shadow-md disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0093CB]"></div>
            </div>
          ) : searchPerformed ? (
            /* Three-section result layout */
            <div className="flex flex-col lg:flex-row gap-6 items-start animate-fadeIn">
              {/* Left Sidebar - Frame (1).svg */}
              <div className="w-full lg:w-[240px] flex-shrink-0">
                <img
                  src="/menuLogo/Frame (1).svg"
                  alt="Filters"
                  className="w-full h-auto shadow-sm rounded-lg"
                />
              </div>

              {/* Main Content - Frame (2).svg */}
              <div className="flex-grow">
                <img
                  src="/menuLogo/Frame (2).svg"
                  alt="Search Results"
                  className="w-full h-auto shadow-sm rounded-lg"
                />
              </div>

              {/* Right Sidebar - Frame 744.svg */}
              <div className="w-full lg:w-[320px] flex-shrink-0">
                <img
                  src="/menuLogo/Frame 744.svg"
                  alt="Promotions"
                  className="w-full h-auto shadow-sm rounded-lg"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="relative h-64 overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 right-4 bg-white/90 p-1.5 rounded-full shadow-sm">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Travel Investment Section */}
        {!searchPerformed && (
          <>
            <div className="max-w-7xl mx-auto px-4 pb-4">
              {/* Heading + Tower layout */}
              <div className="relative">
                {/* Bold Heading */}
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8 leading-tight max-w-sm ml-[3%]">
                  Travel. It's the best <br /> investment you can make.
                </h2>

                {/* Tower of Pisa Image — bleeds above the banner, bottom aligned to banner bottom */}
                <div className="absolute z-10 pointer-events-none" style={{ right: '100px', bottom: '-15px' }}>
                  <img
                    src="/menuLogo/pngegg 1.svg"
                    alt="Tower of Pisa"
                    style={{ width: '360px', height: '560px', objectFit: 'contain', objectPosition: 'bottom' }}
                  />
                </div>

                {/* Banner Card */}
                <div className="relative h-[340px] rounded-2xl overflow-hidden mb-8 shadow-md mx-[3%]">
                  {/* Background Image */}
                  <img
                    src="/menuLogo/unsplash__uPh7lbSm4Y.svg"
                    alt="Tower of Pisa in Italy"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
                  {/* Text & Button */}
                  <div className="absolute inset-0 flex flex-col justify-center pl-23 pr-12 z-10">
                    <div className="flex flex-col items-start">
                      <h3 className="text-white text-6xl font-extrabold mb-12 drop-shadow-lg whitespace-nowrap">Tower of Pisa in Italy</h3>
                      <button 
                        onClick={() => navigate('/trending-destinations/pisa-tower')}
                        className="bg-[#0093CB] text-white font-semibold text-sm px-20 py-2.5 hover:bg-[#007094] transition-all shadow-lg cursor-pointer"
                      >
                        Visit
                      </button>
                    </div>
                  </div>
                </div>
              </div>

                {/* Travel Advice Section */}
                <div className="relative mt-20 mb-12 px-[3%]">
                  <img
                    src="/menuLogo/Frame 742.svg"
                    alt="Travel Advice"
                    className="w-full h-auto shadow-sm rounded-2xl"
                  />
                </div>

            </div>
            <ContactFooter />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TrendingDestinations;
