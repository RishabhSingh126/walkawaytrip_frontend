import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack, MdSwapHoriz } from "react-icons/md";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/user/common/Footer";
import ContactFooter from "@/components/user/landing/ContactPage";

const COUNTRIES = [
  { name: "Abu Dhabi, UAE", lat: 24.47, lon: 54.37 },
  { name: "Amsterdam, Netherlands", lat: 52.37, lon: 4.90 },
  { name: "Auckland, New Zealand", lat: -36.85, lon: 174.76 },
  { name: "Bangkok, Thailand", lat: 13.76, lon: 100.50 },
  { name: "Barcelona, Spain", lat: 41.39, lon: 2.16 },
  { name: "Beijing, China", lat: 39.91, lon: 116.39 },
  { name: "Berlin, Germany", lat: 52.52, lon: 13.41 },
  { name: "Bogota, Colombia", lat: 4.71, lon: -74.07 },
  { name: "Brussels, Belgium", lat: 50.85, lon: 4.35 },
  { name: "Buenos Aires, Argentina", lat: -34.60, lon: -58.38 },
  { name: "Cairo, Egypt", lat: 30.06, lon: 31.25 },
  { name: "Cape Town, S. Africa", lat: -33.93, lon: 18.42 },
  { name: "Chicago, USA", lat: 41.88, lon: -87.63 },
  { name: "Copenhagen, Denmark", lat: 55.68, lon: 12.57 },
  { name: "Delhi, India", lat: 28.66, lon: 77.23 },
  { name: "Dubai, UAE", lat: 25.20, lon: 55.27 },
  { name: "Dublin, Ireland", lat: 53.33, lon: -6.25 },
  { name: "Frankfurt, Germany", lat: 50.11, lon: 8.68 },
  { name: "Hanoi, Vietnam", lat: 21.03, lon: 105.85 },
  { name: "Ho Chi Minh, Vietnam", lat: 10.82, lon: 106.63 },
  { name: "Hong Kong", lat: 22.32, lon: 114.17 },
  { name: "Istanbul, Turkey", lat: 41.01, lon: 28.96 },
  { name: "Jakarta, Indonesia", lat: -6.21, lon: 106.85 },
  { name: "Johannesburg, S. Africa", lat: -26.20, lon: 28.05 },
  { name: "Karachi, Pakistan", lat: 24.86, lon: 67.01 },
  { name: "Kuala Lumpur, Malaysia", lat: 3.15, lon: 101.69 },
  { name: "Lagos, Nigeria", lat: 6.46, lon: 3.38 },
  { name: "Lima, Peru", lat: -12.04, lon: -77.03 },
  { name: "Lisbon, Portugal", lat: 38.72, lon: -9.14 },
  { name: "London, UK", lat: 51.51, lon: -0.13 },
  { name: "Los Angeles, USA", lat: 34.05, lon: -118.24 },
  { name: "Madrid, Spain", lat: 40.42, lon: -3.70 },
  { name: "Manila, Philippines", lat: 14.60, lon: 120.98 },
  { name: "Melbourne, Australia", lat: -37.81, lon: 144.96 },
  { name: "Mexico City, Mexico", lat: 19.43, lon: -99.13 },
  { name: "Miami, USA", lat: 25.77, lon: -80.19 },
  { name: "Milan, Italy", lat: 45.46, lon: 9.19 },
  { name: "Moscow, Russia", lat: 55.75, lon: 37.62 },
  { name: "Mumbai, India", lat: 19.08, lon: 72.88 },
  { name: "Munich, Germany", lat: 48.14, lon: 11.58 },
  { name: "Nairobi, Kenya", lat: -1.29, lon: 36.82 },
  { name: "New York, USA", lat: 40.71, lon: -74.01 },
  { name: "Oslo, Norway", lat: 59.91, lon: 10.75 },
  { name: "Paris, France", lat: 48.85, lon: 2.35 },
  { name: "Rome, Italy", lat: 41.90, lon: 12.50 },
  { name: "San Francisco, USA", lat: 37.77, lon: -122.42 },
  { name: "Santiago, Chile", lat: -33.46, lon: -70.65 },
  { name: "Seoul, South Korea", lat: 37.57, lon: 126.98 },
  { name: "Shanghai, China", lat: 31.23, lon: 121.47 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Stockholm, Sweden", lat: 59.33, lon: 18.07 },
  { name: "Sydney, Australia", lat: -33.87, lon: 151.21 },
  { name: "Taipei, Taiwan", lat: 25.03, lon: 121.56 },
  { name: "Tehran, Iran", lat: 35.69, lon: 51.42 },
  { name: "Tokyo, Japan", lat: 35.68, lon: 139.69 },
  { name: "Toronto, Canada", lat: 43.65, lon: -79.38 },
  { name: "Vancouver, Canada", lat: 49.25, lon: -123.12 },
  { name: "Vienna, Austria", lat: 48.21, lon: 16.37 },
  { name: "Warsaw, Poland", lat: 52.23, lon: 21.01 },
  { name: "Zurich, Switzerland", lat: 47.38, lon: 8.54 },
];

const WMO_CODES = {
  0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
  45: "Foggy", 48: "Icy Fog", 51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
  61: "Light Rain", 63: "Rain", 65: "Heavy Rain", 71: "Light Snow", 73: "Snow", 75: "Heavy Snow",
  80: "Rain Showers", 81: "Heavy Showers", 95: "Thunderstorm", 99: "Thunderstorm",
};

const COUNTRIES_AND_CITIES = {
  "India": ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane"],
  "United Kingdom": ["London", "Birmingham", "Manchester", "Glasgow", "Newcastle", "Sheffield", "Liverpool", "Leeds", "Bristol", "Belfast", "Edinburgh", "Leicester", "Coventry", "Cardiff", "Nottingham"],
  "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre", "Saint-Étienne", "Toulon"],
  "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Indianapolis", "Seattle"],
  "Japan": ["Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Kobe", "Kyoto", "Fukuoka", "Kawasaki", "Saitama", "Hiroshima", "Sendai", "Chiba", "Kitakyushu", "Nara"],
  "Germany": ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Dortmund", "Essen", "Leipzig", "Bremen", "Dresden", "Hanover", "Nuremberg", "Duisburg"],
  "Italy": ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Bari", "Catania", "Venice", "Verona", "Messina", "Padua", "Trieste"],
  "Spain": ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Malaga", "Murcia", "Palma", "Las Palmas", "Bilbao", "Alicante", "Cordoba", "Valladolid", "Vigo", "Gijon"],
  "Canada": ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener", "London", "Victoria", "Halifax", "Oshawa", "Windsor"],
  "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Newcastle", "Canberra", "Sunshine Coast", "Wollongong", "Hobart", "Geelong", "Townsville", "Cairns", "Darwin"],
  "China": ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Wuhan", "Chongqing", "Hangzhou", "Xi'an", "Nanjing", "Suzhou", "Harbin", "Tianjin", "Dalian", "Qingdao"],
  "Brazil": ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre", "Belém", "Goiânia", "Campinas", "São Luís", "Maceió"],
  "Mexico": ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Toluca", "Tijuana", "León", "Ciudad Juárez", "Torreón", "Querétaro", "San Luis Potosí", "Mérida", "Hermosillo", "Aguascalientes", "Culiacán"],
  "South Africa": ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "East London", "Kimberley", "Polokwane", "Nelspruit", "Pietermaritzburg", "George", "Welkom", "Rustenburg", "Stellenbosch"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain", "Khor Fakkan", "Kalba", "Jebel Ali", "Dibba Al-Fujairah", "Madinat Zayed", "Ruwais", "Hatta"],
  "Singapore": ["Singapore", "Jurong", "Woodlands", "Tampines", "Bedok", "Yishun", "Ang Mo Kio", "Hougang", "Pasir Ris", "Choa Chu Kang", "Toa Payoh", "Bukit Batok", "Queenstown", "Clementi", "Geylang"],
  "Thailand": ["Bangkok", "Nonthaburi", "Pak Kret", "Hat Yai", "Nakhon Ratchasima", "Chiang Mai", "Udon Thani", "Surat Thani", "Khon Kaen", "Pattaya", "Nakhon Si Thammarat", "Phuket", "Lampang", "Trang", "Rayong"],
  "Switzerland": ["Zurich", "Geneva", "Basel", "Lausanne", "Bern", "Winterthur", "Lucerne", "St. Gallen", "Lugano", "Biel/Bienne", "Thun", "Bellinzona", "Köniz", "La Chaux-de-Fonds", "Fribourg"],
  "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg", "Almere", "Groningen", "Breda", "Nijmegen", "Apeldoorn", "Haarlem", "Enschede", "Arnhem", "Zaanstad"],
  "New Zealand": ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga", "Napier-Hastings", "Dunedin", "Palmerston North", "Nelson", "Rotorua", "New Plymouth", "Whangarei", "Invercargill", "Wanganui", "Gisborne"],
  "Turkey": ["Istanbul", "Ankara", "Izmir", "Bursa", "Adana", "Gaziantep", "Konya", "Antalya", "Kayseri", "Mersin", "Eskişehir", "Diyarbakır", "Samsun", "Denizli", "Şanlıurfa"],
  "Egypt": ["Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said", "Suez", "Mansoura", "El Mahalla El Kubra", "Tanta", "Asyut", "Fayoum", "Zagazig", "Ismailia", "Aswan", "Luxor"],
  "Greece": ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa", "Volos", "Rhodes", "Ioannina", "Chania", "Chalkida", "Trikala", "Serres", "Lamia", "Alexandroupoli", "Kozani"],
  "Russia": ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Nizhny Novgorod", "Kazan", "Chelyabinsk", "Omsk", "Samara", "Rostov-on-Don", "Ufa", "Volgograd", "Perm", "Krasnoyarsk", "Voronezh"],
  "South Korea": ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Suwon", "Ulsan", "Yongin", "Changwon", "Seongnam", "Cheongju", "Jeonju", "Cheonan", "Jeju City"],
  "Indonesia": ["Jakarta", "Surabaya", "Bandung", "Bekasi", "Medan", "Tangerang", "Depok", "Semarang", "Palembang", "South Tangerang", "Makassar", "Batam", "Pekanbaru", "Bogor", "Bandar Lampung"],
  "Malaysia": ["Kuala Lumpur", "George Town", "Ipoh", "Johor Bahru", "Malacca City", "Kota Kinabalu", "Kuantan", "Alor Setar", "Kuching", "Kuala Terengganu", "Kota Bharu", "Seremban", "Sungai Petani", "Petaling Jaya", "Shah Alam"],
  "Vietnam": ["Hanoi", "Ho Chi Minh City", "Da Nang", "Haiphong", "Can Tho", "Bien Hoa", "Nha Trang", "Buon Ma Thuot", "Hue", "Thai Nguyen", "Nam Dinh", "Rach Gia", "Quy Nhon", "Vung Tau", "Phan Thiet"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Hofuf", "Taif", "Tabuk", "Jubail", "Buraidah", "Khamis Mushait", "Abha", "Najran", "Yanbu", "Khobar"],
  "Argentina": ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "Tucumán", "La Plata", "Mar del Plata", "Salta", "Santa Fe", "San Juan", "Resistencia", "Neuquén", "Santiago del Estero", "Corrientes", "Bahía Blanca"],
  "Portugal": ["Lisbon", "Porto", "Vila Nova de Gaia", "Amadora", "Braga", "Funchal", "Coimbra", "Setúbal", "Almada", "Queluz", "Aveiro", "Guimarães", "Odivelas", "Viseu", "Faro"],
  "Sweden": ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping", "Lund", "Umeå", "Gävle", "Borås", "Södertälje"],
  "Austria": ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt", "Villach", "Wels", "Sankt Pölten", "Dornbirn", "Wiener Neustadt", "Steyr", "Feldkirch", "Bregenz", "Baden"]
};

const generateDirectoryPlaces = (category, country, city) => {
  const images = {
    embassy: [
      "https://images.unsplash.com/photo-1582998658955-6f4b473e7762?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&q=80",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=300&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80"
    ],
    medical: [
      "https://plus.unsplash.com/premium_photo-1664476911056-ca371bb2a8c5?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&q=80",
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=300&q=80",
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=300&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=300&q=80"
    ],
    chemists: [
      "https://images.unsplash.com/photo-1592639296346-560c37a0f711?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1637261012886-3b64c23c4fb3?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80",
      "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&q=80",
      "https://images.unsplash.com/photo-1631549916768-4119b2e55c26?w=300&q=80"
    ],
    markets: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&q=80",
      "https://plus.unsplash.com/premium_photo-1677534712570-5c6f50ea3703?w=600&auto=format&fit=crop&q=80",
      "https://plus.unsplash.com/premium_photo-1675280735161-febe15d7ffae?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=300&q=80",
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=300&q=80"
    ],
    restaurants: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80"
    ],
    malls: [
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&q=80",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&q=80",
      "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=300&q=80",
      "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=300&q=80",
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&q=80"
    ],
    worship: [
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?w=300&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=300&q=80",
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=300&q=80",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&q=80"
    ],
    veterinary: [
      "https://images.unsplash.com/photo-1612531822798-6e23a5dd5d4c?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&auto=format&fit=crop&q=80"
    ],
    police: [
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1603390075966-1d01f2adde2f?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=300&auto=format&fit=crop&q=80"
    ],
    transport: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&auto=format&fit=crop&q=80"
    ]
  };

  const countryCodes = {
    "India": "+91", "United Kingdom": "+44", "France": "+33", "United States": "+1",
    "Japan": "+81", "Germany": "+49", "Italy": "+39", "Spain": "+34", "Canada": "+1",
    "Australia": "+61", "China": "+86", "Brazil": "+55", "Mexico": "+52",
    "South Africa": "+27", "United Arab Emirates": "+971", "Singapore": "+65",
    "Thailand": "+66", "Switzerland": "+41", "Netherlands": "+31", "New Zealand": "+64",
    "Turkey": "+90", "Egypt": "+20", "Greece": "+30", "Russia": "+7",
    "South Korea": "+82", "Indonesia": "+62", "Malaysia": "+60", "Vietnam": "+84",
    "Saudi Arabia": "+966", "Argentina": "+54", "Portugal": "+351", "Sweden": "+46",
    "Austria": "+43"
  };
  const code = countryCodes[country] || "+1";

  const templates = {
    embassy: [
      { prefix: "Embassy of the United States", suffix: "Chanakya Marg / Consulate Sector" },
      { prefix: "Embassy of the United Kingdom", suffix: "High Commission Compound" },
      { prefix: "Embassy of France", suffix: "Rue de L'Alliance / Diplomatic Enclave" },
      { prefix: "Embassy of India", suffix: "Bharat Bhavan / Consulate District" },
      { prefix: "Embassy of Germany", suffix: "Bundesallee / Diplomatic Office" }
    ],
    medical: [
      { prefix: "General Hospital", suffix: "Main Road, Medical District" },
      { prefix: "Saint Jude Medical Center", suffix: "St. Jude Lane, Downtown" },
      { prefix: "City Care Super Speciality Hospital", suffix: "Metro Crossing, West Wing" },
      { prefix: "Memorial Hospital & Trauma Center", suffix: "Central Parkway" },
      { prefix: "Metro Health Clinic & Emergency Care", suffix: "Station Road, Plaza Level" }
    ],
    chemists: [
      { prefix: "City Center Pharmacy (24/7)", suffix: "Market Square" },
      { prefix: "Walgreens Care Pharmacy", suffix: "High Street Crossing" },
      { prefix: "Wellness Forever Chemists", suffix: "Central Boulevard" },
      { prefix: "Express Medicos & Pharmacy", suffix: "Opposite General Hospital" },
      { prefix: "Care & Cure Health Pharmacy", suffix: "Station Road Corner" }
    ],
    markets: [
      { prefix: "Old Town Heritage Bazaar", suffix: "Historic Center Lane" },
      { prefix: "Central Street Flea Market", suffix: "Main Plaza Walkway" },
      { prefix: "Traditional Crafts & Spice Market", suffix: "South Port District" },
      { prefix: "Night Street Food Bazar", suffix: "Riverfront promenade" },
      { prefix: "The Grand Pavilion Shopping Street", suffix: "Avenue Mall Road" }
    ],
    restaurants: [
      { prefix: "The Local Kitchen & Cafe", suffix: "Gourmet Avenue" },
      { prefix: "Golden Dragon Bistro", suffix: "Chinatown Gate" },
      { prefix: "Bella Italia Ristorante", suffix: "Trattoria Corner" },
      { prefix: "The Royal Oak Steakhouse", suffix: "Heritage Boulevard" },
      { prefix: "Skyline Rooftop Restaurant & Lounge", suffix: "Grand Tower Floor 24" }
    ],
    malls: [
      { prefix: "The Grand Galleria Mall", suffix: "City Plaza Center" },
      { prefix: "Horizon Shopping & Entertainment Hub", suffix: "Express Highway Bypass" },
      { prefix: "Royal Square Plaza & Hanging Out Zone", suffix: "Central District" },
      { prefix: "Metro Promenade Mall", suffix: "Transit Station Level 1" },
      { prefix: "The Landmark Shopping Center", suffix: "Lakeside Drive" }
    ],
    worship: [
      { prefix: "St. Mary's Cathedral & Church", suffix: "Cathedral Square" },
      { prefix: "Central Grand Mosque & Islamic Center", suffix: "Minaret Road" },
      { prefix: "Sri Ganesha Temple Complex", suffix: "Temple Street" },
      { prefix: "Sacred Heart Chapel", suffix: "Highland Meadows" },
      { prefix: "Peace Buddhist Temple & Zen Garden", suffix: "Harmony Hill Side" }
    ],
    veterinary: [
      { prefix: "City Animal Clinic & Pet Care", suffix: "Veterinary Lane, Pet District" },
      { prefix: "PawsCare 24/7 Veterinary Hospital", suffix: "Green Park Road" },
      { prefix: "Metro Animal Hospital & Surgery", suffix: "Station Colony, Ring Road" },
      { prefix: "Happy Paws Vet Clinic", suffix: "Suburb Market Road" },
      { prefix: "CareVet Multispeciality Animal Hospital", suffix: "Central Avenue, Sector 12" }
    ],
    police: [
      { prefix: "Central Police Station", suffix: "Police Headquarters Road" },
      { prefix: "City Police Control Room", suffix: "Civic Center, Zone 1" },
      { prefix: "Tourist Assistance Police Post", suffix: "Main Tourist Area" },
      { prefix: "Traffic Police Station", suffix: "Junction 5, Ring Road" },
      { prefix: "Local District Police Station", suffix: "Sector 3, Administrative Block" }
    ],
    transport: [
      { prefix: "Central Bus Terminal", suffix: "Bus Stand Road, City Center" },
      { prefix: "Metro Rail Station (Main Line)", suffix: "Underground, Platform 1" },
      { prefix: "City Taxi & Auto Stand", suffix: "Market Square, Zone A" },
      { prefix: "Local Train Station", suffix: "Railway Colony, Platform 2" },
      { prefix: "Intercity Coach & Travel Hub", suffix: "Highway Bypass, Sector 6" }
    ]
  };

  const currentCatTemplates = templates[category] || templates.medical;
  const currentImages = images[category] || images.medical;

  return currentCatTemplates.map((item, idx) => {
    let name = "";
    if (category === "embassy") {
      name = `${item.prefix} in ${city}`;
    } else if (category === "medical" || category === "chemists" || category === "markets" || category === "malls") {
      name = `${city} ${item.prefix}`;
    } else if (category === "restaurants") {
      name = `${item.prefix} (${city} Branch)`;
    } else if (category === "veterinary") {
      name = `${city} ${item.prefix}`;
    } else if (category === "police") {
      name = `${city} ${item.prefix}`;
    } else if (category === "transport") {
      name = `${city} ${item.prefix}`;
    } else {
      name = `${item.prefix} - ${city}`;
    }

    const randomDigits = String(1000000 + (city.charCodeAt(0) * 123 + idx * 7899) % 9000000);
    const phone = `${code} ${randomDigits.substring(0, 3)}-${randomDigits.substring(3, 7)}`;
    const address = `${10 + idx * 12}, ${item.suffix}, ${city}, ${country}`;
    const mapQuery = `${name}, ${city}, ${country}`;
    const image = currentImages[idx % currentImages.length];

    return { name, phone, address, image, mapQuery };
  });
};

const getPlacesForCategory = (country, city, category) => {
  const customList = HELPLINES_DATA[country]?.[city]?.[category] || [];
  const generatedList = generateDirectoryPlaces(category, country, city);
  const combined = [...customList];
  for (const item of generatedList) {
    if (combined.length >= 5) break;
    if (!combined.some(c => c.name.toLowerCase() === item.name.toLowerCase())) {
      combined.push(item);
    }
  }
  return combined;
};

const HELPLINES_DATA = {
  "India": {
    "Delhi": {
      embassy: [
        { name: "US Embassy", phone: "011-2419-8000", address: "Chanakyapuri, New Delhi", image: "https://images.unsplash.com/photo-1618456623211-438e221e654d?w=600&auto=format&fit=crop&q=80", mapQuery: "US Embassy, New Delhi" },
        { name: "UK Embassy", phone: "011-2419-2100", address: "Chanakyapuri, New Delhi", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&q=80", mapQuery: "British High Commission, New Delhi" }
      ],
      medical: [
        { name: "AIIMS Hospital", phone: "011-2658-8500", address: "Ansari Nagar, New Delhi", image: "https://plus.unsplash.com/premium_photo-1664476911056-ca371bb2a8c5?w=600&auto=format&fit=crop&q=80", mapQuery: "AIIMS Hospital, New Delhi" },
        { name: "Max Hospital, Saket", phone: "011-2651-5050", address: "Saket, New Delhi", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&q=80", mapQuery: "Max Hospital, Saket, New Delhi" }
      ],
      chemists: [
        { name: "Apollo Pharmacy (24/7)", phone: "1860-500-0101", address: "Connaught Place, New Delhi", image: "https://images.unsplash.com/photo-1619975101918-6d27886e8c6a?w=600&auto=format&fit=crop&q=80", mapQuery: "Apollo Pharmacy, Connaught Place, New Delhi" }
      ],
      markets: [
        { name: "Chandni Chowk", phone: "N/A", address: "Old Delhi", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&q=80", mapQuery: "Chandni Chowk, Delhi" },
        { name: "Delhi Haat INA", phone: "011-2611-9055", address: "INA, Kidwai Nagar, Delhi", image: "https://images.unsplash.com/photo-1769634306787-7f2fff1cca7d?w=600&auto=format&fit=crop&q=80", mapQuery: "Dilli Haat INA, Delhi" }
      ],
      restaurants: [
        { name: "Karim's Restaurant", phone: "011-2326-9880", address: "Jama Masjid, Old Delhi", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80", mapQuery: "Karims, Jama Masjid, Delhi" }
      ],
      malls: [
        { name: "Select CITYWALK", phone: "011-4211-4200", address: "Saket District Centre, Delhi", image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&q=80", mapQuery: "Select CITYWALK, Saket, Delhi" }
      ],
      worship: [
        { name: "Gurudwara Bangla Sahib", phone: "011-2334-0177", address: "Hanuman Road Area, Connaught Place, Delhi", image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=300&q=80", mapQuery: "Gurudwara Bangla Sahib, Delhi" }
      ]
    },
    "Mumbai": {
      embassy: [
        { name: "US Consulate General", phone: "022-2672-4000", address: "Bandra Kurla Complex, Mumbai", image: "https://images.unsplash.com/photo-1541829017-646f45a55257?w=300&q=80", mapQuery: "US Consulate General, Mumbai" }
      ],
      medical: [
        { name: "Lilavati Hospital", phone: "022-2675-1000", address: "Bandra Reclamation, Mumbai", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&q=80", mapQuery: "Lilavati Hospital, Mumbai" }
      ],
      chemists: [
        { name: "Wellness Forever (24/7)", phone: "022-6600-1000", address: "Bandra West, Mumbai", image: "https://images.unsplash.com/photo-1592639296346-560c37a0f711?w=600&auto=format&fit=crop&q=80", mapQuery: "Wellness Forever, Bandra West, Mumbai" }
      ],
      markets: [
        { name: "Colaba Causeway Market", phone: "N/A", address: "Colaba, Mumbai", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&q=80", mapQuery: "Colaba Causeway, Mumbai" }
      ],
      restaurants: [
        { name: "The Table Colaba", phone: "022-2282-5000", address: "Colaba, Mumbai", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300&q=80", mapQuery: "The Table Restaurant, Colaba, Mumbai" }
      ],
      malls: [
        { name: "Phoenix Palladium Mall", phone: "022-6615-0200", address: "Lower Parel, Mumbai", image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&q=80", mapQuery: "Phoenix Palladium Mall, Mumbai" }
      ],
      worship: [
        { name: "Siddhivinayak Temple", phone: "022-2437-3626", address: "Prabhadevi, Mumbai", image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=300&q=80", mapQuery: "Siddhivinayak Temple, Mumbai" }
      ]
    }
  },
  "United Kingdom": {
    "London": {
      embassy: [
        { name: "Indian High Commission", phone: "+44 20-7836-8484", address: "Aldwych, London WC2B 4NA", image: "https://images.unsplash.com/photo-1541829017-646f45a55257?w=300&q=80", mapQuery: "Indian High Commission, London" }
      ],
      medical: [
        { name: "St Thomas' Hospital", phone: "+44 20-7188-7188", address: "Westminster Bridge Rd, London", image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce2?w=300&q=80", mapQuery: "St Thomas Hospital, London" }
      ],
      chemists: [
        { name: "Boots Pharmacy 24/7", phone: "+44 20-7409-7373", address: "Piccadilly Circus, London", image: "https://images.unsplash.com/photo-1607619275048-24722480f875?w=300&q=80", mapQuery: "Boots Pharmacy Piccadilly, London" }
      ],
      markets: [
        { name: "Borough Market", phone: "N/A", address: "Southwark St, London SE1 9AL", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&q=80", mapQuery: "Borough Market, London" }
      ],
      restaurants: [
        { name: "The Ledbury", phone: "+44 20-7792-9090", address: "Ledbury Rd, Notting Hill, London", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300&q=80", mapQuery: "The Ledbury Restaurant, London" }
      ],
      malls: [
        { name: "Westfield London", phone: "+44 20-3371-2300", address: "Ariel Way, London W12 7GF", image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&q=80", mapQuery: "Westfield London Mall" }
      ],
      worship: [
        { name: "Westminster Abbey", phone: "+44 20-7222-5152", address: "20 Deans Yd, London SW1P 3PA", image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?w=300&q=80", mapQuery: "Westminster Abbey, London" }
      ]
    }
  },
  "France": {
    "Paris": {
      embassy: [
        { name: "Indian Embassy, Paris", phone: "+33 1-40-50-70-70", address: "15 Rue Alfred Dehodencq, Paris", image: "https://images.unsplash.com/photo-1541829017-646f45a55257?w=300&q=80", mapQuery: "Embassy of India, Paris" }
      ],
      medical: [
        { name: "Hôpital Necker", phone: "+33 1-44-49-40-00", address: "149 Rue de Sèvres, 75015 Paris", image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce2?w=300&q=80", mapQuery: "Hopital Necker, Paris" }
      ],
      chemists: [
        { name: "Pharmacie de la Bastille (24/7)", phone: "+33 1-43-43-81-00", address: "6 Boulevard Richard-Lenoir, Paris", image: "https://images.unsplash.com/photo-1607619275048-24722480f875?w=300&q=80", mapQuery: "Pharmacie de la Bastille, Paris" }
      ],
      markets: [
        { name: "Marché d'Aligre", phone: "N/A", address: "Rue d'Aligre, 75012 Paris", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&q=80", mapQuery: "Marche d'Aligre, Paris" }
      ],
      restaurants: [
        { name: "L'Ambroisie", phone: "+33 1-42-78-51-45", address: "9 Place des Vosges, 75004 Paris", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300&q=80", mapQuery: "L Ambroisie Restaurant, Paris" }
      ],
      malls: [
        { name: "Forum des Halles", phone: "+33 1-44-76-96-56", address: "101 Porte Berger, 75001 Paris", image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&q=80", mapQuery: "Forum des Halles, Paris" }
      ],
      worship: [
        { name: "Sacré-Cœur Basilica", phone: "+33 1-53-41-89-00", address: "35 Rue du Chevalier de la Barre, Paris", image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?w=300&q=80", mapQuery: "Sacre Coeur, Paris" }
      ]
    }
  }
};

const TravelTools = () => {
  const [unit, setUnit] = useState("C");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1000);
  const [date, setDate] = useState("");

  // Weather state
  const [selectedCountryIdx, setSelectedCountryIdx] = useState(30);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [citySearch, setCitySearch] = useState("Los Angeles, USA");
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const filteredCities = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  const selectCity = (idx) => {
    setSelectedCountryIdx(idx);
    setCitySearch(COUNTRIES[idx].name);
    setShowCityDropdown(false);
  };

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  // Helpline states
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [selectedCategory, setSelectedCategory] = useState("embassy");
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Automatically update the selected city when country changes
  useEffect(() => {
    const cities = COUNTRIES_AND_CITIES[selectedCountry] || [];
    if (cities.length > 0) {
      setSelectedCity(cities[0]);
    }
  }, [selectedCountry]);

  // Update selected place when category/city changes
  useEffect(() => {
    const places = getPlacesForCategory(selectedCountry, selectedCity, selectedCategory);
    if (places.length > 0) {
      setSelectedPlace(places[0]);
    } else {
      setSelectedPlace(null);
    }
  }, [selectedCountry, selectedCity, selectedCategory]);

  useEffect(() => {
    const fetchWeather = async () => {
      setWeatherLoading(true);
      try {
        const { lat, lon } = COUNTRIES[selectedCountryIdx];
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m,precipitation,relativehumidity_2m&timezone=auto`
        );
        const data = await res.json();
        const c = data.current;
        setWeather({
          tempC: Math.round(c.temperature_2m),
          tempF: Math.round(c.temperature_2m * 9 / 5 + 32),
          windspeed: Math.round(c.windspeed_10m),
          precipitation: c.precipitation,
          humidity: c.relativehumidity_2m,
          description: WMO_CODES[c.weathercode] || "Clear",
          isSunny: [0, 1].includes(c.weathercode),
          time: new Date().toLocaleString("en-US", { weekday: "long", hour: "numeric", minute: "2-digit", hour12: true }),
        });
      } catch (e) {
        setWeather(null);
      } finally {
        setWeatherLoading(false);
      }
    };
    fetchWeather();
  }, [selectedCountryIdx]);

  const rates = { USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12, JPY: 150.45, AED: 3.67, AUD: 1.53, CAD: 1.36 };
  const calculatedAmount = amount && !isNaN(amount) ? ((amount / rates[fromCurrency]) * rates[toCurrency]).toFixed(2) : "0.00";

  const getFlagCode = (currency) => {
    const map = { USD: 'us', EUR: 'eu', GBP: 'gb', INR: 'in', JPY: 'jp', AED: 'ae', AUD: 'au', CAD: 'ca' };
    return map[currency] || 'us';
  };


  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20 pb-4 px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto">
        {/* Back Link */}
        <Link to="/main" className="flex items-center gap-2 text-gray-800 font-medium mb-5 hover:text-[#0093CB] transition-colors w-fit">
          <MdArrowBack size={18} />
          <span className="text-sm">Back to My Account</span>
        </Link>

        {/* Heading */}
        <h1 className="text-xl md:text-3xl font-black tracking-tight mb-4">Travel Tools</h1>
      </main>

      {/* Banner Section - edge-to-edge */}
      <div className="w-full">
        <img
          src="/menuLogo/Frame 1052.svg"
          alt="Travel Tools Banner"
          className="w-full h-auto block"
        />
      </div>

      {/* Spacer between sections */}
      <div className="h-12 md:h-16 bg-white" />

      {/* Second Section - Interactive Currency Converter */}
      <div className="w-full relative overflow-hidden">
        {/* Invisible image forces exact same section size and aspect ratio as before */}
        <img
          src="/menuLogo/Frame 1051.svg"
          alt="Spacer"
          className="w-full h-auto block opacity-0 pointer-events-none"
        />

        {/* Right side image background (simulating the right half of Frame 1051.svg) */}
        <div className="absolute inset-y-0 right-0 w-1/2 h-full pointer-events-none">
          <img
            src="/menuLogo/Frame 1051.svg"
            alt="Travel Tools Converter Background"
            className="w-full h-full object-cover object-right"
          />
        </div>

        {/* Functional Overlay - sized to cover the left mock form */}
        <div className="absolute inset-0 max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-12 flex items-center z-10 py-2 sm:py-4">
          <div className="w-full md:w-[54%] lg:w-[48%] bg-white rounded-3xl p-3 sm:p-4 shadow-none border border-transparent">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-0.5">Currency Converter</h3>
            <div className="flex justify-between items-center mb-2 gap-2">
              <p className="text-xs sm:text-sm text-gray-700 font-medium">Check live interbank rates instantly.</p>
              <a
                href={`https://www.oanda.com/currency-converter/en/?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] sm:text-[10px] font-bold text-white bg-[#007CAD] hover:bg-[#005F8A] px-2 py-1 rounded-md transition-colors whitespace-nowrap shadow-sm"
              >
                More Info ↗
              </a>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              {/* Amount */}
              <div>
                <label className="block text-[9px] sm:text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1 ml-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-7 pr-3 py-2 text-gray-900 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#007CAD] focus:border-transparent transition-all shadow-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* From/To Selects */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-full flex-1">
                  <label className="block text-[9px] sm:text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1 ml-1">From</label>
                  <div className="relative">
                    <img
                      src={`https://flagcdn.com/w20/${getFlagCode(fromCurrency)}.png`}
                      alt="flag"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] rounded-[2px] pointer-events-none shadow-sm"
                    />
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-gray-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#007CAD] focus:border-transparent transition-all shadow-sm cursor-pointer"
                    >
                      <option value="USD">USD - United States</option>
                      <option value="EUR">EUR - Europe</option>
                      <option value="GBP">GBP - United Kingdom</option>
                      <option value="INR">INR - India</option>
                      <option value="JPY">JPY - Japan</option>
                      <option value="AED">AED - UAE</option>
                      <option value="AUD">AUD - Australia</option>
                      <option value="CAD">CAD - Canada</option>
                    </select>
                  </div>
                </div>

                <div className="flex-shrink-0 mt-1 sm:mt-5">
                  <button
                    onClick={() => { const temp = fromCurrency; setFromCurrency(toCurrency); setToCurrency(temp); }}
                    className="w-8 h-8 rounded-full bg-[#007CAD]/5 border border-[#007CAD]/10 text-[#007CAD] flex items-center justify-center hover:bg-[#007CAD] hover:text-white transition-all shadow-sm active:scale-90 group"
                  >
                    <MdSwapHoriz size={18} className="group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                </div>

                <div className="w-full flex-1">
                  <label className="block text-[9px] sm:text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1 ml-1">To</label>
                  <div className="relative">
                    <img
                      src={`https://flagcdn.com/w20/${getFlagCode(toCurrency)}.png`}
                      alt="flag"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] rounded-[2px] pointer-events-none shadow-sm"
                    />
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-gray-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#007CAD] focus:border-transparent transition-all shadow-sm cursor-pointer"
                    >
                      <option value="USD">USD - United States</option>
                      <option value="EUR">EUR - Europe</option>
                      <option value="GBP">GBP - United Kingdom</option>
                      <option value="INR">INR - India</option>
                      <option value="JPY">JPY - Japan</option>
                      <option value="AED">AED - UAE</option>
                      <option value="AUD">AUD - Australia</option>
                      <option value="CAD">CAD - Canada</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-[9px] sm:text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1 ml-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#007CAD] focus:border-transparent transition-all shadow-sm cursor-pointer"
                />
              </div>

              {/* Rate Preview */}
              <div className="bg-gradient-to-br from-[#007CAD]/10 to-[#005F8A]/5 border border-[#007CAD]/20 rounded-xl p-3 mt-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] sm:text-[10px] font-extrabold text-[#007CAD] uppercase tracking-widest">Interbank Rate</span>
                  <span className="bg-white/60 text-[#007CAD] text-[9px] font-bold px-2 py-0.5 rounded-full">Live preview</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-gray-700 truncate">
                  {amount} {fromCurrency} = <span className="text-[#007CAD]">{calculatedAmount}</span> {toCurrency}
                </div>
                <p className="text-[9px] text-gray-500 mt-1 font-medium">1 {fromCurrency} = {((1 / rates[fromCurrency]) * rates[toCurrency]).toFixed(4)} {toCurrency} • Rates are for informational purposes only.</p>
              </div>

              <button className="w-full bg-gradient-to-r from-[#00A1C2] to-[#007CAD] hover:from-[#0096B9] hover:to-[#005f8a] text-white font-black rounded-xl py-2.5 shadow-md shadow-[#007CAD]/25 hover:shadow-lg hover:shadow-[#007CAD]/40 transition-all active:scale-[0.98] uppercase tracking-widest text-[10px] sm:text-xs mt-1">
                Convert Currency
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer between converter and weather sections */}
      <div className="h-12 md:h-16 bg-white" />

      {/* Weather Update Section */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
            Weather update
          </h2>
          <div className="relative w-full sm:w-[260px]">
            <input
              type="text"
              value={citySearch}
              onChange={(e) => { setCitySearch(e.target.value); setShowCityDropdown(true); }}
              onFocus={() => setShowCityDropdown(true)}
              onBlur={() => setTimeout(() => setShowCityDropdown(false), 150)}
              placeholder="Search city..."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#007CAD] focus:border-transparent shadow-sm"
            />
            {showCityDropdown && filteredCities.length > 0 && (
              <ul className="absolute z-50 top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl max-h-56 overflow-y-auto">
                {filteredCities.map((c) => {
                  const idx = COUNTRIES.indexOf(c);
                  return (
                    <li
                      key={idx}
                      onMouseDown={() => selectCity(idx)}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#007CAD]/10 transition-colors ${idx === selectedCountryIdx ? "bg-[#007CAD]/10 font-bold text-[#007CAD]" : "text-gray-700"
                        }`}
                    >
                      {c.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-4 md:gap-5">
          {/* Box 1: Los Angeles Current Weather (Rectangle 31.svg with text overlay, responsive aspect ratio for text fit) */}
          <div className="relative rounded-[16px] overflow-hidden w-full text-white bg-[#1E1E1E] aspect-[1.35] sm:aspect-[1.8] lg:aspect-[2.3]">
            {/* Background Image */}
            <img
              src="/carrentallogo/Rectangle 31.svg"
              alt="Weather Background"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/75" />

            {/* Content */}
            <div className="absolute inset-0 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 flex flex-col justify-between select-none">
              {/* Top Section */}
              <div className="flex justify-between">
                {/* Left */}
                <div>
                  <p className="text-[12px] sm:text-[14px] text-gray-300">
                    Results for{" "}
                    <span className="font-semibold text-white">
                      {COUNTRIES[selectedCountryIdx].name}
                    </span>
                  </p>

                  <div className="flex items-center gap-3 sm:gap-4 mt-2">
                    {/* Sun / Cloud icon */}
                    {weather?.isSunny
                      ? <div className="w-[28px] h-[28px] sm:w-[37px] sm:h-[37px] bg-[#F4D000] rounded-full" />
                      : <div className="w-[28px] h-[28px] sm:w-[37px] sm:h-[37px] bg-gray-400 rounded-full opacity-80" />
                    }

                    {/* Temperature */}
                    <div className="flex items-center">
                      <h2 className="text-[36px] sm:text-[22px] md:text-[44px] md:text-[26px] md:text-[52px] font-light leading-none tracking-tight">
                        {weatherLoading ? "--" : weather ? (unit === "C" ? weather.tempC : weather.tempF) : "--"}
                      </h2>

                      <div className="ml-2 sm:ml-3 text-[18px] sm:text-[24px] text-gray-300">
                        <button
                          onClick={() => setUnit("C")}
                          className={`hover:text-white transition-colors ${unit === "C" ? "text-white font-bold" : "text-gray-400"}`}
                        >
                          °C
                        </button>
                        <span className="mx-1.5 sm:mx-2">|</span>
                        <button
                          onClick={() => setUnit("F")}
                          className={`hover:text-white transition-colors ${unit === "F" ? "text-white font-bold" : "text-gray-400"}`}
                        >
                          °F
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="text-right mt-4 sm:mt-8">
                  <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-bold leading-none">
                    Weather
                  </h3>
                  <p className="text-[13px] sm:text-[16px] md:text-[18px] text-gray-200 mt-2 sm:mt-4">
                    {weather ? weather.time : "--"}
                  </p>
                  <p className="text-[13px] sm:text-[16px] md:text-[18px] text-gray-200">
                    {weather ? weather.description : "--"}
                  </p>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="text-[10px] sm:text-xs text-gray-200 leading-5 sm:leading-6">
                <p>Precipitation: {weather ? `${weather.precipitation} mm` : "--"}</p>
                <p>Humidity: {weather ? `${weather.humidity}%` : "--"}</p>
                <p>Wind: {weather ? `${weather.windspeed} km/h` : "--"}</p>
              </div>
            </div>
          </div>

          {/* Box 2: Others Countries (Frame 6.svg, aspect ratio 2.0) */}
          <div className="relative rounded-[16px] overflow-hidden w-full bg-[#1E1E1E] aspect-[786/394]">
            <img
              src="/carrentallogo/Frame 6.svg"
              className="absolute inset-0 w-full h-full object-contain"
              alt="Others Countries Forecast"
            />
          </div>

          {/* Box 3: Today's Highlight (Frame 5.svg, aspect ratio 2.5 to match 1.15x column ratio) */}
          <div className="relative rounded-[16px] overflow-hidden w-full bg-[#1E1E1E] aspect-[2.5]">
            <img
              src="/carrentallogo/Frame 5.svg"
              className="absolute inset-0 w-full h-full object-contain"
              alt="Today's Highlights"
            />
          </div>

          {/* Box 4: 10 Day Forecast (Frame 7.svg, aspect ratio 2.18) */}
          <div className="relative rounded-[16px] overflow-hidden w-full bg-[#1E1E1E] aspect-[786/361]">
            <img
              src="/carrentallogo/Frame 7.svg"
              className="absolute inset-0 w-full h-full object-contain"
              alt="10 Day Forecast"
            />
          </div>
        </div>
      </div>

      {/* Travel Insurance Section */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-6 text-[#1A1A1A]">
          Travel Insurance
        </h2>
        <div className="relative w-full rounded-[16px] overflow-hidden bg-[#2B9CB6] h-[260px] sm:h-[320px] md:h-auto md:aspect-[1760/444] shadow-sm select-none">
          {/* Background image */}
          <img
            src="/menuLogo/Rectangle 131.svg"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Travel Insurance Background"
          />

          {/* Left Illustration */}
          <img
            src="/menuLogo/image 1.svg"
            className="absolute left-0 bottom-0 h-full w-auto object-contain hidden md:block"
            alt="Traveler Graphic Left"
          />

          {/* Right Illustration */}
          <img
            src="/menuLogo/image 2.svg"
            className="absolute right-0 bottom-0 h-full w-auto object-contain hidden md:block"
            alt="Traveler Graphic Right"
          />

          {/* Centered Content Stack */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 p-4 md:p-8 z-10 text-center">
            <img
              src="/menuLogo/Secure Your Journey with Smart Travel Insurance!.svg"
              className="w-[85%] max-w-[650px] h-auto object-contain"
              alt="Secure Your Journey with Smart Travel Insurance!"
            />
            <p className="text-white text-xs sm:text-sm md:text-base font-semibold max-w-[720px] leading-relaxed px-4 opacity-95">
              Travel with confidence knowing you're protected against unexpected events like trip cancellations, medical emergencies, and lost baggage. Get the best coverage tailored to your needs and enjoy a worry-free adventure!
            </p>
            <a
              href="https://travel.policybazaar.com/?pb_source=google&pb_medium=cpc&pb_term=Travel%20insurance&pb_campaign=Travel_Insurance_Exact_Desktop00Travel_Insurance&gad_source=1&gad_campaignid=605928938&gbraid=0AAAAAD65DbA2pM-UIDO03QrlyZK1wBpnr&gclid=Cj0KCQjwo_PRBhDNARIsAEcVALWw1iLY7O0qQ4peeTz6vCnqYIc2vMB8kEhhECvvFBTu8RbPvWutk58aAttOEALw_wcB"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 md:mt-2 px-8 py-2.5 bg-[#7FB3C2] hover:bg-[#6FA3B2] active:bg-[#5E93A2] text-white font-semibold rounded-[8px] transition-colors duration-200 text-sm md:text-base shadow-sm inline-block"
            >
              Apply
            </a>
          </div>
        </div>
      </div>




      {/* Spacer before Visa & Passport section */}
      <div className="h-10 md:h-16 bg-white" />

      {/* Visa and Passport Section */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* Left: Text Content */}
          <div className="flex-1 w-full">
            <Link to="/visa-passport" className="group block w-fit">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#1A1A1A] mb-4 hover:text-[#0093CB] transition-colors cursor-pointer flex items-center gap-2">
                Visa and Passport
                <span className="text-gray-400 group-hover:text-[#0093CB] group-hover:translate-x-1 transition-all text-xl sm:text-2xl font-normal">&rarr;</span>
              </h2>
            </Link>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
              Easily check visa requirements, apply for visas, and get passport-related services—all
              in one place. Our AI-powered system helps you navigate the process smoothly, saving
              you time and effort. Whether you're planning an international trip or need passport
              renewal, we've got you covered!
              <br /><br />
              <span className="block pl-5">· Visa eligibility check for any country</span>
              <span className="block pl-5">· Online visa application assistance</span>
              <span className="block pl-5">· Passport renewal and new passport guidance</span>
              <span className="block pl-5">· Real-time tracking &amp; instant updates</span>
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.easemytrip.com/visa-booking/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center w-36 px-5 py-1.5 border border-[#0093CB] text-[#0093CB] font-semibold rounded-[8px] hover:bg-[#0093CB] hover:text-white transition-colors duration-200 text-sm sm:text-base"
              >
                Visa
              </a>

              <a
                href="https://www.passportindia.gov.in/psp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center w-36 px-5 py-1.5 border border-[#0093CB] text-[#0093CB] font-semibold rounded-[8px] hover:bg-[#0093CB] hover:text-white transition-colors duration-200 text-sm sm:text-base"
              >
                Passport
              </a>
            </div>


          </div>

          {/* Right: Passport Image */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div
              className="relative w-full overflow-hidden"
              style={{ borderRadius: "10px", aspectRatio: "870/469" }}
            >
              <img
                src="https://images.pexels.com/photos/7009473/pexels-photo-7009473.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Visa and Passport"
                className="w-full h-full object-cover object-center"
              />
              {/* Low-opacity text overlay at top */}
              <div className="absolute top-0 left-0 right-0 px-6 pt-5 text-center" style={{ opacity: 0.4 }}>
                <p className="text-white font-bold text-[18px] sm:text-xl md:text-2xl leading-snug select-none">
                  Visa &amp; Passport Assistance –<br />
                  Simplifying Your Travel Documents!
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Spacer before ForeX Card section */}
      <div className="h-12 md:h-16 bg-white" />

      {/* ForeX Card Section */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* Left: Text Content */}
          <div className="flex-1 w-full">
            <Link to="/forex-card" className="group block w-fit">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#1A1A1A] mb-4 hover:text-[#0093CB] transition-colors cursor-pointer flex items-center gap-2">
                ForeX Card
                <span className="text-gray-400 group-hover:text-[#0093CB] group-hover:translate-x-1 transition-all text-xl sm:text-2xl font-normal">&rarr;</span>
              </h2>
            </Link>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
              A forex card (or travel card) is a prepaid card used for international travel that allows you to load and hold multiple foreign currencies. It shields your travel budget from sudden market fluctuations by locking in exchange rates at the time of loading and helps you avoid the high markups typically charged by standard credit or debit cards.
              <br /><br />
              <span className="block pl-5">· Multi-currency support for convenient global spending</span>
              <span className="block pl-5">· Locked-in exchange rates to shield from volatility</span>
              <span className="block pl-5">· Safe, secure, and widely accepted worldwide</span>
              <span className="block pl-5">· Easy reloading &amp; tracking on the go</span>
            </p>
            <a
              href="https://www.hdfc.bank.in/forex-cards"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-1.5 border border-[#0093CB] text-[#0093CB] font-semibold rounded-[8px] hover:bg-[#0093CB] hover:text-white transition-colors duration-200 text-sm sm:text-base text-center"
            >
              Get Started
            </a>
          </div>

          {/* Right: ForeX Card Image */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div
              className="relative w-full overflow-hidden"
              style={{ borderRadius: "10px", aspectRatio: "870/469" }}
            >
              <img
                src="https://www.extravelmoney.com/blog/wp-content/uploads/2025/01/HDFC-Forex-card-cover-image.jpg"
                alt="ForeX Card"
                className="w-full h-full object-cover object-center"
              />
              {/* Low-opacity text overlay at top */}
              <div className="absolute top-0 left-0 right-0 px-6 pt-5 text-center" style={{ opacity: 0.4 }}>
                <p className="text-white font-bold text-[18px] sm:text-xl md:text-2xl leading-snug select-none">
                  HDFC Forex Cards –<br />
                  Your Smart Travel Wallet!
                </p>
              </div>
            </div>
          </div>``

        </div>
      </div>

      {/* Dynamic Helpline and Places Directory Finder */}
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-[35px] md:px-[70px] pb-10">
        <div className="w-full bg-[#F8FCFD] rounded-[24px] border border-[#E1F3F7] p-6 sm:p-10 shadow-sm max-w-[1360px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tight">
              Nearby Services & Helplines Finder
            </h2>
            <p className="text-gray-500 font-medium text-sm sm:text-base max-w-[800px]">
              Select your destination country and city to find nearby embassies, hospital helplines, pharmacies, shopping districts, dining, and worship places. Click on any place to locate it live on the interactive map.
            </p>
          </div>

          {/* Selectors Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {/* Country Selector */}
            <div className="flex flex-col">
              <label htmlFor="helpline-country" className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                Select Country
              </label>
              <select
                id="helpline-country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full h-11 px-4 border border-gray-200 rounded-[10px] bg-white text-gray-800 font-semibold focus:outline-none focus:border-[#0093CB] focus:ring-1 focus:ring-[#0093CB] transition-all cursor-pointer shadow-sm text-sm"
              >
                {Object.keys(COUNTRIES_AND_CITIES).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* City Selector */}
            <div className="flex flex-col">
              <label htmlFor="helpline-city" className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                Select City
              </label>
              <select
                id="helpline-city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full h-11 px-4 border border-gray-200 rounded-[10px] bg-white text-gray-800 font-semibold focus:outline-none focus:border-[#0093CB] focus:ring-1 focus:ring-[#0093CB] transition-all cursor-pointer shadow-sm text-sm"
              >
                {(COUNTRIES_AND_CITIES[selectedCountry] || []).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Injecting scrollbar hide styles */}
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          {/* Category Tabs Scroll Wrapper */}
          <div
            className="flex overflow-x-auto gap-2 border-b border-gray-100 pb-3 mb-8 scrollbar-hide"
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {[
              { id: "embassy", label: "🏛️ Nearby Embassy" },
              { id: "medical", label: "🏥 Hospitals & Medical" },
              { id: "chemists", label: "💊 Chemists & Pharmacy" },
              { id: "markets", label: "🛍️ Local Markets" },
              { id: "restaurants", label: "🍽️ Famous Restaurants" },
              { id: "malls", label: "🏬 Malls & Hanging Out" },
              { id: "worship", label: "🕌 Worship Places" },
              { id: "veterinary", label: "🐾 Nearby Veterinary" },
              { id: "police", label: "🚔 Police Station" },
              { id: "transport", label: "🚌 Local Transport" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 text-xs sm:text-sm font-bold border rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${selectedCategory === cat.id
                  ? "border-gray-800 text-gray-900 bg-gray-50/50 shadow-sm"
                  : "border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 bg-white"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid Content Split: Listings and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left side: Listings */}
            <div className="lg:col-span-6 flex flex-col gap-4 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin">
              {(() => {
                const list = getPlacesForCategory(selectedCountry, selectedCity, selectedCategory);
                if (list.length === 0) {
                  return (
                    <div className="text-center py-12 text-gray-400 font-semibold bg-white rounded-xl border border-gray-100 p-6">
                      No nearby services listed for this category.
                    </div>
                  );
                }
                return list.map((place, idx) => {
                  const isSelected = selectedPlace?.name === place.name;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedPlace(place)}
                      className={`flex gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer bg-white shadow-sm hover:shadow-md hover:scale-[1.01] ${isSelected
                        ? "border-[#0093CB] bg-[#F4FBFD]"
                        : "border-gray-100 hover:border-[#0093CB]/30"
                        }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 shadow-sm border border-gray-50">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content details */}
                      <div className="flex-grow flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="font-bold text-gray-800 text-xs sm:text-sm md:text-base leading-snug truncate">
                            {place.name}
                          </h4>
                          <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-400 font-medium mt-0.5 leading-snug truncate">
                            📍 {place.address}
                          </p>
                        </div>

                        {/* Phone and Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mt-1.5">
                          <span className="text-[10px] sm:text-[11px] md:text-xs font-bold text-[#0093CB] truncate max-w-[130px] sm:max-w-none">
                            📞 Helpline: {place.phone}
                          </span>

                          <div className="flex gap-1.5">
                            {place.phone !== "N/A" && (
                              <a
                                href={`tel:${place.phone}`}
                                onClick={(e) => e.stopPropagation()}
                                className="px-2.5 py-1 border border-gray-200 text-gray-600 hover:border-[#0093CB] hover:text-[#0093CB] transition rounded-md text-[9px] sm:text-[10px] font-bold"
                              >
                                Call
                              </a>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPlace(place);
                              }}
                              className="px-2.5 py-1 bg-[#0093CB] hover:bg-[#007ba8] text-white transition rounded-md text-[9px] sm:text-[10px] font-bold cursor-pointer"
                            >
                              Map View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Right side: Interactive Map */}
            <div className="lg:col-span-6 w-full h-[320px] lg:h-[460px] rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white p-2">
              {selectedPlace ? (
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    selectedPlace.mapQuery
                  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "8px" }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Helpline Location Map"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 text-gray-400 bg-gray-50 rounded-lg">
                  <span className="text-3xl mb-2">📍</span>
                  <p className="font-semibold text-sm">Select a place to load the interactive map</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ContactFooter />
      <Footer />
    </div>
  );
};

export default TravelTools;

