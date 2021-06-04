import React, { useRef, useState } from "react";
import "./css/style.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Login() {
  const emailRef = useRef();
  const pwdRef = useRef();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setIsLoading(true);
      await login(emailRef.current.value, pwdRef.current.value);
      history.push("/admin/dashboard");
    } catch {
      setError("Failed to Login");
      pwdRef.current.value = "";
    }
    setIsLoading(false);
  }
  return (
    <div className="body d-flex align-items-center justify-content-center">
      <div className="login-body d-flex align-items-center justify-content-center flex-column">
        <h2 className="mt-4 mb-0">Admin Login</h2>
        <hr />
        <form className="ml-3 mb-3" onSubmit={handleSubmit}>
          <div className="login-field my-4">
            <span className="">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
            />
          </div>
          <div className="login-field my-4">
            <span className="">
              <i className="fas fa-key"></i>
            </span>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              ref={pwdRef}
            />
          </div>
          {error !== "" && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button type="submit">
            {isLoading ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
