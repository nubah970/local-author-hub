import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Quiz from "./Quiz";
import { fetchTorontoAuthors } from "../gemini";

export default function QuizPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQuizSubmit = async (preferences) => {
    setLoading(true);

    try {
      // Call Gemini API with the quiz answers
      const recommendations = await fetchTorontoAuthors(preferences);

      // Navigate to the results page and pass recommendations
      navigate("/results", { state: { data: recommendations } });
    } catch (err) {
      console.error("Error fetching Gemini recommendations:", err);
      navigate("/results", { state: { data: "Failed to fetch recommendations." } });
    } finally {
      setLoading(false);
    }
  };

  return <Quiz onSubmit={handleQuizSubmit} isLoading={loading} />;
}