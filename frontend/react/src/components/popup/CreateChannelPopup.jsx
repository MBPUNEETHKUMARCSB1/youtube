import React, { useState } from "react";
import axios from "axios";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import "./CreateChannelPopup.css";

const CreateChannelPopup = ({ isOpen, onClose, token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For static dummy image

  const handleImageSelect = () => {
    // Static dummy image logic
    setSelectedImage("https://via.placeholder.com/150"); // Dummy image URL
  };

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/channels",
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Channel Created:", response.data);
      onClose(); // Close the popup after successful creation
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>Create Channel</h2>
        <form onSubmit={handleCreateChannel}>
          <input
            type="text"
            placeholder="Channel Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <small className="helper-text">
            Enter the name of your new channel.
          </small>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <small className="helper-text">
            Briefly describe your channel’s purpose.
          </small>

          {/* Static Dummy Image Selector */}
          <div className="image-selector" onClick={handleImageSelect}>
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" className="dummy-image" />
            ) : (
              <div className="image-placeholder">Click to select an image</div>
            )}
          </div>
          <small className="helper-text">
            Choose a image for your channel.
          </small>

          <div className="popup-actions">
            <button type="submit">Create Channel</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelPopup;
