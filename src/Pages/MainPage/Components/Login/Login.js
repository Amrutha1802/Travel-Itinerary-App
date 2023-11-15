import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext.js";
import "../../../../Styles/form.css";
import { useUserContext } from "../../../../Contexts/UserContext.js";

const Login = () => {
  const { login } = useAuth();
  const { checkAndAddUser } = useUserContext();
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setError("");
      setLoading(true);
      await login(values.email, values.password);
      checkAndAddUser(values.email);
      navigate("/home");
    } catch {
      setError("Failed to login to your account");
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <div>
        <h1>Login</h1>
        {error && <h1 className="error">{error}</h1>}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <div>
            <label className="label" htmlFor="email">
              Email:
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="input"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password:
            </label>
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
            <button type="submit" className="btn" disabled={loading}>
              Login
            </button>
          </div>
        </Form>
      </Formik>
      <div className="forgot-btn">
        <Link to="/forgot-password" className="links">
          Forgot Password
        </Link>
      </div>
      <div className="link-btn">
        <p>
          Don't Have an account ?{" "}
          <Link to="/signup" className="links">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
