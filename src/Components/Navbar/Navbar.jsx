import React, { useState } from "react";

import { Moon, Sun, Stars } from "lucide-react";
import "./Navbar.css";

import Login_SignUp from "../Auth/Login_SignUp";
import {useGetProductQuery} from "../../API/Product";
const Navbar = () => {
console.log("klkflfsk",import.meta.env,process.env);
  const {data, error, isLoading} = useGetProductQuery();
console.log("data", data);

  const [authModal, setAuthModal] = useState({
    isOpen: false,
    type: "Login",
  });
 
  const openModal = (type) => {
  
    setAuthModal({ isOpen: true, type });
  };

  const closeModal = () => {
    setAuthModal({ ...authModal, isOpen: false });
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Stars className="logo-icon" />
          <h1>Astroyapper</h1>
        </div>
        <div className="nav-auth">
          <button
            className="nav-login"
            onClick={(e) => {
             e?.stopPropagation();
              openModal("Login");
            }}
          >
            Login
          </button>
          {/* <button className="nav-signup" onClick={() => openModal("Signup")}>
            Sign Up
          </button> */}
          <div className="theme-toggle">
            <Moon className="moon-icon" />
            <Sun className="sun-icon" />
          </div>
        </div>
      </nav>

    
      {authModal.isOpen &&  <Login_SignUp isOpen={authModal?.isOpen} onClose={closeModal} />}
    </>
  );
};

export default Navbar;
