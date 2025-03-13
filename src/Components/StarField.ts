import { useEffect, useState, useRef } from "react";
import Star from "./Star";
import ShootingStar from "./ShootingStar";
import { generateStars, generateShootingStars, throttle } from "../utils/starUtils";

const StarField = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [stars, setStars] = useState<any[]>([]);
  const [shootingStars, setShootingStars] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize stars based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };
    
    // Initial sizing
    updateDimensions();
    
    // Handle resizing
    const handleResize = throttle(updateDimensions, 200);
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Generate stars when dimensions change
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      // Number of stars scales with screen size
      const starDensity = 0.00025; // Stars per pixel
      const starCount = Math.round(dimensions.width * dimensions.height * starDensity);
      const shootingStarCount = Math.max(2, Math.floor(starCount * 0.02)); // 2% of stars are shooting stars
      
      setStars(generateStars(starCount, dimensions.width, dimensions.height));
      setShootingStars(generateShootingStars(shootingStarCount, dimensions.width, dimensions.height));
    }
  }, [dimensions]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F1729 0%, #1A1F2C 50%, #0B1026 100%)",
      }}
    >
      {stars.map((star) => (
        <Star
          key={star.id}
          size={star.size}
          x={star.x}
          y={star.y}
          twinkleDelay={star.twinkleDelay}
          glowDelay={star.glowDelay}
          brightness={star.brightness}
          isYellowish={star.isYellowish}
          twinkleSpeed={star.twinkleSpeed}
          glowSpeed={star.glowSpeed}
          opacity={star.opacity}
        />
      ))}
      
      {shootingStars.map((shootingStar) => (
        <ShootingStar
          key={shootingStar.id}
          size={shootingStar.size}
          x={shootingStar.x}
          y={shootingStar.y}
          delay={shootingStar.delay}
          duration={shootingStar.duration}
          angle={shootingStar.angle}
        />
      ))}
    </div>
  );
};

export default StarField;
