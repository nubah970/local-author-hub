import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

if (!apiKey) {
  console.error("REACT_APP_GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

export async function fetchTorontoAuthors(preferences) {
    const { genre, mood, length, themes, support} = preferences;
    const prompt = `
    I am looking for recommendations for books by authors specifically from Toronto or the Greater Toronto Area (GTA).
    - Genre: ${genre || "Any"}
    - Mood: ${mood || "Any"}
    - Length/Pacing: ${length || "Any"}
    - Themes: ${themes.length ? themes.join(", ") : "Any"}
    - Support Preference: ${support?.length ? support.join(", ") : "Any"}

    Please recommend 4-5 distinct books by Toronto-based authors that fit these criteria.
    
    Format each recommendation EXACTLY as follows (use this format for each book):
    
    **Book Title** by Author Name
    Location: [neighborhood or Toronto]
    Description: [2-3 sentence description]
    Why it fits: [1-2 sentences explaining why it matches the preferences]
    
    ---
    
    Repeat this format for each recommendation, separated by "---" between books.
  `;

  try {
    if (!apiKey) {
      throw new Error("API key is missing. Please set REACT_APP_GEMINI_API_KEY in your .env file.");
    }
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return `Error fetching recommendations: ${error.message || "Unknown error"}`;
  }
}