// Define the HOST variable
export const HOST = import.meta.env.VITE_SERVER_URL;

// Define the AUTH_ROUTE variable
const AUTH_ROUTE = `${HOST}/api/auth`;

// AUTH ROUTES
export const SIGNUP_USER_ROUTE = `${AUTH_ROUTE}/signup`; // Define the SIGNUP_USER_ROUTE variable
export const GOOGLE_SIGNIN_ROUTE = `${AUTH_ROUTE}/google-signin`; // Define the GOOGLE_SIGNIN_ROUTE variable
export const REQUEST_PASSWORD_RESET_ROUTE = `${AUTH_ROUTE}/request-password-reset`; // Define the REQUEST_PASSWORD_RESET_ROUTE variable
export const RESET_PASSWORD_ROUTE = `${AUTH_ROUTE}/reset-password`; // Define the RESET_PASSWORD_ROUTE variable
export const VERIFY_EMAIL_ROUTE = `${AUTH_ROUTE}/verify-email`; // Define the VERIFY_EMAIL_ROUTE variable
export const LOGIN_USER_ROUTE = `${AUTH_ROUTE}/login`; // Define the LOGIN_USER_ROUTE variable
export const LOGOUT_USER_ROUTE = `${AUTH_ROUTE}/logout`; // Define the LOGOUT_USER_ROUTE variable

// Define the USER_ROUTE variable 
const USER_ROUTE = `${HOST}/api/user`;

// USER ROUTES
export const COMPLETE_PROFILE_ROUTE = `${USER_ROUTE}/complete-profile`; // Define the COMPLETE_PROFILE_ROUTE variable
export const GET_USER_ROUTE = `${USER_ROUTE}/get-user`; // Define the GET_USER_ROUTE variable

// Define the CONTACT_ROUTE variable
const CONTACT_ROUTE = `${HOST}/api/contact`;

// CONTACT ROUTES
export const CONTACT_FORM_ROUTE = `${CONTACT_ROUTE}/contact`; // Define the CONTACT_FORM_ROUTE variable