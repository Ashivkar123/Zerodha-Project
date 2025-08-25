import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import OpenAccount from "../OpenAccount";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        console.warn("⚠️ No token cookie found → redirecting to login");
        navigate("/login");
        return;
      }

      try {
        const API_URL =
          "https://zerodha-project-backend-1-2ouc.onrender.com/api/";

        console.log("🔍 Sending verification request to:", API_URL);

        const response = await axios.post(
          API_URL,
          {},
          { withCredentials: true }
        );

        console.log("✅ Backend verification response:", response.data);

        const { status, user } = response.data;

        if (status) {
          setUsername(user);
          toast(`Hello ${user}`, { position: "top-right", autoClose: 3000 });
        } else {
          console.warn("⚠️ Token invalid, redirecting to login");
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error(
          "❌ Verification failed:",
          error.response ? error.response.data : error.message
        );
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies.token, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome, <span>{username}</span>
        </h4>
        <button onClick={handleLogout}>LOGOUT</button>

        {/* Your existing page sections */}
        <Hero />
        <Awards />
        <Stats />
        <Pricing />
        <Education />
        <OpenAccount />
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
