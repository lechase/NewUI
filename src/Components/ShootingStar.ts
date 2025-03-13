import { useEffect, useState } from "react";

interface ShootingStarProps {
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  angle: number;
}

const ShootingStar = ({ 
  size, 
  x, 
  y, 
  delay, 
  duration,
  angle 
}: ShootingStarProps) => {
  const [active, setActive] = useState(false);
  
  useEffect(() => {
    // Initial delay before shooting star appears
    const initialTimer = setTimeout(() => {
      setActive(true);
      
      // Reset after animation completes
      const resetTimer = setTimeout(() => {
        setActive(false);
        
        // Reactivate after a delay for continuous effect
        const reactivateTimer = setTimeout(() => {
          setActive(true);
        }, Math.random() * 15000 + 5000);
        
        return () => clearTimeout(reactivateTimer);
      }, duration * 1000);
      
      return () => clearTimeout(resetTimer);
    }, delay * 1000);
    
    return () => clearTimeout(initialTimer);
  }, [active, delay, duration]);

  return (
    <>
      {active && (
        <div className="relative">
          {/* The star itself */}
          <div
            className="shooting-star animate-shoot-down"
            style={{
              width: `${size}px`,
              height: `${size * 1.5}px`,
              left: `${x}px`,
              top: `${y}px`,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.5) 60%, transparent)",
              borderRadius: "50% 50% 20% 20%",
              filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))",
              animationDuration: `${duration}s`,
              transform: `rotate(${angle}deg)`,
            }}
          />
          
          {/* The trail */}
          <div
            className="star-trail animate-shoot-down"
            style={{
              left: `${x + size/2}px`,
              top: `${y + size}px`,
              width: "1.5px",
              height: `${size * 6}px`,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)",
              animationDuration: `${duration}s`,
              transform: `rotate(${angle}deg)`,
              transformOrigin: "top center",
            }}
          />
        </div>
      )}
    </>
  );
};

export default ShootingStar;
