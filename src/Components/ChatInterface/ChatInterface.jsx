import React, { useState,useRef  } from "react";
import { Send, Bot, Sparkles } from "lucide-react";
import "./ChatInterface.css";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      text: "Welcome to your cosmic guide! Ask me anything about astrology, your zodiac sign, or cosmic energies...",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);


  
    const targetRef = useRef(null);
  
    const handleScroll = () => {
      targetRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm channeling the cosmic energies to provide you with celestial insights. What aspects of your astrological journey would you like to explore?",
          isUser: false,
        },
      ]);
      handleScroll()
    }, 1500);
  };

  return (
    <>
      <div className="chat-container">
      <div className="chat-header">
        <span>Cosmic Guide</span>
        <Sparkles className="header-icon" />
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? "user" : "bot"}`}
          >
            {!message.isUser && <Sparkles className="bot-icon" />}
            <p>{message.text}</p>
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={targetRef} className="target_div" ></div>
      </div>
    
    </div>
    <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your cosmic destiny..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="send-button">
          <Send className="send-icon" />
        </button>
      </div>
    
    
    </>
  
  );
};

export default ChatInterface;
