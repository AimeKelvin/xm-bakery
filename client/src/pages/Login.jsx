import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Pass token, role, and username to the login function
        login(data.token, data.role, formData.username);
        navigate("/welcome");
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  console.log("Form Data:", formData); // Debugging line to check form data

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#0e0e0e] p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Login</h2>
        <p className="text-sm text-gray-400 mb-6">Enter your username below to login to your account</p>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            placeholder="e.g. johndoe"
            className="w-full px-3 py-2 mb-4 rounded-md bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />

          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 mb-4 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-white"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded-md hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-white underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
