
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Ensure this key is set in your .env file

const getAIResponse = async (prompt) => {
  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

  const requestBody = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "لا يوجد رد من Gemini.";
  } catch (error) {
    console.error("❌ خطأ أثناء الاتصال بـ Gemini:", error);
    return "حدث خطأ أثناء الاتصال بـ Gemini!";
  }
};

export { getAIResponse };
