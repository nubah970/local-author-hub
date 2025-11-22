import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <QuizPage
              quizAnswers={quizAnswers}
              setQuizAnswers={setQuizAnswers}
              setLoading={setLoading}
              loading={loading}
              setResultData={setResultData}
            />
          }
        />
        <Route
          path="/results"
          element={<ResultsPage resultData={resultData} loading={loading} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
