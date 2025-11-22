// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuizPage from "./QuizPage";
import RecommendationsPage from "./ResultsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to quiz */}
        <Route path="/" element={<Navigate to="/quiz" />} />

        {/* Quiz page */}
        <Route path="/quiz" element={<QuizPage />} />

        {/* Recommendations/results page */}
        <Route path="/results" element={<RecommendationsPage />} />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
