import React from "react";
import "./Features.css";
import { Heart } from "lucide-react";
import FeatureCard from "./FeatureCard/FeatureCard";
import FishSvg from "../../Asset/HoroScope/FishSvg";
import BalancerSvg from "../../Asset/HoroScope/BalancerSvg";
import GoatSvg from "../../Asset/HoroScope/GoatSvg";
import LionSvg from "../../Asset/HoroScope/LionSvg";
import HorseManSvg from "../../Asset/HoroScope/HorseManSvg";
import BullSvg from "../../Asset/HoroScope/BullSvg";
import SingleGirlSvg from "../../Asset/HoroScope/SingleGirlSvg";
import LoveSvg from "../../Asset/HoroScope/LoveSvg";
import ManWithPotSvg from "../../Asset/HoroScope/ManWithPotSvg";
 let  Cards = [
  { 
    Id:1,
    Name:"Dream Meaning",
    Svg:<FishSvg width={"150px"} height={"150px"} fill={"#800000"}/>
  },
  { 
    Id:2,
    Name:"My Zodiac Information",
    Svg:<BalancerSvg width={"150px"} height={"150px"} fill={"#800000"}/>
  },
  { 
    Id:3,
    Name:"Tarot Reading",
    Svg:<GoatSvg width={"150px"} height={"150px"} fill={"#800000"}/>
  },
  { 
    Id:4,
    Name:"Get Your Numerology Reading",
    Svg:<LionSvg width={"150px"} height={"150px"} fill={"#800000"}/>
  },
  { 
    Id:5,
    Name:"Know Vocational Map",
    Svg:<HorseManSvg width={"150px"} height={"150px"} fill={"#800000"}/>
  },
  { 
    Id:6,
    Name:"Discover Your Power Animal",
    Svg:<ManWithPotSvg width={"150px"} height={"150px"} fill={"#800000"}/>
  },
  { 
    Id:7,
    Name:"Crate Your Birth Chart",
    Svg:<SingleGirlSvg width={"150px"} height={"150px"} fill={"#800000"}/>
  },
  { 
    Id:8,
    Name:"Love Calculator",
    Svg:<Heart size={"1px"} width={"150px"} height={"150px"} stroke={"#800000"} strokeWidth={"0.5px"}/>
  },
  { 
    Id:9,
    Name:"Chinese Zodiac",
    Svg:<BullSvg width={"150px"} height={"150px"} fill={"#800000"}/>
  },

 

]

const Features = () => {
  return (
    <>
  
    
    <div className="feature-outer">
  
   
    <div className="features" >
    <h1 className="feature-title">What are you looking for ?</h1>
    <div className="features-container">

   <FeatureCard Cards={Cards} />
    </div>
   </div>
   </div>

    

    
     
   
    {/* // <div className="features" style={{border:`4px solid red`}}>
    //   <div className="feature-card">
    //     <img
    //       src="https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    //       alt="Daily Horoscope"
    //     />
    //     <h3>Daily Horoscope</h3>
    //     <p>Personalized daily insights based on your zodiac sign</p>
    //   </div>

    //   <div className="feature-card">
    //     <img
    //       src="https://images.unsplash.com/photo-1575424909138-46b05e5919ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    //       alt="Birth Chart"
    //     />
    //     <h3>Birth Chart Analysis</h3>
    //     <p>Deep dive into your celestial blueprint</p>
    //   </div>

    //   <div className="feature-card">
    //     <img
    //       src="https://images.unsplash.com/photo-1546188994-07c34f6e5e1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    //       alt="AI Chat"
    //     />
    //     <h3>AI Astrology Chat</h3>
    //     <p>Get instant answers to your cosmic questions</p>
    //   </div>
    // </div> */}



    </>
  );
};

export default Features;
