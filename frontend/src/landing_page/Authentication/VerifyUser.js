import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VerifyUser.css";
import { useSearchParams } from "react-router-dom";

function VerifyUser() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setMessage("Invalid verification link.");
        setIsSuccess(false);
        return;
      }

      const BASE_URL = process.env.BASE_URL || "http://localhost:3002";

      try {
        const response = await axios.post(`${BASE_URL}/verify`, {
          token,
        });

        setMessage(response.data.message);
        setIsSuccess(true);
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Verification failed. Please try again."
        );
        setIsSuccess(false);
      }
    };

    verifyToken();
  }, [searchParams]);

  return (
    <div className="verify-container">
      <h1>User Verification</h1>
      <p className={`verify-message ${isSuccess ? "success" : "error"}`}>
        {message}
      </p>
    </div>
  );
}

export default VerifyUser;
