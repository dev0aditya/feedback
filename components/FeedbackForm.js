import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const FeedbackForm = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase
        .from("Feedback")
        .insert([{ text: feedbackText }]);

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Feedback submitted successfully!");
        setFeedbackText("");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center h-full w-full">
      <div className="w-2/3 mx-auto p-6 bg-gray-800 text-fontColor rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-fontColor">
          Submit Your Feedback
        </h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Enter your feedback"
            className="w-full p-3 mb-4 bg-inputBg text-fontColor border border-gray-500 rounded-md focus:border-accent focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-accent text-fontColor py-2 rounded-md hover:bg-opacity-80 transition"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-accent">{message}</p>}
      </div>
    </div>
  );
};

export default FeedbackForm;
