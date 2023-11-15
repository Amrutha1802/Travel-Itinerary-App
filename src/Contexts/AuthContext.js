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
  // const [isAuthloading, setIsAuthLoading] = useState(true);

  const [user, setUser] = useState(null);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  useEffect(() => {
    // setIsAuthLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("user onAuthState changed", currentUser);
      setUser(currentUser);
      // setIsAuthLoading(false);
    });
    return () => unsubscribe();
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
