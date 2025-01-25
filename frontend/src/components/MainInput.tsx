"use client";

import React, { useState } from "react";

const MainInput: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(""); // Clear the previous response

    try {
      const res = await fetch("http://localhost:5000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.response);
      } else {
        setResponse(`Error: ${data.error}`);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-3/4">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-white-800">
        What do you want to know?
      </h2>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Ask anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-1/2 border border-gray-300 bg-white text-black rounded-md px-4 py-2 mb-6 shadow focus:outline-none focus:ring focus:ring-gray-400"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {loading ? "Loading..." : "Submit"}
      </button>

      {/* Response Box */}
      <div className="mt-6 w-1/2 p-4 border border-gray-300 bg-gray-100 text-black rounded">
        {response ? (
          <p>{response}</p>
        ) : (
          <p className="text-gray-500">Response will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default MainInput;
