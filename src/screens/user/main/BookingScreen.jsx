import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/User/Landing/ContactPage";
import { MdArrowBack } from "react-icons/md";
import {
  Search, Calendar, Users, MapPin, Star, Building, Plane, Car,
  Map, Compass, Sparkles, Filter, Check, ShieldCheck, Heart,
  ArrowRight, Landmark, Info, Tag, User, Phone, Mail, CreditCard,
  ChevronRight, Award, ChevronDown, CheckCircle, Ticket, Printer, Clock,
  MessageSquare, ThumbsUp, ChevronUp, HelpCircle, Globe, Snowflake, PlusCircle,
  Plus, Minus, Trash, Train, Ship, X, Monitor, BatteryCharging, Bus
} from "lucide-react";
import toast from "react-hot-toast";
import TrainDetails from "@/components/User/main/booking/TrainDetails";
import CruiseDetails from "@/components/User/main/booking/CruiseDetails";
import RailwayServices from "@/components/User/main/booking/RailwayServices";
import PromoOffers from "@/components/User/main/Home/PromoOffers";
import TravelSection from "@/components/User/main/Home/TravelSection";

// Actual Search Bar Components
import StaysSearch from "@/components/User/main/Home/searchBars/StaysSearch";
import FlightsSearch from "@/components/User/main/Home/searchBars/FlightsSearch";
import TrainsSearch from "@/components/User/main/Home/searchBars/TrainsSearch";
import BusesSearch from "@/components/User/main/Home/searchBars/BusesSearch";
import CarsSearch from "@/components/User/main/Home/searchBars/CarsSearch";
import CruisesSearch from "@/components/User/main/Home/searchBars/CruisesSearch";
import HolidaysSearch from "@/components/User/main/Home/searchBars/HolidaysSearch";
import AttractionsSearch from "@/components/User/main/Home/searchBars/AttractionsSearch";
import HotelListing from "@/components/User/main/Home/HotelListing";
import AiTripPlanner from "@/components/User/main/Home/AiTripPlanner";

import TravelBrands from "@/components/User/main/Home/TravelBrands";
import TravelPlanner from "@/components/User/main/Home/TravelPlanner";
import Option from "@/components/User/main/Home/option";
import GlobalHeroBanner from "@/components/User/main/Home/GlobalHeroBanner";
import img2 from "@/assets/image/Home/img2.png";

const BusFAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white shadow-lg shadow-blue-900/5' : 'bg-gray-50/50 hover:bg-white hover:border-gray-200'}`}>
      <button
        type="button"
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group bg-transparent border-none"
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

// Database of Stays, Flights, Cars and Attractions
const STAYS_DATABASE = [
  {
    id: "h1",
    city: "Delhi",
    name: "The Taj Palace New Delhi",
    stars: 5,
    rating: 9.4,
    ratingText: "Exceptional",
    reviewsCount: 1250,
    price: 18500,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
    distance: "1.2 km from center",
    benefits: ["Free cancellation", "No prepayment needed", "Breakfast included"],
    rooms: [
      { name: "Deluxe King Room", price: 18500, maxGuests: 2, includes: "Free breakfast, Free Wi-Fi" },
      { name: "Executive Suite", price: 32000, maxGuests: 3, includes: "Lounge access, Free breakfast, Airport pickup" }
    ]
  },
  {
    id: "h2",
    city: "Delhi",
    name: "Vivanta New Delhi, Dwarka",
    stars: 5,
    rating: 8.9,
    ratingText: "Fabulous",
    reviewsCount: 840,
    price: 14000,
    image: "https://images.trvl-media.com/lodging/9000000/8740000/8738300/8738241/9fdc0ad2.jpg?impolicy=fcrop&w=900&h=675&p=1&q=medium",
    distance: "18 km from center",
    benefits: ["Free cancellation", "Special discount available"],
    rooms: [
      { name: "Superior Queen Room", price: 14000, maxGuests: 2, includes: "Free Wi-Fi" },
      { name: "Premium Suite", price: 24000, maxGuests: 3, includes: "Free breakfast, Free Wi-Fi" }
    ]
  },
  {
    id: "h3",
    city: "Paris",
    name: "Hôtel Ritz Paris",
    stars: 5,
    rating: 9.8,
    ratingText: "Superb",
    reviewsCount: 2100,
    price: 45000,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
    distance: "0.2 km from center",
    benefits: ["Free cancellation", "Michelin starred restaurant inside"],
    rooms: [
      { name: "Superior Ritz Room", price: 45000, maxGuests: 2, includes: "Gourmet Breakfast, Spa access" }
    ]
  },
  {
    id: "h4",
    city: "Tokyo",
    name: "Shinjuku Park Hyatt Tokyo",
    stars: 5,
    rating: 9.3,
    ratingText: "Exceptional",
    reviewsCount: 1490,
    price: 36000,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80",
    distance: "0.8 km from center",
    benefits: ["Free cancellation", "Skyline swimming pool access"],
    rooms: [
      { name: "Park King Room", price: 36000, maxGuests: 2, includes: "High-speed Wi-Fi, Pool pass" }
    ]
  },
  {
    id: "h5",
    city: "Delhi",
    name: "Hotel Grand Grosewood IGI Airport Delhi",
    stars: 3,
    rating: 6.8,
    ratingText: "Pleasant",
    reviewsCount: 15,
    price: 18634,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80",
    distance: "500 m walking from Delhi Aerocity station",
    benefits: ["Free cancellation", "No prepayment needed", "Continental breakfast included"],
    address: "R/7/51 Gali Number 48 Gujjar chowk, 122010 Gurgaon, India",
    rooms: [
      { name: "Double Room", price: 18634, maxGuests: 2, includes: "Free breakfast, Free Wi-Fi, Balcony, Private Kitchen", desc: "1 full bed", originalPrice: 29040, taxes: 932 },
      { name: "Superior King Suite", price: 32484, maxGuests: 2, includes: "Free breakfast, Free Wi-Fi, Balcony, Private Kitchen", desc: "Bedroom 1: 1 full bed | Living room: 1 sofa bed", originalPrice: 50624, taxes: 1624 },
      { name: "Family Room", price: 43649, maxGuests: 2, includes: "Free breakfast, Free Wi-Fi, Balcony, Private Kitchen", desc: "1 twin bed and 1 king bed", originalPrice: 68024, taxes: 2182 },
      { name: "Standard Quadruple Room", price: 54737, maxGuests: 2, includes: "Free breakfast, Free Wi-Fi, Balcony, Private Kitchen", desc: "2 king beds", originalPrice: 85304, taxes: 2737 }
    ]
  }
];

const CRUISES_DATABASE = [
  {
    id: "cr-1",
    name: "7-Night Western Caribbean & Perfect Day",
    ship: "Icon of the Seas",
    line: "Royal Caribbean",
    departurePort: "Miami, FL",
    destinationsList: ["Miami, Florida", "Roatan, Honduras", "Costa Maya, Mexico", "Cozumel, Mexico", "Perfect Day at CocoCay, Bahamas", "Miami, Florida"],
    destinations: "Miami &bull; Roatan &bull; Costa Maya &bull; Cozumel &bull; Perfect Day at CocoCay",
    duration: "7 Nights",
    nights: 7,
    price: 84999,
    rating: 4.9,
    ratingText: "Exceptional",
    reviewsCount: 4210,
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&auto=format&fit=crop&q=80",
    benefits: ["Perfect Day at CocoCay included", "Kids Sail Free", "Up to $350 Instant Savings"],
    rooms: [
      { name: "Interior Stateroom", price: 84999, maxGuests: 4, includes: "Two twin beds, Private bathroom, 24-hr Room Service" },
      { name: "Ocean View Balcony", price: 119999, maxGuests: 4, includes: "Private balcony, Sitting area with sofa, Ocean view, Deluxe amenities" },
      { name: "Grand Suite - 1 Bedroom", price: 215999, maxGuests: 5, includes: "Large balcony, Complimentary dining at specialty restaurants, Concierge service, VIP lounge access" }
    ],
    itinerary: [
      { day: 1, port: "Miami, Florida", activities: "Board the ship, explore the Royal Promenade, and join the Sail Away party." },
      { day: 2, port: "Cruising at Sea", activities: "Relax by the pool, try the FlowRider surf simulator, or visit the Vitality Spa." },
      { day: 3, port: "Roatan, Honduras", activities: "Discover pristine coral reefs, go ziplining, or relax on Tabyana Beach." },
      { day: 4, port: "Costa Maya, Mexico", activities: "Explore ancient Mayan ruins or unwind at the Maya Chan Beach resort." },
      { day: 5, port: "Cozumel, Mexico", activities: "Go snorkeling in crystal-clear waters or shop along the waterfront plaza." },
      { day: 6, port: "Cruising at Sea", activities: "Watch a spectacular Broadway show in the Royal Theater or dine at Chops Grille." },
      { day: 7, port: "Perfect Day at CocoCay, Bahamas", activities: "Enjoy the private island featuring Thrill Waterpark and chill beaches." },
      { day: 8, port: "Miami, Florida", activities: "Disembarkation and head home with wonderful memories!" }
    ],
    highlights: ["Thrill Waterpark (largest waterslide in North America)", "AquaDome aqua shows", "Surfside family neighborhood", "40+ dining venues & bars"],
    neighborhoods: [
      { name: "Central Park", desc: "A lush open-air sanctuary featuring over 30,000 real plants, upscale dining, and quiet pathways.", icon: "🌳" },
      { name: "Boardwalk", desc: "Classic seaside vibes with a handmade carousel, arcade games, candy shops, and the high-diving AquaTheater.", icon: "🎠" },
      { name: "Surfside", desc: "A vibrant neighborhood purpose-built for young families, featuring splash pads, kids dining, and lounges.", icon: "👶" },
      { name: "Royal Promenade", desc: "The bustling heartbeat of the ship, lined with duty-free boutiques, pub music, cafés, and laser shows.", icon: "🛍️" }
    ],
    deckPlans: [
      { deck: 18, name: "Suite Neighborhood", highlights: "Exclusive suites, private sundeck, Coastal Kitchen restaurant" },
      { deck: 15, name: "Thrill Island & Pools", highlights: "Category 6 water park, FlowRider, Royal Bay pool, zip line" },
      { deck: 8, name: "Central Park & Chill Island", highlights: "Central Park gardens, Chops Grille, park cafes, ocean balconies" },
      { deck: 6, name: "Boardwalk & Royal Promenade", highlights: "Carousel, AquaTheater, Pesky Parrot bar, retail shops" },
      { deck: 3, name: "Royal Theater & Staterooms", highlights: "Theater entrance, main dining room, guest services" }
    ],
    fareInclusions: {
      included: [
        "Standard multi-course Main Dining Room menus",
        "Windjammer International Buffet dining",
        "Entrance to the Royal Theater Broadway shows",
        "Access to all 7 onboard pools and water slides",
        "FlowRider surf simulator lessons",
        "Adventure Ocean youth programs & kids club"
      ],
      excluded: [
        "Deluxe Beverage Package (cocktails, beers, sodas)",
        "Specialty dining cover charges (Chops Grille, Izumi)",
        "VOOM high-speed satellite Wi-Fi access",
        "Shore excursion tours & port transfers",
        "Vitality Spa massages & skin treatments",
        "Casino Royale credits & slot tournament entry"
      ]
    }
  },
  {
    id: "cr-2",
    name: "4-Night Bahamas & Perfect Day Cruise",
    ship: "Utopia of the Seas",
    line: "Royal Caribbean",
    departurePort: "Port Canaveral, FL",
    destinationsList: ["Port Canaveral, Florida", "Nassau, Bahamas", "Perfect Day at CocoCay, Bahamas", "Port Canaveral, Florida"],
    destinations: "Port Canaveral &bull; Nassau &bull; Perfect Day at CocoCay",
    duration: "4 Nights",
    nights: 4,
    price: 49999,
    rating: 4.8,
    ratingText: "Excellent",
    reviewsCount: 2190,
    image: "https://images.unsplash.com/photo-1554254648-2d58a1bc3fd5?w=600&auto=format&fit=crop&q=80",
    benefits: ["Brand new ship for 2024", "Perfect Day at CocoCay included", "Complimentary specialty lunch"],
    rooms: [
      { name: "Interior Stateroom", price: 49999, maxGuests: 4, includes: "Comfy twin beds, virtual balcony view" },
      { name: "Ocean View Balcony", price: 69999, maxGuests: 4, includes: "Step out onto your private balcony overlooking the Bahamas" },
      { name: "Owner's Suite - 1 Bedroom", price: 139999, maxGuests: 4, includes: "Expansive suite with premium dining and full VIP suite benefits" }
    ],
    itinerary: [
      { day: 1, port: "Port Canaveral, Florida", activities: "Board the World's Biggest Weekend ship, and explore the Central Park neighborhood." },
      { day: 2, port: "Nassau, Bahamas", activities: "Enjoy duty-free shopping, visit Atlantis Paradise Island, or swim with dolphins." },
      { day: 3, port: "Perfect Day at CocoCay, Bahamas", activities: "Plunge down waterslides or float in the largest freshwater pool in the Caribbean." },
      { day: 4, port: "Cruising at Sea", activities: "Try the Ultimate Abyss dry slide, watch ice skating shows, and dine at Giovanni's Italian Kitchen." },
      { day: 5, port: "Port Canaveral, Florida", activities: "Disembark after an unforgettable weekend." }
    ],
    highlights: ["Ultimate Abyss (tallest slide at sea)", "AquaTheater diving spectacles", "Studio B ice rink shows", "Pesky Parrot tiki bar"],
    neighborhoods: [
      { name: "Pool & Sports Zone", desc: "High-octane deck with double waterslides, sports courts, and giant outdoor movies.", icon: "🏊" },
      { name: "Royal Promenade", desc: "Spanning two decks with pubs, pizza parlors, live music venues, and karaokes.", icon: "🍻" },
      { name: "Central Park", desc: "Quiet wooded garden walks with cafes, acoustic musicians, and upscale shopping.", icon: "🌿" }
    ],
    deckPlans: [
      { deck: 16, name: "Sports Deck & Windjammer", highlights: "Ultimate Abyss entrance, sports courts, buffet dining" },
      { deck: 15, name: "Pool Deck & Solarium", highlights: "Main pool, Splashaway Bay, adults-only Solarium retreat" },
      { deck: 8, name: "Central Park & Staterooms", highlights: "Central Park walkways, specialty dining, balcony rooms" },
      { deck: 5, name: "Royal Promenade & Theater", highlights: "Sorento's Pizza, Pesky Parrot tiki bar, Main Theater" }
    ],
    fareInclusions: {
      included: [
        "Main Dining Room rotating menus",
        "Windjammer Buffet breakfast, lunch, and dinner",
        "Access to the Ultimate Abyss slide and splash zones",
        "Onboard comedy shows & musical performances",
        "Fitness center gymnasium access",
        "Pool deck sun loungers and towel service"
      ],
      excluded: [
        "Alcoholic beverages & canned soft drinks",
        "Specialty dining (Giovanni's Italian Table)",
        "Onboard Wi-Fi internet access package",
        "Off-ship excursions in Nassau or CocoCay private cabanas",
        "Spa aromatherapy and thermal suites",
        "In-cabin mini-bar items"
      ]
    }
  },
  {
    id: "cr-3",
    name: "7-Night Alaska Glacier Cruise",
    ship: "Ovation of the Seas",
    line: "Royal Caribbean",
    departurePort: "Seattle, WA",
    destinationsList: ["Seattle, Washington", "Juneau, Alaska", "Skagway, Alaska", "Endicott Arm & Dawes Glacier", "Victoria, British Columbia", "Seattle, Washington"],
    destinations: "Seattle &bull; Juneau &bull; Skagway &bull; Endicott Arm &bull; Victoria",
    duration: "7 Nights",
    nights: 7,
    price: 98999,
    rating: 4.8,
    ratingText: "Superb",
    reviewsCount: 3100,
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    benefits: ["Breathtaking glacier viewing", "North Star observation capsule", "Indoor RipCord by iFly"],
    rooms: [
      { name: "Interior Stateroom", price: 98999, maxGuests: 4, includes: "Spacious interior room with desk and sitting area" },
      { name: "Ocean View Balcony", price: 135999, maxGuests: 4, includes: "Perfect for viewing glaciers and Alaskan wildlife from your private space" },
      { name: "Grand Suite - 2 Bedroom", price: 279999, maxGuests: 8, includes: "Luxury accommodations, concierge service, and panoramic glacier views" }
    ],
    itinerary: [
      { day: 1, port: "Seattle, Washington", activities: "Depart from the Emerald City and check out the SeaPlex activity zone." },
      { day: 2, port: "Cruising at Sea", activities: "Experience skydiving with RipCord by iFly or take in views from the North Star capsule." },
      { day: 3, port: "Cruising Alaska's Inside Passage", activities: "View majestic fjords and watch for whales from the glass-walled Two70 lounge." },
      { day: 4, port: "Juneau, Alaska", activities: "Visit the Mendenhall Glacier, go dog sledding, or join a whale-watching tour." },
      { day: 5, port: "Skagway, Alaska", activities: "Ride the historic White Pass & Yukon Route Railroad through mountain passes." },
      { day: 6, port: "Endicott Arm & Dawes Glacier", activities: "Stand on deck for a close-up view of the towering blue-ice glacier face." },
      { day: 7, port: "Victoria, British Columbia", activities: "Explore the famous Butchart Gardens and historic inner harbour." },
      { day: 8, port: "Seattle, Washington", activities: "Return to Seattle for disembarkation." }
    ],
    highlights: ["North Star observation capsule (300 ft above sea)", "RipCord by iFLY skydiving simulator", "SeaPlex indoor sports complex", "Two70 immersive multimedia shows"],
    neighborhoods: [
      { name: "SeaPlex", desc: "The largest indoor active space at sea, featuring bumper cars, roller skating, and basketball.", icon: "🎮" },
      { name: "Two70", desc: "Transformative lounge with 270-degree ocean views, turning into an aerial stage at night.", icon: "🎭" },
      { name: "Solarium", desc: "Multi-tiered glass-encased adults retreat featuring quiet pools and sunbeds.", icon: "☀️" }
    ],
    deckPlans: [
      { deck: 15, name: "SeaPlex & North Star", highlights: "Indoor sports arena, North Star observation arm, RipCord simulator" },
      { deck: 14, name: "Pools & Solarium", highlights: "Outdoor pool, indoor pool, Solarium glass dome" },
      { deck: 5, name: "Royal Esplanade & Two70", highlights: "Two70 lounge, boutiques, pub, Boleros Latin club" },
      { deck: 3, name: "Main Dining & Theater", highlights: "Royal Theater, main dining deck, casino room" }
    ],
    fareInclusions: {
      included: [
        "Dynamic Main Dining Room complimentary menus",
        "Windjammer Marketplace buffet meals",
        "North Star 360 observation flight (selected times)",
        "Access to bumper cars & roller skating at SeaPlex",
        "Two70 multi-screen show entries",
        "Indoor heated pools & whirlpools access"
      ],
      excluded: [
        "Beverages (beer, wine, cocktails, sodas)",
        "Specialty dining covers (Jamie's Italian)",
        "VOOM internet access packages",
        "Whale watching and glacier helicopter tours in Alaska",
        "Spa facials and massage programs",
        "Premium dining with the Chef's Table experience"
      ]
    }
  },
  {
    id: "cr-4",
    name: "2-Night Halong Bay Wellness Voyage",
    ship: "Hera Grand Luxury",
    line: "Hera Cruises",
    departurePort: "Halong Bay, Vietnam",
    destinationsList: ["Halong Bay", "Luon Cave", "Titop Island", "Lan Ha Bay", "Halong Bay"],
    destinations: "Halong Bay &bull; Luon Cave &bull; Titop Island &bull; Lan Ha Bay",
    duration: "2 Nights",
    nights: 2,
    price: 38999,
    rating: 5.0,
    ratingText: "Exceptional",
    reviewsCount: 840,
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600&auto=format&fit=crop&q=80",
    benefits: ["Private Oceanview Jacuzzi Suite", "All-Glass Panorama Walls", "Complimentary Hera Spa Therapy", "Organic Fusion Meals"],
    rooms: [
      { name: "Junior Suite with Balcony", price: 38999, maxGuests: 2, includes: "All-glass windows, private balcony, ocean view bathtub" },
      { name: "Executive Suite", price: 54999, maxGuests: 3, includes: "Double-height panoramic view, direct access to wellness deck" },
      { name: "Presidential Suite", price: 98999, maxGuests: 4, includes: "Full luxury apartment, private Jacuzzi, butler service, unlimited spa" }
    ],
    itinerary: [
      { day: 1, port: "Halong Bay, Vietnam", activities: "Board the wooden boutique vessel, attend the traditional Vietnamese tea welcome, and set sail." },
      { day: 2, port: "Luon Cave & Titop Island", activities: "Kayak through the ancient karst stalactites of Luon Cave. Hike the peak of Titop Island for panoramic sunset views." },
      { day: 3, port: "Halong Bay, Vietnam", activities: "Morning Tai Chi on the sundeck. Cooking class making fresh spring rolls. Disembarkation." }
    ],
    highlights: ["Hera Spa & Herbal Sauna", "Traditional Tea Ceremonies", "Sunset Live Flute Recitals", "Squid Fishing & Cooking Classes"],
    neighborhoods: [
      { name: "Lotus Sundeck", desc: "Exquisite sun loungers under canvas sails, morning Tai Chi sessions, and sunset concerts.", icon: "🌸" },
      { name: "Wellness Haven", desc: "Traditional dry saunas, steam rooms, private therapeutic massage suites, and herbal pools.", icon: "🧘" },
      { name: "Lily Organic Lounge", desc: "Indochine dining hall serving custom chef menus, local organic teas, and wine pairings.", icon: "🍵" }
    ],
    deckPlans: [
      { deck: 4, name: "Lotus Sundeck & Bar", highlights: "Tai Chi sundeck, open-air bar, sunset viewing bridge" },
      { deck: 3, name: "Lily Restaurant & Lounge", highlights: "Indochine dining room, piano lounge, reception desk" },
      { deck: 2, name: "Executive & President Suites", highlights: "Presidential Suites with private deck jacuzzis, library" },
      { deck: 1, name: "Wellness Deck & Cabins", highlights: "Hera Spa, saunas, Junior Suites, boarding dock" }
    ],
    fareInclusions: {
      included: [
        "Vietnamese Fusion organic lunch & dinners",
        "Welcome tea ceremony and local fresh fruit bowls",
        "Daily guided morning Tai Chi deck exercises",
        "Standard kayaking in Luon Cave with personal gear",
        "Onboard cooking classes & squid fishing equipment",
        "Boarding harbor lounge access and shuttle boats"
      ],
      excluded: [
        "Premium foreign spirits & wine cellars",
        "Wellness Spa full massages & acupuncture therapies",
        "Special private island dining arrangements",
        "Private speedboat charter tours around the bay",
        "Laundry services and personal tailoring",
        "Gratuities for cruise staff & tour guides"
      ]
    }
  },
  {
    id: "cr-5",
    name: "7-Night Spain, France & Italy Cruise",
    ship: "Symphony of the Seas",
    line: "Royal Caribbean",
    departurePort: "Barcelona, Spain",
    destinationsList: ["Barcelona, Spain", "Palma de Mallorca, Spain", "Marseille, France", "La Spezia, Italy", "Civitavecchia (Rome), Italy", "Naples, Italy", "Barcelona, Spain"],
    destinations: "Barcelona &bull; Palma &bull; Marseille &bull; La Spezia &bull; Civitavecchia &bull; Naples",
    duration: "7 Nights",
    nights: 7,
    price: 92999,
    rating: 4.8,
    ratingText: "Superb",
    reviewsCount: 3410,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format&fit=crop&q=80",
    benefits: ["Free room upgrade", "Up to $400 Onboard credit", "Instant Booking confirmation"],
    rooms: [
      { name: "Interior Stateroom", price: 92999, maxGuests: 4, includes: "Comfy twin beds, virtual balcony view" },
      { name: "Ocean View Balcony", price: 129999, maxGuests: 4, includes: "Step out onto your private balcony overlooking the Mediterranean" },
      { name: "Sky Loft Suite", price: 239999, maxGuests: 6, includes: "Two-deck panoramic suite, VIP lounge, butler service" }
    ],
    itinerary: [
      { day: 1, port: "Barcelona, Spain", activities: "Board the ship at the Barcelona Port, settle into your stateroom, and attend safety drill." },
      { day: 2, port: "Palma de Mallorca, Spain", activities: "Explore the historic gothic cathedral of Palma or relax on the sandy beaches of Magaluf." },
      { day: 3, port: "Marseille, France", activities: "Stroll around Marseille's old port and take a bus tour up to Notre-Dame de la Garde." },
      { day: 4, port: "La Spezia (Florence/Pisa), Italy", activities: "Day trip to the leaning tower of Pisa or check out the Renaissance galleries in Florence." },
      { day: 5, port: "Civitavecchia (Rome), Italy", activities: "Walk through the Colosseum, explore the Vatican Museums, or throw a coin in Trevi Fountain." },
      { day: 6, port: "Naples (Capri/Pompeii), Italy", activities: "Visit the ruins of Pompeii or take a hydrofoil boat over to the picturesque Capri Island." },
      { day: 7, port: "Cruising at Sea", activities: "Unwind on the Solarium deck, try rock climbing, or attend the signature broadway play." },
      { day: 8, port: "Barcelona, Spain", activities: "Disembark and head home with wonderful Mediterranean memories!" }
    ],
    highlights: ["Central Park neighborhood with 20k plants", "Perfect Storm waterslides", "Broadway production of Hairspray", "Ultimate Abyss dry slide"],
    neighborhoods: [
      { name: "Pool & Sports Zone", desc: "Four pools, three waterslides, and the signature FlowRider surf simulators.", icon: "🌊" },
      { name: "Central Park", desc: "An open-air garden neighborhood with quiet restaurants, cafes, and luxury boutiques.", icon: "🌳" },
      { name: "Royal Promenade", desc: "A two-deck indoor boulevard lined with cafes, bars, live music, and parades.", icon: "🏬" }
    ],
    deckPlans: [
      { deck: 16, name: "Windjammer & Sports", highlights: "Windjammer buffet, flowriders, mini-golf, zip line" },
      { deck: 15, name: "Pools & Solarium", highlights: "Main pool deck, Splashaway bay, adults-only Solarium" },
      { deck: 8, name: "Central Park & Rooms", highlights: "Central Park garden, specialty dining, balcony staterooms" },
      { deck: 5, name: "Royal Promenade & Bar", highlights: "Sorento's pizza, Bionic bar, retail shops, theater entrance" }
    ],
    fareInclusions: {
      included: [
        "Main Dining Room multi-course meals",
        "Windjammer Buffet breakfast, lunch, and dinner",
        "Theater entrance to Broadway productions",
        "Access to pools, hot tubs, and water slides",
        "FlowRider surf simulator usage",
        "Onboard kids & youth club access"
      ],
      excluded: [
        "Alcoholic beverages & premium soft drinks",
        "Specialty dining covers (Chops Grille, Izumi)",
        "Onboard satellite Wi-Fi access",
        "Florence/Pisa or Rome guided shore excursions",
        "Spa treatments and thermal suite access",
        "Dry cleaning and laundry services"
      ]
    }
  }
];

const FLIGHTS_DATABASE = [
  { id: "f1", from: "Delhi", to: "Mumbai", airline: "Air India", price: 4500, duration: "2h 10m", stops: "Non-stop" },
  { id: "f2", from: "Delhi", to: "Paris", airline: "Air France", price: 32000, duration: "9h 30m", stops: "Non-stop" },
  { id: "f3", from: "Delhi", to: "Tokyo", airline: "Japan Airlines", price: 41000, duration: "8h 15m", stops: "Non-stop" }
];

const BUSES_DATABASE = [
  { id: "b1", operator: "VRL Travels", type: "Volvo AC Sleeper", dep: "22:30", arr: "06:15", dur: "7h 45m", rating: 4.5, reviews: 120, price: 1250, seats: 12 },
  { id: "b2", operator: "IntrCity SmartBus", type: "AC Seater", dep: "08:00", arr: "14:30", dur: "6h 30m", rating: 4.8, reviews: 340, price: 850, seats: 4 },
  { id: "b3", operator: "Zingbus", type: "AC Sleeper", dep: "23:00", arr: "07:00", dur: "8h 00m", rating: 4.2, reviews: 85, price: 1100, seats: 20 },
];

const CARS_DATABASE = [
  { id: "c1", type: "Hatchback", name: "WagonR, Swift", fuelType: "CNG/Diesel", modelType: "or similar", rating: 4.3, seats: 4, ac: true, isNew: false, originalPrice: 1995, discountPrice: 1683, taxes: 495, discountPercent: "16% off", addOn: "Add Roof Carrier to fit 6 more bags @ ₹157" },
  { id: "c2", type: "Hatchback", name: "Citroen EC3", fuelType: "Electric", modelType: "exact model", rating: null, seats: 4, ac: true, isNew: true, originalPrice: 2001, discountPrice: 2001, taxes: 319, discountPercent: null, addOn: null },
  { id: "c3", type: "Sedan", name: "Tata Tigor", fuelType: "Electric", modelType: "exact model", rating: 4.2, seats: 4, ac: true, isNew: false, originalPrice: 1792, discountPrice: 1792, taxes: 538, discountPercent: null, addOn: null },
  { id: "c4", type: "Sedan", name: "Dzire, Etios", fuelType: "CNG/Diesel", modelType: "or similar", rating: 4.2, seats: 4, ac: true, isNew: false, originalPrice: 2060, discountPrice: 1724, taxes: 615, discountPercent: "16% off", addOn: "Add Roof Carrier to fit 6 more bags @ ₹157" },
  { id: "c5", type: "Compactsuv", name: "MG ZS", fuelType: "Electric", modelType: "exact model", rating: null, seats: 4, ac: true, isNew: true, originalPrice: 2825, discountPrice: 2825, taxes: 485, discountPercent: null, addOn: null },
  { id: "c6", type: "SUV", name: "Xylo, Ertiga", fuelType: "CNG/Diesel", modelType: "or similar", rating: 4.4, seats: 6, ac: true, isNew: false, originalPrice: 3148, discountPrice: 2657, taxes: 714, discountPercent: "16% off", addOn: "Add Roof Carrier to fit 6 more bags @ ₹209" },
  { id: "c7", type: "SUV", name: "Mahindra XUV 400", fuelType: "Electric", modelType: "exact model", rating: 4.2, seats: 4, ac: true, isNew: false, originalPrice: 3937, discountPrice: 3937, taxes: 292, discountPercent: null, addOn: null },
  { id: "c8", type: "SUV", name: "Innova Crysta", fuelType: "Diesel", modelType: "exact model", rating: 4.4, seats: 6, ac: true, isNew: false, originalPrice: 4184, discountPrice: 3562, taxes: 686, discountPercent: "15% off", addOn: "Add Roof Carrier to fit 6 more bags @ ₹262" },
  { id: "c9", type: "SUV", name: "Maruti Suzuki Ertiga", fuelType: "CNG", modelType: "exact model", rating: 4.1, seats: 6, ac: true, isNew: false, originalPrice: 4096, discountPrice: 4096, taxes: 300, discountPercent: null, addOn: "Add Roof Carrier to fit 6 more bags @ ₹371" },
  { id: "c10", type: "Sedan", name: "Dzire, Etios", fuelType: "Diesel", modelType: "or similar", rating: 3.5, seats: 4, ac: true, isNew: false, originalPrice: 4096, discountPrice: 4096, taxes: 300, discountPercent: null, addOn: "Add Roof Carrier to fit 6 more bags @ ₹371" },
  { id: "c11", type: "SUV", name: "Kia Carens", fuelType: "Electric", modelType: "exact model", rating: null, seats: 6, ac: true, isNew: true, originalPrice: 4002, discountPrice: 4002, taxes: 419, discountPercent: null, addOn: null },
  { id: "c12", type: "SUV", name: "Toyota Innova", fuelType: "Diesel", modelType: "exact model", rating: 4.1, seats: 6, ac: true, isNew: false, originalPrice: 6074, discountPrice: 6074, taxes: 399, discountPercent: null, addOn: null },
  { id: "c13", type: "SUV", name: "Toyota Innova Hycross", fuelType: "Diesel", modelType: "exact model", rating: 4, seats: 6, ac: true, isNew: false, originalPrice: 7200, discountPrice: 7200, taxes: 573, discountPercent: null, addOn: null },
];

const ATTRACTIONS_DATABASE = [
  {
    id: "a1",
    city: "Agra",
    name: "Taj Mahal Skip-the-Line Entry & Guided Tour",
    rating: 4.8,
    ratingText: "Superb",
    reviewsCount: 4890,
    price: 1500,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80",
    description: "Enjoy skip-the-line entrance to the Taj Mahal with an expert private guide, exploring the history of this legendary monument of love.",
    benefits: ["Skip the line tickets", "Certified local guide", "Free cancellation up to 24h before"],
    duration: "3 hours",
    includes: "Entrance ticket, Private guide, Shoe covers, Bottle of water"
  },
  {
    id: "a2",
    city: "Paris",
    name: "Eiffel Tower Direct Summit Access & Seine Cruise",
    rating: 4.6,
    ratingText: "Very Good",
    reviewsCount: 3120,
    price: 3500,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80",
    description: "Ascend to the very top floor of the Eiffel Tower for panoramic views over Paris, and enjoy a scenic 1-hour Seine River cruise.",
    benefits: ["Summit access by lift", "1-hour river cruise ticket", "Mobile tickets accepted"],
    duration: "2.5 hours",
    includes: "Elevator access to the 3rd floor (Summit), Seine River Cruise ticket, Audioguide app"
  },
  {
    id: "a3",
    city: "Tokyo",
    name: "Tokyo Skytree Tembo Deck & Galleria Admission",
    rating: 4.7,
    ratingText: "Excellent",
    reviewsCount: 2200,
    price: 2200,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80",
    description: "Look out across Tokyo from the tallest structure in Japan. Get access to both the Tembo Deck (350m) and the Tembo Galleria (450m).",
    benefits: ["Instant confirmation", "Highest observatory deck", "Valid on selected date"],
    duration: "Flexible",
    includes: "Tembo Deck Admission (350m), Tembo Galleria Admission (450m)"
  },
  {
    id: "a4",
    city: "Delhi",
    name: "Old & New Delhi Private Day Tour with Lunch",
    rating: 4.9,
    ratingText: "Exceptional",
    reviewsCount: 1540,
    price: 2900,
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=80",
    description: "Discover the heritage of Delhi, visiting the Red Fort, Qutub Minar, India Gate, Lotus Temple, and experience a rickshaw ride in Chandni Chowk.",
    benefits: ["Private air-conditioned car", "Hotel pick-up & drop-off", "Traditional lunch included"],
    duration: "8 hours",
    includes: "Private chauffeur, English-speaking guide, All monuments entry fee, Rickshaw ride"
  },
  {
    id: "a5",
    city: "Singapore",
    name: "Gardens by the Bay Flower Dome & Cloud Forest Entry",
    rating: 4.8,
    ratingText: "Superb",
    reviewsCount: 5120,
    price: 1950,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&auto=format&fit=crop&q=80",
    description: "Step into the largest glass greenhouse in the world. Admire the stunning Floral Fantasy and the massive indoor waterfall inside Cloud Forest.",
    benefits: ["Instant entry ticket", "Access to Avatar Experience", "Direct barcode scanner entry"],
    duration: "3 hours",
    includes: "Flower Dome Admission ticket, Cloud Forest Admission ticket, Supertree Observatory access"
  },
  {
    id: "a6",
    city: "Singapore",
    name: "Universal Studios Singapore Full Day Admission Pass",
    rating: 4.7,
    ratingText: "Excellent",
    reviewsCount: 3870,
    price: 4800,
    image: "https://images.unsplash.com/photo-1596463059283-e2c74755f2bc?w=600&auto=format&fit=crop&q=80",
    description: "Ride the Movies at Universal Studios Singapore on Sentosa Island. Enjoy cutting-edge rides, shows, and attractions based on your favorite blockbuster films.",
    benefits: ["E-ticket with direct entry", "Free food & retail voucher", "Valid on public holidays"],
    duration: "1 Day Pass",
    includes: "Universal Studios Singapore 1-Day General Admission Ticket, Access to all rides"
  },
  {
    id: "a7",
    city: "London",
    name: "The London Eye Tickets with Fast Track Observatory Option",
    rating: 4.6,
    ratingText: "Very Good",
    reviewsCount: 6410,
    price: 3600,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?w=600&auto=format&fit=crop&q=80",
    description: "Take flight on the world-famous London Eye and enjoy unparalleled 360-degree views of London's historic skyline, including Big Ben and Parliament.",
    benefits: ["Mobile fast track tickets", "Includes 4D cinema experience", "Free cancellation up to 24h before"],
    duration: "45 minutes",
    includes: "Standard flight ticket, 3D interactive guide, 4D cinema experience entry"
  },
  {
    id: "a8",
    city: "London",
    name: "Warner Bros. Studio Tour London - The Making of Harry Potter",
    rating: 4.9,
    ratingText: "Exceptional",
    reviewsCount: 8900,
    price: 9200,
    image: "https://images.unsplash.com/photo-1600180758890-6b945f9a8ba6?w=600&auto=format&fit=crop&q=80",
    description: "Walk the original stone floor of the Great Hall, wander through Diagon Alley, explore the Forbidden Forest, and ride Hogwarts Express on Platform 9¾.",
    benefits: ["Round-trip luxury coach transfers", "Original movie sets access", "Includes Audio Guide in English"],
    duration: "7 hours",
    includes: "Studio Tour Admission Ticket, Return transportation from Central London, English guide booklet"
  },
  {
    id: "a9",
    city: "Rome",
    name: "Colosseum, Roman Forum & Palatine Hill Priority Ticket",
    rating: 4.8,
    ratingText: "Superb",
    reviewsCount: 11200,
    price: 2400,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop&q=80",
    description: "Walk in the footsteps of Roman gladiators. Explore the majestic ruins of the Colosseum arena, the Senate house at Roman Forum, and Palatine Hill.",
    benefits: ["Priority skip-the-line entrance", "Includes digital audio guide", "Valid for 24 hours"],
    duration: "3 hours",
    includes: "Priority Colosseum Ticket, Roman Forum Admission, Palatine Hill entrance, Guided app"
  },
  {
    id: "a10",
    city: "Rome",
    name: "Vatican Museums & Sistine Chapel Skip-the-Line Tour",
    rating: 4.7,
    ratingText: "Excellent",
    reviewsCount: 7850,
    price: 3800,
    image: "https://images.unsplash.com/photo-1531572753726-0ff349f576e2?w=600&auto=format&fit=crop&q=80",
    description: "Marvel at the world-famous ceiling frescoes by Michelangelo inside the Sistine Chapel and tour the massive collection of Vatican classical antiquities.",
    benefits: ["Exclusive fast-track entrance", "Access to Raphael Rooms", "Certified Art Historian Guide"],
    duration: "4 hours",
    includes: "Vatican Museum Entrance, Sistine Chapel Fast-track, Headsets for guide narration"
  },
  {
    id: "a11",
    city: "Bali",
    name: "Uluwatu Cliffside Sunset Temple Tour & Kecak Fire Dance",
    rating: 4.7,
    ratingText: "Excellent",
    reviewsCount: 3100,
    price: 1600,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80",
    description: "Visit Uluwatu Temple perched 70 meters on a cliff edge. Witness a magical sunset over the Indian Ocean while watching a traditional Kecak fire dance.",
    benefits: ["Private air-conditioned hotel transfers", "Entry ticket to Uluwatu included", "Dance show ticket guaranteed"],
    duration: "6 hours",
    includes: "Private Chauffeur, Temple entrance ticket, Kecak Dance show ticket, Mineral water"
  },
  {
    id: "a12",
    city: "Bangkok",
    name: "Bangkok Grand Palace & Wat Phra Kaew Private Tour",
    rating: 4.6,
    ratingText: "Very Good",
    reviewsCount: 2450,
    price: 2100,
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&auto=format&fit=crop&q=80",
    description: "Explore the residence of Thai Kings at the Grand Palace. Visit Wat Phra Kaew to admire the highly sacred Emerald Buddha carved from a single jade block.",
    benefits: ["Private local expert guide", "Hotel pick-up & drop-off included", "Includes traditional thai snack tasting"],
    duration: "4 hours",
    includes: "Private Tour Chauffeur, Certified Thai Palace guide, Grand Palace Entry Ticket, Wat Phra Kaew Ticket"
  },
  {
    id: "a13",
    city: "Dubai",
    name: "Burj Khalifa 124th & 125th Floor Observatory Entry Pass",
    rating: 4.8,
    ratingText: "Superb",
    reviewsCount: 9400,
    price: 3800,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80",
    description: "Ride the world's fastest elevator to the top of Burj Khalifa, the tallest building on earth. Look out over the Arabian Gulf and Dubai Fountain.",
    benefits: ["Instant barcode e-tickets", "Highest observation deck entry", "Access to high-powered telescopes"],
    duration: "2 hours",
    includes: "At the Top (Level 124 & 125) Admission ticket, Free Wi-Fi access at observation deck"
  },
  {
    id: "a14",
    city: "Dubai",
    name: "Premium Desert Safari with BBQ Dinner, Dune Bashing & Camel Ride",
    rating: 4.9,
    ratingText: "Exceptional",
    reviewsCount: 12400,
    price: 2600,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    description: "Crash the red dunes of Lahbab desert in a Land Cruiser 4x4. Experience sandboarding, ride camels, and enjoy a traditional Tanoura dance with a BBQ dinner.",
    benefits: ["Pick-up by 4x4 from hotel", "Unlimited soft drinks & Arabic coffee", "5-Star vegetarian/non-vegetarian BBQ buffet"],
    duration: "7 hours",
    includes: "4x4 Desert Chauffeur, Dune Bashing (45 mins), Sandboarding, Camel Ride, Belly Dance show, Buffet dinner"
  }
];

const TRAINS_DATABASE = [
  { id: "t1", name: "Mumbai Rajdhani Express (12952)", from: "Delhi", to: "Mumbai", depart: "16:55", arrive: "08:35", duration: "15h 40m", price: 2950, class: "AC 3 Tier" },
  { id: "t2", name: "New Delhi Shatabdi Express (12002)", from: "Delhi", to: "Agra", depart: "06:00", arrive: "08:06", duration: "2h 06m", price: 705, class: "AC Chair Car" },
  { id: "t3", name: "Mumbai Garib Rath (12215)", from: "Delhi", to: "Mumbai", depart: "09:10", arrive: "08:10", duration: "23h 00m", price: 1050, class: "AC 3 Tier" },
  { id: "t4", name: "Ahmedabad Duronto Express (12268)", from: "Delhi", to: "Mumbai", depart: "23:40", arrive: "16:30", duration: "16h 50m", price: 2100, class: "AC 3 Tier" }
];

const HOLIDAYS_DATABASE = [
  {
    id: "hld1",
    name: "Kashmir Paradise: Srinagar, Gulmarg & Pahalgam",
    destinations: "Srinagar &bull; Gulmarg &bull; Pahalgam &bull; Sonamarg",
    duration: "5 Nights / 6 Days",
    nights: 5,
    popularity: 9.5,
    dateAdded: "2026-06-15",
    theme: "Hills",
    price: 24999,
    originalPrice: 38999,
    isDomestic: true,
    hotelStar: 4,
    transType: "landOnly",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600&auto=format&fit=crop&q=80",
    inclusions: ["hotel", "transfer", "meals", "sightseeing"],
    description: "Experience heaven on earth. Enjoy a shikara ride on Dal Lake in Srinagar, explore beautiful meadows in Gulmarg and snow-capped valleys of Pahalgam.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar & Dal Lake Shikara Ride", description: "On arrival at Srinagar airport, meet our representative and transfer to your deluxe houseboat. In the afternoon, enjoy a relaxing 2-hour Shikara ride on the famous Dal Lake. Overnight stay in Srinagar houseboat." },
      { day: 2, title: "Srinagar Sightseeing - Mughal Gardens", description: "Visit the world-famous Mughal Gardens: Shalimar Bagh, Nishat Bagh, and Chashme Shahi. Walk through heritage shrines. Overnight stay in Srinagar hotel." },
      { day: 3, title: "Srinagar to Gulmarg Day Trip", description: "Drive to Gulmarg, the Meadow of Flowers. Experience the famous Gondola cable car ride to Apharwat peak for panoramic snow views. Return to Srinagar for overnight stay." },
      { day: 4, title: "Srinagar to Pahalgam Transfer", description: "Proceed to Pahalgam, the Valley of Shepherds. Pass through saffron fields and visit the ruins of Avantipura. In the evening, walk along the Lidder River. Overnight in Pahalgam." },
      { day: 5, title: "Explore Betaab Valley & Aru Valley", description: "Explore the scenic Betaab Valley, named after the famous Bollywood movie, and Aru Valley. Enjoy horseback riding in the pine forests. Overnight in Pahalgam." },
      { day: 6, title: "Pahalgam to Srinagar Departure", description: "After breakfast, check out from the hotel and drive back to Srinagar airport for your flight back home with sweet memories." }
    ]
  },
  {
    id: "hld2",
    name: "Magical Maldives Honeymoon Escape",
    destinations: "Maldives Private Island Resort",
    duration: "4 Nights / 5 Days",
    nights: 4,
    popularity: 9.8,
    dateAdded: "2026-07-02",
    theme: "Honeymoon",
    price: 49999,
    originalPrice: 79999,
    isDomestic: false,
    hotelStar: 5,
    transType: "flightOptional",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
    inclusions: ["flights", "hotel", "transfer", "meals"],
    description: "Rejuvenate your senses in a private overwater villa. Includes speedboat transfers, couples spa, beach dinners and crystal-clear lagoon swimming.",
    itinerary: [
      { day: 1, title: "Arrival in Maldives & Speedboat Transfer", description: "Arrive at Velana International Airport. Board your speedboat to transfer to the private resort island. Check-in to your Beach Bungalow and enjoy a free evening. Dinner at resort." },
      { day: 2, title: "Leisure day & Coral Reef Snorkeling", description: "Enjoy breakfast. Rent snorkeling gear and explore the house reef, swimming alongside colorful marine life. In the evening, enjoy a sunset cruise. Dinner at resort." },
      { day: 3, title: "Upgrade to Overwater Villa", description: "Check out from Beach Bungalow and check-in to your luxurious Water Villa with direct lagoon access. Enjoy couples massage session at the resort spa." },
      { day: 4, title: "Water Sports & Romantic Beach Dinner", description: "Indulge in windsurfing, paddleboarding, or jet skiing. Tonight, enjoy a private candlelit dinner under the stars on the beach." },
      { day: 5, title: "Maldives Departure", description: "After breakfast, check out and take the speedboat transfer back to Malé airport for your flight home." }
    ]
  },
  {
    id: "hld3",
    name: "Goa Beach Bash & Water Adventure",
    destinations: "North Goa &bull; South Goa &bull; Calangute",
    duration: "3 Nights / 4 Days",
    nights: 3,
    popularity: 8.9,
    dateAdded: "2026-06-20",
    theme: "Beach",
    price: 12499,
    originalPrice: 19999,
    isDomestic: true,
    hotelStar: 3,
    transType: "bus",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    inclusions: ["hotel", "transfer", "meals", "sightseeing"],
    description: "Soak up the sun on Goa's famous beaches. Enjoy parasailing, jet-skiing, historic fort tours, and the vibrant local nightlife.",
    itinerary: [
      { day: 1, title: "Arrival in Goa & Beach Walk", description: "Check in at your resort in Calangute. Spend the evening relaxing on Calangute Beach or visiting Tito’s Lane for nightlife." },
      { day: 2, title: "North Goa Forts & Water Sports", description: "Visit Aguada Fort and Chapora Fort. Head to Baga Beach for parasailing and banana boat rides. Return to resort." },
      { day: 3, title: "South Goa Churches & Spice Plantation", description: "Explore Basilica of Bom Jesus, Se Cathedral in Old Goa. Take a guided tour of a local spice plantation with traditional buffet lunch." },
      { day: 4, title: "Goa Departure", description: "Check out from hotel and transfer to Goa airport or railway station for departure." }
    ]
  },
  {
    id: "hld4",
    name: "Best of Kerala: Hills, Houseboat & Beach",
    destinations: "Cochin &bull; Munnar &bull; Thekkady &bull; Alleppey",
    duration: "5 Nights / 6 Days",
    nights: 5,
    popularity: 9.2,
    dateAdded: "2026-05-10",
    theme: "Family",
    price: 19999,
    originalPrice: 32999,
    isDomestic: true,
    hotelStar: 4,
    transType: "landOnly",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&auto=format&fit=crop&q=80",
    inclusions: ["hotel", "transfer", "meals", "sightseeing"],
    description: "Explore the spice-laden hills of Munnar, go on a wildlife safari in Thekkady, and cruise the peaceful backwaters in an Alleppey houseboat.",
    itinerary: [
      { day: 1, title: "Cochin to Munnar Drive", description: "Pick up from Cochin Airport. Drive to Munnar, enjoying waterfalls and spice gardens along the route. Check in to Munnar resort." },
      { day: 2, title: "Munnar Tea Gardens Exploration", description: "Visit Eravikulam National Park to see Nilgiri Tahr. Explore Mattupetty Dam, Echo Point, and stroll through lush green tea plantations." },
      { day: 3, title: "Munnar to Thekkady Wildlife Sanctuary", description: "Drive to Thekkady. Take a boat safari on Periyar Lake to watch wild elephants. Stroll spice plantations." },
      { day: 4, title: "Thekkady to Alleppey Houseboat", description: "Check-in at traditional luxury Houseboat. Cruise along the backwaters of Alleppey. All meals served on board." },
      { day: 5, title: "Alleppey to Cochin Departure", description: "After breakfast, check-out from houseboat and drive to Cochin. Stroll historic Fort Cochin before transfer to airport." }
    ]
  },
  {
    id: "hld5",
    name: "Adventure in Himachal: Shimla & Manali",
    destinations: "Shimla &bull; Manali &bull; Solang Valley",
    duration: "6 Nights / 7 Days",
    nights: 6,
    popularity: 9.0,
    dateAdded: "2026-06-25",
    theme: "Adventure",
    price: 21999,
    originalPrice: 34999,
    isDomestic: true,
    hotelStar: 3,
    transType: "bus",
    image: "https://images.unsplash.com/photo-1544085311-11a028465b03?w=600&auto=format&fit=crop&q=80",
    inclusions: ["hotel", "transfer", "meals", "sightseeing"],
    description: "Walk the Ridge in Shimla, enjoy river rafting and paragliding in Solang Valley, and experience snow at Rohtang Pass.",
    itinerary: [
      { day: 1, title: "Delhi to Shimla Drive", description: "Drive from Delhi to Shimla. Stroll Mall Road and visit Christ Church. Overnight stay in Shimla." },
      { day: 2, title: "Shimla & Kufri Exploration", description: "Go on excursion to Kufri for fun rides and mountain views. Stroll Yak-riding areas. Return to Shimla." },
      { day: 3, title: "Shimla to Manali Transfer via Kullu Valley", description: "Drive to Manali. Pass through Kullu valley and photograph river streams. Check in at Manali hotel." },
      { day: 4, title: "Manali Local Tour", description: "Visit Hadimba Temple, Vashisht Hot Springs, and Club House. Stroll Manali market." },
      { day: 5, title: "Solang Valley Adventure & Paragliding", description: "Spend day in Solang Valley. Enjoy paragliding, zorbing, and quad-riding. Visit Atal Tunnel." },
      { day: 6, title: "Excursion to Rohtang Pass (Optional)", description: "Drive to Rohtang Pass for snow fields (subject to permit). Stroll high mountain viewpoints." },
      { day: 7, title: "Manali to Delhi Departure", description: "Drive back to Delhi. Drop-off at airport or station for journey home." }
    ]
  },
  {
    id: "hld6",
    name: "Dubai Spectacular: Burj Khalifa & Desert Safari",
    destinations: "Dubai City &bull; Marina &bull; Deira",
    duration: "4 Nights / 5 Days",
    nights: 4,
    popularity: 9.6,
    dateAdded: "2026-07-06",
    theme: "Adventure",
    price: 39999,
    originalPrice: 59999,
    isDomestic: false,
    hotelStar: 4,
    transType: "flightOptional",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80",
    inclusions: ["flights", "hotel", "transfer", "meals", "sightseeing"],
    description: "Explore the futuristic city of Dubai. Climb the Burj Khalifa, witness the fountain show, enjoy a dune-bashing desert safari with BBQ dinner, and shop in the traditional souks.",
    itinerary: [
      { day: 1, title: "Arrival in Dubai & Marina Dhow Cruise", description: "Arrive at Dubai International Airport. Transfer to your premium city hotel. In the evening, enjoy a romantic Dhow Cruise in Dubai Marina with buffet dinner." },
      { day: 2, title: "Dubai City Tour & Burj Khalifa 124th Floor", description: "Guided tour visiting Dubai Frame, Jumeirah Mosque, Burj Al Arab photo stop. In the afternoon, visit Dubai Mall and ascend Burj Khalifa's Observation Deck." },
      { day: 3, title: "Desert Safari with BBQ Dinner", description: "Morning free for shopping at the Gold Souk. At 3 PM, board 4x4 land cruisers for an exciting dune bashing experience. Enjoy camel riding, henna painting, belly dance show and BBQ dinner in the desert camp." },
      { day: 4, title: "Day at leisure or Aquaventure Waterpark", description: "Day free. Optional visit to Atlantis The Palm's Aquaventure Waterpark or Lost Chambers Aquarium." },
      { day: 5, title: "Departure from Dubai", description: "After breakfast, check out. Transfer to Dubai airport for your flight back home." }
    ]
  },
  {
    id: "hld7",
    name: "Romantic France Escapade: Paris & French Riviera",
    destinations: "Paris &bull; Nice &bull; Cannes",
    duration: "7 Nights / 8 Days",
    nights: 7,
    popularity: 9.9,
    dateAdded: "2026-07-01",
    theme: "Honeymoon",
    price: 89999,
    originalPrice: 129999,
    isDomestic: false,
    hotelStar: 5,
    transType: "flightOptional",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80",
    inclusions: ["flights", "hotel", "transfer", "meals", "sightseeing"],
    description: "Savor the magic of France. Witness the lights of Paris, visit the palace of Versailles, and sunbathe in Nice on the French Riviera.",
    itinerary: [
      { day: 1, title: "Arrival in Paris", description: "Transfer to your luxury hotel. Spend your evening cruising the Seine River. Overnight stay in Paris." },
      { day: 2, title: "Paris City Tour & Eiffel Tower", description: "Visit the Louvre, Arc de Triomphe, Notre Dame, and go up the Eiffel Tower. Overnight stay in Paris." },
      { day: 3, title: "Versailles Palace Day Excursion", description: "Excursion to the magnificent Palace of Versailles and its gardens. Overnight stay in Paris." },
      { day: 4, title: "TGV High-Speed Train to Nice", description: "Board the high-speed TGV train south to Nice. Stroll the Promenade des Anglais. Overnight in Nice." },
      { day: 5, title: "Cannes & Monaco Day Excursion", description: "Visit the luxury casinos of Monte Carlo and walk the red carpet in Cannes. Overnight in Nice." },
      { day: 6, title: "Relax on the Riviera Beaches", description: "Day free for sunbathing, beach clubs, and tasting local French-Mediterranean seafood." },
      { day: 7, title: "Departure from Nice", description: "Transfer to Nice airport for your flight back home." }
    ]
  }
];
const DESTINATION_INFO_DATABASE = {
  kashmir: {
    name: "Kashmir",
    about: "Known as 'Heaven on Earth', Jammu & Kashmir is famous for its snow-capped mountains, beautiful valleys, pristine lakes, and vibrant houseboats. The region is a haven for travelers seeking peace and adventure alike.",
    bestTime: {
      peak: "March to August (Spring/Summer) - Beautiful meadows and pleasant weather, perfect for exploring Mughal gardens.",
      mid: "September to November (Autumn) - Golden chinar leaves create a magical landscape.",
      low: "December to February (Winter) - Ideal for snow sports lovers in Gulmarg and Pahalgam."
    },
    howToReach: "The main gateway is Srinagar International Airport (SXR), which is well-connected to major Indian cities. By rail, Jammu Tawi is the nearest railway station, located about 290 km away from Srinagar.",
    attractions: [
      { name: "Dal Lake (Shikara Rides)", img: "https://images.unsplash.com/photo-1600845747913-e33543f94892?w=600&auto=format&fit=crop&q=80" },
      { name: "Gulmarg Gondola Ride", img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=300&auto=format&fit=crop&q=80" },
      { name: "Betaab Valley in Pahalgam", img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=300&auto=format&fit=crop&q=80" }
    ],
    faqs: [
      { q: "Is a permit required to visit Gulmarg?", a: "To visit certain tourist areas like Apharwat Peak or snow fields, local union taxi permissions may be needed. Make sure to check with your assigned tour manager beforehand." },
      { q: "What should I pack for Kashmir in winter?", a: "Heavy woolen wear, thermals, windproof jackets, and sturdy snow shoes are highly recommended." }
    ]
  },
  maldives: {
    name: "Maldives",
    about: "A tropical nation in the Indian Ocean, the Maldives is composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. It's world-famous for its blue lagoons, private white-sand beaches, and luxury overwater villas.",
    bestTime: {
      peak: "November to April - Sunny days with low humidity, perfect for water activities and beach lounging.",
      mid: "May to October - Monsoon season offers great room discounts and excellent surf swells.",
      low: "June to August - Rainy season with occasional storms, ideal for resort budget stays."
    },
    howToReach: "Fly directly into Velana International Airport (MLE) in Malé. From the airport, speedboats or seaplanes are arranged to transfer you directly to your private island resort.",
    attractions: [
      { name: "Private Overwater Villas", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&auto=format&fit=crop&q=80" },
      { name: "Coral Reef Snorkeling", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80" },
      { name: "Sunset Cruise", img: "https://images.unsplash.com/photo-1544085311-11a028465b03?w=300&auto=format&fit=crop&q=80" }
    ],
    faqs: [
      { q: "Do I need a pre-arrival visa for the Maldives?", a: "A free 30-day tourist visa is granted on arrival to all nationalities, provided you have a valid passport, return ticket, and resort booking confirmation." },
      { q: "Can I use US Dollars in the Maldives?", a: "Yes, US Dollars are widely accepted in all resorts and private island establishments, though local Rufiyaa is used in Malé." }
    ]
  },
  goa: {
    name: "Goa",
    about: "India's pocket-sized paradise, Goa is famous for its sandy beaches, 17th-century Portuguese churches, rich spice plantations, and vibrant beach parties.",
    bestTime: {
      peak: "November to February - Perfect winter climate and beach shacks are fully active.",
      mid: "October and March - Less crowded beaches and peaceful sunsets.",
      low: "June to September - Heavy monsoons, ideal for green landscape tours and waterfalls."
    },
    howToReach: "Fly to Dabolim Airport (GOI) or Manohar International Airport (Mopa). You can also travel via train to Madgaon or Thivim stations.",
    attractions: [
      { name: "Calangute & Baga Beaches", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80" },
      { name: "Basilica of Bom Jesus", img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=300&auto=format&fit=crop&q=80" }
    ],
    faqs: [
      { q: "Which part of Goa is best for nightlife?", a: "North Goa (Baga, Calangute, and Anjuna beaches) is the hub of nightlife, while South Goa is known for peaceful resorts." }
    ]
  },
  dubai: {
    name: "Dubai",
    about: "Renowned for luxury shopping, ultramodern architecture, and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline.",
    bestTime: {
      peak: "November to March - Cool winter months, ideal for outdoor exploration, desert safaris, and beach visits.",
      mid: "April and October - Transitional months with warm weather and fewer crowds.",
      low: "May to September - Very hot summer months, but excellent for shopping mall visits and indoor theme parks."
    },
    howToReach: "Fly directly into Dubai International Airport (DXB), one of the world's busiest travel hubs, connected directly to almost all major global destinations.",
    attractions: [
      { name: "Burj Khalifa Observation Deck", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&auto=format&fit=crop&q=80" },
      { name: "Dune Bashing Desert Safari", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&auto=format&fit=crop&q=80" }
    ],
    faqs: [
      { q: "What is the dress code in public areas in Dubai?", a: "Dubai is relatively liberal, but modest dressing is expected in malls, traditional souks, and government buildings." }
    ]
  },
  france: {
    name: "France",
    about: "A historic Western European country famous for its sophisticated cities, world-renowned fashion houses, art museums like the Louvre, and iconic monuments like the Eiffel Tower.",
    bestTime: {
      peak: "April to June (Spring) and September to October (Autumn) - Very pleasant weather and beautiful parks.",
      mid: "July to August - Summer holiday crowds, warm weather.",
      low: "November to March - Cold winter months, great for skiing in the Alps."
    },
    howToReach: "Fly to Paris Charles de Gaulle Airport (CDG) or Orly Airport (ORY). France has excellent high-speed train connections (TGV) from neighbouring countries.",
    attractions: [
      { name: "Eiffel Tower & Seine River", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&auto=format&fit=crop&q=80" },
      { name: "The Louvre Museum", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300&auto=format&fit=crop&q=80" }
    ],
    faqs: [
      { q: "Do Indian passport holders need a visa for France?", a: "Yes, a Schengen Short-Stay Visa is required for Indian citizens visiting France as tourists." }
    ]
  }
};

const ALTERNATIVE_FLIGHTS = [
  { id: "f_std", airline: "IndiGo", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f6/IndiGo_Airlines_logo.svg", flightNo: "6E-2051", depTime: "06:10", arrTime: "08:25", duration: "2h 15m", stops: "Non-stop", baggage: "15 kg Check-in, 7 kg Cabin", priceDiff: 0 },
  { id: "f_dir", airline: "Air India", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Air_India_Logo.svg", flightNo: "AI-805", depTime: "10:15", arrTime: "12:30", duration: "2h 15m", stops: "Non-stop", baggage: "25 kg Check-in, 8 kg Cabin", priceDiff: 2000 },
  { id: "f_bus", airline: "Vistara (Business)", logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Vistara_logo.svg", flightNo: "UK-985", depTime: "08:30", arrTime: "10:45", duration: "2h 15m", stops: "Non-stop", baggage: "35 kg Check-in, 12 kg Cabin", priceDiff: 15000 }
];

const ALTERNATIVE_HOTELS = [
  { id: "h_std", name: "Lavender Inn / Lagoon Retreat", stars: 3, rating: "3.8/5", reviews: 245, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&auto=format&fit=crop&q=80", location: "Near City Center", amenities: ["Free Wi-Fi", "Laundry", "Standard Room"], priceDiff: 0 },
  { id: "h_del", name: "Grand Palace Resort & Spa", stars: 4, rating: "4.4/5", reviews: 512, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80", location: "Premium Beachfront", amenities: ["Free Wi-Fi", "Buffet Breakfast", "Swimming Pool", "Gym"], priceDiff: 3500 },
  { id: "h_lux", name: "The Taj Palace / Atlantis Suites", stars: 5, rating: "4.9/5", reviews: 1089, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&auto=format&fit=crop&q=80", location: "Exclusive Landmark District", amenities: ["Free Wi-Fi", "Spa & Sauna Access", "Private Balcony", "Premium Lounge", "24/7 Butler"], priceDiff: 7500 }
];

const ALTERNATIVE_ACTIVITIES = [
  { id: "act_std", name: "Standard City Highlights & Sightseeing", desc: "Enjoy a comprehensive group coach tour covering the prominent cultural and historical landmarks with a local guide.", duration: "Half Day (4 hours)", includes: "Transfers, Entry Tickets, Group Tour Guide", priceDiff: 0 },
  { id: "act_pvt", name: "Private Guided Heritage & Shopping Tour", desc: "A personalized full-day private sedan tour exploring historic monuments, heritage lanes, and local handicraft markets.", duration: "Full Day (8 hours)", includes: "Private Sedan, Personal Tour Guide, Entry Tickets, Mineral Water", priceDiff: 1500 },
  { id: "act_vip", name: "VIP Luxury Yacht Cruise & Private Dining", desc: "Experience pure extravagance with a private luxury yacht cruise at sunset followed by a premium multi-course dinner on deck.", duration: "Evening (4 hours)", includes: "Private Yacht Charter, Champagne Welcome, Custom Gourmet Dinner, Hotel Pick-up", priceDiff: 6500 }
];

const HOLIDAY_COUPONS = [
  { code: "MMTDEAL", discount: 3000, type: "flat", desc: "Get flat ₹3,000 off on holiday package bookings!" },
  { code: "TRIPFAMILY", discount: 0.10, maxDiscount: 6000, type: "percentage", desc: "Get 10% off (up to ₹6,000) on multi-guest/family packages!" },
  { code: "WELCOMEHOL", discount: 2500, type: "flat", desc: "Get flat ₹2,500 off on your very first vacation booking!" }
];

const BookingScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const routeTabMap = {
    "/hotel": "stays",
    "/stays/search": "stays",
    "/flights": "flights",
    "/trains": "trains",
    "/cars": "cars",
    "/cruises": "cruises",
    "/holidays": "holidays",
    "/attractions": "attractions"
  };

  const tabRouteMap = {
    "stays": "/hotel",
    "flights": "/flights",
    "trains": "/trains",
    "cars": "/cars",
    "cruises": "/cruises",
    "holidays": "/holidays",
    "attractions": "/attractions"
  };

  // Tab: stays | flights | cars | attractions
  const [activeTab, setActiveTab] = useState("stays");

  // Sync activeTab with URL so direct visits render correct content
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/hotel") || path.includes("/stays")) setActiveTab("stays");
    else if (path.includes("/flights")) setActiveTab("flights");
    else if (path.includes("/trains")) setActiveTab("trains");
    else if (path.includes("/buses")) setActiveTab("buses");
    else if (path.includes("/cars")) setActiveTab("cars");
    else if (path.includes("/cruises")) setActiveTab("cruises");
    else if (path.includes("/holidays")) setActiveTab("holidays");
    else if (path.includes("/attractions")) setActiveTab("attractions");
    else setActiveTab("stays");

    // Scroll to the search bar to show the correct layout after redirection
    setTimeout(() => {
      const searchSection = document.getElementById("main-search-bar-container");
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  }, [location.pathname]);

  // Search parameters
  let initDest = "";
  try {
    initDest = searchParams.get("destination") || "";
    if (!initDest && location.pathname.startsWith("/stays/hotels-in-")) {
      const parts = location.pathname.split("/stays/hotels-in-");
      if (parts.length > 1 && parts[1]) {
        initDest = decodeURIComponent(parts[1]).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      }
    }
  } catch (e) {
    console.error("Error parsing destination from URL", e);
  }

  const initCheckIn = searchParams.get("checkIn") || "2026-11-05";
  const initCheckOut = searchParams.get("checkOut") || "2026-11-12";
  const initRooms = parseInt(searchParams.get("rooms")) || 1;
  const initAdults = parseInt(searchParams.get("adults")) || 2;
  const initChildren = parseInt(searchParams.get("children")) || 0;

  const [searchDest, setSearchDest] = useState(initDest);
  const [checkInDate, setCheckInDate] = useState(initCheckIn);
  const [checkOutDate, setCheckOutDate] = useState(initCheckOut);
  const [guestsCount, setGuestsCount] = useState({ adults: initAdults, children: initChildren, rooms: initRooms });
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  // Suggestions state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const SUGGESTED_CITIES = [
    "Delhi, India",
    "Mumbai, India",
    "Agra, India",
    "Jaipur, India",
    "Goa, India",
    "Kerala, India",
    "Paris, France",
    "Tokyo, Japan",
    "London, United Kingdom",
    "Rome, Italy",
    "Zurich, Switzerland",
    "Dubai, United Arab Emirates",
    "New York, United States",
    "Singapore",
    "Bangkok, Thailand",
    "Bali, Indonesia"
  ];

  // Flight search params
  const initFlightFrom = searchParams.get("origin") || "Delhi";
  const initFlightTo = searchParams.get("destination") || "";
  const initFlightDepart = searchParams.get("departDate") || "2026-11-05";
  const initFlightReturn = searchParams.get("returnDate") || "2026-12-05";
  const initFlightTripType = searchParams.get("tripType") || "round-trip";
  
  const [flightFrom, setFlightFrom] = useState(initFlightFrom);
  const [flightTo, setFlightTo] = useState(initFlightTo);
  const [flightDepart, setFlightDepart] = useState(initFlightDepart);
  const [flightReturn, setFlightReturn] = useState(initFlightReturn);
  const [flightTripType, setFlightTripType] = useState(initFlightTripType);

  // Trains params
  const initTrainFrom = searchParams.get("origin") || "Delhi";
  const initTrainTo = searchParams.get("destination") || "";
  const initTrainDate = searchParams.get("date") || "2026-11-05";
  const initTrainClass = searchParams.get("ticketQuota") || "General";

  const [trainFrom, setTrainFrom] = useState(initTrainFrom);
  const [trainTo, setTrainTo] = useState(initTrainTo);
  const [trainDate, setTrainDate] = useState(initTrainDate);
  const [trainClass, setTrainClass] = useState(initTrainClass);
  const [trainSubTab, setTrainSubTab] = useState("booking");

  // Cars params
  const [carPickup, setCarPickup] = useState(searchParams.get("pickup") || "");
  const [carDropoff, setCarDropoff] = useState(searchParams.get("dropoff") || "");
  const [carPickupDate, setCarPickupDate] = useState(searchParams.get("pickupDate") || "");
  const [carDropoffDate, setCarDropoffDate] = useState(searchParams.get("dropoffDate") || "");

  // Attractions params
  const [attractionQuery, setAttractionQuery] = useState(searchParams.get("query") || "");

  // Holidays params
  const [holidayOrigin, setHolidayOrigin] = useState(searchParams.get("origin") || "");
  const [holidayDest, setHolidayDest] = useState(searchParams.get("destination") || "");
  const [holidayDate, setHolidayDate] = useState(searchParams.get("departureDate") || "");
  
  // States for Buses
  const [openFAQ, setOpenFAQ] = useState(0); // booking | live | pnr | eurail
  const [trainNumber, setTrainNumber] = useState("");
  const [spotResult, setSpotResult] = useState(null);
  const [spotLoading, setSpotLoading] = useState(false);
  const [pnrNumber, setPnrNumber] = useState("");
  const [pnrResult, setPnrResult] = useState(null);
  const [pnrLoading, setPnrLoading] = useState(false);
  const [eurailCountry, setEurailCountry] = useState("Global Pass");
  const [eurailDuration, setEurailDuration] = useState("4 Days in 1 Month");
  const [eurailClass, setEurailClass] = useState("2nd Class");
  const [eurailTravellers, setEurailTravellers] = useState(1);
  const [selectedTrainSeats, setSelectedTrainSeats] = useState([]);
  const [selectedBusSeats, setSelectedBusSeats] = useState([]);
  const [trainCatering, setTrainCatering] = useState({});
  const [trainFreeCancel, setTrainFreeCancel] = useState(false);
  const [trainInsurance, setTrainInsurance] = useState(false);
  const [selectedEurailCountries, setSelectedEurailCountries] = useState(["France", "Switzerland", "Italy"]);

  // Train sidebar filters
  const [trainTypeFilter, setTrainTypeFilter] = useState({ rajdhani: false, shatabdi: false, mailExpress: false });
  const [trainClassFilter, setTrainClassFilter] = useState({ ac3: false, ac2: false, ac1: false, sleeper: false });
  const [trainDepTimeFilter, setTrainDepTimeFilter] = useState({ morning: false, afternoon: false, evening: false, night: false });
  const [trainQuota, setTrainQuota] = useState("General Quota");

  // Holidays search params
  const [holidayDepart, setHolidayDepart] = useState("Delhi");
  const [holidayGoingTo, setHolidayGoingTo] = useState("");
  const [holidayMonth, setHolidayMonth] = useState("July 2026");
  const [holidayActiveTheme, setHolidayActiveTheme] = useState("all");
  const [activeHolidayDay, setActiveHolidayDay] = useState(0);
  const [holidayType, setHolidayType] = useState("domestic"); // domestic | international
  const [selectedTourType, setSelectedTourType] = useState("private"); // private | group
  const [selectedHotelTier, setSelectedHotelTier] = useState("standard"); // standard | deluxe | luxury
  const [selectedFlightTier, setSelectedFlightTier] = useState("standard"); // standard | direct | business
  const [holidaySelectedFlight, setHolidaySelectedFlight] = useState(ALTERNATIVE_FLIGHTS[0]);
  const [holidaySelectedHotel, setHolidaySelectedHotel] = useState(ALTERNATIVE_HOTELS[0]);
  const [holidaySelectedActivity, setHolidaySelectedActivity] = useState(ALTERNATIVE_ACTIVITIES[0]);
  const [holidayCouponApplied, setHolidayCouponApplied] = useState(null);
  const [holidayCouponInput, setHolidayCouponInput] = useState("");
  const [holidayShowFlightModal, setHolidayShowFlightModal] = useState(false);
  const [holidayShowHotelModal, setHolidayShowHotelModal] = useState(false);
  const [holidayShowActivityModal, setHolidayShowActivityModal] = useState(false);
  const [holidayShowBreakdownModal, setHolidayShowBreakdownModal] = useState(false);
  const [payTokenOnly, setPayTokenOnly] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [holidaySortBy, setHolidaySortBy] = useState("popular"); // popular | duration | price_low | price_high | recent
  const [holidayBudgetFilter, setHolidayBudgetFilter] = useState(null); // null | under20k | 20to40k | over40k
  const [holidayDurationFilter, setHolidayDurationFilter] = useState(null); // null | short | long
  const [holidayFilterDuration, setHolidayFilterDuration] = useState("all"); // all | upTo3 | 4to6 | 7to10 | 11to15 | above16
  const [holidayFilterHotelStar, setHolidayFilterHotelStar] = useState("all"); // all | 5star | 4star | upTo3star
  const [holidayFilterTrans, setHolidayFilterTrans] = useState("all"); // all | bus | landOnly | flightOptional
  const [holidayFilterThemes, setHolidayFilterThemes] = useState("all"); // all | adventure | affordable | exotic | group | romantic | sightseeing | van
  const [holidayFilterPriceRange, setHolidayFilterPriceRange] = useState("all"); // all | upTo20k | 20to30k | 30to40k | 40to50k | 50to75k | 75to100k | above100k
  const [holidayActiveInfoTab, setHolidayActiveInfoTab] = useState("about"); // about | bestTime | howToReach | attractions | faqs
  const [holidayDetailTab, setHolidayDetailTab] = useState("itinerary"); // itinerary | inclusions | hotels | policies
  const [holidayCallbackPhone, setHolidayCallbackPhone] = useState("");
  const [holidayCallbackRequested, setHolidayCallbackRequested] = useState(false);
  const [holidaySelectedCompare, setHolidaySelectedCompare] = useState([]);
  const [holidayShowCompareModal, setHolidayShowCompareModal] = useState(false);
  const [holidayPreviewItineraryCard, setHolidayPreviewItineraryCard] = useState(null);
  const [holidayFormDepart, setHolidayFormDepart] = useState("Delhi");
  const [holidayFormTourType, setHolidayFormTourType] = useState("Premium");
  const [holidayFormRooms, setHolidayFormRooms] = useState([{ id: 1, adults: 2, childWithBed: 0, childNoBed: 0, infants: 0 }]);
  const [holidayFormTravelDate, setHolidayFormTravelDate] = useState("2026-07-11");
  const [holidayFormMobile, setHolidayFormMobile] = useState("");
  const [holidayFormEmail, setHolidayFormEmail] = useState("");
  const [holidayFormTermsAccepted, setHolidayFormTermsAccepted] = useState(false);
  const [holidayFormCalculated, setHolidayFormCalculated] = useState(false);

  // Attraction detail parameters
  const [attractionAdults, setAttractionAdults] = useState(2);
  const [attractionChildren, setAttractionChildren] = useState(0);
  const [attractionVariant, setAttractionVariant] = useState("std"); // std | priority | vip
  const [attractionCoupon, setAttractionCoupon] = useState(null);
  const [attractionCouponInput, setAttractionCouponInput] = useState("");
  const [attractionDetailTab, setAttractionDetailTab] = useState("overview"); // overview | itinerary | guidelines | policies
  const [attractionPayToken, setAttractionPayToken] = useState(false);


  // Car rental params
  const [carPickUp, setCarPickUp] = useState("");
  const [carPickUpTime, setCarPickUpTime] = useState("10:00");
  const [carPickUpDate, setCarPickUpDate] = useState("");
  const [carDropOffDate, setCarDropOffDate] = useState("");
  const [carDropOffTime, setCarDropOffTime] = useState("10:00");
  const [cabTypeFilters, setCabTypeFilters] = useState({});
  const [cabModelFilters, setCabModelFilters] = useState({});
  const [fuelTypeFilters, setFuelTypeFilters] = useState({});

  // Car rental extra filters
  const [carDifferentDropOff, setCarDifferentDropOff] = useState(false);
  const [carDropOffLocation, setCarDropOffLocation] = useState("");
  const [driverAgeMin, setDriverAgeMin] = useState(18);
  const [driverAgeMax, setDriverAgeMax] = useState(60);
  const [showQuickFilters, setShowQuickFilters] = useState(false);
  const [quickFilterSeats, setQuickFilterSeats] = useState(null); // null | "2-4" | "5" | "6+"
  const [quickFilterAutomatic, setQuickFilterAutomatic] = useState(false);
  const [quickFilterUnlimitedMiles, setQuickFilterUnlimitedMiles] = useState(false);

  // Cruise search parameters
  const [cruiseDest, setCruiseDest] = useState("Caribbean");
  const [cruisePort, setCruisePort] = useState("All Ports");
  const [cruiseMonth, setCruiseMonth] = useState("November 2026");
  const [cruiseDurationFilter, setCruiseDurationFilter] = useState("All Durations");
  const [cruiseShipFilter, setCruiseShipFilter] = useState("All Ships");

  // Cruise packages add-on choices
  const [cruiseDrinkPackage, setCruiseDrinkPackage] = useState(false);
  const [cruiseWifiPackage, setCruiseWifiPackage] = useState(false);
  const [cruiseExcursionPackage, setCruiseExcursionPackage] = useState(false);
  const [selectedCruiseExcursions, setSelectedCruiseExcursions] = useState([]);
  const [cruiseThemeFilter, setCruiseThemeFilter] = useState("All Themes");
  const [cruisePayOption, setCruisePayOption] = useState("full"); // full | deposit
  const [cruiseNights, setCruiseNights] = useState(7);
  const [selectedSpaTreatments, setSelectedSpaTreatments] = useState([]);

  // Interactive View controller: search | results | details | checkout | ticket
  const [view, setView] = useState(() => {
    if (searchParams.get("view") === "results" || location.pathname.startsWith("/stays/search") || location.pathname.startsWith("/stays/hotels-in-") || searchParams.has("destination")) {
      return "results";
    }
    return "search";
  });

  // Filter conditions
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filterStars, setFilterStars] = useState({ 5: false, 4: false, 3: false });
  const [maxBudget, setMaxBudget] = useState(50000);
  const [minBudget, setMinBudget] = useState(0);
  // MakeMyTrip-style filter states
  const [filterDeals, setFilterDeals] = useState({ rushDeal: false, lastMinute: false, beachfront: false, oneCircle: false });
  const [filterPriceRanges, setFilterPriceRanges] = useState({ r1: false, r2: false, r3: false, r4: false, r5: false, r6: false });
  const [filterRating, setFilterRating] = useState({ excellent: false, veryGood: false, good: false });
  const [filterPropertyType, setFilterPropertyType] = useState({ apartment: false, villa: false, hotel: false, resort: false, homestay: false });
  const [filterRoomViews, setFilterRoomViews] = useState({ garden: false, pool: false });
  const [filterAmenities, setFilterAmenities] = useState({ kitchenette: false, fireplace: false, jacuzzi: false, bathtub: false, balcony: false, pool: false, wifi: false, spa: false });
  const [filterBookingPref, setFilterBookingPref] = useState({ caretaker: false, instantBook: false, entireVillas: false, homestays: false, starHost: false });
  const [filterHouseRules, setFilterHouseRules] = useState({ selfCheckIn: false, smokingAllowed: false, allMale: false, unmarriedCouples: false, alcoholAllowed: false, petsAllowed: false });
  const [filterDealsOffers, setFilterDealsOffers] = useState({ travelMuhurat: false, oneCircleRewards: false, lightningDrops: false });
  const [filterCheckInOut, setFilterCheckInOut] = useState({ earlyCheckIn: false, lateCheckOut: false });
  const [showMorePropertyTypes, setShowMorePropertyTypes] = useState(false);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const [showMoreChains, setShowMoreChains] = useState(false);
  const [filterLocations, setFilterLocations] = useState({});
  const [filterStaysOptions, setFilterStaysOptions] = useState({
    swimming: false,
    oneBed: false,
    twoBed: false,
    ac: false,
    nonAc: false,
    deluxe: false,
    superDeluxe: false,
    married: false,
    unmarried: false,
    breakfast: false,
    nonBreakfast: false,
    smoking: false,
    nonSmoking: false,
    wifi: false,
    nonWifi: false,
    laundry: false,
    nonLaundry: false
  });

  // Flight-specific state
  const [tripType, setTripType] = useState("roundtrip"); // roundtrip | oneway | multicity
  const [cabinClass, setCabinClass] = useState("Economy");
  const [showCabinPopup, setShowCabinPopup] = useState(false);
  const [fareType, setFareType] = useState("regular"); // regular | student | gst
  const [selectionView, setSelectionView] = useState("combined"); // individual | combined
  const [flightPreference, setFlightPreference] = useState("");
  const [selectedOnwardAirports, setSelectedOnwardAirports] = useState({});
  const [selectedReturnAirports, setSelectedReturnAirports] = useState({});
  const [selectedStopsFilter, setSelectedStopsFilter] = useState({ nonStop: false, oneStop: false, twoStops: false });
  const [refundableOnly, setRefundableOnly] = useState(false);
  const [hideNearbyAirports, setHideNearbyAirports] = useState(false);
  const [directOnly, setDirectOnly] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [flightSortBy, setFlightSortBy] = useState("cheapest"); // best | cheapest | fastest
  const [flightFilterStops, setFlightFilterStops] = useState("any"); // any | 1stop
  const [flightFilterAirlines, setFlightFilterAirlines] = useState({ ita: false, lufthansa: false, aeroitalia: false, etihad: false, airArabia: false });
  const [flightFilterDeptTime, setFlightFilterDeptTime] = useState({ t1: false, t2: false, t3: false, t4: false });
  const [flightFilterArrTime, setFlightFilterArrTime] = useState({ t1: false, t2: false, t3: false, t4: false });
  const [maxFlightDuration, setMaxFlightDuration] = useState(43);
  const [maxFlightPrice, setMaxFlightPrice] = useState(1082400);



  const [showAllAirlines, setShowAllAirlines] = useState(false);
  const [showFlightFilters, setShowFlightFilters] = useState(false);

  // Active results list
  const [searchResults, setSearchResults] = useState([]);

  // Selected stay/flight/car details
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Checkout form details
  const [guestDetails, setGuestDetails] = useState({ name: "", email: "", phone: "", gender: "" });
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvc: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);

  // Cab specific checkout states
  const [specialRequests, setSpecialRequests] = useState({ roofCarrier: false, language: false, newVehicle: false });
  const [cabPaymentOption, setCabPaymentOption] = useState("full"); // "part" | "full"
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [cabBillingAddress, setCabBillingAddress] = useState(true);
  const [showCabCancelModal, setShowCabCancelModal] = useState(false);

  // Dynamic lower section states
  const [activeFaq, setActiveFaq] = useState(null);
  const [showAllCarDestinations, setShowAllCarDestinations] = useState(false);

  // Chatbot states
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: "welcome",
      sender: "myra",
      text: "Hi! I am Myra, your virtual travel assistant. ✈️\nHow can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options: ["Check my booking", "Flights search status", "Talk to an agent"]
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatIsTyping, setChatIsTyping] = useState(false);
  const chatEndRef = React.useRef(null);

  // Flight Details & Fare Options Modal states
  const [showFlightDetailsModal, setShowFlightDetailsModal] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState("depart"); // "depart" | "return"
  const [selectedDepartOption, setSelectedDepartOption] = useState("saver"); // "saver" | "flexi" | "special"
  const [selectedReturnOption, setSelectedReturnOption] = useState("value"); // "value" | "classic" | "flex"
  const [modalFlightItem, setModalFlightItem] = useState(null);
  const [priceDropProtected, setPriceDropProtected] = useState(false);

  // Cab reviews and feedback states
  const [cabReviews, setCabReviews] = useState([
    { id: 1, author: "Kavita Gupte", rating: 4, text: "I really appreciated the safe driving during my trip, which made me feel secure. The driver was polite and picked me up on time. The vehicle was just as described, with clean interiors and sufficient space. Plus, the AC worked well throughout the ride.", date: "02 Jul 2026", behavior: true, ac: true, clean: true },
    { id: 2, author: "Arjun Verma", rating: 5, text: "Driver maintained excellent behavior, drove safely, and kept the AC running nicely. Clean and fresh car.", date: "29 Jun 2026", behavior: true, ac: true, clean: true }
  ]);
  const [newCabReviewAuthor, setNewCabReviewAuthor] = useState("");
  const [newCabReviewText, setNewCabReviewText] = useState("");
  const [newCabReviewRating, setNewCabReviewRating] = useState(5);
  const [newCabReviewBehavior, setNewCabReviewBehavior] = useState(true);
  const [newCabReviewAc, setNewCabReviewAc] = useState(true);
  const [newCabReviewClean, setNewCabReviewClean] = useState(true);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, chatIsTyping]);

  const handleSendChatMessage = (textToSend) => {
    const msg = textToSend || chatInput;
    if (!msg.trim()) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: msg,
      time: timeString
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput("");
    setChatIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      setChatIsTyping(false);

      const query = msg.toLowerCase();
      let replyText = "";
      let replyOptions = [];

      if (query.includes("booking") || query.includes("ticket") || query.includes("reservation") || query === "check my booking") {
        if (ticketDetails) {
          replyText = `I found your confirmed booking! 🎫\n\n**Booking ID:** ${ticketDetails.id}\n**Item:** ${ticketDetails.item?.name || "Flight details"}\n**Guest:** ${ticketDetails.guest?.name}\n**Check-in:** ${ticketDetails.checkIn}\n**Check-out:** ${ticketDetails.checkOut}\n**Total Paid:** ₹${ticketDetails.total?.toLocaleString()}`;
          replyOptions = ["Flights search status", "Talk to an agent"];
        } else if (selectedItem) {
          replyText = `You have a pending selection: **${selectedItem.name}** for ₹${(selectedItem.price || selectedItem.discountPrice)?.toLocaleString()}.\n\nComplete the checkout process to confirm your booking!`;
          replyOptions = ["Check my booking", "Talk to an agent"];
        } else {
          replyText = "You don't have any active or pending bookings yet. Would you like to search for hotels, flights, or activities?";
          replyOptions = ["Search flights", "Search hotels", "Talk to an agent"];
        }
      } else if (query.includes("flight") || query.includes("future flight") || query === "flights search status" || query === "search flights") {
        const fromCity = flightFrom || "New Delhi";
        const toCity = flightTo || "Paris";
        replyText = `✈️ **Flights Search Status:**\n\nYou are searching for flights from **${fromCity}** to **${toCity}**.\n\nWe found excellent options including Air France (Non-stop) and Oman Air (1 stop via Muscat). Rates start from ₹69,900.`;
        replyOptions = ["Check my booking", "Visa requirements", "Talk to an agent"];
      } else if (query.includes("visa") || query.includes("transit") || query === "visa requirements") {
        const toCity = flightTo || "Paris";
        replyText = `🛂 **Visa Information for ${toCity || 'your destination'}:**\n\n- Layovers in Muscat (Oman Air) or Warsaw (LOT Polish) require transit visas for Indian citizens.\n- Non-stop Air France flights do not require transit visas for Schengen Area entry, but you must have a valid Schengen tourist visa.\n- Ensure passport validity is at least 6 months.`;
        replyOptions = ["Check my booking", "Flights search status", "Talk to an agent"];
      } else if (query.includes("agent") || query.includes("talk") || query === "talk to an agent" || query === "call an agent" || query === "chat with an agent" || query === "schedule a call") {
        if (query === "call an agent") {
          replyText = "📞 **Connecting to Agent Call Center**\n\nDialing toll-free at **1-800-555-TRIP**. A representative will be with you shortly. Please keep your Booking ID handy!";
        } else if (query === "chat with an agent") {
          replyText = "💬 **Live Chat Queue**\n\nAll live support agents are currently assisting other travelers. Your estimated wait time is **3 minutes**. Please write your questions here, and the first available agent will pick them up!";
        } else if (query === "schedule a call") {
          replyText = `📅 **Call Scheduled Successfully!**\n\nWe have scheduled a callback. An agent will call you at **${guestDetails.phone || 'your phone number'}** within the next 30 minutes. Thank you!`;
        } else {
          replyText = "I can connect you to a live support agent immediately. Please choose a method below:";
          replyOptions = ["Call an agent", "Chat with an agent", "Schedule a call"];
        }
      } else if (query === "search hotels") {
        replyText = "🏨 To search for stays, select the **Stays** tab at the top of the search page, enter your destination and dates, and click **Search**.";
        replyOptions = ["Check my booking", "Talk to an agent"];
      } else {
        replyText = "I'm not sure I understand that query. I can help you check your booking, check flight status, provide visa details, or connect you to an agent.";
        replyOptions = ["Check my booking", "Flights search status", "Talk to an agent"];
      }

      setChatMessages(prev => [...prev, {
        id: `myra-${Date.now()}`,
        sender: "myra",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: replyOptions
      }]);
    }, 1000);
  };

  // Sync tab with URL parameter or search params
  useEffect(() => {
    let tabFromPath = routeTabMap[location.pathname];
    if (location.pathname.startsWith("/stays")) {
      tabFromPath = "stays";
    }
    
    if (tabFromPath) {
      setActiveTab(tabFromPath);
    } else {
      const tabParam = searchParams.get("tab");
      const validTabs = ["stays", "flights", "cars", "attractions", "holidays", "trains", "cruises", "buses"];
      if (tabParam && validTabs.includes(tabParam)) {
        setActiveTab(tabParam);
        // DO NOT redirect away from /booking if we are already there to show results
        if (!location.pathname.startsWith("/booking")) {
          const targetRoute = tabRouteMap[tabParam] || "/booking";
          navigate(targetRoute, { replace: true });
        }
      } else if (location.pathname === "/booking") {
        setActiveTab("stays");
      }
    }
  }, [location.pathname, searchParams, navigate]);

  // Sync view state with URL search params (to handle in-page navigation without unmounting)
  useEffect(() => {
    const viewParam = searchParams.get("view");
    if (viewParam) {
      setView(viewParam);
    } else {
      // If there is no view param, always reset to search
      setView("search");
    }
  }, [searchParams, location.pathname]);


  // Handle autocomplete suggestions
  const handleDestChange = (val) => {
    setSearchDest(val);
    setShowSuggestions(true);
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      if (searchDest.length < 2) {
        setSuggestions([]);
        return;
      }
      setIsSearching(true);
      try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchDest)}&count=5&language=en&format=json`);
        const data = await response.json();
        
        if (data.results) {
          const places = data.results.map(place => {
            const country = place.country || '';
            const admin1 = place.admin1 || '';
            let locationName = place.name;
            if (admin1 && admin1 !== place.name) locationName += `, ${admin1}`;
            if (country) locationName += `, ${country}`;
            return locationName;
          });
          setSuggestions([...new Set(places)]);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchPlaces();
    }, 400);

    return () => clearTimeout(debounceTimer);
  }, [searchDest]);

  // Helper to instantly trigger a search from recommendations
  const triggerInstantSearch = (tab, params) => {
    setActiveTab(tab);
    setView("results");

    if (tab === "stays") {
      const dest = params.dest || "Paris";
      setSearchDest(dest);
      const destKey = dest.toLowerCase().trim();
      const filtered = STAYS_DATABASE.filter(stay =>
        stay.city.toLowerCase().includes(destKey) || destKey.includes(stay.city.toLowerCase())
      );
      setSearchResults(filtered.length > 0 ? filtered : STAYS_DATABASE);
    } else if (tab === "flights") {
      const from = params.from || "Delhi";
      const to = params.to || "";
      setFlightFrom(from);
      setFlightTo(to);
      const filtered = FLIGHTS_DATABASE.filter(f =>
        f.from.toLowerCase().includes(from.toLowerCase()) &&
        f.to.toLowerCase().includes(to.toLowerCase())
      );
      if (filtered.length === 0) {
        const generated = [
          { id: "f-dyn-1", from, to: to || "Worldwide", airline: "Starline Airways", price: 8500, duration: "3h 40m", stops: "Non-stop" },
          { id: "f-dyn-2", from, to: to || "Worldwide", airline: "GlobeFlyer", price: 6200, duration: "5h 15m", stops: "1 stop" }
        ];
        setSearchResults(generated);
      } else {
        setSearchResults(filtered);
      }
    } else if (tab === "cars") {
      const pickUp = params.pickUp || "Delhi";
      setCarPickUp(pickUp);
      // Filter or generate
      const generated = CARS_DATABASE.map(car => ({
        ...car,
        name: `${car.name} (${pickUp} branch)`,
      }));
      setSearchResults(generated);
    } else if (tab === "attractions") {
      const dest = params.dest || "Agra";
      setSearchDest(dest);
      const destKey = dest.toLowerCase().trim();
      const filtered = ATTRACTIONS_DATABASE.filter(attr =>
        attr.city.toLowerCase().includes(destKey) || destKey.includes(attr.city.toLowerCase()) ||
        attr.name.toLowerCase().includes(destKey)
      );
      if (filtered.length === 0 && dest.trim()) {
        const generated = [
          {
            id: `a-dyn-1`,
            city: dest,
            name: `${dest} Ultimate City Sightseeing Experience`,
            rating: 4.5,
            ratingText: "Very Good",
            reviewsCount: 98,
            price: 1800,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
            description: `Unveil the secrets of ${dest} on this highly-rated landmarks tour.`,
            benefits: ["Includes local host", "Flexible times"],
            duration: "4 hours",
            includes: "Professional tour guide, Entrance fees"
          }
        ];
        setSearchResults(generated);
      } else {
        setSearchResults(filtered.length > 0 ? filtered : ATTRACTIONS_DATABASE);
      }
    } else if (tab === "trains") {
      const from = params.from || "Delhi";
      const to = params.to || "";
      setTrainFrom(from);
      setTrainTo(to);
      const filtered = TRAINS_DATABASE.filter(t =>
        t.from.toLowerCase().includes(from.toLowerCase()) &&
        t.to.toLowerCase().includes(to.toLowerCase())
      );
      if (filtered.length === 0) {
        const generated = [
          { id: "t-dyn-1", name: `${to || "Mumbai"} Superfast Express (12901)`, from, to: to || "Mumbai", depart: "18:00", arrive: "09:30", duration: "15h 30m", price: 1850, class: "AC 3 Tier" },
          { id: "t-dyn-2", name: `${to || "Mumbai"} Garib Rath Express (12902)`, from, to: to || "Mumbai", depart: "10:15", arrive: "04:45", duration: "18h 30m", price: 890, class: "AC Chair Car" }
        ];
        setSearchResults(generated);
      } else {
        setSearchResults(filtered);
      }
    }
  };

  // Handle main search execution
  const handleSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setView("results");

    if (activeTab === "stays") {
      const destKey = searchDest.toLowerCase().trim();
      const filtered = STAYS_DATABASE.filter(stay =>
        stay.city.toLowerCase().includes(destKey) || destKey.includes(stay.city.toLowerCase())
      );

      // Fallback stays generator if destination not in pre-defined set
      if (filtered.length === 0 && searchDest.trim()) {
        const generated = [
          {
            id: `h-dyn-1`,
            city: searchDest,
            name: `${searchDest} Grand Hotel & Suites`,
            stars: 5,
            rating: 9.1,
            ratingText: "Excellent",
            reviewsCount: 420,
            price: 9500,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
            distance: "0.5 km from center",
            benefits: ["Free cancellation", "No prepayment needed"],
            rooms: [
              { name: "Standard Queen Room", price: 9500, maxGuests: 2, includes: "Free Wi-Fi" },
              { name: "Deluxe Suite", price: 16000, maxGuests: 3, includes: "Free breakfast, Free Wi-Fi" }
            ]
          },
          {
            id: `h-dyn-2`,
            city: searchDest,
            name: `${searchDest} Heritage Resort`,
            stars: 4,
            rating: 8.5,
            ratingText: "Very Good",
            reviewsCount: 190,
            price: 6200,
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
            distance: "3.1 km from center",
            benefits: ["Free breakfast", "Pool access"],
            rooms: [
              { name: "Classic Room", price: 6200, maxGuests: 2, includes: "Breakfast included" }
            ]
          }
        ];
        setSearchResults(generated);
      } else {
        setSearchResults(filtered.length > 0 ? filtered : STAYS_DATABASE);
      }
    } else if (activeTab === "flights") {
      const filtered = FLIGHTS_DATABASE.filter(f =>
        f.from.toLowerCase().includes(flightFrom.toLowerCase()) &&
        f.to.toLowerCase().includes(flightTo.toLowerCase())
      );

      if (filtered.length === 0) {
        // Fallback dynamic flights
        const generated = [
          { id: "f-dyn-1", from: flightFrom, to: flightTo || "Worldwide", airline: "Starline Airways", price: 8500, duration: "3h 40m", stops: "Non-stop" },
          { id: "f-dyn-2", from: flightFrom, to: flightTo || "Worldwide", airline: "GlobeFlyer", price: 6200, duration: "5h 15m", stops: "1 stop" }
        ];
        setSearchResults(generated);
      } else {
        setSearchResults(filtered);
      }
    } else if (activeTab === "cars") {
      setSearchResults(CARS_DATABASE);
    } else if (activeTab === "attractions") {
      const destKey = searchDest.toLowerCase().trim();
      const filtered = ATTRACTIONS_DATABASE.filter(attr =>
        attr.city.toLowerCase().includes(destKey) || destKey.includes(attr.city.toLowerCase()) ||
        attr.name.toLowerCase().includes(destKey)
      );

      if (filtered.length === 0 && searchDest.trim()) {
        const generated = [
          {
            id: `a-dyn-1`,
            city: searchDest,
            name: `${searchDest} Ultimate City Sightseeing Experience`,
            rating: 4.5,
            ratingText: "Very Good",
            reviewsCount: 98,
            price: 1800,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
            description: `Unveil the secrets of ${searchDest} on this highly-rated immersive landmarks and local food walking tour.`,
            benefits: ["Includes English local host", "Free traditional tastings", "Flexible start times"],
            duration: "4 hours",
            includes: "Professional tour guide, Entrance fees to 2 top attractions, Local snacks"
          }
        ];
        setSearchResults(generated);
      } else {
        setSearchResults(filtered.length > 0 ? filtered : ATTRACTIONS_DATABASE);
      }
    } else if (activeTab === "holidays") {
      const destKey = holidayGoingTo.toLowerCase().trim();
      const filtered = HOLIDAYS_DATABASE.filter(pkg =>
        pkg.name.toLowerCase().includes(destKey) || pkg.destinations.toLowerCase().includes(destKey)
      );
      setSearchResults(filtered.length > 0 ? filtered : HOLIDAYS_DATABASE);
    } else if (activeTab === "trains") {
      if (trainSubTab === "live") {
        setSpotLoading(true);
        setSpotResult(null);
        setTimeout(() => {
          setSpotLoading(false);
          const num = trainNumber.trim() || "12952";
          setSpotResult({
            number: num,
            name: num === "12952" ? "Mumbai Rajdhani Express" : num === "12002" ? "New Delhi Shatabdi Express" : "Superfast Express",
            currentStation: num === "12952" ? "Ratlam Jn" : "Mathura Jn",
            status: num === "12952" ? "Departed 10 mins late" : "On Time",
            nextStation: num === "12952" ? "Vadodara Jn" : "Agra Cantt",
            timeline: [
              { station: "Source Station", time: "Departed", status: "completed" },
              { station: num === "12952" ? "Ratlam Jn" : "Mathura Jn", time: num === "12952" ? "12:40 PM" : "07:20 AM", status: "current" },
              { station: num === "12952" ? "Vadodara Jn" : "Agra Cantt", time: num === "12952" ? "03:55 PM" : "08:06 AM", status: "upcoming" }
            ]
          });
          setView("results");
        }, 800);
        return;
      }
      if (trainSubTab === "pnr") {
        setPnrLoading(true);
        setPnrResult(null);
        setTimeout(() => {
          setPnrLoading(false);
          const num = pnrNumber.trim() || "4239810291";
          setPnrResult({
            pnr: num,
            trainName: "Mumbai Rajdhani Express (12952)",
            dateOfJourney: trainDate || "2026-11-05",
            passengers: [
              { name: "Amit Sharma", age: 34, gender: "M", status: "Confirmed (Coach B2, Berth 36)" }
            ]
          });
          setView("results");
        }, 800);
        return;
      }
      if (trainSubTab === "eurail") {
        setView("results");
        setSearchResults([
          {
            id: "eurail-pass-item",
            name: `${eurailCountry} Pass`,
            validity: eurailDuration,
            class: eurailClass,
            travellers: eurailTravellers,
            price: (eurailCountry === "Global Pass" ? 25200 : 13500) * eurailTravellers,
            from: "Europe",
            to: "Europe",
            depart: "Anytime",
            arrive: "Anytime",
            duration: eurailDuration
          }
        ]);
        return;
      }

      const filtered = TRAINS_DATABASE.filter(t =>
        t.from.toLowerCase().includes(trainFrom.toLowerCase()) &&
        t.to.toLowerCase().includes(trainTo.toLowerCase())
      );
      if (filtered.length === 0) {
        const generated = [
          { id: "t-dyn-1", name: `${trainTo || "Mumbai"} Superfast Express (12901)`, from: trainFrom, to: trainTo || "Mumbai", depart: "18:00", arrive: "09:30", duration: "15h 30m", price: 1850, class: trainClass },
          { id: "t-dyn-2", name: `${trainTo || "Mumbai"} Garib Rath Express (12902)`, from: trainFrom, to: trainTo || "Mumbai", depart: "10:15", arrive: "04:45", duration: "18h 30m", price: 890, class: trainClass }
        ];
        setSearchResults(generated);
      } else {
        setSearchResults(filtered);
      }
    } else if (activeTab === "cruises") {
      let filtered = CRUISES_DATABASE.filter(c => {
        const destMatch = cruiseDest === "All Destinations" || c.name.toLowerCase().includes(cruiseDest.toLowerCase()) || c.destinations.toLowerCase().includes(cruiseDest.toLowerCase()) || c.departurePort.toLowerCase().includes(cruiseDest.toLowerCase());
        const portMatch = cruisePort === "All Ports" || c.departurePort.toLowerCase().includes(cruisePort.toLowerCase());
        const shipMatch = cruiseShipFilter === "All Ships" || c.ship === cruiseShipFilter;

        let durationMatch = true;
        if (cruiseDurationFilter === "1-3 Nights") {
          durationMatch = c.nights >= 1 && c.nights <= 3;
        } else if (cruiseDurationFilter === "4-7 Nights") {
          durationMatch = c.nights >= 4 && c.nights <= 7;
        } else if (cruiseDurationFilter === "8-12 Nights") {
          durationMatch = c.nights >= 8 && c.nights <= 12;
        } else if (cruiseDurationFilter === "14+ Nights") {
          durationMatch = c.nights >= 14;
        }

        const themeMatch = cruiseThemeFilter === "All Themes" ||
          (cruiseThemeFilter === "Wellness / Boutique" && c.line === "Hera Cruises") ||
          (cruiseThemeFilter === "Luxury" && (c.price >= 80000 || c.line === "Hera Cruises")) ||
          (cruiseThemeFilter === "Family" && c.highlights?.some(h => h.toLowerCase().includes("family") || h.toLowerCase().includes("kid"))) ||
          (cruiseThemeFilter === "Last-Minute" && c.benefits?.some(b => b.toLowerCase().includes("savings") || b.toLowerCase().includes("last minute") || b.toLowerCase().includes("upgrade")));

        return destMatch && portMatch && shipMatch && durationMatch && themeMatch;
      });

      if (filtered.length === 0) {
        // dynamic fallback cruise generator
        const durationText = cruiseDurationFilter === "All Durations" ? "7 Nights" : cruiseDurationFilter;
        const nightsCount =
          cruiseDurationFilter === "1-3 Nights" ? 2 :
            cruiseDurationFilter === "4-7 Nights" ? 5 :
              cruiseDurationFilter === "8-12 Nights" ? 9 :
                cruiseDurationFilter === "14+ Nights" ? 14 : 7;
        filtered = [
          {
            id: "cr-dyn-1",
            name: `${nightsCount}-Night ${cruiseDest} Cruise`,
            ship: cruiseShipFilter === "All Ships" ? "Symphony of the Seas" : cruiseShipFilter,
            line: "Royal Caribbean",
            departurePort: cruisePort === "All Ports" ? "Miami, FL" : cruisePort,
            destinationsList: [cruisePort === "All Ports" ? "Miami, Florida" : cruisePort, "Perfect Day at CocoCay, Bahamas", "Nassau, Bahamas", cruisePort === "All Ports" ? "Miami, Florida" : cruisePort],
            destinations: `${cruisePort === "All Ports" ? "Miami" : cruisePort.split(",")[0]} &bull; Perfect Day at CocoCay &bull; Nassau`,
            duration: `${nightsCount} Nights`,
            nights: nightsCount,
            price: 59999 + (nightsCount * 5000),
            rating: 4.7,
            ratingText: "Very Good",
            reviewsCount: 1540,
            image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&auto=format&fit=crop&q=80",
            benefits: ["Perfect Day at CocoCay included", "Deluxe Balcony Free Upgrade", "Instant Booking confirmation"],
            rooms: [
              { name: "Interior Stateroom", price: 59999 + (nightsCount * 5000), maxGuests: 4, includes: "Virtual Balcony, Private bathroom, Twin beds" },
              { name: "Ocean View Balcony", price: 79999 + (nightsCount * 6000), maxGuests: 4, includes: "Ocean view private balcony, sitting sofa" },
              { name: "Sky Loft Suite", price: 169999 + (nightsCount * 12000), maxGuests: 6, includes: "Two-deck panoramic suite, VIP concierge access" }
            ],
            itinerary: Array.from({ length: nightsCount + 1 }).map((_, i) => ({
              day: i + 1,
              port: i === 0 ? (cruisePort === "All Ports" ? "Miami, FL" : cruisePort) : i === nightsCount ? (cruisePort === "All Ports" ? "Miami, FL" : cruisePort) : i === 1 ? "Perfect Day at CocoCay" : i === 2 ? "Nassau, Bahamas" : "Cruising at Sea",
              activities: i === 0 ? "Board the luxury cruise vessel and attend the dinner buffet." : i === nightsCount ? "Disembarkation and head home." : "Enjoy swimming pools, water slides, onboard stage acts and fine dining."
            })),
            highlights: ["Sabor Specialty Dining", "Water Slide trilogy", "Solarium adults-only retreat"]
          }
        ];
      }
      setSearchResults(filtered);
    }
  };

  // Automatically trigger search on mount if initialized to results view
  useEffect(() => {
    if (view === "results" && searchResults.length === 0) {
      handleSearch();
    }
  }, []);

  // Stays filter logic
  const filteredStays = searchResults.filter(stay => {
    // Star filter
    const activeStars = Object.keys(filterStars).filter(k => filterStars[k]);
    if (activeStars.length > 0) {
      if (!activeStars.includes(stay.stars.toString())) return false;
    }
    // Budget filter
    if (stay.price > maxBudget) return false;

    // Swimming Pool filter
    if (filterStaysOptions.swimming) {
      const hasPool = stay.benefits?.some(b => b.toLowerCase().includes("pool") || b.toLowerCase().includes("swimming")) ||
        stay.rooms?.some(r => r.includes?.toLowerCase().includes("pool") || r.name.toLowerCase().includes("pool"));
      if (!hasPool) return false;
    }

    // Bed configuration (1 bed / 2 bed)
    if (filterStaysOptions.oneBed || filterStaysOptions.twoBed) {
      const matchesBed = stay.rooms?.some(r => {
        const name = r.name.toLowerCase();
        const includes = r.includes?.toLowerCase() || "";
        const maxG = r.maxGuests || 2;
        if (filterStaysOptions.oneBed && (name.includes("king") || name.includes("queen") || name.includes("single") || maxG === 2)) return true;
        if (filterStaysOptions.twoBed && (name.includes("twin") || name.includes("suite") || name.includes("double") || maxG >= 3)) return true;
        return false;
      });
      if (!matchesBed) return false;
    }

    // AC / Non-AC
    if (filterStaysOptions.ac || filterStaysOptions.nonAc) {
      const isAc = !stay.name.toLowerCase().includes("non-ac") && !stay.name.toLowerCase().includes("hostel");
      if (filterStaysOptions.ac && !isAc) return false;
      if (filterStaysOptions.nonAc && isAc) return false;
    }

    // Deluxe / Super Deluxe
    if (filterStaysOptions.deluxe || filterStaysOptions.superDeluxe) {
      const matchesCategory = stay.rooms?.some(r => {
        const name = r.name.toLowerCase();
        if (filterStaysOptions.deluxe && name.includes("deluxe")) return true;
        if (filterStaysOptions.superDeluxe && (name.includes("super deluxe") || name.includes("premium") || name.includes("suite") || name.includes("executive"))) return true;
        return false;
      });
      if (!matchesCategory) return false;
    }

    // Married / Unmarried allowed
    if (filterStaysOptions.married || filterStaysOptions.unmarried) {
      const allowsUnmarried = !stay.name.toLowerCase().includes("heritage");
      if (filterStaysOptions.married && !allowsUnmarried && !stay.name) return false;
      if (filterStaysOptions.unmarried && !allowsUnmarried) return false;
    }

    // Breakfast / Non breakfast
    if (filterStaysOptions.breakfast || filterStaysOptions.nonBreakfast) {
      const hasBreakfast = stay.benefits?.some(b => b.toLowerCase().includes("breakfast")) ||
        stay.rooms?.some(r => r.includes?.toLowerCase().includes("breakfast") || r.name.toLowerCase().includes("breakfast"));
      if (filterStaysOptions.breakfast && !hasBreakfast) return false;
      if (filterStaysOptions.nonBreakfast && hasBreakfast) return false;
    }

    // Smoking / Non-smoking room
    if (filterStaysOptions.smoking || filterStaysOptions.nonSmoking) {
      const allowsSmoking = stay.name.toLowerCase().includes("ritz") || stay.name.toLowerCase().includes("palace");
      if (filterStaysOptions.smoking && !allowsSmoking) return false;
      if (filterStaysOptions.nonSmoking && allowsSmoking) return false;
    }

    // Wifi / Non wifi
    if (filterStaysOptions.wifi || filterStaysOptions.nonWifi) {
      const hasWifi = stay.rooms?.some(r => r.includes?.toLowerCase().includes("wi-fi") || r.includes?.toLowerCase().includes("wifi")) || true;
      if (filterStaysOptions.wifi && !hasWifi) return false;
      if (filterStaysOptions.nonWifi && hasWifi) return false;
    }

    // Laundry / Non laundry
    if (filterStaysOptions.laundry || filterStaysOptions.nonLaundry) {
      const hasLaundry = stay.benefits?.some(b => b.toLowerCase().includes("laundry") || b.toLowerCase().includes("dry clean")) || stay.name.toLowerCase().includes("grand") || stay.name.toLowerCase().includes("ritz");
      if (filterStaysOptions.laundry && !hasLaundry) return false;
      if (filterStaysOptions.nonLaundry && hasLaundry) return false;
    }

    return true;
  });

  // Handle details select
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    if (activeTab === "stays") {
      setSelectedRoom(item.rooms[0]); // default to first room
    }
    if (activeTab === "cruises") {
      setSelectedRoom(item.rooms[0]); // default to first room
      setCruiseNights(item.nights); // default to original nights
      setSelectedCruiseExcursions([]); // reset selected excursions
      setSelectedSpaTreatments([]); // reset selected spa treatments
      setCruisePayOption("full"); // reset payment type
    }
    setView("details");
  };

  const getFilteredTrains = () => {
    let list = searchResults;
    if (trainSubTab === "live" || trainSubTab === "pnr") return [];

    // Filter Train Type
    const activeTypes = Object.entries(trainTypeFilter).filter(([, v]) => v).map(([k]) => k);
    if (activeTypes.length > 0) {
      list = list.filter(t => {
        const name = t.name.toLowerCase();
        if (activeTypes.includes("rajdhani") && name.includes("rajdhani")) return true;
        if (activeTypes.includes("shatabdi") && name.includes("shatabdi")) return true;
        if (activeTypes.includes("mailExpress") && (name.includes("garib rath") || name.includes("duronto") || name.includes("superfast"))) return true;
        return false;
      });
    }

    // Filter Class type
    const activeClasses = Object.entries(trainClassFilter).filter(([, v]) => v).map(([k]) => k);
    if (activeClasses.length > 0) {
      list = list.filter(t => {
        const cls = t.class.toLowerCase();
        if (activeClasses.includes("ac3") && cls.includes("3 tier")) return true;
        if (activeClasses.includes("ac2") && cls.includes("2 tier")) return true;
        if (activeClasses.includes("ac1") && cls.includes("first")) return true;
        if (activeClasses.includes("sleeper") && (cls.includes("sleeper") || cls.includes("chair"))) return true;
        return false;
      });
    }

    // Filter Departure Time
    const activeDepTimes = Object.entries(trainDepTimeFilter).filter(([, v]) => v).map(([k]) => k);
    if (activeDepTimes.length > 0) {
      list = list.filter(t => {
        const hour = parseInt(t.depart.split(":")[0]);
        if (activeDepTimes.includes("morning") && (hour >= 6 && hour < 12)) return true;
        if (activeDepTimes.includes("afternoon") && (hour >= 12 && hour < 18)) return true;
        if (activeDepTimes.includes("evening") && (hour >= 18 || hour < 6)) return true;
        return false;
      });
    }

    return list;
  };

  const getTrainCalculatedTotal = () => {
    if (!selectedItem) return 0;
    let base = selectedItem.price;
    if (activeTab !== "trains") return base;
    // Add cancel protection
    if (trainFreeCancel) base += 199 * (selectedItem.id === "eurail-pass-item" ? eurailTravellers : 1);
    // Add meals
    Object.entries(trainCatering).forEach(([mealId, qty]) => {
      const rate = mealId === "vegThali" ? 150 : mealId === "chickenBiryani" ? 220 : 130;
      base += rate * qty;
    });
    return base;
  };

  const getCruiseCalculatedTotal = () => {
    if (!selectedItem || !selectedRoom) return 0;
    const guests = (guestsCount.adults || 2) + (guestsCount.children || 0);
    const nights = cruiseNights || selectedItem.nights || 7;
    const baseRoomRate = Math.round((selectedRoom.price / (selectedItem.nights || 7)) * nights);
    const base = baseRoomRate * guests;
    const taxes = 8500 * guests;
    const addOns =
      (cruiseDrinkPackage ? 4500 * nights * guests : 0) +
      (cruiseWifiPackage ? 1200 * nights * guests : 0) +
      (cruiseExcursionPackage ? 6000 * nights * guests : 0);
    const excursionsCost = selectedCruiseExcursions.reduce((acc, exc) => acc + (exc.price * guests), 0);
    const spaCost = selectedSpaTreatments.reduce((acc, spa) => acc + (spa.price * guests), 0);
    const subtotal = base + taxes + addOns + excursionsCost + spaCost;
    return cruisePayOption === "full" ? Math.round(subtotal * 0.95) : subtotal;
  };

  // Handle booking form submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!guestDetails.name || !guestDetails.email || !guestDetails.phone) {
      toast.error("Please fill in your contact information!");
      return;
    }

    setIsSubmitting(true);

    // Simulate payment transaction validations
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `WT-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketDetails({
        id: ticketId,
        item: selectedItem,
        room: selectedRoom,
        guest: guestDetails,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        total: activeTab === "stays"
          ? selectedRoom.price
          : activeTab === "trains"
            ? getTrainCalculatedTotal()
            : activeTab === "cruises"
              ? (cruisePayOption === "deposit" ? Math.round(getCruiseCalculatedTotal() * 0.2) : getCruiseCalculatedTotal())
              : selectedItem.price
      });
      setView("ticket");
      toast.success("Reservation confirmed successfully!");
    }, 1800);
  };

  // Helper functions for Flight Details Modal
  const getModalFareDetails = () => {
    if (!modalFlightItem) return null;

    const basePrice = modalFlightItem.price;
    const onwardBase = Math.round(basePrice * 0.52);
    const returnBase = Math.round(basePrice * 0.48);

    // Dynamic fares for depart leg
    const departFares = {
      saver: onwardBase - 800,
      flexi: onwardBase + 1200,
      special: onwardBase + 2800
    };

    // Dynamic fares for return leg
    const returnFares = {
      value: returnBase - 1000,
      classic: returnBase + 800,
      flex: returnBase + 2200
    };

    return {
      onwardBase,
      returnBase,
      departFares,
      returnFares
    };
  };

  const getAirportCode = (airportStr, fallback) => {
    if (!airportStr) return fallback;
    const match = airportStr.match(/\(([^)]+)\)/);
    return match ? match[1] : fallback;
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen flex flex-col justify-between font-sans">
      {view === "search" ? (
        <GlobalHeroBanner onChatOpen={() => setShowChatbot(true)} />
      ) : (
        <Navbar />
      )}

      {/* Hero Banner with Search (Only on landing page) */}
      {view === "search" && <Option />}

      {/* Blue Header for Results View */}
      {view === "results" && (
        <div className="bg-[#003b95] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1440px] mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">
              {activeTab === "flights" ? "Find your next flight" :
               activeTab === "cars" ? "Find your perfect rental car" :
               activeTab === "attractions" ? "Find top attractions" :
               activeTab === "holidays" ? "Find your dream holiday" :
               activeTab === "trains" ? "Find your next train ride" :
               activeTab === "cruises" ? "Find your perfect cruise" :
               activeTab === "buses" ? "Find your next bus ride" :
               "Find your next stay"}
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8">
              {activeTab === "flights" ? "Search deals on flights worldwide..." :
               activeTab === "cars" ? "Search deals on car rentals..." :
               activeTab === "attractions" ? "Search deals on tickets and tours..." :
               activeTab === "holidays" ? "Search deals on holiday packages..." :
               activeTab === "trains" ? "Search deals on train tickets..." :
               activeTab === "cruises" ? "Search deals on cruise packages..." :
               activeTab === "buses" ? "Search deals on bus tickets..." :
               "Search deals on hotels, homes, and much more..."}
            </p>
            
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              {[
                { id: "stays", label: "Stays", icon: Building },
                { id: "flights", label: "Flights", icon: Plane },
                { id: "cars", label: "Car rentals", icon: Car },
                { id: "attractions", label: "Attractions", icon: MapPin },
                { id: "holidays", label: "Holidays", icon: Compass },
                { id: "trains", label: "Trains", icon: Train },
                { id: "cruises", label: "Cruises", icon: Ship },
                { id: "buses", label: "Buses", icon: Bus },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setView("search");
                      const targetRoute = tabRouteMap[tab.id] || `/booking?tab=${tab.id}`;
                      navigate(targetRoute);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      isActive
                        ? "border border-white bg-transparent text-white"
                        : "border border-transparent bg-transparent text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Spacer for views that don't have the GlobalHeroBanner or Blue Header */}
      {view !== "search" && view !== "results" && (
        <div className="h-24 w-full"></div>
      )}

      {/* Main Wrapper */}
      <main className="max-w-[1440px] w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 flex-grow">

        {/* ── 1. VIEW: Search Landing Page ── */}
        {view === "search" && (
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">

              {/* ── Tab-specific Landing Sections ── */}
              <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 mt-5 sm:mt-6 lg:mt-8">

                {activeTab === "stays" && (
                  <>
                    <PromoOffers />
                    <TravelSection />
                    <HotelListing />
                    <AiTripPlanner />

                    {/* SECTION: Special Promo Deals Banner */}
                    <div className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-2xl p-5 sm:p-6 lg:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                      <div className="flex-1">
                        <span className="bg-white text-[#003580] font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 inline-block">
                          Limited Offer
                        </span>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
                          Save 15% or more on stays worldwide
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm font-medium mt-2">
                          Plan your dream getaway. Search for deals active until the end of this month.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchDest("Paris");
                          setView("results");
                          setSearchResults(STAYS_DATABASE.filter(s => s.city === "Paris"));
                        }}
                        className="bg-white hover:bg-gray-100 text-[#003580] border border-white/30 font-extrabold text-xs sm:text-sm py-3 px-6 sm:px-8 rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap w-full sm:w-auto text-center"
                      >
                        Find Getaway Deals
                      </button>
                    </div>

                    {/* SECTION: Browse by Property Type */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Browse by property type</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Explore distinct accommodation types for your vacation
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                        {[
                          { name: "Hotels", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop&q=80", count: "12,450 hotels" },
                          { name: "Apartments", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&auto=format&fit=crop&q=80", count: "8,920 apartments" },
                          { name: "Resorts", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&auto=format&fit=crop&q=80", count: "4,190 resorts" },
                          { name: "Villas", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=200&auto=format&fit=crop&q=80", count: "2,350 villas" },
                          { name: "Cabins", img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=200&auto=format&fit=crop&q=80", count: "1,120 cabins" }
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setSearchDest("Delhi");
                              setView("results");
                              setSearchResults(STAYS_DATABASE);
                            }}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer active:scale-[0.98] transition-all duration-200 flex flex-col"
                          >
                            <div className="h-24 sm:h-28 lg:h-32 overflow-hidden">
                              <img src={item.img} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="p-2.5 sm:p-3">
                              <h4 className="font-extrabold text-[11px] sm:text-xs text-gray-800">{item.name}</h4>
                              <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold mt-0.5">{item.count}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SECTION: Popular Stay Themes */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Popular stay themes</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Curated selections matching your favorite vacation style
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { theme: "Beachfront Escapes", desc: "Wake up to ocean waves and pristine sandy shores.", location: "Goa", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80", count: "1,240 Beach properties" },
                          { theme: "Wellness & Spa", desc: "Rejuvenating holistic therapy and tranquil forest retreats.", location: "Varanasi", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&auto=format&fit=crop&q=80", count: "480 Healing retreats" },
                          { theme: "Heritage Palaces", desc: "Experience royal luxury in authentic fortresses and havelis.", location: "Agra", img: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=300&auto=format&fit=crop&q=80", count: "310 Historic hotels" },
                          { theme: "Cabin Retreats", desc: "Cozy snow-capped wooden chalets in high altitude peaks.", location: "Delhi", img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=300&auto=format&fit=crop&q=80", count: "190 Alpine chalets" }
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setSearchDest(item.location);
                              setView("results");
                              setSearchResults(STAYS_DATABASE.filter(s => s.city.toLowerCase() === item.location.toLowerCase().trim()));
                            }}
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group active:scale-[0.98] transition-all duration-200 flex flex-col text-left"
                          >
                            <div className="h-32 overflow-hidden relative">
                              <img src={item.img} alt={item.theme} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                              <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">
                                {item.location}
                              </span>
                            </div>
                            <div className="p-3.5 flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-extrabold text-xs text-gray-850">{item.theme}</h4>
                                <p className="text-[10px] text-gray-400 font-semibold mt-1 leading-relaxed">{item.desc}</p>
                              </div>
                              <span className="text-[9px] text-[#003580] font-black uppercase mt-3 tracking-wider block">
                                {item.count} &rarr;
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Popular Destinations Grid Section */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Trending destinations</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Most popular choices for travelers from India
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                        {[
                          { name: "Paris, France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80", count: "1,200 stays" },
                          { name: "Tokyo, Japan", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80", count: "980 stays" },
                          { name: "New Delhi, India", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=80", count: "2,350 stays" }
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setSearchDest(item.name.split(",")[0]);
                              setView("results");
                              setSearchResults(STAYS_DATABASE.filter(s => s.city.toLowerCase() === item.name.split(",")[0].toLowerCase().trim()));
                            }}
                            className="relative h-[180px] sm:h-[210px] lg:h-[240px] rounded-xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer group active:scale-[0.99] transition-all duration-200"
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                              <h4 className="text-sm sm:text-base font-extrabold tracking-tight drop-shadow-sm">{item.name}</h4>
                              <p className="text-white/80 text-[10px] sm:text-[11px] font-bold mt-0.5">{item.count}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SECTION: Inspiration / Travel Tips articles */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Get inspiration for your next trip</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Read guides and columns compiled by travel authors
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                        {[
                          { id: "paris-cafes", title: "10 Beautiful Historic Cafes in Paris", desc: "Discover historic neighborhood bistros where painters and philosophers gathered.", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80" },
                          { id: "shibuya-crossing", title: "A First-Timer's Guide to Shibuya Crossing", desc: "Experience the electric atmosphere, high-tech shops, and traditional shrines in Tokyo.", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80" }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-0 sm:gap-0">
                            <div className="w-full sm:w-36 lg:w-44 h-40 sm:h-auto shrink-0 overflow-hidden">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="flex flex-col justify-between p-4 sm:p-5 flex-1">
                              <div>
                                <h4 className="font-extrabold text-sm sm:text-sm text-gray-800 leading-snug">{item.title}</h4>
                                <p className="text-gray-500 text-[11px] sm:text-xs font-medium mt-2 leading-relaxed">{item.desc}</p>
                              </div>
                              <span
                                onClick={() => navigate(`/article/${item.id}`)}
                                className="text-[11px] font-extrabold text-[#003580] hover:underline cursor-pointer mt-4 block"
                              >
                                Read Article &rarr;
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Travel info banner */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <div className="flex gap-3 sm:gap-4 items-center text-center sm:text-left flex-col sm:flex-row">
                        <div className="bg-[#003580]/10 p-3 rounded-full text-[#003580] shrink-0">
                          <Award size={22} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm sm:text-base text-gray-800">Secure payments and instant booking</h4>
                          <p className="text-gray-500 text-xs font-semibold mt-0.5 sm:mt-1">Your money is safe and confirmations are guaranteed instantly.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate("/secure-payments")}
                        className="text-xs font-bold text-[#003580] hover:underline cursor-pointer whitespace-nowrap border border-[#003580]/30 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        Learn more
                      </button>
                    </div>
                  </>
                )}

                {activeTab === "flights" && (
                  <>
                    {/* Explore by Country */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Explore by country</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Discover trending destinations, just a flight away
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                        {[
                          { name: "India", dest: "Mumbai", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&auto=format&fit=crop&q=80" },
                          { name: "United Kingdom", dest: "London", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&auto=format&fit=crop&q=80" },
                          { name: "Australia", dest: "Melbourne", img: "https://images.unsplash.com/photo-1524820197278-540916411e20?w=300&auto=format&fit=crop&q=80" },
                          { name: "Anywhere", dest: "Paris", label: "Explore all destinations", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&auto=format&fit=crop&q=80" },
                          { name: "Germany", dest: "Berlin", img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=300&auto=format&fit=crop&q=80" },
                          { name: "United States", dest: "New York", img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&auto=format&fit=crop&q=80" },
                          { name: "United Arab Emirates", dest: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&auto=format&fit=crop&q=80" },
                          { name: "Canada", dest: "Toronto", img: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=300&auto=format&fit=crop&q=80" },
                          { name: "Thailand", dest: "Bangkok", img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=300&auto=format&fit=crop&q=80" },
                          { name: "Italy", dest: "Rome", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300&auto=format&fit=crop&q=80" },
                          { name: "Nepal", dest: "Kathmandu", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&auto=format&fit=crop&q=80" },
                          { name: "Netherlands", dest: "Amsterdam", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&auto=format&fit=crop&q=80" }
                        ].map((c, i) => (
                          <div
                            key={i}
                            onClick={() => triggerInstantSearch("flights", { from: "Delhi", to: c.dest })}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group active:scale-[0.98] transition-all duration-200"
                          >
                            <div className="h-24 sm:h-28 lg:h-32 overflow-hidden relative">
                              <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                            </div>
                            <div className="p-2.5 sm:p-3">
                              <h4 className="font-extrabold text-[11px] sm:text-xs text-gray-800 truncate">{c.name}</h4>
                              <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold mt-0.5">{c.label || "View flights"}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Popular flights near you */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Popular flights near you</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Find deals on domestic and international flights
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {[
                          { from: "New Delhi", to: "London", date: "Jul 6 - Nov 23" },
                          { from: "New Delhi", to: "Kathmandu", date: "Jul 9 - Jul 14" },
                          { from: "New Delhi", to: "Melbourne", date: "Jul 10 - Oct 1" },
                          { from: "New Delhi", to: "Bangkok", date: "Jul 10 - Jul 17" },
                          { from: "New Delhi", to: "Dubai", date: "Jul 7 - Jul 20" },
                          { from: "New Delhi", to: "Toronto", date: "Jul 6 - Jul 15" },
                          { from: "New Delhi", to: "Sydney", date: "Jul 6 - Jul 13" }
                        ].map((route, i) => (
                          <div
                            key={i}
                            onClick={() => triggerInstantSearch("flights", { from: route.from, to: route.to })}
                            className="bg-white border border-gray-200 rounded-xl p-3.5 sm:p-4 hover:border-blue-200 hover:bg-blue-50/30 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.98] transition-all duration-200 flex items-center gap-3"
                          >
                            <div className="p-2 sm:p-2.5 bg-blue-50 text-[#003580] rounded-lg shrink-0">
                              <Plane size={16} />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-[11px] sm:text-xs text-gray-800 truncate">{route.from} → {route.to}</h4>
                              <p className="text-[9px] sm:text-[10px] text-gray-500 font-semibold mt-0.5">{route.date} · Round-trip</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>



                    {/* Benefits / Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      {[
                        { title: "Search a huge selection", text: "Easily compare flights, airlines, and prices – all in one place", icon: Globe },
                        { title: "Pay no hidden fees", text: "Get a clear price breakdown every step of the way", icon: ShieldCheck },
                        { title: "Get more flexibility", text: "Change your travel dates with the Flexible ticket option*", icon: Calendar }
                      ].map((benefit, i) => {
                        const BIcon = benefit.icon;
                        return (
                          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm flex flex-row sm:flex-col gap-3 items-start">
                            <div className="text-[#003580] bg-blue-50 p-2.5 rounded-lg shrink-0">
                              <BIcon size={20} />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-xs sm:text-sm text-gray-800">{benefit.title}</h4>
                              <p className="text-gray-500 text-[11px] leading-relaxed font-medium mt-1">{benefit.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-gray-400 font-semibold -mt-1 px-1">
                      *Flexible plane tickets are available for an additional cost on select airfares
                    </p>

                    {/* SECTION: Popular domestic and international flight routes with mock prices */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Exclusive flight route deals</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Instantly book top routes at guaranteed lowest fares
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { from: "Delhi", to: "Mumbai", price: "3,890", airline: "IndiGo", logo: "✈️", dur: "2h 10m", type: "Non-stop" },
                          { from: "Delhi", to: "Goa", price: "5,450", airline: "Air India", logo: "✈️", dur: "2h 35m", type: "Non-stop" },
                          { from: "Mumbai", to: "Bengaluru", price: "3,120", airline: "Vistara", logo: "✈️", dur: "1h 45m", type: "Non-stop" },
                          { from: "Delhi", to: "London", price: "38,900", airline: "Vistara", logo: "✈️", dur: "9h 15m", type: "1 Stop" }
                        ].map((route, i) => (
                          <div
                            key={i}
                            onClick={() => triggerInstantSearch("flights", { from: route.from, to: route.to })}
                            className="bg-white border border-gray-200 hover:border-blue-205 hover:shadow-md rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-all text-left flex flex-col justify-between min-h-[130px]"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="bg-blue-50 text-[#003580] text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">{route.airline}</span>
                                <h4 className="font-extrabold text-xs text-gray-900 mt-1.5">{route.from} to {route.to}</h4>
                              </div>
                              <span className="text-[18px]">{route.logo}</span>
                            </div>
                            <div className="border-t border-gray-100 mt-3 pt-2.5 flex items-center justify-between">
                              <div>
                                <span className="text-[8px] text-gray-405 font-bold block uppercase">{route.dur} · {route.type}</span>
                                <span className="text-[10px] text-gray-450 font-semibold">One-way from</span>
                              </div>
                              <span className="text-sm font-black text-[#003580]">₹{route.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SECTION: Airline Partners */}
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center mb-4">
                        We compare fares across 400+ airline carriers
                      </h4>
                      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                        {["Air India", "IndiGo", "Vistara", "SpiceJet", "Akasa Air", "Singapore Airlines", "Emirates"].map((brand, i) => (
                          <span key={i} className="text-xs font-black text-gray-550 select-none">
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Top flights from India */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Top flights from India</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Explore destinations you can reach from India and start making new plans
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {[
                          { from: "New Delhi", to: "London" },
                          { from: "New Delhi", to: "Mumbai" },
                          { from: "New Delhi", to: "Bangalore" },
                          { from: "New Delhi", to: "Dubai" },
                          { from: "New Delhi", to: "Hyderabad" },
                          { from: "New Delhi", to: "Chennai" },
                          { from: "New Delhi", to: "Bangkok" },
                          { from: "New Delhi", to: "Kolkata" },
                          { from: "New Delhi", to: "Cochin" }
                        ].map((route, i) => (
                          <div
                            key={i}
                            onClick={() => triggerInstantSearch("flights", { from: route.from, to: route.to })}
                            className="bg-white border border-gray-200 rounded-xl p-3.5 sm:p-4 hover:bg-blue-50/40 hover:border-blue-200 cursor-pointer active:scale-[0.98] flex items-center justify-between text-xs font-bold text-gray-700 transition-all duration-150"
                          >
                            <span className="flex items-center gap-2 text-[11px] sm:text-xs">
                              <Plane size={13} className="text-[#003580] shrink-0" />
                              {route.from} → {route.to}
                            </span>
                            <ChevronRight size={14} className="text-gray-400 shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Accordion FAQ section */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                        <HelpCircle size={20} className="text-[#003580]" /> Frequently asked questions
                      </h3>
                      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden divide-y divide-gray-150">
                        {[
                          { q: "How do I find the cheapest flights on Booking.com?", a: "You can sort flights by price to find the cheapest options. You can also filter by airline, stops, and departure times to fine-tune your search budget." },
                          { q: "Can I book one-way flights on Booking.com?", a: "Yes, you can search and book both one-way and round-trip tickets by selecting the appropriate preference in our search selectors." },
                          { q: "How far in advance can I book a flight?", a: "Typically, airline flights can be booked up to 1 year in advance. We display schedules and live prices for dates matching official airline availability." },
                          { q: "Do flights get cheaper closer to departure?", a: "Generally, last-minute tickets tend to be more expensive as seat availability drops. We recommend booking at least 4-6 weeks in advance for hot deals." },
                          { q: "What is a flexible ticket?", a: "A flexible ticket allows you to change your flight dates without paying airline change fees, providing supreme peace of mind in case your travel plans shift." },
                          { q: "Does Booking.com charge credit card fees?", a: "No, Booking.com does not charge any hidden reservation or credit card processing fees. The price you see on checkouts is final." }
                        ].map((faq, idx) => {
                          const isOpen = activeFaq === `flight-faq-${idx}`;
                          return (
                            <div key={idx} className="transition-colors">
                              <button
                                type="button"
                                onClick={() => setActiveFaq(isOpen ? null : `flight-faq-${idx}`)}
                                className="w-full text-left py-4 px-5 font-bold text-xs sm:text-sm text-gray-800 hover:bg-gray-50 flex items-center justify-between border-none bg-transparent cursor-pointer"
                              >
                                <span>{faq.q}</span>
                                {isOpen ? <ChevronUp size={16} className="text-[#003580]" /> : <ChevronDown size={16} className="text-gray-400" />}
                              </button>
                              {isOpen && (
                                <div className="py-4 px-5 text-xs sm:text-sm text-gray-500 bg-gray-50/50 leading-relaxed font-semibold">
                                  {faq.a}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "cars" && (
                  <>
                    {/* Three feature grids */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      {[
                        { title: "We're here for you", text: "Customer support in over 30 languages", icon: MessageSquare },
                        { title: "Free cancellation", text: "Up to 48 hours before pick-up for most bookings", icon: Clock },
                        { title: "5 million+ reviews", text: "By real, verified customers", icon: ThumbsUp }
                      ].map((card, i) => {
                        const CIcon = card.icon;
                        return (
                          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm flex flex-row sm:flex-col gap-3 items-start">
                            <div className="text-green-600 bg-green-50 p-2.5 rounded-lg shrink-0">
                              <CIcon size={20} />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-xs sm:text-sm text-gray-800">{card.title}</h4>
                              <p className="text-gray-500 text-[11px] leading-relaxed font-medium mt-1">{card.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* SECTION: Browse by Vehicle Class */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Browse vehicles by category</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Find the ideal vehicle size and type for your self-drive road trip
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { category: "Economy Hatchbacks", label: "Hyundai i20, Maruti Swift or similar", seats: "5 Seats", bags: "2 Bags", price: "2,100", img: "🚗" },
                          { category: "Executive Sedans", label: "Honda City, Skoda Slavia or similar", seats: "5 Seats", bags: "3 Bags", price: "3,200", img: "🚙" },
                          { category: "Family SUVs", label: "Mahindra XUV700, Toyota Innova or similar", seats: "7 Seats", bags: "4 Bags", price: "4,500", img: "🚐" },
                          { category: "Luxury Sports", label: "Audi A6, BMW 3-Series or similar", seats: "5 Seats", bags: "3 Bags", price: "8,900", img: "🏎️" }
                        ].map((car, idx) => (
                          <div
                            key={idx}
                            onClick={() => triggerInstantSearch("cars", { pickUp: "Delhi" })}
                            className="bg-white border border-gray-200 rounded-2xl p-4 text-left shadow-sm hover:border-green-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
                          >
                            <div>
                              <div className="flex justify-between items-start">
                                <h4 className="font-extrabold text-xs text-gray-900 leading-snug">{car.category}</h4>
                                <span className="text-xl">{car.img}</span>
                              </div>
                              <p className="text-[10px] text-gray-400 font-semibold mt-1">{car.label}</p>
                              <div className="flex gap-2.5 mt-2.5">
                                <span className="bg-gray-50 border border-gray-150 px-2 py-0.5 rounded text-[8px] text-gray-500 font-black">{car.seats}</span>
                                <span className="bg-gray-50 border border-gray-150 px-2 py-0.5 rounded text-[8px] text-gray-500 font-black">{car.bags}</span>
                              </div>
                            </div>
                            <div className="border-t border-gray-100 mt-4 pt-2.5 flex justify-between items-center">
                              <span className="text-[9px] text-gray-400 font-bold uppercase">Daily Rent</span>
                              <span className="text-xs font-black text-gray-900">From ₹{car.price}/day</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Popular car rental destinations */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Popular car rental destinations</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Explore more options to rent a car for cheap
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                        {[
                          { city: "El Segundo", count: 103, price: 5877.42 },
                          { city: "Dania Beach", count: 92, price: 4426.21 },
                          { city: "Coolangatta", count: 22, price: 5083.37 },
                          { city: "Phoenix", count: 78, price: 6194.36 },
                          { city: "Jamaica", count: 79, price: 7656.04 },
                          { city: "Irving", count: 81, price: 5821.78 },
                          { city: "Madrid", count: 108, price: 4675.51 },
                          { city: "Calgary", count: 46, price: 6187.96 },
                          { city: "San Diego", count: 87, price: 5281.28 }
                        ].slice(0, showAllCarDestinations ? 9 : 9).map((dest, i) => (
                          <div
                            key={i}
                            onClick={() => triggerInstantSearch("cars", { pickUp: dest.city })}
                            className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-green-200 hover:shadow-md cursor-pointer active:scale-[0.98] transition-all duration-150 flex flex-col justify-between min-h-[100px]"
                          >
                            <div>
                              <h4 className="font-extrabold text-[11px] sm:text-xs lg:text-sm text-gray-800">Cheap car rental in {dest.city}</h4>
                              <p className="text-[10px] text-gray-400 font-semibold mt-1">{dest.city} · {dest.count} locations</p>
                            </div>
                            <div className="border-t border-gray-100 mt-3 pt-2.5 flex items-center justify-between gap-2">
                              <span className="text-[10px] text-gray-400 font-semibold">From avg.</span>
                              <span className="text-xs font-black text-gray-900">₹{dest.price.toLocaleString("en-IN", { minimumFractionDigits: 0 })}/day</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-center mt-5 sm:mt-6">
                        <button
                          type="button"
                          onClick={() => setShowAllCarDestinations(!showAllCarDestinations)}
                          className="border border-[#003580] hover:bg-blue-50 text-[#003580] text-xs font-extrabold py-2.5 px-8 rounded-xl cursor-pointer transition-colors"
                        >
                          {showAllCarDestinations ? "Show less" : "Show more"}
                        </button>
                      </div>
                    </div>

                    {/* FAQ section */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                        <HelpCircle size={20} className="text-[#003580]" /> Frequently asked questions
                      </h3>
                      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden divide-y divide-gray-150">
                        {[
                          { q: "Why should I book a car rental in India with Booking.com?", a: "Booking.com partners with top international and local car rental companies to provide flexible pick-up counters, unlimited mileage choices, and competitive transparent pricing with zero hidden fees." },
                          { q: "What do I need to rent a car?", a: "To book your car, all you need is a valid credit card, a valid driver's license (and an international driving permit if renting overseas), and a booking print confirmation." },
                          { q: "Am I old enough to rent a car?", a: "In most regions, the minimum renting age is 21 years old. However, some companies charge a Young Driver fee for drivers under 25." },
                          { q: "Can I book a rental car for someone else?", a: "Yes, you can book a rental car for someone else. Just fill in their driver details during checkout, and ensure they have a credit card under their name at pickup." },
                          { q: "Any tips for picking the right car?", a: "Consider passenger counts, bags capacity, and terrain. Economy cars are perfect for city streets, while SUVs offer great comfort for highway road-trips." },
                          { q: "Are all fees included in the rental price?", a: "Yes, we specify transparent final charges including taxes, airport pick-up surcharges, and basic insurance. Optional features like GPS or child seats can be added separately." }
                        ].map((faq, idx) => {
                          const isOpen = activeFaq === `car-faq-${idx}`;
                          return (
                            <div key={idx} className="transition-colors">
                              <button
                                type="button"
                                onClick={() => setActiveFaq(isOpen ? null : `car-faq-${idx}`)}
                                className="w-full text-left py-4 px-5 font-bold text-xs sm:text-sm text-gray-800 hover:bg-gray-50 flex items-center justify-between border-none bg-transparent cursor-pointer"
                              >
                                <span>{faq.q}</span>
                                {isOpen ? <ChevronUp size={16} className="text-[#003580]" /> : <ChevronDown size={16} className="text-gray-400" />}
                              </button>
                              {isOpen && (
                                <div className="py-4.5 px-5 text-xs sm:text-sm text-gray-500 bg-gray-50/50 leading-relaxed font-semibold">
                                  {faq.a}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "attractions" && (
                  <>
                    {/* Discover new attractions banner description */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl px-5 py-4 sm:px-6 sm:py-5 shadow-sm">
                      <p className="text-xs sm:text-sm text-gray-700 font-extrabold text-center">
                        Discover new attractions and experiences to match your interests and travel style
                      </p>
                    </div>

                    {/* SECTION: Browse by Activity Category */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Browse by category</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Filter activities and experiences by your specific travel interests
                      </p>
                      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none flex-wrap sm:flex-nowrap">
                        {[
                          { name: "Day Tours", icon: "🗺️", color: "bg-blue-50 text-blue-700 border-blue-100" },
                          { name: "Museums & History", icon: "🏛️", color: "bg-teal-50 text-teal-700 border-teal-100" },
                          { name: "Theme Parks & Rides", icon: "🎡", color: "bg-purple-50 text-purple-700 border-purple-100" },
                          { name: "Outdoor & Adventure", icon: "⛰️", color: "bg-orange-50 text-orange-700 border-orange-100" },
                          { name: "Food & Wine Tours", icon: "🍷", color: "bg-red-50 text-red-700 border-red-100" },
                          { name: "Water & Cruises", icon: "⛵", color: "bg-indigo-50 text-indigo-700 border-indigo-100" }
                        ].map((cat, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setSearchDest("Delhi");
                              setView("results");
                              setSearchResults(ATTRACTIONS_DATABASE);
                            }}
                            className={`border px-4 py-2.5 rounded-full cursor-pointer hover:shadow-sm font-extrabold text-xs flex items-center gap-2 transition-all whitespace-nowrap active:scale-95 ${cat.color}`}
                          >
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Nearby destinations */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Nearby destinations</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Top attractions, historic monuments, and guided activities close to you
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                        {[
                          { city: "Agra", count: 708, img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=250&auto=format&fit=crop&q=80" },
                          { city: "Varanasi", count: 424, img: "https://images.unsplash.com/photo-1699630923504-9a24dbaab37c?w=600&auto=format&fit=crop&q=80" },
                          { city: "Old Goa", count: 180, img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=250&auto=format&fit=crop&q=80" },
                          { city: "Thanjavur", count: 27, img: "https://plus.unsplash.com/premium_photo-1697729536647-4e23a32dd324?w=600&auto=format&fit=crop&q=80" },
                          { city: "Kolkata", count: 138, img: "https://images.unsplash.com/photo-1558431382-27e303142255?w=250&auto=format&fit=crop&q=80" }
                        ].map((dest, i) => (
                          <div
                            key={i}
                            onClick={() => triggerInstantSearch("attractions", { dest: dest.city })}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group active:scale-[0.98] transition-all duration-200"
                          >
                            <div className="h-24 sm:h-28 lg:h-32 overflow-hidden relative">
                              <img src={dest.img} alt={dest.city} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="p-2.5 sm:p-3">
                              <h4 className="font-extrabold text-[11px] sm:text-xs text-gray-800">{dest.city}</h4>
                              <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold mt-0.5">{dest.count} things to do</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>



                    {/* We've got you covered points grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      {[
                        { title: "We've got you covered", desc: "Explore top attractions. Experience the best of your destination with attractions, tours, activities, and more", icon: Compass },
                        { title: "Fast and flexible", desc: "Book tickets online in minutes, with free cancellation on many attractions", icon: Clock },
                        { title: "Support when you need it", desc: "Booking.com's global Customer Service team is here to help 24/7", icon: Award }
                      ].map((item, i) => {
                        const IconComp = item.icon;
                        return (
                          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm flex flex-row sm:flex-col gap-3 items-start">
                            <div className="text-blue-700 bg-blue-50 p-2.5 rounded-lg shrink-0">
                              <IconComp size={20} />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-xs sm:text-sm text-gray-800">{item.title}</h4>
                              <p className="text-gray-500 text-[11px] leading-relaxed font-medium mt-1">{item.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* SECTION: Trending Experiences this Week */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Trending experiences this week</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Highly-rated and handpicked adventures booked by hundreds of travelers daily
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { name: "Rome Colosseum Priority Access", city: "Rome", rating: 4.8, reviews: 11200, price: 2400, img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&auto=format&fit=crop&q=80" },
                          { name: "Singapore Gardens by the Bay Entry", city: "Singapore", rating: 4.8, reviews: 5120, price: 1950, img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=300&auto=format&fit=crop&q=80" },
                          { name: "Dubai Premium Desert Safari", city: "Dubai", rating: 4.9, reviews: 12400, price: 2600, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&auto=format&fit=crop&q=80" },
                          { name: "Uluwatu Sunset Temple Tour Bali", city: "Bali", rating: 4.7, reviews: 3100, price: 1600, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&auto=format&fit=crop&q=80" }
                        ].map((exp, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setSearchDest(exp.city);
                              setView("results");
                              setSearchResults(ATTRACTIONS_DATABASE.filter(a => a.city.toLowerCase() === exp.city.toLowerCase().trim()));
                            }}
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group active:scale-[0.98] transition-all duration-200 flex flex-col text-left"
                          >
                            <div className="h-36 overflow-hidden relative">
                              <img src={exp.img} alt={exp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                              <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">
                                {exp.city}
                              </span>
                            </div>
                            <div className="p-3.5 flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-extrabold text-xs text-gray-850 leading-snug">{exp.name}</h4>
                                <div className="flex items-center gap-1.5 mt-1.5">
                                  <span className="text-[10px] text-yellow-500 font-extrabold">★ {exp.rating}</span>
                                  <span className="text-[9px] text-gray-400 font-semibold">({exp.reviews.toLocaleString()} reviews)</span>
                                </div>
                              </div>
                              <div className="border-t border-gray-100 mt-4 pt-2.5 flex justify-between items-center">
                                <span className="text-[9px] text-gray-400 font-bold uppercase">Price from</span>
                                <span className="text-xs font-black text-[#003580]">₹{exp.price.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Explore more destinations */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Explore more destinations</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Find things to do in cities around the world
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
                        {[
                          { name: "London", count: 4165 }, { name: "Istanbul", count: 2517 }, { name: "Paris", count: 3751 }, { name: "Hamburg", count: 371 },
                          { name: "Amsterdam", count: 2233 }, { name: "Lisbon", count: 3627 }, { name: "Rome", count: 6272 }, { name: "Athens", count: 3258 },
                          { name: "Berlin", count: 868 }, { name: "Barcelona", count: 2493 }, { name: "Venice", count: 1749 }, { name: "Málaga", count: 990 },
                          { name: "Vienna", count: 991 }, { name: "Porto", count: 1222 }, { name: "Stockholm", count: 495 }, { name: "Monte Carlo", count: 1091 },
                          { name: "Madrid", count: 1490 }, { name: "Armação de Pêra", count: 1259 }, { name: "Seville", count: 816 }, { name: "Kraków", count: 975 },
                          { name: "Naples", count: 5076 }, { name: "Córdoba", count: 303 }, { name: "Milan", count: 1656 }, { name: "Faro", count: 815 },
                          { name: "Liverpool", count: 613 }, { name: "Turin", count: 300 }, { name: "Munich", count: 650 }, { name: "Florence", count: 2796 }
                        ].map((cityObj, i) => (
                          <div
                            key={i}
                            onClick={() => triggerInstantSearch("attractions", { dest: cityObj.name })}
                            className="bg-white border border-gray-200 rounded-xl p-2.5 sm:p-3 hover:bg-blue-50/40 hover:border-blue-200 cursor-pointer active:scale-[0.97] flex flex-col justify-between text-left transition-all duration-150"
                          >
                            <span className="text-[11px] sm:text-xs font-extrabold text-gray-800 block truncate">{cityObj.name}</span>
                            <span className="text-[9px] sm:text-[10px] text-gray-400 font-semibold block mt-1">{cityObj.count.toLocaleString()} to do</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "holidays" && (
                  <>
                    {/* Holidays Promo Banner */}
                    <div className="bg-gradient-to-r from-teal-800 to-emerald-950 rounded-2xl p-5 sm:p-6 lg:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                      <div className="flex-1">
                        <span className="bg-white text-teal-800 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 inline-block">
                          Season Deals
                        </span>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
                          Unforgettable Escape Tour Packages
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm font-medium mt-2">
                          Get up to 35% off on customized domestic & international tour packages. Check out our curated packages.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setHolidayGoingTo("");
                          setHolidayActiveTheme("all");
                          setSearchResults(HOLIDAYS_DATABASE);
                          setView("results");
                        }}
                        className="bg-white hover:bg-gray-100 text-teal-800 border border-white/30 font-extrabold text-xs sm:text-sm py-3 px-6 sm:px-8 rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap w-full sm:w-auto text-center animate-pulse"
                      >
                        Explore Packages
                      </button>
                    </div>

                    {/* Browse by Holiday Themes */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Browse packages by theme</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Find vacation packages customized for your travel style
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                        {[
                          { name: "Hills", label: "Mountain Escapes", img: "https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?w=600&auto=format&fit=crop&q=100" },
                          { name: "Honeymoon", label: "Romantic Getaways", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=250&auto=format&fit=crop&q=80" },
                          { name: "Beach", label: "Sunny Beaches", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=250&auto=format&fit=crop&q=80" },
                          { name: "Family", label: "Family Holidays", img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=250&auto=format&fit=crop&q=80" },
                          { name: "Adventure", label: "Adventure Tours", img: "https://images.unsplash.com/photo-1544085311-11a028465b03?w=250&auto=format&fit=crop&q=80" }
                        ].map((themeObj, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setHolidayActiveTheme(themeObj.name);
                              setSearchResults(HOLIDAYS_DATABASE.filter(pkg => pkg.theme === themeObj.name));
                              setView("results");
                            }}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group active:scale-[0.98] transition-all duration-200"
                          >
                            <div className="h-24 sm:h-28 lg:h-32 overflow-hidden relative">
                              <img src={themeObj.img} alt={themeObj.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="p-2.5 sm:p-3">
                              <h4 className="font-extrabold text-[11px] sm:text-xs text-gray-800">{themeObj.label}</h4>
                              <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold mt-0.5">Explore tours</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trending Holiday Collections */}
                    <div className="mt-8 border-t border-gray-100 pt-8">
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Trending holiday collections</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        Explore our top handpicked domestic and international holiday plans
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                          { id: "hld1", name: "Best of Kashmir Valley", days: "5 Nights / 6 Days", price: 24999, img: "https://images.unsplash.com/photo-1627894485200-b92fb4353967?w=600&auto=format&fit=crop&q=100", label: "Mountain Paradise", isDomestic: true },
                          { id: "hld4", name: "Classic Kerala Escapes", days: "5 Nights / 6 Days", price: 19999, img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=400&auto=format&fit=crop&q=80", label: "Backwaters & Hills", isDomestic: true },
                          { id: "hld2", name: "Maldives Exotic Getaway", days: "4 Nights / 5 Days", price: 49999, img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80", label: "Luxury Overwater Villas", isDomestic: false },
                          { id: "hld6", name: "Dubai Desert & Skyline Tour", days: "4 Nights / 5 Days", price: 39999, img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&auto=format&fit=crop&q=80", label: "Adventure & Shopping", isDomestic: false }
                        ].map((col, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              const found = HOLIDAYS_DATABASE.find(h => h.id === col.id);
                              if (found) {
                                handleSelectItem(found);
                              }
                            }}
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group active:scale-[0.98] transition-all duration-200 flex flex-col justify-between"
                          >
                            <div className="h-36 sm:h-40 overflow-hidden relative">
                              <img src={col.img} alt={col.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                              <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                                {col.days}
                              </div>
                              <span className="absolute bottom-2.5 right-2.5 bg-[#003580] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                                {col.label}
                              </span>
                            </div>
                            <div className="p-3 text-left">
                              <h4 className="font-extrabold text-xs sm:text-sm text-gray-800 truncate group-hover:text-[#003580] transition-colors">{col.name}</h4>
                              <div className="mt-2.5 flex items-center justify-between border-t border-gray-100 pt-2">
                                <div>
                                  <span className="text-[9px] text-gray-400 font-semibold block leading-none">Starting from</span>
                                  <span className="text-xs sm:text-sm font-black text-gray-900 mt-0.5 block">₹{col.price.toLocaleString()}</span>
                                </div>
                                <span className="text-[10px] text-[#003580] font-black group-hover:translate-x-0.5 transition-transform">Book Now &rarr;</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Why Book Holidays Section */}
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 lg:p-8 text-center mt-8">
                      <h3 className="text-base sm:text-lg font-black text-gray-800 uppercase tracking-wider mb-2">Why Book Holidays with Walkawaytrip?</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-6">
                        We curate custom, handpicked vacations matching the highest standards of safety, convenience, and luxury.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { title: "Customisable Packages", text: "Modify hotels, flight options, private sightseeing transfers, and add tours to fit your style.", icon: "🎨", color: "bg-blue-50 text-blue-700" },
                          { title: "Premium Curated Hotels", text: "Stays only at highly-rated partner hotels, personally verified for sanitation, safety, and amenities.", icon: "🏨", color: "bg-emerald-50 text-emerald-700" },
                          { title: "Private Airport Transfers", text: "A dedicated private car and driver assigned for airport pickup, drop-off, and local touring.", icon: "🚗", color: "bg-amber-50 text-amber-700" },
                          { title: "24/7 Expert Travel Helpline", text: "Our support agents stay with you from departure to safe arrival back home.", icon: "📞", color: "bg-purple-50 text-purple-700" }
                        ].map((card, i) => (
                          <div key={i} className="bg-white border border-gray-150 rounded-xl p-4.5 text-left shadow-sm flex flex-col gap-2">
                            <div className={`w-8 h-8 rounded-lg ${card.color} flex items-center justify-center font-bold text-lg shrink-0`}>
                              {card.icon}
                            </div>
                            <h4 className="font-extrabold text-xs text-gray-800 mt-1">{card.title}</h4>
                            <p className="text-gray-500 text-[10.5px] leading-relaxed font-semibold">{card.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Holidays Frequently Asked Questions */}
                    <div className="text-left mt-8 border-t border-gray-100 pt-8">
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Holiday package booking FAQs</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-5">
                        Clear up any lingering doubts with our simple holiday guides
                      </p>

                      <div className="flex flex-col gap-2.5">
                        {[
                          { q: "How do I book a holiday package on Walkawaytrip?", a: "Simply navigate to the Holidays tab, enter your departure city, destination, travel month, and click search. Choose from our handpicked tour plans, view details, customize your stay/flight tiers, and secure-checkout in minutes!" },
                          { q: "Can I customize the hotels, flights, and activities?", a: "Yes! On the package details view, you will find an interactive customization widget. You can upgrade to Deluxe (4-Star) or Luxury (5-Star) hotels, choose Direct Flights or Business Class, and add optional private transfers. The price dynamically updates." },
                          { q: "Are flights included in the vacation packages?", a: "Flight inclusions depend on the package theme. International packages like Maldives and Dubai include return flight booking estimates in the base rate. Domestic packages can include flight add-ons upon customizing." },
                          { q: "What happens if I need to cancel my holiday booking?", a: "Bookings are refundable up to 15 days before your scheduled departure date, subject to airlines and partner hotel cancellation penalties. Specific details will be shared in your confirmation email." }
                        ].map((faq, idx) => {
                          const isFaqOpen = activeFaqIndex === idx;
                          return (
                            <div key={idx} className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-all duration-150">
                              <button
                                type="button"
                                onClick={() => setActiveFaqIndex(isFaqOpen ? null : idx)}
                                className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-gray-800 hover:text-[#003580] cursor-pointer bg-transparent border-none"
                              >
                                <span>{faq.q}</span>
                                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isFaqOpen ? 'rotate-180 text-[#003580]' : ''}`} />
                              </button>
                              {isFaqOpen && (
                                <div className="px-5 pb-4 pt-1 text-xs text-gray-500 font-semibold leading-relaxed border-t border-gray-50">
                                  {faq.a}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "buses" && (
                  <>
                    {/* --- Know Your Bus Types --- */}
                    <section className="bg-white py-12 md:py-16 border border-gray-100 rounded-3xl mb-8">
                      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                          <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-[#0a2351] tracking-tight mb-3">
                            Know Your Bus Types
                          </h2>
                          <p className="text-gray-500 font-medium">Choose the perfect comfort level for your journey</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
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

                          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group">
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

                          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-orange-900/5 transition-all group">
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

                          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-purple-900/5 transition-all group">
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
                    <section className="bg-white rounded-3xl py-12 border border-gray-100 mb-8">
                      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                          <div>
                            <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-[#0a2351] tracking-tight mb-2">
                              Trusted Partners
                            </h2>
                            <p className="text-gray-500 font-medium">Over 3,000+ top-rated bus operators across India</p>
                          </div>
                          <button className="text-blue-600 font-bold flex items-center gap-1 hover:text-blue-800 transition-colors bg-transparent border-none cursor-pointer">
                            View All Operators <ChevronRight size={18} />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                          {['VRL Travels', 'SRS Travels', 'Kallada', 'Orange Tours', 'Neeta Bus', 'IntrCity'].map((operator, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
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

                    {/* --- Top Routes Banner --- */}
                    <section className="max-w-[1200px] mx-auto mb-8">
                      <div className="bg-[#0a2351] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-center relative shadow-xl">
                        <div className="md:w-1/2 p-10 lg:p-14 relative z-10">
                          <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-500/30">Trending Now</span>
                          <h2 className="text-3xl lg:text-4xl font-[Unbounded] font-extrabold text-white mt-6 mb-4 leading-tight">
                            Explore the <br/> Top Bus Routes.
                          </h2>
                          <p className="text-blue-200 mb-8 font-medium leading-relaxed">
                            From bustling metropolitan cities to serene hill stations, travel across India in unparalleled comfort. Book your tickets now and get up to 20% off on your first ride.
                          </p>
                          <button className="bg-white text-[#0a2351] font-extrabold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-100 transition-colors border-none cursor-pointer">
                            View All Routes <ChevronRight size={18} />
                          </button>
                        </div>
                        
                        <div className="md:w-1/2 h-64 md:h-full w-full relative">
                          <img src={img2} alt="Travel Destination" className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-[#0a2351]"></div>
                        </div>
                      </div>
                    </section>

                    {/* --- Smart Boarding Tips --- */}
                    <section className="max-w-[1200px] mx-auto mb-8">
                      <div className="bg-[#0a2351] rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
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
                    <section className="max-w-[800px] mx-auto py-12 mb-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                      <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-[#0a2351] tracking-tight mb-2">
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
                          <BusFAQItem 
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openFAQ === index}
                            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                          />
                        ))}
                      </div>
                    </section>
                  </>
                )}

                {activeTab === "trains" && (
                  <>
                    <RailwayServices />
                    {/* Eurail banner */}
                    <div className="bg-gradient-to-r from-blue-900 to-sky-950 rounded-2xl p-5 sm:p-6 lg:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 text-left">
                      <div className="flex-grow">
                        <span className="bg-white text-blue-900 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 inline-block">
                          Thomas Cook Eurail Partner
                        </span>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
                          Explore Europe with Eurail Passes
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm font-medium mt-2">
                          Get unlimited train journeys across 33 European countries. Calculate rates and book your standard or flexi pass here instantly.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setTrainSubTab("eurail");
                          window.scrollTo({ top: 150, behavior: "smooth" });
                        }}
                        className="bg-white hover:bg-gray-100 text-blue-950 font-extrabold text-xs sm:text-sm py-3 px-6 sm:px-8 rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap w-full sm:w-auto text-center border-none"
                      >
                        Calculate Pass Price
                      </button>
                    </div>

                    {/* Goibibo Train Classes Guide */}
                    {trainSubTab === "booking" && (
                      <div className="text-left space-y-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Browse Indian Train Classes & Facilities</h3>
                          <p className="text-gray-500 text-xs sm:text-sm font-medium">
                            Explore comfort levels and amenities included in different classes
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {[
                            { name: "AC First Class (1A)", text: "Private lockable compartments, personal cabin assistant, premium catering and bedding included.", icon: "👑", color: "bg-amber-50 text-amber-700" },
                            { name: "AC 2 Tier (2A)", text: "Spacious open curtain cabins, reading lights, fresh pillows, bedsheets, and air conditioning.", icon: "✨", color: "bg-blue-50 text-blue-700" },
                            { name: "AC 3 Tier (3A)", text: "Economic family traveler choice, 3-tier berths, air-conditioned, bedrolls provided.", icon: "👥", color: "bg-sky-50 text-sky-700" },
                            { name: "Sleeper Class (SL)", text: "Open non-AC window berths, classic local breeze travel, extremely budget-friendly.", icon: "🍃", color: "bg-emerald-50 text-emerald-700" }
                          ].map((cls, idx) => (
                            <div key={idx} className="bg-white border border-gray-150 rounded-xl p-4.5 shadow-sm flex flex-col gap-2">
                              <span className="text-2xl block">{cls.icon}</span>
                              <h4 className="font-extrabold text-xs text-gray-850 mt-1">{cls.name}</h4>
                              <p className="text-gray-500 text-[10px] leading-relaxed font-semibold">{cls.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Routes */}
                    <div className="text-left space-y-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Popular Indian Railways Routes</h3>
                        <p className="text-gray-500 text-xs sm:text-sm font-medium">
                          Click on any route below to prefill and view train schedules instantly
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { from: "Delhi", to: "Mumbai", label: "Delhi ⇄ Mumbai" },
                          { from: "Delhi", to: "Agra", label: "Delhi ⇄ Agra" },
                          { from: "Bangalore", to: "Chennai", label: "Bangalore ⇄ Chennai" },
                          { from: "Mumbai", to: "Goa", label: "Mumbai ⇄ Goa" }
                        ].map((route, rIdx) => (
                          <div
                            key={rIdx}
                            onClick={() => {
                              setTrainFrom(route.from);
                              setTrainTo(route.to);
                              setTrainSubTab("booking");
                              const filtered = TRAINS_DATABASE.filter(t =>
                                t.from.toLowerCase().includes(route.from.toLowerCase()) &&
                                t.to.toLowerCase().includes(route.to.toLowerCase())
                              );
                              setSearchResults(filtered.length > 0 ? filtered : [
                                { id: "t-dyn-1", name: `${route.to} Superfast Express (12901)`, from: route.from, to: route.to, depart: "18:00", arrive: "09:30", duration: "15h 30m", price: 1850, class: "AC 3 Tier" }
                              ]);
                              setView("results");
                            }}
                            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer hover:border-[#003580]/30 transition group text-center"
                          >
                            <span className="text-lg mb-1 block">🚅</span>
                            <h4 className="font-extrabold text-xs text-gray-800 group-hover:text-[#003580] transition">{route.label}</h4>
                            <p className="text-[10px] text-gray-400 font-bold mt-1">Search Trains &rarr;</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                      {[
                        { title: "IRCTC Authorized Partner", desc: "Official ticket partner offering secure and direct connections with IRCTC booking systems.", icon: "✅", color: "bg-emerald-50 text-emerald-700" },
                        { title: "Zero Payment Gateway Fees", desc: "Save extra on ticket booking. Pay via UPI for completely free transaction processing fees.", icon: "💳", color: "bg-blue-50 text-blue-700" },
                        { title: "Instant Wallet Refunds", desc: "Get refund credits directly deposited into your travel wallet on cancellation within minutes.", icon: "⚡", color: "bg-amber-50 text-amber-700" },
                        { title: "24/7 Expert Rail Support", desc: "Access dedicated customer support assistance for tatkal queues, coach allocations, and refunds.", icon: "📞", color: "bg-purple-50 text-purple-700" }
                      ].map((card, cIdx) => (
                        <div key={cIdx} className="bg-white border border-gray-150 rounded-xl p-4.5 shadow-sm flex flex-col gap-2">
                          <div className={`w-8 h-8 rounded-lg ${card.color} flex items-center justify-center font-bold text-lg shrink-0`}>
                            {card.icon}
                          </div>
                          <h4 className="font-extrabold text-xs text-gray-800 mt-1">{card.title}</h4>
                          <p className="text-gray-550 text-[10px] leading-relaxed font-semibold">{card.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Train FAQS */}
                    <div className="text-left mt-4">
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Railway booking guidelines & FAQs</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-5">
                        Find fast answers about live spotting, PNR confirmation and Eurail passes
                      </p>

                      <div className="flex flex-col gap-2.5">
                        {[
                          { q: "How do I check my train running status?", a: "Go to the trains tab, select the 'Spot Your Train' sub-tab, type in the 5-digit train number (e.g. 12952), and click Search to retrieve its live timeline track." },
                          { q: "What does PNR confirmation status represent?", a: "PNR (Passenger Name Record) contains details of passengers booked under a single ticket. Checking it tells you if the berth is Confirmed, RAC (Reservation Against Cancellation), or WL (Waitlisted)." },
                          { q: "What is a Eurail pass and how does it work?", a: "A Eurail pass is a single ticket that grants you unlimited train journeys across Europe's national networks. You can select single country passes (e.g., Italy, Switzerland) or a Global Pass covering 33 countries." },
                          { q: "Are meal orders included in the booking fees?", a: "By default, Rajdhani/Shatabdi train ticket bookings include standard catering fees. For other trains, you can check optional food delivery add-ons during ticket confirmation steps." }
                        ].map((faq, idx) => {
                          const isFaqOpen = activeFaqIndex === (idx + 10);
                          return (
                            <div key={idx} className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-all duration-150">
                              <button
                                type="button"
                                onClick={() => setActiveFaqIndex(isFaqOpen ? null : (idx + 10))}
                                className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-gray-800 hover:text-[#003580] cursor-pointer bg-transparent border-none"
                              >
                                <span>{faq.q}</span>
                                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isFaqOpen ? 'rotate-180 text-[#003580]' : ''}`} />
                              </button>
                              {isFaqOpen && (
                                <div className="px-5 pb-4 pt-1 text-xs text-gray-500 font-semibold leading-relaxed border-t border-gray-50">
                                  {faq.a}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "cruises" && (
                  <>
                    {/* CruiseDirect Partner banner */}
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-2xl p-5 sm:p-6 lg:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 text-left">
                      <div className="flex-grow">
                        <span className="bg-white text-indigo-950 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 inline-block">
                          Best Price Match Guarantee
                        </span>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
                          Sail More, Pay Less with CruiseDirect Partner Benefits
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm font-medium mt-2">
                          Save up to ₹40,000 on ocean voyages, enjoy 20% flexible deposits, and get 100% price adjustments if fares drop before sailing.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const filtered = CRUISES_DATABASE.filter(c => c.line === "Royal Caribbean");
                          setSearchResults(filtered);
                          setView("results");
                        }}
                        className="bg-white hover:bg-gray-100 text-indigo-950 font-extrabold text-xs sm:text-sm py-3 px-6 sm:px-8 rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap w-full sm:w-auto text-center border-none"
                      >
                        Explore Partner Deals
                      </button>
                    </div>

                    {/* Featured Voyages Grid */}
                    <div className="text-left space-y-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Featured Ocean & River Voyages</h3>
                        <p className="text-gray-500 text-xs sm:text-sm font-medium">
                          Select a destination card below to explore sailing details and stateroom categories instantly
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          { id: "cr-4", name: "Halong Bay Wellness Voyage", ship: "Hera Grand Luxury", line: "Hera Cruises", price: "₹38,999", img: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&auto=format&fit=crop&q=80", tag: "Wellness Boutique" },
                          { id: "cr-1", name: "Western Caribbean & CocoCay", ship: "Icon of the Seas", line: "Royal Caribbean", price: "₹84,999", img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400&auto=format&fit=crop&q=80", tag: "Family Friendly" },
                          { id: "cr-5", name: "Spain, France & Italy Voyage", ship: "Symphony of the Seas", line: "Royal Caribbean", price: "₹92,999", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&auto=format&fit=crop&q=80", tag: "Mediterranean Dream" }
                        ].map((voyage, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              const match = CRUISES_DATABASE.find(c => c.id === voyage.id);
                              if (match) {
                                setCruiseDest(match.destinationsList[0]);
                                setCruiseShipFilter(match.ship);
                                setCruiseNights(match.nights);
                                setGuestsCount({ adults: 2, children: 0 });
                                setSelectedRoom(match.rooms[0]);
                                setSelectedCruiseExcursions([]);
                                setSelectedSpaTreatments([]);
                                setCruisePayOption("full");
                                setCruiseDrinkPackage(false);
                                setCruiseWifiPackage(false);
                                setCruiseExcursionPackage(false);

                                setSearchResults([match]);
                                setSelectedCruise(match);
                                setView("details");
                              }
                            }}
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer hover:border-[#003580]/30 transition group flex flex-col justify-between"
                          >
                            <div className="h-40 overflow-hidden relative">
                              <img src={voyage.img} alt={voyage.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                              <span className="absolute top-3 left-3 bg-[#003580] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                                {voyage.tag}
                              </span>
                            </div>
                            <div className="p-4 text-left space-y-1.5 flex-1 flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] text-gray-400 font-extrabold uppercase">{voyage.line} · {voyage.ship}</span>
                                <h4 className="font-extrabold text-xs sm:text-sm text-gray-850 mt-0.5 line-clamp-1 group-hover:text-[#003580] transition">{voyage.name}</h4>
                              </div>
                              <div className="flex justify-between items-center border-t border-gray-100 pt-2.5 mt-2">
                                <span className="text-[10px] text-gray-400 font-semibold">Base Fare From</span>
                                <span className="text-sm font-black text-gray-950 font-[Unbounded]">{voyage.price}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Why Book Cruises with Us */}
                    <div className="text-left space-y-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Why Book Your Next Cruise with Us?</h3>
                        <p className="text-gray-500 text-xs sm:text-sm font-medium">
                          Experience industry-leading cruise benefits backed by CruiseDirect guarantees
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { title: "No Booking Fees", desc: "No credit card surcharges or extra agency booking fees, saving you up to 5% instantly.", icon: "💳", color: "bg-blue-50 text-blue-700" },
                          { title: "Best Price Match", desc: "Found a lower rate elsewhere within 24 hours of booking? We will match it or credit you 110% of the difference.", icon: "★", color: "bg-amber-50 text-amber-700" },
                          { title: "Flexible 20% Deposits", desc: "Lock in your stateroom today for just 20%. Auto-bill the remaining balance 60 days before sail.", icon: "🤝", color: "bg-emerald-50 text-emerald-700" },
                          { title: "Rate Drop Protection", desc: "If the cruise line lowers their price before final payment, we will adjust your invoice to match the lower rate.", icon: "📉", color: "bg-indigo-50 text-indigo-700" }
                        ].map((card, cIdx) => (
                          <div key={cIdx} className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
                            <div className={`w-8 h-8 rounded-lg ${card.color} flex items-center justify-center font-bold text-lg shrink-0`}>
                              {card.icon}
                            </div>
                            <h4 className="font-extrabold text-xs text-gray-800 mt-1">{card.title}</h4>
                            <p className="text-gray-500 text-[10px] leading-relaxed font-semibold">{card.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cruise FAQs */}
                    <div className="text-left mt-4">
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1.5">Cruise Travel Guidelines & FAQs</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-5">
                        Learn about visa requirements, boarding check-in windows, and flexible payment setups
                      </p>

                      <div className="flex flex-col gap-2.5">
                        {[
                          { q: "How do flexible deposit payment schedules operate?", a: "By selecting 'Flexible 20% Deposit' at checkout, you pay exactly 20% of your total fare today to lock in your cabin. The remaining 80% balance is automatically billed to your payment card 60 days before the ship sets sail." },
                          { q: "What travel documentation is required for cruise boarding?", a: "Most sailings require a valid Passport with at least 6 months validity remaining. Certain itineraries also require Schengen, US, or local tourist visas depending on port stops. Always verify destination requirements before checking in." },
                          { q: "Can I cancel my cruise booking and receive a refund?", a: "Cancellations made 90 days or more prior to departure receive a 100% refund. Cancellations made between 89 to 57 days prior retain the deposit. For cancellations within 30 days of sail, the fare is non-refundable." },
                          { q: "Are onboard beverage and Wi-Fi packages cheaper if pre-booked?", a: "Yes, pre-booking enhancement packages like Deluxe Beverages and VOOM High-Speed Wi-Fi through our Fare Calculator saves you up to 25% compared to purchasing them onboard the ship." }
                        ].map((faq, idx) => {
                          const isFaqOpen = activeFaqIndex === (idx + 30);
                          return (
                            <div key={idx} className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-all duration-150">
                              <button
                                type="button"
                                onClick={() => setActiveFaqIndex(isFaqOpen ? null : (idx + 30))}
                                className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-gray-800 hover:text-[#003580] cursor-pointer bg-transparent border-none"
                              >
                                <span>{faq.q}</span>
                                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isFaqOpen ? 'rotate-180 text-[#003580]' : ''}`} />
                              </button>
                              {isFaqOpen && (
                                <div className="px-5 pb-4 pt-1 text-xs text-gray-500 font-semibold leading-relaxed border-t border-gray-50">
                                  {faq.a}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

              </div> {/* /Tab sections wrapper */}
          </div>
        )}

        {/* ── 2. VIEW: Search Results Listing Page ── */}
        {view === "results" && (
          <div className="flex flex-col gap-6">

            {/* ── Search Bar from Main Page ── */}
            <div className="mb-2 w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] z-20 relative">
              {activeTab === "stays" && <StaysSearch />}
              {activeTab === "flights" && <FlightsSearch />}
              {activeTab === "trains" && <TrainsSearch />}
              {activeTab === "buses" && <BusesSearch />}
              {activeTab === "cars" && <CarsSearch />}
              {activeTab === "cruises" && <CruisesSearch />}
              {activeTab === "holidays" && <HolidaysSearch />}
              {activeTab === "attractions" && <AttractionsSearch />}
            </div>


          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Filter Sidebar - MakeMyTrip Style (Stays only) */}
            {activeTab === "stays" && (
              <>
              {/* Mobile Filter Toggle Button */}
              <div className="lg:hidden col-span-1 flex items-center justify-start mt-0 px-2 w-full">
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-full shadow-md font-bold text-sm hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <Filter size={16} className="text-[#e8731a]" />
                  Show Filters
                </button>
              </div>

              {/* Mobile overlay */}
              {isMobileFilterOpen && (
                <div className="fixed inset-0 bg-black/45 z-[45] lg:hidden" onClick={() => setIsMobileFilterOpen(false)} />
              )}

              <div className={`
                bg-white border-r lg:border border-gray-200 lg:rounded-xl shadow-2xl lg:shadow-sm overflow-hidden
                fixed top-0 left-0 h-full z-50 w-[300px] transition-transform duration-300 flex flex-col
                ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"}
                lg:relative lg:top-auto lg:left-auto lg:h-auto lg:z-auto lg:translate-x-0 lg:sticky lg:top-4 lg:col-span-3 lg:shrink-0
              `} id="filter-sidebar">

                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50 shrink-0">
                    <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                      <Filter size={15} className="text-[#e8731a]" />
                      <span>Filters</span>
                    </h3>
                    <div className="flex items-center gap-4">
                      <button
                      type="button"
                      onClick={() => {
                        setFilterStars({ 5: false, 4: false, 3: false });
                        setMaxBudget(50000);
                        setMinBudget(0);
                        setFilterDeals({ rushDeal: false, lastMinute: false, beachfront: false, oneCircle: false });
                        setFilterPriceRanges({ r1: false, r2: false, r3: false, r4: false, r5: false, r6: false });
                        setFilterRating({ excellent: false, veryGood: false, good: false });
                        setFilterPropertyType({ apartment: false, villa: false, hotel: false, resort: false, homestay: false });
                        setFilterRoomViews({ garden: false, pool: false });
                        setFilterAmenities({ kitchenette: false, fireplace: false, jacuzzi: false, bathtub: false, balcony: false, pool: false, wifi: false, spa: false });
                        setFilterBookingPref({ caretaker: false, instantBook: false, entireVillas: false, homestays: false, starHost: false });
                        setFilterHouseRules({ selfCheckIn: false, smokingAllowed: false, allMale: false, unmarriedCouples: false, alcoholAllowed: false, petsAllowed: false });
                        setFilterDealsOffers({ travelMuhurat: false, oneCircleRewards: false, lightningDrops: false });
                        setFilterCheckInOut({ earlyCheckIn: false, lateCheckOut: false });
                        setFilterLocations({});
                        setFilterStaysOptions({
                          swimming: false,
                          oneBed: false,
                          twoBed: false,
                          ac: false,
                          nonAc: false,
                          deluxe: false,
                          superDeluxe: false,
                          married: false,
                          unmarried: false,
                          breakfast: false,
                          nonBreakfast: false,
                          smoking: false,
                          nonSmoking: false,
                          wifi: false,
                          nonWifi: false,
                          laundry: false,
                          nonLaundry: false
                        });
                      }}
                      className="text-[11px] font-semibold text-[#e8731a] hover:text-[#c4601a] cursor-pointer transition-colors"
                    >
                      Clear All
                    </button>
                    {/* Close button for mobile */}
                    <button 
                      onClick={() => setIsMobileFilterOpen(false)} 
                      className="lg:hidden text-gray-500 hover:text-gray-800 p-1"
                    >
                      <X size={18} />
                    </button>
                    </div>
                  </div>

                  {/* Map & Search shortcuts */}
                  <div className="px-4 py-3 border-b border-gray-100 flex gap-2">
                    <button className="flex items-center gap-1.5 text-[11px] font-semibold text-[#003580] border border-[#003580] rounded-full px-3 py-1 hover:bg-[#003580] hover:text-white transition-colors cursor-pointer">
                      <Map size={11} /> Map
                    </button>
                    <button className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100 transition-colors cursor-pointer">
                      <Search size={11} /> Search
                    </button>
                  </div>

                  <div className="max-h-[calc(100vh-130px)] overflow-y-auto">

                    {/* Suggested For You */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Suggested For You</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "rushDeal", label: "Rush Deal", count: "124" },
                          { key: "lastMinute", label: "Last Minute Deals", count: null },
                          { key: "beachfront", label: "Beachfront Properties", count: "155" },
                          { key: "oneCircle", label: "OneCircle Rewards", count: "417" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterDeals(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterDeals[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"
                                  }`}
                              >
                                {filterDeals[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Per Night */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Price Per Night</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "r1", label: "₹ 0 - ₹ 1,500", count: "378" },
                          { key: "r2", label: "₹ 1,500 - ₹ 3,000", count: "964" },
                          { key: "r3", label: "₹ 3,000 - ₹ 5,500", count: "751" },
                          { key: "r4", label: "₹ 5,500 - ₹ 10,500", count: "404" },
                          { key: "r5", label: "₹ 10,500 - ₹ 20,000", count: "315" },
                          { key: "r6", label: "₹ 20,000+", count: "319" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterPriceRanges(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterPriceRanges[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"
                                  }`}
                              >
                                {filterPriceRanges[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Your Budget */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Your Budget</h4>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-[11px]">₹</span>
                          <input
                            type="number"
                            placeholder="Min"
                            value={minBudget || ""}
                            onChange={e => setMinBudget(Number(e.target.value))}
                            className="w-full pl-5 pr-2 py-1.5 border border-gray-300 rounded text-[11px] text-gray-700 focus:outline-none focus:border-[#e8731a]"
                          />
                        </div>
                        <span className="text-gray-400 text-[11px] font-semibold">to</span>
                        <div className="flex-1 relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-[11px]">₹</span>
                          <input
                            type="number"
                            placeholder="Max"
                            value={maxBudget === 50000 ? "" : maxBudget}
                            onChange={e => setMaxBudget(Number(e.target.value) || 50000)}
                            className="w-full pl-5 pr-2 py-1.5 border border-gray-300 rounded text-[11px] text-gray-700 focus:outline-none focus:border-[#e8731a]"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="500"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(Number(e.target.value))}
                        className="w-full cursor-pointer"
                        style={{ accentColor: "#e8731a" }}
                      />
                      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                        <span>₹0</span>
                        <span>₹50,000</span>
                      </div>
                    </div>

                    {/* Star Category */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Star Category</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { star: 3, count: "691" },
                          { star: 4, count: "380" },
                          { star: 5, count: "206" },
                        ].map(item => (
                          <label key={item.star} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterStars(p => ({ ...p, [item.star]: !p[item.star] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterStars[item.star] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"
                                  }`}
                              >
                                {filterStars[item.star] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="flex items-center gap-0.5">
                                {Array.from({ length: item.star }).map((_, i) => (
                                  <Star key={i} size={11} className="fill-[#febb02] text-[#febb02]" />
                                ))}
                                <span className="text-[12px] text-gray-700 ml-1">{item.star} Star</span>
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* User Rating */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">User Rating</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "excellent", label: "Excellent: 4.2+", count: "887" },
                          { key: "veryGood", label: "Very Good: 3.5+", count: "1851" },
                          { key: "good", label: "Good: 3+", count: "829" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterRating(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterRating[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"
                                  }`}
                              >
                                {filterRating[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Property Type */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Property Type</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "apartment", label: "Apartment", count: "880" },
                          { key: "villa", label: "Villa", count: "762" },
                          { key: "hotel", label: "Hotel", count: "681" },
                          { key: "resort", label: "Resort", count: "398" },
                          { key: "homestay", label: "Homestay", count: "211" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterPropertyType(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterPropertyType[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"
                                  }`}
                              >
                                {filterPropertyType[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                      {!showMorePropertyTypes && (
                        <button
                          onClick={() => setShowMorePropertyTypes(true)}
                          className="text-[11px] text-[#e8731a] font-semibold mt-2 flex items-center gap-1 cursor-pointer hover:underline"
                        >
                          Show 4 more <ChevronDown size={12} />
                        </button>
                      )}
                    </div>

                    {/* Top Locations */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Top Locations</h4>
                      <div className="flex flex-col gap-1.5">
                        {[
                          "North Goa", "South Goa", "Baga Beach", "Panjim",
                          "Calangute Beach", "Vagator", "Candolim Beach",
                          "Anjuna Beach", "Candolim", "Palolem Beach"
                        ].map(loc => (
                          <label key={loc} className="flex items-center gap-2 cursor-pointer group">
                            <div
                              onClick={() => setFilterLocations(p => ({ ...p, [loc]: !p[loc] }))}
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${filterLocations[loc] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"
                                }`}
                            >
                              {filterLocations[loc] && <Check size={10} className="text-white" strokeWidth={3} />}
                            </div>
                            <span className="text-[12px] text-gray-700 group-hover:text-[#003580] transition-colors">{loc}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Room Views */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Room Views</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "garden", label: "Garden View", count: "203" },
                          { key: "pool", label: "Pool View", count: "138" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterRoomViews(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterRoomViews[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"
                                  }`}
                              >
                                {filterRoomViews[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Room Amenities */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Room Amenities</h4>
                      <div className="mb-2">
                        <div className="flex items-center gap-1.5 border border-gray-200 rounded px-2 py-1">
                          <Search size={11} className="text-gray-400" />
                          <input type="text" placeholder="Search amenities" className="text-[11px] text-gray-600 outline-none flex-1 bg-transparent" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "kitchenette", label: "Kitchenette", count: "47" },
                          { key: "fireplace", label: "Fireplace", count: "40" },
                          { key: "jacuzzi", label: "Jacuzzi", count: "22" },
                          { key: "bathtub", label: "Bathtub", count: "84" },
                          { key: "balcony", label: "Balcony", count: "338" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterAmenities(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterAmenities[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"
                                  }`}
                              >
                                {filterAmenities[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                      {!showMoreAmenities && (
                        <button
                          onClick={() => setShowMoreAmenities(true)}
                          className="text-[11px] text-[#e8731a] font-semibold mt-2 flex items-center gap-1 cursor-pointer hover:underline"
                        >
                          Show 6 more <ChevronDown size={12} />
                        </button>
                      )}
                      {showMoreAmenities && (
                        <div className="flex flex-col gap-2 mt-2">
                          {[
                            { key: "pool", label: "Swimming Pool" },
                            { key: "wifi", label: "Wi-Fi" },
                            { key: "spa", label: "Spa" },
                          ].map(item => (
                            <label key={item.key} className="flex items-center cursor-pointer group">
                              <div className="flex items-center gap-2">
                                <div
                                  onClick={() => setFilterAmenities(p => ({ ...p, [item.key]: !p[item.key] }))}
                                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterAmenities[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"
                                    }`}
                                >
                                  {filterAmenities[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                                </div>
                                <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                              </div>
                            </label>
                          ))}
                          <button
                            onClick={() => setShowMoreAmenities(false)}
                            className="text-[11px] text-[#e8731a] font-semibold mt-1 flex items-center gap-1 cursor-pointer hover:underline"
                          >
                            Show less <ChevronUp size={12} />
                          </button>
                        </div>
                      )}
                    </div>


                    {/* Booking Preference */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Booking Preference</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "caretaker", label: "Caretaker", count: "127" },
                          { key: "instantBook", label: "Instant Book", count: "2964" },
                          { key: "entireVillas", label: "Entire Villas & Apartments", count: "302" },
                          { key: "homestays", label: "Homestays", count: "1958" },
                          { key: "starHost", label: "Star Host Properties", count: "164" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterBookingPref(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterBookingPref[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"
                                  }`}
                              >
                                {filterBookingPref[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* House Rules */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">House Rules</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "selfCheckIn", label: "Self Check-In Available", count: "133" },
                          { key: "smokingAllowed", label: "Smoking Allowed", count: "785" },
                          { key: "allMale", label: "All Male Groups Allowed", count: "892" },
                          { key: "unmarriedCouples", label: "Unmarried Couples Allowed", count: "1062" },
                          { key: "alcoholAllowed", label: "Alcohol Allowed", count: "684" },
                          { key: "petsAllowed", label: "Pets Allowed", count: "234" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterHouseRules(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterHouseRules[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"
                                  }`}
                              >
                                {filterHouseRules[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Deals & Offers */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Deals &amp; Offers</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "travelMuhurat", label: "Travel ka Muhurat Sale", count: "821" },
                          { key: "oneCircleRewards", label: "OneCircle Rewards", count: "417" },
                          { key: "lightningDrops", label: "Lightning Drops", count: "149" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterDealsOffers(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterDealsOffers[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"
                                  }`}
                              >
                                {filterDealsOffers[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Flexible Check-in/out */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Flexible Check-in/out</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "earlyCheckIn", label: "Guaranteed Early Check-in", count: "186" },
                          { key: "lateCheckOut", label: "Guaranteed Late Check-out", count: "110" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterCheckInOut(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterCheckInOut[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"
                                  }`}
                              >
                                {filterCheckInOut[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Swimming pool */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Recreational Facilities</h4>
                      <label className="flex items-center cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <div
                            onClick={() => setFilterStaysOptions(p => ({ ...p, swimming: !p.swimming }))}
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterStaysOptions.swimming ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"}`}
                          >
                            {filterStaysOptions.swimming && <Check size={10} className="text-white" strokeWidth={3} />}
                          </div>
                          <span className="text-[12px] text-gray-700 group-hover:text-gray-900">Swimming Pool</span>
                        </div>
                      </label>
                    </div>

                    {/* Bed count */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Bed Configuration</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "oneBed", label: "1 Bed (King / Queen / Single)" },
                          { key: "twoBed", label: "2 Beds (Twin / Double / Suite)" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterStaysOptions(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterStaysOptions[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"}`}
                              >
                                {filterStaysOptions[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* AC / Non AC */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Air Conditioning</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "ac", label: "Air Conditioned (AC)" },
                          { key: "nonAc", label: "Non-AC Rooms" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterStaysOptions(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterStaysOptions[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"}`}
                              >
                                {filterStaysOptions[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Deluxe / Super Deluxe */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Room Category</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "deluxe", label: "Deluxe Rooms" },
                          { key: "superDeluxe", label: "Super Deluxe / Premium Suites" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterStaysOptions(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterStaysOptions[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"}`}
                              >
                                {filterStaysOptions[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Married / unmarried */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Couples Preference</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "married", label: "Married Couples Welcomed" },
                          { key: "unmarried", label: "Unmarried Couples Allowed" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterStaysOptions(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterStaysOptions[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"}`}
                              >
                                {filterStaysOptions[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Breakfast / non breakfast */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Meal Inclusions</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "breakfast", label: "Breakfast Included" },
                          { key: "nonBreakfast", label: "Room Only (No Meals)" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterStaysOptions(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterStaysOptions[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"}`}
                              >
                                {filterStaysOptions[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Smoking Policy */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Smoking Policy</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "smoking", label: "Smoking Allowed Rooms" },
                          { key: "nonSmoking", label: "Non-Smoking Rooms" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterStaysOptions(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterStaysOptions[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"}`}
                              >
                                {filterStaysOptions[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Wifi / non wifi */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Connectivity</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "wifi", label: "Free High-Speed Wi-Fi" },
                          { key: "nonWifi", label: "No Wi-Fi / Paid Wi-Fi" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterStaysOptions(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterStaysOptions[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"}`}
                              >
                                {filterStaysOptions[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Laundry / non laundry */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Services</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "laundry", label: "Laundry Service / Dry Cleaning" },
                          { key: "nonLaundry", label: "No Laundry Service" },
                        ].map(item => (
                          <label key={item.key} className="flex items-center cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <div
                                onClick={() => setFilterStaysOptions(p => ({ ...p, [item.key]: !p[item.key] }))}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${filterStaysOptions[item.key] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"}`}
                              >
                                {filterStaysOptions[item.key] && <Check size={10} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{item.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Back to Top */}
                    <div className="px-4 py-3">
                      <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="w-full text-[11px] font-semibold text-[#003580] border border-[#003580] rounded py-2 hover:bg-[#003580] hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <ChevronUp size={12} /> BACK TO TOP
                      </button>
                    </div>

                  </div>{/* /scrollable area */}
              </div>
              </>
            )}{/* /stays-only filter sidebar */}

            {/* Right Listings Main Pane */}
            <div className={`${activeTab === "stays" ? "lg:col-span-9" : "lg:col-span-12"} flex flex-col gap-6`}>

              {/* Results count & Back link */}
              <div className="flex justify-between items-center flex-wrap gap-2">
                <button
                  onClick={() => navigate(tabRouteMap[activeTab] || "/hotel")}
                  className="text-xs font-bold text-gray-500 hover:text-[#003580] flex items-center gap-1 cursor-pointer"
                >
                  <MdArrowBack size={14} /> Back to Search
                </button>
                <span className="text-xs font-bold text-gray-500">
                  Showing {activeTab === "stays" ? filteredStays.length : searchResults.length} properties matching criteria
                </span>
              </div>

              {/* STAYS LISTINGS */}
              {activeTab === "stays" && (
                <div className="flex flex-col gap-5">
                  {filteredStays.length === 0 ? (
                    <div className="bg-white border border-gray-150 rounded-xl p-8 text-center text-gray-500 font-bold text-sm">
                      No stays match your active filter selections.
                    </div>
                  ) : (
                    filteredStays.map((stay) => (
                      <div
                        key={stay.id}
                        className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-5 p-4"
                      >
                        {/* Image */}
                        <div className="w-full md:w-[220px] h-[160px] shrink-0 rounded-lg overflow-hidden">
                          <img src={stay.image} alt={stay.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Details */}
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                              <h4
                                onClick={() => handleSelectItem(stay)}
                                className="font-black text-base sm:text-lg text-[#003580] hover:text-blue-900 cursor-pointer"
                              >
                                {stay.name}
                              </h4>
                              <div className="flex items-center gap-1 bg-[#003580] text-white font-bold text-[10px] px-2 py-0.5 rounded">
                                <span>{stay.rating}</span>
                                <span className="text-white/60 font-semibold">{stay.ratingText}</span>
                              </div>
                            </div>

                            {/* Stars */}
                            <div className="flex items-center gap-0.5 mt-1">
                              {Array.from({ length: stay.stars }).map((_, i) => (
                                <Star key={i} size={12} className="fill-[#febb02] text-[#febb02]" />
                              ))}
                              <span className="text-[10px] text-gray-400 font-bold ml-1.5">{stay.distance}</span>
                            </div>

                            {/* Benefits checklist */}
                            <div className="flex flex-wrap gap-2 mt-3">
                              {(stay.benefits || []).map((b, idx) => (
                                <span key={idx} className="bg-green-50 border border-green-200 text-green-700 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded flex items-center gap-0.5">
                                  <Check size={10} /> {b}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Price & action */}
                          <div className="flex items-end justify-between border-t border-gray-100 pt-4 mt-4">
                            <div>
                              <span className="text-[10px] text-gray-400 font-black block">Price per night</span>
                              <span className="text-lg font-black text-gray-900">₹{stay.price.toLocaleString()}</span>
                              <span className="text-[10px] text-gray-400 block">+ ₹1,200 taxes & charges</span>
                            </div>
                            <button
                              onClick={() => handleSelectItem(stay)}
                              className="bg-[#003580] hover:bg-blue-900 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all active:scale-95"
                            >
                              See availability
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* FLIGHTS LISTINGS — MakeMyTrip Style */}
              {activeTab === "flights" && (() => {
                // Determine source and destination cities
                const fromCity = flightFrom || "New Delhi";
                const toCity = flightTo || "Paris";

                // Generate dynamic flight database based on search inputs
                const MMT_FLIGHTS = [
                  {
                    id: "mmt-f1",
                    airlines: ["Oman Air", "LOT Polish Airlines"],
                    airlineLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROycmTObmtHsSHGxw6JEuxZOiyj1mKqHBKWS7-nICQcA&s=10",
                    price: 71447,
                    cheapest: true,
                    popular: false,
                    refundable: true,
                    // Onward
                    onwardAirline: "Oman Air",
                    onwardDep: "08:55",
                    onwardArr: "19:45",
                    onwardFrom: fromCity + " (DEL)",
                    onwardTo: toCity + " - Charles de Gaulle Airport (CDG)",
                    onwardDur: "14h 20m",
                    onwardStops: "1 stop via Muscat",
                    onwardAirport: "Ch. De Gaulle",
                    onwardStopsCount: 1,
                    // Return
                    returnAirline: "LOT Polish Airlines",
                    returnDep: "20:35",
                    returnArr: "02:55",
                    returnArrDayOffset: "+2 DAY",
                    returnFrom: toCity + " - Orly Airport (ORY)",
                    returnTo: fromCity + " (DEL)",
                    returnDur: "26h 50m",
                    returnStops: "2 stops via Krakow, Warsaw",
                    returnAirport: "Orly",
                    returnStopsCount: 2,
                    discountText: "Get ₹ 1,950 additional discount using MMTTRY OR Flat 10% off using WELCOMEMMT",
                    visaInfo: "Transit Visa required"
                  },
                  {
                    id: "mmt-f2",
                    airlines: ["Qatar Airways", "Vueling", "LOT Polish Airlines"],
                    airlineLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXtgtF1wntvoOT4XjAxCMi3NuDe1QmoAthmlJYaGtX0Q&s=10",
                    price: 75095,
                    cheapest: false,
                    popular: true,
                    refundable: true,
                    // Onward
                    onwardAirline: "Qatar Airways, Vueling",
                    onwardDep: "03:25",
                    onwardArr: "22:05",
                    onwardFrom: fromCity + " (DEL)",
                    onwardTo: toCity + " - Orly Airport (ORY)",
                    onwardDur: "22h 10m",
                    onwardStops: "2 stops via Doha, Malaga",
                    onwardAirport: "Orly",
                    onwardStopsCount: 2,
                    // Return
                    returnAirline: "LOT Polish Airlines",
                    returnDep: "20:35",
                    returnArr: "02:55",
                    returnArrDayOffset: "+2 DAY",
                    returnFrom: toCity + " - Orly Airport (ORY)",
                    returnTo: fromCity + " (DEL)",
                    returnDur: "26h 50m",
                    returnStops: "2 stops via Krakow, Warsaw",
                    returnAirport: "Orly",
                    returnStopsCount: 2,
                    discountText: "Get ₹ 2,000 additional discount using MMTTRY OR Flat 10% off using WELCOMEMMT",
                    visaInfo: "Transit Visa required"
                  },
                  {
                    id: "mmt-f3",
                    airlines: ["Air France"],
                    airlineLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAWEAYMdgYlB96_Gq_DsrlrX1GcsZnwkjPGDW--zVZXg&s=10",
                    price: 104619,
                    cheapest: false,
                    popular: true,
                    nonStopFirst: true,
                    refundable: true,
                    // Onward
                    onwardAirline: "Air France",
                    onwardDep: "10:35",
                    onwardArr: "16:30",
                    onwardFrom: fromCity + " (DEL)",
                    onwardTo: toCity + " - Charles de Gaulle Airport (CDG)",
                    onwardDur: "10h 35m",
                    onwardStops: "Non stop",
                    onwardAirport: "Ch. De Gaulle",
                    onwardStopsCount: 0,
                    // Return
                    returnAirline: "Air France",
                    returnDep: "22:00",
                    returnArr: "09:30",
                    returnArrDayOffset: "+1 DAY",
                    returnFrom: toCity + " - Charles de Gaulle Airport (CDG)",
                    returnTo: fromCity + " (DEL)",
                    returnDur: "9h 30m",
                    returnStops: "Non stop",
                    returnAirport: "Ch. De Gaulle",
                    returnStopsCount: 0,
                    discountText: "Flat 10% off using WELCOMEWAT | Extra Baggage allowance active",
                    visaInfo: "No Transit Visa required"
                  },
                  {
                    id: "mmt-f4",
                    airlines: ["Air China"],
                    airlineLogo: "https://logodownload.org/wp-content/uploads/2020/03/air-china-logo-0.png",
                    price: 69900,
                    cheapest: true,
                    popular: false,
                    refundable: false,
                    // Onward
                    onwardAirline: "Air China",
                    onwardDep: "21:15",
                    onwardArr: "06:40",
                    onwardFrom: fromCity + " (DEL)",
                    onwardTo: toCity + " - Charles de Gaulle Airport (CDG)",
                    onwardDur: "14h 55m",
                    onwardStops: "1 stop via Beijing",
                    onwardAirport: "Ch. De Gaulle",
                    onwardStopsCount: 1,
                    // Return
                    returnAirline: "Air China",
                    returnDep: "12:15",
                    returnArr: "01:20",
                    returnArrDayOffset: "+1 DAY",
                    returnFrom: toCity + " - Charles de Gaulle Airport (CDG)",
                    returnTo: fromCity + " (DEL)",
                    returnDur: "15h 05m",
                    returnStops: "1 stop via Beijing",
                    returnAirport: "Ch. De Gaulle",
                    returnStopsCount: 1,
                    discountText: "Save ₹ 1,500 using CABDEAL",
                    visaInfo: "Transit Visa required"
                  },
                  {
                    id: "mmt-f5",
                    airlines: ["Air India"],
                    airlineLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp8oed-o7UwydayaIy8I834HiCFcTfYREjQZe2eyVjFA&s=10",
                    price: 1082400,
                    cheapest: false,
                    popular: false,
                    refundable: true,
                    // Onward
                    onwardAirline: "Air India",
                    onwardDep: "13:15",
                    onwardArr: "18:45",
                    onwardFrom: fromCity + " (DEL)",
                    onwardTo: toCity + " - Charles de Gaulle Airport (CDG)",
                    onwardDur: "10h 30m",
                    onwardStops: "Non stop",
                    onwardAirport: "Ch. De Gaulle",
                    onwardStopsCount: 0,
                    // Return
                    returnAirline: "Air India",
                    returnDep: "21:30",
                    returnArr: "08:20",
                    returnArrDayOffset: "+1 DAY",
                    returnFrom: toCity + " - Charles de Gaulle Airport (CDG)",
                    returnTo: fromCity + " - Noida International Airport (DXN)",
                    returnDur: "16h 20m",
                    returnStops: "1 stop via Mumbai",
                    returnAirport: "Noida International Airport (71Km)",
                    returnStopsCount: 1,
                    discountText: "Luxury First Class booking | Lounges included",
                    visaInfo: "No Transit Visa required"
                  }
                ];

                // ── Live filter resolver ──
                const filteredMMTFlights = MMT_FLIGHTS.filter(f => {
                  // Price filter
                  if (f.price > maxFlightPrice) return false;

                  // Stops filter
                  if (selectedStopsFilter.nonStop && f.onwardStopsCount !== 0) return false;
                  if (selectedStopsFilter.oneStop && f.onwardStopsCount !== 1) return false;
                  if (selectedStopsFilter.twoStops && f.onwardStopsCount < 2) return false;

                  // Dynamic stops selection matching the stops slider/radio
                  if (flightFilterStops === "1stop" && f.onwardStopsCount > 1) return false;

                  // Refundable filter
                  if (refundableOnly && !f.refundable) return false;

                  // Hide nearby airports
                  if (hideNearbyAirports && f.returnAirport.includes("Noida")) return false;

                  // Airline filters
                  const activeAirlineKeys = Object.entries(flightFilterAirlines).filter(([, v]) => v).map(([k]) => k.toLowerCase());
                  if (activeAirlineKeys.length > 0) {
                    const matchesAirline = f.airlines.some(a => {
                      const alName = a.toLowerCase();
                      return activeAirlineKeys.some(key => {
                        if (key === "ita") return alName.includes("oman") || alName.includes("lot");
                        if (key === "lufthansa") return alName.includes("france");
                        if (key === "aeroitalia") return alName.includes("china");
                        if (key === "etihad") return alName.includes("india");
                        if (key === "airarabia") return alName.includes("qatar") || alName.includes("vueling");
                        return alName.includes(key);
                      });
                    });
                    if (!matchesAirline) return false;
                  }

                  // Onward airport filter
                  const activeOnwardAirports = Object.entries(selectedOnwardAirports).filter(([, v]) => v).map(([k]) => k);
                  if (activeOnwardAirports.length > 0 && !activeOnwardAirports.includes(f.onwardAirport)) return false;

                  // Return airport filter
                  const activeReturnAirports = Object.entries(selectedReturnAirports).filter(([, v]) => v).map(([k]) => k);
                  if (activeReturnAirports.length > 0 && !activeReturnAirports.includes(f.returnAirport)) return false;

                  // Smart preferences text filter
                  if (flightPreference.trim() !== "") {
                    const pref = flightPreference.toLowerCase();
                    if (pref.includes("baggage") && !f.discountText.toLowerCase().includes("baggage") && f.price > 80000) return false;
                    if (pref.includes("morning") && parseInt(f.onwardDep.split(":")[0]) >= 12) return false;
                    if (pref.includes("non-stop") && f.onwardStopsCount !== 0) return false;
                  }

                  return true;
                });

                // Sort resolved list
                const sortedMMT = [...filteredMMTFlights].sort((a, b) => {
                  if (flightSortBy === "cheapest") return a.price - b.price;
                  if (flightSortBy === "highest_price") return b.price - a.price;
                  if (flightSortBy === "newest") return b.id.localeCompare(a.id);
                  if (flightSortBy === "fastest") return parseInt(a.onwardDur) - parseInt(b.onwardDur);
                  if (flightSortBy === "non_stop_first") {
                    if (a.onwardStopsCount !== b.onwardStopsCount) return a.onwardStopsCount - b.onwardStopsCount;
                    return a.price - b.price;
                  }
                  return a.price - b.price;
                });

                return (
                  <div className="relative">
                    {/* Mobile filters backdrop */}
                    {showFlightFilters && (
                      <div className="fixed inset-0 bg-black/45 z-45 lg:hidden" onClick={() => setShowFlightFilters(false)} />
                    )}

                    {/* MMT Upper Search Info bar (Optional summary) */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 text-[#003580] p-2.5 rounded-lg">
                          <Plane size={20} className="rotate-45" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm text-gray-900">Flights from {fromCity} to {toCity}, and back</h3>
                          <p className="text-[10px] font-bold text-gray-400 mt-0.5">Round Trip &bull; {checkInDate || "31 Jul"} - {returnDate || "1 Aug"} &bull; {guestsCount.adults} traveler &bull; {cabinClass}</p>
                        </div>
                      </div>
                      <button onClick={() => navigate("/visa-passport")} className="bg-blue-50 hover:bg-blue-100/80 text-[#003580] text-[11px] font-black px-4 py-2 rounded-lg border border-blue-100 flex items-center gap-1.5 transition-all cursor-pointer">
                        <Globe size={13} /> View Visa Guide
                      </button>
                    </div>

                    {/* Mobile Filter Toggle Button */}
                    <div className="lg:hidden w-full flex items-center justify-start mt-0 mb-4 px-2">
                      <button 
                        onClick={() => setShowFlightFilters(true)}
                        className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-full shadow-md font-bold text-sm hover:bg-gray-50 transition-all cursor-pointer"
                      >
                        <Filter size={16} className="text-[#e8731a]" />
                        Show Filters
                      </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 items-start">

                      {/* ── LEFT COLUMN: Filter Sidebar ── */}
                      <div className={`
                        bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden
                        fixed top-0 left-0 h-full z-50 w-[300px] transition-transform duration-300 flex flex-col
                        ${showFlightFilters ? "translate-x-0" : "-translate-x-full"}
                        lg:relative lg:top-auto lg:left-auto lg:h-auto lg:z-auto lg:translate-x-0 lg:sticky lg:top-4 lg:w-68 lg:shrink-0
                      `}>
                        {/* Header */}
                        <div className="px-4 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
                          <div>
                            <p className="text-xs font-black text-gray-800 uppercase tracking-wide">Popular Filters</p>
                            <p className="text-[9px] font-bold text-gray-400 mt-0.5">{sortedMMT.length} flights filtered</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedStopsFilter({ nonStop: false, oneStop: false, twoStops: false });
                              setRefundableOnly(false);
                              setHideNearbyAirports(false);
                              setFlightFilterAirlines({ ita: false, lufthansa: false, aeroitalia: false, etihad: false, airArabia: false });
                              setSelectedOnwardAirports({});
                              setSelectedReturnAirports({});
                              setFlightPreference("");
                              setMaxFlightPrice(1082400);
                            }}
                            className="text-[10px] font-black text-red-500 hover:text-red-700 transition-colors uppercase tracking-wider cursor-pointer"
                          >
                            Clear All
                          </button>
                        </div>

                        {/* Flight Selection View toggle (MMT Style) */}
                        {/* <div className="px-4 py-3.5 border-b border-gray-100 shrink-0">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Flight selection view</p>
                          <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-lg">
                            <button
                              type="button"
                              onClick={() => setSelectionView("individual")}
                              className={`py-1 rounded text-[10px] font-black transition-colors ${selectionView === "individual" ? "bg-[#003580] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                            >
                              Individual Flights
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectionView("combined")}
                              className={`py-1 rounded text-[10px] font-black transition-colors ${selectionView === "combined" ? "bg-[#003580] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                            >
                              Combined Flights
                            </button>
                          </div>
                        </div> */}

                        {/* Sort Flights Selector */}
                        <div className="px-4 py-3.5 border-b border-gray-100 shrink-0">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Sort Flights</p>
                          <select
                            value={flightSortBy}
                            onChange={(e) => setFlightSortBy(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-750 outline-none focus:border-[#003580] cursor-pointer"
                          >
                            <option value="cheapest">Price: Low to High</option>
                            <option value="highest_price">Price: High to Low</option>
                            <option value="fastest">Fastest Flights</option>
                            <option value="non_stop_first">Non-Stop First</option>
                          </select>
                        </div>

                        {/* Smart Filters Powered by Myra.Ai */}
                        <div className="px-4 py-3.5 border-b border-gray-100 shrink-0 bg-blue-50/40">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-black text-[#003580] uppercase tracking-wider">Smart Filters</span>
                            <span className="text-[8px] bg-blue-100 text-[#003580] font-black px-1.5 py-0.5 rounded">Powered by Myra.Ai</span>
                          </div>
                          <input
                            type="text"
                            placeholder="Type your flight preference..."
                            value={flightPreference}
                            onChange={e => setFlightPreference(e.target.value)}
                            className="w-full bg-white border border-blue-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-[#003580] placeholder-gray-400"
                          />
                          <div className="flex flex-wrap gap-1 mt-2">
                            {[
                              { label: "Baggage included", tag: "baggage" },
                              { label: "Morning departures", tag: "morning" },
                              { label: "Non-stop only", tag: "non-stop" }
                            ].map(item => (
                              <button
                                key={item.tag}
                                type="button"
                                onClick={() => setFlightPreference(item.tag)}
                                className={`text-[8px] font-black px-2 py-1 rounded border transition-colors ${flightPreference === item.tag ? "bg-[#003580] border-[#003580] text-white" : "bg-white border-gray-200 text-gray-500 hover:border-blue-200"}`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex-1 overflow-y-auto max-h-[460px] pr-1">

                          {/* Popular WAT Filters */}
                          <div className="px-4 py-4 border-b border-gray-100 space-y-2.5">
                            {[
                              { key: "1 Stop", count: 894, checked: flightFilterStops === "1stop", action: () => setFlightFilterStops(flightFilterStops === "1stop" ? "any" : "1stop") },
                              { key: "Hide Nearby Airport Flights", count: 1, checked: hideNearbyAirports, action: () => setHideNearbyAirports(!hideNearbyAirports) },
                              { key: "Refundable Fares", count: 586, checked: refundableOnly, action: () => setRefundableOnly(!refundableOnly) },
                              { key: "Non Stop", count: 4, checked: selectedStopsFilter.nonStop, action: () => setSelectedStopsFilter(p => ({ ...p, nonStop: !p.nonStop })) }
                            ].map(item => (
                              <label key={item.key} className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-2">
                                  <div
                                    onClick={item.action}
                                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${item.checked ? "bg-[#003580] border-[#003580]" : "border-gray-300 bg-white group-hover:border-[#003580]"}`}
                                  >
                                    {item.checked && <Check size={10} className="text-white" strokeWidth={3} />}
                                  </div>
                                  <span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900">{item.key}</span>
                                </div>
                                <span className="text-[9px] text-gray-400 font-extrabold">{item.count}</span>
                              </label>
                            ))}
                          </div>

                          {/* Round-trip Price range slider */}
                          <div className="px-4 py-4 border-b border-gray-100">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2.5">Round-trip Price</h4>
                            <div className="flex justify-between text-[11px] font-extrabold text-[#003580] mb-1.5">
                              <span>₹ 69,900</span>
                              <span>₹ {maxFlightPrice.toLocaleString()}</span>
                            </div>
                            <input
                              type="range"
                              min="69900"
                              max="1082400"
                              step="5000"
                              value={maxFlightPrice}
                              onChange={(e) => setMaxFlightPrice(Number(e.target.value))}
                              className="w-full cursor-pointer"
                              style={{ accentColor: "#003580" }}
                            />
                            <div className="flex justify-between text-[9px] text-gray-400 mt-1 font-bold">
                              <span>Min: ₹ 69,900</span>
                              <span>Max: ₹ 1,082,400</span>
                            </div>
                          </div>

                          {/* Airlines checkboxes */}
                          <div className="px-4 py-4 border-b border-gray-100">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-3">Airlines</h4>
                            <div className="flex flex-col gap-2.5">
                              {[
                                { key: "ita", label: "Oman / LOT Polish", count: 1 },
                                { key: "lufthansa", label: "Air France", count: 108 },
                                { key: "aeroitalia", label: "Air China", count: 1 },
                                { key: "etihad", label: "Air India", count: 6 },
                                { key: "airarabia", label: "Qatar Airways / Vueling", count: 1 }
                              ].map(item => {
                                const checked = flightFilterAirlines[item.key];
                                return (
                                  <label key={item.key} className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex items-center gap-2">
                                      <div
                                        onClick={() => setFlightFilterAirlines(p => ({ ...p, [item.key]: !p[item.key] }))}
                                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checked ? "bg-[#003580] border-[#003580]" : "border-gray-300 bg-white group-hover:border-[#003580]"}`}
                                      >
                                        {checked && <Check size={10} className="text-white" strokeWidth={3} />}
                                      </div>
                                      <span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900">{item.label}</span>
                                    </div>
                                    <span className="text-[9px] text-gray-400 font-extrabold">{item.count}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>

                          {/* Onward Journey Airport selector */}
                          <div className="px-4 py-4 border-b border-gray-100">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-3">Onward Journey (Airports)</h4>
                            <div className="flex flex-col gap-2.5">
                              {[
                                { key: "Ch. De Gaulle", count: 1020 },
                                { key: "Orly", count: 11 }
                              ].map(port => {
                                const checked = selectedOnwardAirports[port.key];
                                return (
                                  <label key={port.key} className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex items-center gap-2">
                                      <div
                                        onClick={() => setSelectedOnwardAirports(p => ({ ...p, [port.key]: !p[port.key] }))}
                                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checked ? "bg-[#003580] border-[#003580]" : "border-gray-300 bg-white group-hover:border-[#003580]"}`}
                                      >
                                        {checked && <Check size={10} className="text-white" strokeWidth={3} />}
                                      </div>
                                      <span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900">{port.key}</span>
                                    </div>
                                    <span className="text-[9px] text-gray-400 font-extrabold">{port.count}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>

                          {/* Return Journey Airport selector */}
                          <div className="px-4 py-4">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-3">Return Journey (Airports)</h4>
                            <div className="flex flex-col gap-2.5">
                              {[
                                { key: "Indira Gandhi International Airport", count: 1030 },
                                { key: "Noida International Airport (71Km)", count: 1 }
                              ].map(port => {
                                const checked = selectedReturnAirports[port.key];
                                return (
                                  <label key={port.key} className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex items-center gap-2">
                                      <div
                                        onClick={() => setSelectedReturnAirports(p => ({ ...p, [port.key]: !p[port.key] }))}
                                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checked ? "bg-[#003580] border-[#003580]" : "border-gray-300 bg-white group-hover:border-[#003580]"}`}
                                      >
                                        {checked && <Check size={10} className="text-white" strokeWidth={3} />}
                                      </div>
                                      <span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900 truncate max-w-[170px] block">{port.key}</span>
                                    </div>
                                    <span className="text-[9px] text-gray-400 font-extrabold">{port.count}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* ── RIGHT COLUMN: Flight Listings ── */}
                      <div className="flex-grow w-full min-w-0 flex flex-col gap-4">

                        {/* Sort Tabs */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-0 border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                          {[
                            { id: "cheapest", label: "Cheapest", meta: "₹ 69,812 | 26h 50m" },
                            { id: "non_stop_first", label: "Non stop first", meta: "₹ 1,04,619 | 10h 35m" },
                            { id: "popular", label: "Popular", meta: "₹ 1,04,619 | 10h 35m" }
                          ].map(tab => (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setFlightSortBy(tab.id)}
                              className={`flex flex-col items-center justify-center py-2.5 px-3 transition-all cursor-pointer border-r border-gray-200 last:border-r-0 ${flightSortBy === tab.id ? "bg-[#003580] text-white" : "bg-white text-gray-600 hover:bg-gray-50/80"}`}
                            >
                              <span className="text-[11px] font-black uppercase tracking-wider">{tab.label}</span>
                              <span className={`text-[9px] font-bold mt-0.5 ${flightSortBy === tab.id ? "text-blue-100" : "text-gray-400"}`}>{tab.meta}</span>
                            </button>
                          ))}
                          <div className="hidden sm:flex items-center justify-center bg-gray-50 border-l border-gray-200 text-[10px] font-extrabold text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors px-2">
                            <span>Other Sort ▾</span>
                          </div>
                        </div>

                        {/* Flights sort context message */}
                        <p className="text-[10px] text-gray-400 font-extrabold flex items-center gap-1">
                          <span>ℹ️</span> Flights sorted by Lowest fares on this route
                        </p>

                        {/* Listings list */}
                        {sortedMMT.length === 0 ? (
                          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-md">
                            <span className="text-3xl block mb-2">✈️</span>
                            <h4 className="font-extrabold text-sm text-gray-800">No flights found matching your filter selections</h4>
                            <p className="text-xs text-gray-400 font-medium mt-1">Try clearing some filters on the left sidebar to show more results.</p>
                          </div>
                        ) : sortedMMT.map(flight => (
                          <div key={flight.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">

                            {/* Card Header & Logos */}
                            <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-50 p-1 border border-gray-200 flex items-center justify-center shrink-0">
                                  <img src={flight.airlineLogo} alt="airline logo" className="max-h-full max-w-full object-contain" />
                                </div>
                                <div>
                                  <h4 className="font-black text-sm text-gray-900 tracking-tight leading-none">{flight.airlines.join(", ")}</h4>
                                  <span className="text-[9px] text-[#003580] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full font-black mt-1 inline-block">
                                    {flight.refundable ? "Refundable Fare" : "Non-Refundable"}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <span className="text-[10px] text-gray-400 font-bold block">per adult</span>
                                  <span className="text-xl font-black text-gray-900">₹ {flight.price.toLocaleString()}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleSelectItem({
                                    ...flight,
                                    name: `${fromCity} → ${toCity} Round-trip`,
                                    price: flight.price,
                                    airline: flight.airlines.join(" + "),
                                    outDep: flight.onwardDep,
                                    outArr: flight.onwardArr,
                                    outFromCode: flight.onwardFrom,
                                    outToCode: flight.onwardTo,
                                    outStops: flight.onwardStops,
                                    outDur: flight.onwardDur,
                                    outFromDate: checkInDate || "Fri, 31 Jul",
                                    outToDate: checkInDate || "Fri, 31 Jul",
                                    retDep: flight.returnDep,
                                    retArr: flight.returnArr,
                                    retFromCode: flight.returnFrom,
                                    retToCode: flight.returnTo,
                                    retStops: flight.returnStops,
                                    retDur: flight.returnDur,
                                    retFromDate: returnDate || "Sat, 1 Aug",
                                    retToDate: returnDate || "Sat, 1 Aug",
                                    class: cabinClass
                                  })}
                                  className="bg-[#003580] hover:bg-blue-900 text-white font-black text-xs px-6 py-2.5 rounded-xl transition-all active:scale-[0.97] cursor-pointer shadow-sm"
                                >
                                  VIEW PRICES
                                </button>
                              </div>
                            </div>

                            {/* Journey Details Legs */}
                            <div className="p-5 space-y-5 bg-gray-50/50">

                              {/* Leg 1: Onward */}
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
                                <div className="col-span-12 sm:col-span-3">
                                  <span className="text-[10px] font-black text-[#003580] uppercase tracking-wider block mb-0.5">Onward Journey</span>
                                  <span className="text-[11px] font-bold text-gray-500">Depart {checkInDate || "31 Jul"} &bull; {flight.onwardAirline}</span>
                                </div>
                                <div className="col-span-12 sm:col-span-9 flex items-center justify-between gap-1.5 sm:gap-4">
                                  <div className="text-left shrink-0">
                                    <span className="text-base font-black text-gray-950 block">{flight.onwardDep}</span>
                                    <span className="text-[10px] text-gray-500 font-bold block max-w-[80px] sm:max-w-[120px] truncate">{flight.onwardFrom}</span>
                                  </div>
                                  <div className="flex-1 flex flex-col items-center px-1 sm:px-4">
                                    <span className="text-[9px] font-black text-gray-500 mb-0.5">{flight.onwardStops}</span>
                                    <div className="w-full flex items-center gap-1.5">
                                      <div className="flex-1 h-px bg-gray-300"></div>
                                      <Plane size={11} className="text-gray-400 rotate-90 shrink-0" />
                                      <div className="flex-1 h-px bg-gray-300"></div>
                                    </div>
                                    <span className="text-[9px] text-gray-400 font-extrabold mt-0.5 whitespace-nowrap">{flight.onwardDur}</span>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="text-base font-black text-gray-950 block">{flight.onwardArr}</span>
                                    <span className="text-[10px] text-gray-500 font-bold block max-w-[80px] sm:max-w-[120px] truncate">{flight.onwardTo}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Leg 2: Return */}
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center pt-4 border-t border-dashed border-gray-200">
                                <div className="col-span-12 sm:col-span-3">
                                  <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider block mb-0.5">Return Journey</span>
                                  <span className="text-[11px] font-bold text-gray-500">Return {returnDate || "1 Aug"} &bull; {flight.returnAirline}</span>
                                </div>
                                <div className="col-span-12 sm:col-span-9 flex items-center justify-between gap-1.5 sm:gap-4">
                                  <div className="text-left shrink-0">
                                    <span className="text-base font-black text-gray-950 block">{flight.returnDep}</span>
                                    <span className="text-[10px] text-gray-500 font-bold block max-w-[80px] sm:max-w-[120px] truncate">{flight.returnFrom}</span>
                                  </div>
                                  <div className="flex-1 flex flex-col items-center px-1 sm:px-4">
                                    <span className="text-[9px] font-black text-gray-500 mb-0.5">{flight.returnStops}</span>
                                    <div className="w-full flex items-center gap-1.5">
                                      <div className="flex-1 h-px bg-gray-300"></div>
                                      <Plane size={11} className="text-gray-400 -rotate-90 shrink-0" />
                                      <div className="flex-1 h-px bg-gray-300"></div>
                                    </div>
                                    <span className="text-[9px] text-gray-400 font-extrabold mt-0.5 whitespace-nowrap">{flight.returnDur}</span>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="text-base font-black text-gray-950 flex items-center justify-end gap-1">
                                      <span>{flight.returnArr}</span>
                                      <span className="text-[9px] text-red-500 font-black">{flight.returnArrDayOffset}</span>
                                    </span>
                                    <span className="text-[10px] text-gray-500 font-bold block max-w-[80px] sm:max-w-[120px] truncate">{flight.returnTo}</span>
                                  </div>
                                </div>
                              </div>

                            </div>

                            {/* Card Footer - Promos & Flight Details link */}
                            <div className="p-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-3 bg-[#fffaf5]">
                              <p className="text-[10px] font-bold text-gray-600 flex items-center gap-1.5">
                                <span className="bg-orange-100 text-orange-700 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">{flight.visaInfo}</span>
                                <span>{flight.discountText}</span>
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setModalFlightItem({
                                    ...flight,
                                    name: `${fromCity} → ${toCity} Round-trip`,
                                    price: flight.price,
                                    airline: flight.airlines.join(" + "),
                                    outDep: flight.onwardDep,
                                    outArr: flight.onwardArr,
                                    outFromCode: flight.onwardFrom,
                                    outToCode: flight.onwardTo,
                                    outStops: flight.onwardStops,
                                    outDur: flight.onwardDur,
                                    outFromDate: checkInDate || "Fri, 31 Jul",
                                    outToDate: checkInDate || "Fri, 31 Jul",
                                    retDep: flight.returnDep,
                                    retArr: flight.returnArr,
                                    retFromCode: flight.returnFrom,
                                    retToCode: flight.returnTo,
                                    retStops: flight.returnStops,
                                    retDur: flight.returnDur,
                                    retFromDate: returnDate || "Sat, 1 Aug",
                                    retToDate: returnDate || "Sat, 1 Aug",
                                    class: cabinClass
                                  });
                                  setSelectedDepartOption("saver");
                                  setSelectedReturnOption("value");
                                  setActiveModalTab("depart");
                                  setPriceDropProtected(false);
                                  setShowFlightDetailsModal(true);
                                }}
                                className="text-[11px] font-black text-[#003580] hover:underline cursor-pointer flex items-center gap-1"
                              >
                                View Flight Details <ChevronRight size={12} />
                              </button>
                            </div>

                          </div>
                        ))}

                        {/* Chat with travel expert card */}
                        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#003580] rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                          <div>
                            <h4 className="font-black text-sm uppercase tracking-wider">Chat with a travel expert now!</h4>
                            <p className="text-[11px] text-blue-200 mt-1 font-semibold">Find the best flights, get visa information and much more...</p>
                          </div>
                          <button
                            onClick={() => setShowChatbot(true)}
                            className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-[11px] font-black px-6 py-2.5 rounded-xl shadow transition-all cursor-pointer"
                          >
                            CHAT NOW
                          </button>
                        </div>

                        {/* Layover Airports recommendations list */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                          <h4 className="font-black text-xs text-gray-400 uppercase tracking-wider mb-4">Find the best layover airport</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                              { code: "SIN", name: "Changi", score: "4.3", text: "Well Maintained", highlight: "Enjoy Shopping" },
                              { code: "AUH", name: "Abu Dhabi Intl", score: "4.2", text: "Well Maintained", highlight: "Comfort Lounges" },
                              { code: "DOH", name: "Doha", score: "4.1", text: "Comfort Lounges", highlight: "Duty Free" }
                            ].map(airport => (
                              <div key={airport.code} className="border border-gray-150 rounded-xl p-3.5 hover:bg-gray-50/50 transition-colors flex flex-col gap-1.5 relative overflow-hidden">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-black text-gray-900">{airport.name}</span>
                                  <span className="bg-green-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">{airport.score}</span>
                                </div>
                                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">{airport.text} &bull; {airport.highlight}</p>
                                <span className="absolute bottom-2 right-2 text-2xl font-black text-gray-100 pointer-events-none select-none">{airport.code}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })()}

              {/* BUSES LISTINGS */}
              {activeTab === "buses" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Sidebar (Filters) */}
                  <>
                  {/* Mobile Filter Toggle Button */}
                  <div className="lg:hidden col-span-1 flex items-center justify-start mt-0 px-2 w-full">
                    <button 
                      onClick={() => setIsMobileFilterOpen(true)}
                      className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-full shadow-md font-bold text-sm hover:bg-gray-50 transition-all cursor-pointer"
                    >
                      <Filter size={16} className="text-blue-600" />
                      Show Filters
                    </button>
                  </div>

                  {/* Mobile overlay */}
                  {isMobileFilterOpen && (
                    <div className="fixed inset-0 bg-black/45 z-[45] lg:hidden" onClick={() => setIsMobileFilterOpen(false)} />
                  )}

                  <div className={`
                    bg-white border-r lg:border border-gray-200 lg:rounded-xl shadow-2xl lg:shadow-sm overflow-hidden text-left
                    fixed top-0 left-0 h-full z-50 w-[300px] transition-transform duration-300 flex flex-col
                    ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:relative lg:top-auto lg:left-auto lg:h-auto lg:z-auto lg:translate-x-0 lg:sticky lg:top-4 lg:col-span-3 lg:shrink-0
                  `}>
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                      <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2"><Filter size={15} className="text-blue-600" /> Filters</h3>
                      <div className="flex items-center gap-3">
                        <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer">Clear All</button>
                        <button onClick={() => setIsMobileFilterOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-800 p-1">
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="overflow-y-auto max-h-[calc(100vh-60px)] lg:max-h-none pb-20 lg:pb-0">

                      {/* Quick Filters */}
                      <div className="p-4 border-b border-gray-100 flex flex-wrap gap-2">
                        {['Free Cancellation (19)', 'AC (105)', 'SLEEPER (62)', 'Single Seats (47)', 'SEATER (99)', 'NONAC (2)', '18:00-24:00 (95)', 'High Rated Buses (86)', 'Live Tracking (54)'].map((filter, idx) => (
                          <div key={idx} className="border border-gray-300 rounded-lg px-3 py-1.5 text-[11px] font-semibold text-gray-800 bg-white hover:bg-gray-50 cursor-pointer flex items-center gap-1.5">
                            {filter.includes('Free Cancellation') && <span className="w-3 h-3 rounded-full border border-gray-600 flex items-center justify-center text-[8px]">₹</span>}
                            {filter.includes('AC') && !filter.includes('NONAC') && <span className="font-bold">♨</span>}
                            {filter.includes('SLEEPER') && <span className="font-bold">⊞</span>}
                            {filter.includes('Single') && <span className="font-bold">💺</span>}
                            {filter.includes('SEATER') && <span className="font-bold">💺</span>}
                            {filter.includes('NONAC') && <span className="font-bold">🚫</span>}
                            {filter.includes('18:00') && <span className="font-bold">🌙</span>}
                            {filter.includes('High Rated') && <span className="font-bold">⭐</span>}
                            {filter.includes('Live') && <span className="font-bold">📍</span>}
                            {filter}
                          </div>
                        ))}
                      </div>

                      {/* Departure Time */}
                      <div className="px-4 py-4 border-b border-gray-100">
                        <h4 className="text-[13px] font-bold text-gray-900 mb-3 flex justify-between items-center">Departure time from source <ChevronUp size={16} className="text-gray-500" /></h4>
                        <div className="flex flex-col gap-3">
                          {[
                            { time: "12:00-18:00", label: "Afternoon", count: 10, icon: "☀️" },
                            { time: "18:00-24:00", label: "Evening", count: 95, icon: "🌅" },
                            { time: "00:00-06:00", label: "Night", count: 2, icon: "🌙" }
                          ].map(t => (
                            <label key={t.time} className="flex items-center justify-between cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <div className="text-gray-500 text-lg">{t.icon}</div>
                                <div>
                                  <div className="text-[13px] font-semibold text-gray-900">{t.time}</div>
                                  <div className="text-[11px] text-gray-500 font-medium">{t.label}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-gray-400 font-medium">{t.count}</span>
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-blue-600" />
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Arrival Time */}
                      <div className="px-4 py-4 border-b border-gray-100">
                        <h4 className="text-[13px] font-bold text-gray-900 mb-3 flex justify-between items-center">Arrival time at destination <ChevronUp size={16} className="text-gray-500" /></h4>
                        <div className="flex flex-col gap-3">
                          {[
                            { time: "06:00-12:00", label: "Morning", count: 26, icon: "🌅" },
                            { time: "18:00-24:00", label: "Evening", count: 21, icon: "🌆" },
                            { time: "00:00-06:00", label: "Night", count: 60, icon: "🌙" }
                          ].map(t => (
                            <label key={t.time} className="flex items-center justify-between cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <div className="text-gray-500 text-lg">{t.icon}</div>
                                <div>
                                  <div className="text-[13px] font-semibold text-gray-900">{t.time}</div>
                                  <div className="text-[11px] text-gray-500 font-medium">{t.label}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-gray-400 font-medium">{t.count}</span>
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-blue-600" />
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Bus Type */}
                      <div className="px-4 py-4 border-b border-gray-100">
                        <h4 className="text-[13px] font-bold text-gray-900 mb-3 flex justify-between items-center">Bus type <ChevronUp size={16} className="text-gray-500" /></h4>
                        <div className="flex flex-col gap-3">
                          {[
                            { label: "AC", count: 105, icon: "♨" },
                            { label: "NONAC", count: 2, icon: "🚫" },
                            { label: "SEATER", count: 99, icon: "💺" },
                            { label: "SLEEPER", count: 62, icon: "⊞" }
                          ].map(t => (
                            <label key={t.label} className="flex items-center justify-between cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <div className="text-gray-500 text-lg w-5 text-center">{t.icon}</div>
                                <div className="text-[13px] font-semibold text-gray-900">{t.label}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-gray-400 font-medium">{t.count}</span>
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-blue-600" />
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="px-4 py-4 border-b border-gray-100">
                        <h4 className="text-[13px] font-bold text-gray-900 mb-3 flex justify-between items-center">Amenities <ChevronUp size={16} className="text-gray-500" /></h4>
                        <div className="bg-gray-50 rounded-lg p-2 mb-3">
                          <input type="text" placeholder="Search amenities" className="bg-transparent border-none outline-none text-xs w-full text-gray-700" />
                        </div>
                        <div className="flex flex-col gap-3 mb-3">
                          {[
                            { label: "WIFI", count: 4, icon: "📶" },
                            { label: "Water Bottle", count: 57, icon: "💧" },
                            { label: "Blankets", count: 53, icon: "🛌" },
                            { label: "Charging Point", count: 72, icon: "🔌" }
                          ].map(t => (
                            <label key={t.label} className="flex items-center justify-between cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <div className="text-gray-500 text-lg w-5 text-center">{t.icon}</div>
                                <div className="text-[13px] font-semibold text-gray-900">{t.label}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-gray-400 font-medium">{t.count}</span>
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-blue-600" />
                              </div>
                            </label>
                          ))}
                        </div>
                        <button className="text-[12px] font-bold text-gray-900 hover:underline">View all amenities</button>
                      </div>

                      {/* RTC Bus Type */}
                      <div className="px-4 py-4">
                        <h4 className="text-[13px] font-bold text-gray-900 mb-3 flex justify-between items-center">RTC bus type <ChevronUp size={16} className="text-gray-500" /></h4>
                        <div className="flex flex-col gap-3">
                          {[
                            { label: "ELECTRIC", count: 6 },
                            { label: "ORDINARY", count: 2 },
                            { label: "PREMIUM SUPERFAST", count: 1 },
                            { label: "SMART AC", count: 10 }
                          ].map(t => (
                            <label key={t.label} className="flex items-center justify-between cursor-pointer group">
                              <div className="text-[12px] font-semibold text-gray-900">{t.label}</div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-gray-400 font-medium">{t.count}</span>
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-blue-600" />
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      </div>
                    </div>
                  </>
                  {/* Main Content (Bus List) */}
                  <div className="lg:col-span-9 flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Available Buses</h2>
                    {BUSES_DATABASE.map(bus => (
                      <div key={bus.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">{bus.operator}</h3>
                          <p className="text-sm text-gray-500 mb-2">{bus.type}</p>
                          <div className="flex items-center gap-4 text-sm font-semibold text-gray-700">
                            <div><span className="text-gray-400">Dep</span> {bus.dep}</div>
                            <div className="text-gray-300">-- {bus.dur} --</div>
                            <div><span className="text-gray-400">Arr</span> {bus.arr}</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-4 min-w-[150px]">
                          <div className="text-right">
                            <div className="text-2xl font-black text-gray-900">₹{bus.price}</div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase">{bus.seats} Seats Left</div>
                          </div>
                          <button 
                            onClick={() => { setSelectedItem(bus); setView("details"); window.scrollTo(0, 0); }}
                            className="bg-[#e8731a] hover:bg-[#c4601a] text-white font-bold py-2 px-6 rounded-lg w-full md:w-auto mt-3 transition-colors"
                          >
                            SELECT SEATS
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CARS LISTINGS */}
              {activeTab === "cars" && (() => {
                const activeCabTypes = Object.entries(cabTypeFilters).filter(([, v]) => v).map(([k]) => k.toLowerCase());
                const activeCabModels = Object.entries(cabModelFilters).filter(([, v]) => v).map(([k]) => k.toLowerCase());
                const activeFuelTypes = Object.entries(fuelTypeFilters).filter(([, v]) => v).map(([k]) => k.toLowerCase());

                const filteredCars = CARS_DATABASE.filter(c => {
                  if (activeCabTypes.length > 0 && !activeCabTypes.includes(c.type.toLowerCase())) return false;
                  if (activeCabModels.length > 0 && !activeCabModels.includes(c.name.toLowerCase())) return false;
                  if (activeFuelTypes.length > 0 && !c.fuelType.toLowerCase().split("/").some(ft => activeFuelTypes.includes(ft))) return false;
                  return true;
                });

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Sidebar */}
                    <>
                    {/* Mobile Filter Toggle Button */}
                    <div className="lg:hidden col-span-1 flex items-center justify-start mt-0 px-2 w-full">
                      <button 
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-full shadow-md font-bold text-sm hover:bg-gray-50 transition-all cursor-pointer"
                      >
                        <Filter size={16} className="text-[#e8731a]" />
                        Show Filters
                      </button>
                    </div>

                    {/* Mobile overlay */}
                    {isMobileFilterOpen && (
                      <div className="fixed inset-0 bg-black/45 z-[45] lg:hidden" onClick={() => setIsMobileFilterOpen(false)} />
                    )}

                    <div className={`
                      bg-white border-r lg:border border-gray-200 lg:rounded-xl shadow-2xl lg:shadow-sm overflow-hidden text-left
                      fixed top-0 left-0 h-full z-50 w-[300px] transition-transform duration-300 flex flex-col
                      ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"}
                      lg:relative lg:top-auto lg:left-auto lg:h-auto lg:z-auto lg:translate-x-0 lg:sticky lg:top-4 lg:col-span-3 lg:shrink-0
                    `}>
                      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2"><Filter size={15} className="text-[#e8731a]" /> Filters</h3>
                        <div className="flex items-center gap-3">
                          <button onClick={() => { setCabTypeFilters({}); setCabModelFilters({}); setFuelTypeFilters({}); }} className="text-[11px] font-bold text-[#e8731a] hover:text-[#c4601a] cursor-pointer">CLEAR ALL</button>
                          <button onClick={() => setIsMobileFilterOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-800 p-1">
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="overflow-y-auto max-h-[calc(100vh-60px)] lg:max-h-none pb-20 lg:pb-0">
                        {/* Cab Type */}
                        <div className="px-4 py-4 border-b border-gray-100">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Cab Type</h4>
                            <button onClick={() => setCabTypeFilters({})} className="text-[10px] font-bold text-[#e8731a] hover:text-[#c4601a] cursor-pointer">CLEAR</button>
                          </div>
                          <div className="flex flex-col gap-2">
                            {["Hatchback", "Sedan", "SUV", "Compactsuv"].map(type => {
                              const count = CARS_DATABASE.filter(c => c.type === type).length;
                              if (count === 0) return null;
                              return (
                                <label key={type} className="flex items-center justify-between cursor-pointer group">
                                  <div className="flex items-center gap-2">
                                    <div onClick={() => setCabTypeFilters(p => ({ ...p, [type]: !p[type] }))} className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${cabTypeFilters[type] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"}`}>
                                      {cabTypeFilters[type] && <Check size={10} className="text-white" strokeWidth={3} />}
                                    </div>
                                    <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{type}</span>
                                  </div>
                                  <span className="text-[10px] text-gray-400 font-bold">({count})</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                        {/* Cab Model */}
                        <div className="px-4 py-4 border-b border-gray-100">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Cab Model</h4>
                            <button onClick={() => setCabModelFilters({})} className="text-[10px] font-bold text-[#e8731a] hover:text-[#c4601a] cursor-pointer">CLEAR</button>
                          </div>
                          <div className="flex flex-col gap-2">
                            {[...new Set(CARS_DATABASE.map(c => c.name))].map(model => {
                              const count = CARS_DATABASE.filter(c => c.name === model).length;
                              return (
                                <label key={model} className="flex items-center justify-between cursor-pointer group">
                                  <div className="flex items-center gap-2">
                                    <div onClick={() => setCabModelFilters(p => ({ ...p, [model]: !p[model] }))} className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${cabModelFilters[model] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"}`}>
                                      {cabModelFilters[model] && <Check size={10} className="text-white" strokeWidth={3} />}
                                    </div>
                                    <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{model}</span>
                                  </div>
                                  <span className="text-[10px] text-gray-400 font-bold">({count})</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                        {/* Fuel Type */}
                        <div className="px-4 py-4 border-b border-gray-100">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Fuel Type</h4>
                            <button onClick={() => setFuelTypeFilters({})} className="text-[10px] font-bold text-[#e8731a] hover:text-[#c4601a] cursor-pointer">CLEAR</button>
                          </div>
                          <div className="flex flex-col gap-2">
                            {["Cng", "Electric", "Diesel"].map(type => {
                              const count = CARS_DATABASE.filter(c => c.fuelType.toLowerCase().includes(type.toLowerCase())).length;
                              if (count === 0) return null;
                              return (
                                <label key={type} className="flex items-center justify-between cursor-pointer group">
                                  <div className="flex items-center gap-2">
                                    <div onClick={() => setFuelTypeFilters(p => ({ ...p, [type]: !p[type] }))} className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${fuelTypeFilters[type] ? "bg-[#e8731a] border-[#e8731a]" : "border-gray-300 bg-white group-hover:border-[#e8731a]"}`}>
                                      {fuelTypeFilters[type] && <Check size={10} className="text-white" strokeWidth={3} />}
                                    </div>
                                    <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{type}</span>
                                  </div>
                                  <span className="text-[10px] text-gray-400 font-bold">({count})</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                        {/* Trust Badges */}
                        <div className="px-4 py-4 bg-gray-50 flex flex-col gap-3 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-700"><ShieldCheck size={16} className="text-green-600" /> Trusted Drivers</div>
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-700"><Star size={16} className="text-blue-500" /> Clean Cabs</div>
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-700"><Clock size={16} className="text-[#e8731a]" /> On-Time Pickup</div>
                        </div>
                      </div>
                    </div>
                    </>

                    {/* Right Results Pane */}
                    <div className="lg:col-span-9 flex flex-col gap-4">
                      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center lg:text-left">
                        <h2 className="text-sm font-extrabold text-gray-800">Rates for 142 Kms approx distance | 3 hr(s) approx time</h2>
                      </div>

                      {filteredCars.map((c, idx) => (
                        <React.Fragment key={c.id}>
                          {idx === 2 && (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <Tag size={24} className="text-blue-600" />
                                <div>
                                  <div className="text-sm font-black text-gray-900">Get Up to Rs. 1000 Off</div>
                                  <div className="text-xs text-gray-600 font-medium mt-0.5">Use coupon code: <span className="font-bold text-blue-700">MMTDELIGHT</span></div>
                                </div>
                              </div>
                              <span className="bg-[#e8731a] text-white text-[10px] font-bold px-2 py-1 rounded-md tracking-wide">Limited Time Offer!</span>
                            </div>
                          )}
                          <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row relative">
                            {c.isNew && <div className="absolute top-0 left-0 bg-red-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-tl-xl rounded-br-lg z-10">NEW</div>}

                            {/* Cab Details Left */}
                            <div className="flex-1 p-5 flex flex-col sm:flex-row gap-5 border-b sm:border-b-0 sm:border-r border-gray-100">
                              <div className="w-24 h-16 sm:w-32 sm:h-20 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                                <Car size={32} className="text-gray-300" />
                              </div>

                              <div className="flex flex-col justify-center flex-1 text-center sm:text-left">
                                <h3 className="font-black text-lg text-gray-900 leading-tight">{c.name}</h3>
                                <div className="text-[11px] font-bold text-gray-500 mt-1 mb-2.5">{c.fuelType}</div>

                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] font-semibold text-gray-600">
                                  <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">{c.modelType}</span>
                                  {c.rating && <span className="flex items-center gap-0.5 text-white bg-[#0f7a3f] px-1.5 py-1 rounded"><Star size={10} fill="currentColor" /> {c.rating}/5</span>}
                                  {c.ac && <span className="flex items-center gap-1"><Snowflake size={12} /> AC</span>}
                                  {c.seats && <span className="flex items-center gap-1"><Users size={12} /> {c.seats} Seats</span>}
                                </div>
                              </div>
                            </div>

                            {/* Pricing Right */}
                            <div className="p-5 w-full sm:w-[220px] shrink-0 flex flex-col justify-center bg-gray-50/50 rounded-b-xl sm:rounded-none sm:rounded-r-xl relative">
                              {c.discountPercent && <div className="absolute top-3 right-3 text-[10px] font-bold text-[#0f7a3f] bg-green-50 px-1.5 py-0.5 rounded border border-green-200">{c.discountPercent}</div>}

                              <div className="flex items-end justify-center sm:justify-start gap-2 mb-0.5 mt-2 sm:mt-0">
                                <span className="text-2xl font-black text-gray-900 leading-none">₹ {c.discountPrice.toLocaleString()}</span>
                                {c.originalPrice !== c.discountPrice && <span className="text-xs font-bold text-gray-400 line-through mb-0.5">₹ {c.originalPrice.toLocaleString()}</span>}
                              </div>
                              <div className="text-[10px] font-bold text-gray-500 mb-4 text-center sm:text-left">+ ₹{c.taxes} (Taxes & Charges)</div>

                              <button
                                onClick={() => handleSelectItem({ ...c, price: c.discountPrice + c.taxes })}
                                className="w-full bg-gradient-to-r from-[#008cff] to-[#0055ff] hover:from-[#0070cc] hover:to-[#0044cc] text-white font-black text-xs py-3 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
                              >
                                SELECT CAB
                              </button>
                            </div>
                          </div>

                          {/* Add-on below card if exists */}
                          {c.addOn && (
                            <div className="mx-4 sm:mx-6 -mt-5 relative z-[-1] bg-blue-50/50 border border-blue-100 border-t-0 rounded-b-xl px-4 py-2 pt-5 flex items-center gap-2">
                              <PlusCircle size={14} className="text-[#008cff]" />
                              <span className="text-[11px] font-bold text-gray-700">{c.addOn}</span>
                            </div>
                          )}
                        </React.Fragment>
                      ))}

                      {filteredCars.length === 0 && (
                        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm w-full">
                          <p className="text-sm font-bold text-gray-500 mb-2">No cabs match your filters</p>
                          <button type="button" onClick={() => { setCabTypeFilters({}); setCabModelFilters({}); setFuelTypeFilters({}); }} className="text-[12px] font-bold text-[#e8731a] hover:text-[#c4601a] underline cursor-pointer">Clear all filters</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* ATTRACTIONS LISTINGS */}
              {activeTab === "attractions" && (
                <div className="flex flex-col gap-5">
                  {searchResults.map((attr) => (
                    <div key={attr.id} className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-5 p-4">
                      {/* Image */}
                      <div className="w-full md:w-[220px] h-[160px] shrink-0 rounded-lg overflow-hidden">
                        <img src={attr.image} alt={attr.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Details */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <h4
                              onClick={() => handleSelectItem(attr)}
                              className="font-black text-base sm:text-lg text-[#003580] hover:text-blue-900 cursor-pointer"
                            >
                              {attr.name}
                            </h4>
                            <div className="flex items-center gap-1 bg-[#003580] text-white font-bold text-[10px] px-2 py-0.5 rounded">
                              <span>{attr.rating}</span>
                              <span className="text-white/60 font-semibold">{attr.ratingText}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold mt-1">
                            <Clock size={11} />
                            <span>{attr.duration}</span>
                            <span className="mx-2">&bull;</span>
                            <MapPin size={11} />
                            <span>{attr.city}</span>
                          </div>

                          <p className="text-gray-500 text-[11px] font-medium mt-2 line-clamp-2 leading-relaxed">
                            {attr.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {attr.benefits.map((b, idx) => (
                              <span key={idx} className="bg-blue-50 border border-blue-150 text-[#003580] font-extrabold text-[9px] uppercase px-2 py-0.5 rounded flex items-center gap-0.5">
                                <Check size={10} /> {b}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-end justify-between border-t border-gray-100 pt-4 mt-4">
                          <div>
                            <span className="text-[10px] text-gray-400 font-black block">Price per ticket</span>
                            <span className="text-lg font-black text-gray-900">₹{attr.price.toLocaleString()}</span>
                            <span className="text-[10px] text-gray-450 block">Includes free audio guide</span>
                          </div>
                          <button
                            onClick={() => handleSelectItem(attr)}
                            className="bg-[#003580] hover:bg-blue-900 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all active:scale-95"
                          >
                            Book Tickets
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TRAINS LISTINGS */}
              {activeTab === "trains" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">

                  {/* Left Sidebar (Only for standard tickets search) */}
                  {trainSubTab !== "live" && trainSubTab !== "pnr" && (
                    <>
                    {/* Mobile Filter Toggle Button */}
                    <div className="lg:hidden col-span-1 flex items-center justify-start mt-0 px-2 w-full">
                      <button 
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-full shadow-md font-bold text-sm hover:bg-gray-50 transition-all cursor-pointer"
                      >
                        <Filter size={16} className="text-[#003580]" />
                        Show Filters
                      </button>
                    </div>

                    {/* Mobile overlay */}
                    {isMobileFilterOpen && (
                      <div className="fixed inset-0 bg-black/45 z-[45] lg:hidden" onClick={() => setIsMobileFilterOpen(false)} />
                    )}

                    <div className={`
                      bg-white border-r lg:border border-gray-200 lg:rounded-xl shadow-2xl lg:shadow-sm overflow-hidden text-left
                      fixed top-0 left-0 h-full z-50 w-[300px] transition-transform duration-300 flex flex-col
                      ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"}
                      lg:relative lg:top-auto lg:left-auto lg:h-auto lg:z-auto lg:translate-x-0 lg:sticky lg:top-4 lg:col-span-3 lg:shrink-0
                    `}>
                      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2"><Filter size={15} className="text-[#003580]" /> Filters</h3>
                        <div className="flex items-center gap-3">
                          <button onClick={() => { setTrainTypeFilter({ rajdhani: false, shatabdi: false, mailExpress: false }); setTrainClassFilter({ ac3: false, ac2: false, ac1: false, sleeper: false }); setTrainDepTimeFilter({ morning: false, afternoon: false, evening: false, night: false }); }} className="text-[11px] font-bold text-[#003580] hover:underline cursor-pointer border-none bg-transparent">CLEAR ALL</button>
                          <button onClick={() => setIsMobileFilterOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-800 p-1">
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="overflow-y-auto max-h-[calc(100vh-60px)] lg:max-h-none pb-20 lg:pb-0">

                        {/* Quota */}
                        <div className="px-4 py-4 border-b border-gray-100">
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Booking Quota</label>
                          <select
                            value={trainQuota}
                            onChange={(e) => setTrainQuota(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg p-2 text-xs font-bold text-gray-800 bg-gray-50 outline-none"
                          >
                            <option>General Quota</option>
                            <option>Ladies Quota</option>
                            <option>Tatkal Quota</option>
                          </select>
                        </div>

                        {/* Train Type */}
                        <div className="px-4 py-4 border-b border-gray-100">
                          <h4 className="text-[11px] font-black text-gray-450 uppercase tracking-wider mb-3">Train Type</h4>
                          <div className="flex flex-col gap-2">
                            {[
                              { id: "rajdhani", label: "Rajdhani Express" },
                              { id: "shatabdi", label: "Shatabdi Express" },
                              { id: "mailExpress", label: "Mail / Express / Duronto" }
                            ].map(type => (
                              <label key={type.id} className="flex items-center gap-2 cursor-pointer group">
                                <div onClick={() => setTrainTypeFilter(p => ({ ...p, [type.id]: !p[type.id] }))} className={`w-4 h-4 rounded border border-gray-300 flex items-center justify-center transition-all ${trainTypeFilter[type.id] ? "bg-[#003580] border-[#003580]" : "bg-white group-hover:border-[#003580]"}`}>
                                  {trainTypeFilter[type.id] && <Check size={10} className="text-white" strokeWidth={3} />}
                                </div>
                                <span className="text-[12px] text-gray-700 font-semibold">{type.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Class */}
                        <div className="px-4 py-4 border-b border-gray-100">
                          <h4 className="text-[11px] font-black text-gray-450 uppercase tracking-wider mb-3">Class</h4>
                          <div className="flex flex-col gap-2">
                            {[
                              { id: "ac1", label: "AC First Class (1A)" },
                              { id: "ac2", label: "AC 2 Tier (2A)" },
                              { id: "ac3", label: "AC 3 Tier (3A)" },
                              { id: "sleeper", label: "Sleeper Class (SL)" }
                            ].map(cls => (
                              <label key={cls.id} className="flex items-center gap-2 cursor-pointer group">
                                <div onClick={() => setTrainClassFilter(p => ({ ...p, [cls.id]: !p[cls.id] }))} className={`w-4 h-4 rounded border border-gray-300 flex items-center justify-center transition-all ${trainClassFilter[cls.id] ? "bg-[#003580] border-[#003580]" : "bg-white group-hover:border-[#003580]"}`}>
                                  {trainClassFilter[cls.id] && <Check size={10} className="text-white" strokeWidth={3} />}
                                </div>
                                <span className="text-[12px] text-gray-700 font-semibold">{cls.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Departure Time */}
                        <div className="px-4 py-4">
                          <h4 className="text-[11px] font-black text-gray-450 uppercase tracking-wider mb-3">Departure Time</h4>
                          <div className="flex flex-col gap-2">
                            {[
                              { id: "morning", label: "Morning (6 AM - 12 PM)" },
                              { id: "afternoon", label: "Afternoon (12 PM - 6 PM)" },
                              { id: "evening", label: "Evening / Night (After 6 PM)" }
                            ].map(time => (
                              <label key={time.id} className="flex items-center gap-2 cursor-pointer group">
                                <div onClick={() => setTrainDepTimeFilter(p => ({ ...p, [time.id]: !p[time.id] }))} className={`w-4 h-4 rounded border border-gray-300 flex items-center justify-center transition-all ${trainDepTimeFilter[time.id] ? "bg-[#003580] border-[#003580]" : "bg-white group-hover:border-[#003580]"}`}>
                                  {trainDepTimeFilter[time.id] && <Check size={10} className="text-white" strokeWidth={3} />}
                                </div>
                                <span className="text-[12px] text-gray-700 font-semibold">{time.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                      </div>
                    </>
                  )}

                  {/* Right Results Pane */}
                  <div className={trainSubTab === "live" || trainSubTab === "pnr" ? "lg:col-span-12 flex flex-col gap-5" : "lg:col-span-9 flex flex-col gap-4"}>

                    {/* SPOT RUNNING STATUS RESULT VIEW */}
                    {trainSubTab === "live" && spotResult && (
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
                          <div>
                            <h3 className="font-black text-lg text-gray-900 font-[Unbounded]">{spotResult.name} ({spotResult.number})</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Live running status</p>
                          </div>
                          <span className="bg-orange-50 border border-orange-100 text-orange-600 font-extrabold text-[10px] uppercase px-3 py-1 rounded-md">
                            {spotResult.status}
                          </span>
                        </div>

                        {/* Timeline status track */}
                        <div className="relative pl-6 space-y-6">
                          <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
                          {spotResult.timeline.map((step, sIdx) => (
                            <div key={sIdx} className="relative flex gap-4 items-start">
                              <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center border-2 ${step.status === "current"
                                  ? "bg-orange-500 border-orange-500 text-white animate-pulse"
                                  : step.status === "completed"
                                    ? "bg-emerald-500 border-emerald-500 text-white"
                                    : "bg-white border-gray-300 text-gray-400"
                                }`}>
                                {step.status === "completed" ? <Check size={10} className="stroke-[3px]" /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>}
                              </div>
                              <div>
                                <h4 className={`text-xs font-black ${step.status === "current" ? "text-orange-600" : "text-gray-800"}`}>
                                  {step.station}
                                </h4>
                                <p className="text-[10px] text-gray-400 font-bold mt-0.5">Time: {step.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PNR STATUS CHECK RESULT VIEW */}
                    {trainSubTab === "pnr" && pnrResult && (
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
                          <div>
                            <h3 className="font-black text-lg text-gray-900 font-[Unbounded]">PNR: {pnrResult.pnr}</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{pnrResult.trainName}</p>
                          </div>
                          <span className="text-[10px] font-bold text-gray-500">Date of Journey: {pnrResult.dateOfJourney}</span>
                        </div>

                        {/* Passenger Details */}
                        <div className="bg-gray-50 border border-gray-150 rounded-xl p-4 space-y-2 text-left">
                          <span className="text-[10px] text-gray-450 font-black block uppercase tracking-wider">Passenger status</span>
                          {pnrResult.passengers.map((p, pIdx) => (
                            <div key={pIdx} className="flex justify-between items-center text-xs font-bold text-gray-850">
                              <span>{p.name} (Age {p.age})</span>
                              <span className="text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                                {p.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STANDARD TRAIN SEARCH LISTINGS / EURAIL PASS CARDS */}
                    {trainSubTab !== "live" && trainSubTab !== "pnr" && getFilteredTrains().map((train) => (
                      <div key={train.id} className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2 flex-grow">
                          <div className="flex items-center gap-2">
                            <span className="bg-orange-50 border border-orange-100 text-orange-600 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded flex items-center gap-0.5">
                              <Train size={10} /> {train.id === "eurail-pass-item" ? "Eurail Approved" : "IRCTC Approved"}
                            </span>
                            {train.id !== "eurail-pass-item" && (
                              <span className="text-[10px] text-gray-400 font-black">Train No: {train.id === "t-dyn-1" ? "12901" : train.id === "t-dyn-2" ? "12902" : "12952"}</span>
                            )}
                          </div>
                          <h4 className="font-black text-lg text-gray-900 font-[Unbounded]">
                            {train.name}
                          </h4>

                          {train.id === "eurail-pass-item" ? (
                            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                              Unlimited train travel pass across European rail networks. Validity: <strong>{train.validity}</strong>.
                            </p>
                          ) : (
                            <div className="grid grid-cols-3 gap-6 pt-2 max-w-md">
                              <div>
                                <span className="block text-xs font-bold text-gray-450 uppercase">DEPART</span>
                                <span className="block text-base font-black text-gray-800">{train.depart}</span>
                                <span className="block text-[10px] text-gray-400 font-semibold">{train.from}</span>
                              </div>
                              <div className="text-center flex flex-col items-center justify-center">
                                <span className="text-[10px] text-gray-400 font-black block">{train.duration}</span>
                                <div className="w-16 h-px bg-gray-300 my-1 relative">
                                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-400" />
                                </div>
                                <span className="text-[9px] text-gray-450 font-bold block">Direct</span>
                              </div>
                              <div className="text-right">
                                <span className="block text-xs font-bold text-gray-450 uppercase">ARRIVE</span>
                                <span className="block text-base font-black text-gray-800">{train.arrive}</span>
                                <span className="block text-[10px] text-gray-400 font-semibold">{train.to}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="border-t md:border-t-0 md:border-l border-gray-150 pt-4 md:pt-0 md:pl-6 shrink-0 text-left md:text-right flex flex-col justify-between h-full min-h-[90px] w-full md:w-auto">
                          <div>
                            <span className="text-[9px] text-gray-400 font-black block">Class: {train.class}</span>
                            <span className="text-2xl font-black text-gray-950 font-[Unbounded]">₹{train.price.toLocaleString()}</span>
                            <span className="text-[9px] text-gray-400 block font-semibold">Includes Reservation Fee</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedItem(train);
                              setView("details");
                            }}
                            className="bg-[#003580] hover:bg-blue-900 text-white font-bold text-xs px-5 py-2.5 rounded-lg cursor-pointer transition-all active:scale-95 mt-3 w-full md:w-auto text-center"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}

                    {trainSubTab !== "live" && trainSubTab !== "pnr" && getFilteredTrains().length === 0 && (
                      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm w-full">
                        <p className="text-sm font-bold text-gray-500 mb-2">No trains match your filters</p>
                        <button type="button" onClick={() => { setTrainTypeFilter({ rajdhani: false, shatabdi: false, mailExpress: false }); setTrainClassFilter({ ac3: false, ac2: false, ac1: false, sleeper: false }); setTrainDepTimeFilter({ morning: false, afternoon: false, evening: false, night: false }); }} className="text-[12px] font-bold text-[#003580] hover:underline cursor-pointer bg-transparent border-none">Clear all filters</button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* HOLIDAYS LISTINGS */}
              {activeTab === "holidays" && (() => {
                const destKey = holidayGoingTo.toLowerCase().trim();
                const baseFiltered = HOLIDAYS_DATABASE.filter(pkg => {
                  const matchesSearch = !destKey || pkg.name.toLowerCase().includes(destKey) || pkg.destinations.toLowerCase().includes(destKey);
                  const matchesTheme = holidayActiveTheme === "all" || pkg.theme === holidayActiveTheme;
                  return matchesSearch && matchesTheme;
                });

                // Apply dynamic price mapping for Tour Type before budget checks
                let displayHolidays = baseFiltered.map(pkg => {
                  const displayPrice = selectedTourType === "group" ? Math.round(pkg.price * 0.85) : pkg.price;
                  const discountPercent = Math.round(((pkg.originalPrice - displayPrice) / pkg.originalPrice) * 100);
                  return { ...pkg, displayPrice, discountPercent };
                });

                // Apply sidebar / top horizontal filters:
                displayHolidays = displayHolidays.filter(pkg => {
                  // Duration filter (from sidebar or top bar)
                  // Top bar duration filter
                  if (holidayFilterDuration === "upTo3") return pkg.nights <= 3;
                  if (holidayFilterDuration === "4to6") return pkg.nights >= 4 && pkg.nights <= 6;
                  if (holidayFilterDuration === "7to10") return pkg.nights >= 7 && pkg.nights <= 10;
                  if (holidayFilterDuration === "11to15") return pkg.nights >= 11 && pkg.nights <= 15;
                  if (holidayFilterDuration === "above16") return pkg.nights >= 16;

                  // Sidebar duration filter
                  if (holidayDurationFilter === "short") return pkg.nights <= 4;
                  if (holidayDurationFilter === "long") return pkg.nights >= 5;
                  return true;
                }).filter(pkg => {
                  // Hotel Star filter
                  if (holidayFilterHotelStar === "5star") return pkg.hotelStar === 5;
                  if (holidayFilterHotelStar === "4star") return pkg.hotelStar === 4;
                  if (holidayFilterHotelStar === "upTo3star") return pkg.hotelStar <= 3;
                  return true;
                }).filter(pkg => {
                  // Transportation filter
                  if (holidayFilterTrans === "bus") return pkg.transType === "bus";
                  if (holidayFilterTrans === "landOnly") return pkg.transType === "landOnly";
                  if (holidayFilterTrans === "flightOptional") return pkg.transType === "flightOptional";
                  return true;
                }).filter(pkg => {
                  // Themes filter
                  if (holidayFilterThemes === "adventure") return pkg.theme.toLowerCase() === "adventure";
                  if (holidayFilterThemes === "affordable") return pkg.displayPrice <= 25000;
                  if (holidayFilterThemes === "exotic") return pkg.theme.toLowerCase() === "honeymoon" || pkg.theme.toLowerCase() === "beach";
                  if (holidayFilterThemes === "group") return selectedTourType === "group";
                  if (holidayFilterThemes === "romantic") return pkg.theme.toLowerCase() === "honeymoon";
                  if (holidayFilterThemes === "sightseeing") return pkg.inclusions.includes("sightseeing");
                  if (holidayFilterThemes === "van") return pkg.transType === "landOnly" || pkg.transType === "bus";
                  return true;
                }).filter(pkg => {
                  // Price range filter (from sidebar or top bar)
                  // Top bar price range filter
                  if (holidayFilterPriceRange === "upTo20k") return pkg.displayPrice <= 20000;
                  if (holidayFilterPriceRange === "20to30k") return pkg.displayPrice >= 20000 && pkg.displayPrice <= 30000;
                  if (holidayFilterPriceRange === "30to40k") return pkg.displayPrice >= 30000 && pkg.displayPrice <= 40000;
                  if (holidayFilterPriceRange === "40to50k") return pkg.displayPrice >= 40000 && pkg.displayPrice <= 50000;
                  if (holidayFilterPriceRange === "50to75k") return pkg.displayPrice >= 50000 && pkg.displayPrice <= 75000;
                  if (holidayFilterPriceRange === "75to100k") return pkg.displayPrice >= 75000 && pkg.displayPrice <= 100000;
                  if (holidayFilterPriceRange === "above100k") return pkg.displayPrice >= 100000;

                  // Sidebar budget filter
                  if (holidayBudgetFilter === "under20k") return pkg.displayPrice < 20000;
                  if (holidayBudgetFilter === "20to40k") return pkg.displayPrice >= 20000 && pkg.displayPrice <= 40000;
                  if (holidayBudgetFilter === "over40k") return pkg.displayPrice > 40000;
                  return true;
                });

                // Apply Sorting
                displayHolidays.sort((a, b) => {
                  if (holidaySortBy === "duration") {
                    return a.nights - b.nights;
                  }
                  if (holidaySortBy === "price_low") {
                    return a.displayPrice - b.displayPrice;
                  }
                  if (holidaySortBy === "price_high") {
                    return b.displayPrice - a.displayPrice;
                  }
                  if (holidaySortBy === "recent") {
                    return new Date(b.dateAdded) - new Date(a.dateAdded);
                  }
                  // default: popular
                  return b.popularity - a.popularity;
                });

                return (
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-start w-full text-left">
                    {/* sticky top horizontal filter bar */}
                    <div className="xl:col-span-12 bg-white border border-gray-205 rounded-2xl p-4 sm:p-5 shadow-sm text-left flex flex-col gap-4">
                      {/* 1. Header Search Bar */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
                        {/* Destination */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Destination</label>
                          <select
                            value={holidayGoingTo}
                            onChange={(e) => setHolidayGoingTo(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg p-2 text-xs font-bold text-gray-800 bg-transparent"
                          >
                            <option value="">All Destinations</option>
                            <option value="Kashmir">Kashmir</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Goa">Goa</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Himachal">Himachal</option>
                            <option value="Dubai">Dubai</option>
                            <option value="France">France</option>
                          </select>
                        </div>

                        {/* Departure city */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Departure City</label>
                          <select
                            value={holidayDepart}
                            onChange={(e) => setHolidayDepart(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg p-2 text-xs font-bold text-gray-800 bg-transparent"
                          >
                            <option value="Delhi">New Delhi</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Bangalore">Bangalore</option>
                          </select>
                        </div>

                        {/* Month */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Month</label>
                          <select
                            value={holidayMonth}
                            onChange={(e) => setHolidayMonth(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg p-2 text-xs font-bold text-gray-800 bg-transparent"
                          >
                            <option value="July 2026">July 2026</option>
                            <option value="November 2026">November 2026</option>
                            <option value="December 2026">December 2026</option>
                          </select>
                        </div>

                        {/* Reset Filters */}
                        <div className="flex justify-end pt-3">
                          <button
                            type="button"
                            onClick={() => {
                              setHolidayGoingTo("");
                              setHolidayDepart("Delhi");
                              setHolidayMonth("July 2026");
                              setHolidayFilterDuration("all");
                              setHolidayFilterHotelStar("all");
                              setHolidayFilterTrans("all");
                              setHolidayFilterThemes("all");
                              setHolidayFilterPriceRange("all");
                              setHolidayBudgetFilter(null);
                              setHolidayDurationFilter(null);
                            }}
                            className="px-5 py-2 border border-[#003580] text-[#003580] hover:bg-blue-50 text-xs font-extrabold rounded-lg cursor-pointer transition-all"
                          >
                            Reset All Filters
                          </button>
                        </div>
                      </div>

                      {/* 2. Sub Filter Buttons (Thomas Cook / Yatra / MMT style) */}
                      <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-4 items-center text-xs">
                        {/* Trip Duration */}
                        <div className="flex flex-col gap-1 w-full sm:w-auto">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Trip Duration</span>
                          <select
                            value={holidayFilterDuration}
                            onChange={(e) => setHolidayFilterDuration(e.target.value)}
                            className="border border-gray-200 rounded-lg px-2.5 py-1.5 font-bold text-gray-700 bg-gray-50/50 cursor-pointer w-full"
                          >
                            <option value="all">All Durations</option>
                            <option value="upTo3">Up to 3 nights</option>
                            <option value="4to6">4 - 6 nights</option>
                            <option value="7to10">7 - 10 nights</option>
                            <option value="11to15">11 - 15 nights</option>
                            <option value="above16">Above 16 nights</option>
                          </select>
                        </div>

                        {/* Hotel Star */}
                        <div className="flex flex-col gap-1 w-full sm:w-auto">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Hotel Star</span>
                          <select
                            value={holidayFilterHotelStar}
                            onChange={(e) => setHolidayFilterHotelStar(e.target.value)}
                            className="border border-gray-200 rounded-lg px-2.5 py-1.5 font-bold text-gray-700 bg-gray-50/50 cursor-pointer w-full"
                          >
                            <option value="all">All Stars</option>
                            <option value="5star">5 star</option>
                            <option value="4star">4 star</option>
                            <option value="upTo3star">Up to 3 star</option>
                          </select>
                        </div>

                        {/* Transportation */}
                        <div className="flex flex-col gap-1 w-full sm:w-auto">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Transportation</span>
                          <select
                            value={holidayFilterTrans}
                            onChange={(e) => setHolidayFilterTrans(e.target.value)}
                            className="border border-gray-200 rounded-lg px-2.5 py-1.5 font-bold text-gray-700 bg-gray-50/50 cursor-pointer w-full"
                          >
                            <option value="all">All Modes</option>
                            <option value="bus">Bus</option>
                            <option value="landOnly">Land Only</option>
                            <option value="flightOptional">Flight Optional</option>
                          </select>
                        </div>

                        {/* Themes */}
                        <div className="flex flex-col gap-1 w-full sm:w-auto">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Themes</span>
                          <select
                            value={holidayFilterThemes}
                            onChange={(e) => setHolidayFilterThemes(e.target.value)}
                            className="border border-gray-200 rounded-lg px-2.5 py-1.5 font-bold text-gray-700 bg-gray-50/50 cursor-pointer w-full"
                          >
                            <option value="all">All Themes</option>
                            <option value="adventure">Adventure</option>
                            <option value="affordable">Affordable</option>
                            <option value="exotic">Exotic</option>
                            <option value="group">Group tours</option>
                            <option value="romantic">Romantic</option>
                            <option value="sightseeing">Sightseeing</option>
                            <option value="van">Van tours</option>
                          </select>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-1 w-full sm:w-auto">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Price Range</span>
                          <select
                            value={holidayFilterPriceRange}
                            onChange={(e) => setHolidayFilterPriceRange(e.target.value)}
                            className="border border-gray-200 rounded-lg px-2.5 py-1.5 font-bold text-gray-700 bg-gray-50/50 cursor-pointer w-full"
                          >
                            <option value="all">All Prices</option>
                            <option value="upTo20k">Up to Rs 20,000</option>
                            <option value="20to30k">Rs 20,000 to Rs 30,000</option>
                            <option value="30to40k">Rs 30,000 to Rs 40,000</option>
                            <option value="40to50k">Rs 40,000 to Rs 50,000</option>
                            <option value="50to75k">Rs 50,000 to Rs 75,000</option>
                            <option value="75to100k">Rs 75,000 to Rs 1,00,000</option>
                            <option value="above100k">Rs 1,00,000 and above</option>
                          </select>
                        </div>
                      </div>

                      {/* Active Filter Pills Bar */}
                      {(() => {
                        const activePills = [];
                        if (holidayFilterDuration !== "all") {
                          activePills.push({ id: "duration", label: holidayFilterDuration === "upTo3" ? "Up to 3 Nights" : holidayFilterDuration === "4to6" ? "4-6 Nights" : holidayFilterDuration === "7to10" ? "7-10 Nights" : holidayFilterDuration === "11to15" ? "11-15 Nights" : "16+ Nights", reset: () => setHolidayFilterDuration("all") });
                        }
                        if (holidayFilterHotelStar !== "all") {
                          activePills.push({ id: "hotel", label: holidayFilterHotelStar === "5star" ? "5 Star" : holidayFilterHotelStar === "4star" ? "4 Star" : "Up to 3 Star", reset: () => setHolidayFilterHotelStar("all") });
                        }
                        if (holidayFilterTrans !== "all") {
                          activePills.push({ id: "trans", label: holidayFilterTrans === "bus" ? "Bus" : holidayFilterTrans === "landOnly" ? "Land Only" : "Flight Optional", reset: () => setHolidayFilterTrans("all") });
                        }
                        if (holidayFilterThemes !== "all") {
                          activePills.push({ id: "theme", label: `Theme: ${holidayFilterThemes}`, reset: () => setHolidayFilterThemes("all") });
                        }
                        if (holidayFilterPriceRange !== "all") {
                          activePills.push({ id: "price", label: holidayFilterPriceRange === "upTo20k" ? "Under ₹20,000" : holidayFilterPriceRange === "20to30k" ? "₹20,000 - ₹30,000" : holidayFilterPriceRange === "30to40k" ? "₹30,000 - ₹40,000" : holidayFilterPriceRange === "40to50k" ? "₹40,000 - ₹50,000" : holidayFilterPriceRange === "50to75k" ? "₹50,000 - ₹75,000" : holidayFilterPriceRange === "75to100k" ? "₹75,000 - ₹1,00,000" : "Above ₹1,00,000", reset: () => setHolidayFilterPriceRange("all") });
                        }

                        if (activePills.length === 0) return null;

                        return (
                          <div className="border-t border-gray-100 pt-3.5 flex items-center justify-between flex-wrap gap-2 text-xs">
                            <div className="flex items-center gap-2 flex-wrap text-left w-full sm:w-auto">
                              <span className="font-extrabold text-gray-400 uppercase tracking-wide text-[10px]">Active Filters:</span>
                              {activePills.map(pill => (
                                <span key={pill.id} className="bg-blue-50 border border-blue-150 text-[#003580] px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-sm text-left">
                                  {pill.label}
                                  <button
                                    type="button"
                                    onClick={pill.reset}
                                    className="text-gray-400 hover:text-red-600 font-extrabold cursor-pointer transition-colors"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setHolidayFilterDuration("all");
                                setHolidayFilterHotelStar("all");
                                setHolidayFilterTrans("all");
                                setHolidayFilterThemes("all");
                                setHolidayFilterPriceRange("all");
                              }}
                              className="text-[10px] font-black text-red-600 hover:underline cursor-pointer"
                            >
                              Clear All Filters
                            </button>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Unique Travel Companion Sidebar */}
                    <div className="xl:col-span-3 flex flex-col gap-6 text-left shrink-0 w-full min-w-0">
                      {/* Live Weather & Currency Widget */}
                      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
                        <h3 className="font-extrabold text-gray-900 text-sm flex items-center gap-2">
                          <span>🌤️</span> Live Destination Info
                        </h3>
                        {(() => {
                          const dest = holidayGoingTo.toLowerCase().trim();
                          let weatherInfo = "🗺️ Explorer Mode | Local Currency: INR";
                          let exchangeInfo = null;
                          if (dest.includes("kashmir")) {
                            weatherInfo = "☀️ Srinagar: 22°C Clear & Sunny";
                          } else if (dest.includes("maldives")) {
                            weatherInfo = "🌴 Malé: 30°C Tropical Sunny";
                            exchangeInfo = "💵 1 USD = ₹83.4 (MVR accepted)";
                          } else if (dest.includes("dubai")) {
                            weatherInfo = "🌵 Dubai: 36°C Desert Sun";
                            exchangeInfo = "🪙 1 AED = ₹22.7";
                          } else if (dest.includes("france")) {
                            weatherInfo = "🗼 Paris: 19°C Mild & Breezy";
                            exchangeInfo = "💶 1 EUR = ₹90.5";
                          } else if (dest.includes("goa")) {
                            weatherInfo = "🏖️ Panaji: 29°C Beach Humid";
                          } else if (dest.includes("kerala")) {
                            weatherInfo = "🌧️ Munnar: 24°C Monsoon Showers";
                          } else if (dest.includes("himachal")) {
                            weatherInfo = "🏔️ Shimla: 16°C Cool & Windy";
                          }
                          return (
                            <div className="text-xs font-semibold text-gray-650 space-y-2">
                              <p className="flex items-center gap-1.5 bg-gray-50 p-2.5 rounded-lg border border-gray-150">
                                <span className="font-bold text-gray-800">{weatherInfo}</span>
                              </p>
                              {exchangeInfo && (
                                <p className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 p-2.5 rounded-lg border border-emerald-150">
                                  <span>📈</span> <span className="font-bold">{exchangeInfo}</span>
                                </p>
                              )}
                            </div>
                          );
                        })()}
                      </div>

                      {/* Need Callback Query Form */}
                      <div className="bg-[#003580] text-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
                        <h3 className="font-black text-sm flex items-center gap-2">
                          <span>📞</span> Speak to a Specialist
                        </h3>
                        <p className="text-[11px] text-white/80 leading-relaxed font-semibold">
                          Our tour managers are ready to plan your itinerary. Request a free call back within 15 minutes!
                        </p>
                        {holidayCallbackRequested ? (
                          <div className="bg-white/10 border border-white/20 p-3 rounded-xl text-center text-xs font-black">
                            ✓ Callback Requested! We'll contact you shortly.
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2.5">
                            <input
                              type="tel"
                              value={holidayCallbackPhone}
                              onChange={(e) => setHolidayCallbackPhone(e.target.value)}
                              placeholder="Enter Phone Number"
                              className="w-full bg-white text-gray-800 text-xs font-bold rounded-lg p-2.5 border-none placeholder-gray-400 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (holidayCallbackPhone.trim()) {
                                  setHolidayCallbackRequested(true);
                                }
                              }}
                              className="w-full bg-yellow-450 hover:bg-yellow-500 text-gray-900 font-extrabold text-xs py-2 rounded-lg transition-all cursor-pointer"
                            >
                              Call Me Back
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Promo Codes Widget */}
                      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
                        <h3 className="font-extrabold text-gray-900 text-sm flex items-center gap-2">
                          <span>🏷️</span> Exclusive Promo Codes
                        </h3>
                        <div className="flex flex-col gap-3">
                          {[
                            { code: "YATRAHOLIDAY", desc: "Get Flat 10% Off on stays", details: "Up to ₹3,500 off on all tours" },
                            { code: "TCOOKSHIELD", desc: "Flat 12% Off International", details: "Valid on flights & hotel upgrades" }
                          ].map(promo => (
                            <div key={promo.code} className="border border-dashed border-gray-300 rounded-xl p-3 bg-gray-50/50 flex flex-col gap-1 text-[11px]">
                              <div className="flex justify-between items-center">
                                <span className="font-black text-[#003580] bg-blue-50 border border-blue-150 px-2 py-0.5 rounded font-mono select-all truncate">
                                  {promo.code}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    navigator.clipboard.writeText(promo.code);
                                    const origText = e.target.innerText;
                                    e.target.innerText = "Copied!";
                                    setTimeout(() => { e.target.innerText = origText; }, 2000);
                                  }}
                                  className="text-[9px] font-black text-gray-400 hover:text-[#003580] cursor-pointer whitespace-nowrap"
                                >
                                  Copy Code
                                </button>
                              </div>
                              <span className="font-bold text-gray-800 mt-1">{promo.desc}</span>
                              <span className="text-[9px] text-gray-450 font-medium">{promo.details}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Listings Column */}
                    <div className="xl:col-span-9 flex flex-col gap-6 w-full min-w-0">
                      {/* Sort Bar Row */}
                      <div className="border-b border-gray-200 pb-3 flex items-center justify-between flex-wrap gap-4 text-left bg-transparent">
                        <span className="text-xs text-gray-400 font-extrabold">
                          {displayHolidays.length} Tours found
                        </span>
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide ml-auto">
                          <span className="text-xs font-black text-gray-400 uppercase tracking-wider shrink-0 mr-1">Sort by:</span>
                          {[
                            { value: "popular", label: "Popular" },
                            { value: "duration", label: "Duration" },
                            { value: "price_low", label: "Price: Low to High" },
                            { value: "price_high", label: "Price: High to Low" },
                            { value: "recent", label: "Recently Added" }
                          ].map(sortOpt => (
                            <button
                              key={sortOpt.value}
                              type="button"
                              onClick={() => setHolidaySortBy(sortOpt.value)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border-none shrink-0 ${holidaySortBy === sortOpt.value
                                ? "bg-gray-100 text-[#003580] font-black shadow-sm"
                                : "bg-transparent text-gray-500 hover:text-gray-800"
                                }`}
                            >
                              {sortOpt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tour Type Selector (Group vs Private Customize) */}
                      <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 flex items-center justify-between flex-wrap gap-4 shadow-sm text-left">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedTourType("private")}
                            className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer border ${selectedTourType === "private"
                              ? "bg-[#003580] border-[#003580] text-white shadow-sm"
                              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                              }`}
                          >
                            👤 Private Customized Vacations
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedTourType("group")}
                            className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer border ${selectedTourType === "group"
                              ? "bg-[#003580] border-[#003580] text-white shadow-sm"
                              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                              }`}
                          >
                            👥 Escorted Group Tours (-15% Off)
                          </button>
                        </div>
                        <span className="text-[11px] text-[#003580] font-black uppercase tracking-wide">
                          {selectedTourType === "private" ? "★ Highly Customizable & Flexible Departures" : "★ Escorted Group Travel with Expert Tour Manager"}
                        </span>
                      </div>

                      {/* Cards grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayHolidays.map((pkg) => (
                          <div
                            key={pkg.id}
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                          >
                            {/* Image Section */}
                            <div className="h-48 overflow-hidden relative shrink-0">
                              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                              <div className="absolute top-3 left-3 bg-[#003580] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                                {pkg.theme}
                              </div>
                              {selectedTourType === "group" && (
                                <div className="absolute top-3 right-3 bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm animate-bounce">
                                  Group Deal
                                </div>
                              )}
                              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                <span>⏱</span> {pkg.duration}
                              </div>
                            </div>

                            {/* Info Section */}
                            <div className="p-4 flex-grow flex flex-col justify-between text-left">
                              <div>
                                <h4
                                  onClick={() => handleSelectItem({ ...pkg, price: pkg.displayPrice })}
                                  className="font-black text-sm text-[#003580] hover:text-blue-900 cursor-pointer line-clamp-1"
                                >
                                  {pkg.name}
                                </h4>
                                <p className="text-[11px] text-gray-500 font-bold mt-1 line-clamp-1" dangerouslySetInnerHTML={{ __html: pkg.destinations }} />

                                <p className="text-gray-400 text-[10px] font-medium leading-relaxed mt-2 line-clamp-2">
                                  {pkg.description}
                                </p>

                                {/* Inclusion Icons & Compare option */}
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 flex-wrap gap-2">
                                  <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-black text-gray-500 hover:text-gray-900 select-none">
                                    <input
                                      type="checkbox"
                                      checked={holidaySelectedCompare.includes(pkg.id)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          if (holidaySelectedCompare.length >= 3) {
                                            alert("You can compare up to 3 packages at a time.");
                                            return;
                                          }
                                          setHolidaySelectedCompare([...holidaySelectedCompare, pkg.id]);
                                        } else {
                                          setHolidaySelectedCompare(holidaySelectedCompare.filter(id => id !== pkg.id));
                                        }
                                      }}
                                      className="accent-[#003580] w-3.5 h-3.5 rounded border-gray-300 cursor-pointer"
                                    />
                                    <span>Compare</span>
                                  </label>

                                  <div className="flex items-center gap-2.5">
                                    {pkg.inclusions.includes("flights") && (
                                      <span title="Flights Included" className="text-gray-500 text-xs">✈️</span>
                                    )}
                                    {pkg.inclusions.includes("hotel") && (
                                      <span title="Hotel Stay Included" className="text-gray-500 text-xs">🏨</span>
                                    )}
                                    {pkg.inclusions.includes("transfer") && (
                                      <span title="Transfers Included" className="text-gray-500 text-xs">🚗</span>
                                    )}
                                    {pkg.inclusions.includes("meals") && (
                                      <span title="Meals Included" className="text-gray-500 text-xs">🍲</span>
                                    )}
                                    {pkg.inclusions.includes("sightseeing") && (
                                      <span title="Sightseeing Included" className="text-gray-500 text-xs">📷</span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Price and Action Footer */}
                              <div className="border-t border-gray-100 pt-3 mt-4 flex items-end justify-between">
                                <div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-[10px] text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                                    <span className="text-[9px] bg-red-50 text-red-600 px-1 rounded font-black">{pkg.discountPercent}% OFF</span>
                                  </div>
                                  <span className="text-base font-black text-gray-900 block mt-0.5">₹{pkg.displayPrice.toLocaleString()}</span>
                                  <span className="text-[8px] text-gray-400 block font-medium">per person</span>
                                </div>
                                <div className="flex gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setHolidayPreviewItineraryCard(holidayPreviewItineraryCard === pkg.id ? null : pkg.id)}
                                    className="border border-[#003580] text-[#003580] hover:bg-blue-50 font-extrabold text-[10px] px-2.5 py-1.5 rounded-xl transition-all cursor-pointer shrink-0"
                                  >
                                    {holidayPreviewItineraryCard === pkg.id ? "Hide Plan" : "Quick Plan"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleSelectItem({ ...pkg, price: pkg.displayPrice })}
                                    className="bg-[#003580] hover:bg-blue-900 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer shrink-0"
                                  >
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Inline Timeline Preview */}
                            {holidayPreviewItineraryCard === pkg.id && (
                              <div className="bg-gray-50 border-t border-gray-150 p-4 space-y-2.5 text-left text-[11px]">
                                <h5 className="font-black text-[#003580] uppercase tracking-wider text-[9px]">Itinerary Highlights</h5>
                                <div className="relative pl-3 border-l-2 border-teal-500/30 space-y-2">
                                  {pkg.itinerary.map(dayItem => (
                                    <div key={dayItem.day} className="relative">
                                      <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-teal-500 border border-white" />
                                      <span className="font-extrabold text-gray-800">Day {dayItem.day}:</span> <span className="text-gray-600 font-semibold">{dayItem.title}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}

                        {displayHolidays.length === 0 && (
                          <div className="col-span-full bg-white border border-gray-150 rounded-xl p-8 text-center text-gray-500 font-bold text-sm shadow-sm">
                            No holiday packages match your search filters.
                          </div>
                        )}
                      </div>

                      {/* Destination Info Sub-Pages Panel */}
                      {(() => {
                        const targetKey = holidayGoingTo.toLowerCase().trim();
                        const info = DESTINATION_INFO_DATABASE[targetKey] || DESTINATION_INFO_DATABASE["kashmir"];

                        return (
                          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mt-10 text-left">
                            <div className="border-b border-gray-150 pb-3 flex flex-wrap justify-between items-center gap-3">
                              <h3 className="text-lg font-black text-[#003580] flex items-center gap-2">
                                <span>📍</span> Learn More: {info.name} Travel Guide
                              </h3>
                              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                                {[
                                  { id: "about", label: "About" },
                                  { id: "bestTime", label: "Best Time to Visit" },
                                  { id: "howToReach", label: "How to Reach" },
                                  { id: "attractions", label: "Top Attractions" },
                                  { id: "faqs", label: "Guidelines & FAQs" }
                                ].map(tab => (
                                  <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setHolidayActiveInfoTab(tab.id)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${holidayActiveInfoTab === tab.id
                                      ? "bg-[#003580] text-white shadow-sm"
                                      : "bg-gray-50 text-gray-650 hover:bg-gray-100 border border-gray-200"
                                      }`}
                                  >
                                    {tab.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="mt-5 text-xs text-gray-600 leading-relaxed font-semibold">
                              {holidayActiveInfoTab === "about" && (
                                <div className="space-y-3">
                                  <p className="text-sm font-bold text-gray-800">Overview</p>
                                  <p>{info.about}</p>
                                  <div className="bg-blue-50 border border-blue-150 p-4 rounded-xl flex items-center gap-3 mt-3">
                                    <span className="text-2xl">💡</span>
                                    <p className="text-[#003580] text-[11px] font-bold">
                                      Tip: You can customize any of our {info.name} packages with flight upgrades, premium hotels, and local sightseeing additions inside the details panel!
                                    </p>
                                  </div>
                                </div>
                              )}

                              {holidayActiveInfoTab === "bestTime" && (
                                <div className="space-y-4">
                                  <p className="text-sm font-bold text-gray-800">Seasonal Travel Guide</p>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="border border-green-200 rounded-xl p-3.5 bg-green-50/5">
                                      <span className="text-xs font-black text-green-700 block uppercase mb-1">🟢 Peak Season</span>
                                      <p className="text-gray-650">{info.bestTime.peak}</p>
                                    </div>
                                    <div className="border border-yellow-200 rounded-xl p-3.5 bg-yellow-50/5">
                                      <span className="text-xs font-black text-yellow-700 block uppercase mb-1">🟡 Shoulder Season</span>
                                      <p className="text-gray-650">{info.bestTime.mid}</p>
                                    </div>
                                    <div className="border border-blue-200 rounded-xl p-3.5 bg-blue-50/5">
                                      <span className="text-xs font-black text-blue-700 block uppercase mb-1">🔵 Low/Budget Season</span>
                                      <p className="text-gray-650">{info.bestTime.low}</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {holidayActiveInfoTab === "howToReach" && (
                                <div className="space-y-3">
                                  <p className="text-sm font-bold text-gray-800">Transit & Transport Routes</p>
                                  <p>{info.howToReach}</p>
                                  <div className="mt-3 flex gap-3.5 flex-wrap">
                                    <span className="bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-full flex items-center gap-1">✈️ Flight connections available</span>
                                    <span className="bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-full flex items-center gap-1">🚗 Private cab included in package</span>
                                  </div>
                                </div>
                              )}

                              {holidayActiveInfoTab === "attractions" && (
                                <div className="space-y-4">
                                  <p className="text-sm font-bold text-gray-800">Must-Visit Sightseeing Spots</p>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {info.attractions.map((att, idx) => (
                                      <div key={idx} className="border border-gray-150 rounded-xl overflow-hidden shadow-sm bg-white">
                                        <div className="h-32 overflow-hidden">
                                          <img src={att.img} alt={att.name} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="p-3 text-xs font-black text-gray-800 text-center">{att.name}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {holidayActiveInfoTab === "faqs" && (
                                <div className="space-y-4">
                                  <p className="text-sm font-bold text-gray-800">Travel Advisory & Guidelines</p>
                                  <div className="flex flex-col gap-3">
                                    {info.faqs.map((faq, idx) => (
                                      <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                        <p className="font-extrabold text-gray-850 mb-1 flex items-center gap-1.5">
                                          <span className="text-teal-650">Q:</span> {faq.q}
                                        </p>
                                        <p className="text-gray-500 font-medium leading-relaxed">{faq.a}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Sticky Compare Bar */}
                    {holidaySelectedCompare.length > 0 && (() => {
                      const comparedPkgs = HOLIDAYS_DATABASE.map(pkg => {
                        const displayPrice = selectedTourType === "group" ? Math.round(pkg.price * 0.85) : pkg.price;
                        return { ...pkg, displayPrice };
                      }).filter(p => holidaySelectedCompare.includes(p.id));

                      return (
                        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-250 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] py-4 px-6 z-40 flex items-center justify-between flex-wrap gap-4 animate-slideUp">
                          <div className="flex items-center gap-4 flex-wrap text-left">
                            <span className="font-extrabold text-[#003580] text-xs uppercase tracking-wide">Compare Packages ({holidaySelectedCompare.length}/3):</span>
                            <div className="flex items-center gap-3 flex-wrap">
                              {comparedPkgs.map(p => (
                                <div key={p.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1.5 pr-2.5 relative shadow-sm">
                                  <div className="w-10 h-7 rounded overflow-hidden">
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                  </div>
                                  <span className="text-[10px] font-black text-gray-800 line-clamp-1 max-w-[120px]">{p.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => setHolidaySelectedCompare(holidaySelectedCompare.filter(id => id !== p.id))}
                                    className="text-gray-400 hover:text-red-600 font-extrabold text-xs ml-1 cursor-pointer"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setHolidaySelectedCompare([])}
                              className="text-xs font-black text-gray-400 hover:text-gray-655 cursor-pointer"
                            >
                              Clear All
                            </button>
                            <button
                              type="button"
                              disabled={holidaySelectedCompare.length < 2}
                              onClick={() => setHolidayShowCompareModal(true)}
                              className={`font-black text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm ${holidaySelectedCompare.length >= 2
                                ? "bg-yellow-450 hover:bg-yellow-500 text-gray-900"
                                : "bg-gray-100 border border-gray-200 text-gray-450 cursor-not-allowed"
                                }`}
                            >
                              {holidaySelectedCompare.length < 2 ? "Add 1 More to Compare" : "Compare Now"}
                            </button>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Side-by-Side Compare Modal */}
                    {holidayShowCompareModal && (() => {
                      const comparedPkgs = HOLIDAYS_DATABASE.map(pkg => {
                        const displayPrice = selectedTourType === "group" ? Math.round(pkg.price * 0.85) : pkg.price;
                        const discountPercent = Math.round(((pkg.originalPrice - displayPrice) / pkg.originalPrice) * 100);
                        return { ...pkg, displayPrice, discountPercent };
                      }).filter(p => holidaySelectedCompare.includes(p.id));

                      return (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl relative flex flex-col gap-6 text-left">
                            <div className="flex justify-between items-center border-b border-gray-150 pb-3">
                              <h3 className="text-base font-black text-[#003580] flex items-center gap-2">
                                <span>⚖️</span> Side-by-Side Package Comparison
                              </h3>
                              <button
                                type="button"
                                onClick={() => setHolidayShowCompareModal(false)}
                                className="text-gray-400 hover:text-gray-900 font-extrabold text-lg cursor-pointer"
                              >
                                ×
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-200">
                              {/* Criteria Titles */}
                              <div className="hidden md:flex flex-col gap-10 pr-4 pt-4 text-xs font-black text-gray-400 uppercase tracking-wider">
                                <div className="h-40">Package Info</div>
                                <div className="py-2">Price</div>
                                <div className="py-2">Inclusions</div>
                                <div className="py-2">Accommodations</div>
                                <div className="py-2">Itinerary Length</div>
                                <div className="py-2">Action</div>
                              </div>

                              {/* Packages columns */}
                              {comparedPkgs.map(p => (
                                <div key={p.id} className="flex flex-col gap-6 md:px-4 pt-4 text-xs">
                                  {/* Header card info */}
                                  <div className="h-40 flex flex-col gap-2">
                                    <div className="h-24 rounded-lg overflow-hidden relative shadow-sm">
                                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                      <span className="absolute top-1.5 left-1.5 bg-[#003580] text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm">{p.theme}</span>
                                    </div>
                                    <h4 className="font-black text-gray-900 text-xs line-clamp-2">{p.name}</h4>
                                  </div>

                                  {/* Price info */}
                                  <div className="py-2 border-t border-gray-100 md:border-t-0">
                                    <span className="text-[10px] text-gray-400 line-through block">₹{p.originalPrice.toLocaleString()}</span>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                      <span className="text-sm font-black text-gray-900">₹{p.displayPrice.toLocaleString()}</span>
                                      <span className="bg-red-50 text-red-600 text-[8px] font-black px-1 rounded">{p.discountPercent}% OFF</span>
                                    </div>
                                  </div>

                                  {/* Inclusions info */}
                                  <div className="py-2 border-t border-gray-100 md:border-t-0 flex flex-wrap gap-1.5">
                                    {p.inclusions.map(inc => (
                                      <span key={inc} className="bg-blue-50 border border-blue-150 text-[#003580] px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                                        {inc === "flights" ? "✈️ Flight" : inc === "hotel" ? "🏨 Hotel" : inc === "transfer" ? "🚗 Transfer" : inc === "meals" ? "🍲 Meals" : "📷 Tours"}
                                      </span>
                                    ))}
                                  </div>

                                  {/* Accommodation details */}
                                  <div className="py-2 border-t border-gray-100 md:border-t-0 text-gray-600 font-semibold leading-relaxed">
                                    Standard 3-Star (Lavender / Deira City) to Luxury 5-Star (Taj Palace / Atlantis Suites) partners depending on custom stay selections.
                                  </div>

                                  {/* Itinerary highlight */}
                                  <div className="py-2 border-t border-gray-100 md:border-t-0 text-gray-850 font-bold">
                                    {p.duration} ({p.nights} Nights)
                                  </div>

                                  {/* Choose/Select */}
                                  <div className="py-2 border-t border-gray-100 md:border-t-0 mt-auto">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setHolidayShowCompareModal(false);
                                        handleSelectItem({ ...p, price: p.displayPrice });
                                      }}
                                      className="w-full bg-[#003580] hover:bg-blue-900 text-white font-extrabold text-xs py-2 rounded-xl transition-all cursor-pointer text-center"
                                    >
                                      Select & Customize
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                );
              })()}

              {/* CRUISES LISTINGS */}
              {activeTab === "cruises" && (
                <div className="flex flex-col gap-6">
                  {/* CruiseDirect Trust Ribbon */}
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex flex-wrap items-center justify-around gap-4 text-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💳</span>
                      <div className="text-left">
                        <h4 className="text-xs font-black text-gray-800">Flexible 20% Deposits</h4>
                        <p className="text-[10px] text-gray-500 font-semibold mt-0.5">Pay only 20% down today, balance due 60 days before sailing.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🛡️</span>
                      <div className="text-left">
                        <h4 className="text-xs font-black text-gray-800">100% Best Price Guarantee</h4>
                        <p className="text-[10px] text-gray-500 font-semibold mt-0.5">We match any lower advertised cruise fare instantly.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📉</span>
                      <div className="text-left">
                        <h4 className="text-xs font-black text-gray-800">Rate Drop Protection</h4>
                        <p className="text-[10px] text-gray-500 font-semibold mt-0.5">If the price drops before final payment, we adjust your fare.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎟️</span>
                      <div className="text-left">
                        <h4 className="text-xs font-black text-gray-800">$0 Booking Fees</h4>
                        <p className="text-[10px] text-gray-500 font-semibold mt-0.5">No credit card or processing fees, ever.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map((cruise) => (
                      <div
                        key={cruise.id}
                        className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                      >
                        {/* Image & Badges */}
                        <div className="h-48 overflow-hidden relative">
                          <img src={cruise.image} alt={cruise.name} className="w-full h-full object-cover" />
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            <span className="bg-blue-600 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow-sm">
                              {cruise.line}
                            </span>
                            <span className="bg-[#003580] text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow-sm">
                              🚢 {cruise.ship}
                            </span>
                          </div>
                          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white font-bold text-xs px-2.5 py-1 rounded-md">
                            {cruise.duration}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-5 flex-grow flex flex-col justify-between text-left">
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">
                                Departs from: {cruise.departurePort}
                              </span>
                              <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-100">
                                <span>★ {cruise.rating}</span>
                              </div>
                            </div>

                            <h4 className="font-black text-base text-gray-900 mt-2 line-clamp-2 hover:text-[#003580] cursor-pointer" onClick={() => handleSelectItem(cruise)}>
                              {cruise.name}
                            </h4>

                            {/* Ports of Call inline */}
                            <p className="text-[11px] text-gray-500 font-semibold mt-2.5 leading-relaxed">
                              <span className="text-gray-400 font-bold block mb-0.5 uppercase text-[9px]">Ports:</span>
                              <span dangerouslySetInnerHTML={{ __html: cruise.destinations }} />
                            </p>

                            {/* Benefits checklist */}
                            <div className="flex flex-wrap gap-1.5 mt-4">
                              {cruise.benefits.map((b, idx) => (
                                <span key={idx} className="bg-emerald-50 border border-emerald-150 text-emerald-700 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded flex items-center gap-0.5">
                                  <Check size={9} /> {b}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Price & action */}
                          <div className="border-t border-gray-100 pt-4 mt-5 flex items-end justify-between">
                            <div>
                              <span className="text-[10px] text-gray-400 font-black block uppercase">Starting from</span>
                              <span className="text-base font-black text-gray-900">₹{cruise.price.toLocaleString()}</span>
                              <span className="text-[9px] text-gray-400 block font-semibold">per guest + taxes</span>
                            </div>
                            <button
                              onClick={() => handleSelectItem(cruise)}
                              className="bg-[#003580] hover:bg-blue-900 text-white font-extrabold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all active:scale-95 animate-fade-in"
                            >
                              See Cabins
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {searchResults.length === 0 && (
                    <div className="bg-white border border-gray-150 rounded-xl p-8 text-center text-gray-500 font-bold text-sm shadow-sm">
                      No cruises match your search criteria.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          </div>
        )}

        {/* ── 3. VIEW: Stay/Flight/Car Details Page ── */}
        {view === "details" && selectedItem && (
          <>
            {/* ══ BUS BOOKING PAGE ══ */}
            {activeTab === "buses" && (() => {
              // Generate some dynamic mock data based on the bus if not present
              const busImages = selectedItem.images || [
                "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80",
                "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500&q=80",
                "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=500&q=80"
              ];
              const safety = selectedItem.safety || "Enhanced";
              const old = selectedItem.age || "9 months old";

              return (
                <div className="max-w-6xl mx-auto space-y-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column: Seat Map */}
                    <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex-shrink-0 h-fit sticky top-24">
                      <h2 className="text-xl font-black text-gray-900 mb-6 text-center">Know your seat types</h2>
                      
                      <div className="flex justify-between gap-6">
                        {/* Lower Deck */}
                        <div className="flex-1 rounded-xl p-4 border border-gray-100 flex flex-col items-center">
                          <div className="text-sm font-bold text-gray-700 mb-6 flex items-center justify-between w-full border-b border-gray-100 pb-2">
                            <span>Lower deck</span>
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 w-full">
                            {/* Generate seat grid dynamically */}
                            {[...Array(10)].map((_, i) => {
                              const isSold = i % 4 === 1;
                              const isGreen = i % 3 === 0;
                              return (
                              <div 
                                key={`ld-${i}`} 
                                onClick={() => {
                                  if (isSold) return;
                                  if (selectedBusSeats.includes(`ld-${i}`)) setSelectedBusSeats(p => p.filter(s => s !== `ld-${i}`));
                                  else setSelectedBusSeats(p => [...p, `ld-${i}`]);
                                }}
                                className={`h-14 rounded-md border-2 cursor-pointer transition-all ${isSold ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed' : selectedBusSeats.includes(`ld-${i}`) ? 'bg-[#005fad] border-[#005fad]' : isGreen ? 'border-green-500 bg-white hover:bg-green-50' : 'border-gray-300 bg-white hover:border-blue-400'}`}>
                                <div className="h-full flex items-end justify-center pb-1">
                                  <span className={`text-[10px] font-bold ${isSold ? 'text-gray-400' : selectedBusSeats.includes(`ld-${i}`) ? 'text-white' : 'text-gray-500'}`}>{isSold ? 'Sold' : `₹${selectedItem.price}`}</span>
                                </div>
                              </div>
                            )})}
                          </div>
                        </div>

                        {/* Upper Deck */}
                        <div className="flex-1 rounded-xl p-4 border border-gray-100 flex flex-col items-center">
                          <div className="text-sm font-bold text-gray-700 mb-6 w-full text-left border-b border-gray-100 pb-2">
                            <span>Upper deck</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 w-full">
                            {[...Array(10)].map((_, i) => {
                              const isSold = i % 3 === 1;
                              const isPink = i % 5 === 0;
                              return (
                              <div 
                                key={`ud-${i}`} 
                                onClick={() => {
                                  if (isSold) return;
                                  if (selectedBusSeats.includes(`ud-${i}`)) setSelectedBusSeats(p => p.filter(s => s !== `ud-${i}`));
                                  else setSelectedBusSeats(p => [...p, `ud-${i}`]);
                                }}
                                className={`h-16 rounded-md border-2 cursor-pointer transition-all ${isSold ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed' : selectedBusSeats.includes(`ud-${i}`) ? 'bg-[#005fad] border-[#005fad]' : isPink ? 'border-pink-300 bg-pink-50 hover:border-pink-500' : 'border-gray-300 bg-white hover:border-blue-400'}`}>
                                <div className="h-full flex items-end justify-center pb-1">
                                  <span className={`text-[10px] font-bold ${isSold ? 'text-gray-400' : selectedBusSeats.includes(`ud-${i}`) ? 'text-white' : 'text-gray-500'}`}>{isSold ? 'Sold' : `₹${selectedItem.price}`}</span>
                                </div>
                              </div>
                            )})}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Bus Details */}
                    <div className="flex-1 space-y-4">
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h2 className="text-2xl font-black text-gray-900">{selectedItem.operator}</h2>
                            <div className="text-sm font-medium text-gray-500 mt-1">
                              {selectedItem.dep} - {selectedItem.arr} • {selectedItem.dur}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{selectedItem.type}</div>
                          </div>
                          <div className="bg-green-600 text-white px-3 py-1.5 rounded-lg flex flex-col items-center">
                            <span className="font-black text-sm">★ {selectedItem.rating || "4.6"}</span>
                            <span className="text-[10px] opacity-90">{selectedItem.reviews || 622} ratings</span>
                          </div>
                        </div>

                        {/* Images */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                          {busImages.map((img, i) => (
                            <img key={i} src={img} alt={`Bus ${i}`} className="w-full h-32 object-cover rounded-xl shadow-sm" />
                          ))}
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 mb-6 gap-6 overflow-x-auto scrollbar-hide">
                          <button className="pb-3 border-b-[3px] border-red-500 font-bold text-gray-900 text-sm whitespace-nowrap">Highlights</button>
                          <button className="pb-3 border-b-[3px] border-transparent font-medium text-gray-500 hover:text-gray-700 text-sm whitespace-nowrap">Cancellation policy</button>
                          <button className="pb-3 border-b-[3px] border-transparent font-medium text-gray-500 hover:text-gray-700 text-sm whitespace-nowrap">Boarding point</button>
                          <button className="pb-3 border-b-[3px] border-transparent font-medium text-gray-500 hover:text-gray-700 text-sm whitespace-nowrap">Dropping point</button>
                        </div>

                        {/* Tab Content (Highlights) */}
                        <div className="flex gap-4 mb-8">
                          <div className="flex-1 border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl p-4 cursor-pointer">
                            <div className="font-bold text-gray-900 mb-1">New Bus</div>
                            <div className="text-xs font-medium text-gray-500">{old}</div>
                          </div>
                          <div className="flex-1 border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl p-4 cursor-pointer">
                            <div className="font-bold text-gray-900 mb-1">Bus Safety</div>
                            <div className="text-xs font-medium text-gray-500">{safety}</div>
                          </div>
                        </div>
                        
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex justify-between items-center mb-8">
                          <div className="flex items-center gap-3">
                            <div className="bg-yellow-200 text-yellow-900 font-black text-xs px-2.5 py-1 rounded-md tracking-tight">Last min. 10% OFF</div>
                            <div className="text-sm font-bold text-gray-800">Hurry! Offer ends soon</div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ══ CAB BOOKING PAGE (MakeMyTrip Style) ══ */}
            {activeTab === "cars" && (() => {
              const cabCoupons = [
                { code: "MMTDEAL", desc: "Get flat Rs. 50 off on your cab booking!", discount: 50 },
                { code: "MEGA-SALE", desc: "Save Rs. 67 instantly on this Cab booking. Hurry, limited-time offer!", discount: 67 },
                { code: "WELCOMEMMT", desc: "Get Rs.168 instant discount and up to Rs.150 Cashback", discount: 168 },
                { code: "CABDEAL", desc: "Get flat Rs. 67 off on your first cab booking!", discount: 67 },
              ];
              const baseFare = selectedItem.discountPrice || 1683;
              const taxes = selectedItem.taxes || 495;
              const driverCharges = 300;
              const gst = 100;
              const serviceFee = 95;
              const addOns = (specialRequests.roofCarrier ? 157 : 0) + (specialRequests.language ? 209 : 0) + (specialRequests.newVehicle ? 262 : 0);
              const appliedCouponObj = cabCoupons.find(c => c.code === selectedCoupon);
              const couponDiscount = appliedCouponObj ? appliedCouponObj.discount : 0;
              const fullTotal = baseFare + taxes + driverCharges + gst + serviceFee + addOns - couponDiscount;
              const partPayTotal = Math.round(fullTotal * 0.235);
              const displayTotal = cabPaymentOption === "part" ? partPayTotal : fullTotal;

              // Cancellation time helper
              const getCancelThreshold = () => {
                let dateVal = checkInDate ? new Date(checkInDate) : new Date();
                let timeStr = carPickUpTime || "10:00";
                const [h, m] = timeStr.split(":").map(Number);
                dateVal.setHours(h, m, 0, 0);

                // Subtract 1 hour
                const cancelTime = new Date(dateVal.getTime() - 60 * 60 * 1000);

                // Format time like "9:00 AM"
                const formattedTime = cancelTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
                const weekday = cancelTime.toLocaleDateString("en-US", { weekday: "short" });
                const day = cancelTime.getDate();
                const month = cancelTime.toLocaleDateString("en-US", { month: "short" });
                return `${formattedTime}, ${weekday} ${day} ${month}`;
              };

              // Format the pickup time
              const formatPickupDateTime = () => {
                let dateStr = checkInDate ? new Date(checkInDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "07 Jul";
                let timeStr = carPickUpTime || "10:00";
                // Convert 24h to 12h
                const [h, m] = timeStr.split(":").map(Number);
                const ampm = h >= 12 ? "PM" : "AM";
                const hour12 = h % 12 || 12;
                const formattedTime = `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
                return `${dateStr}, ${formattedTime}`;
              };

              const fromCity = carPickUp || "Mumbai";
              const toCity = "Pune"; // placeholder destination
              const cabTypeLabel = (selectedItem.type || "Hatchback").toUpperCase();

              return (
                <div className="min-h-screen bg-gray-100">
                  {/* Top Breadcrumb bar */}
                  <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-2 mb-0">
                    <button onClick={() => setView("results")} className="flex items-center gap-1.5 text-[#008cff] font-bold text-xs hover:underline cursor-pointer">
                      <MdArrowBack size={15} /> Back to Cabs
                    </button>
                    <span className="text-gray-300 text-xs">|</span>
                    <span className="text-xs text-gray-500 font-semibold">{fromCity} → {toCity} • {formatPickupDateTime()}</span>
                  </div>

                  {/* Page title */}
                  <div className="bg-white border-b border-gray-100 px-4 py-4">
                    <h1 className="text-base font-black text-gray-900">Outstation One Way Trip</h1>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        <div>
                          <div className="text-sm font-black text-gray-900">{fromCity}</div>
                          <div className="text-[11px] text-gray-500 font-medium">{fromCity}, Maharashtra</div>
                        </div>
                      </div>
                      <div className="flex-1 flex items-center gap-1 px-2">
                        <div className="flex-1 h-px bg-gray-200 border-dashed border-t-2 border-gray-200 border-solid"></div>
                        <Car size={14} className="text-gray-400" />
                        <div className="flex-1 h-px bg-gray-200"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div>
                          <div className="text-sm font-black text-gray-900">{toCity}</div>
                          <div className="text-[11px] text-gray-500 font-medium">{toCity}, Maharashtra</div>
                        </div>
                      </div>
                      <div className="ml-4 bg-blue-50 border border-blue-100 text-[#003580] text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">
                        {formatPickupDateTime()}
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 xl:grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* ═══ LEFT COLUMN ═══ */}
                    <div className="xl:col-span-8 flex flex-col gap-5">

                      {/* Cab Details Card */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-5 flex flex-col sm:flex-row gap-5">
                          <div className="w-full sm:w-44 h-28 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center shrink-0">
                            <Car size={40} className="text-gray-300" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 flex-wrap">
                              <div>
                                <h2 className="text-lg font-black text-gray-900">{selectedItem.name}</h2>
                                <div className="text-[11px] text-gray-500 font-medium mt-0.5">{selectedItem.modelType || "or similar"}</div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <span className="bg-gray-100 text-gray-700 font-bold text-[10px] uppercase px-2 py-1 rounded">{cabTypeLabel}</span>
                                {selectedItem.ac && <span className="flex items-center gap-1 bg-blue-50 text-blue-700 font-bold text-[10px] px-2 py-1 rounded"><Snowflake size={10} /> AC</span>}
                                {selectedItem.seats && <span className="flex items-center gap-1 bg-gray-100 text-gray-700 font-bold text-[10px] px-2 py-1 rounded"><Users size={10} /> {selectedItem.seats} Seats</span>}
                              </div>
                            </div>
                            <div className="flex items-center gap-3 mt-3 flex-wrap">
                              {selectedItem.rating && (
                                <div className="flex items-center gap-1.5 bg-[#0f7a3f] text-white text-xs font-bold px-2 py-1 rounded">
                                  <Star size={11} fill="currentColor" /> {selectedItem.rating}/5
                                </div>
                              )}
                              <span className="text-xs text-gray-500 font-semibold">238 reviews</span>
                            </div>
                            <div className="flex flex-col gap-2 mt-4 border-t border-gray-100 pt-4">
                              {[
                                { icon: CheckCircle, text: "Free cancellation till 1 hour before departure", color: "text-green-600" },
                                { icon: ShieldCheck, text: "Cab operator will be assigned on booking completion", color: "text-blue-600" },
                                { icon: Clock, text: "Cab and driver details will be shared up to 30 mins prior to departure", color: "text-orange-500" },
                              ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <item.icon size={14} className={`${item.color} shrink-0 mt-0.5`} />
                                  <span className="text-[11px] text-gray-600 font-medium">{item.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Partner badge */}
                        <div className="bg-orange-50 border-t border-orange-100 px-5 py-3 flex items-center gap-3">
                          <Award size={18} className="text-[#e8731a] shrink-0" />
                          <div>
                            <div className="text-xs font-black text-gray-900">Our Top Rated Partner</div>
                            <div className="text-[10px] text-gray-500 font-medium">India's Leading Outstation Cab Rentals Since 2006</div>
                          </div>
                        </div>
                      </div>

                      {/* Inclusions Card */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
                          <h3 className="font-black text-gray-900 text-sm">INCLUSIONS</h3>
                        </div>
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            { title: "142 Km included", sub: "₹15.5/km will apply beyond the included kms" },
                            { title: "Toll, tax and other charges", sub: "Toll, State Tax, Parking charges are included" },
                            { title: "Driver allowance", sub: "Driver food and accommodation(stay) charges are included" },
                            { title: "Waiting time upto 45 mins for pickup", sub: "₹100/30 mins post 45 mins" },
                            { title: "Fuel charges included", sub: "Fuel cost for your trip is included in the fare" },
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                                <Check size={13} className="text-green-600" strokeWidth={3} />
                              </div>
                              <div>
                                <div className="text-xs font-extrabold text-gray-800">{item.title}</div>
                                <div className="text-[10px] text-gray-500 font-medium mt-0.5">{item.sub}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="px-5 pb-4">
                          <button className="text-[#008cff] text-xs font-bold hover:underline cursor-pointer">View Policies →</button>
                        </div>
                      </div>

                      {/* Cancellation Policy */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100">
                          <h3 className="font-black text-gray-900 text-sm">Cancellation Policy</h3>
                        </div>
                        <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                              <CheckCircle size={20} className="text-green-600" />
                            </div>
                            <div>
                              <div className="text-xs font-black text-green-700">Free cancellation until</div>
                              <div className="text-sm font-extrabold text-gray-900 mt-0.5">{getCancelThreshold()}</div>
                              <div className="text-[10px] text-gray-500 font-medium mt-0.5">1 hour before pick up time</div>
                            </div>
                          </div>
                          <button onClick={() => setShowCabCancelModal(true)} className="text-[#008cff] text-xs font-bold hover:underline cursor-pointer whitespace-nowrap">View Cancellation Policy →</button>
                        </div>
                      </div>

                      {/* Customer Reviews */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-150 flex items-center justify-between">
                          <h3 className="font-black text-gray-900 text-sm">Customer reviews</h3>
                          <span className="text-xs text-gray-500 font-bold">({cabReviews.length} Reviews)</span>
                        </div>
                        <div className="p-5 space-y-5">
                          <div className="flex items-start gap-6 flex-wrap">
                            <div className="text-center">
                              <div className="text-4xl font-black text-gray-900">
                                {(cabReviews.reduce((acc, curr) => acc + curr.rating, 0) / cabReviews.length).toFixed(1)}
                              </div>
                              <div className="text-xs font-bold text-[#0f7a3f] mt-1">Excellent</div>
                            </div>
                            <div className="flex gap-6">
                              {[{ label: "Driver Rating", val: "4.8" }, { label: "Cab Rating", val: "4.7" }].map(r => (
                                <div key={r.label} className="text-center">
                                  <div className="text-2xl font-black text-gray-900">{r.val}</div>
                                  <div className="text-[10px] text-gray-500 font-medium mt-1">{r.label}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="text-[11px] text-gray-500 font-medium flex items-center gap-1.5 border-b border-gray-100 pb-3">
                            <ThumbsUp size={12} className="text-[#0f7a3f]" />
                            Rated by verified travelers who booked {selectedItem.type || "Hatchback"} from {fromCity} to {toCity}
                          </div>

                          {/* Reviews List */}
                          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                            {cabReviews.map(rev => (
                              <div key={rev.id} className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <div>
                                    <div className="text-sm font-black text-gray-900">{rev.author}</div>
                                    <div className="text-[10px] text-gray-400 font-medium mt-0.5">Booked {selectedItem.name}</div>
                                  </div>
                                  <div className="flex items-center gap-1 bg-[#0f7a3f] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                                    <Star size={9} fill="currentColor" /> {rev.rating.toFixed(1)}
                                  </div>
                                </div>
                                <div className="text-[10px] text-gray-400 font-semibold mb-2">{rev.date}</div>
                                <p className="text-xs text-gray-650 font-bold leading-relaxed">{rev.text}</p>

                                {/* Tags indicating behavior & AC status */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {rev.behavior && (
                                    <span className="text-[9px] bg-green-50 text-green-700 font-black px-2 py-0.5 rounded border border-green-100 flex items-center gap-1">
                                      <Check size={8} strokeWidth={3} /> Good Behavior
                                    </span>
                                  )}
                                  {rev.ac && (
                                    <span className="text-[9px] bg-blue-50 text-blue-700 font-black px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1">
                                      <Check size={8} strokeWidth={3} /> Turned On AC
                                    </span>
                                  )}
                                  {rev.clean && (
                                    <span className="text-[9px] bg-amber-50 text-amber-700 font-black px-2 py-0.5 rounded border border-amber-100 flex items-center gap-1">
                                      <Check size={8} strokeWidth={3} /> Clean Cab
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Write Driver Review Form */}
                          <div className="bg-gray-50 border border-gray-150 rounded-xl p-4 space-y-3">
                            <h4 className="text-xs font-black text-gray-850 uppercase tracking-wider">Leave Feedback on your Driver</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="text-[9px] font-black text-gray-400 block mb-1 uppercase">Your Name</label>
                                <input
                                  type="text"
                                  placeholder="Your Name"
                                  value={newCabReviewAuthor}
                                  onChange={e => setNewCabReviewAuthor(e.target.value)}
                                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-[#008cff]"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] font-black text-gray-400 block mb-1 uppercase">Rating</label>
                                <select
                                  value={newCabReviewRating}
                                  onChange={e => setNewCabReviewRating(Number(e.target.value))}
                                  className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-[#008cff]"
                                >
                                  <option value="5">5/5 - Excellent</option>
                                  <option value="4">4/5 - Very Good</option>
                                  <option value="3">3/5 - Average</option>
                                  <option value="2">2/5 - Poor</option>
                                  <option value="1">1/5 - Horrible</option>
                                </select>
                              </div>
                              <div className="flex flex-col justify-end pb-0.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!newCabReviewAuthor.trim() || !newCabReviewText.trim()) {
                                      toast.error("Please enter your name and feedback!");
                                      return;
                                    }
                                    setCabReviews([
                                      {
                                        id: cabReviews.length + 1,
                                        author: newCabReviewAuthor,
                                        rating: newCabReviewRating,
                                        text: newCabReviewText,
                                        date: "Today",
                                        behavior: newCabReviewBehavior,
                                        ac: newCabReviewAc,
                                        clean: newCabReviewClean
                                      },
                                      ...cabReviews
                                    ]);
                                    setNewCabReviewAuthor("");
                                    setNewCabReviewText("");
                                    toast.success("Driver review submitted successfully!");
                                  }}
                                  className="bg-[#e8731a] hover:bg-[#c4601a] text-white text-xs font-black py-2.5 rounded-lg uppercase tracking-wider transition-colors active:scale-95 cursor-pointer shadow-sm text-center"
                                >
                                  Post Review
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="text-[9px] font-black text-gray-400 block mb-1 uppercase">Your Message</label>
                              <textarea
                                rows="2"
                                placeholder="Did the driver maintain good behavior? Did they turn on the AC?"
                                value={newCabReviewText}
                                onChange={e => setNewCabReviewText(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-[#008cff] resize-none"
                              />
                            </div>
                            <div className="flex flex-wrap gap-4 mt-1">
                              <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-bold text-gray-650">
                                <input
                                  type="checkbox"
                                  checked={newCabReviewBehavior}
                                  onChange={e => setNewCabReviewBehavior(e.target.checked)}
                                  className="rounded text-[#e8731a] focus:ring-[#e8731a] h-3.5 w-3.5"
                                />
                                Driver maintained good behavior
                              </label>
                              <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-bold text-gray-655">
                                <input
                                  type="checkbox"
                                  checked={newCabReviewAc}
                                  onChange={e => setNewCabReviewAc(e.target.checked)}
                                  className="rounded text-[#e8731a] focus:ring-[#e8731a] h-3.5 w-3.5"
                                />
                                Turned on AC
                              </label>
                              <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-bold text-gray-655">
                                <input
                                  type="checkbox"
                                  checked={newCabReviewClean}
                                  onChange={e => setNewCabReviewClean(e.target.checked)}
                                  className="rounded text-[#e8731a] focus:ring-[#e8731a] h-3.5 w-3.5"
                                />
                                Cab was clean
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100">
                          <h3 className="font-black text-gray-900 text-sm">Special Requests</h3>
                        </div>
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            { key: "roofCarrier", title: "Roof Carrier", desc: "Add Roof Carrier to fit 6 more bags", price: 157 },
                            { key: "language", title: "Drivers Language", desc: "Choose your preferred language for a smoother ride", price: 209 },
                            { key: "newVehicle", title: "New Vehicle", desc: "Promised new car with 2023 or newer model", price: 262 },
                          ].map(req => (
                            <div
                              key={req.key}
                              onClick={() => setSpecialRequests(p => ({ ...p, [req.key]: !p[req.key] }))}
                              className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${specialRequests[req.key] ? "border-[#008cff] bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
                            >
                              {specialRequests[req.key] && (
                                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#008cff] flex items-center justify-center">
                                  <Check size={11} className="text-white" strokeWidth={3} />
                                </div>
                              )}
                              <div className="text-xs font-black text-gray-900 mb-1">{req.title}</div>
                              <div className="text-[10px] text-gray-500 font-medium leading-relaxed mb-2">{req.desc}</div>
                              <div className="text-sm font-black text-[#003580]">₹ {req.price}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Traveller Details */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100">
                          <h3 className="font-black text-gray-900 text-sm">Traveller Details</h3>
                        </div>
                        <div className="p-5 flex flex-col gap-5">
                          {/* Pickup Details */}
                          <div>
                            <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-wider mb-3">Pickup Details</h4>
                            <input
                              type="text"
                              placeholder="ENTER PICKUP LOCATION"
                              className="w-full border-b-2 border-gray-200 focus:border-[#008cff] outline-none py-2 text-sm font-semibold text-gray-800 placeholder-gray-400 transition-colors bg-transparent"
                            />
                          </div>
                          {/* Contact Details */}
                          <div>
                            <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-wider mb-3">Traveller Contact Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col">
                                <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5">Full Name</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Full Name"
                                  value={guestDetails.name}
                                  onChange={e => setGuestDetails(p => ({ ...p, name: e.target.value }))}
                                  className="border-b-2 border-gray-200 focus:border-[#008cff] outline-none py-2 text-sm font-semibold text-gray-800 placeholder-gray-400 transition-colors bg-transparent"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5">Gender</label>
                                <select
                                  value={guestDetails.gender}
                                  onChange={e => setGuestDetails(p => ({ ...p, gender: e.target.value }))}
                                  className="border-b-2 border-gray-200 focus:border-[#008cff] outline-none py-2 text-sm font-semibold text-gray-700 transition-colors bg-transparent"
                                >
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                              <div className="flex flex-col">
                                <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5">Mobile Number</label>
                                <input
                                  type="tel"
                                  required
                                  placeholder="+91 9999999999"
                                  value={guestDetails.phone}
                                  onChange={e => setGuestDetails(p => ({ ...p, phone: e.target.value }))}
                                  className="border-b-2 border-gray-200 focus:border-[#008cff] outline-none py-2 text-sm font-semibold text-gray-800 placeholder-gray-400 transition-colors bg-transparent"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5">Email ID</label>
                                <input
                                  type="email"
                                  required
                                  placeholder="Email Address"
                                  value={guestDetails.email}
                                  onChange={e => setGuestDetails(p => ({ ...p, email: e.target.value }))}
                                  className="border-b-2 border-gray-200 focus:border-[#008cff] outline-none py-2 text-sm font-semibold text-gray-800 placeholder-gray-400 transition-colors bg-transparent"
                                />
                              </div>
                            </div>
                            {guestDetails.gender === "female" && (
                              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-[11px] text-green-800 font-bold leading-normal flex items-start gap-2 animate-in fade-in duration-200 mt-3">
                                <span className="text-sm shrink-0">👩‍✈️</span>
                                <p><strong>Lady Driver Assigned:</strong> Since the passenger is selected as Female, a verified safe female driver will pick you up for safety and comfort.</p>
                              </div>
                            )}
                            {guestDetails.gender === "male" && (
                              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-[11px] text-blue-800 font-bold leading-normal flex items-start gap-2 animate-in fade-in duration-200 mt-3">
                                <span className="text-sm shrink-0">👨‍✈️</span>
                                <p><strong>Male Driver Assigned:</strong> Since the passenger is selected as Male, a verified professional male driver will pick you up.</p>
                              </div>
                            )}
                          </div>
                          <div
                            onClick={() => setCabBillingAddress(p => !p)}
                            className="flex items-center gap-2 cursor-pointer group"
                          >
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${cabBillingAddress ? "bg-[#008cff] border-[#008cff]" : "border-gray-300 group-hover:border-[#008cff]"}`}>
                              {cabBillingAddress && <Check size={10} className="text-white" strokeWidth={3} />}
                            </div>
                            <span className="text-xs text-gray-600 font-medium">Use pickup location as billing address</span>
                          </div>
                          <div className="text-[10px] text-gray-400 font-medium leading-relaxed">
                            By proceeding to book, I agree to{" "}
                            <span className="text-[#008cff] cursor-pointer">Privacy Policy</span>,{" "}
                            <span className="text-[#008cff] cursor-pointer">User Agreement</span>,{" "}
                            <span className="text-[#008cff] cursor-pointer">Terms of Service</span>, &amp;{" "}
                            <span className="text-[#008cff] cursor-pointer">Cancellation Rules</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ═══ RIGHT COLUMN ═══ */}
                    <div className="xl:col-span-4 flex flex-col gap-5">

                      {/* Coupons */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100">
                          <h3 className="font-black text-gray-900 text-sm">Coupon &amp; Offers</h3>
                        </div>
                        <div className="p-4 flex flex-col gap-3">
                          {cabCoupons.map(c => (
                            <div
                              key={c.code}
                              onClick={() => setSelectedCoupon(prev => prev === c.code ? "" : c.code)}
                              className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedCoupon === c.code ? "border-[#008cff] bg-blue-50" : "border-dashed border-gray-200 hover:border-gray-300"}`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                                <Tag size={14} className="text-[#e8731a]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-black text-gray-900">{c.code}</div>
                                <div className="text-[10px] text-gray-500 font-medium mt-0.5 leading-relaxed">{c.desc}</div>
                              </div>
                              {selectedCoupon === c.code && (
                                <div className="w-4 h-4 rounded-full bg-[#008cff] flex items-center justify-center shrink-0 mt-0.5">
                                  <Check size={9} className="text-white" strokeWidth={3} />
                                </div>
                              )}
                            </div>
                          ))}
                          <div className="flex items-center gap-2 border border-dashed border-gray-300 rounded-xl px-3 py-2 mt-1">
                            <Tag size={13} className="text-gray-400 shrink-0" />
                            <input
                              type="text"
                              placeholder="ENTER A COUPON"
                              className="flex-1 bg-transparent outline-none text-xs font-bold text-gray-700 placeholder-gray-400"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Payment Options */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100">
                          <h3 className="font-black text-gray-900 text-sm">Payment options</h3>
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-3">
                          {[
                            { key: "part", label: "Part Pay", sublabel: "Pay rest to the driver", amount: partPayTotal },
                            { key: "full", label: "Full Pay", sublabel: "Full amount", amount: fullTotal },
                          ].map(opt => (
                            <div
                              key={opt.key}
                              onClick={() => setCabPaymentOption(opt.key)}
                              className={`border-2 rounded-xl p-3.5 cursor-pointer transition-all ${cabPaymentOption === opt.key ? "border-[#008cff] bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                            >
                              <div className="flex items-center gap-2 mb-1.5">
                                <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${cabPaymentOption === opt.key ? "border-[#008cff]" : "border-gray-300"}`}>
                                  {cabPaymentOption === opt.key && <div className="w-2 h-2 rounded-full bg-[#008cff]"></div>}
                                </div>
                                <span className="text-xs font-black text-gray-900">{opt.label}</span>
                              </div>
                              <div className="text-[10px] text-gray-500 font-medium mb-1">{opt.sublabel}</div>
                              <div className="text-sm font-black text-gray-900">₹ {opt.amount.toLocaleString()}</div>
                            </div>
                          ))}
                        </div>

                        {/* Fare Breakdown */}
                        <div className="px-5 pb-5 flex flex-col gap-2.5">
                          <div className="border-t border-gray-100 pt-4 mb-1">
                            <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-wider mb-3">Fare Breakdown</h4>
                          </div>
                          {[
                            { label: "Base Fare", val: `₹ ${baseFare.toLocaleString()}` },
                            { label: "Cab charges (Includes fuel, cab)", val: "Included", color: "text-green-600" },
                            { label: "Toll Charges", val: "Included", color: "text-green-600" },
                            { label: "State Tax", val: "Included", color: "text-green-600" },
                            { label: "Parking Charges", val: "Included", color: "text-green-600" },
                            { label: "Taxes & Fees", val: `₹ ${taxes}` },
                            { label: "Driver Charges (Driver food and stay)", val: `₹ ${driverCharges}` },
                            { label: "GST", val: `₹ ${gst}` },
                            { label: "Service Fee", val: `₹ ${serviceFee}` },
                            ...(addOns > 0 ? [{ label: "Special Requests Add-ons", val: `₹ ${addOns}` }] : []),
                            ...(couponDiscount > 0 ? [{ label: `Coupon Discount (${selectedCoupon})`, val: `-₹ ${couponDiscount}`, color: "text-green-600" }] : []),
                          ].map((row, i) => (
                            <div key={i} className="flex justify-between items-center">
                              <span className="text-[11px] text-gray-500 font-medium">{row.label}</span>
                              <span className={`text-[11px] font-bold ${row.color || "text-gray-800"}`}>{row.val}</span>
                            </div>
                          ))}
                          <div className="border-t border-gray-200 pt-3 mt-1 flex justify-between items-center">
                            <span className="text-sm font-black text-gray-900">Total</span>
                            <span className="text-lg font-black text-gray-900">₹ {displayTotal.toLocaleString()}</span>
                          </div>

                          <button
                            onClick={() => {
                              if (!guestDetails.name || !guestDetails.phone || !guestDetails.email) {
                                toast.error("Please fill in your traveller details.");
                                return;
                              }
                              toast.success(`Cab booked! ${selectedItem.name} from ${fromCity} to ${toCity}. Total: ₹${displayTotal.toLocaleString()}`);
                            }}
                            className="w-full mt-2 bg-gradient-to-r from-[#e8731a] to-[#f5a623] hover:from-[#d66a18] hover:to-[#e09420] text-white font-black text-sm py-3.5 rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
                          >
                            Book Cab • ₹ {displayTotal.toLocaleString()}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ══ CANCELLATION POLICY MODAL OVERLAY ══ */}
                  {showCabCancelModal && (
                    <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4">
                      <div className="absolute inset-0" onClick={() => setShowCabCancelModal(false)} />
                      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl relative overflow-hidden flex flex-col p-6 z-10 animate-in fade-in zoom-in-95 duration-150">

                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                          <h3 className="text-base font-black text-gray-900">Cancellation Policy</h3>
                          <button
                            onClick={() => setShowCabCancelModal(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                          </button>
                        </div>

                        {/* Policy Table */}
                        <div className="overflow-hidden border border-gray-200 rounded-xl mb-4">
                          <div className="grid grid-cols-1 lg:grid-cols-12 bg-gray-50 border-b border-gray-200 px-4 py-2.5 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                            <div className="col-span-8">Time</div>
                            <div className="col-span-4 text-right">Charges</div>
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-12 px-4 py-3 text-xs font-semibold text-gray-700 border-b border-gray-100 items-center">
                            <div className="col-span-8">Until <span className="font-extrabold text-gray-900">{getCancelThreshold()}</span>, 1 hour before pick up time</div>
                            <div className="col-span-4 text-right text-green-600 font-extrabold">100% refund</div>
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-12 px-4 py-3 text-xs font-semibold text-gray-700 items-center">
                            <div className="col-span-8">After <span className="font-extrabold text-gray-900">{getCancelThreshold()}</span></div>
                            <div className="col-span-4 text-right text-red-500 font-extrabold">No Refund</div>
                          </div>
                        </div>

                        {/* Policy Descriptions */}
                        <div className="flex flex-col gap-3 text-[11px] text-gray-500 font-medium leading-relaxed max-h-[220px] overflow-y-auto pr-1">
                          <p>
                            WAT service charges are non-refundable. however, if the cab details are not shared in time, free cancellation will be provided
                          </p>
                          <p>
                            Fee is charged to compensate drivers for the time, effort and fuel spent while trying to reach the pickup location.
                          </p>
                          <p>
                            For cancellation, please visit the MyTrips Section on the app/website or use the link shared with you in booking confirmation SMS. In case of any issue regarding cancellation, please call our support team at 0124 4628747, 0124 5045105
                          </p>
                        </div>

                        {/* OKAY Button */}
                        <button
                          onClick={() => setShowCabCancelModal(false)}
                          className="w-full mt-6 py-2.5 border border-[#008cff] text-[#008cff] hover:bg-blue-50/50 active:scale-95 transition-all text-center rounded-xl font-bold text-xs cursor-pointer"
                        >
                          OKAY
                        </button>

                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ══ NON-CAB Details View (Stays, Flights, Attractions) ══ */}
            {activeTab !== "cars" && (
              <div className="flex flex-col gap-8">

                {/* Header / Back Link */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <button
                    onClick={() => setView("results")}
                    className="text-xs font-bold text-gray-500 hover:text-[#003580] flex items-center gap-1 cursor-pointer"
                  >
                    <MdArrowBack size={14} /> Back to Listings
                  </button>
                  <h2 className="text-sm sm:text-base font-extrabold text-gray-700">Confirm Your Selection</h2>
                </div>

                {/* STAYS DETAILS PANEL */}
                {activeTab === "stays" && (() => {
                  const hotelCity = selectedItem.city || "Delhi";
                  const isParis = hotelCity.toLowerCase() === "paris";
                  const isTokyo = hotelCity.toLowerCase() === "tokyo";

                  const displayAddress = selectedItem.address ||
                    (isParis ? "15 Place Vendôme, 75001 Paris, France" :
                      isTokyo ? "3-7-1-2 Nishi-Shinjuku, Tokyo, 163-1055, Japan" :
                        `R/7/51 Gali Number 48 Gujjar chowk, 122010 ${hotelCity}, India`);

                  const subwayAccess = isParis ? "Subway Access: 200 m walking from Opéra Metro Station" :
                    isTokyo ? "Subway Access: 300 m walking from Tochomae Station" :
                      `Subway Access: 500 m walking from ${hotelCity} Aerocity station`;

                  const attractionsList = isParis ? [
                    { name: "Eiffel Tower", dist: "2 km" },
                    { name: "Louvre Museum", dist: "1.5 km" },
                    { name: "Notre-Dame Cathedral", dist: "3 km" },
                    { name: "Arc de Triomphe", dist: "2.5 km" }
                  ] : isTokyo ? [
                    { name: "Shinjuku Gyoen National Garden", dist: "1.2 km" },
                    { name: "Meiji Jingu Shrine", dist: "2 km" },
                    { name: "Tokyo Skytree", dist: "6 km" },
                    { name: "Tokyo Tower", dist: "4 km" }
                  ] : [
                    { name: "Qutub Minar", dist: "8 km" },
                    { name: "National Rail Museum", dist: "9 km" },
                    { name: "Gandhi Smriti", dist: "13 km" },
                    { name: "India Gate", dist: "14 km" }
                  ];

                  const airportsList = isParis ? [
                    { name: "Paris Charles de Gaulle Airport", dist: "23 km" },
                    { name: "Paris Orly Airport", dist: "15 km" }
                  ] : isTokyo ? [
                    { name: "Haneda Airport", dist: "18 km" },
                    { name: "Narita Airport", dist: "60 km" }
                  ] : [
                    { name: `${hotelCity} International Airport`, dist: "650 m" },
                    { name: "Hindon Airport", dist: "32 km" }
                  ];

                  return (
                    <div className="flex flex-col gap-6">

                      {/* Breadcrumbs */}
                      <div className="text-[11px] text-gray-500 font-semibold mb-1 flex items-center gap-1.5 flex-wrap">
                        <span>Home</span> <ChevronRight size={10} />
                        <span>Hotels</span> <ChevronRight size={10} />
                        <span>{isParis ? "France" : isTokyo ? "Japan" : "India"}</span> <ChevronRight size={10} />
                        <span>{hotelCity}</span> <ChevronRight size={10} />
                        <span className="text-gray-700 font-bold">{selectedItem.name} Deals</span>
                      </div>

                      {/* Top Badges & Actions */}
                      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="bg-[#003580] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded">Hotel</span>
                          <span className="bg-green-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-0.5"><Sparkles size={10} /> We Price Match</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-[11px] font-bold text-[#003580] border border-[#003580] rounded px-3 py-1.5 hover:bg-blue-50 transition-colors cursor-pointer">
                            Share Property
                          </button>
                        </div>
                      </div>

                      {/* Photo Grid - 5 Images */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 rounded-xl overflow-hidden shadow-sm">
                        <div className="col-span-12 md:col-span-7 lg:col-span-8 h-[250px] sm:h-[380px] overflow-hidden relative group">
                          <img
                            src={selectedItem.image}
                            alt={selectedItem.name}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-extrabold px-2 py-1 rounded backdrop-blur-sm">
                            Main Bedroom View
                          </div>
                        </div>
                        <div className="hidden md:grid col-span-5 lg:col-span-4 grid-cols-2 grid-rows-2 gap-2 h-[380px]">
                          <div className="overflow-hidden relative group">
                            <img
                              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80"
                              alt="Bathroom"
                              className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded">Bathroom</div>
                          </div>
                          <div className="overflow-hidden relative group">
                            <img
                              src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&auto=format&fit=crop&q=80"
                              alt="Twin beds"
                              className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded">Twin Beds</div>
                          </div>
                          <div className="overflow-hidden relative group">
                            <img
                              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&auto=format&fit=crop&q=80"
                              alt="Dining Room"
                              className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded">Dining</div>
                          </div>
                          <div className="relative overflow-hidden group cursor-pointer">
                            <img
                              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=80"
                              alt="Living Room"
                              className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-white font-black text-xs transition-colors group-hover:bg-black/55">
                              <span className="text-base">+59</span>
                              <span>Photos</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Main Layout Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* LEFT COLUMN: Property Content */}
                        <div className="lg:col-span-8 flex flex-col gap-6">

                          {/* Title, Address, Map and Score Overview */}
                          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                            <div className="flex justify-between items-start gap-4 flex-wrap">
                              <div className="flex-1 min-w-0 md:min-w-[280px]">
                                <div className="flex items-center gap-1 mb-1">
                                  <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug">
                                    {selectedItem.name}
                                  </h1>
                                  <div className="flex shrink-0">
                                    {Array.from({ length: selectedItem.stars || 4 }).map((_, i) => (
                                      <Star key={i} size={13} className="fill-[#febb02] text-[#febb02]" />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-xs text-[#003580] font-bold mt-1.5 flex items-center gap-1">
                                  <MapPin size={12} className="shrink-0" />
                                  <span>{displayAddress}</span>
                                </p>
                                <p className="text-[10px] text-gray-400 font-bold leading-relaxed mt-1">
                                  After booking, all of the property’s details, including telephone and address, are provided in your booking confirmation and your account.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold text-gray-700">
                                  <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100">Good location – show map</span>
                                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{subwayAccess}</span>
                                </div>
                              </div>

                              {/* Scoring Badge */}
                              <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 p-3 rounded-xl shadow-sm shrink-0">
                                <div className="text-right">
                                  <span className="font-extrabold text-sm text-gray-900 block">{selectedItem.rating >= 9 ? "Exceptional" : selectedItem.rating >= 8.5 ? "Fabulous" : selectedItem.rating >= 8 ? "Very Good" : "Pleasant"}</span>
                                  <span className="text-[10px] text-gray-400 font-semibold">{selectedItem.reviewsCount || 15} reviews</span>
                                </div>
                                <div className="bg-[#003580] text-white font-extrabold text-sm w-9 h-9 rounded-lg flex items-center justify-center shadow-sm">
                                  {selectedItem.rating || 6.8}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Map Iframe Section */}
                          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                              <h4 className="font-black text-xs text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
                                <Map size={14} className="text-[#003580]" />
                                <span>Interactive Map &amp; Neighborhood</span>
                              </h4>
                              <span className="text-[10px] text-green-700 font-bold bg-green-50 border border-green-200 px-2 py-0.5 rounded">Excellent Neighborhood Profile</span>
                            </div>
                            <div className="w-full h-[180px] bg-gray-50">
                              <iframe
                                width="100%"
                                height="180"
                                frameborder="0"
                                style={{ border: 0 }}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedItem.name + ", " + hotelCity)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                                allowfullscreen
                                title="Property Location Map"
                              ></iframe>
                            </div>
                          </div>

                          {/* Property Highlights Grid */}
                          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                            <h3 className="font-black text-sm text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-3 mb-4">
                              Property Highlights
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {[
                                { label: "Breakfast", val: "Continental, Italian, Full English/Irish, Asian", icon: Clock },
                                { label: "Private kitchen", val: "Kitchenette, Coffee machine, Electric kettle, Dining table", icon: Compass },
                                { label: "Free WiFi", val: "High-speed wireless internet in all areas", icon: Globe },
                                { label: "Views", val: "Balcony, City view, Garden view, Terrace", icon: Globe },
                                { label: "Wellness", val: "Spa & wellness centre, Hot tub/Jacuzzi, Massage, Sauna", icon: Heart },
                                { label: "Free Parking", val: "Free private parking, Electric charging station", icon: MapPin },
                                { label: "Pet friendly", val: "Pets welcome, Allowed at no extra charge", icon: ShieldCheck },
                                { label: "Shuttle service", val: "Airport shuttle, Shuttle service available", icon: Plane },
                                { label: "Accessibility", val: "Wheelchair accessible, Grab rails, Raised toilet", icon: User }
                              ].map((hl, idx) => {
                                return (
                                  <div key={idx} className="border border-gray-100 rounded-xl p-3 hover:bg-gray-50/50 transition-colors">
                                    <span className="text-xs font-black text-gray-900 block mb-1">{hl.label}</span>
                                    <span className="text-[11px] text-gray-500 font-semibold leading-relaxed block">{hl.val}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* About this property */}
                          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                            <h3 className="font-black text-sm text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-3 mb-1">
                              About this property
                            </h3>
                            <div className="text-xs text-gray-600 font-semibold leading-relaxed space-y-3">
                              <p>
                                <strong className="text-gray-900 font-black block mb-1">Comfortable Accommodations</strong>
                                {selectedItem.description || `${selectedItem.name} in ${hotelCity} offers premium rooms with private bathrooms, balconies, and modern amenities. Each room includes air-conditioning, free WiFi, and a work desk.`}
                              </p>
                              <p>
                                <strong className="text-gray-900 font-black block mb-1">Exceptional Facilities</strong>
                                Guests can enjoy ski-to-door access, a spa and wellness centre, sauna, sun terrace, and free airport shuttle service. Additional facilities include a fitness room, yoga classes, and a hot tub.
                              </p>
                              <p>
                                <strong className="text-gray-900 font-black block mb-1">Dining Experience</strong>
                                The family-friendly restaurant serves continental, American, and Indian cuisines with vegetarian, vegan, and gluten-free options. Breakfast includes champagne, local specialities, and fresh pastries.
                              </p>
                              <p>
                                <strong className="text-gray-900 font-black block mb-1">Prime Location</strong>
                                Located near the center of ${hotelCity}, the hotel is near top local attractions. Free on-site private parking is available.
                              </p>
                            </div>
                          </div>

                          {/* Most Popular Facilities Icons bar */}
                          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                            <h3 className="font-black text-xs text-gray-400 uppercase tracking-wider mb-3">Most Popular Facilities</h3>
                            <div className="flex flex-wrap gap-3">
                              {[
                                "Fitness centre", "Free Wifi", "Spa & wellness centre",
                                "Room service", "Non-smoking rooms", "Airport shuttle",
                                "Facilities for disabled guests", "Tea/Coffee Maker in All Rooms",
                                "Bar", "Breakfast"
                              ].map(fac => (
                                <span key={fac} className="bg-blue-50 text-[#003580] text-[11px] font-bold px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-1">
                                  <CheckCircle size={12} className="text-[#003580] shrink-0" />
                                  <span>{fac}</span>
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Room Availability Table */}
                          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                            <div className="border-b border-gray-100 pb-3 mb-4 flex justify-between items-center flex-wrap gap-2">
                              <div>
                                <h3 className="font-black text-sm text-gray-800 uppercase tracking-wide">Availability</h3>
                                <p className="text-[10px] text-gray-400 font-bold mt-0.5">Select a room type to choose your reservation option</p>
                              </div>
                              <span className="bg-orange-100 text-[#e8731a] text-[10px] font-black uppercase px-2 py-0.5 rounded border border-orange-200">36% off Getaway Deal Active</span>
                            </div>

                            <div className="flex flex-col gap-4">
                              {selectedItem.rooms.map((room, idx) => {
                                const roomPriceStr = room.price ? room.price.toLocaleString() : "18,634";
                                const roomOrigStr = (room.originalPrice || Math.round(room.price * 1.5)).toLocaleString();
                                const roomTaxesStr = (room.taxes || Math.round(room.price * 0.08)).toLocaleString();
                                const isSelected = selectedRoom && selectedRoom.name === room.name;

                                return (
                                  <div
                                    key={idx}
                                    onClick={() => setSelectedRoom(room)}
                                    className={`border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer transition-all ${isSelected ? "border-[#003580] bg-[#003580]/5" : "border-gray-200 hover:border-gray-300"}`}
                                  >
                                    <div className="flex-grow">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="font-black text-sm sm:text-base text-gray-800">{room.name}</h4>
                                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Max guests: {room.maxGuests || 2}</span>
                                      </div>
                                      <p className="text-[11px] text-gray-500 font-bold mt-1">{room.desc || "1 full bed"}</p>
                                      <div className="text-[10px] text-gray-400 font-medium leading-relaxed mt-2 flex flex-wrap gap-2">
                                        <span>Private Kitchen</span> &bull; <span>Balcony</span> &bull; <span>Garden view</span> &bull; <span>Landmark view</span> &bull; <span>City view</span> &bull; <span>Air conditioning</span> &bull; <span>Spa tub</span> &bull; <span>Barbecue</span> &bull; <span>Free Wifi</span>
                                      </div>
                                      <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold text-green-700">
                                        <span>✓ Continental breakfast included</span>
                                        <span>✓ Airport shuttle included</span>
                                        <span>✓ No credit card needed</span>
                                      </div>
                                    </div>

                                    <div className="text-right shrink-0 w-full md:w-auto border-t md:border-t-0 border-gray-150 pt-3 md:pt-0">
                                      <div className="flex flex-col items-end">
                                        <span className="text-[10px] text-gray-400 line-through">₹ {roomOrigStr}</span>
                                        <div className="flex items-baseline gap-1 mt-0.5">
                                          <span className="text-xs font-bold text-[#003580]">₹</span>
                                          <span className="text-lg font-black text-[#003580]">{roomPriceStr}</span>
                                        </div>
                                        <span className="text-[9px] text-[#0f7a3f] font-bold mt-0.5">+₹{roomTaxesStr} taxes &amp; fees</span>
                                        <span className="text-[10px] bg-green-50 border border-green-200 text-[#0f7a3f] px-1.5 py-0.5 rounded font-black mt-2">Getaway Deal</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Change Dates & Guests widget to modify search details easily on the fly */}
                          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                            <h3 className="font-black text-sm text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-3">
                              Change Dates and Guest(s)
                            </h3>
                            <p className="text-[10px] text-gray-400 font-bold -mt-2">
                              Check-in: 2 PM | Check-out: 11 AM
                            </p>

                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                toast.success("Search parameters updated successfully!");
                              }}
                              className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end"
                            >
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Check-in Date</label>
                                <input
                                  type="date"
                                  value={checkInDate}
                                  onChange={(e) => setCheckInDate(e.target.value)}
                                  className="w-full border border-gray-200 rounded-lg p-2 text-xs font-semibold text-gray-800 focus:border-[#003580] outline-none"
                                />
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Check-out Date</label>
                                <input
                                  type="date"
                                  value={checkOutDate}
                                  onChange={(e) => setCheckOutDate(e.target.value)}
                                  className="w-full border border-gray-200 rounded-lg p-2 text-xs font-semibold text-gray-800 focus:border-[#003580] outline-none"
                                />
                              </div>

                              <div className="flex flex-col gap-1.5 relative">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Guests &amp; Rooms</label>
                                <div
                                  onClick={() => setShowGuestPopup(!showGuestPopup)}
                                  className="w-full border border-gray-200 rounded-lg p-2 text-xs font-semibold text-gray-800 focus:border-[#003580] outline-none cursor-pointer flex justify-between items-center bg-transparent min-h-[34px]"
                                >
                                  <span>{guestsCount.adults} Adults &bull; {guestsCount.rooms} Room{guestsCount.rooms > 1 ? "s" : ""}</span>
                                  <ChevronDown size={14} className="text-gray-400" />
                                </div>

                                {showGuestPopup && (
                                  <div className="absolute top-[55px] left-0 bg-white border border-gray-200 rounded-xl p-4 shadow-xl z-30 space-y-3 w-[calc(100vw-2rem)] sm:w-[240px] text-xs font-bold text-gray-800">
                                    <div className="flex justify-between items-center">
                                      <span>Adults</span>
                                      <div className="flex items-center gap-2">
                                        <button
                                          type="button"
                                          disabled={guestsCount.adults <= 1}
                                          onClick={() => setGuestsCount(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                                          className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center disabled:opacity-50"
                                        >
                                          -
                                        </button>
                                        <span>{guestsCount.adults}</span>
                                        <button
                                          type="button"
                                          onClick={() => setGuestsCount(p => ({ ...p, adults: p.adults + 1 }))}
                                          className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span>Rooms</span>
                                      <div className="flex items-center gap-2">
                                        <button
                                          type="button"
                                          disabled={guestsCount.rooms <= 1}
                                          onClick={() => setGuestsCount(p => ({ ...p, rooms: Math.max(1, p.rooms - 1) }))}
                                          className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center disabled:opacity-50"
                                        >
                                          -
                                        </button>
                                        <span>{guestsCount.rooms}</span>
                                        <button
                                          type="button"
                                          onClick={() => setGuestsCount(p => ({ ...p, rooms: p.rooms + 1 }))}
                                          className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                    <div className="flex justify-end pt-1">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setShowGuestPopup(false);
                                        }}
                                        className="text-[#003580] hover:underline"
                                      >
                                        Done
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <button
                                type="submit"
                                className="bg-[#003580] hover:bg-blue-900 text-white font-extrabold text-xs py-2.5 px-4 rounded-lg cursor-pointer transition-all active:scale-95 text-center w-full sm:w-auto min-h-[34px]"
                              >
                                Update Search
                              </button>
                            </form>
                          </div>

                          {/* Hotel area info */}
                          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-black text-sm text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-2 mb-3">Top Attractions</h4>
                              <ul className="text-xs text-gray-600 font-semibold space-y-2">
                                {attractionsList.map((att, i) => (
                                  <li key={i} className="flex justify-between"><span>{att.name}</span> <span className="text-gray-400">{att.dist}</span></li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-black text-sm text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-2 mb-3">Closest Airports</h4>
                              <ul className="text-xs text-gray-600 font-semibold space-y-2">
                                {airportsList.map((ap, i) => (
                                  <li key={i} className="flex justify-between"><span>{ap.name}</span> <span className="text-gray-400">{ap.dist}</span></li>
                                ))}
                              </ul>
                            </div>
                          </div>

                        </div>

                        {/* RIGHT COLUMN: Summary Sidebar */}
                        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-4">

                          {/* Summary details */}
                          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
                            <h3 className="font-black text-sm text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-2.5">
                              Reservation Summary
                            </h3>

                            <div className="flex flex-col gap-2.5 text-xs font-semibold text-gray-600">
                              <div className="flex justify-between items-center">
                                <span>Check-in</span>
                                <span className="text-gray-900 font-bold">{checkInDate || "Thu, Jul 9"}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Check-out</span>
                                <span className="text-gray-900 font-bold">{checkOutDate || "Thu, Aug 6"}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Guests</span>
                                <span className="text-gray-900 font-bold">{guestsCount.adults} Adults, {guestsCount.children} Children</span>
                              </div>
                              {selectedRoom && (
                                <div className="flex justify-between items-start pt-2 border-t border-gray-100">
                                  <span className="shrink-0">Room Type</span>
                                  <span className="text-gray-900 font-bold text-right">{selectedRoom.name}</span>
                                </div>
                              )}
                            </div>

                            <div className="border-t border-gray-150 pt-4 flex justify-between items-baseline">
                              <span className="text-xs font-black text-gray-800 uppercase tracking-wide">Total Price</span>
                              <div className="text-right">
                                <span className="text-2xl font-black text-gray-900">
                                  ₹ {((selectedRoom ? selectedRoom.price : selectedItem.price) + (selectedRoom ? (selectedRoom.taxes || Math.round(selectedRoom.price * 0.08)) : 1200)).toLocaleString()}
                                </span>
                                <span className="text-[10px] text-gray-400 block mt-0.5">Includes taxes &amp; fees</span>
                              </div>
                            </div>

                            <button
                              onClick={() => setView("checkout")}
                              className="w-full bg-[#003580] hover:bg-blue-900 text-white font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                            >
                              Go to Booking <ArrowRight size={14} />
                            </button>
                          </div>

                        </div>

                      </div>
                    </div>
                  );
                })()}

                {/* HOLIDAYS DETAILS PANEL */}
                {activeTab === "holidays" && (() => {
                  const discountPercent = Math.round(((selectedItem.originalPrice - selectedItem.price) / selectedItem.originalPrice) * 100);

                  const hotelUpgradeCost = holidaySelectedHotel ? holidaySelectedHotel.priceDiff : 0;
                  const flightUpgradeCost = holidaySelectedFlight ? holidaySelectedFlight.priceDiff : 0;
                  const activityUpgradeCost = holidaySelectedActivity ? holidaySelectedActivity.priceDiff : 0;

                  // Calculate dynamic room traveler costs
                  const totalAdults = holidayFormRooms.reduce((sum, r) => sum + r.adults, 0);
                  const totalChildWithBed = holidayFormRooms.reduce((sum, r) => sum + r.childWithBed, 0);
                  const totalChildNoBed = holidayFormRooms.reduce((sum, r) => sum + r.childNoBed, 0);
                  const totalInfants = holidayFormRooms.reduce((sum, r) => sum + r.infants, 0);

                  // Base cost per person
                  let basePersonCost = selectedItem.price;

                  // Tour Type Multiplier
                  let typeMultiplier = 1.0;
                  if (holidayFormTourType === "Premium") typeMultiplier = 1.15;
                  if (holidayFormTourType === "Luxury") typeMultiplier = 1.45;
                  if (holidayFormTourType === "Super Luxury") typeMultiplier = 1.85;

                  // Adult total: base cost + upgrades per adult
                  const adultCost = (basePersonCost + hotelUpgradeCost + flightUpgradeCost + activityUpgradeCost) * typeMultiplier;

                  // Child with bed: 75% of base + upgrades
                  const childWithBedCost = ((basePersonCost * 0.75) + hotelUpgradeCost + flightUpgradeCost + activityUpgradeCost) * typeMultiplier;

                  // Child without bed: 50% of base + 50% hotel upgrade
                  const childNoBedCost = ((basePersonCost * 0.50) + (hotelUpgradeCost * 0.5) + (activityUpgradeCost * 0.5)) * typeMultiplier;

                  // Infants: 15% of base
                  const infantCost = (basePersonCost * 0.15) * typeMultiplier;

                  // Calculate subtotal for all guests
                  const travelersSubtotal = (totalAdults * adultCost) +
                    (totalChildWithBed * childWithBedCost) +
                    (totalChildNoBed * childNoBedCost) +
                    (totalInfants * infantCost);

                  const totalTax = 1800 * (totalAdults + totalChildWithBed + totalChildNoBed);

                  let couponDiscount = 0;
                  if (holidayCouponApplied) {
                    if (holidayCouponApplied.type === "flat") {
                      couponDiscount = holidayCouponApplied.discount;
                    } else if (holidayCouponApplied.type === "percentage") {
                      couponDiscount = Math.min(travelersSubtotal * holidayCouponApplied.discount, holidayCouponApplied.maxDiscount || Infinity);
                    }
                  }

                  const finalTotal = Math.max(1000, Math.round(travelersSubtotal + totalTax - couponDiscount));

                  return (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Side: Package info & itinerary */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                          {/* Package banner */}
                          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                            <div className="h-64 sm:h-80 overflow-hidden relative">
                              <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              <div className="absolute bottom-6 left-6 text-white text-left">
                                <span className="bg-teal-600 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded mb-2.5 inline-block shadow-sm">
                                  {selectedItem.theme} Package
                                </span>
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
                                  {selectedItem.name}
                                </h1>
                                <p className="text-white/80 text-xs font-bold mt-1.5 flex items-center gap-1.5">
                                  <span>📍</span> <span dangerouslySetInnerHTML={{ __html: selectedItem.destinations }} />
                                </p>
                              </div>
                            </div>

                            <div className="p-6 text-left">
                              {/* Detailed Section Navigation Tabs */}
                              <div className="mt-6 border-b border-gray-150 flex gap-2 overflow-x-auto scrollbar-hide">
                                {[
                                  { id: "itinerary", label: "🗺️ Day Itinerary" },
                                  { id: "inclusions", label: "✓ Inclusions & Exclusions" },
                                  { id: "hotels", label: "🏨 Hotel Stay Options" },
                                  { id: "policies", label: "📄 Rules & Cancellation" }
                                ].map(t => (
                                  <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setHolidayDetailTab(t.id)}
                                    className={`px-4 py-2 text-xs font-black transition-all border-b-2 cursor-pointer shrink-0 ${holidayDetailTab === t.id
                                      ? "border-[#003580] text-[#003580] font-extrabold"
                                      : "border-transparent text-gray-500 hover:text-gray-800"
                                      }`}
                                  >
                                    {t.label}
                                  </button>
                                ))}
                              </div>

                              {/* Dynamic Tab Contents */}
                              <div className="mt-5 text-xs text-gray-600 leading-relaxed font-semibold">
                                {holidayDetailTab === "itinerary" && (
                                  <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Day-by-Day Itinerary Plan</h4>
                                    <div className="flex flex-col gap-3">
                                      {selectedItem.itinerary.map((dayItem, idx) => {
                                        const isOpen = activeHolidayDay === idx;
                                        return (
                                          <div
                                            key={dayItem.day}
                                            className={`border rounded-xl transition-all overflow-hidden ${isOpen ? 'border-teal-600 shadow-sm bg-teal-50/5' : 'border-gray-200 hover:border-gray-350 bg-white'}`}
                                          >
                                            <button
                                              type="button"
                                              onClick={() => setActiveHolidayDay(isOpen ? -1 : idx)}
                                              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer border-none bg-transparent"
                                            >
                                              <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${isOpen ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-650'}`}>
                                                  D{dayItem.day}
                                                </div>
                                                <div>
                                                  <span className="text-[10px] font-black text-gray-445 uppercase block text-left">Day {dayItem.day}</span>
                                                  <h4 className="text-xs sm:text-sm font-extrabold text-gray-855 text-left">{dayItem.title}</h4>
                                                </div>
                                              </div>
                                              <ChevronDown
                                                size={18}
                                                className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-teal-600' : ''}`}
                                              />
                                            </button>

                                            {isOpen && (
                                              <div className="px-5 pb-5 pt-1 border-t border-gray-100 text-left">
                                                <p className="text-xs text-gray-605 font-medium leading-relaxed">
                                                  {dayItem.description}
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}

                                {holidayDetailTab === "inclusions" && (
                                  <div className="space-y-4 text-left">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                      <div className="bg-green-50/10 border border-green-200 rounded-xl p-4">
                                        <h4 className="text-[11px] font-black text-green-700 uppercase tracking-wider mb-2.5">✅ Included in Your Package</h4>
                                        <ul className="list-disc pl-4 space-y-2 text-gray-600 font-semibold">
                                          <li>Hotel Stay: Premium comfort accommodation based on staying tier</li>
                                          <li>Sightseeing private AC sedan with professional local driver</li>
                                          <li>Daily buffet breakfasts and hot dinners served in the hotel dining room</li>
                                          <li>State entry permit, fuel charges, highway tolls, and driver night allowances</li>
                                          <li>Luggage handling services and flight connections helper support</li>
                                        </ul>
                                      </div>
                                      <div className="bg-red-50/5 border border-red-200 rounded-xl p-4">
                                        <h4 className="text-[11px] font-black text-red-700 uppercase tracking-wider mb-2.5">❌ Excluded (Paid Extra)</h4>
                                        <ul className="list-disc pl-4 space-y-2 text-gray-600 font-semibold">
                                          <li>Daily lunch meals, local snack stops, and premium beverages</li>
                                          <li>Local entry ticket charges for monuments, parks, and museums</li>
                                          <li>Optional adventure water sports, paragliding, and camel riding fees</li>
                                          <li>Laundry, telephone calls, room service items, and waiter tips</li>
                                          <li>Schengen Visa or international processing fees (for international trips)</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {holidayDetailTab === "hotels" && (
                                  <div className="space-y-4 text-left">
                                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Included Hotel Partners</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      {[
                                        { tier: "Standard (3-Star)", name: "Lavender Inn / Lagoon Retreat", desc: "Clean & cozy hotel stay with free Wi-Fi, laundry service, and standard amenities.", rating: "3.8/5 Rating" },
                                        { tier: "Deluxe (4-Star)", name: "Grand Palace Resort & Spa", desc: "Upgraded premium rooms, large buffet breakfasts, swimming pool, and gym access.", rating: "4.4/5 Rating" },
                                        { tier: "Luxury (5-Star)", name: "The Taj Palace / Atlantis Suites", desc: "Top-tier 5-Star accommodations, luxury suites, private spa access, and custom chef-cooked meals.", rating: "4.9/5 Rating" }
                                      ].map((h, i) => (
                                        <div key={i} className="border border-gray-200 rounded-xl p-3.5 bg-white shadow-sm flex flex-col justify-between">
                                          <div>
                                            <span className="text-[10px] font-black text-[#003580] bg-blue-50 px-2 py-0.5 rounded uppercase block w-max mb-1.5">{h.tier}</span>
                                            <h5 className="font-extrabold text-xs text-gray-900 mb-1">{h.name}</h5>
                                            <p className="text-gray-500 text-[10px] leading-relaxed font-semibold">{h.desc}</p>
                                          </div>
                                          <span className="text-[9px] text-teal-650 font-black mt-2.5 block">{h.rating}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {holidayDetailTab === "policies" && (
                                  <div className="space-y-4 text-left text-xs font-semibold text-gray-650">
                                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4.5 space-y-3">
                                      <div>
                                        <h5 className="font-extrabold text-gray-900 mb-1">📅 Cancellation Policy</h5>
                                        <p>Flat 100% refund if cancelled up to 15 days before departure date. 50% refund up to 7 days before departure. Non-refundable within 7 days.</p>
                                      </div>
                                      <div>
                                        <h5 className="font-extrabold text-gray-900 mb-1">💳 Payment Guidelines</h5>
                                        <p>30% deposit is required at check-out to block rooms and flights. The remaining 70% payment is due 10 days before the tour departs.</p>
                                      </div>
                                      <div>
                                        <h5 className="font-extrabold text-gray-900 mb-1">🛂 Travel Advisory</h5>
                                        <p>Valid photo identification (Aadhar / passport) is required at hotel check-in. Double-check packing guides (warm jackets for hills, light cotton/swimwear for beaches).</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* ══ DYNAMIC CUSTOMIZATION PANEL (MMT STYLE) ══ */}
                          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left space-y-6">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                              <div>
                                <h3 className="text-base font-black text-gray-900 uppercase tracking-wide">
                                  Customize Inclusions & Stay Comfort
                                </h3>
                                <p className="text-[10px] text-gray-500 font-bold mt-0.5">Modify flights, accommodations, and sightseeing tours in real-time</p>
                              </div>
                              <span className="bg-[#f0f6ff] text-[#003580] text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg border border-blue-100">
                                ⚡ Dynamic Itinerary
                              </span>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                              {/* 1. FLIGHT CARD */}
                              <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-all bg-white relative">
                                <div className="flex justify-between items-start gap-4 flex-wrap mb-4">
                                  <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1 rounded-md text-[10px] font-black text-[#003580]">
                                    <span>✈️</span> Selected Departure Flight
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setHolidayShowFlightModal(true)}
                                    className="text-xs font-black text-[#003580] hover:text-blue-900 border border-blue-200 hover:border-blue-300 px-3 py-1.5 rounded-lg bg-white transition-all cursor-pointer shadow-sm active:scale-95"
                                  >
                                    Change Flight
                                  </button>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center p-2 border border-gray-100 shrink-0">
                                      <img src={holidaySelectedFlight.logo} alt={holidaySelectedFlight.airline} className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                      <h4 className="font-extrabold text-sm text-gray-900">{holidaySelectedFlight.airline}</h4>
                                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{holidaySelectedFlight.flightNo} · {holidaySelectedFlight.stops}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4 sm:gap-8">
                                    <div className="text-left">
                                      <span className="block text-sm font-black text-gray-900 leading-none">{holidaySelectedFlight.depTime}</span>
                                      <span className="text-[10px] text-gray-500 font-semibold mt-1 block">{holidayDepart}</span>
                                    </div>
                                    <div className="flex flex-col items-center min-w-[70px]">
                                      <span className="text-[9px] text-gray-400 font-bold uppercase">{holidaySelectedFlight.duration}</span>
                                      <div className="w-full h-[1.5px] bg-gray-300 relative my-1">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                      </div>
                                      <span className="text-[8px] text-gray-400 font-extrabold uppercase">Direct</span>
                                    </div>
                                    <div className="text-right">
                                      <span className="block text-sm font-black text-gray-900 leading-none">{holidaySelectedFlight.arrTime}</span>
                                      <span className="text-[10px] text-gray-500 font-semibold mt-1 block">{selectedItem.destinations.split(",")[0]}</span>
                                    </div>
                                  </div>

                                  <div className="border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-5 text-left">
                                    <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1.5">
                                      <span>🧳</span> Cabin: 7 kg
                                    </div>
                                    <div className="text-[10px] text-gray-500 font-bold mt-1 flex items-center gap-1.5">
                                      <span>🎒</span> Check-in: {holidaySelectedFlight.baggage.split("Check-in")[0]}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* 2. HOTEL CARD */}
                              <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-all bg-white">
                                <div className="flex justify-between items-start gap-4 flex-wrap mb-4">
                                  <div className="flex items-center gap-2 bg-teal-50 px-2.5 py-1 rounded-md text-[10px] font-black text-teal-700">
                                    <span>🏨</span> Selected Accommodation stay
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setHolidayShowHotelModal(true)}
                                    className="text-xs font-black text-[#003580] hover:text-blue-900 border border-blue-200 hover:border-blue-300 px-3 py-1.5 rounded-lg bg-white transition-all cursor-pointer shadow-sm active:scale-95"
                                  >
                                    Change Hotel
                                  </button>
                                </div>

                                <div className="flex flex-col md:flex-row gap-5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                  <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden border border-gray-150 shrink-0">
                                    <img src={holidaySelectedHotel.image} alt={holidaySelectedHotel.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1 flex flex-col justify-between text-left">
                                    <div>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="font-extrabold text-sm text-gray-900 leading-snug">{holidaySelectedHotel.name}</h4>
                                        <div className="flex items-center text-yellow-500">
                                          {Array.from({ length: holidaySelectedHotel.stars }).map((_, i) => (
                                            <Star key={i} size={10} fill="currentColor" className="stroke-none" />
                                          ))}
                                        </div>
                                      </div>
                                      <span className="text-[10px] text-gray-500 font-bold block mt-0.5">📍 {holidaySelectedHotel.location}</span>
                                      <p className="text-gray-400 text-[10px] font-bold mt-1.5 flex items-center gap-1.5">
                                        <span className="bg-teal-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded">{holidaySelectedHotel.rating}</span>
                                        <span>({holidaySelectedHotel.reviews} reviews on TripAdvisor)</span>
                                      </p>
                                    </div>

                                    <div className="flex items-center gap-2.5 mt-3 border-t border-gray-200 pt-2 flex-wrap">
                                      {holidaySelectedHotel.amenities.map((amenity, i) => (
                                        <span key={i} className="text-[9px] bg-white border border-gray-150 px-2 py-1 rounded text-gray-600 font-semibold shadow-xs">
                                          ✓ {amenity}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* 3. ACTIVITY CARD */}
                              <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-all bg-white">
                                <div className="flex justify-between items-start gap-4 flex-wrap mb-4">
                                  <div className="flex items-center gap-2 bg-orange-50 px-2.5 py-1 rounded-md text-[10px] font-black text-orange-700">
                                    <span>🗺️</span> Sightseeing & Activity Plan
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setHolidayShowActivityModal(true)}
                                    className="text-xs font-black text-[#003580] hover:text-blue-900 border border-blue-200 hover:border-blue-300 px-3 py-1.5 rounded-lg bg-white transition-all cursor-pointer shadow-sm active:scale-95"
                                  >
                                    Customize Activity
                                  </button>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-left flex flex-col md:flex-row justify-between gap-4">
                                  <div className="flex-1">
                                    <h4 className="font-extrabold text-sm text-gray-900 leading-snug">{holidaySelectedActivity.name}</h4>
                                    <p className="text-gray-500 text-[10px] font-semibold leading-relaxed mt-1.5">{holidaySelectedActivity.desc}</p>
                                  </div>
                                  <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-5 md:min-w-[170px] shrink-0 text-left">
                                    <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1.5">
                                      <span>⏱️</span> {holidaySelectedActivity.duration}
                                    </div>
                                    <div className="text-[10px] text-gray-500 font-bold mt-1.5 flex items-center gap-1.5">
                                      <span>🎟️</span> {holidaySelectedActivity.includes}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 4. COUPONS SECTION */}
                            <div className="border-t border-gray-100 pt-6">
                              <h4 className="text-xs font-black text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <span>🏷️</span> Apply Promo Coupons
                              </h4>

                              {/* Manual Input Code */}
                              <div className="flex gap-2.5 max-w-sm mb-4">
                                <input
                                  type="text"
                                  placeholder="Enter promo code"
                                  value={holidayCouponInput}
                                  onChange={(e) => setHolidayCouponInput(e.target.value.toUpperCase())}
                                  className="border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-extrabold text-gray-800 focus:outline-none focus:border-teal-500 w-full placeholder-gray-400"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const code = holidayCouponInput.trim();
                                    const found = HOLIDAY_COUPONS.find(c => c.code === code);
                                    if (found) {
                                      setHolidayCouponApplied(found);
                                      toast.success(`Coupon ${code} applied successfully!`);
                                    } else {
                                      toast.error("Invalid coupon code entered.");
                                    }
                                  }}
                                  className="bg-[#003580] hover:bg-blue-900 text-white font-extrabold text-xs px-5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95"
                                >
                                  Apply
                                </button>
                              </div>

                              {holidayCouponApplied && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-3.5 flex justify-between items-center mb-4 text-left animate-fade-in">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="bg-green-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">{holidayCouponApplied.code}</span>
                                      <span className="text-xs font-black text-green-800">Coupon Applied Successfully!</span>
                                    </div>
                                    <p className="text-[10px] text-green-700 font-semibold mt-1">{holidayCouponApplied.desc}</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setHolidayCouponApplied(null);
                                      setHolidayCouponInput("");
                                      toast.success("Coupon removed successfully.");
                                    }}
                                    className="text-xs font-black text-red-500 hover:text-red-700 p-1.5 cursor-pointer"
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}

                              {/* Click to Apply lists */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {HOLIDAY_COUPONS.map(c => {
                                  const isApplied = holidayCouponApplied?.code === c.code;
                                  return (
                                    <div
                                      key={c.code}
                                      onClick={() => {
                                        if (isApplied) {
                                          setHolidayCouponApplied(null);
                                          toast.success("Coupon removed.");
                                        } else {
                                          setHolidayCouponApplied(c);
                                          toast.success(`Coupon ${c.code} applied!`);
                                        }
                                      }}
                                      className={`border rounded-xl p-3 cursor-pointer text-left transition-all relative ${isApplied ? 'border-green-600 bg-green-50/10' : 'border-gray-250 hover:border-gray-350 bg-white'}`}
                                    >
                                      <span className="text-[10px] font-black text-[#003580] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded block w-max uppercase mb-1.5">{c.code}</span>
                                      <p className="text-[9px] text-gray-500 font-bold leading-relaxed">{c.desc.replace("off on your very first vacation booking!", "off.").replace("off on holiday package bookings!", "off.")}</p>
                                      {isApplied && (
                                        <span className="absolute -top-1.5 -right-1.5 bg-green-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">✓</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* ══ TRAVELER DETAILS & DYNAMIC CALCULATOR FORM (MMT STYLE) ══ */}
                          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left flex flex-col gap-6">
                            <div>
                              <h3 className="text-sm font-black text-gray-800 uppercase tracking-wide border-b border-gray-150 pb-2 mb-1 flex items-center gap-2">
                                <span>📝</span> Fill in your details
                              </h3>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Configure your departure, tour type, rooms and travelers</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Departure City */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Departure City</label>
                                <select
                                  value={holidayFormDepart}
                                  onChange={(e) => {
                                    setHolidayFormDepart(e.target.value);
                                    setHolidayFormCalculated(false);
                                  }}
                                  className="w-full border border-gray-200 rounded-lg p-2.5 text-xs font-bold text-gray-800 bg-transparent focus:outline-none focus:border-[#003580] cursor-pointer"
                                >
                                  <option value="">Please Select</option>
                                  <option value="Delhi">New Delhi</option>
                                  <option value="Mumbai">Mumbai</option>
                                  <option value="Bangalore">Bangalore</option>
                                  <option value="Goa">Goa</option>
                                  <option value="Kolkata">Kolkata</option>
                                  <option value="Chennai">Chennai</option>
                                </select>
                              </div>

                              {/* Tour Type */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Tour Type</label>
                                <select
                                  value={holidayFormTourType}
                                  onChange={(e) => {
                                    setHolidayFormTourType(e.target.value);
                                    setHolidayFormCalculated(false);
                                  }}
                                  className="w-full border border-gray-200 rounded-lg p-2.5 text-xs font-bold text-gray-800 bg-transparent focus:outline-none focus:border-[#003580] cursor-pointer"
                                >
                                  <option value="Standard">Standard</option>
                                  <option value="Premium">Premium</option>
                                  <option value="Luxury">Luxury</option>
                                  <option value="Super Luxury">Super Luxury</option>
                                </select>
                              </div>
                            </div>

                            {/* Travellers Configuration */}
                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide block">Travellers & Rooms Configuration</label>

                              <div className="flex flex-col gap-4">
                                {holidayFormRooms.map((room, index) => (
                                  <div key={room.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3 relative">
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                      <span className="text-xs font-black text-gray-900">Room {index + 1}</span>
                                      {holidayFormRooms.length > 1 && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setHolidayFormRooms(holidayFormRooms.filter(r => r.id !== room.id));
                                            setHolidayFormCalculated(false);
                                          }}
                                          className="text-[10px] font-black text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                                        >
                                          <Trash size={12} /> Remove
                                        </button>
                                      )}
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                                      {/* Adults */}
                                      <div className="flex flex-col gap-1 bg-white p-2.5 rounded-lg border border-gray-150">
                                        <span className="text-[10px] font-black text-gray-800">Adult</span>
                                        <span className="text-[8px] text-gray-400 font-semibold block">12+ yrs</span>
                                        <div className="flex items-center justify-between mt-2.5">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (room.adults > 1) {
                                                setHolidayFormRooms(holidayFormRooms.map(r => r.id === room.id ? { ...r, adults: r.adults - 1 } : r));
                                                setHolidayFormCalculated(false);
                                              }
                                            }}
                                            className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold text-xs cursor-pointer"
                                          >
                                            <Minus size={10} />
                                          </button>
                                          <span className="text-xs font-black text-gray-900">{room.adults}</span>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (room.adults < 6) {
                                                setHolidayFormRooms(holidayFormRooms.map(r => r.id === room.id ? { ...r, adults: r.adults + 1 } : r));
                                                setHolidayFormCalculated(false);
                                              }
                                            }}
                                            className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold text-xs cursor-pointer"
                                          >
                                            <Plus size={10} />
                                          </button>
                                        </div>
                                      </div>

                                      {/* Child with bed */}
                                      <div className="flex flex-col gap-1 bg-white p-2.5 rounded-lg border border-gray-150">
                                        <span className="text-[10px] font-black text-gray-800">Child (With bed)</span>
                                        <span className="text-[8px] text-gray-400 font-semibold block">Below 12 yrs</span>
                                        <div className="flex items-center justify-between mt-2.5">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (room.childWithBed > 0) {
                                                setHolidayFormRooms(holidayFormRooms.map(r => r.id === room.id ? { ...r, childWithBed: r.childWithBed - 1 } : r));
                                                setHolidayFormCalculated(false);
                                              }
                                            }}
                                            className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold text-xs cursor-pointer"
                                          >
                                            <Minus size={10} />
                                          </button>
                                          <span className="text-xs font-black text-gray-900">{room.childWithBed}</span>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (room.childWithBed < 4) {
                                                setHolidayFormRooms(holidayFormRooms.map(r => r.id === room.id ? { ...r, childWithBed: r.childWithBed + 1 } : r));
                                                setHolidayFormCalculated(false);
                                              }
                                            }}
                                            className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold text-xs cursor-pointer"
                                          >
                                            <Plus size={10} />
                                          </button>
                                        </div>
                                      </div>

                                      {/* Child without bed */}
                                      <div className="flex flex-col gap-1 bg-white p-2.5 rounded-lg border border-gray-150">
                                        <span className="text-[10px] font-black text-gray-800">Child (No bed)</span>
                                        <span className="text-[8px] text-gray-400 font-semibold block">Below 12 yrs</span>
                                        <div className="flex items-center justify-between mt-2.5">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (room.childNoBed > 0) {
                                                setHolidayFormRooms(holidayFormRooms.map(r => r.id === room.id ? { ...r, childNoBed: r.childNoBed - 1 } : r));
                                                setHolidayFormCalculated(false);
                                              }
                                            }}
                                            className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold text-xs cursor-pointer"
                                          >
                                            <Minus size={10} />
                                          </button>
                                          <span className="text-xs font-black text-gray-900">{room.childNoBed}</span>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (room.childNoBed < 4) {
                                                setHolidayFormRooms(holidayFormRooms.map(r => r.id === room.id ? { ...r, childNoBed: r.childNoBed + 1 } : r));
                                                setHolidayFormCalculated(false);
                                              }
                                            }}
                                            className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold text-xs cursor-pointer"
                                          >
                                            <Plus size={10} />
                                          </button>
                                        </div>
                                      </div>

                                      {/* Infant */}
                                      <div className="flex flex-col gap-1 bg-white p-2.5 rounded-lg border border-gray-150">
                                        <span className="text-[10px] font-black text-gray-800">Infant</span>
                                        <span className="text-[8px] text-gray-400 font-semibold block">0-2 yrs</span>
                                        <div className="flex items-center justify-between mt-2.5">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (room.infants > 0) {
                                                setHolidayFormRooms(holidayFormRooms.map(r => r.id === room.id ? { ...r, infants: r.infants - 1 } : r));
                                                setHolidayFormCalculated(false);
                                              }
                                            }}
                                            className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold text-xs cursor-pointer"
                                          >
                                            <Minus size={10} />
                                          </button>
                                          <span className="text-xs font-black text-gray-900">{room.infants}</span>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (room.infants < 2) {
                                                setHolidayFormRooms(holidayFormRooms.map(r => r.id === room.id ? { ...r, infants: r.infants + 1 } : r));
                                                setHolidayFormCalculated(false);
                                              }
                                            }}
                                            className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold text-xs cursor-pointer"
                                          >
                                            <Plus size={10} />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}

                                {holidayFormRooms.length < 4 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setHolidayFormRooms([...holidayFormRooms, { id: Date.now(), adults: 2, childWithBed: 0, childNoBed: 0, infants: 0 }]);
                                      setHolidayFormCalculated(false);
                                    }}
                                    className="w-max bg-gray-50 border border-dashed border-gray-300 hover:bg-gray-100 text-[#003580] font-extrabold text-[11px] px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <PlusCircle size={14} /> +Add Room
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Date of Travel */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Date of Travel</label>
                                <input
                                  type="date"
                                  value={holidayFormTravelDate}
                                  onChange={(e) => {
                                    setHolidayFormTravelDate(e.target.value);
                                    setHolidayFormCalculated(false);
                                  }}
                                  className="w-full border border-gray-200 rounded-lg p-2 text-xs font-bold text-gray-800 bg-transparent focus:outline-none focus:border-[#003580] cursor-pointer"
                                />
                              </div>
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-3">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide block">Contact Details</label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                  <Phone size={14} className="absolute left-3 top-3 text-gray-400" />
                                  <input
                                    type="tel"
                                    placeholder="Mobile Number"
                                    value={holidayFormMobile}
                                    onChange={(e) => {
                                      setHolidayFormMobile(e.target.value);
                                      setHolidayFormCalculated(false);
                                    }}
                                    className="w-full border border-gray-200 rounded-lg p-2.5 pl-9 text-xs font-bold text-gray-850 focus:outline-none focus:border-[#003580]"
                                  />
                                </div>
                                <div className="relative">
                                  <Mail size={14} className="absolute left-3 top-3 text-gray-400" />
                                  <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={holidayFormEmail}
                                    onChange={(e) => {
                                      setHolidayFormEmail(e.target.value);
                                      setHolidayFormCalculated(false);
                                    }}
                                    className="w-full border border-gray-200 rounded-lg p-2.5 pl-9 text-xs font-bold text-gray-855 focus:outline-none focus:border-[#003580]"
                                  />
                                </div>
                              </div>
                              <span className="text-[10px] text-gray-400 font-semibold block text-left">Your booking details will be sent on these contact details.</span>
                            </div>

                            {/* Terms Accept */}
                            <label className="flex items-start gap-2.5 cursor-pointer text-[10px] font-black text-gray-500 hover:text-gray-900 select-none">
                              <input
                                type="checkbox"
                                checked={holidayFormTermsAccepted}
                                onChange={(e) => {
                                  setHolidayFormTermsAccepted(e.target.checked);
                                  setHolidayFormCalculated(false);
                                }}
                                className="accent-[#003580] w-4 h-4 rounded border-gray-300 cursor-pointer mt-0.5"
                              />
                              <span className="leading-normal">I accept the Privacy Policy, Traveler Visa Declaration, and Terms & Conditions</span>
                            </label>
                          </div>
                        </div>

                        {/* Right Side: Pricing Sidebar */}
                        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-4 text-left">
                          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
                            <h3 className="font-black text-sm text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-2.5 flex items-center justify-between">
                              <span>Booking Details</span>
                              <span className="bg-teal-50 text-teal-700 text-[9px] font-black uppercase px-2 py-0.5 rounded">Live Rates</span>
                            </h3>

                            {/* Details Summary */}
                            <div className="flex flex-col gap-2.5 text-xs font-semibold text-gray-600">
                              <div className="flex justify-between items-center">
                                <span>Departure From</span>
                                <span className="text-gray-900 font-bold">{holidayDepart}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Month of Travel</span>
                                <span className="text-gray-900 font-bold">{holidayMonth}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Duration</span>
                                <span className="text-gray-900 font-bold">{selectedItem.duration}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Total Guests</span>
                                <span className="text-gray-900 font-bold">
                                  {holidayFormRooms.reduce((s, r) => s + r.adults, 0)} Adults
                                  {holidayFormRooms.reduce((s, r) => s + r.childWithBed + r.childNoBed, 0) > 0 && (
                                    <span> · {holidayFormRooms.reduce((s, r) => s + r.childWithBed + r.childNoBed, 0)} Children</span>
                                  )}
                                </span>
                              </div>
                            </div>

                            {/* Pricing details */}
                            <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                              <div className="flex justify-between text-xs font-semibold text-gray-655">
                                <span>Base package cost</span>
                                <span>₹{selectedItem.price.toLocaleString()}</span>
                              </div>
                              {hotelUpgradeCost > 0 && (
                                <div className="flex justify-between text-xs font-semibold text-gray-655">
                                  <span>Hotel Comfort Upgrade</span>
                                  <span className="text-teal-650 font-bold">+₹{hotelUpgradeCost.toLocaleString()}</span>
                                </div>
                              )}
                              {flightUpgradeCost > 0 && (
                                <div className="flex justify-between text-xs font-semibold text-gray-655">
                                  <span>Flight Style Upgrade</span>
                                  <span className="text-teal-650 font-bold">+₹{flightUpgradeCost.toLocaleString()}</span>
                                </div>
                              )}
                              {activityUpgradeCost > 0 && (
                                <div className="flex justify-between text-xs font-semibold text-gray-655">
                                  <span>Sightseeing Upgrade</span>
                                  <span className="text-teal-650 font-bold">+₹{activityUpgradeCost.toLocaleString()}</span>
                                </div>
                              )}
                              <div className="flex justify-between text-xs font-semibold text-gray-655">
                                <span>Taxes &amp; government fees</span>
                                <span>₹{totalTax.toLocaleString()}</span>
                              </div>

                              {(selectedItem.originalPrice - selectedItem.price + couponDiscount) > 0 && (
                                <div className="flex justify-between text-xs font-semibold text-green-600">
                                  <span>Total Savings Applied</span>
                                  <span>-₹{((selectedItem.originalPrice - selectedItem.price) + couponDiscount).toLocaleString()}</span>
                                </div>
                              )}

                              <div className="border-t border-gray-200 pt-3 mt-1.5 flex justify-between items-baseline">
                                <span className="text-xs font-black text-gray-950 uppercase tracking-wide">Final Package Cost</span>
                                <div>
                                  <span className="text-xl font-black text-[#003580]">₹{finalTotal.toLocaleString()}</span>
                                  <span className="text-[9px] text-gray-400 font-semibold block text-right">total for all guests</span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => setHolidayShowBreakdownModal(true)}
                                className="text-center text-[10px] font-black text-[#003580] hover:text-blue-900 hover:underline mt-2 flex items-center justify-center gap-1 cursor-pointer"
                              >
                                🔍 View Detailed Pricing Breakup
                              </button>
                            </div>

                            {/* Token Payment locking system */}
                            <div className="border-t border-gray-100 pt-4 text-left">
                              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-2.5">
                                Payment Options
                              </h4>
                              <div className="flex flex-col gap-2">
                                <div
                                  onClick={() => setPayTokenOnly(false)}
                                  className={`border rounded-xl p-2.5 flex items-center justify-between cursor-pointer transition-all ${!payTokenOnly ? 'border-teal-600 bg-teal-50/10' : 'border-gray-250 hover:border-gray-350 bg-white'}`}
                                >
                                  <div>
                                    <span className="block text-xs font-extrabold text-gray-800">Pay Full Amount</span>
                                    <span className="block text-[9px] text-gray-400 font-semibold mt-0.5">Pay ₹{finalTotal.toLocaleString()} now</span>
                                  </div>
                                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${!payTokenOnly ? 'border-teal-600 bg-teal-600' : 'border-gray-300'}`}>
                                    {!payTokenOnly && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                                  </div>
                                </div>

                                <div
                                  onClick={() => setPayTokenOnly(true)}
                                  className={`border rounded-xl p-2.5 flex items-center justify-between cursor-pointer transition-all ${payTokenOnly ? 'border-teal-600 bg-teal-50/10' : 'border-gray-250 hover:border-gray-350 bg-white'}`}
                                >
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="block text-xs font-extrabold text-gray-800">Book for ₹5,000 only</span>
                                      <span className="bg-orange-100 text-orange-700 text-[8px] font-black uppercase px-1 rounded">Lock Rate</span>
                                    </div>
                                    <span className="block text-[9px] text-gray-400 font-semibold mt-0.5">Pay ₹5,000 now, rest 10 days before travel</span>
                                  </div>
                                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${payTokenOnly ? 'border-teal-600 bg-teal-600' : 'border-gray-300'}`}>
                                    {payTokenOnly && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Book CTA */}
                            <button
                              type="button"
                              onClick={() => {
                                selectedItem.price = finalTotal;
                                selectedItem.payTokenOnly = payTokenOnly;
                                selectedItem.tokenAmount = payTokenOnly ? 5000 : finalTotal;
                                selectedItem.customFlight = holidaySelectedFlight;
                                selectedItem.customHotel = holidaySelectedHotel;
                                selectedItem.customActivity = holidaySelectedActivity;
                                selectedItem.appliedCoupon = holidayCouponApplied;
                                setView("checkout");
                              }}
                              className="w-full bg-[#003580] hover:bg-blue-900 text-white font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                            >
                              {payTokenOnly ? "Book Now for ₹5,000" : "Proceed to Booking"} <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {holidayShowBreakdownModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in animate-duration-150">
                          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                              <div>
                                <h3 className="font-black text-gray-900 text-base">🔍 Detailed Pricing Breakdown</h3>
                                <p className="text-[10px] text-gray-500 font-bold mt-0.5">Itemized billing breakdown for your complete package booking</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setHolidayShowBreakdownModal(false)}
                                className="text-gray-400 hover:text-gray-700 font-bold text-lg p-1 cursor-pointer"
                              >
                                ✕
                              </button>
                            </div>

                            <div className="p-6 overflow-y-auto space-y-4 text-left text-xs font-semibold text-gray-655">
                              <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span>Base Package Cost ({totalAdults} Adults × ₹{selectedItem.price.toLocaleString()})</span>
                                <span className="text-gray-900">₹{(totalAdults * selectedItem.price).toLocaleString()}</span>
                              </div>

                              {totalChildWithBed + totalChildNoBed > 0 && (
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                  <span>Child Cost ({totalChildWithBed + totalChildNoBed} Children)</span>
                                  <span className="text-gray-900">
                                    ₹{Math.round((totalChildWithBed * (selectedItem.price * 0.75) + totalChildNoBed * (selectedItem.price * 0.50))).toLocaleString()}
                                  </span>
                                </div>
                              )}

                              {hotelUpgradeCost > 0 && (
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                  <span>Hotel Room Custom Upgrade ({holidaySelectedHotel.name})</span>
                                  <span className="text-gray-900">+₹{(hotelUpgradeCost * totalAdults).toLocaleString()}</span>
                                </div>
                              )}

                              {flightUpgradeCost > 0 && (
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                  <span>Flight Custom Upgrade ({holidaySelectedFlight.airline})</span>
                                  <span className="text-gray-900">+₹{(flightUpgradeCost * totalAdults).toLocaleString()}</span>
                                </div>
                              )}

                              {activityUpgradeCost > 0 && (
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                  <span>Sightseeing Activity Upgrade ({holidaySelectedActivity.name})</span>
                                  <span className="text-gray-900">+₹{(activityUpgradeCost * totalAdults).toLocaleString()}</span>
                                </div>
                              )}

                              <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span>GST &amp; Government Taxes (18%)</span>
                                <span className="text-gray-900">₹{totalTax.toLocaleString()}</span>
                              </div>

                              {couponDiscount > 0 && (
                                <div className="flex justify-between border-b border-gray-100 pb-2 text-green-600 font-extrabold">
                                  <span>Applied Promo Discount ({holidayCouponApplied?.code})</span>
                                  <span>-₹{couponDiscount.toLocaleString()}</span>
                                </div>
                              )}

                              <div className="flex justify-between border-b border-gray-200 pb-2.5 text-green-600">
                                <span>Standard Package Savings Applied</span>
                                <span>-₹{((selectedItem.originalPrice - selectedItem.price)).toLocaleString()}</span>
                              </div>

                              <div className="bg-gray-50 rounded-xl p-4 border border-gray-150 space-y-2 mt-4">
                                <div className="flex justify-between items-baseline">
                                  <span className="font-black text-sm text-gray-900">Total Payable Amount</span>
                                  <span className="font-black text-base text-[#003580]">₹{finalTotal.toLocaleString()}</span>
                                </div>
                                {payTokenOnly && (
                                  <div className="border-t border-gray-200 pt-2 flex justify-between items-center text-[10px] text-orange-700 font-bold">
                                    <span>Amount to pay now:</span>
                                    <span className="text-sm font-black">₹5,000</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}

                {/* ══ CRUISES DETAILS PANEL (Royal Caribbean Style) ══ */}
                {activeTab === "cruises" && (
                  <CruiseDetails
                    cruise={selectedItem}
                    guestsCount={guestsCount}
                    setGuestsCount={setGuestsCount}
                    selectedRoom={selectedRoom}
                    setSelectedRoom={setSelectedRoom}
                    cruiseDrinkPackage={cruiseDrinkPackage}
                    setCruiseDrinkPackage={setCruiseDrinkPackage}
                    cruiseWifiPackage={cruiseWifiPackage}
                    setCruiseWifiPackage={setCruiseWifiPackage}
                    cruiseExcursionPackage={cruiseExcursionPackage}
                    setCruiseExcursionPackage={setCruiseExcursionPackage}
                    selectedCruiseExcursions={selectedCruiseExcursions}
                    setSelectedCruiseExcursions={setSelectedCruiseExcursions}
                    cruisePayOption={cruisePayOption}
                    setCruisePayOption={setCruisePayOption}
                    cruiseNights={cruiseNights}
                    setCruiseNights={setCruiseNights}
                    selectedSpaTreatments={selectedSpaTreatments}
                    setSelectedSpaTreatments={setSelectedSpaTreatments}
                    setView={setView}
                    getCruiseCalculatedTotal={getCruiseCalculatedTotal}
                  />
                )}
                {activeTab === "trains" && (
                  <TrainDetails
                    train={selectedItem}
                    trainClass={trainClass}
                    setTrainClass={setTrainClass}
                    selectedTrainSeats={selectedTrainSeats}
                    setSelectedTrainSeats={setSelectedTrainSeats}
                    trainCatering={trainCatering}
                    setTrainCatering={setTrainCatering}
                    trainFreeCancel={trainFreeCancel}
                    setTrainFreeCancel={setTrainFreeCancel}
                    trainInsurance={trainInsurance}
                    setTrainInsurance={setTrainInsurance}
                    selectedEurailCountries={selectedEurailCountries}
                    setSelectedEurailCountries={setSelectedEurailCountries}
                    guestsCount={guestsCount}
                    setGuestsCount={setGuestsCount}
                    eurailTravellers={eurailTravellers}
                    setEurailTravellers={setEurailTravellers}
                    eurailClass={eurailClass}
                    setEurailClass={setEurailClass}
                    eurailDuration={eurailDuration}
                    setEurailDuration={setEurailDuration}
                    eurailCountry={eurailCountry}
                    setEurailCountry={setEurailCountry}
                    setView={setView}
                    getTrainCalculatedTotal={getTrainCalculatedTotal}
                  />
                )}
                {/* Disabled legacy cruises details */}
                {false && activeTab === "cruises" && (() => {
                  const cruise = selectedItem;
                  const totalGuests = (guestsCount.adults || 2) + (guestsCount.children || 0);
                  const cabinTotal = selectedRoom ? selectedRoom.price * totalGuests : 0;
                  const taxTotal = 8500 * totalGuests;
                  const addonTotal =
                    (cruiseDrinkPackage ? 4500 * cruise.nights * totalGuests : 0) +
                    (cruiseWifiPackage ? 1200 * cruise.nights * totalGuests : 0) +
                    (cruiseExcursionPackage ? 6000 * cruise.nights * totalGuests : 0);
                  const grandTotal = cabinTotal + taxTotal + addonTotal;

                  return (
                    <div className="mx-auto w-full max-w-6xl flex flex-col gap-6 text-left animate-fade-in">
                      {/* Back link */}
                      <button
                        type="button"
                        onClick={() => setView("results")}
                        className="text-xs font-bold text-gray-500 hover:text-[#003580] flex items-center gap-1 w-fit cursor-pointer border-none bg-transparent"
                      >
                        &larr; Back to Cruise Listings
                      </button>

                      {/* Header */}
                      <div className="flex justify-between items-start gap-4 flex-wrap border-b border-gray-150 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                              {cruise.line} International
                            </span>
                            <span className="text-gray-400 text-xs font-semibold">🚢 {cruise.ship}</span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">{cruise.name}</h2>
                          <p className="text-xs text-gray-500 font-bold mt-1.5 flex items-center gap-3">
                            <span className="text-yellow-500 font-extrabold flex items-center gap-0.5">
                              ★ {cruise.rating}
                            </span>
                            <span>({cruise.reviewsCount.toLocaleString()} reviews on Cruise Critic)</span>
                            <span>·</span>
                            <span>⏱️ {cruise.duration}</span>
                          </p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 text-xs font-black uppercase px-3 py-1.5 rounded-lg border border-emerald-100">
                          Best Rate Guaranteed
                        </span>
                      </div>

                      {/* Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Info, Cabins, Itinerary */}
                        <div className="lg:col-span-8 space-y-8">
                          {/* Image Gallery */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2 h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-150">
                              <img src={cruise.image} alt={cruise.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
                              <div className="h-32 sm:h-[152px] rounded-xl overflow-hidden border border-gray-150">
                                <img src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=400&auto=format&fit=crop&q=80" alt="stateroom" className="w-full h-full object-cover" />
                              </div>
                              <div className="h-32 sm:h-[152px] rounded-xl overflow-hidden border border-gray-150">
                                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80" alt="island" className="w-full h-full object-cover" />
                              </div>
                            </div>
                          </div>

                          {/* Ship Highlights */}
                          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-base font-black text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                              <span>🌟</span> Ship Highlights & Neighborhoods
                            </h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600 font-semibold">
                              {(cruise.highlights || ["FlowRider Surf Simulator", "Main Dining & Windjammer Buffet", "Royal Theater Stage Shows", "Adventure Ocean Kids Club"]).map((hl, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Cabin Selection */}
                          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm text-left">
                            <h3 className="text-base font-black text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                              <span>🛏️</span> Select Your Cabin (Stateroom Class)
                            </h3>
                            <div className="flex flex-col gap-4">
                              {cruise.rooms.map((roomOpt, index) => {
                                const isSelected = selectedRoom?.name === roomOpt.name;
                                return (
                                  <div
                                    key={index}
                                    onClick={() => setSelectedRoom(roomOpt)}
                                    className={`border p-4 rounded-xl cursor-pointer flex justify-between items-center flex-wrap gap-4 transition-all ${isSelected
                                        ? "border-blue-600 bg-blue-50/20 ring-1 ring-blue-500"
                                        : "border-gray-200 hover:border-gray-300"
                                      }`}
                                  >
                                    <div className="flex-1 min-w-[200px]">
                                      <div className="flex items-center gap-2">
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-blue-600" : "border-gray-300"}`}>
                                          {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                                        </div>
                                        <h4 className="font-extrabold text-sm text-gray-800">{roomOpt.name}</h4>
                                      </div>
                                      <p className="text-[11px] text-gray-500 mt-1 pl-6">{roomOpt.includes}</p>
                                      <span className="text-[10px] text-gray-400 font-bold mt-1.5 block pl-6">Max Guests: {roomOpt.maxGuests} guests</span>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-xs text-gray-400 block font-semibold">Per guest</span>
                                      <span className="text-base font-black text-gray-950">₹{roomOpt.price.toLocaleString()}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Day-by-day Itinerary */}
                          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm text-left">
                            <h3 className="text-base font-black text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                              <span>🗺️</span> Day-by-Day Cruise Itinerary
                            </h3>
                            <div className="relative border-l-2 border-blue-100 pl-5 ml-2.5 space-y-6">
                              {cruise.itinerary.map((dayItem, idx) => (
                                <div key={idx} className="relative">
                                  {/* Dot */}
                                  <div className="absolute -left-[27px] top-1 w-3 h-3 bg-blue-600 border-2 border-white rounded-full shadow-sm" />
                                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                                    <span className="bg-blue-50 text-[#003580] text-[9px] font-black uppercase px-2 py-0.5 rounded border border-blue-150">
                                      Day {dayItem.day}
                                    </span>
                                    <span className="font-extrabold text-xs text-gray-800">{dayItem.port}</span>
                                  </div>
                                  <p className="text-[11px] text-gray-500 font-semibold mt-1.5 leading-relaxed">
                                    {dayItem.activities}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Pricing details sidebar */}
                        <div className="lg:col-span-4 sticky top-4 space-y-6">
                          <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm text-left flex flex-col gap-5">
                            <div>
                              <h3 className="font-black text-sm text-gray-900 mb-1">Fare Calculator</h3>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Royal Caribbean Reservation</p>
                            </div>

                            {/* Guest configuration input */}
                            <div className="border border-gray-200 rounded-lg p-2.5 flex items-center gap-2.5">
                              <Users className="text-gray-400 shrink-0" size={18} />
                              <div className="flex-grow">
                                <label className="block text-[10px] font-black text-gray-400 uppercase leading-none mb-1">Guests count</label>
                                <select
                                  value={guestsCount.adults}
                                  onChange={(e) => setGuestsCount(prev => ({ ...prev, adults: parseInt(e.target.value) || 2 }))}
                                  className="w-full bg-transparent text-xs font-bold text-gray-800 outline-none border-none cursor-pointer"
                                >
                                  <option value="1">1 Guest</option>
                                  <option value="2">2 Guests</option>
                                  <option value="3">3 Guests</option>
                                  <option value="4">4 Guests</option>
                                  <option value="5">5 Guests</option>
                                </select>
                              </div>
                            </div>

                            {/* Premium Package Add-ons */}
                            <div className="space-y-3.5 border-t border-gray-100 pt-4">
                              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Enhance Your Cruise</h4>

                              {/* Beverage Package Add-on */}
                              <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={cruiseDrinkPackage}
                                  onChange={(e) => setCruiseDrinkPackage(e.target.checked)}
                                  className="mt-0.5"
                                />
                                <div>
                                  <span className="text-xs font-extrabold text-gray-800 block leading-tight">Deluxe Beverage Package</span>
                                  <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">+ ₹4,500 / day / guest</span>
                                </div>
                              </label>

                              {/* Wi-Fi Add-on */}
                              <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={cruiseWifiPackage}
                                  onChange={(e) => setCruiseWifiPackage(e.target.checked)}
                                  className="mt-0.5"
                                />
                                <div>
                                  <span className="text-xs font-extrabold text-gray-800 block leading-tight">VOOM High-Speed Wi-Fi</span>
                                  <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">+ ₹1,200 / day / guest</span>
                                </div>
                              </label>

                              {/* Shore Excursion Add-on */}
                              <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={cruiseExcursionPackage}
                                  onChange={(e) => setCruiseExcursionPackage(e.target.checked)}
                                  className="mt-0.5"
                                />
                                <div>
                                  <span className="text-xs font-extrabold text-gray-800 block leading-tight">Shore Excursions Pass</span>
                                  <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">+ ₹6,000 / day / guest</span>
                                </div>
                              </label>
                            </div>

                            {/* Detailed Bill breakdown */}
                            <div className="border-t border-gray-100 pt-4 space-y-2 text-xs">
                              <div className="flex justify-between font-semibold text-gray-500">
                                <span>Cabin Base Rate ({selectedRoom?.name || "Stateroom"}):</span>
                                <span className="font-bold text-gray-800">₹{selectedRoom ? selectedRoom.price.toLocaleString() : 0} &times; {totalGuests}</span>
                              </div>
                              <div className="flex justify-between font-semibold text-gray-500">
                                <span>Taxes & Port Fees:</span>
                                <span className="font-bold text-gray-800">₹8,500 &times; {totalGuests}</span>
                              </div>
                              {addonTotal > 0 && (
                                <div className="flex justify-between font-semibold text-gray-500">
                                  <span>Cruise Packages & Add-ons:</span>
                                  <span className="font-bold text-gray-800">₹{addonTotal.toLocaleString()}</span>
                                </div>
                              )}
                              <div className="flex justify-between text-sm font-black text-gray-900 border-t border-gray-100 pt-3">
                                <span>Total Price:</span>
                                <span className="text-[#003580]">₹{grandTotal.toLocaleString()}</span>
                              </div>
                            </div>

                            {/* Booking Action Button */}
                            <button
                              onClick={() => setView("checkout")}
                              className="w-full bg-[#003580] hover:bg-blue-900 text-white font-extrabold py-3 rounded-lg text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer text-center"
                            >
                              Proceed to Booking
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* FLIGHTS / CARS DETAILS VIEW */}
                {activeTab !== "stays" && activeTab !== "holidays" && activeTab !== "attractions" && activeTab !== "cruises" && activeTab !== "trains" && (
                  <div className={`mx-auto w-full flex flex-col gap-6 ${activeTab === "flights" ? "max-w-3xl" : "max-w-xl bg-white border border-gray-150 rounded-xl p-6 sm:p-8 shadow-sm"}`}>

                    {activeTab !== "flights" && (
                      <div className="text-center pb-4 border-b border-gray-100">
                        <h3 className="font-black text-lg text-gray-900 tracking-tight">Confirm Reservation</h3>
                        <p className="text-xs text-gray-400 font-semibold mt-1">Review trip specs before paying</p>
                      </div>
                    )}

                    <div className={`${activeTab === "flights" ? "space-y-6" : "space-y-4"}`}>

                      {activeTab === "flights" && (
                        <>
                          {/* Detailed Flight UI Header */}
                          <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-black text-gray-900 tracking-tight">Your flight to {selectedItem.outToCode}</h2>
                            <button className="text-[11px] font-bold text-[#003580] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
                              Share this flight
                            </button>
                          </div>

                          {/* Outbound Leg */}
                          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-gray-50 px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                              <h4 className="font-black text-gray-900 text-sm">Flight to {selectedItem.outToCode}</h4>
                              <span className="text-xs font-bold text-gray-500">{selectedItem.outStops} &bull; {selectedItem.outDur}</span>
                            </div>
                            <div className="p-6 flex flex-col relative">
                              {/* Timeline Line */}
                              <div className="absolute left-[33px] top-10 bottom-10 w-0.5 bg-gray-300 rounded"></div>

                              {/* Leg 1 */}
                              <div className="flex gap-5 relative z-10 mb-6">
                                <div className="flex flex-col items-center mt-1">
                                  <div className="w-3 h-3 rounded-full border-2 border-white bg-gray-400 z-10"></div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <span className="text-xs font-bold text-gray-500">{selectedItem.outFromDate} &bull; {selectedItem.outDep}</span>
                                      <div className="text-sm font-black text-gray-900 mt-0.5">{selectedItem.outFromCode} &bull; Departure Airport</div>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-[11px] font-bold text-gray-500 block">{selectedItem.airline.split(",")[0]}</span>
                                      <span className="text-[11px] font-bold text-gray-500 block mt-0.5">AZ769 &bull; {selectedItem.class || "Economy"}</span>
                                      <span className="text-[11px] text-gray-400 block mt-1">Flight time {selectedItem.outStops !== "Non-stop" ? "8h 40m" : selectedItem.outDur}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {selectedItem.outStops !== "Non-stop" && (
                                <div className="flex gap-5 relative z-10 mb-6 items-center">
                                  <div className="flex flex-col items-center ml-[2px]">
                                    <div className="w-2 h-2 rounded-full border-2 border-white bg-white shadow-sm z-10"></div>
                                  </div>
                                  <div className="flex-1 py-3 border-y border-dashed border-gray-200 my-1">
                                    <span className="text-xs font-bold text-gray-600">Layover 1h 15m</span>
                                  </div>
                                </div>
                              )}

                              {selectedItem.outStops !== "Non-stop" && (
                                <>
                                  {/* Mocked Leg 2 */}
                                  <div className="flex gap-5 relative z-10 mb-6">
                                    <div className="flex flex-col items-center mt-1">
                                      <div className="w-3 h-3 rounded-full border-2 border-white bg-gray-400 z-10"></div>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <span className="text-xs font-bold text-gray-500">{selectedItem.outFromDate} &bull; 9:25 AM</span>
                                          <div className="text-sm font-black text-gray-900 mt-0.5">FCO &bull; Connection</div>
                                        </div>
                                        <div className="text-right">
                                          <span className="text-[11px] font-bold text-gray-500 block">{selectedItem.airline.split(",")[0]}</span>
                                          <span className="text-[11px] font-bold text-gray-500 block mt-0.5">AZ1383 &bull; {selectedItem.class || "Economy"}</span>
                                          <span className="text-[11px] text-gray-400 block mt-1">Flight time 1h 10m</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}

                              {/* Final Arrival */}
                              <div className="flex gap-5 relative z-10">
                                <div className="flex flex-col items-center mt-1">
                                  <div className="w-3 h-3 rounded-full border-2 border-white bg-gray-800 z-10"></div>
                                </div>
                                <div className="flex-1">
                                  <span className="text-xs font-bold text-gray-500">{selectedItem.outToDate} &bull; {selectedItem.outArr}</span>
                                  <div className="text-sm font-black text-gray-900 mt-0.5">{selectedItem.outToCode} &bull; Arrival Airport</div>
                                </div>
                              </div>

                            </div>
                          </div>

                          {/* Return Leg (if exists) */}
                          {selectedItem.retDep && (
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                              <div className="bg-gray-50 px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h4 className="font-black text-gray-900 text-sm">Flight to {selectedItem.retToCode}</h4>
                                <span className="text-xs font-bold text-gray-500">{selectedItem.retStops} &bull; {selectedItem.retDur}</span>
                              </div>
                              <div className="p-6 flex flex-col relative">
                                <div className="absolute left-[33px] top-10 bottom-10 w-0.5 bg-gray-300 rounded"></div>

                                {/* Leg 1 */}
                                <div className="flex gap-5 relative z-10 mb-6">
                                  <div className="flex flex-col items-center mt-1">
                                    <div className="w-3 h-3 rounded-full border-2 border-white bg-gray-400 z-10"></div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <span className="text-xs font-bold text-gray-500">{selectedItem.retFromDate} &bull; {selectedItem.retDep}</span>
                                        <div className="text-sm font-black text-gray-900 mt-0.5">{selectedItem.retFromCode} &bull; Departure Airport</div>
                                      </div>
                                      <div className="text-right">
                                        <span className="text-[11px] font-bold text-gray-500 block">{selectedItem.airline.split(",")[0]}</span>
                                        <span className="text-[11px] font-bold text-gray-500 block mt-0.5">AZ1384 &bull; {selectedItem.class || "Economy"}</span>
                                        <span className="text-[11px] text-gray-400 block mt-1">Flight time {selectedItem.retStops !== "Non-stop" ? "1h 05m" : selectedItem.retDur}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {selectedItem.retStops !== "Non-stop" && (
                                  <div className="flex gap-5 relative z-10 mb-6 items-center">
                                    <div className="flex flex-col items-center ml-[2px]">
                                      <div className="w-2 h-2 rounded-full border-2 border-white bg-white shadow-sm z-10"></div>
                                    </div>
                                    <div className="flex-1 py-3 border-y border-dashed border-gray-200 my-1">
                                      <span className="text-xs font-bold text-gray-600">Layover 1h 30m</span>
                                    </div>
                                  </div>
                                )}

                                {selectedItem.retStops !== "Non-stop" && (
                                  <div className="flex gap-5 relative z-10 mb-6">
                                    <div className="flex flex-col items-center mt-1">
                                      <div className="w-3 h-3 rounded-full border-2 border-white bg-gray-400 z-10"></div>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <span className="text-xs font-bold text-gray-500">{selectedItem.retFromDate} &bull; 1:55 PM</span>
                                          <div className="text-sm font-black text-gray-900 mt-0.5">FCO &bull; Connection</div>
                                        </div>
                                        <div className="text-right">
                                          <span className="text-[11px] font-bold text-gray-500 block">{selectedItem.airline.split(",")[0]}</span>
                                          <span className="text-[11px] font-bold text-gray-500 block mt-0.5">AZ770 &bull; {selectedItem.class || "Economy"}</span>
                                          <span className="text-[11px] text-gray-400 block mt-1">Flight time 7h 45m</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Final Arrival */}
                                <div className="flex gap-5 relative z-10">
                                  <div className="flex flex-col items-center mt-1">
                                    <div className="w-3 h-3 rounded-full border-2 border-white bg-gray-800 z-10"></div>
                                  </div>
                                  <div className="flex-1">
                                    <span className="text-xs font-bold text-gray-500">{selectedItem.retToDate} &bull; {selectedItem.retArr}</span>
                                    <div className="text-sm font-black text-gray-900 mt-0.5">{selectedItem.retToCode} &bull; Arrival Airport</div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          )}

                          {/* Baggage */}
                          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-6">
                            <h4 className="font-black text-gray-900 text-base mb-1">Baggage</h4>
                            <p className="text-xs text-gray-500 font-bold mb-6">The total baggage included in the price</p>

                            <div className="flex flex-col gap-6">
                              <div>
                                <h5 className="text-xs font-extrabold text-[#003580] mb-4">Flight to {selectedItem.outToCode}</h5>
                                <ul className="space-y-4">
                                  <li className="flex justify-between items-start gap-4">
                                    <div className="flex gap-3 items-start">
                                      <Check className="text-green-600 mt-0.5 shrink-0" size={16} />
                                      <div>
                                        <span className="block text-sm font-extrabold text-gray-800">1 personal item</span>
                                        <span className="block text-xs text-gray-500 font-semibold mt-0.5">Fits under the seat in front of you</span>
                                      </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">Included</span>
                                  </li>
                                  <li className="flex justify-between items-start gap-4">
                                    <div className="flex gap-3 items-start">
                                      <Check className="text-green-600 mt-0.5 shrink-0" size={16} />
                                      <div>
                                        <span className="block text-sm font-extrabold text-gray-800">1 carry-on bag</span>
                                        <span className="block text-xs text-gray-500 font-semibold mt-0.5">23 x 40 x 55 cm &bull; Max weight 8 kg</span>
                                      </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">Included</span>
                                  </li>
                                  <li className="flex justify-between items-start gap-4">
                                    <div className="flex gap-3 items-start">
                                      <Check className="text-green-600 mt-0.5 shrink-0" size={16} />
                                      <div>
                                        <span className="block text-sm font-extrabold text-gray-800">1 checked bag</span>
                                        <span className="block text-xs text-gray-500 font-semibold mt-0.5">Max weight 23 kg</span>
                                      </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">Included</span>
                                  </li>
                                </ul>
                              </div>

                              {selectedItem.retDep && (
                                <div className="pt-6 border-t border-gray-100">
                                  <h5 className="text-xs font-extrabold text-[#003580] mb-4">Flight to {selectedItem.retToCode}</h5>
                                  <ul className="space-y-4">
                                    <li className="flex justify-between items-start gap-4">
                                      <div className="flex gap-3 items-start">
                                        <Check className="text-green-600 mt-0.5 shrink-0" size={16} />
                                        <div>
                                          <span className="block text-sm font-extrabold text-gray-800">1 personal item</span>
                                          <span className="block text-xs text-gray-500 font-semibold mt-0.5">Fits under the seat in front of you</span>
                                        </div>
                                      </div>
                                      <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">Included</span>
                                    </li>
                                    <li className="flex justify-between items-start gap-4">
                                      <div className="flex gap-3 items-start">
                                        <Check className="text-green-600 mt-0.5 shrink-0" size={16} />
                                        <div>
                                          <span className="block text-sm font-extrabold text-gray-800">1 carry-on bag</span>
                                          <span className="block text-xs text-gray-500 font-semibold mt-0.5">23 x 40 x 55 cm &bull; Max weight 8 kg</span>
                                        </div>
                                      </div>
                                      <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">Included</span>
                                    </li>
                                    <li className="flex justify-between items-start gap-4">
                                      <div className="flex gap-3 items-start">
                                        <Check className="text-green-600 mt-0.5 shrink-0" size={16} />
                                        <div>
                                          <span className="block text-sm font-extrabold text-gray-800">2 checked bags</span>
                                          <span className="block text-xs text-gray-500 font-semibold mt-0.5">Max weight 23 kg</span>
                                        </div>
                                      </div>
                                      <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">Included</span>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Fare Rules */}
                          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-6">
                            <h4 className="font-black text-gray-900 text-base mb-1">Fare rules</h4>
                            <p className="text-xs text-gray-500 font-bold mb-4">Helpful policy information</p>
                            <div className="flex items-center gap-3">
                              <Info className="text-[#003580] shrink-0" size={18} />
                              <span className="text-sm font-extrabold text-gray-800">You’re allowed to change this flight for a fee</span>
                            </div>
                          </div>

                          {/* Extras you might like */}
                          {selectedItem.flexible && (
                            <div className="bg-[#f0f6ff] border border-blue-100 rounded-xl overflow-hidden shadow-sm p-6">
                              <h4 className="font-black text-gray-900 text-base mb-1">Extras you might like</h4>
                              <p className="text-xs text-gray-500 font-bold mb-4">Can be added for a fee</p>

                              <div className="bg-white rounded-xl border border-blue-200 p-5 flex justify-between items-center gap-4">
                                <div>
                                  <h5 className="font-black text-sm text-gray-900 mb-1">Flexible ticket</h5>
                                  <span className="block text-xs text-gray-500 font-semibold mb-2">Date change possible</span>
                                  <span className="block text-xs font-extrabold text-gray-800">+₹10,982.89 for all travelers</span>
                                </div>
                                <span className="text-[10px] font-bold text-[#003580] bg-blue-50 px-3 py-1.5 rounded-lg whitespace-nowrap">Available in next steps</span>
                              </div>
                            </div>
                          )}

                          {/* Total Price Checkout Box */}
                          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6 sticky bottom-4 z-20">
                            <div>
                              <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Price</div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-base font-bold text-gray-500">₹</span>
                                <span className="text-3xl font-black text-gray-900 tracking-tight leading-none">
                                  {(activeTab === "trains" ? getTrainCalculatedTotal() : selectedItem.price).toLocaleString()}
                                </span>
                              </div>
                              <span className="text-[10px] text-gray-500 font-bold mt-1.5 block">Includes taxes and charges</span>
                            </div>
                            <button
                              onClick={() => setView("checkout")}
                              className="bg-[#003580] hover:bg-blue-900 text-white font-extrabold text-sm px-10 py-3.5 rounded-xl shadow-sm transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
                            >
                              Continue
                            </button>
                          </div>
                        </>
                      )}

                      {activeTab === "cars" && (
                        <div className="bg-gray-50 border border-gray-150 rounded-xl p-4 space-y-2">
                          <div className="flex justify-between text-xs font-extrabold text-[#003580] uppercase tracking-wide">
                            <span>Model</span>
                            <span>{selectedItem.name}</span>
                          </div>
                          <div className="flex justify-between text-xs font-semibold text-gray-500">
                            <span>Specs</span>
                            <span className="text-gray-800 font-bold">{selectedItem.type} &bull; {selectedItem.transmission} &bull; {selectedItem.seats} seats</span>
                          </div>
                        </div>
                      )}

                      {activeTab === "trains" && (
                        <div className="space-y-6 text-left w-full max-w-2xl mx-auto">

                          {/* ══ SECTION A: EURAIL PASS CUSTOMIZER OR TRAIN INFO ══ */}
                          {selectedItem.id === "eurail-pass-item" ? (
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                              <h3 className="text-base font-black text-gray-900 font-[Unbounded] border-b border-gray-100 pb-3 flex items-center gap-2">
                                🇪🇺 Eurail pass details (Thomas Cook Partner)
                              </h3>
                              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                                Select countries to include in your trip planner:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {["France", "Switzerland", "Italy", "Germany", "Austria", "Spain", "Netherlands"].map(c => {
                                  const isSel = selectedEurailCountries.includes(c);
                                  return (
                                    <button
                                      key={c}
                                      type="button"
                                      onClick={() => {
                                        if (isSel) {
                                          setSelectedEurailCountries(p => p.filter(x => x !== c));
                                        } else {
                                          setSelectedEurailCountries(p => [...p, c]);
                                        }
                                      }}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${isSel
                                          ? "bg-blue-50 border-blue-300 text-[#003580]"
                                          : "bg-white border-gray-200 text-gray-650 hover:bg-gray-50"
                                        }`}
                                    >
                                      {isSel ? "✓ " : ""}{c}
                                    </button>
                                  );
                                })}
                              </div>
                              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-xs text-gray-655 leading-relaxed font-semibold">
                                💡 Includes free standard scenic route reservations in {selectedEurailCountries.join(", ") || "selected countries"}.
                              </div>
                            </div>
                          ) : (
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                              <h3 className="text-base font-black text-gray-900 font-[Unbounded] border-b border-gray-100 pb-3 flex items-center gap-2">
                                🚅 {selectedItem.name} Route details
                              </h3>
                              <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                                <span>Route:</span>
                                <span className="text-gray-800 font-bold">{selectedItem.from} &rarr; {selectedItem.to}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                                <span>Schedule:</span>
                                <span className="text-gray-800 font-bold">{selectedItem.depart} - {selectedItem.arrive} ({selectedItem.duration})</span>
                              </div>
                              <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                                <span>Coach Class Selected:</span>
                                <span className="text-gray-800 font-bold">{selectedItem.class}</span>
                              </div>
                            </div>
                          )}

                          {/* ══ SECTION B: INTERACTIVE SEAT / BERTH SELECTOR ══ */}
                          {selectedItem.id !== "eurail-pass-item" && (
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                              <div>
                                <h3 className="text-base font-black text-gray-900 font-[Unbounded] flex items-center gap-2">
                                  💺 Interactive Coach Berth Map
                                </h3>
                                <p className="text-xs text-gray-400 font-bold mt-1">Select your preferred berths in Coach S1/B1</p>
                              </div>

                              {/* Berth Grid */}
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-gray-50 border border-gray-150 rounded-2xl p-4">
                                {Array.from({ length: 18 }).map((_, idx) => {
                                  const seatNum = idx + 1;
                                  const isSelected = selectedTrainSeats.includes(seatNum);
                                  // Assign berth labels dynamically
                                  const berthType = seatNum % 6 === 1 || seatNum % 6 === 2 ? "Lower" : seatNum % 6 === 3 || seatNum % 6 === 4 ? "Middle" : "Upper";
                                  return (
                                    <button
                                      key={seatNum}
                                      type="button"
                                      onClick={() => {
                                        if (isSelected) {
                                          setSelectedTrainSeats(p => p.filter(s => s !== seatNum));
                                        } else {
                                          if (selectedTrainSeats.length >= 4) {
                                            toast.error("You can select up to 4 berths per ticket!");
                                            return;
                                          }
                                          setSelectedTrainSeats(p => [...p, seatNum]);
                                        }
                                      }}
                                      className={`h-12 border rounded-lg flex flex-col items-center justify-center p-1 text-[9px] font-bold cursor-pointer transition ${isSelected
                                          ? "bg-[#003580] border-[#003580] text-white shadow-sm"
                                          : "bg-white border-gray-200 text-gray-650 hover:bg-gray-100"
                                        }`}
                                    >
                                      <span className="text-[10px] font-black">{seatNum}</span>
                                      <span className="scale-[0.8] leading-none opacity-80">{berthType}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              <div className="flex gap-4 justify-center text-[10px] font-bold text-gray-600">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-3.5 h-3.5 rounded border border-gray-200 bg-white"></div>
                                  <span>Available</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <div className="w-3.5 h-3.5 rounded bg-[#003580]"></div>
                                  <span>Selected</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* ══ SECTION C: IRCTC CATERING MEAL ADD-ON ══ */}
                          {selectedItem.id !== "eurail-pass-item" && (
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                              <div>
                                <h3 className="text-base font-black text-gray-900 font-[Unbounded] flex items-center gap-2">
                                  🍱 IRCTC Catering Service (In-Train Meals)
                                </h3>
                                <p className="text-xs text-gray-400 font-bold mt-1">Book hygienic fresh meals delivered to your seat</p>
                              </div>

                              <div className="space-y-3">
                                {[
                                  { id: "vegThali", name: "Standard Veg Thali", desc: "Dal, Paneer Curry, Roti, Rice, Curd & Pickle", price: 150 },
                                  { id: "chickenBiryani", name: "Chicken Dum Biryani", desc: "Classic dum biryani served with raita", price: 220 },
                                  { id: "jainThali", name: "Pure Jain Thali", desc: "No onion, no garlic vegetarian platter", price: 130 }
                                ].map(meal => {
                                  const qty = trainCatering[meal.id] || 0;
                                  return (
                                    <div key={meal.id} className="border border-gray-150 rounded-xl p-3 flex justify-between items-center bg-gray-50/50">
                                      <div className="text-left">
                                        <h4 className="font-extrabold text-xs text-gray-805">{meal.name}</h4>
                                        <p className="text-[10px] text-gray-400 font-semibold">{meal.desc}</p>
                                        <span className="text-[10px] font-black text-[#003580] mt-1 block">₹{meal.price}</span>
                                      </div>

                                      <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-lg p-1">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (qty > 0) setTrainCatering(p => ({ ...p, [meal.id]: qty - 1 }));
                                          }}
                                          className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs bg-gray-50 border border-gray-150 hover:bg-gray-100 cursor-pointer animate-pulse"
                                        >
                                          -
                                        </button>
                                        <span className="text-xs font-black w-4 text-center">{qty}</span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setTrainCatering(p => ({ ...p, [meal.id]: qty + 1 }));
                                          }}
                                          className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs bg-gray-50 border border-gray-150 hover:bg-gray-100 cursor-pointer animate-pulse"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* ══ SECTION D: CANCELLATION & INSURANCE SECURE FLOW ══ */}
                          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                            <h3 className="text-base font-black text-gray-900 font-[Unbounded] border-b border-gray-100 pb-3 flex items-center gap-2">
                              🛡️ Travel Protection & Insurance
                            </h3>

                            {/* Free Cancellation */}
                            <label className="flex items-start gap-3 cursor-pointer group">
                              <div
                                onClick={() => setTrainFreeCancel(p => !p)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 mt-0.5 ${trainFreeCancel ? "bg-[#003580] border-[#003580]" : "border-gray-300 bg-white group-hover:border-[#003580]"
                                  }`}
                              >
                                {trainFreeCancel && <Check size={12} className="text-white" strokeWidth={3} />}
                              </div>
                              <div>
                                <span className="block text-xs font-extrabold text-gray-805">Add Free Cancellation Protection (+₹199 per traveler)</span>
                                <span className="block text-[10px] text-gray-450 font-bold mt-0.5">Get 100% ticket refunds back to wallet for any cancellation reason.</span>
                              </div>
                            </label>

                            {/* Travel Insurance */}
                            <label className="flex items-start gap-3 cursor-pointer group pt-3 border-t border-gray-100">
                              <div
                                onClick={() => setTrainInsurance(p => !p)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 mt-0.5 ${trainInsurance ? "bg-[#003580] border-[#003580]" : "border-gray-300 bg-white group-hover:border-[#003580]"
                                  }`}
                              >
                                {trainInsurance && <Check size={12} className="text-white" strokeWidth={3} />}
                              </div>
                              <div>
                                <span className="block text-xs font-extrabold text-gray-805">Secure my trip with Rail Travel Insurance (+₹0.35 per traveler)</span>
                                <span className="block text-[10px] text-gray-450 font-bold mt-0.5">Accidental insurance cover up to ₹10 Lakhs. Managed under IRCTC insurance policy partner.</span>
                              </div>
                            </label>
                          </div>
                        </div>
                      )}

                      {activeTab !== "flights" && activeTab !== "cars" && (
                        <div className="flex justify-between items-baseline pt-4 border-t border-gray-100">
                          <span className="text-xs font-black text-gray-800 uppercase tracking-wide">Subtotal</span>
                          <span className="text-lg font-black text-gray-900">₹{(activeTab === "buses" ? (Math.max(1, selectedBusSeats.length) * selectedItem.price) : selectedItem.price).toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {activeTab !== "flights" && activeTab !== "cars" && (
                      <button
                        onClick={() => {
                          if (activeTab === "buses" && selectedBusSeats.length === 0) {
                            toast.error("Please select at least one seat to proceed.");
                            return;
                          }
                          setView("checkout");
                        }}
                        className="w-full bg-[#003580] hover:bg-blue-900 text-white font-extrabold py-3 rounded-lg text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                      >
                        Proceed to Checkout
                      </button>
                    )}
                  </div>
                )}

                {/* ══ ATTRACTIONS DETAILS VIEW (MakeMyTrip Style) ══ */}
                {activeTab === "attractions" && (() => {
                  const basePrice = selectedItem.price || 1500;
                  let variantDiffAdult = 0;
                  let variantDiffChild = 0;
                  let variantName = "Standard Entry Ticket";

                  if (attractionVariant === "priority") {
                    variantDiffAdult = 1200;
                    variantDiffChild = 600;
                    variantName = "Skip-the-Line Priority Ticket";
                  } else if (attractionVariant === "vip") {
                    variantDiffAdult = 2500;
                    variantDiffChild = 1250;
                    variantName = "VIP Guided Tour + AC Transfers";
                  }

                  const subtotalAdults = attractionAdults * (basePrice + variantDiffAdult);
                  const subtotalChildren = attractionChildren * (Math.round(basePrice * 0.70) + variantDiffChild);
                  const subtotal = subtotalAdults + subtotalChildren;
                  const taxes = Math.round(subtotal * 0.18);
                  const rawTotal = subtotal + taxes;

                  // Coupon calculations
                  let couponDiscount = 0;
                  if (attractionCoupon?.code === "ADVENTURE200") {
                    couponDiscount = 200;
                  } else if (attractionCoupon?.code === "EXPLORE500") {
                    if (rawTotal >= 3000) couponDiscount = 500;
                  } else if (attractionCoupon?.code === "WELCOMEWALK") {
                    couponDiscount = Math.round(rawTotal * 0.10);
                  }

                  const finalTotal = Math.max(0, rawTotal - couponDiscount);
                  const payNowAmount = attractionPayToken ? 500 : finalTotal;

                  const attractionCoupons = [
                    { code: "ADVENTURE200", desc: "Get flat Rs. 200 off on all tours!" },
                    { code: "EXPLORE500", desc: "Save Rs. 500 on checkout orders above Rs. 3,000" },
                    { code: "WELCOMEWALK", desc: "Enjoy 10% instant savings for new travelers!" }
                  ];

                  return (
                    <div className="mx-auto w-full max-w-6xl flex flex-col gap-6 text-left animate-fade-in">
                      {/* Back link */}
                      <button
                        type="button"
                        onClick={() => navigate(tabRouteMap[activeTab] || "/hotel")}
                        className="text-xs font-bold text-gray-500 hover:text-[#003580] flex items-center gap-1 w-fit cursor-pointer border-none bg-transparent"
                      >
                        &larr; Back to Attractions Search
                      </button>

                      {/* Header Section */}
                      <div className="flex justify-between items-start gap-4 flex-wrap border-b border-gray-150 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-50 text-[#003580] text-[10px] font-black uppercase px-2 py-0.5 rounded border border-blue-100">
                              ★ Top Attraction
                            </span>
                            <span className="text-gray-400 text-xs font-semibold">📍 {selectedItem.city}</span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">{selectedItem.name}</h2>
                          <p className="text-xs text-gray-500 font-bold mt-1.5 flex items-center gap-3">
                            <span className="text-yellow-500 font-extrabold flex items-center gap-0.5">
                              ★ {selectedItem.rating || 4.7}
                            </span>
                            <span>({(selectedItem.reviewsCount || 98).toLocaleString()} reviews on TripAdvisor)</span>
                            <span>·</span>
                            <span>⏱️ {selectedItem.duration || "Flexible"}</span>
                          </p>
                        </div>
                        <span className="bg-teal-50 text-teal-700 text-xs font-black uppercase px-3 py-1.5 rounded-lg border border-teal-100">
                          Free Cancelation Option
                        </span>
                      </div>

                      {/* Outer Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column */}
                        <div className="lg:col-span-8 space-y-8">
                          {/* Visual Gallery */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2 h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-150">
                              <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
                              <div className="h-32 sm:h-[152px] rounded-xl overflow-hidden border border-gray-150">
                                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&auto=format&fit=crop&q=80" alt="sightseeing tour" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                              </div>
                              <div className="h-32 sm:h-[152px] rounded-xl overflow-hidden border border-gray-150">
                                <img src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=300&auto=format&fit=crop&q=80" alt="guides" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                              </div>
                            </div>
                          </div>

                          {/* Custom Tab toggler inside Details */}
                          <div className="border-b border-gray-200 flex gap-6">
                            {["overview", "itinerary", "guidelines"].map(tab => (
                              <button
                                key={tab}
                                type="button"
                                onClick={() => setAttractionDetailTab(tab)}
                                className={`pb-3 font-extrabold text-xs capitalize cursor-pointer transition-colors ${attractionDetailTab === tab ? "border-b-2 border-[#003580] text-[#003580]" : "text-gray-400 hover:text-gray-700"
                                  }`}
                              >
                                {tab}
                              </button>
                            ))}
                          </div>

                          {/* TAB CONTENT */}
                          {attractionDetailTab === "overview" && (
                            <div className="space-y-6 text-left">
                              {/* Description */}
                              <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-sm">
                                <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide mb-3">About this experience</h3>
                                <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                                  {selectedItem.description} Step back in time as your local certified host guides you through the deep cultural context, architectural details, and hidden histories of these highly celebrated landmarks. This is an immersive sightseeing trip designed to maximize photo opportunities and historic insights.
                                </p>
                              </div>

                              {/* Highlights Grid */}
                              <div>
                                <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide mb-3">Key Highlights</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {(selectedItem.benefits || ["Bypass entry queue", "Local history insights", "Instant reservation access"]).map((ben, i) => (
                                    <div key={i} className="flex gap-2.5 items-center bg-gray-50 border border-gray-100 rounded-xl p-3">
                                      <span className="text-green-600 font-black text-sm">✓</span>
                                      <span className="text-xs font-extrabold text-gray-800">{ben}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Inclusions */}
                              <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-sm">
                                <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide mb-3">What's Included</h3>
                                <p className="text-xs text-gray-500 font-bold leading-relaxed">
                                  {selectedItem.includes || "Includes general admission barcode ticket and guided audio commentary app."}
                                </p>
                              </div>
                            </div>
                          )}

                          {attractionDetailTab === "itinerary" && (
                            <div className="space-y-4">
                              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide mb-4">Activity Timeline Plan</h3>
                              <div className="relative pl-6 border-l border-gray-200 space-y-6">
                                {[
                                  { time: "0-15 Mins", title: "Meeting & Ticket Scanning", desc: "Assemble at the priority tour meeting counter. Receive your admission tickets and meet your tour host." },
                                  { time: "Hour 1-2", title: "Guided Landmarks Walkabout", desc: "Gain access to the historic structures. Explore iconic rooms, galleries, and hidden courtyards with storytelling guides." },
                                  { time: "Hour 2-3", title: "Photo Session & Free Time", desc: "Walk through garden trails. Take pictures at the best panorama viewpoints, with custom guidance from your photographer host." },
                                  { time: "Final Hour", title: "Traditional snack tasting & wrap up", desc: "Conclude the exploration at the guest lounge. Enjoy local refreshments and clear up any final questions with guides." }
                                ].map((timeline, idx) => (
                                  <div key={idx} className="relative">
                                    <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-blue-700 border-2 border-white"></div>
                                    <div>
                                      <span className="bg-blue-50 text-blue-800 text-[9px] font-black uppercase px-2 py-0.5 rounded">
                                        {timeline.time}
                                      </span>
                                      <h4 className="font-extrabold text-xs text-gray-900 mt-1">{timeline.title}</h4>
                                      <p className="text-[10px] text-gray-500 font-semibold mt-0.5 leading-relaxed">{timeline.desc}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {attractionDetailTab === "guidelines" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                              <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-sm space-y-3">
                                <h4 className="font-black text-xs text-gray-800 uppercase tracking-wider text-green-700">✓ What to bring</h4>
                                <ul className="text-[10px] text-gray-500 font-bold space-y-2 list-disc pl-4">
                                  <li>Comfortable walking shoes (recommended)</li>
                                  <li>Valid physical ID card or passport</li>
                                  <li>Camera or smartphones for photography</li>
                                  <li>Hat and sunscreen for open outdoor paths</li>
                                </ul>
                              </div>
                              <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-sm space-y-3">
                                <h4 className="font-black text-xs text-gray-800 uppercase tracking-wider text-red-700">✕ Prohibited items</h4>
                                <ul className="text-[10px] text-gray-500 font-bold space-y-2 list-disc pl-4">
                                  <li>Large travel bags or oversized backpacks</li>
                                  <li>Pets or animals inside monument gates</li>
                                  <li>Tripods and heavy flash filming gear</li>
                                  <li>Food and open drinks inside historical chambers</li>
                                </ul>
                              </div>
                            </div>
                          )}

                          {/* Ticket Variant Selector Section */}
                          <div className="border-t border-gray-150 pt-6">
                            <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                              <span>🎟️</span> Select Ticket Variant Option
                            </h3>
                            <p className="text-[10px] text-gray-500 font-bold mb-4">Choose ticket tier to upgrades entry comfort</p>

                            <div className="grid grid-cols-1 gap-3.5">
                              {[
                                { id: "std", name: "Standard Entry Ticket", priceLabel: "Included in baseline pricing", diff: 0, desc: "General admission ticket. Access to all public pathways, observation decks, and grounds." },
                                { id: "priority", name: "Skip-the-Line Priority Ticket", priceLabel: "+ ₹1,200 / adult · + ₹600 / child", diff: 1200, desc: "Fast-track entrance lanes skip queue lines entirely, saving up to 2 hours of waiting time." },
                                { id: "vip", name: "VIP Guided Group Tour + Private AC Transfers", priceLabel: "+ ₹2,500 / adult · + ₹1,250 / child", diff: 2500, desc: "Includes certified Art Historian guide, premium headsets, and direct hotel pick-up/drop-off." }
                              ].map(variant => {
                                const isSel = attractionVariant === variant.id;
                                return (
                                  <div
                                    key={variant.id}
                                    onClick={() => {
                                      setAttractionVariant(variant.id);
                                      toast.success(`Upgraded ticket to ${variant.name}!`);
                                    }}
                                    className={`border rounded-xl p-4 cursor-pointer text-left transition-all flex justify-between gap-4 items-center relative ${isSel ? 'border-blue-600 bg-blue-50/5 shadow-xs' : 'border-gray-250 hover:border-gray-350 bg-white'
                                      }`}
                                  >
                                    <div className="flex-1 text-left">
                                      <div className="flex items-center gap-2.5 flex-wrap">
                                        <span className="font-extrabold text-xs text-gray-900 leading-snug">{variant.name}</span>
                                        <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${isSel ? 'bg-blue-100 text-[#003580]' : 'bg-gray-100 text-gray-500'}`}>
                                          {variant.priceLabel}
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-gray-500 font-semibold mt-1.5 leading-relaxed">{variant.desc}</p>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSel ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                                      {isSel && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Right Column (Sticky Configurator Sidebar) */}
                        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-4 text-left">
                          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                            <h3 className="font-black text-sm text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-2.5">
                              Configure Booking
                            </h3>

                            {/* Date of Visit */}
                            <div>
                              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                                Select Visit Date
                              </label>
                              <input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                className="border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 w-full focus:outline-none focus:border-blue-600"
                              />
                            </div>

                            {/* Guest Counter */}
                            <div className="space-y-3">
                              <span className="block text-[9px] font-black text-gray-400 uppercase tracking-wider">Number of Visitors</span>

                              {/* Adults */}
                              <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                                <div>
                                  <span className="block text-xs font-extrabold text-gray-800">Adults</span>
                                  <span className="block text-[9px] text-gray-400 font-semibold">Ages 12+</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => setAttractionAdults(Math.max(1, attractionAdults - 1))}
                                    className="w-6 h-6 border border-gray-200 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-xs font-extrabold cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <span className="text-xs font-black text-gray-900 w-4 text-center">{attractionAdults}</span>
                                  <button
                                    type="button"
                                    onClick={() => setAttractionAdults(attractionAdults + 1)}
                                    className="w-6 h-6 border border-gray-200 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-xs font-extrabold cursor-pointer"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              {/* Children */}
                              <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                                <div>
                                  <span className="block text-xs font-extrabold text-gray-800">Children</span>
                                  <span className="block text-[9px] text-gray-400 font-semibold">Ages 3-11 (30% off)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => setAttractionChildren(Math.max(0, attractionChildren - 1))}
                                    className="w-6 h-6 border border-gray-200 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-xs font-extrabold cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <span className="text-xs font-black text-gray-900 w-4 text-center">{attractionChildren}</span>
                                  <button
                                    type="button"
                                    onClick={() => setAttractionChildren(attractionChildren + 1)}
                                    className="w-6 h-6 border border-gray-200 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-xs font-extrabold cursor-pointer"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Coupon Code Section */}
                            <div className="border-t border-gray-100 pt-4">
                              <span className="block text-[9px] font-black text-gray-400 uppercase tracking-wider mb-2">Apply Promo Code</span>

                              <div className="flex gap-2 mb-3">
                                <input
                                  type="text"
                                  placeholder="Enter coupon code"
                                  value={attractionCouponInput}
                                  onChange={(e) => setAttractionCouponInput(e.target.value.toUpperCase())}
                                  className="border border-gray-200 rounded-xl px-3.5 py-1.5 text-xs font-bold text-gray-850 w-full focus:outline-none focus:border-blue-600 placeholder-gray-450 uppercase"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const code = attractionCouponInput.trim();
                                    const found = attractionCoupons.find(c => c.code === code);
                                    if (found) {
                                      setAttractionCoupon(found);
                                      toast.success(`Coupon ${code} applied successfully!`);
                                    } else {
                                      toast.error("Invalid coupon code.");
                                    }
                                  }}
                                  className="bg-[#003580] hover:bg-blue-900 text-white text-xs font-extrabold px-4 py-1.5 rounded-xl transition-all cursor-pointer"
                                >
                                  Apply
                                </button>
                              </div>

                              {attractionCoupon && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-2.5 flex justify-between items-center text-xs text-green-800 font-extrabold">
                                  <div>
                                    <span>✓ Coupon {attractionCoupon.code}</span>
                                    <p className="text-[9px] text-green-600 font-bold mt-0.5">{attractionCoupon.desc}</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setAttractionCoupon(null);
                                      setAttractionCouponInput("");
                                      toast.success("Coupon removed.");
                                    }}
                                    className="text-[10px] text-red-500 font-black hover:underline cursor-pointer"
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Pricing breakdown */}
                            <div className="border-t border-gray-100 pt-4 space-y-2 text-xs font-semibold text-gray-600">
                              <div className="flex justify-between items-center">
                                <span>Adult Entry ({attractionAdults} × ₹{(basePrice + variantDiffAdult).toLocaleString()})</span>
                                <span className="text-gray-900 font-bold">₹{subtotalAdults.toLocaleString()}</span>
                              </div>
                              {attractionChildren > 0 && (
                                <div className="flex justify-between items-center">
                                  <span>Child Entry ({attractionChildren} × ₹{(Math.round(basePrice * 0.70) + variantDiffChild).toLocaleString()})</span>
                                  <span className="text-gray-900 font-bold">₹{subtotalChildren.toLocaleString()}</span>
                                </div>
                              )}
                              <div className="flex justify-between items-center">
                                <span>Government GST &amp; Fees (18%)</span>
                                <span className="text-gray-900 font-bold">₹{taxes.toLocaleString()}</span>
                              </div>
                              {couponDiscount > 0 && (
                                <div className="flex justify-between items-center text-green-600 font-extrabold">
                                  <span>Coupon Discount ({attractionCoupon?.code})</span>
                                  <span>-₹{couponDiscount.toLocaleString()}</span>
                                </div>
                              )}

                              <div className="border-t border-gray-200 pt-3 mt-1.5 flex justify-between items-baseline">
                                <span className="text-xs font-black text-gray-950 uppercase tracking-wide">Total Price</span>
                                <div>
                                  <span className="text-lg font-black text-[#003580]">₹{finalTotal.toLocaleString()}</span>
                                  <span className="text-[9px] text-gray-400 font-semibold block text-right">for all visitors</span>
                                </div>
                              </div>
                            </div>

                            {/* Token pay toggle */}
                            <div className="border-t border-gray-100 pt-3.5 text-left">
                              <label
                                onClick={() => setAttractionPayToken(!attractionPayToken)}
                                className={`border rounded-xl p-2.5 flex items-center justify-between cursor-pointer transition-all ${attractionPayToken ? 'border-teal-600 bg-teal-50/10' : 'border-gray-250 hover:border-gray-350 bg-white'
                                  }`}
                              >
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="block text-xs font-extrabold text-gray-800 font-black">Lock tickets for ₹500</span>
                                    <span className="bg-orange-100 text-orange-700 text-[8px] font-black uppercase px-1 rounded">Lock Fare</span>
                                  </div>
                                  <span className="block text-[9px] text-gray-400 font-semibold mt-0.5">Pay ₹500 now, rest on arrival counter</span>
                                </div>
                                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${attractionPayToken ? 'border-teal-600 bg-teal-600' : 'border-gray-300'}`}>
                                  {attractionPayToken && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                                </div>
                              </label>
                            </div>

                            {/* Proceed CTA */}
                            <button
                              type="button"
                              onClick={() => {
                                selectedItem.price = finalTotal;
                                selectedItem.payTokenOnly = attractionPayToken;
                                selectedItem.tokenAmount = attractionPayToken ? 500 : finalTotal;
                                selectedItem.attractionVariant = attractionVariant;
                                selectedItem.attractionAdults = attractionAdults;
                                selectedItem.attractionChildren = attractionChildren;
                                selectedItem.appliedCoupon = attractionCoupon;
                                setView("checkout");
                                toast.success("Proceeding to ticket checkout!");
                              }}
                              className="w-full bg-[#003580] hover:bg-blue-900 text-white font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-1 text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                            >
                              {attractionPayToken ? "Book Tickets for ₹500" : "Proceed to Checkout"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

              </div>
            )
            }
          </>
        )}

        {/* ── 4. VIEW: Checkout Payment Form ── */}
        {view === "checkout" && (
          <div className="max-w-xl mx-auto w-full">

            {/* Back Button */}
            <button
              onClick={() => setView("details")}
              className="flex items-center gap-2 text-gray-600 hover:text-[#003580] font-semibold text-xs mb-4 transition-colors cursor-pointer group"
            >
              <MdArrowBack size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>

            <form onSubmit={handleBookingSubmit} className="bg-white border border-gray-150 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">

              <div className="text-center pb-4 border-b border-gray-100">
                <h3 className="font-black text-lg text-gray-900 tracking-tight flex items-center justify-center gap-1.5">
                  <ShieldCheck size={20} className="text-green-600" /> Secure Payment
                </h3>
                <p className="text-xs text-gray-400 font-semibold mt-1">Complete your booking details below</p>
              </div>

              {/* Guest Details */}
              <div className="space-y-4">
                <h4 className="font-black text-xs text-gray-800 uppercase tracking-wide flex items-center gap-1">
                  <User size={14} className="text-[#003580]" /> Passenger / Guest Details
                </h4>

                <div className="flex flex-col">
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={guestDetails.name}
                    onChange={(e) => setGuestDetails(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#003580] text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={guestDetails.email}
                      onChange={(e) => setGuestDetails(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#003580] text-xs font-semibold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99999 99999"
                      value={guestDetails.phone}
                      onChange={(e) => setGuestDetails(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#003580] text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="font-black text-xs text-gray-800 uppercase tracking-wide flex items-center gap-1">
                  <CreditCard size={14} className="text-[#003580]" /> Payment Details
                </h4>

                <div className="flex flex-col">
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5">Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="4111 2222 3333 4444"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails(p => ({ ...p, number: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#003580] text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5">Expiration Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails(p => ({ ...p, expiry: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#003580] text-xs font-semibold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5">CVC / CVV</label>
                    <input
                      type="password"
                      required
                      maxLength="3"
                      placeholder="***"
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails(p => ({ ...p, cvc: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#003580] text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Total display & Complete button */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  {activeTab === "cruises" && cruisePayOption === "deposit" ? (
                    <>
                      <span className="text-[10px] text-gray-400 font-bold block">Deposit Due Today (20%)</span>
                      <span className="text-lg font-black text-gray-900">
                        ₹{Math.round(getCruiseCalculatedTotal() * 0.2).toLocaleString()}
                      </span>
                      <span className="text-[9px] text-gray-400 font-semibold block mt-0.5">
                        Remaining balance: ₹{Math.round(getCruiseCalculatedTotal() * 0.8).toLocaleString()} (charged automatically 60 days before sailing)
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[10px] text-gray-400 font-bold block">Total charge</span>
                      <span className="text-lg font-black text-gray-900">
                        ₹{(activeTab === "stays" ? selectedRoom.price : activeTab === "trains" ? getTrainCalculatedTotal() : activeTab === "cruises" ? getCruiseCalculatedTotal() : selectedItem.price).toLocaleString()}
                      </span>
                      {activeTab === "cruises" && cruisePayOption === "full" && (
                        <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">
                          Includes 5% Pay-in-Full discount!
                        </span>
                      )}
                    </>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#003580] hover:bg-blue-900 disabled:bg-gray-400 text-white font-extrabold text-xs py-3 px-6 rounded-lg shadow-sm transition-all cursor-pointer active:scale-[0.98] flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Authorizing...
                    </>
                  ) : (
                    <>
                      Confirm & Pay
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ── 5. VIEW: Ticket Confirmation page ── */}
        {view === "ticket" && ticketDetails && (
          <div className="max-w-xl mx-auto w-full flex flex-col gap-6">

            {/* Ticket Card */}
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-md relative">
              {/* Header Green Check Banner */}
              <div className="bg-green-600 text-white text-center py-6 p-4">
                <CheckCircle size={38} className="mx-auto mb-2" />
                <h3 className="font-black text-lg tracking-tight">Booking Confirmed!</h3>
                <p className="text-white/80 text-[11px] font-semibold mt-1">
                  Thank you for booking with walkawaytrip.com
                </p>
              </div>

              {/* Ticket Details */}
              <div className="p-6 sm:p-8 space-y-6">

                {/* Reference ID */}
                <div className="flex justify-between border-b border-gray-100 pb-4">
                  <div>
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-wide block">Confirmation Code</span>
                    <span className="text-base font-extrabold text-[#003580]">{ticketDetails.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-wide block">Status</span>
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 border border-green-150 rounded">Paid & Verified</span>
                  </div>
                </div>

                {/* Reservation Specs */}
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <Ticket className="text-[#003580] shrink-0 mt-0.5" size={18} />
                    <div>
                      <h4 className="font-extrabold text-sm text-gray-800">{ticketDetails.item.name}</h4>
                      {activeTab === "stays" && (
                        <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
                          Room type: {ticketDetails.room.name} &bull; Dates: {ticketDetails.checkIn} to {ticketDetails.checkOut}
                        </p>
                      )}
                      {activeTab === "flights" && (
                        <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
                          Airline: {ticketDetails.item.airline} &bull; Route: {ticketDetails.item.from} &rarr; {ticketDetails.item.to}
                        </p>
                      )}
                      {activeTab === "cars" && (
                        <div className="space-y-1.5 mt-1 text-[11px] text-gray-500 font-semibold">
                          <p>Model: {ticketDetails.item.name} &bull; Fuel Type: {ticketDetails.item.fuelType || "Petrol/Diesel"}</p>
                          <p className="text-green-700 font-bold bg-green-50 px-2 py-1 rounded border border-green-150 inline-block">
                            {ticketDetails.guest.gender === "female" ? "👩‍✈️ Assigned Lady Driver (Verified Safe Matching)" : "👨‍✈️ Assigned Gents Driver (Verified Professional)"}
                          </p>
                        </div>
                      )}
                      {activeTab === "attractions" && (
                        <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
                          Activity: {ticketDetails.item.name} &bull; City: {ticketDetails.item.city} &bull; Duration: {ticketDetails.item.duration}
                        </p>
                      )}
                      {activeTab === "trains" && (
                        <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
                          Train: {ticketDetails.item.name} &bull; Class: {ticketDetails.item.class} &bull; Route: {ticketDetails.item.from} &rarr; {ticketDetails.item.to}
                        </p>
                      )}
                      {activeTab === "buses" && (
                        <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
                          Bus: {ticketDetails.item.operator} &bull; Type: {ticketDetails.item.type} &bull; Departs: {ticketDetails.item.dep}
                        </p>
                      )}
                      {activeTab === "holidays" && (
                        <div className="space-y-1.5 mt-1 text-[11px] text-gray-500 font-semibold">
                          <p>Package Theme: {ticketDetails.item.theme} &bull; Departure From: {holidayDepart} &bull; Month: {holidayMonth}</p>
                          <p>Tour Type: {selectedTourType === "group" ? "👥 Escorted Group Tour" : "👤 Private Customized Tour"}</p>
                          <p className="text-[#003580] bg-blue-50 px-2 py-1 rounded border border-blue-150 inline-block font-bold">
                            Stay Comfort: {selectedHotelTier === "luxury" ? "⭐⭐⭐⭐⭐ Luxury 5-Star" : selectedHotelTier === "deluxe" ? "⭐⭐⭐⭐ Deluxe 4-Star" : "⭐⭐⭐ Standard 3-Star"}
                          </p>
                          <p className="text-teal-700 bg-teal-50 px-2 py-1 rounded border border-teal-150 inline-block font-bold ml-2">
                            Travel style: {selectedFlightTier === "business" ? "💺 Business Class Flight" : selectedFlightTier === "direct" ? "✈️ Direct Flight" : "✈️ Standard Flights"}
                          </p>
                        </div>
                      )}
                      {activeTab === "cruises" && (
                        <div className="space-y-1.5 mt-1 text-[11px] text-gray-500 font-semibold">
                          <p>Cruise Line: {ticketDetails.item.line} &bull; Ship: {ticketDetails.item.ship}</p>
                          <p>Voyage: {ticketDetails.item.name} &bull; Cabin: {ticketDetails.room.name}</p>
                          <p>Departure Port: {ticketDetails.item.departurePort} &bull; Duration: {ticketDetails.item.duration} ({cruiseNights} Nights)</p>
                          {selectedCruiseExcursions.length > 0 && (
                            <p>Excursions: {selectedCruiseExcursions.map(e => e.name).join(", ")}</p>
                          )}
                          {selectedSpaTreatments.length > 0 && (
                            <p>Spa Treatments: {selectedSpaTreatments.map(s => s.name).join(", ")}</p>
                          )}
                          {([
                            cruiseDrinkPackage && "🍹 Deluxe Beverage Package",
                            cruiseWifiPackage && "📶 VOOM High-Speed Wi-Fi",
                            cruiseExcursionPackage && "⛰️ Shore Excursion Pass"
                          ].filter(Boolean).length > 0) && (
                              <p className="text-teal-700 bg-teal-50 px-2 py-1 rounded border border-teal-150 inline-block font-bold">
                                Packages: {[
                                  cruiseDrinkPackage && "Beverage",
                                  cruiseWifiPackage && "Wi-Fi",
                                  cruiseExcursionPackage && "Excursions"
                                ].filter(Boolean).join(", ")}
                              </p>
                            )}
                          {cruisePayOption === "deposit" && (
                            <div className="text-orange-700 bg-orange-50 px-2.5 py-1 rounded border border-orange-150 inline-block font-bold mt-1.5">
                              Plan: 20% Deposit Paid today. Remaining 80% (₹{(ticketDetails.total * 4).toLocaleString()}) scheduled for auto-charge.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <User className="text-[#003580] shrink-0 mt-0.5" size={18} />
                    <div>
                      <h4 className="font-extrabold text-sm text-gray-800">Primary Guest</h4>
                      <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
                        {ticketDetails.guest.name} &bull; {ticketDetails.guest.email} &bull; {ticketDetails.guest.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expensed total */}
                <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline">
                  <span className="text-xs font-black text-gray-800 uppercase tracking-wide">Paid Amount</span>
                  <span className="text-lg font-black text-gray-900">₹{ticketDetails.total.toLocaleString()}</span>
                </div>

              </div>

              {/* Dotted separator divider line */}
              <div className="relative h-px border-t border-dashed border-gray-200">
                <div className="absolute left-[-8px] top-[-8px] w-4 h-4 bg-gray-50 rounded-full border border-gray-150" />
                <div className="absolute right-[-8px] top-[-8px] w-4 h-4 bg-gray-50 rounded-full border border-gray-150" />
              </div>

              {/* Actions footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3 justify-end">
                <button
                  onClick={() => window.print()}
                  className="bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <Printer size={14} /> Print Receipt
                </button>
                <button
                  onClick={() => {
                    navigate(tabRouteMap[activeTab] || "/hotel");
                    setSearchResults([]);
                    setSelectedItem(null);
                  }}
                  className="bg-[#003580] hover:bg-blue-900 text-white font-extrabold text-xs py-2 px-5 rounded-xl cursor-pointer transition-all active:scale-95"
                >
                  Go to Home
                </button>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Floating chatbot activator button if closed with 3D shadow and glow */}
      {activeTab === "flights" && !showChatbot && (
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-6 right-6 z-45 bg-gradient-to-b from-[#0052cc] via-[#003580] to-[#002254] text-white rounded-full p-4 border border-white/30 shadow-[0_6px_0_#001a3a,0_15px_25px_rgba(0,53,128,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)] hover:-translate-y-1 active:translate-y-[4px] active:shadow-[0_2px_0_#001a3a,0_8px_12px_rgba(0,53,128,0.2)] transition-all duration-150 cursor-pointer flex items-center justify-center group overflow-hidden"
          title="Talk to Agent"
        >
          {/* Shining sweep effect */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[shining-sweep_1.5s_infinite]" />

          <div className="relative flex items-center justify-center">
            <MessageSquare size={24} className="group-hover:rotate-6 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
            <Sparkles size={12} className="absolute -top-1.5 -right-1 text-yellow-300 animate-pulse" />

            <span className="absolute -top-2 -left-2 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        </button>
      )}

      {/* Chatbot overlay container */}
      {activeTab === "flights" && showChatbot && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[340px] h-[480px] max-h-[85vh] bg-white/90 backdrop-blur-xl rounded-3xl border border-white/50 shadow-[0_20px_50px_rgba(0,53,128,0.25),_inset_0_1px_1px_rgba(255,255,255,0.8),_0_0_0_1px_rgba(0,53,128,0.05)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300 font-sans tracking-wide">

          {/* Custom style block for 3D chatbot animations */}
          <style>{`
            @keyframes shining-sweep {
              0% { transform: translateX(-150%) skewX(-12deg); }
              50% { transform: translateX(250%) skewX(-12deg); }
              100% { transform: translateX(250%) skewX(-12deg); }
            }
            .chat-dot-glow {
              box-shadow: 0 0 8px #22c55e, 0 0 15px #22c55e;
            }
            .chat-inner-shadow-bot {
              box-shadow: inset 0 -2px 4px rgba(0,0,0,0.03), inset 0 2px 4px rgba(255,255,255,0.9), 0 4px 10px rgba(0,0,0,0.04);
            }
            .chat-inner-shadow-user {
              box-shadow: inset 0 -3px 0px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.3), 0 8px 15px rgba(0,53,128,0.2);
            }
            .chat-pill-shadow {
              box-shadow: inset 0 -2px 0px rgba(0,0,0,0.08), 0 3px 6px rgba(0,53,128,0.06);
            }
            .chat-3d-header {
              box-shadow: 0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2);
            }
            .chat-3d-avatar {
              box-shadow: 0 6px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.4);
            }
          `}</style>

          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#00224d] via-[#003580] to-[#004fbd] pt-6 pb-4 px-5 text-white flex items-center justify-between shrink-0 chat-3d-header relative border-b border-white/10">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              {/* Glowing Avatar Frame */}
              <div className="relative chat-3d-avatar bg-gradient-to-tr from-[#0052cc] to-[#00d4ff] p-[2px] rounded-2xl">
                <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden border border-white/20">
                  <span className="text-xl animate-bounce" style={{ animationDuration: '3s' }}>🤖</span>
                </div>
                {/* Active Indicator dot */}
                <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-[#003580] chat-dot-glow"></span>
                </span>
              </div>

              <div>
                <h3 className="font-black text-sm tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] flex items-center gap-1.5">
                  WAT <span className="text-[9px] bg-blue-500/30 border border-blue-400/40 text-blue-200 px-1.5 py-0.5 rounded uppercase tracking-wider font-extrabold">AI Agent</span>
                </h3>
                <span className="text-[10px] text-blue-200/90 font-bold block">Ready to assist you</span>
              </div>
            </div>

            <button
              onClick={() => setShowChatbot(false)}
              className="text-white/80 hover:text-white hover:bg-white/15 p-2 rounded-xl transition-all duration-200 cursor-pointer border border-transparent hover:border-white/10 hover:shadow-md hover:scale-105 active:scale-95 z-10"
              title="Minimize chat"
            >
              <ChevronDown size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Chat Messages with Subdued Grid Pattern */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/95 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] relative">
            <div className="text-center my-2">
              <span className="text-[9px] bg-slate-200/90 border border-slate-300/40 text-slate-600 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">Today</span>
            </div>

            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} animate-in fade-in-50 slide-in-from-bottom-2 duration-200`}
              >
                {/* Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[11px] font-bold leading-relaxed whitespace-pre-line ${msg.sender === "user"
                    ? "bg-gradient-to-tr from-[#002f6c] to-[#0052cc] text-white rounded-tr-none chat-inner-shadow-user border-b border-blue-900"
                    : "bg-white text-slate-800 rounded-tl-none border border-slate-200/80 chat-inner-shadow-bot"
                    }`}
                >
                  {msg.text}
                </div>
                {/* Time */}
                <span className="text-[8px] text-slate-400 font-extrabold mt-1 px-1.5 tracking-wider uppercase">{msg.time}</span>

                {/* Option suggestion pills */}
                {msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2.5 max-w-[95%]">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendChatMessage(opt)}
                        className="bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 border border-blue-200/70 text-[#003580] text-[10px] font-extrabold px-3 py-2 rounded-xl chat-pill-shadow hover:-translate-y-0.5 active:translate-y-0 active:scale-95 active:shadow-sm transition-all duration-150 cursor-pointer whitespace-nowrap"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {chatIsTyping && (
              <div className="flex flex-col items-start animate-pulse">
                <div className="bg-white border border-slate-200/80 text-slate-500 rounded-2xl rounded-tl-none px-4 py-3 chat-inner-shadow-bot flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#003580] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-[#003580] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-[#003580] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Chat Footer/Input area */}
          <div className="p-4 bg-white/95 backdrop-blur-md border-t border-slate-200/60 shrink-0 relative">
            {/* Glossy lighting effect at the top of footer */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* Input box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatMessage();
              }}
              className="flex items-center gap-2 border border-slate-200/80 rounded-2xl px-3 py-1.5 bg-slate-50/50 shadow-inner focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200"
            >
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask Myra anything..."
                className="flex-grow bg-transparent text-xs font-black text-slate-700 outline-none py-2 placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="bg-[#003580] disabled:bg-slate-100 text-white disabled:text-slate-300 hover:bg-blue-800 shadow-[0_3px_6px_rgba(0,53,128,0.15)] hover:shadow-[0_4px_10px_rgba(0,53,128,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-150 cursor-pointer p-2 rounded-xl"
              >
                <ArrowRight size={14} strokeWidth={3} />
              </button>
            </form>

            {/* Micro disclaimer */}
            <p className="text-[9px] text-slate-400 font-extrabold text-center mt-2 tracking-wider uppercase">
              Powered by Walkawaytrip AI
            </p>
          </div>
        </div>
      )}

      {/* Flight Details and Fare Options Modal popup */}
      {showFlightDetailsModal && modalFlightItem && (() => {
        const fareDetails = getModalFareDetails();
        const departCodeFrom = getAirportCode(modalFlightItem.onwardFrom, "DEL");
        const departCodeTo = getAirportCode(modalFlightItem.onwardTo, "PAR");
        const returnCodeFrom = getAirportCode(modalFlightItem.returnFrom, "PAR");
        const returnCodeTo = getAirportCode(modalFlightItem.returnTo, "DEL");

        const onwardDateStr = checkInDate ? new Date(checkInDate).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short', year: '2-digit' }) : "Fri, 31 Jul 26";
        const returnDateStr = returnDate ? new Date(returnDate).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short', year: '2-digit' }) : "Sat, 1 Aug 26";

        const departPrice = fareDetails ? (
          selectedDepartOption === "saver" ? fareDetails.departFares.saver :
            selectedDepartOption === "flexi" ? fareDetails.departFares.flexi :
              fareDetails.departFares.special
        ) : 0;

        const returnPrice = fareDetails ? (
          selectedReturnOption === "value" ? fareDetails.returnFares.value :
            selectedReturnOption === "classic" ? fareDetails.returnFares.classic :
              fareDetails.returnFares.flex
        ) : 0;

        const totalModalPrice = departPrice + returnPrice + (priceDropProtected ? 399 : 0);

        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
            <div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-[850px] overflow-hidden flex flex-col max-h-[90vh] animate-in scale-in-95 duration-200"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-150 flex items-center justify-between bg-white shrink-0">
                <h3 className="font-black text-base text-gray-900">Flight Details and Fare Options available for you!</h3>
                <button
                  onClick={() => setShowFlightDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronDown size={20} className="rotate-90" />
                </button>
              </div>

              {/* Modal Tabs Header */}
              <div className="border-b border-gray-150 grid grid-cols-2 bg-gray-50/50 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModalTab("depart")}
                  className={`py-3.5 text-xs font-black uppercase tracking-wider text-center border-b-4 transition-all cursor-pointer ${activeModalTab === "depart" ? "border-[#003580] text-[#003580]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                >
                  DEPART: {departCodeFrom} - {departCodeTo}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalTab("return")}
                  className={`py-3.5 text-xs font-black uppercase tracking-wider text-center border-b-4 transition-all cursor-pointer ${activeModalTab === "return" ? "border-[#003580] text-[#003580]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                >
                  RETURN: {returnCodeFrom} - {returnCodeTo}
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">

                {/* ══ DEPART TAB ══ */}
                {activeModalTab === "depart" && (
                  <div className="space-y-6">
                    {/* Flight summary row */}
                    <div className="flex items-center justify-between border border-gray-150 rounded-2xl p-4 bg-white shadow-sm flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 p-1.5 border border-gray-200 flex items-center justify-center shrink-0">
                          <img src={modalFlightItem.airlineLogo} alt="logo" className="max-h-full max-w-full object-contain" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-gray-900">{departCodeFrom} - {departCodeTo} &bull; {modalFlightItem.onwardAirline}</h4>
                          <p className="text-[11px] text-gray-500 font-bold mt-0.5">{onwardDateStr} &bull; Departure {modalFlightItem.onwardDep} - Arrival {modalFlightItem.onwardArr}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 font-bold block">Duration</span>
                        <span className="text-xs font-black text-gray-850">{modalFlightItem.onwardDur}</span>
                      </div>
                    </div>

                    {/* Price Drop Protection banner */}
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                      <div onClick={() => setPriceDropProtected(!priceDropProtected)} className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${priceDropProtected ? "bg-green-600 border-green-600" : "border-gray-300 bg-white"}`}>
                        {priceDropProtected && <Check size={12} className="text-white" strokeWidth={3} />}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-green-800 flex items-center gap-1.5">
                          <span>Add Price Drop Protection</span>
                          <span className="bg-green-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Only ₹ 399</span>
                        </h4>
                        <p className="text-[10px] text-green-700/80 font-bold mt-0.5">See a fare drop later? We refund the difference instantly.</p>
                      </div>
                    </div>

                    {/* Fare Class Options columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Saver Card */}
                      <div
                        onClick={() => setSelectedDepartOption("saver")}
                        className={`border-2 rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between relative hover:shadow ${selectedDepartOption === "saver" ? "border-[#003580] bg-[#003580]/5" : "border-gray-150 bg-white"}`}
                      >
                        {selectedDepartOption === "saver" && (
                          <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#003580] flex items-center justify-center text-white text-[9px] font-black">✓</span>
                        )}
                        <div>
                          <span className="text-[10px] bg-gray-100 text-gray-600 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Saver</span>
                          <h4 className="font-black text-base text-gray-900 mt-2">₹ {fareDetails.departFares.saver.toLocaleString()}</h4>
                          <span className="text-[9px] text-gray-400 font-bold block mt-0.5">per adult</span>

                          <div className="border-t border-gray-100 my-3 pt-3 space-y-2 text-[11px] font-semibold text-gray-600">
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> 7 Kgs Cabin Baggage</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> 15 Kgs Check-in Baggage</p>
                            <p className="flex items-center gap-1.5"><ChevronDown size={12} className="text-orange-500 rotate-90" /> Cancel fee from ₹ 3,999</p>
                            <p className="flex items-center gap-1.5"><ChevronDown size={12} className="text-orange-500 rotate-90" /> Change fee from ₹ 2,999</p>
                            <p className="flex items-center gap-1.5 text-gray-400"><ChevronDown size={12} className="rotate-90" /> Chargeable Meals</p>
                          </div>
                        </div>
                      </div>

                      {/* Flexi Plus Card */}
                      <div
                        onClick={() => setSelectedDepartOption("flexi")}
                        className={`border-2 rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between relative hover:shadow ${selectedDepartOption === "flexi" ? "border-[#003580] bg-[#003580]/5" : "border-gray-150 bg-white"}`}
                      >
                        <span className="absolute -top-2.5 left-4 bg-orange-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">Recommended</span>
                        {selectedDepartOption === "flexi" && (
                          <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#003580] flex items-center justify-center text-white text-[9px] font-black">✓</span>
                        )}
                        <div>
                          <span className="text-[10px] bg-purple-50 text-purple-700 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Flexi Plus</span>
                          <h4 className="font-black text-base text-gray-900 mt-2">₹ {fareDetails.departFares.flexi.toLocaleString()}</h4>
                          <span className="text-[9px] text-purple-550 font-bold block mt-0.5">per adult</span>

                          <div className="border-t border-gray-100 my-3 pt-3 space-y-2 text-[11px] font-semibold text-gray-600">
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> 7 Kgs Cabin Baggage</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> 15 Kgs Check-in Baggage</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Lower Cancel fee ₹ 2,499</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Lower Change fee ₹ 299</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Complimentary Meals</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Free Seats Included</p>
                          </div>
                        </div>
                      </div>

                      {/* WAT Special Card */}
                      <div
                        onClick={() => setSelectedDepartOption("special")}
                        className={`border-2 rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between relative hover:shadow ${selectedDepartOption === "special" ? "border-[#003580] bg-[#003580]/5" : "border-gray-150 bg-white"}`}
                      >
                        <span className="absolute top-3 right-3 bg-blue-100 text-[#003580] text-[8px] font-black px-1.5 py-0.5 rounded">WAT SPECIAL</span>
                        {selectedDepartOption === "special" && (
                          <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#003580] flex items-center justify-center text-white text-[9px] font-black">✓</span>
                        )}
                        <div>
                          <span className="text-[10px] bg-blue-50 text-[#003580] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Fare by WAT</span>
                          <h4 className="font-black text-base text-gray-900 mt-2">₹ {fareDetails.departFares.special.toLocaleString()}</h4>
                          <span className="text-[9px] text-gray-400 font-bold block mt-0.5">per adult</span>

                          <div className="border-t border-gray-100 my-3 pt-3 space-y-2 text-[11px] font-semibold text-gray-600">
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> 7 Kgs Cabin Baggage</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> 15 Kgs Check-in Baggage</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Free Cancellation</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Free Date Change</p>
                            <p className="flex items-center gap-1.5 font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-150 inline-block">Maxifly Benefits Included</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ══ RETURN TAB ══ */}
                {activeModalTab === "return" && (
                  <div className="space-y-6">
                    {/* Flight summary row */}
                    <div className="flex items-center justify-between border border-gray-150 rounded-2xl p-4 bg-white shadow-sm flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 p-1.5 border border-gray-200 flex items-center justify-center shrink-0">
                          <img src={modalFlightItem.airlineLogo} alt="logo" className="max-h-full max-w-full object-contain" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-gray-900">{returnCodeFrom} - {returnCodeTo} &bull; {modalFlightItem.returnAirline}</h4>
                          <p className="text-[11px] text-gray-500 font-bold mt-0.5">{returnDateStr} &bull; Departure {modalFlightItem.returnDep} - Arrival {modalFlightItem.returnArr} {modalFlightItem.returnArrDayOffset}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 font-bold block">Duration</span>
                        <span className="text-xs font-black text-gray-800">{modalFlightItem.returnDur}</span>
                      </div>
                    </div>

                    {/* Price Drop Protection banner */}
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                      <div onClick={() => setPriceDropProtected(!priceDropProtected)} className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${priceDropProtected ? "bg-green-600 border-green-600" : "border-gray-300 bg-white"}`}>
                        {priceDropProtected && <Check size={12} className="text-white" strokeWidth={3} />}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-green-800 flex items-center gap-1.5">
                          <span>Add Price Drop Protection</span>
                          <span className="bg-green-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Only ₹ 399</span>
                        </h4>
                        <p className="text-[10px] text-green-700/80 font-bold mt-0.5">See a fare drop later? We refund the difference instantly.</p>
                      </div>
                    </div>

                    {/* Fare Class Options columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Value Card */}
                      <div
                        onClick={() => setSelectedReturnOption("value")}
                        className={`border-2 rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between relative hover:shadow ${selectedReturnOption === "value" ? "border-[#003580] bg-[#003580]/5" : "border-gray-150 bg-white"}`}
                      >
                        {selectedReturnOption === "value" && (
                          <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#003580] flex items-center justify-center text-white text-[9px] font-black">✓</span>
                        )}
                        <div>
                          <span className="text-[10px] bg-gray-100 text-gray-600 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Value</span>
                          <h4 className="font-black text-base text-gray-900 mt-2">₹ {fareDetails.returnFares.value.toLocaleString()}</h4>
                          <span className="text-[9px] text-gray-400 font-bold block mt-0.5">per adult</span>

                          <div className="border-t border-gray-100 my-3 pt-3 space-y-2 text-[11px] font-semibold text-gray-600">
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> 7 Kgs Cabin Baggage</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> 15 Kgs Check-in Baggage</p>
                            <p className="flex items-center gap-1.5"><ChevronDown size={12} className="text-orange-500 rotate-90" /> Cancel fee from ₹ 4,300</p>
                            <p className="flex items-center gap-1.5"><ChevronDown size={12} className="text-orange-500 rotate-90" /> Change fee from ₹ 3,000</p>
                            <p className="flex items-center gap-1.5 text-gray-400"><ChevronDown size={12} className="rotate-90" /> Chargeable Meals</p>
                          </div>
                        </div>
                      </div>

                      {/* Classic Card */}
                      <div
                        onClick={() => setSelectedReturnOption("classic")}
                        className={`border-2 rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between relative hover:shadow ${selectedReturnOption === "classic" ? "border-[#003580] bg-[#003580]/5" : "border-gray-150 bg-white"}`}
                      >
                        {selectedReturnOption === "classic" && (
                          <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#003580] flex items-center justify-center text-white text-[9px] font-black">✓</span>
                        )}
                        <div>
                          <span className="text-[10px] bg-purple-50 text-purple-700 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Classic</span>
                          <h4 className="font-black text-base text-gray-900 mt-2">₹ {fareDetails.returnFares.classic.toLocaleString()}</h4>
                          <span className="text-[9px] text-purple-550 font-bold block mt-0.5">per adult</span>

                          <div className="border-t border-gray-100 my-3 pt-3 space-y-2 text-[11px] font-semibold text-gray-600">
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> 7 Kgs Cabin Baggage</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> 15 Kgs Check-in Baggage</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Lower Cancel fee ₹ 2,000</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Lower Change fee ₹ 300</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Complimentary Meals</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Free Seats Included</p>
                          </div>
                        </div>
                      </div>

                      {/* Flex Card */}
                      <div
                        onClick={() => setSelectedReturnOption("flex")}
                        className={`border-2 rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between relative hover:shadow ${selectedReturnOption === "flex" ? "border-[#003580] bg-[#003580]/5" : "border-gray-150 bg-white"}`}
                      >
                        {selectedReturnOption === "flex" && (
                          <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#003580] flex items-center justify-center text-white text-[9px] font-black">✓</span>
                        )}
                        <div>
                          <span className="text-[10px] bg-blue-50 text-[#003580] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Flex</span>
                          <h4 className="font-black text-base text-gray-900 mt-2">₹ {fareDetails.returnFares.flex.toLocaleString()}</h4>
                          <span className="text-[9px] text-gray-400 font-bold block mt-0.5">per adult</span>

                          <div className="border-t border-gray-100 my-3 pt-3 space-y-2 text-[11px] font-semibold text-gray-600">
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> 7 Kgs Cabin Baggage</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> 20 Kgs Check-in Baggage</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Lower Cancel fee ₹ 1,500</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Free Date Change (up to 3 days)</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Complimentary Meals</p>
                            <p className="flex items-center gap-1.5"><Check size={12} className="text-green-600" /> Free Seats Included</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer Summary block */}
              <div className="px-6 py-4 border-t border-gray-150 bg-gray-50 flex items-center justify-between shrink-0 flex-wrap gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-gray-900">₹ {totalModalPrice.toLocaleString()}</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Roundtrip for 1 adult</span>
                  </div>
                  <p className="text-[9px] text-gray-400 font-bold mt-0.5">Includes taxes & charges &bull; Fare details selected</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      toast.success("Flight price locked for 24 hours!");
                      setShowFlightDetailsModal(false);
                    }}
                    className="bg-white hover:bg-gray-100 border border-blue-200 text-[#003580] font-black text-xs px-5 py-2.5 rounded-xl cursor-pointer active:scale-95 transition-all"
                  >
                    LOCK PRICE
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowFlightDetailsModal(false);
                      handleSelectItem({
                        ...modalFlightItem,
                        price: totalModalPrice,
                        fareClassDepart: selectedDepartOption,
                        fareClassReturn: selectedReturnOption,
                        priceDropProtected
                      });
                    }}
                    className="bg-[#003580] hover:bg-blue-900 text-white font-black text-xs px-6 py-2.5 rounded-xl cursor-pointer active:scale-95 transition-all shadow-sm"
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* ══ HOLIDAYS CUSTOMIZATION MODALS (MMT STYLE) ══ */}
      {holidayShowFlightModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="font-black text-gray-900 text-base">✈️ Change Flights Comfort</h3>
                <p className="text-[10px] text-gray-500 font-bold mt-0.5">Select a departure flight that best suits your timeline</p>
              </div>
              <button
                type="button"
                onClick={() => setHolidayShowFlightModal(false)}
                className="text-gray-400 hover:text-gray-700 font-bold text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {ALTERNATIVE_FLIGHTS.map(flight => {
                const isSelected = holidaySelectedFlight?.id === flight.id;
                return (
                  <div
                    key={flight.id}
                    onClick={() => {
                      setHolidaySelectedFlight(flight);
                      setHolidayShowFlightModal(false);
                      toast.success(`Swapped flight to ${flight.airline}!`);
                    }}
                    className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left relative ${isSelected ? 'border-blue-600 bg-blue-50/5 shadow-sm' : 'border-gray-250 hover:border-gray-350 bg-white'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center p-2 border border-gray-100 shrink-0">
                        <img src={flight.logo} alt={flight.airline} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-gray-900">{flight.airline}</h4>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{flight.flightNo} · {flight.stops}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div>
                        <span className="block text-sm font-black text-gray-900">{flight.depTime}</span>
                        <span className="text-[10px] text-gray-500 font-semibold">{holidayDepart}</span>
                      </div>
                      <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-[8px] text-gray-400 font-bold uppercase">{flight.duration}</span>
                        <div className="w-full h-[1.5px] bg-gray-250 relative my-0.5"></div>
                        <span className="text-[8px] text-gray-400 font-extrabold uppercase">Direct</span>
                      </div>
                      <div>
                        <span className="block text-sm font-black text-gray-900">{flight.arrTime}</span>
                        <span className="text-[10px] text-gray-500 font-semibold">{selectedItem.destinations.split(",")[0]}</span>
                      </div>
                    </div>

                    <div className="border-t sm:border-t-0 sm:border-l border-gray-150 pt-3 sm:pt-0 sm:pl-5 sm:min-w-[120px] flex sm:flex-col justify-between items-baseline sm:items-end gap-1">
                      <span className="text-[9px] text-gray-405 font-bold">{flight.baggage.split(",")[0]}</span>
                      <div className="flex flex-col sm:items-end mt-1">
                        <span className={`text-xs font-black ${flight.priceDiff === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                          {flight.priceDiff === 0 ? 'Included' : `+ ₹${flight.priceDiff.toLocaleString()}`}
                        </span>
                        <span className="text-[8px] text-gray-400 font-semibold">per person</span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold shadow-sm">✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {holidayShowHotelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="font-black text-gray-900 text-base">🏨 Change Stay Hotel</h3>
                <p className="text-[10px] text-gray-500 font-bold mt-0.5">Select a star comfort stay that fits your premium travel style</p>
              </div>
              <button
                type="button"
                onClick={() => setHolidayShowHotelModal(false)}
                className="text-gray-400 hover:text-gray-700 font-bold text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {ALTERNATIVE_HOTELS.map(hotel => {
                const isSelected = holidaySelectedHotel?.id === hotel.id;
                return (
                  <div
                    key={hotel.id}
                    onClick={() => {
                      setHolidaySelectedHotel(hotel);
                      if (hotel.id.includes("std")) setSelectedHotelTier("standard");
                      if (hotel.id.includes("del")) setSelectedHotelTier("deluxe");
                      if (hotel.id.includes("lux")) setSelectedHotelTier("luxury");
                      setHolidayShowHotelModal(false);
                      toast.success(`Swapped stay to ${hotel.name}!`);
                    }}
                    className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col md:flex-row gap-4 text-left relative ${isSelected ? 'border-teal-600 bg-teal-50/5 shadow-sm' : 'border-gray-250 hover:border-gray-350 bg-white'
                      }`}
                  >
                    <div className="w-full md:w-36 h-24 rounded-lg overflow-hidden border border-gray-150 shrink-0">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-extrabold text-sm text-gray-900">{hotel.name}</h4>
                          <div className="flex items-center text-yellow-500">
                            {Array.from({ length: hotel.stars }).map((_, i) => (
                              <Star key={i} size={9} fill="currentColor" className="stroke-none" />
                            ))}
                          </div>
                        </div>
                        <span className="text-[9px] text-gray-500 font-bold block mt-0.5">📍 {hotel.location}</span>
                        <p className="text-[9px] text-gray-400 font-bold mt-1.5 flex items-center gap-1.5">
                          <span className="bg-teal-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded">{hotel.rating}</span>
                          <span>({hotel.reviews} reviews on TripAdvisor)</span>
                        </p>
                      </div>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {hotel.amenities.map((amenity, i) => (
                          <span key={i} className="text-[8px] bg-gray-50 border border-gray-150 px-2 py-0.5 rounded text-gray-500 font-bold">
                            ✓ {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t md:border-t-0 md:border-l border-gray-150 pt-3 md:pt-0 md:pl-5 md:min-w-[140px] flex md:flex-col justify-between items-baseline md:items-end justify-center gap-1 shrink-0">
                      <div className="text-left md:text-right">
                        <span className={`text-sm font-black block ${hotel.priceDiff === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                          {hotel.priceDiff === 0 ? 'Included' : `+ ₹${hotel.priceDiff.toLocaleString()}`}
                        </span>
                        <span className="text-[8px] text-gray-400 font-semibold block">per night upgrade</span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1.5 bg-teal-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold shadow-sm">✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {holidayShowActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="font-black text-gray-900 text-base">🏎️ Customize Sightseeing & Activity</h3>
                <p className="text-[10px] text-gray-500 font-bold mt-0.5">Swap standard tours with premium guides or private yachts</p>
              </div>
              <button
                type="button"
                onClick={() => setHolidayShowActivityModal(false)}
                className="text-gray-400 hover:text-gray-700 font-bold text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {ALTERNATIVE_ACTIVITIES.map(activity => {
                const isSelected = holidaySelectedActivity?.id === activity.id;
                return (
                  <div
                    key={activity.id}
                    onClick={() => {
                      setHolidaySelectedActivity(activity);
                      setHolidayShowActivityModal(false);
                      toast.success(`Swapped sightseeing to ${activity.name}!`);
                    }}
                    className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col sm:flex-row justify-between gap-4 text-left relative ${isSelected ? 'border-orange-600 bg-orange-50/5 shadow-sm' : 'border-gray-250 hover:border-gray-350 bg-white'
                      }`}
                  >
                    <div className="flex-1">
                      <h4 className="font-extrabold text-sm text-gray-900">{activity.name}</h4>
                      <p className="text-gray-500 text-[10px] font-semibold leading-relaxed mt-1">{activity.desc}</p>
                      <div className="flex gap-3 mt-2.5">
                        <span className="text-[9px] text-gray-400 font-bold">⏱️ {activity.duration}</span>
                        <span className="text-[9px] text-gray-400 font-bold">🎟️ {activity.includes}</span>
                      </div>
                    </div>

                    <div className="border-t sm:border-t-0 sm:border-l border-gray-150 pt-3 sm:pt-0 sm:pl-5 sm:min-w-[130px] flex sm:flex-col justify-between items-baseline sm:items-end justify-center shrink-0">
                      <div className="text-left sm:text-right">
                        <span className={`text-sm font-black block ${activity.priceDiff === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                          {activity.priceDiff === 0 ? 'Included' : `+ ₹${activity.priceDiff.toLocaleString()}`}
                        </span>
                        <span className="text-[8px] text-gray-400 font-semibold block">per person tour upgrade</span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold shadow-sm">✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="w-full pt-4 pb-12">
        <TravelBrands />
        <TravelPlanner />
      </div>
      <ContactFooter />
      <Footer />
    </div>
  );
};

export default BookingScreen;
