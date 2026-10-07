import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './screens/user/Landing';
import Signup from './screens/user/Signup';
import Signin from './screens/user/Login';
import RequestPasswordReset from './screens/user/RequestPasswordReset';
import Welcome from './screens/user/Welcome';
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';
import TravelAIChat from './screens/user/TravelAIChat';
import Main from './screens/user/main/main';
import Destination from './screens/user/destination/[id]';
import CarRental from './screens/user/main/CarRental';
import TrendingDestinations from './screens/user/main/TrendingDestinations';
import SeasonalOffers from './screens/user/main/SeasonalOffers';
import OfferDetail from './screens/user/main/OfferDetail';
import MyTrips from './screens/user/main/MyTrips';
import Wishlist from './screens/user/main/Wishlist';
import BookingDetails from './screens/user/main/BookingDetails';
import TravelTools from './screens/user/main/TravelTools';
import CustomerSupport from './screens/user/main/CustomerSupport';
import Gallery from './screens/user/main/Gallery';
import Notifications from './screens/user/main/Notifications';
import AboutPolicies from './screens/user/main/AboutPolicies';
import PrivacyPolicy from './screens/user/main/PrivacyPolicy';
import MyAccount from './screens/user/main/MyAccount';
import CompleteProfile from './screens/user/main/CompleteProfile';
import BookingHistory from './screens/user/main/BookingHistory';
import UpcomingPlan from './screens/user/main/UpcomingPlan';
import BestFoodArea from './screens/user/main/BestFoodArea';
import VisaPassport from './screens/user/main/VisaPassport';
import ForexCard from './screens/user/main/ForexCard';
import HotelSearch from './screens/user/main/HotelSearch';
import PisaDetail from './screens/user/main/PisaDetail';
import AiTripPlannerScreen from './screens/user/main/AiTripPlannerScreen';
import BookingScreen from './screens/user/main/BookingScreen';
import ArticleDetail from './screens/user/main/ArticleDetail';
import SecurePaymentsDetail from './screens/user/main/SecurePaymentsDetail';
import LiveTrainStatus from './screens/user/main/LiveTrainStatus';
import PNRStatus from './screens/user/main/PNRStatus';
import CoachSeatPosition from './screens/user/main/CoachSeatPosition';
import PlatformLocator from './screens/user/main/PlatformLocator';
import { initGoogleTranslate } from './utils/translator';
import ProtectedRoute from './components/User/common/ProtectedRoute';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: 'red' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

export default function App() {
  useEffect(() => {
    initGoogleTranslate();
  }, []);

  return (
    <AuthProvider>
      <Toaster />
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>

        {/* Public Routes */}
        <Route path='/' element={<Landing />} />
        <Route path='/auth/sign-up' element={<Signup />} />
        <Route path='/auth/sign-in' element={<Signin />} />
        <Route path='/auth/request-password-reset' element={<RequestPasswordReset />} />

        {/* Protected Routes */}
        <Route path='/user/welcome' element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
        <Route path='/ai-chatbot' element={<ProtectedRoute><TravelAIChat /></ProtectedRoute>} />
        <Route path='/main' element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route path='/destination/:id' element={<ProtectedRoute><Destination /></ProtectedRoute>} />
        <Route path='/ai-trip-planner' element={<ProtectedRoute><AiTripPlannerScreen /></ProtectedRoute>} />
        <Route path='/booking' element={<ProtectedRoute><BookingScreen /></ProtectedRoute>} />
        <Route path='/hotel' element={<ProtectedRoute><BookingScreen /></ProtectedRoute>} />
        <Route path='/stays/*' element={<ProtectedRoute><BookingScreen /></ProtectedRoute>} />
        <Route path='/flights' element={<ProtectedRoute><BookingScreen /></ProtectedRoute>} />
        <Route path='/trains' element={<ProtectedRoute><BookingScreen /></ProtectedRoute>} />
        <Route path='/train-running-status' element={<ProtectedRoute><LiveTrainStatus /></ProtectedRoute>} />
        <Route path='/check-pnr-status' element={<ProtectedRoute><PNRStatus /></ProtectedRoute>} />
        <Route path='/coach-seat-position' element={<ProtectedRoute><CoachSeatPosition /></ProtectedRoute>} />
        <Route path='/platform-locator' element={<ProtectedRoute><PlatformLocator /></ProtectedRoute>} />
        <Route path='/buses' element={<ProtectedRoute><BookingScreen /></ProtectedRoute>} />
        <Route path='/cars' element={<ProtectedRoute><BookingScreen /></ProtectedRoute>} />
        <Route path='/cruises' element={<ProtectedRoute><BookingScreen /></ProtectedRoute>} />
        <Route path='/holidays' element={<ProtectedRoute><BookingScreen /></ProtectedRoute>} />
        <Route path='/attractions' element={<ProtectedRoute><BookingScreen /></ProtectedRoute>} />
        <Route path='/article/:id' element={<ProtectedRoute><ArticleDetail /></ProtectedRoute>} />
        <Route path='/secure-payments' element={<ProtectedRoute><SecurePaymentsDetail /></ProtectedRoute>} />
        <Route path='/car-rental' element={<ProtectedRoute><CarRental /></ProtectedRoute>} />
        <Route path='/trending-destinations' element={<ProtectedRoute><TrendingDestinations /></ProtectedRoute>} />
        <Route path='/trending-destinations/pisa-tower' element={<ProtectedRoute><PisaDetail /></ProtectedRoute>} />
        <Route path='/seasonal-offers' element={<ProtectedRoute><SeasonalOffers /></ProtectedRoute>} />
        <Route path='/offer-detail' element={<ProtectedRoute><OfferDetail /></ProtectedRoute>} />
        <Route path='/my-trips' element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
        <Route path='/wishlist' element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path='/booking-details' element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
        <Route path='/travel-tools' element={<ProtectedRoute><TravelTools /></ProtectedRoute>} />
        <Route path='/customer-support' element={<ProtectedRoute><CustomerSupport /></ProtectedRoute>} />
        <Route path='/gallery' element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path='/about-policies' element={<ProtectedRoute><AboutPolicies /></ProtectedRoute>} />
        <Route path='/privacy-policy' element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
        <Route path='/policy/studio' element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
        <Route path='/policy/cookies' element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
        <Route path='/policy/pay' element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
        <Route path='/policy/website' element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
        <Route path='/policy/service' element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
        <Route path='/my-account' element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
        <Route path='/complete-profile' element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />
        <Route path='/booking-history' element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
        <Route path='/upcoming-plan' element={<ProtectedRoute><UpcomingPlan /></ProtectedRoute>} />
        <Route path='/best-food-area' element={<ProtectedRoute><BestFoodArea /></ProtectedRoute>} />
        <Route path='/visa-passport' element={<ProtectedRoute><VisaPassport /></ProtectedRoute>} />
        <Route path='/forex-card' element={<ProtectedRoute><ForexCard /></ProtectedRoute>} />
        <Route path='/hotel-search' element={<ProtectedRoute><HotelSearch /></ProtectedRoute>} />
      </Routes>
      </ErrorBoundary>
    </AuthProvider>
  )
}