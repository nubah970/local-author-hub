// src/pages/RecommendationsPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Book, MapPin, Sparkles, ArrowLeft } from "lucide-react";

export default function RecommendationsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Gemini results are passed via navigate state
  const recommendationsText = location.state?.data || "No recommendations available.";

  // Parse recommendations - handle multiple formats
  const parseRecommendations = (text) => {
    // Check if it's an error message
    if (text.startsWith("Error fetching recommendations")) {
      return [];
    }

    // Split by "---" separator first (our preferred format)
    let sections = text.split(/---+/).filter(s => s.trim().length > 0);
    
    // If no "---" found, try splitting by numbered lists
    if (sections.length <= 1) {
      sections = text.split(/\d+\.\s+/).filter(s => s.trim().length > 0);
    }

    // If still no sections, try splitting by double newlines
    if (sections.length <= 1) {
      sections = text.split(/\n\n+/).filter(s => s.trim().length > 0);
    }

    return sections.map((section) => {
      const lines = section.trim().split('\n').map(l => l.trim()).filter(l => l);
      
      // Extract book title and author (look for "**Title** by Author" or "Title by Author")
      let title = "";
      let author = "";
      let location = "";
      let description = "";
      let whyItFits = "";

      lines.forEach((line, idx) => {
        // Extract title and author from first line
        if (idx === 0) {
          const titleMatch = line.match(/\*\*(.+?)\*\*\s+by\s+(.+)/i) || line.match(/(.+?)\s+by\s+(.+)/i);
          if (titleMatch) {
            title = titleMatch[1].trim();
            author = titleMatch[2].trim();
          } else {
            title = line;
          }
        }
        
        // Extract location
        if (line.toLowerCase().startsWith('location:')) {
          location = line.replace(/^location:\s*/i, '').trim();
        }
        
        // Extract description
        if (line.toLowerCase().startsWith('description:')) {
          description = line.replace(/^description:\s*/i, '').trim();
        }
        
        // Extract why it fits
        if (line.toLowerCase().startsWith('why it fits:') || line.toLowerCase().startsWith('why it fits')) {
          whyItFits = line.replace(/^why it fits:?\s*/i, '').trim();
        }
      });

      // If we didn't find structured fields, use the whole section as description
      if (!description && !whyItFits && lines.length > 1) {
        description = lines.slice(1).join(' ');
      }

      return {
        title: title || section.substring(0, 100),
        author: author || "Unknown Author",
        location: location || "Toronto",
        description: description || (lines.length > 1 ? lines.slice(1).join(' ') : section),
        whyItFits: whyItFits || ""
      };
    }).filter(rec => rec.title.length > 0);
  };

  const recommendations = parseRecommendations(recommendationsText);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-2 text-center text-gray-900">
        Your Toronto Author Recommendations
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Discovered {recommendations.length} perfect matches for you
      </p>

      {recommendations.length > 0 ? (
        <div className="grid gap-6">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="bg-white p-6 border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Book className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1 text-gray-900">
                    {rec.title}
                  </h2>
                  <p className="text-lg text-gray-700 mb-3 font-medium">
                    by {rec.author}
                  </p>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{rec.location}</span>
                  </div>

                  {rec.description && (
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed">
                        {rec.description}
                      </p>
                    </div>
                  )}

                  {rec.whyItFits && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Why this fits:</p>
                          <p className="text-gray-700 leading-relaxed">
                            {rec.whyItFits}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 border-2 border-gray-200 rounded-2xl shadow-lg text-center">
          <p className="text-gray-600 text-lg whitespace-pre-wrap">{recommendationsText}</p>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate("/quiz")}
          className="flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 shadow-lg transition-all transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Take Quiz Again
        </button>
      </div>
    </div>
  );
}
