import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import VideoGrid from "../../components/VideoGrid/VideoGrid";
import "./Home.css";

const Home = ({ isLoggedIn, userLogo }) => {
  return (
    <div className="home">
      <Header isLoggedIn={isLoggedIn} userLogo={userLogo} />
      <div className="home__body">
        <Sidebar />
        <div className="home__content">
          <VideoGrid />
        </div>
      </div>
    </div>
  );
};

export default Home;
