// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuizPage from "./QuizPage";
import RecommendationsPage from "./ResultsPage";
import "../styles/theme.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/quiz" />} />

        <Route path="/quiz" element={<QuizPage />} />

        <Route path="/results" element={<RecommendationsPage />} />

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;