import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./VideoPlayer.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

const VideoPlayer = ({ isLoggedIn, userLogo }) => {
  const location = useLocation();
  const videoId = location.state?.video?._id || "";
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const videoResponse = await axios.get(
          `http://localhost:5000/api/videos/${videoId}`
        );
        setVideo(videoResponse.data);

        const commentsResponse = await axios.get(
          `http://localhost:5000/api/comments/${videoId}`
        );
        setComments(commentsResponse.data);

        const channelResponse = await axios.get(
          `http://localhost:5000/api/channels/${videoResponse.data.channel._id}`
        );
        setChannel(channelResponse.data);
      } catch (error) {
        console.error("Error fetching video or comments:", error);
      }
    };

    if (videoId) fetchVideoDetails();
  }, [videoId]);

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/videos");
        setRecommendedVideos(
          response.data.filter((vid) => vid._id !== videoId)
        );
      } catch (error) {
        console.error("Error fetching recommended videos:", error);
      }
    };

    fetchRecommendedVideos();
  }, [videoId]);

  const handleAddComment = async () => {
    const token = localStorage.getItem("token");
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/comments",
        {
          text: newComment,
          videoId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleChannelFunction = async (id) => {
    navigate(`/channel/${id}`);
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!video || !channel) {
    return <div>Loading video...</div>;
  }

  return (
    <div className="video-player-page">
      <Header isLoggedIn={isLoggedIn} userLogo={userLogo} />
      <Sidebar />
      <div className="video-content">
        <div className="main-video">
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${
              video.videoUrl.split("=")[1]
            }`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h2>{video.title}</h2>
          <p>{video.description}</p>

          <div className="video-details">
            <p>
              {video.views} views • {new Date().getFullYear()}
            </p>
            <div>
              <button>Like</button>
              <button>Dislike</button>
              <button>Share ↗</button>
            </div>
          </div>

          <div className="channel-info">
            <img
              onClick={() => (window.location.href = `/channel/${channel._id}`)}
              src={userLogo}
              alt={channel.name}
              className="channel-logo"
            />
            <div className="channel-details">
              <h4>{channel.name}</h4>
              <p>12k Subscribers</p>
              <div className="channel-actions">
                <button className="subscribe-btn">Subscribe</button>
                <button className="join-btn">Join</button>
              </div>
            </div>
          </div>

          <div className="comments-section">
            <h3>{comments.length} Comments</h3>
            <div className="add-comment">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <button onClick={handleAddComment}>Comment</button>
            </div>
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p className="flex">
                  <img
                    src={userLogo}
                    alt="User Logo"
                    className="header__userLogo"
                  />
                  <strong>{comment.user?.username || "Anonymous"}</strong> •{" "}
                  {new Date(comment.timestamp).toLocaleDateString()}
                  <div
                    className="delete-comment-btn"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    ❌
                  </div>
                </p>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="recommended-videos">
          <h3>Recommended Videos</h3>
          {recommendedVideos.map((vid) => (
            <div
              key={vid._id}
              className="recommended-video"
              onClick={() => (window.location.href = `/video/${vid._id}`)}
            >
              <img
                src={vid.thumbnailUrl}
                alt={vid.title}
                className="video-thumbnail"
              />
              <div className="video-info">
                <h4>{vid.title}</h4>
                <p>{vid.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
