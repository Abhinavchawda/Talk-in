import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

export default function AiChat() {
  const [form, setForm] = useState({ prompt: "" });
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt.trim() === "") {
      setError("Please write a prompt!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/ai/get-answer/${encodeURIComponent(form.prompt)}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch AI response.");
      }

      const data = await response.json();
      setResult(data || "No response from AI.");
    } catch (error) {
      console.error("Error in AI chat:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  const handleCopy = () => {
    // navigator.clipboard.writeText(result);
    navigator.clipboard
    .writeText(result)
    .then(() => {
      alert("Response copied to clipboard!");
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error);
      alert("Failed to copy. Please try again.");
    });
    // alert("Response copied to clipboard!"); // Notify user
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-black text-white">
      <div className="w-full max-w-2xl bg-zinc-900 px-2 py-3 md:p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-4">Your AI Assistant</h1>
        <hr className="border-gray-700 mb-4" />

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mb-6">
          <label htmlFor="prompt" className="block text-lg font-medium mb-2">
            Enter your prompt:
          </label>
          <div className="md:flex items-center">
            <input
              id="prompt"
              name="prompt"
              type="text"
              placeholder="Type something for AI..."
              value={form.prompt}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 m-2">{error}</p>}
            <button
              type="submit"
              className="mt-3 md:mt-0 md:mx-2 px-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Send
            </button>
          </div>
        </form>

        {loading && (
          <div className="flex justify-center items-center mb-6">
            <ImSpinner8 className="animate-spin text-blue-500 text-3xl" />
            <p className="ml-3 text-blue-400">wait a second...</p>
          </div>
        )}

        {/* Response Section */}
        {result && (
          <div className="relative bg-zinc-950 p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium mb-2">Response from AI:</h2>
              <button
                onClick={handleCopy}
                className="mx-2 mb-2 hover:text-blue-500 transition"
              >
                <FaCopy size={16} />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto p-2 rounded-lg">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}