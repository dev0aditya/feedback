// Layout.js

import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // Log the user out
    router.push("/auth"); // Redirect to the auth page after logout
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-8 bg-inputBg min-h-screen">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => (user ? handleLogout() : router.push("/auth"))}
            className="bg-accent text-fontColor px-4 py-2 rounded hover:bg-opacity-80 transition"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
