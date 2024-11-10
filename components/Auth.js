// Auth.js

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { user, login, signup } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is logged in, redirect to feedback list
    if (user) {
      router.push("/feedback-list");
    }
  }, [user]);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const error = await login(email, password);
      if (!error) router.push("/feedback-list");
    } else {
      const error = await signup(email, password, username);
      if (!error) router.push("/feedback-list");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-fontColor">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          {isLogin ? "Log In" : "Sign Up"}
        </h2>
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mb-4 bg-inputBg text-fontColor border border-gray-500 rounded-md focus:outline-none"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-inputBg text-fontColor border border-gray-500 rounded-md focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-inputBg text-fontColor border border-gray-500 rounded-md focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-accent text-fontColor py-2 rounded-md hover:bg-opacity-80 transition"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>
        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-center text-blue-500 mt-4 cursor-pointer"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Log in"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
