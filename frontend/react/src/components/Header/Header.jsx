import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { CiSearch } from "react-icons/ci";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { CiBellOn } from "react-icons/ci";
import CreateChannelPopup from "../popup/CreateChannelPopup";
import "./Header.css";

const Header = ({ isLoggedIn, userLogo, token, setSearchQuery = "" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const togglePopup = () => setIsPopupOpen((prev) => !prev);

  const handleSignIn = () => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearchQuery = value;
    console.log(setSearchQuery);
  };

  return (
    <>
      <header className="header">
        <div className="header-main">
          <button className="header__hamburger" onClick={toggleSidebar}>
            ☰
          </button>
          <div className="header__logo">
            <a href="/">
              <img
                src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo.png"
                alt="YouTube Clone Logo"
              />
            </a>
          </div>
        </div>
        <div className="header__search">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <button>
            <CiSearch />
          </button>
        </div>
        <div className="header__actions">
          {isLoggedIn && (
            <div className="header__icon">
              <span onClick={togglePopup}>
                <MdOutlineCreateNewFolder />
              </span>
            </div>
          )}
          <CreateChannelPopup
            isOpen={isPopupOpen}
            onClose={togglePopup}
            token={token}
          />
          <div className="header__icon">
            <span>
              <CiBellOn />
            </span>
            <span className="header__badge">
              {Math.floor(Math.random() * 100)}
            </span>
          </div>
          {isLoggedIn ? (
            <img src={userLogo} alt="User Logo" className="header__userLogo" />
          ) : (
            <button className="header__signin" onClick={handleSignIn}>
              Sign In
            </button>
          )}
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
