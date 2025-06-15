import Cookies from 'js-cookie';

const API_URL = "http://127.0.0.1:8000/api/gemini-response";

export const getAIResponse = async (message) => {
  try {
    const token = Cookies.get('token'); 
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    // Accept either string replies or product arrays
    if (typeof data.reply === "string" || Array.isArray(data.reply)) {
      return data.reply;
    }
    
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("API Error:", error.message);
    return "Sorry, I couldn't connect to the service. Please try again later.";
  }
};