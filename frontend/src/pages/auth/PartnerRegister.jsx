import React from "react";
import "../../styles/forms.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartnerRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;
    const response = await axios.post(
      "http://localhost:3000/api/auth/food-partner/register",
      {
        name: businessName,
        contactName,
        phone,
        email,
        password,
        address,
      },
      {
        withCredentials: true,
      },
    );
    // console.log(response.data);
    navigate("/create-food");
  };
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-subtitle">Join as a food partner</div>
        </div>
        <div className="auth-body">
          <form className="form-grid" onSubmit={handleSubmit}>
            <label className="label">
              Business Name
              <input
                className="input"
                type="text"
                placeholder="Your Restaurant"
                name="businessName"
              />
            </label>
            <label className="label">
              Contact Name
              <input
                className="input"
                type="text"
                placeholder="Alex Johnson"
                name="contactName"
              />
            </label>
            <label className="label">
              Phone
              <input
                className="input"
                type="tel"
                placeholder="+1 555 123 4567"
                name="phone"
              />
            </label>
            <label className="label">
              Email
              <input
                className="input"
                type="email"
                placeholder="partner@restaurant.com"
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
            <label className="label">
              Address
              <textarea
                className="input"
                rows={1}
                placeholder="Street, City, State, ZIP"
                name="address"
              />
            </label>
            <div className="row">
              <a className="link" href="/food-partner/login">
                Already a partner?
              </a>
              <a className="link" href="/user/register">
                User sign up
              </a>
            </div>
            <div className="actions">
              <button className="button" type="submit">
                Create Partner Account
              </button>
            </div>
          </form>
          <div className="helper">
            Start with essentials — we’ll keep it simple.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegister;
