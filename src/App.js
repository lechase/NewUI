import React,{Suspense} from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./Components/Comman/ErrorBoundry";

const Home =  React.lazy(()=> import("./Pages/HomePage/HomePage"));
const  ChatComponent =  React.lazy(()=> import("./Components/Chat/ChatComponent"));

function App() {
  return (
    <ErrorBoundary fallback="Error">
    <Suspense  fallback={<div className='absolute top-0 w-full min-h-screen'>Loading...</div>}>
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatComponent />} />
        </Routes>
      </div>
    </Router>
    </Suspense>
    </ErrorBoundary>
  );
}

export default App;
