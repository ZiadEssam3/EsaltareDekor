// GeminiService.js

const API_URL = "http://127.0.0.1:8000/api/gemini-response";

/**
 * Function to communicate with the Gemini API via the backend
 * @param {string} message - The message from the user
 * @returns {Promise<string>} - The response from Gemini or an error message
 */
export const sendGeminiMessage = async (message) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: message }),
        });
        if (!response.ok) {
            throw new Error(`Server connection failed. Status code: ${response.status}`);
        }
        const data = await response.json();
        // Return the reply from the 'reply' field, or return as-is if not found
        return data.reply || data.message || "No response received from the AI.";
    } catch (error) {
        console.error("❌ Error communicating with server:", error.message);
        return "An error occurred while communicating with the AI. Please try again later.";
    }
};