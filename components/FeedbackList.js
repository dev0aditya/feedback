// pages/feedback-list.js

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

const FeedbackListPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Redirect to login page if not authenticated
    if (!user) {
      router.push("/");
      return;
    }

    const fetchFeedback = async () => {
      const { data, error } = await supabase
        .from("Feedback")
        .select(`*, user:user_id ( name )`);

      if (error) {
        console.error("Error fetching feedback:", error);
      } else {
        setFeedbackList(data);
      }
    };

    fetchFeedback();
  }, [user, router]);

  return user ? (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-fontColor rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Feedback List</h2>
      {feedbackList.length > 0 ? (
        <table className="w-full table-auto text-fontColor">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Feedback</th>
              <th className="px-4 py-2 text-left">Sentiment</th>
              <th className="px-4 py-2 text-left">Summary</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map((feedback) => (
              <tr
                key={feedback.feedbackId}
                className="bg-gray-800 hover:bg-gray-700"
              >
                <td className="px-4 py-2">
                  {feedback.user?.name || "Anonymous"}
                </td>
                <td className="px-4 py-2">{feedback.text}</td>
                <td className="px-4 py-2">
                  {feedback.sentiment || "Analyzing..."}
                </td>
                <td className="px-4 py-2">
                  {feedback.summary || "Generating summary..."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No feedback submitted yet.</p>
      )}
    </div>
  ) : null;
};

export default FeedbackListPage;
