import React from "react";

export default function Question({ title, options, value, onChange }) {
  return (
    <div className="my-4">
      <h2 className="font-semibold text-lg">{title}</h2>
      <div className="flex flex-wrap gap-2 mt-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 border rounded-lg hover:bg-gray-100 ${
              value === opt ? "bg-gray-200" : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}