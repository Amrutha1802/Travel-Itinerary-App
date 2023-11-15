import React, { useEffect } from "react";
import Login from "./Components/Login/Login.js";
import "./Main.css";
import { useAuth } from "../../Contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/home");
  }, [navigate, user]);

  return (
    <div className="main-container">
      <h1 className="heading-1">Travel and Tourism App</h1>
      <div className="login-container">
        <div className="login-content">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Main;
