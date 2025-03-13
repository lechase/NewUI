import React from "react";
import Features from "../../Components/Features/Features";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Footer from "../../Components/Footer/Footer";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home">
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
};

export default HomePage;
