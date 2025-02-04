import React from "react";
import { useNavigate } from "react-router-dom";
import "./VideoGrid.css";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/video/${video._id}`, { state: { video } });
  };

  return (
    <div className="video-card" onClick={handleVideoClick}>
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="video-card__thumbnail"
      />
      <h3 className="video-card__title">{video.title}</h3>
      <p className="video-card__details">
        {video.channel.name} • {video.views} views
      </p>
    </div>
  );
};

export default VideoCard;
