// pages/index.js

import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

const HomePage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/feedback-list"); // Redirect to feedback list if logged in
    } else {
      router.push("/auth"); // Redirect to auth if not logged in
    }
  }, [user, router]);

  return null; // Render nothing since we are redirecting
};

export default HomePage;
