import { useState } from "react";
import { NavLink, Link } from 'react-router-dom';

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import "./Header.css";

import logos from "../../assets/logos.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  
   return (
    <header className="header">
      <div className="header__left">
       <Link to="/" className="header__logo-link">
      <img className="header__logo" src={logos} alt="App logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      </div>

      <div className="header__right">
      <ToggleSwitch /> 
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      > 
        + Add clothes
      </button> 
      <NavLink className="header__nav-link" to="/profile">
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
      </NavLink>  
      </div>
    </header>
   );
}


export default Header;
