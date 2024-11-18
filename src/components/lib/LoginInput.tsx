"use client";

import { useState } from "react";

const LoginInput = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !pass) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/database/adminData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user, password: pass }),
      });

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <label htmlFor="username" className="text-gray-700 mb-2">
        Username or Email
      </label>
      <input
        type="text"
        id="username"
        placeholder="Enter your username or email"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        required
      />

      <label htmlFor="password" className="text-gray-700 mb-2">
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        required
      />

      <button
        type="submit"
        className={`w-full p-3 text-white font-bold rounded-lg transition-all ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginInput;
