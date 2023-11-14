import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../Contexts/UserContext.js";
import { useAuth } from "../Contexts/AuthContext.js";
import "../Styles/form.css";

const SignupForm = () => {
  const { signup } = useAuth();
  const { addUserToLocalStorage } = useUserContext();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setError("");
      setLoading(true);
      const response = await signup(values.email, values.password);
      // console.log("Response is ", response);
      addUserToLocalStorage(values.email);
      setError("Account Created Successfully");
      navigate("/home");
    } catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <div className="signup-form">
      <div className="form-container">
        <div>
          <h1>Sign up Form</h1>
          {error && <h1>{error}</h1>}
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form>
            <div>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                className="input"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="input"
                placeholder="Enter your Password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="input"
                placeholder="Re-enter your Password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <button type="submit" className="btn" disabled={loading}>
                Sign Up
              </button>
            </div>
          </Form>
        </Formik>
        <div className="link-btn">
          <p>
            Already Have an account ?{" "}
            <Link to="/" className="links">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
