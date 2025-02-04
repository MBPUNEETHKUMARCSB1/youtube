import React from "react";
import { FaFileInvoice } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const categories = [
    "All",
    "Music",
    "Gaming",
    "Sports",
    "News",
    "Education",
    "Technology",
    "Comedy",
  ];

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <button className="sidebar__close" onClick={toggleSidebar}>
        ✖
      </button>
      {categories.map((category, index) => (
        <button key={index} className="sidebar__button">
          <FaFileInvoice />
          {category}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
