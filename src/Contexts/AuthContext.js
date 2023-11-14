import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase.js";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const saveUserToLocalStorage = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
  };
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    removeUserFromLocalStorage();
    return signOut(auth);
  };
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        saveUserToLocalStorage(currentUser);
      } else {
        setUser(null);
        removeUserFromLocalStorage();
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    signup,
    login,
    logout,
    resetPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
