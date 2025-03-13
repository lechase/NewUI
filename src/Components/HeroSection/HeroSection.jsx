import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

// Device pixel ratio for high resolution displays
const dpr = window.devicePixelRatio || 1;

// Canvas context for the star field
let ctx;

// Constants for the star field
const sNumber = 1000;            // increased number of Stars
const sSize = 0.3;               // minimum size of Star
const sSizeR = 0.6;              // randomness of the size of Stars
const sAlphaR = 0.5;             // randomness of alpha for stars
const sMaxHueProportion = 0.6;     // max proportion of displayed base hue

// Shooting stars parameters
const shootingStarDensity = 0.03;  // increased density
const shootingStarBaseXspeed = 10;   // slower horizontal speed
const shootingStarBaseYspeed = 5;    // slower vertical speed
const shootingStarBaseLength = 8;
const shootingStarBaseLifespan = 60;
// Shooting star colors
const shootingStarsColors = [
  "#a1ffba", // greenish
  "#a1d2ff", // blueish
  "#fffaa1", // yellowish
  "#ffa1a1"  // reddish
];

// Random arrays
let randomArray;
const randomArrayLength = 1000;
let randomArrayIterator = 0;
let hueArray;
const hueArrayLength = 1000;

// Arrays for stars and shooting stars
let StarsArray;
let ShootingStarsArray;

// Star class
class Star {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.alpha = size / (sSize + sSizeR);
    this.baseHue = hueArray[Math.floor(Math.random() * hueArrayLength)];
    this.baseHueProportion = Math.random();
    this.randomIndexa = Math.floor(Math.random() * randomArrayLength);
    this.randomIndexh = this.randomIndexa;
    this.randomValue = randomArray[this.randomIndexa];
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    let rAlpha = this.alpha + Math.min((this.randomValue - 0.5) * sAlphaR, 1);
    let rHue =
      randomArray[this.randomIndexh] > this.baseHueProportion
        ? hueArray[this.randomIndexa]
        : this.baseHue;
    this.color = "hsla(" + rHue + ",100%,85%," + rAlpha + ")";
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.randomIndexh = this.randomIndexa;
    this.randomIndexa =
      this.randomIndexa >= randomArrayLength - 1 ? 0 : this.randomIndexa + 1;
    this.randomValue = randomArray[this.randomIndexa];
    this.draw();
  }
}

// ShootingStar class
class ShootingStar {
  constructor(x, y, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.framesLeft = shootingStarBaseLifespan;
    this.color = color;
  }
  goingOut() {
    return this.framesLeft <= 0;
  }
  ageModifier() {
    let halfLife = shootingStarBaseLifespan / 2.0;
    return Math.pow(1.0 - Math.abs(this.framesLeft - halfLife) / halfLife, 2);
  }
  draw() {
    let am = this.ageModifier();
    let endX = this.x - this.speedX * shootingStarBaseLength * am;
    let endY = this.y - this.speedY * shootingStarBaseLength * am;
    let gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
    gradient.addColorStop(0, "#fff");
    gradient.addColorStop(Math.min(am, 0.7), this.color);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
  update() {
    this.framesLeft--;
    this.x += this.speedX;
    this.y += this.speedY;
    this.draw();
  }
}

// Initialization for stars and shooting stars
function init() {
  // Create random arrays
  randomArray = Array.from({ length: randomArrayLength }, () => Math.random());
  hueArray = [];
  for (let i = 0; i < hueArrayLength; i++) {
    let rHue = Math.floor(Math.random() * 160);
    if (rHue > 60) rHue += 110;
    hueArray[i] = rHue;
  }
  StarsArray = [];
  for (let i = 0; i < sNumber; i++) {
    let size = Math.random() * sSizeR + sSize;
    let x = Math.random() * (window.innerWidth - size * 4) + size * 2;
    let y = Math.random() * (window.innerHeight - size * 4) + size * 2;
    StarsArray.push(new Star(x, y, size));
  }
  ShootingStarsArray = [];
}

// Main animation loop for stars and shooting stars
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  StarsArray.forEach((star) => star.update());
  // Create new shooting stars randomly
  if (randomArray[randomArrayIterator] < shootingStarDensity) {
    let posX = Math.floor(Math.random() * window.innerWidth);
    let posY = Math.floor(Math.random() * 150);
    let speedX = Math.floor((Math.random() - 0.5) * shootingStarBaseXspeed);
    let speedY = Math.floor(Math.random() * shootingStarBaseYspeed);
    let color =
      shootingStarsColors[Math.floor(Math.random() * shootingStarsColors.length)];
    ShootingStarsArray.push(new ShootingStar(posX, posY, speedX, speedY, color));
  }
  // Update shooting stars and remove expired ones
  for (let i = ShootingStarsArray.length - 1; i >= 0; i--) {
    if (ShootingStarsArray[i].goingOut()) {
      ShootingStarsArray.splice(i, 1);
    } else {
      ShootingStarsArray[i].update();
    }
  }
  randomArrayIterator = (randomArrayIterator + 1) % randomArrayLength;
}

// Function to start the animation sequence
function startAnimation() {
  init();
  animate();
}

const HeroSection = () => {
  const starsCanvasRef = useRef(null);

  useEffect(() => {
    // Setup the stars canvas
    const canvas = starsCanvasRef.current;
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    // Start the starfield animation
    startAnimation();

    // Resize listener to update canvas sizes on window resize
    const handleResize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="hero-container">
      <canvas
        ref={starsCanvasRef}
        id="starsCanvas"
        style={{ position: "absolute", top: 0, left: 0 }}
      ></canvas>
      <div className="title-sections" style={{ position: "relative", zIndex: 1 }}>
        <div className="title-container">
          <div className="title-content">
            <h1>Read your Future with AI Astrologer</h1>
            <span>
              "Astrology is the mathematics of your life, using planetary positions to reveal what the future holds."
            </span>
            <Link to="/chat">
              <button className="chat-button">Chat</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
