import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "./Login.css";

const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       // Delay to ensure the modal is rendered before adding active classes
//       setTimeout(() => setIsActive(true), 50);
//     } else {
//       setIsActive(false);
//     }
//   }, [isOpen]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log("Login:", { email, password });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className={`modal-overlay ${isActive ? "active" : ""}`}>
//       <div className={`modal-content ${isActive ? "active" : ""}`}>
//         <button className="close-button" onClick={onClose}>
//           <X size={24} />
//         </button>
//         <div className={`auth-container ${isActive ? "active" : ""}`}>
//           <h2>Welcome Back</h2>
//           <p className="subtitle">Please enter your details to sign in</p>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 required
//               />
//             </div>
//             <div className="form-options">
//               <label className="remember-me">
//                 <input type="checkbox" /> Remember me
//               </label>
//               <a href="#" className="forgot-password">
//                 Forgot password?
//               </a>
//             </div>
//             <button type="submit" className="submit-button">
//               Sign in
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Login;
