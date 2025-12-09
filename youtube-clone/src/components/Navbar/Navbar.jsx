import React from "react";
import "../Navbar/navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setSidebar }) => {
  const navigate = useNavigate()
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img className="menu-icon" onClick={() => setSidebar(pre => pre === false ? true : false)} src={menu_icon} alt="" />
        <div className="Title-logo" onClick={()=>navigate('/')}>
          <img className="logo" src="/youtube.png" alt="" />
          <h1 className="showtube">ShowTube</h1>

        </div>

      </div>
      <div className="nav-middle flex div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" />
          <img src={searchIcon} alt="" />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification} alt="" />
        <img className="user-icon" src="https://avatar.iran.liara.run/public/boy" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
