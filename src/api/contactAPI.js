import { CONTACT_FORM_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";

// Function to send a POST request to the server and submit a contact form
export const submitContactForm = async (contactData) => {
    try {
        const response = await axios.post(CONTACT_FORM_ROUTE, contactData);
        return response.data;
    } catch (error) {
        console.error("Error submitting contact form:", error);
        throw new Error(error.response?.data?.message || "Contact form submission failed");
    }
};