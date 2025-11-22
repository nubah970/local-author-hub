import React, { useState } from "react";
import { ArrowRight, Sparkles, Book, Smile, Clock, Tag } from "lucide-react";
import Spinner from "../components/Spinner";
import { fetchTorontoAuthors } from "../gemini";


export default function Quiz({ onSubmit, isLoading }) {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    genre: "",
    mood: "",
    length: "",
    themes: [],
    support: [],
  });

  const handleSelect = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    if (step < 4) setStep(step + 1);
  };

  const toggleTheme = (theme) => {
    setPreferences((prev) => {
      const themes = prev.themes.includes(theme)
        ? prev.themes.filter((t) => t !== theme)
        : [...prev.themes, theme];
      return { ...prev, themes };
    });
  };

  const toggleSupport = (supportOption) => {
    setPreferences((prev) => {
      const support = prev.support.includes(supportOption)
        ? prev.support.filter((s) => s !== supportOption)
        : [...prev.support, supportOption];
      return { ...prev, support };
    });
  };

  const submitQuiz = () => {
    onSubmit(preferences);
  };

  const steps = [
    {
      id: 1,
      question: "What genre do you typically enjoy?",
      icon: Book,
      options: [
        "Literary Fiction",
        "Mystery/Thriller",
        "Sci-Fi/Fantasy",
        "Historical Fiction",
        "Non-Fiction/Memoir",
        "Poetry",
      ],
    },
    {
      id: 2,
      question: "What is your current reading mood?",
      icon: Smile,
      options: [
        "Uplifting & Light",
        "Dark & Gritty",
        "Thought-Provoking",
        "Fast-Paced",
        "Emotional & Deep",
        "Whimsical",
      ],
    },
    {
      id: 3,
      question: "How long of a read are you looking for?",
      icon: Clock,
      options: [
        "Short Story / Essay",
        "Quick Read (<200 pages)",
        "Standard Novel (300ish pages)",
        "Epic Saga (500+ pages)",
      ],
    },
    {
      id: 4,
      question: "Select any themes you're interested in:",
      icon: Tag,
      multi: true,
      options: [
        "Immigrant Experience",
        "Urban Life",
        "Nature & Environment",
        "History of Toronto",
        "Coming of Age",
        "Social Justice",
        "Romance",
        "Technology",
      ],
    },
    {
      id: 5,
      question: "Do you want to support specific local authors?",
      icon: Tag,
      multi: true,
      options: [
        "Indigenous",
        "Immigrant",
        "Youth",
        "Any",
      ],
    },
    
  ];

  const currentStepData = steps[step - 1];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-6"></div>
        <h3 className="text-2xl font-bold mb-2">Consulting the Librarian...</h3>
        <p className="text-gray-600 max-w-md">
          Our AI is scouring the shelves of Toronto's literary history to find your perfect match.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
          <span>Start</span>
          <span>Step {step} of {steps.length}</span>
          <span>Finish</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
        <div className="flex items-center mb-6 text-blue-500">
          <currentStepData.icon className="w-8 h-8 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">{currentStepData.question}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentStepData.options.map((option) => (
            <button
              key={option}
              onClick={() => {
                if (currentStepData.multi) {
                  if (step === 4) {
                    toggleTheme(option);
                  } else if (step === 5) {
                    toggleSupport(option);
                  }
                } else {
                  const key =
                    step === 1 ? "genre" : step === 2 ? "mood" : "length";
                  handleSelect(key, option);
                }
              }}
              className={`p-4 rounded-xl text-left border-2 transition-all duration-200 flex items-center justify-between group ${
                currentStepData.multi && (
                  (step === 4 && preferences.themes.includes(option)) ||
                  (step === 5 && preferences.support.includes(option))
                )
                  ? "border-blue-500 bg-blue-50 text-blue-800"
                  : "border-gray-100 hover:border-blue-300 hover:bg-gray-50 text-gray-700"
              }`}
            >
              <span className="font-medium">{option}</span>
              {currentStepData.multi && (
                ((step === 4 && preferences.themes.includes(option)) ||
                 (step === 5 && preferences.support.includes(option))) && (
                  <Sparkles className="w-4 h-4 text-blue-500" />
                )
              )}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mr-auto text-gray-500 hover:text-gray-800 font-medium px-4 py-2"
            >
              Back
            </button>
          )}

          {currentStepData.multi && step === 4 && (
            <button
              onClick={() => setStep(step + 1)}
              disabled={preferences.themes.length === 0}
              className={`flex items-center px-8 py-3 rounded-full font-bold text-white transition-all transform hover:scale-105 ${
                preferences.themes.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 shadow-lg"
              }`}
            >
              Next
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          )}

          {currentStepData.multi && step === 5 && (
            <button
              onClick={submitQuiz}
              disabled={preferences.support.length === 0}
              className={`flex items-center px-8 py-3 rounded-full font-bold text-white transition-all transform hover:scale-105 ${
                preferences.support.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 shadow-lg"
              }`}
            >
              Find My Authors
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}