import React from "react";
import "../../styles/forms.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/user/register",
      {
        fullName: firstName + " " + lastName,
        email,
        password,
      },{
        withCredentials: true,
      }
    );

    console.log(response.data);
    navigate('/');
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-subtitle">Create your user account</div>
        </div>
        <div className="auth-body">
          <form className="form-grid" onSubmit={handleSubmit}>
            <label className="label">
              First Name
              <input
                className="input"
                type="text"
                placeholder="Alex"
                name="firstName"
              />
            </label>
            <label className="label">
              Last Name
              <input
                className="input"
                type="text"
                placeholder="Johnson"
                name="lastName"
              />
            </label>
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
              <a className="link" href="/user/login">
                Already have an account?
              </a>
              <a className="link" href="/food-partner/register">
                Partner sign up
              </a>
            </div>
            <div className="actions">
              <button className="button" type="submit">
                Create Account
              </button>
            </div>
          </form>
          <div className="helper">Simple start — just your name and email.</div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
