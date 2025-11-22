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
        const recommendations = await fetchTorontoAuthors(preferences);
        navigate("/results", { state: { data: recommendations } });
      } catch (err) {
        console.error(err);
        navigate("/results", { state: { data: "Failed to fetch recommendations." } });
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="page-wrapper">
        <Quiz onSubmit={handleQuizSubmit} isLoading={loading} />
      </div>
    );
  }
  