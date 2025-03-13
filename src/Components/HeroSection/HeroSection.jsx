import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

/* ==============================================
   Star Field Animation Code (Vanilla JS)
   ============================================== */

// Get device pixel ratio for high resolution displays
const dpr = window.devicePixelRatio || 1;

// Canvas contexts (will be linked later to React refs)
let ctx, ctxMw;

// Constants for starfield
const sNumber = 600;              // number of Stars
const sSize = 0.3;                // minimum size of Star
const sSizeR = 0.6;               // randomness of the size of Stars
const sAlphaR = 0.5;              // randomness of alpha for stars
const sMaxHueProportion = 0.6;      // max proportion of displayed base hue

// Shooting stars parameters (slowed down)
const shootingStarDensity = 0.01;
const shootingStarBaseXspeed = 10; // reduced from 30 to slow down horizontal movement
const shootingStarBaseYspeed = 5;  // reduced from 15 to slow down vertical movement
const shootingStarBaseLength = 8;
const shootingStarBaseLifespan = 60;
// Shooting star colors
const shootingStarsColors = [
  "#a1ffba", // greenish
  "#a1d2ff", // blueish
  "#fffaa1", // yellowish
  "#ffa1a1"  // reddish
];

// Milky Way constants
const mwStarCount = 100000;       // amount of static stars not clustered in the milky way
const mwRandomStarProp = 0.2;       // proportion of stars completely random in the milky way
const mwClusterCount = 300;       // amount of clusters in the milky way
const mwClusterStarCount = 1500;  // amount of stars per cluster
const mwClusterSize = 120;        // minimum size of a cluster
const mwClusterSizeR = 80;        // randomness of the size of a cluster
const mwClusterLayers = 10;       // amount of layers per cluster to draw
const mwAngle = 0.6;              // to incline the milky way (0 is horizontal, higher values incline more)
const mwHueMin = 150;             // min hue for a cluster (150 is green)
const mwHueMax = 300;             // max hue for a cluster (300 is pink)
const mwWhiteProportionMin = 50;  // minimum base percentage of white in cluster hue
const mwWhiteProportionMax = 65;  // maximum base percentage of white in cluster hue

// Random arrays
let randomArray;
const randomArrayLength = 1000;
let randomArrayIterator = 0;
let hueArray;
const hueArrayLength = 1000;

// Arrays for stars
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
    this.randomIndexa = this.randomIndexa >= randomArrayLength - 1 ? 0 : this.randomIndexa + 1;
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

// Milky Way Star Cluster class
class MwStarCluster {
  constructor(x, y, size, hue, baseWhiteProportion, brightnessModifier) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.hue = hue;
    this.baseWhiteProportion = baseWhiteProportion;
    this.brightnessModifier = brightnessModifier;
  }
  draw() {
    let starsPerLayer = Math.floor(mwClusterStarCount / mwClusterLayers);
    for (let layer = 1; layer < mwClusterLayers; layer++) {
      let layerRadius = (this.size * layer) / mwClusterLayers;
      for (let i = 1; i < starsPerLayer; i++) {
        let posX = this.x + 2 * layerRadius * (Math.random() - 0.5);
        let posY =
          this.y +
          2 *
            Math.sqrt(Math.pow(layerRadius, 2) - Math.pow(this.x - posX, 2)) *
            (Math.random() - 0.5);
        let size = 0.05 + Math.random() * 0.15;
        let alpha = 0.3 + Math.random() * 0.4;
        let whitePercentage =
          this.baseWhiteProportion +
          15 +
          15 * this.brightnessModifier +
          Math.floor(Math.random() * 10);
        ctxMw.beginPath();
        ctxMw.arc(posX, posY, size, 0, Math.PI * 2, false);
        ctxMw.fillStyle =
          "hsla(" + this.hue + ",100%," + whitePercentage + "%," + alpha + ")";
        ctxMw.fill();
      }
    }
    // Extra gradient for the cluster
    let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, "hsla(" + this.hue + ",100%," + this.baseWhiteProportion + "%,0.002)");
    gradient.addColorStop(
      0.25,
      "hsla(" +
        this.hue +
        ",100%," +
        (this.baseWhiteProportion + 30) +
        "%," +
        (0.01 + 0.01 * this.brightnessModifier) +
        ")"
    );
    gradient.addColorStop(
      0.4,
      "hsla(" + this.hue + ",100%," + (this.baseWhiteProportion + 15) + "%,0.005)"
    );
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctxMw.beginPath();
    ctxMw.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctxMw.fillStyle = gradient;
    ctxMw.fill();
  }
}

// Initialization for star arrays and random values
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
  DrawMilkyWayCanvas();
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
    let color = shootingStarsColors[Math.floor(Math.random() * shootingStarsColors.length)];
    ShootingStarsArray.push(new ShootingStar(posX, posY, speedX, speedY, color));
  }
  // Update shooting stars and remove if expired
  for (let i = ShootingStarsArray.length - 1; i >= 0; i--) {
    if (ShootingStarsArray[i].goingOut()) {
      ShootingStarsArray.splice(i, 1);
    } else {
      ShootingStarsArray[i].update();
    }
  }
  randomArrayIterator = (randomArrayIterator + 1) % randomArrayLength;
}

// Helpers for milky way positioning
function MilkyWayX() {
  return Math.floor(Math.random() * window.innerWidth);
}
function MilkyWayYFromX(xPos, mode) {
  let offset = ((window.innerWidth / 2) - xPos) * mwAngle;
  if (mode === "star") {
    return (
      Math.floor(
        Math.pow(Math.random(), 1.2) * window.innerHeight * (Math.random() - 0.5) +
          window.innerHeight / 2 +
          (Math.random() - 0.5) * 100
      ) + offset
    );
  } else {
    return (
      Math.floor(
        Math.pow(Math.random(), 1.5) * window.innerHeight * 0.6 * (Math.random() - 0.5) +
          window.innerHeight / 2 +
          (Math.random() - 0.5) * 100
      ) + offset
    );
  }
}

// Draw the Milky Way on its canvas
function DrawMilkyWayCanvas() {
  for (let i = 0; i < mwStarCount; i++) {
    ctxMw.beginPath();
    let xPos = MilkyWayX();
    let yPos =
      Math.random() < mwRandomStarProp
        ? Math.floor(Math.random() * window.innerHeight)
        : MilkyWayYFromX(xPos, "star");
    let size = Math.random() * 0.27;
    ctxMw.arc(xPos, yPos, size, 0, Math.PI * 2, false);
    let alpha = 0.4 + Math.random() * 0.6;
    ctxMw.fillStyle = "hsla(0,100%,100%," + alpha + ")";
    ctxMw.fill();
  }
  for (let i = 0; i < mwClusterCount; i++) {
    let xPos = MilkyWayX();
    let yPos = MilkyWayYFromX(xPos, "cluster");
    let distToCenter =
      (1 - Math.abs(xPos - window.innerWidth / 2) / (window.innerWidth / 2)) *
      (1 - Math.abs(yPos - window.innerHeight / 2) / (window.innerHeight / 2));
    let size = mwClusterSize + Math.random() * mwClusterSizeR;
    let hue = mwHueMin + Math.floor((Math.random() * 0.5 + distToCenter * 0.5) * (mwHueMax - mwHueMin));
    let baseWhiteProportion = mwWhiteProportionMin + Math.random() * (mwWhiteProportionMax - mwWhiteProportionMin);
    new MwStarCluster(xPos, yPos, size, hue, baseWhiteProportion, distToCenter).draw();
  }
}

// Function to start the animation sequence
function startAnimation() {
  init();
  animate();
}

/* ==============================================
   React HeroSection Component
   ============================================== */

const HeroSection = () => {
  const starsCanvasRef = useRef(null);
  const milkyWayCanvasRef = useRef(null);

  useEffect(() => {
    // Setup stars canvas
    const canvas = starsCanvasRef.current;
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    // Setup milky way canvas
    const canvasMw = milkyWayCanvasRef.current;
    ctxMw = canvasMw.getContext("2d");
    canvasMw.width = window.innerWidth * dpr;
    canvasMw.height = window.innerHeight * dpr;
    ctxMw.scale(dpr, dpr);

    // Start the starfield animation
    startAnimation();

    // Update canvas sizes on window resize
    const handleResize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvasMw.width = window.innerWidth * dpr;
      canvasMw.height = window.innerHeight * dpr;
      ctxMw.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="hero-container">
      <canvas ref={starsCanvasRef} id="starsCanvas" style={{ position: "absolute", top: 0, left: 0 }}></canvas>
      <canvas ref={milkyWayCanvasRef} id="milkyWayCanvas" style={{ position: "absolute", top: 0, left: 0 }}></canvas>
      <div className="title-sections" style={{ position: "relative", zIndex: 1 }}>
        <div className="title-container">
          <div className="title-content">
            <h1>Read your Future with AI Astrologer</h1>
            <span>"Astrology is the mathematics of your life, using planetary positions to reveal what the future holds."</span>
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
