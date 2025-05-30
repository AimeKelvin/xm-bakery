import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({ username: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Sign up successful!");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#0e0e0e] p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Sign Up</h2>
        <p className="text-sm text-gray-400 mb-6">Create an account to get started</p>

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

          <label className="block text-sm mb-1">Role</label>
          <select
            className="w-full px-3 py-2 mb-4 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-white"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded-md hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-white underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
