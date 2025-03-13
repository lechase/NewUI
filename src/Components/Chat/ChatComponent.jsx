import React from 'react'
import ChatInterface from '../ChatInterface/ChatInterface'
import { Star } from "lucide-react";
import "./ChatComponent.css";
export default function ChatComponent() {
  return (
     <div className="hero-section">
      <div className="hero-content">
        {/* <h1>Discover Your Cosmic Path</h1> */}
        <div className="chat-container-wrapper">
          <ChatInterface />
        </div>
        {/* <Star className="star-icon" /> */}
      </div>
    </div>
  )
}
