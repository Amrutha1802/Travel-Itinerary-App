import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyALWHF31F0zxrEtLMQnmNAg90T1iuQDpGA",
  authDomain: "react-auth-7612a.firebaseapp.com",
  projectId: "react-auth-7612a",
  storageBucket: "react-auth-7612a.appspot.com",
  messagingSenderId: "703315122581",
  appId: "1:703315122581:web:939c3c0c46181eb4453e9c",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
