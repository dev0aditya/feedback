// pages/chart.js

import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ChartPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect to login if not authenticated
    }
  }, [user, router]);

  return user ? (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-fontColor rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Feedback Chart</h2>
      {/* Insert chart component or chart content here */}
      <p>Here you would see feedback analysis charts.</p>
    </div>
  ) : null;
};

export default ChartPage;
