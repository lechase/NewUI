import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "./Modal.css";

export default function Modal({ isOpen, onClose,Content }) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      if (isOpen) {
        // Delay to ensure the modal is rendered before adding active classes
        setTimeout(() => setIsActive(true), 50);
      } else {
        setIsActive(false);
      }
    }, [isOpen]);
  return (
     <>
     
     <div className={`modal-overlay ${isActive ? "active" : ""}`}>

      <div className={`modal-content ${isActive ? "active" : ""}`}>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <div className={`auth-container ${isActive ? "active" : ""}`}>
            {Content}
        </div>
      </div>
    </div>
     
     
     </>
  )
}




