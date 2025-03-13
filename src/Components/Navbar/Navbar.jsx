import React from "react";
import { Stars } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Stars className="logo-icon" />
        <h1>Astroyapper</h1>
      </div>
    </nav>
  );
};

export default Navbar;
