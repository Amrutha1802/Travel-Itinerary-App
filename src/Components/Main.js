import React from "react";
import Login from "./Login.js";
import "../Styles/Main.css";

const Main = () => {
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
