import React from "react";
import { Star, Instagram, Twitter, Facebook } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Astro Insights</h3>
          <p>Guiding you through the cosmic journey of self-discovery</p>
          <div className="social-links">
            <a href="#">
              <Instagram />
            </a>
            <a href="#">
              <Twitter />
            </a>
            <a href="#">
              <Facebook />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#">Daily Horoscope</a>
            </li>
            <li>
              <a href="#">Birth Chart</a>
            </li>
            <li>
              <a href="#">Compatibility</a>
            </li>
            <li>
              <a href="#">Tarot Reading</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Astrology Guide</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Astro Insights. All rights reserved.</p>
        <Star className="footer-star" />
      </div>
    </footer>
  );
};

export default Footer;
