import React from "react";
import { useAuth } from "../Contexts/AuthContext.js";
import "../Styles/Logout.css";

const Logout = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
