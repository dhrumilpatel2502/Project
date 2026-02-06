import React from "react";
import "../../styles/forms.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await axios.post(
      "http://localhost:3000/api/auth/user/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    console.log(response.data);
    navigate("/");
  };
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-subtitle">Welcome back, user</div>
        </div>
        <div className="auth-body">
          <form className="form-grid" onSubmit={handleSubmit}>
            <label className="label">
              Email
              <input
                className="input"
                type="email"
                placeholder="you@example.com"
                name="email"
              />
            </label>
            <label className="label">
              Password
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                name="password"
              />
            </label>
            <div className="row">
              <a className="link" href="/user/register">
                Create account
              </a>
              <a className="link" href="/food-partner/login">
                Are you a partner?
              </a>
            </div>
            <div className="actions">
              <button className="button" type="submit">
                Log In
              </button>
            </div>
          </form>
          <div className="helper">Access your orders and saved addresses.</div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
