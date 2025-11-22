import React from "react";
import Spinner from "../components/Spinner";

export default function ResultsPage({ resultData, loading }) {
  if (loading || !resultData) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Match Results</h1>
      <div className="mb-6 p-4 border rounded-lg shadow bg-gray-50">
        <h2 className="font-semibold text-xl">Your Genre Match: {resultData.genre}</h2>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Local Ontario Authors:</h2>
      <div className="space-y-4">
        {resultData.authors.map((a) => (
          <div key={a.name} className="p-4 border rounded-lg shadow hover:bg-gray-50">
            <h3 className="font-semibold text-lg">{a.name}</h3>
            <p className="text-gray-700">{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}