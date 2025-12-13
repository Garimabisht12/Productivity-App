import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Buttons from "../components/Buttons";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/auth/signup", {
        username,
        email,
        password,
      });

      // signup successful → go to login
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] p-10 bg-[#EDEDED] text-[#333333] rounded-lg shadow">
        <form onSubmit={handleSignUp}>
          <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email ID"
            className="w-full mb-4 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Buttons label="Sign Up" size="sm" />

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 underline"
            >
              Already have an account? Login
            </button>
          </div>
        </form>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full mt-6 px-4 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default SignUp;



