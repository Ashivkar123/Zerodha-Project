import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setMessage("Please fill in all required fields.");
      setIsSuccess(false);
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const BASE_URL = process.env.BASE_URL;
      const response = await axios.post(`${BASE_URL}/signup`, {
        email,
        username,
        password,
      });

      setMessage(response.data.message);
      setIsSuccess(true);
      setEmail("");
      setUsername("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage("User already exists. Redirecting to login...");
        setIsSuccess(false);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(
          error.response?.data?.message || "Signup failed. Please try again."
        );
        setIsSuccess(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} className="signup-form" noValidate>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {message && (
        <p
          className={`signup-message ${isSuccess ? "success" : "error"}`}
          role="alert"
          aria-live="assertive"
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Signup;
