import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Channel.css";
import VideoCard from "../../components/VideoGrid/VideoCard";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

const ChannelPage = ({ isLoggedIn, userLogo }) => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/channels/${id}`
        );
        let data = await response.json();

        // Add random data if missing
        if (!data.logo)
          data.logo =
            "https://yt3.googleusercontent.com/ytc/AIdro_muzDjR0hfGdlXBS-2A8NfR-Q9e-PO96K-gxrm2i1jSStI7=s120-c-k-c0x00ffffff-no-rj";
        if (!data.coverImage)
          data.coverImage =
            "https://yt3.googleusercontent.com/y7O-QDd0-OLA2ID8AZtNTgtHxKD_YRNIXRpEZDCdnX7n725Nqsr5kR1MCyw6wBdgZh4lGUDsweI=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj";
        if (!data.subscribers)
          data.subscribers =
            Math.floor(Math.random() * 100000) + " subscribers";
        if (!data.videos) data.videos = [];

        setChannel(data);
        console.log("Fetched Channel:", data);

        // Fetch video details correctly
        const videoDetails = await Promise.all(
          data.videos.map(async (videoObj) => {
            const videoId = videoObj._id || videoObj; // Extract actual ID
            console.log("Fetching Video ID:", videoId);

            const res = await fetch(
              `http://localhost:5000/api/videos/${videoId}`
            );
            if (!res.ok) throw new Error(`Failed to fetch video: ${videoId}`);

            return res.json();
          })
        );

        setVideos(videoDetails);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    fetchChannel();
  }, [id]);

  if (!channel) return <div>Loading...</div>;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} userLogo={userLogo} />
      <Sidebar />
      <div className="channel-page">
        <div
          className="channel-banner"
          style={{ backgroundImage: `url(${channel.coverImage})` }}
        ></div>
        <div className="channel-header">
          <img src={channel.logo} alt="Channel Logo" className="channel-logo" />
          <div className="channel-details">
            <h2>{channel.name}</h2>
            <p>@WWE • 107M subscribers • 81K videos</p>
            <p>
              WWE on YouTube is your number one spot to catch WWE original shows
              and exclusives!
            </p>
            <p>
              <a href="wwe.com/wheretowatch">wwe.com/wheretowatch</a> and 6 more
              links
            </p>
            <div className="channel-info">
              <p>{channel.description}</p>
            </div>
            <button className="subscribe-btn">🔔 Subscribe ᐯ</button>
          </div>
        </div>

        <nav className="channel-nav">
          <ul>
            <li className="active">Videos</li>
            <li>Playlists</li>
            <li>Community</li>
            <li>Store</li>
            <li>About</li>
          </ul>
        </nav>
        <div className="for-you-section">
          <h4>For You</h4>
        </div>
        <div className="video-grid">
          {videos.length > 0 ? (
            videos.map((video) => <VideoCard key={video._id} video={video} />)
          ) : (
            <p>No videos available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
