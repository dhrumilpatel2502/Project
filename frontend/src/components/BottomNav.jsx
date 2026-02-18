import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/reels.css";

const BottomNav = () => {
  return (
    <nav className="bottomNav" aria-label="Primary">
      <NavLink to="/" end className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}>
        <span className="icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z" fill="currentColor" />
          </svg>
        </span>
        <span className="label">Home</span>
      </NavLink>
      <NavLink to="/saved" className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}>
        <span className="icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-3-7 3V4a1 1 0 0 1 1-1z" fill="currentColor" />
          </svg>
        </span>
        <span className="label">Saved</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;