import React, { useEffect, useState } from "react";
import "./VideoGrid.css";
import VideoCard from "./VideoCard";

const VideoGrid = ({ searchQuery = "" }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/videos");
        const data = await response.json();
        console.log(data);
        setVideos(data);
        console.log(videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="video-grid">
      {filteredVideos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
