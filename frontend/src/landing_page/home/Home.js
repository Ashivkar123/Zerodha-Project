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
        // No token cookie, redirect to login
        navigate("/login");
        return;
      }

      try {
        // Make sure this endpoint matches your backend verification route
        const { data } = await axios.post(
          "http://localhost:4000/", // adjust if needed
          {},
          { withCredentials: true }
        );

        const { status, user } = data;

        if (status) {
          setUsername(user);
          toast(`Hello ${user}`, { position: "top-right", autoClose: 3000 });
        } else {
          // Token invalid - remove cookie & redirect
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        // Error during verification - remove cookie & redirect
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies.token, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/signup");
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
