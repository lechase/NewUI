import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "./Signup.css";

const Signup = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Delay to ensure the modal is rendered before adding active classes
      setTimeout(() => setIsActive(true), 50);
    } else {
      setIsActive(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup:", { name, email, password });
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isActive ? "active" : ""}`}>
      <div className={`modal-content ${isActive ? "active" : ""}`}>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <div className={`auth-container ${isActive ? "active" : ""}`}>
          <h2>Create Account</h2>
          <p className="subtitle">Join us today! Please enter your details</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
