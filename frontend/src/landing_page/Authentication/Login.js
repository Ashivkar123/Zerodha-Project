import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      setMessage("Please enter email/username and password.");
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage("");

    const BASE_URL = process.env.BASE_URL;

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        identifier,
        password,
      });

      setMessage(response.data.message);
      setIsSuccess(true);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Redirect to home page after successful login
      navigate("/home");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form" noValidate>
        <div>
          <label htmlFor="identifier">Email or Username:</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
            autoComplete="current-password"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
      {message && (
        <p
          className={`login-message ${isSuccess ? "success" : "error"}`}
          role="alert"
          aria-live="assertive"
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;
