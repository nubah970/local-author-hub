import React from "react";
import { useNavigate } from "react-router-dom";
import Question from "../components/Questions";
import Spinner from "../components/Spinner";

export default function QuizPage({
  quizAnswers,
  setQuizAnswers,
  setResultData,
  setLoading,
  loading,
}) {
  const navigate = useNavigate();

  const questions = [
    {
      key: "mood",
      title: "What mood are you in when reading?",
      options: ["Calm", "Excited", "Emotional", "Curious"],
    },
    {
      key: "setting",
      title: "Favourite settings?",
      options: ["Small towns", "Cities", "Fantasy worlds", "Real-life Canada"],
    },
    {
      key: "pace",
      title: "What pacing do you prefer?",
      options: ["Slow", "Medium", "Fast/Action-packed"],
    },
    {
      key: "topics",
      title: "What topics do you care about?",
      options: ["Community", "Identity", "Adventure", "Social issues"],
    },
    {
      key: "support",
      title: "Do you want to support specific local authors?",
      options: ["Indigenous", "Immigrant", "Youth", "Any"],
    },
  ];

  const handleAnswer = (key, value) => {
    setQuizAnswers({ ...quizAnswers, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Placeholder for Gemini call
    setTimeout(() => {
      setResultData({
        genre: "Fantasy",
        authors: [
          { name: "Alicia Elliott", description: "Writes engaging fantasy stories." },
          { name: "Souvankham Thammavongsa", description: "Canadian author with rich narratives." },
          { name: "Cherie Dimaline", description: "Indigenous author focusing on identity and community." },
        ],
      });
      setLoading(false);
      navigate("/results");
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Your Local Author Match</h1>
      {questions.map((q) => (
        <Question
          key={q.key}
          title={q.title}
          options={q.options}
          value={quizAnswers[q.key]}
          onChange={(val) => handleAnswer(q.key, val)}
        />
      ))}

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Get My Match
      </button>

      {loading && <Spinner />}
    </div>
  );
}