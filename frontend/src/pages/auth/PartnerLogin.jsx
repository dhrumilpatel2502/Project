import React from "react";
import "../../styles/forms.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartnerLogin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle partner login logic here
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await axios.post(
      "http://localhost:3000/api/auth/food-partner/login",
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    // console.log(response.data);
    navigate("/create-food");
  };
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-subtitle">Welcome back, partner</div>
        </div>
        <div className="auth-body">
          <form className="form-grid" onSubmit={handleSubmit}>
            <label className="label">
              Business Email
              <input
                className="input"
                type="email"
                placeholder="partner@restaurant.com"
                name="email"
              />
            </label>
            <label className="label">
              Password
              <input className="input" type="password" placeholder="••••••••" name="password" />
            </label>
            <div className="row">
              <a className="link" href="/food-partner/register">
                Create partner account
              </a>
              <a className="link" href="/user/login">
                User login
              </a>
            </div>
            <div className="actions">
              <button className="button" type="submit">
                Log In
              </button>
            </div>
          </form>
          <div className="helper">Manage menus, orders, and availability.</div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
