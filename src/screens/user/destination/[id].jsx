import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/user/common/Footer";
import ContactFooter from "@/components/user/landing/ContactPage";
import { MdArrowBack } from "react-icons/md";
import { Clock, MapPin, Star, Heart, Calendar, ShieldCheck, Compass, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const LANDMARKS = {
  "Red fort": {
    title: "The Red Fort (Lal Qila)",
    subtitle: "Symbol of Mughal Power & India's Independence",
    description: "The Red Fort is a historic fort in the Old Delhi neighborhood of Delhi, India, that served as the main residence of the Mughal Emperors. Built by Emperor Shah Jahan in 1638 when he decided to shift his capital from Agra to Delhi. Made of red sandstone, it showcases a fusion of Persian, Timurid, and Hindu architectural styles.",
    timings: "09:30 AM - 04:30 PM (Closed on Mondays)",
    entryFee: "₹35 for Indians, ₹500 for Foreigners",
    rating: "4.6",
    reviewsCount: "14,500 reviews",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Red+Fort+Delhi",
    embedUrl: "https://maps.google.com/maps?q=Red%20Fort,%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  "Kutub Minaar": {
    title: "Qutub Minar Complex",
    subtitle: "The Tallest Brick Minaret in the World",
    description: "Qutb Minar is a minaret and 'victory tower' that forms part of the Qutb complex, a UNESCO World Heritage Site in the Mehrauli area of New Delhi, India. Standing 73 meters tall with five distinct tapering storeys, it was initiated by Qutb-ud-din Aibak in 1199 and finished by his successors. It represents the dawn of Indo-Islamic architecture.",
    timings: "07:00 AM - 08:00 PM (Daily)",
    entryFee: "₹40 for Indians, ₹600 for Foreigners",
    rating: "4.7",
    reviewsCount: "12,200 reviews",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Qutub+Minar+Delhi",
    embedUrl: "https://maps.google.com/maps?q=Qutub%20Minar,%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  "CP": {
    title: "Connaught Place (CP)",
    subtitle: "Delhi's Premier Commercial & Business Hub",
    description: "Connaught Place is one of the main financial, commercial, and business centers in New Delhi, India. Designed in the Georgian architecture style by Robert Tor Russell, it is famous for its white colonnade structures, high-end showrooms, international brands, popular bars, restaurants, and a bustling central park hosting the National Flag.",
    timings: "10:00 AM - 11:00 PM (Shops closed on Sundays)",
    entryFee: "Free Entry",
    rating: "4.5",
    reviewsCount: "18,900 reviews",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Connaught+Place+Delhi",
    embedUrl: "https://maps.google.com/maps?q=Connaught%20Place,%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  "Akshar Dham": {
    title: "Swaminarayan Akshardham Temple",
    subtitle: "A Spiritual Oasis of Hindu Art, Culture & Devotion",
    description: "Swaminarayan Akshardham is a massive temple complex in Delhi, India. It displays millennia of traditional Hindu and Indian culture, spirituality, and architecture. Constructed from pink sandstone and Italian Carrara marble, the main monument has no steel or concrete support. It features a spectacular musical fountain show and garden exhibitions.",
    timings: "10:00 AM - 06:30 PM (Closed on Mondays)",
    entryFee: "Free Entry (Exhibition fees apply)",
    rating: "4.8",
    reviewsCount: "20,400 reviews",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Akshardham+Temple+Delhi",
    embedUrl: "https://maps.google.com/maps?q=Akshardham%20Temple,%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  "Bangla Shaheb": {
    title: "Gurudwara Bangla Sahib",
    subtitle: "A Peaceful Sanctuary of Sikh Worship & Community Service",
    description: "Gurudwara Bangla Sahib is one of the most prominent Sikh houses of worship in Delhi, India. Associated with the eighth Sikh Guru, Guru Har Krishan, it features a stunning golden dome and a holy sarovar (pool) inside. The gurudwara runs a continuous community kitchen (langar) serving free food to thousands of visitors daily.",
    timings: "24 Hours (Open Daily)",
    entryFee: "Free Entry",
    rating: "4.9",
    reviewsCount: "15,800 reviews",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Gurudwara+Bangla+Sahib+Delhi",
    embedUrl: "https://maps.google.com/maps?q=Gurudwara%20Bangla%20Sahib,%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  "Sansad bhawan": {
    title: "The Parliament House (Sansad Bhavan)",
    subtitle: "The Seat of Indian Democratic Governance",
    description: "Sansad Bhavan is the iconic building housing the Parliament of India in New Delhi. Designed by the renowned British architects Sir Edwin Lutyens and Sir Herbert Baker, it was opened in 1927. The circular design of the building is said to be inspired by the Chausath Yogini Temple. A modern new Parliament complex stands alongside it today.",
    timings: "Exterior views only / Prior permission required for entry",
    entryFee: "Free (Voucher / Pass required)",
    rating: "4.6",
    reviewsCount: "8,500 reviews",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Parliament+House+Delhi",
    embedUrl: "https://maps.google.com/maps?q=Parliament%20House,%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  "Jantar Mantar": {
    title: "Jantar Mantar Observatory",
    subtitle: "Equinoctial Sundial & Architectural Astronomical Assembly",
    description: "Jantar Mantar is an assembly of 13 architectural astronomy instruments built by Maharaja Jai Singh II of Jaipur in 1724. Designed to compile astronomical tables and predict the movements of the sun, moon, and planets, the site features the massive Samrat Yantra sundial standing 70 feet tall.",
    timings: "06:00 AM - 06:00 PM (Daily)",
    entryFee: "₹25 for Indians, ₹300 for Foreigners",
    rating: "4.4",
    reviewsCount: "6,200 reviews",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Jantar+Mantar+Delhi",
    embedUrl: "https://maps.google.com/maps?q=Jantar%20Mantar,%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
  }
};

const ITINERARY = [
  {
    day: 1,
    title: "Delhi Highlights and Culture",
    date: "Date, 2024",
    description: "Delhi, the vibrant capital of India, is a city where ancient heritage and modern life blend seamlessly. The city is dotted with iconic landmarks like the majestic Red Fort, the towering Qutub Minar, and the serene Lotus Temple. Old Delhi's bustling streets, filled with the aroma of street food like chaat, parathas, and kebabs, contrast with the upscale malls and chic cafes of New Delhi. Delhi's culture is a rich tapestry of diverse traditions, languages, and festivals, reflecting its historical significance as the heart of several empires. The lively markets of Chandni Chowk, the spiritual calm of Gurudwara Bangla Sahib, and the vibrant art scene at places like Hauz Khas Village showcase Delhi's dynamic spirit. From the traditional dance and music performances at Dilli Haat to the grandeur of Republic Day celebrations at Rajpath, Delhi captures the essence of India's cultural diversity and historical grandeur.",
    cost: "₹8,999",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/09/India_Gate_in_New_Delhi_03-2016.jpg",
      "https://i.pinimg.com/736x/3a/bf/41/3abf410d68cef855afe1b34c9b7e518b.jpg",
      "https://www.pelago.com/img/products/IN-India/delhi-old-delhi-new-delhi-full-day-tour-by-private-car/edbbd3a0-9a9d-48ea-a1d4-2fc200c3345e_delhi-old-delhi-new-delhi-full-day-tour-by-private-car.jpg"
    ]
  },
  {
    day: 2,
    title: "Historical Monuments & Old Delhi Tour",
    date: "Date, 2024",
    description: "Explore the magnificent Red Fort, one of India's most iconic Mughal structures, followed by a rickshaw ride through the narrow bylanes of Chandni Chowk. Visit Jama Masjid, one of India's largest mosques, and enjoy authentic Mughlai cuisine at Karim's. In the afternoon, head to Humayun's Tomb, a UNESCO World Heritage Site that inspired the design of the Taj Mahal. End the day at Purana Qila (Old Fort), one of Delhi's oldest historical monuments, for a captivating light and sound show under the stars.",
    cost: "₹7,499",
    images: [
      "https://pbs.twimg.com/media/FO8NYkQXMAEPhkx.jpg?format=jpg&name=thumb",
      "https://upload.wikimedia.org/wikipedia/commons/0/09/India_Gate_in_New_Delhi_03-2016.jpg",
      "https://www.pelago.com/img/products/IN-India/delhi-old-delhi-new-delhi-full-day-tour-by-private-car/edbbd3a0-9a9d-48ea-a1d4-2fc200c3345e_delhi-old-delhi-new-delhi-full-day-tour-by-private-car.jpg"
    ]
  },
  {
    day: 3,
    title: "Modern Delhi & Shopping Experience",
    date: "Date, 2024",
    description: "Begin the day with a visit to the serene Lotus Temple, followed by a morning at the grand Akshardham Temple complex. Explore the iconic India Gate and the majestic Rajpath boulevard. Head to Connaught Place for lunch at one of its celebrated cafes. Spend the afternoon shopping at Dilli Haat for traditional handicrafts and at Janpath Market for trendy finds. End the evening experiencing the vibrant atmosphere of Hauz Khas Village with its fusion restaurants, art galleries, and rooftop bars.",
    cost: "₹6,299",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/09/India_Gate_in_New_Delhi_03-2016.jpg",
      "https://i.pinimg.com/736x/3a/bf/41/3abf410d68cef855afe1b34c9b7e518b.jpg",
      "https://pbs.twimg.com/media/FO8NYkQXMAEPhkx.jpg?format=jpg&name=thumb"
    ]
  },
  {
    day: 4,
    title: "Farewell Party and Happy Ending",
    date: "Date, 2024",
    description: "Your final day in Delhi! Start with a peaceful morning stroll through Lodi Garden, a beautiful park dotted with Mughal-era tombs. Visit the National Museum for a deep dive into India's rich history and art. Enjoy a lavish farewell lunch at one of Delhi's celebrated rooftop restaurants overlooking the city skyline. Pick up last-minute souvenirs from Khan Market or INA Market. Head to the airport carrying wonderful memories of Delhi's warmth, culture, and incredible food — until next time!",
    cost: "₹5,999",
    images: [
      "https://www.pelago.com/img/products/IN-India/delhi-old-delhi-new-delhi-full-day-tour-by-private-car/edbbd3a0-9a9d-48ea-a1d4-2fc200c3345e_delhi-old-delhi-new-delhi-full-day-tour-by-private-car.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/0/09/India_Gate_in_New_Delhi_03-2016.jpg",
      "https://pbs.twimg.com/media/FO8NYkQXMAEPhkx.jpg?format=jpg&name=thumb"
    ]
  }
];

const DESTINATIONS_DB = {
  delhi: {
    title: "Delhi : All famous places to explore and more Historical place",
    badges: ["Cultural place", "Historical places", "Parties"],
    bannerImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80",
    bentoImages: [
      "https://i.pinimg.com/736x/3a/bf/41/3abf410d68cef855afe1b34c9b7e518b.jpg",
      "https://www.pelago.com/img/products/IN-India/delhi-old-delhi-new-delhi-full-day-tour-by-private-car/edbbd3a0-9a9d-48ea-a1d4-2fc200c3345e_delhi-old-delhi-new-delhi-full-day-tour-by-private-car.jpg",
      "https://pbs.twimg.com/media/FO8NYkQXMAEPhkx.jpg?format=jpg&name=thumb",
      "https://upload.wikimedia.org/wikipedia/commons/0/09/India_Gate_in_New_Delhi_03-2016.jpg"
    ],
    bentoLabels: ["Qutub Minar", "Humayun's Tomb", "Old Delhi Streets", "India Gate"],
    locationLabel: "Delhi, India",
    landmarks: {
      "Red fort": {
        title: "The Red Fort (Lal Qila)",
        subtitle: "Symbol of Mughal Power & India's Independence",
        description: "The Red Fort is a historic fort in the Old Delhi neighborhood of Delhi, India, that served as the main residence of the Mughal Emperors. Built by Emperor Shah Jahan in 1638 when he decided to shift his capital from Agra to Delhi. Made of red sandstone, it showcases a fusion of Persian, Timurid, and Hindu architectural styles.",
        timings: "09:30 AM - 04:30 PM (Closed on Mondays)",
        entryFee: "₹35 for Indians, ₹500 for Foreigners",
        rating: "4.6",
        reviewsCount: "14,500 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Red+Fort+Delhi",
        embedUrl: "https://maps.google.com/maps?q=Red%20Fort,%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
      },
      "Kutub Minaar": {
        title: "Qutub Minar Complex",
        subtitle: "The Tallest Brick Minaret in the World",
        description: "Qutb Minar is a minaret and 'victory tower' that forms part of the Qutb complex, a UNESCO World Heritage Site in the Mehrauli area of New Delhi, India. Standing 73 meters tall with five distinct tapering storeys, it was initiated by Qutb-ud-din Aibak in 1199 and finished by his successors. It represents the dawn of Indo-Islamic architecture.",
        timings: "07:00 AM - 08:00 PM (Daily)",
        entryFee: "₹40 for Indians, ₹600 for Foreigners",
        rating: "4.7",
        reviewsCount: "12,200 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Qutub+Minar+Delhi",
        embedUrl: "https://maps.google.com/maps?q=Qutub%20Minar,%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
      },
      "CP": {
        title: "Connaught Place (CP)",
        subtitle: "Delhi's Premier Commercial & Business Hub",
        description: "Connaught Place is one of the main financial, commercial, and business centers in New Delhi, India. Designed in the Georgian architecture style by Robert Tor Russell, it is famous for its white colonnade structures, high-end showrooms, international brands, popular bars, restaurants, and a bustling central park hosting the National Flag.",
        timings: "10:00 AM - 11:00 PM (Shops closed on Sundays)",
        entryFee: "Free Entry",
        rating: "4.5",
        reviewsCount: "18,900 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Connaught+Place+Delhi",
        embedUrl: "https://maps.google.com/maps?q=Connaught%20Place,%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
      },
      "Akshar Dham": {
        title: "Swaminarayan Akshardham Temple",
        subtitle: "A Spiritual Oasis of Hindu Art, Culture & Devotion",
        description: "Swaminarayan Akshardham is a massive temple complex in Delhi, India. It displays millennia of traditional Hindu and Indian culture, spirituality, and architecture. Constructed from pink sandstone and Italian Carrara marble, the main monument has no steel or concrete support. It features a spectacular musical fountain show and garden exhibitions.",
        timings: "10:00 AM - 06:30 PM (Closed on Mondays)",
        entryFee: "Free Entry (Exhibition fees apply)",
        rating: "4.8",
        reviewsCount: "20,400 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Akshardham+Temple+Delhi",
        embedUrl: "https://maps.google.com/maps?q=Akshardham%20Temple,%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
      },
      "Bangla Sahib": {
        title: "Gurudwara Bangla Sahib",
        subtitle: "A Peaceful Sanctuary of Sikh Worship & Community Service",
        description: "Gurudwara Bangla Sahib is one of the most prominent Sikh houses of worship in Delhi, India. Associated with the eighth Sikh Guru, Guru Har Krishan, it features a stunning golden dome and a holy sarovar (pool) inside. The gurudwara runs a continuous community kitchen (langar) serving free food to thousands of visitors daily.",
        timings: "24 Hours (Open Daily)",
        entryFee: "Free Entry",
        rating: "4.9",
        reviewsCount: "15,800 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gurudwara+Bangla+Sahib+Delhi",
        embedUrl: "https://maps.google.com/maps?q=Gurudwara%20Bangla%20Sahib,%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
      }
    },
    itinerary: [
      {
        day: 1,
        title: "Delhi Highlights and Culture",
        date: "Date, 2024",
        description: "Delhi, the vibrant capital of India, is a city where ancient heritage and modern life blend seamlessly. The city is dotted with iconic landmarks like the majestic Red Fort, the towering Qutub Minar, and the serene Lotus Temple.",
        cost: "₹8,999",
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/0/09/India_Gate_in_New_Delhi_03-2016.jpg",
          "https://i.pinimg.com/736x/3a/bf/41/3abf410d68cef855afe1b34c9b7e518b.jpg",
          "https://www.pelago.com/img/products/IN-India/delhi-old-delhi-new-delhi-full-day-tour-by-private-car/edbbd3a0-9a9d-48ea-a1d4-2fc200c3345e_delhi-old-delhi-new-delhi-full-day-tour-by-private-car.jpg"
        ]
      },
      {
        day: 2,
        title: "Historical Monuments & Old Delhi Tour",
        date: "Date, 2024",
        description: "Explore the magnificent Red Fort, one of India's most iconic Mughal structures, followed by a rickshaw ride through the narrow bylanes of Chandni Chowk. Visit Jama Masjid, one of India's largest mosques, and enjoy authentic Mughlai cuisine at Karim's.",
        cost: "₹7,499",
        images: [
          "https://pbs.twimg.com/media/FO8NYkQXMAEPhkx.jpg?format=jpg&name=thumb",
          "https://upload.wikimedia.org/wikipedia/commons/0/09/India_Gate_in_New_Delhi_03-2016.jpg",
          "https://www.pelago.com/img/products/IN-India/delhi-old-delhi-new-delhi-full-day-tour-by-private-car/edbbd3a0-9a9d-48ea-a1d4-2fc200c3345e_delhi-old-delhi-new-delhi-full-day-tour-by-private-car.jpg"
        ]
      },
      {
        day: 3,
        title: "Modern Delhi & Shopping Experience",
        date: "Date, 2024",
        description: "Begin the day with a visit to the serene Lotus Temple, followed by a morning at the grand Akshardham Temple complex. Explore the iconic India Gate and the majestic Rajpath boulevard. Head to Connaught Place for lunch at one of its celebrated cafes. Spend the afternoon shopping at Dilli Haat for traditional handicrafts and at Janpath Market for trendy finds. End the evening experiencing the vibrant atmosphere of Hauz Khas Village with its fusion restaurants, art galleries, and rooftop bars.",
        cost: "₹6,299",
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/0/09/India_Gate_in_New_Delhi_03-2016.jpg",
          "https://i.pinimg.com/736x/3a/bf/41/3abf410d68cef855afe1b34c9b7e518b.jpg",
          "https://pbs.twimg.com/media/FO8NYkQXMAEPhkx.jpg?format=jpg&name=thumb"
        ]
      },
      {
        day: 4,
        title: "Farewell Party and Happy Ending",
        date: "Date, 2024",
        description: "Your final day in Delhi! Start with a peaceful morning stroll through Lodi Garden, a beautiful park dotted with Mughal-era tombs. Visit the National Museum for a deep dive into India's rich history and art. Enjoy a lavish farewell lunch at one of Delhi's celebrated rooftop restaurants overlooking the city skyline. Pick up last-minute souvenirs from Khan Market or INA Market. Head to the airport carrying wonderful memories of Delhi's warmth, culture, and incredible food — until next time!",
        cost: "₹5,999",
        images: [
          "https://www.pelago.com/img/products/IN-India/delhi-old-delhi-new-delhi-full-day-tour-by-private-car/edbbd3a0-9a9d-48ea-a1d4-2fc200c3345e_delhi-old-delhi-new-delhi-full-day-tour-by-private-car.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/0/09/India_Gate_in_New_Delhi_03-2016.jpg",
          "https://pbs.twimg.com/media/FO8NYkQXMAEPhkx.jpg?format=jpg&name=thumb"
        ]
      }
    ],
    bestFoodTitle: "Best Food Palaces in Delhi",
    bestFoodDesc: "Delhi is a food lover's paradise, offering everything from iconic street food to luxurious dining. Must-visit spots include Karim's for Mughlai kebabs, Paranthe Wali Gali for stuffed parathas, and Bukhara at ITC Maurya for a royal North Indian experience.",
    bestFoodImages: [
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80"
    ],
    bestPlacesTitle: "Best places to stay",
    bestPlacesDesc: "Delhi offers a variety of accommodations, from luxurious hotels like The Leela Palace and The Imperial for opulent stays to Taj Palace and ITC Maurya for business travelers.",
    bestPlacesImages: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&auto=format&fit=crop&q=80"
    ],
    gallery: [
      "/images/Rectangle 85.svg", "/images/Rectangle 86.svg", "/images/Rectangle 87.svg",
      "/images/Rectangle 88.svg", "/images/Rectangle 89.svg", "/images/Rectangle 90.svg",
      "/images/Rectangle 91.svg", "/images/Rectangle 92.svg", "/images/Rectangle 93.svg",
      "/images/Rectangle 94.svg", "/images/Rectangle 95.svg", "/images/Rectangle 96.svg"
    ]
  },
  agra: {
    title: "Agra : Home of the Taj Mahal and Mughal Heritage",
    badges: ["Heritage", "Mughal Architecture", "Romantic"],
    bannerImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop&q=80",
    bentoImages: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1648019811552-5afa663ef016?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591018653367-9c01498b3320?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&auto=format&fit=crop&q=80"
    ],
    bentoLabels: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Mehtab Bagh Gardens"],
    locationLabel: "Agra, India",
    landmarks: {
      "Taj Mahal": {
        title: "Taj Mahal Complex",
        subtitle: "Symbol of Eternal Love & UNESCO World Heritage Site",
        description: "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. It represents the height of Mughal architecture.",
        timings: "06:00 AM - 07:00 PM (Closed on Fridays)",
        entryFee: "₹50 for Indians, ₹1100 for Foreigners",
        rating: "4.9",
        reviewsCount: "250,000 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Taj+Mahal+Agra",
        embedUrl: "https://maps.google.com/maps?q=Taj%20Mahal,%20Agra&t=&z=15&ie=UTF8&iwloc=&output=embed"
      },
      "Agra Fort": {
        title: "Historic Agra Fort",
        subtitle: "The Walled City of red sandstone",
        description: "Agra Fort is a historical fort in the city of Agra. It was the main residence of the emperors of the Mughal Dynasty until 1648, when the capital was shifted to Delhi. The fort contains magnificent palaces and audience halls.",
        timings: "06:00 AM - 06:00 PM (Daily)",
        entryFee: "₹50 for Indians, ₹650 for Foreigners",
        rating: "4.7",
        reviewsCount: "45,000 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Agra+Fort",
        embedUrl: "https://maps.google.com/maps?q=Agra%20Fort&t=&z=15&ie=UTF8&iwloc=&output=embed"
      },
      "Fatehpur Sikri": {
        title: "Fatehpur Sikri Palace complex",
        subtitle: "Akbar's Walled Imperial City",
        description: "Fatehpur Sikri is a town in Agra District. Founded in 1571 by Emperor Akbar, it served as the capital of the Mughal Empire. It features stunning buildings like Panch Mahal, Buland Darwaza, and Jama Masjid.",
        timings: "06:00 AM - 06:00 PM",
        entryFee: "₹50 for Indians, ₹610 for Foreigners",
        rating: "4.6",
        reviewsCount: "18,000 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Fatehpur+Sikri",
        embedUrl: "https://maps.google.com/maps?q=Fatehpur%20Sikri&t=&z=15&ie=UTF8&iwloc=&output=embed"
      }
    },
    itinerary: [
      {
        day: 1,
        title: "Sunrise Taj Mahal & Agra Heritage",
        date: "Date, 2024",
        description: "Witness the magnificent Taj Mahal during sunrise when the marble glows in warm golden hues. Head back for breakfast and then visit the grand Agra Fort, taking a walk through its palaces and gardens.",
        cost: "₹5,499",
        images: [
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=600&auto=format&fit=crop&q=80"
        ]
      },
      {
        day: 2,
        title: "Ghost City Fatehpur Sikri Excursion",
        date: "Date, 2024",
        description: "Excursion to the ghost city of Fatehpur Sikri, exploring Buland Darwaza and Akbar's palaces. Return to Agra to enjoy shopping for leather goods and marble handicrafts.",
        cost: "₹4,299",
        images: [
          "https://images.unsplash.com/photo-1591018653367-9c01498b3320?w=600&auto=format&fit=crop&q=100",
          "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&auto=format&fit=crop&q=80"
        ]
      }
    ],
    bestFoodTitle: "Famous Delicacies of Agra",
    bestFoodDesc: "Agra is famous for its sweet Petha (ash gourd candy), savory Bedai & Jalebi breakfast, and rich Mughlai cuisine. Try Panchhi Petha for the best varieties and local street food near Sadar Bazaar.",
    bestFoodImages: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80"
    ],
    bestPlacesTitle: "Luxury Stays near the Taj",
    bestPlacesDesc: "Agra offers amazing hotels, from the iconic Oberoi Amarvilas offering Taj views from every room, to ITC Mughal and Taj Hotel & Convention Centre for premium luxury.",
    bestPlacesImages: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591018653367-9c01498b3320?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582998658955-6f4b473e7762?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592639296346-560c37a0f711?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop&q=80"
    ]
  },
  thailand: {
    title: "Thailand : From Bustling Bangkok to Serene Shores",
    badges: ["Beaches", "Tropical", "Culture", "Nightlife"],
    bannerImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    bentoImages: [
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1542370512244-4a99a9ab9e28?w=600&auto=format&fit=crop&q=100",
      "https://plus.unsplash.com/premium_photo-1661882477461-20d16af70819?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&auto=format&fit=crop&q=100"
    ],
    bentoLabels: ["Wat Arun", "Phi Phi Islands", "Chiang Mai Temples", "Phuket Beaches"],
    locationLabel: "Bangkok & Phuket, Thailand",
    landmarks: {
      "Wat Arun": {
        title: "Wat Arun Temple",
        subtitle: "The Majestic Temple of Dawn in Bangkok",
        description: "Wat Arun is a Buddhist temple in Bangkok, Thailand, located on the Thonburi west bank of the Chao Phraya River. The temple derives its name from the Hindu god Aruna, often personified as the radiations of the rising sun.",
        timings: "08:00 AM - 06:00 PM (Daily)",
        entryFee: "100 THB",
        rating: "4.8",
        reviewsCount: "35,000 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Wat+Arun+Bangkok",
        embedUrl: "https://maps.google.com/maps?q=Wat%20Arun,%20Bangkok&t=&z=15&ie=UTF8&iwloc=&output=embed"
      },
      "Grand Palace": {
        title: "The Grand Palace Complex",
        subtitle: "The Historic Royal Court of Siam",
        description: "The Grand Palace is a complex of buildings at the heart of Bangkok, Thailand. The palace has been the official residence of the Kings of Siam since 1782. It features beautiful golden domes and murals.",
        timings: "08:30 AM - 03:30 PM",
        entryFee: "500 THB",
        rating: "4.7",
        reviewsCount: "68,000 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Grand+Palace+Bangkok",
        embedUrl: "https://maps.google.com/maps?q=Grand%20Palace,%20Bangkok&t=&z=15&ie=UTF8&iwloc=&output=embed"
      }
    },
    itinerary: [
      {
        day: 1,
        title: "Bangkok Temples & Street Food Tour",
        date: "Date, 2024",
        description: "Arrive in Bangkok and explore Wat Arun and Wat Phra Kaew. Spend your evening trying legendary street food like Pad Thai and Mango Sticky Rice at Yaowarat Road (Chinatown).",
        cost: "₹7,200",
        images: [
          "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&auto=format&fit=crop&q=80",
          "https://plus.unsplash.com/premium_photo-1726768891289-4339ca149ce4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhaWxhbmQlMjBzdHJlZXQlMjBmb29kfGVufDB8fDB8fHww"
        ]
      },
      {
        day: 2,
        title: "Island Hopping in Phi Phi & Phuket",
        date: "Date, 2024",
        description: "Fly to Phuket and take a speedboat tour to the Phi Phi Islands. Swim in Pileh Lagoon, visit Maya Bay, and relax on white sandy beaches under tropical palm trees.",
        cost: "₹9,800",
        images: [
          "https://images.unsplash.com/photo-1505450764626-124a5e3eb454?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHRoYWlsYW5kJTIwbWFya2V0fGVufDB8fDB8fHww",
          "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&auto=format&fit=crop&q=80"
        ]
      }
    ],
    bestFoodTitle: "Culinary Highlights of Thailand",
    bestFoodDesc: "Thai cuisine blends sweet, sour, spicy, and salty flavors. Essential dishes include Tom Yum Goong (spicy shrimp soup), Pad Thai, Green Curry, and fresh coconut ice cream at local night markets.",
    bestFoodImages: [
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80"
    ],
    bestPlacesTitle: "Tropical Beach Resorts & Hotels",
    bestPlacesDesc: "Thailand offers outstanding luxury stays, from the heritage Mandarin Oriental in Bangkok, to private pool villas in Phuket and eco-lodges in Chiang Mai.",
    bestPlacesImages: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=100"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1505450764626-124a5e3eb454?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&auto=format&fit=crop&q=100",
      "https://plus.unsplash.com/premium_photo-1661940254003-c3f37e5d32ad?w=600&auto=format&fit=crop&q=100",
      "https://plus.unsplash.com/premium_photo-1734607187702-0aa7ca24eac2?w=600&auto=format&fit=crop&q=100",
      "https://plus.unsplash.com/premium_photo-1661962432490-6188a6420a81?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1592639296346-560c37a0f711?w=600&auto=format&fit=crop&q=100"
    ]
  },
  lucknow: {
    title: "Lucknow : Flourished as a North Indian cultural",
    badges: ["Nawabi Culture", "Heritage", "Fine Art", "Kebabs"],
    bannerImage: "https://images.unsplash.com/photo-1600577916048-804c9191e36c?w=1200&auto=format&fit=crop&q=80",
    bentoImages: [
      "https://images.unsplash.com/photo-1711428687391-a37b21cb9c56?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1672398354455-11c3a8c4a17b?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1688287580970-70fe8e0f4bef?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1571060492916-93b251851ca5?w=600&auto=format&fit=crop&q=100"
    ],
    bentoLabels: ["Bara Imambara", "Rumi Darwaza", "Chota Imambara", "Hazratganj market"],
    locationLabel: "Lucknow, Uttar Pradesh, India",
    landmarks: {
      "Bara Imambara": {
        title: "Bara Imambara complex",
        subtitle: "The Incredible labyrinth of Bhool Bhulaiya",
        description: "Bara Imambara is an imambara complex in Lucknow built by Asaf-ud-Daula, Nawab of Awadh, in 1784. It is famous for its incredible maze, called Bhool Bhulaiya, which offers panoramic views of the city.",
        timings: "06:00 AM - 05:00 PM (Closed on Mondays)",
        entryFee: "₹50 for Indians, ₹500 for Foreigners",
        rating: "4.7",
        reviewsCount: "25,000 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Bara+Imambara+Lucknow",
        embedUrl: "https://maps.google.com/maps?q=Bara%20Imambara,%20Lucknow&t=&z=15&ie=UTF8&iwloc=&output=embed"
      },
      "Rumi Darwaza": {
        title: "Rumi Darwaza",
        subtitle: "Signature Turkish Gate of the City",
        description: "Rumi Darwaza is an imposing gateway built under Nawab Asaf-ud-Daula in 1784. It is an example of Awadhi architecture, standing sixty feet tall, and serves as the logo/signature symbol of Lucknow.",
        timings: "Open 24 Hours",
        entryFee: "Free Entry",
        rating: "4.6",
        reviewsCount: "18,000 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Rumi+Darwaza+Lucknow",
        embedUrl: "https://maps.google.com/maps?q=Rumi%20Darwaza,%20Lucknow&t=&z=15&ie=UTF8&iwloc=&output=embed"
      }
    },
    itinerary: [
      {
        day: 1,
        title: "Heritage Walk & Bhool Bhulaiya Maze",
        date: "Date, 2024",
        description: "Take a walking heritage tour through Bara Imambara and find your way through the historic Bhool Bhulaiya maze. Photograph Rumi Darwaza and the clock tower.",
        cost: "₹3,999",
        images: [
          "https://images.unsplash.com/photo-1740815897090-36484f31a51b?w=600&auto=format&fit=crop&q=100",
          "https://plus.unsplash.com/premium_photo-1664304475305-c26fbaeee87b?w=600&auto=format&fit=crop&q=100"
        ]
      },
      {
        day: 2,
        title: "Awadhi Food Feast & Chikankari Shopping",
        date: "Date, 2024",
        description: "Explore the street markets of Aminabad and Chowk for traditional Chikankari hand-embroidered suits. End your day enjoying authentic Galouti Kebabs at Tunday Kababi.",
        cost: "₹2,899",
        images: [
          "https://images.unsplash.com/photo-1600577916048-804c9191e36c?w=600&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1772551419646-e1d76cfebfc8?w=600&auto=format&fit=crop&q=100"
        ]
      }
    ],
    bestFoodTitle: "Nawabi Kebabs & Awadhi Cuisine",
    bestFoodDesc: "Lucknow is world-famous for its Awadhi food. Try Tunday Kababi's Galouti Kebabs, Rahim's Kulcha Nihari, and soft, saffron-infused Makhan Malai sweet in winter.",
    bestFoodImages: [
      "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80"
    ],
    bestPlacesTitle: "Royal Haveli & Heritage Hotels",
    bestPlacesDesc: "Enjoy Nawabi hospitality at the Taj Mahal Lucknow, Hyatt Regency, or boutique heritage guest houses near Hazratganj and Gomti Nagar.",
    bestPlacesImages: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&auto=format&fit=crop&q=80"
    ],
    gallery: [
      "https://plus.unsplash.com/premium_photo-1697730416023-3373077b9439?w=600&auto=format&fit=crop&q=100",
      "https://plus.unsplash.com/premium_photo-1664304475305-c26fbaeee87b?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1600577916048-804c9191e36c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1647494355507-ce0847faf72a?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582998658955-6f4b473e7762?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592639296346-560c37a0f711?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop&q=80"
    ]
  },
  mumbai: {
    title: "Mumbai : Beaches, cinemas, studios, and historical monuments",
    badges: ["Bollywood", "Coastal", "Financial Capital", "Nightlife"],
    bannerImage: "https://images.unsplash.com/photo-1573132223210-d65883b944aa?w=1200&auto=format&fit=crop&q=100",
    bentoImages: [
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&auto=format&fit=crop&q=80"
    ],
    bentoLabels: ["Gateway of India", "Marine Drive", "Worli Sea Link", "Bandra promenade"],
    locationLabel: "Mumbai, Maharashtra, India",
    landmarks: {
      "Gateway of India": {
        title: "Gateway of India",
        subtitle: "Iconic Coastal Arch & Colonial Monument",
        description: "The Gateway of India is an arch-monument built in the early twentieth century in the city of Bombay (now Mumbai). It was erected to commemorate the landing in India of King-Emperor George V and Queen-Empress Mary.",
        timings: "Open 24 Hours",
        entryFee: "Free Entry",
        rating: "4.8",
        reviewsCount: "135,000 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gateway+of+India+Mumbai",
        embedUrl: "https://maps.google.com/maps?q=Gateway%20of%20India,%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
      },
      "Marine Drive": {
        title: "Marine Drive Promenade",
        subtitle: "The Beautiful Queen's Necklace Coastline",
        description: "Marine Drive is a 3-kilometre-long Promenade along the Netaji Subhash Chandra Bose Road in South Mumbai. It is a 'C'-shaped six-lane concrete road along the coast, which is a natural bay. The street lights resemble a string of pearls.",
        timings: "Open 24 Hours",
        entryFee: "Free Entry",
        rating: "4.7",
        reviewsCount: "95,000 reviews",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Marine+Drive+Mumbai",
        embedUrl: "https://maps.google.com/maps?q=Marine%20Drive,%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
      }
    },
    itinerary: [
      {
        day: 1,
        title: "Colonial Walk & Sunset at Queen's Necklace",
        date: "Date, 2024",
        description: "Begin with a South Mumbai walk covering Gateway of India, Taj Palace Hotel, and CST Station. Spend the evening enjoying the breeze and sunset at Marine Drive.",
        cost: "₹4,500",
        images: [
          "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?w=600&auto=format&fit=crop&q=80"
        ]
      },
      {
        day: 2,
        title: "Elephanta Caves Ferry & Bollywood Drive",
        date: "Date, 2024",
        description: "Catch a ferry to Elephanta Island to explore historic rock-cut cave temples. Return to the city for a drive across Bandra-Worli Sea Link and explore Bandra.",
        cost: "₹5,200",
        images: [
          "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&auto=format&fit=crop&q=80"
        ]
      }
    ],
    bestFoodTitle: "Street Food Capital of India",
    bestFoodDesc: "Indulge in Mumbai's signature Vada Pav, spicy Pav Bhaji, Bhel Puri, and Sev Puri. Visit Chowpatty Beach or Bademiya for nocturnal food runs.",
    bestFoodImages: [
      "https://images.unsplash.com/photo-1750767396956-da1796f33ad1?w=600&auto=format&fit=crop&q=100",
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80"
    ],
    bestPlacesTitle: "Seaside Luxury & Boutique Hotels",
    bestPlacesDesc: "Mumbai hosts the legendary Taj Mahal Palace overlooking the harbor, Trident Nariman Point, and trendy boutique hotels in Bandra and Juhu.",
    bestPlacesImages: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&auto=format&fit=crop&q=80"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582998658955-6f4b473e7762?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592639296346-560c37a0f711?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop&q=80"
    ]
  }
};

const getDestinationKey = (paramId) => {
  const idLower = String(paramId || "").toLowerCase();
  if (idLower.includes("delhi")) return "delhi";
  if (idLower.includes("thailand")) return "thailand";
  if (idLower.includes("lucknow")) return "lucknow";
  if (idLower.includes("mumbai")) return "mumbai";
  if (idLower.includes("agra")) return "agra";
  return idLower;
};

const Destination = () => {
  const { id } = useParams();
  const location = useLocation();
  const destKey = getDestinationKey(id);
  
  // Create a dynamic destination object if state is provided
  const stateDestination = location.state?.destination;
  const dynamicDestination = stateDestination ? {
    title: stateDestination.title,
    subtitle: "Explore beautiful destinations around the world",
    description: "Discover the amazing sights, sounds, and cultures of this stunning location.",
    bannerImage: stateDestination.image,
    locationLabel: stateDestination.locations || stateDestination.title,
    bentoImages: [stateDestination.image, stateDestination.image, stateDestination.image, stateDestination.image],
    bentoLabels: [stateDestination.title, "Landmark 1", "Landmark 2", "Landmark 3"],
    badges: ["Top Rated", "Best Value", "Highly Recommended"],
    bestFoodImages: [stateDestination.image, stateDestination.image, stateDestination.image],
    bestPlacesImages: [stateDestination.image, stateDestination.image, stateDestination.image],
    gallery: [stateDestination.image, stateDestination.image, stateDestination.image, stateDestination.image, stateDestination.image, stateDestination.image],
    landmarks: {
      "Main Attraction": {
        title: stateDestination.title,
        subtitle: "A must-visit famous place",
        description: "Enjoy your trip and explore the rich culture and history here.",
        timings: "09:00 AM - 06:00 PM (Daily)",
        entryFee: "Varies",
        rating: "4.5",
        reviewsCount: "10,000+ reviews",
        mapUrl: `https://www.google.com/maps/search/?api=1&query=${stateDestination.title}`,
        embedUrl: `https://maps.google.com/maps?q=${stateDestination.title}&t=&z=15&ie=UTF8&iwloc=&output=embed`
      }
    },
    itinerary: [
      {
        day: 1,
        title: "Highlights and Culture",
        date: "Date, 2024",
        description: `Explore the beautiful ${stateDestination.title} and enjoy the scenic views.`,
        cost: stateDestination.price,
        images: [stateDestination.image, stateDestination.image, stateDestination.image]
      }
    ]
  } : null;

  const destinationData = dynamicDestination || DESTINATIONS_DB[destKey] || DESTINATIONS_DB.delhi;

  const landmarkKeys = Object.keys(destinationData.landmarks || {});
  const [activeLandmark, setActiveLandmark] = useState(landmarkKeys[0] || "");
  const [isWishlisted, setIsWishlisted] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      return saved.some(item => item.title === destinationData.title);
    } catch (e) {
      return false;
    }
  });
  const [activeDay, setActiveDay] = useState(0);

  const handleToggleWishlist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (isWishlisted) {
        const updated = saved.filter(item => item.title !== destinationData.title);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        setIsWishlisted(false);
        toast.success("Removed from wishlist.");
      } else {
        const newItem = {
          title: destinationData.title,
          image: destinationData.bannerImage || "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80",
          price: "Explore Packages",
          locations: destinationData.locationLabel,
          type: "destination"
        };
        saved.push(newItem);
        localStorage.setItem("wishlist", JSON.stringify(saved));
        setIsWishlisted(true);
        toast.success(`Added ${destinationData.locationLabel} to your wishlist!`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Sync active landmark when destKey/id changes
  useEffect(() => {
    setActiveLandmark(Object.keys(destinationData.landmarks)[0]);
    setActiveDay(0);
  }, [destKey]);

  const selectedData = destinationData.landmarks[activeLandmark] || destinationData.landmarks[landmarkKeys[0]];
  const isDelhi = destKey === "delhi";

  const handleBookNow = () => {
    toast.success(`Redirecting you to checkout for the ${destinationData.locationLabel} Sightseeing Tour!`);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1360px] w-full mx-auto flex-grow">
        {/* Back Link */}
        <Link
          to="/main"
          className="flex items-center gap-2 text-gray-800 font-medium mb-6 hover:text-[#0093CB] transition-colors w-fit"
        >
          <MdArrowBack size={18} />
          <span className="text-sm">Back to Home</span>
        </Link>

        {/* ── Staggered Bento Grid ── */}
        {isDelhi ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 md:h-[500px] px-8 md:px-12 lg:px-18">
            {/* Left Column: Kutub Minar */}
            <div className="md:col-span-1 rounded-[20px] overflow-hidden shadow-sm h-[300px] md:h-full relative group">
              <img
                src="https://i.pinimg.com/736x/3a/bf/41/3abf410d68cef855afe1b34c9b7e518b.jpg"
                alt="Qutub Minar"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex items-end">
                <span className="text-white font-bold text-sm">Qutub Minar</span>
              </div>
            </div>

            {/* Right Column Grid container */}
            <div className="md:col-span-2 grid grid-rows-2 gap-5 h-full">
              {/* Top: Humayun's Tomb */}
              <div className="rounded-[20px] overflow-hidden shadow-sm h-[200px] md:h-[240px] relative group">
                <img
                  src="https://www.pelago.com/img/products/IN-India/delhi-old-delhi-new-delhi-full-day-tour-by-private-car/edbbd3a0-9a9d-48ea-a1d4-2fc200c3345e_delhi-old-delhi-new-delhi-full-day-tour-by-private-car.jpg"
                  alt="Humayun's Tomb"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex items-end">
                  <span className="text-white font-bold text-sm">Humayun's Tomb</span>
                </div>
              </div>

              {/* Bottom row of 2 images */}
              <div className="grid grid-cols-2 gap-5 h-[200px] md:h-[240px]">
                <div className="rounded-[20px] overflow-hidden shadow-sm h-full relative group">
                  <img
                    src="https://pbs.twimg.com/media/FO8NYkQXMAEPhkx.jpg?format=jpg&name=thumb"
                    alt="Old Delhi Streets"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                    <span className="text-white font-bold text-xs">Old Delhi Streets</span>
                  </div>
                </div>
                <div className="rounded-[20px] overflow-hidden shadow-sm h-full relative group">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/09/India_Gate_in_New_Delhi_03-2016.jpg"
                    alt="India Gate"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                    <span className="text-white font-bold text-xs">India Gate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 md:h-[500px] px-8 md:px-12 lg:px-18">
            {/* Left Column */}
            <div className="md:col-span-1 rounded-[20px] overflow-hidden shadow-sm h-[300px] md:h-full relative group">
              <img
                src={destinationData.bentoImages[0]}
                alt={destinationData.bentoLabels[0]}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex items-end">
                <span className="text-white font-bold text-sm">{destinationData.bentoLabels[0]}</span>
              </div>
            </div>

            {/* Right Column Grid container */}
            <div className="md:col-span-2 grid grid-rows-2 gap-5 h-full">
              {/* Top */}
              <div className="rounded-[20px] overflow-hidden shadow-sm h-[200px] md:h-[240px] relative group">
                <img
                  src={destinationData.bentoImages[1]}
                  alt={destinationData.bentoLabels[1]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex items-end">
                  <span className="text-white font-bold text-sm">{destinationData.bentoLabels[1]}</span>
                </div>
              </div>

              {/* Bottom row of 2 images */}
              <div className="grid grid-cols-2 gap-5 h-[200px] md:h-[240px]">
                <div className="rounded-[20px] overflow-hidden shadow-sm h-full relative group">
                  <img
                    src={destinationData.bentoImages[2]}
                    alt={destinationData.bentoLabels[2]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                    <span className="text-white font-bold text-xs">{destinationData.bentoLabels[2]}</span>
                  </div>
                </div>
                <div className="rounded-[20px] overflow-hidden shadow-sm h-full relative group">
                  <img
                    src={destinationData.bentoImages[3]}
                    alt={destinationData.bentoLabels[3]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                    <span className="text-white font-bold text-xs">{destinationData.bentoLabels[3]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Title Section ── */}
        <div className="mb-6 ml-18 mr-18 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#1A1A1A] tracking-tight leading-snug mb-4">
              {destinationData.title}
            </h1>

            {/* Category Pill Badges */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              {destinationData.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className={`rounded-full px-5 py-1.5 text-xs font-bold border select-none ${idx === 0
                    ? "bg-[#E6F9F0] border-[#A3E9C8] text-[#0E8A54]"
                    : idx === 1
                      ? "bg-[#E6F2FC] border-[#A3CFFC] text-[#0E548A]"
                      : "bg-[#FFF4E6] border-[#FED7AA] text-[#EA580C]"
                    }`}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleToggleWishlist}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-5 rounded-xl flex items-center gap-2 transition-all text-xs cursor-pointer shadow-sm w-fit mt-1"
          >
            <Heart size={16} className={isWishlisted ? "fill-[#E86B62] text-[#E86B62]" : ""} />
            {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
          </button>
        </div>

          {/* Landmark Tabs */}
          <div className="flex overflow-x-auto gap-2 border-b border-gray-100 pb-3 mb-8 scrollbar-hide ml-18">
            {Object.keys(destinationData.landmarks).map((name) => (
              <button
                key={name}
                onClick={() => setActiveLandmark(name)}
                className={`px-4.5 py-2 text-xs sm:text-sm font-bold border rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${activeLandmark === name
                  ? "border-gray-800 text-gray-900 bg-gray-50/50 shadow-sm"
                  : "border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                {name}
              </button>
            ))}
          </div>

        {/* Map Section */}
        <div className="ml-18 mr-18 mb-20">
          <div className="relative rounded-[20px] overflow-hidden border border-gray-200/80 shadow-md h-[300px] w-full">
            {/* Clickable Overlay to redirect to Google Maps */}
            <a
              href={selectedData.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-20 cursor-pointer block"
              title={`View ${selectedData.title} on Google Maps`}
            >
              {/* Invisible overlay for capturing clicks */}
              <div className="w-full h-full bg-transparent hover:bg-black/5 transition-colors duration-200" />
            </a>

            {/* Embedded Iframe Map */}
            <iframe
              src={selectedData.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 z-10 w-full h-full pointer-events-none"
            />

            {/* Bottom-left Card Overlay */}
            <div className="absolute bottom-5 left-5 z-30 bg-white/95 backdrop-blur-md rounded-xl border border-gray-100 shadow-lg py-2.5 px-5 max-w-[280px]">
              <span className="block font-black text-gray-900 text-xs sm:text-sm tracking-tight leading-snug">
                {selectedData.title}
              </span>
              <span className="block text-[10px] font-bold text-gray-400 mt-0.5 leading-snug">
                {destinationData.locationLabel}
              </span>
            </div>

            {/* Bottom-right Fullscreen Link Overlay */}
            <div className="absolute bottom-5 right-5 z-30 bg-white border border-gray-150 rounded-xl shadow-lg w-10 h-10 flex items-center justify-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Itinerary Graphic Section */}
        <div
          className="mx-auto flex justify-center w-full px-4 sm:px-6 md:px-12 lg:px-18"
          style={{
            marginTop: "36px",
            marginBottom: "48px",
            opacity: 1,
          }}
        >
          {isDelhi ? (
            <img
              src="/images/Frame 1130.svg"
              alt="Itinerary details"
              className="w-full h-auto block rounded-[20px]"
              style={{
                maxWidth: "1417px",
                aspectRatio: "1417 / 747",
                objectFit: "contain",
              }}
            />
          ) : (
            <img
              src={destinationData.bannerImage || "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80"}
              alt="Itinerary details"
              className="w-full h-[300px] sm:h-[400px] object-cover block rounded-[20px] shadow-sm"
            />
          )}
        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-gray-100 my-10 mx-4 sm:mx-6 md:mx-12 lg:mx-18" />

        {/* Accommodation Section */}
        <div className="mx-4 sm:mx-6 md:mx-12 lg:mx-18 mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight leading-snug mb-6">
            Accommodation
          </h2>

          {isDelhi ? (
            <>
              {/* Subsection 1: Best Food Palaces */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10">
                {/* Left: 3-Image Grid */}
                <div className="flex gap-4 h-[250px] sm:h-[310px] md:h-[350px] w-full">
                  {/* Tall Left Image */}
                  <div className="w-1/2 h-full rounded-[20px] overflow-hidden shadow-sm">
                    <img
                      src="/carrentallogo/Rectangle 78.svg"
                      alt="Delhi hotel rooftop pool lounge chairs"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                    />
                  </div>
                  {/* Stacked Right Images */}
                  <div className="w-1/2 flex flex-col gap-4 h-full">
                    <div className="h-[calc(50%-8px)] rounded-[20px] overflow-hidden shadow-sm">
                      <img
                        src="/carrentallogo/Rectangle 80.svg"
                        alt="Delhi luxury hotel room"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                      />
                    </div>
                    <div className="h-[calc(50%-8px)] rounded-[20px] overflow-hidden shadow-sm">
                      <img
                        src="/carrentallogo/Rectangle 79.svg"
                        alt="Delhi modern hotel building exterior"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Text Part */}
                <div className="flex flex-col items-start lg:items-end text-left lg:text-right">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 tracking-tight">
                    Best Food Palaces in Delhi
                  </h3>
                  <p className="text-gray-500 font-medium text-[13px] sm:text-sm leading-relaxed mb-4 max-w-[600px]">
                    Delhi is a food lover's paradise, offering everything from iconic street food to luxurious dining. Must-visit spots include <span className="font-bold text-gray-800">Karim</span>'s for Mughlai kebabs, Paranthe Wali Gali for stuffed parathas, and <span className="font-bold text-gray-800">Bukhara</span> at ITC Maurya for a royal North Indian experience. For diverse flavors, explore <span className="font-bold text-gray-800">Dilli Haat</span> and <span className="font-bold text-gray-800">Majnu Ka Tilla</span>. Whether it's spicy street bites or fine dining, Delhi's culinary scene has something for everyone.
                  </p>
                  <Link
                    to="/best-food-area"
                    className="bg-[#29A4C6] hover:bg-[#208ba8] text-white font-bold py-2 px-15 rounded-xl shadow-sm text-xs transition-all duration-200 cursor-pointer active:scale-95 text-center block w-fit"
                  >
                    See All
                  </Link>
                </div>
              </div>

              {/* Subsection 2: Best Places to Stay */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left: Text Part */}
                <div className="flex flex-col items-start text-left order-2 lg:order-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 tracking-tight">
                    Best places to stay
                  </h3>
                  <p className="text-gray-500 font-medium text-[13px] sm:text-sm leading-relaxed mb-4 max-w-[600px]">
                    Delhi offers a variety of accommodations, from luxurious hotels like <span className="font-bold text-gray-800">The Leela Palace</span> and <span className="font-bold text-gray-800">The Imperial</span> for opulent stays to <span className="font-bold text-gray-800">Taj Palace</span> and <span className="font-bold text-gray-800">ITC Maurya</span> for business travelers. Budgets options and heritage guest houses are also plentiful, particularly in south and central Delhi areas.
                  </p>
                  <Link
                    to="/hotel-search"
                    className="bg-[#29A4C6] hover:bg-[#208ba8] text-white font-bold py-2 px-15 rounded-xl shadow-sm text-xs transition-all duration-200 cursor-pointer active:scale-95 text-center"
                  >
                    See All
                  </Link>
                </div>

                {/* Right: 3-Image Grid */}
                <div className="flex gap-4 h-[250px] sm:h-[310px] md:h-[350px] w-full order-1 lg:order-2">
                  {/* Stacked Left Images */}
                  <div className="w-1/2 flex flex-col gap-4 h-full">
                    <div className="h-[calc(50%-8px)] rounded-[20px] overflow-hidden shadow-sm">
                      <img
                        src="/carrentallogo/Rectangle 82.svg"
                        alt="cafe stairs flowers"
                        className="w-full h-full object-cover rotate-180 transition-transform duration-500 hover:scale-102"
                      />
                    </div>
                    <div className="h-[calc(50%-8px)] rounded-[20px] overflow-hidden shadow-sm">
                      <img
                        src="/carrentallogo/Rectangle 83.svg"
                        alt="restaurant courtyard night"
                        className="w-full h-full object-cover rotate-180 transition-transform duration-500 hover:scale-102"
                      />
                    </div>
                  </div>
                  {/* Tall Right Image */}
                  <div className="w-1/2 h-full rounded-[20px] overflow-hidden shadow-sm">
                    <img
                      src="/carrentallogo/Rectangle 81.svg"
                      alt="colorful street signs"
                      className="w-full h-full object-cover rotate-180 transition-transform duration-500 hover:scale-102"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Subsection 1: Best Food Palaces */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10">
                {/* Left: 3-Image Grid */}
                <div className="flex gap-4 h-[250px] sm:h-[310px] md:h-[350px] w-full">
                  {/* Tall Left Image */}
                  <div className="w-1/2 h-full rounded-[20px] overflow-hidden shadow-sm animate-fadeIn">
                    <img
                      src={destinationData.bestFoodImages[0]}
                      alt="food spot tall view"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                    />
                  </div>
                  {/* Stacked Right Images */}
                  <div className="w-1/2 flex flex-col gap-4 h-full">
                    <div className="h-[calc(50%-8px)] rounded-[20px] overflow-hidden shadow-sm">
                      <img
                        src={destinationData.bestFoodImages[1]}
                        alt="food spot side view 1"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                      />
                    </div>
                    <div className="h-[calc(50%-8px)] rounded-[20px] overflow-hidden shadow-sm">
                      <img
                        src={destinationData.bestFoodImages[2]}
                        alt="food spot side view 2"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Text Part */}
                <div className="flex flex-col items-start lg:items-end text-left lg:text-right">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 tracking-tight">
                    {destinationData.bestFoodTitle}
                  </h3>
                  <p className="text-gray-500 font-medium text-[13px] sm:text-sm leading-relaxed mb-4 max-w-[600px]">
                    {destinationData.bestFoodDesc}
                  </p>
                  <Link
                    to="/best-food-area"
                    className="bg-[#29A4C6] hover:bg-[#208ba8] text-white font-bold py-2 px-15 rounded-xl shadow-sm text-xs transition-all duration-200 cursor-pointer active:scale-95 text-center block w-fit"
                  >
                    See All
                  </Link>
                </div>
              </div>

              {/* Subsection 2: Best Places to Stay */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left: Text Part */}
                <div className="flex flex-col items-start text-left order-2 lg:order-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 tracking-tight">
                    {destinationData.bestPlacesTitle}
                  </h3>
                  <p className="text-gray-500 font-medium text-[13px] sm:text-sm leading-relaxed mb-4 max-w-[600px]">
                    {destinationData.bestPlacesDesc}
                  </p>
                  <Link
                    to="/hotel-search"
                    className="bg-[#29A4C6] hover:bg-[#208ba8] text-white font-bold py-2 px-15 rounded-xl shadow-sm text-xs transition-all duration-200 cursor-pointer active:scale-95 text-center"
                  >
                    See All
                  </Link>
                </div>

                {/* Right: 3-Image Grid */}
                <div className="flex gap-4 h-[250px] sm:h-[310px] md:h-[350px] w-full order-1 lg:order-2">
                  {/* Stacked Left Images */}
                  <div className="w-1/2 flex flex-col gap-4 h-full">
                    <div className="h-[calc(50%-8px)] rounded-[20px] overflow-hidden shadow-sm">
                      <img
                        src={destinationData.bestPlacesImages[0]}
                        alt="hotel room side view 1"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                      />
                    </div>
                    <div className="h-[calc(50%-8px)] rounded-[20px] overflow-hidden shadow-sm">
                      <img
                        src={destinationData.bestPlacesImages[1]}
                        alt="hotel room side view 2"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                      />
                    </div>
                  </div>
                  {/* Tall Right Image */}
                  <div className="w-1/2 h-full rounded-[20px] overflow-hidden shadow-sm">
                    <img
                      src={destinationData.bestPlacesImages[2]}
                      alt="hotel stay exterior view"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Itinerary Accordion Section */}
        {false ? (
          <div></div>
        ) : (
          <div
            className="mx-4 sm:mx-6 md:mx-12 lg:mx-18"
            style={{ marginTop: "36px", marginBottom: "48px" }}
          >
            {destinationData.itinerary.map((item, idx) => (
              <div key={idx} className="flex gap-0">
                {/* Left: Day label + vertical timeline */}
                <div className="flex flex-col items-center mr-5 sm:mr-7" style={{ minWidth: 56 }}>
                  <span className="text-[#FFBF07] font-extrabold text-[11px] leading-none mb-1.5">
                    Day {item.day}
                  </span>
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-colors duration-200 ${activeDay === idx
                      ? "bg-[#2B9CB6] border-[#2B9CB6]"
                      : "bg-[#A1A1A1] border-[#A1A1A1]"
                      }`}
                  />
                  {idx < destinationData.itinerary.length - 1 && (
                    <div
                      className="flex-1 mt-1"
                      style={{
                        width: "2px",
                        borderLeft: "2px dashed rgba(43,156,182,0.25)",
                        minHeight: "60px",
                      }}
                    />
                  )}
                </div>

                {/* Right: Clickable header + expandable content */}
                <div className="flex-1 pb-6">
                  <button
                    onClick={() => setActiveDay(activeDay === idx ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-[#2B9CB6] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-xs mt-0.5">{item.date}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${activeDay === idx ? "rotate-180 text-[#2B9CB6]" : ""
                        }`}
                    />
                  </button>

                  <div className="border-t border-gray-100 mt-3" />

                  {activeDay === idx && (
                    <div className="mt-4">
                      <p className="text-gray-500 font-medium text-[13px] sm:text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <p className="text-[13px] text-gray-500 mb-4">
                        Approx{" "}
                        <span className="font-bold text-gray-900">
                          Total cost: {item.cost}
                        </span>
                        /per person
                      </p>
                      <div className="flex gap-2">
                        {item.images.map((img, imgIdx) => (
                          <div
                            key={imgIdx}
                            className={`rounded-xl overflow-hidden shrink-0 ${imgIdx === 0
                              ? "h-[80px] w-[100px] sm:h-[100px] sm:w-[130px]"
                              : "h-[80px] w-[65px] sm:h-[100px] sm:w-[90px]"
                              }`}
                          >
                            <img
                              src={img}
                              alt={`Day ${item.day} photo ${imgIdx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gallery Section */}
        <div className="mx-4 sm:mx-6 md:mx-12 lg:mx-18 mb-16 mt-16 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-left">
            Gallery
          </h2>

          {/* Grid of 12 images */}
          {isDelhi ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 max-w-[1360px] mx-auto">
              <img src="/images/Rectangle 85.svg" className="w-full aspect-square object-cover block" alt="Gallery 1" />
              <img src="/images/Rectangle 86.svg" className="w-full aspect-square object-cover block" alt="Gallery 2" />
              <img src="/images/Rectangle 87.svg" className="w-full aspect-square object-cover block" alt="Gallery 3" />
              <img src="/images/Rectangle 88.svg" className="w-full aspect-square object-cover block" alt="Gallery 4" />
              <img src="/images/Rectangle 89.svg" className="w-full aspect-square object-cover block" alt="Gallery 5" />
              <img src="/images/Rectangle 90.svg" className="w-full aspect-square object-cover block" alt="Gallery 6" />
              <img src="/images/Rectangle 91.svg" className="w-full aspect-square object-cover block" alt="Gallery 7" />
              <img src="/images/Rectangle 92.svg" className="w-full aspect-square object-cover block" alt="Gallery 8" />
              <img src="/images/Rectangle 93.svg" className="w-full aspect-square object-cover block" alt="Gallery 9" />
              <img src="/images/Rectangle 94.svg" className="w-full aspect-square object-cover block" alt="Gallery 10" />
              <img src="/images/Rectangle 95.svg" className="w-full aspect-square object-cover block" alt="Gallery 11" />
              <img src="/images/Rectangle 96.svg" className="w-full aspect-square object-cover block" alt="Gallery 12" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 max-w-[1360px] mx-auto">
              {destinationData.gallery.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  className="w-full aspect-square object-cover block rounded-lg"
                  alt={`Gallery ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* See All Photos Button */}
          <Link
            to="/gallery"
            className="bg-[#29A4C6] hover:bg-[#208ba8] text-white font-bold py-2.5 px-8 rounded-xl shadow-sm text-sm transition-all duration-200 cursor-pointer active:scale-95 mx-auto block w-fit text-center"
          >
            See All Photos
          </Link>
        </div>

      </main>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default Destination;