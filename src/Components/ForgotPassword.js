import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext.js";
import "../Styles/form.css";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const initialValues = {
    email: "",
  };
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(values.email);
      setMessage("Check your inbox for further instructions");
    } catch (err) {
      setError("Failed to Reset Password");
    }
    setLoading(false);
  };

  return (
    <div className="forgot-password-form">
      <div className="form-container">
        <div>{error && <h1>{error}</h1>}</div>
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
                name="email"
                className="input"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <button type="submit" className="btn" disabled={loading}>
                ResetPassword
              </button>
            </div>
          </Form>
        </Formik>
        <div className="link-btn">
          <p>{message}</p>
          <Link to="/" className="links">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
