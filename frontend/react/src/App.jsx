import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import VideoPlayer from "./pages/VideoPlayer/VideoPlayer";
import Channel from "./Pages/Channel/Channel";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

const App = () => {
  useEffect(() => {
    // Auto-login if token exists in localStorage
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setLoggedIn(true);
      setUserLogo(
        "https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0"
      ); // Use actual user image if available
    }
  }, []);
  const [isLoggedIn, setLoggedIn] = useState(false); // Manage login state
  const [userLogo, setUserLogo] = useState(""); // Store user profile logo

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} userLogo={userLogo} />}
          />
          <Route
            path="/video/:id"
            element={
              <VideoPlayer isLoggedIn={isLoggedIn} userLogo={userLogo} />
            }
          />
          <Route
            path="/channel/:id"
            element={<Channel isLoggedIn={isLoggedIn} userLogo={userLogo} />}
          />
          <Route
            path="/login"
            element={
              <Login setLoggedIn={setLoggedIn} setUserLogo={setUserLogo} />
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
