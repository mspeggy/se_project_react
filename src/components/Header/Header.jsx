import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logos from "../../assets/logos.svg";
import avatarPlaceholder from "../../assets/avatar.png";

const Header = ({
  currentUser,
  onLogin,
  onRegister,
  handleAddClick,
  weatherData,
}) => {
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

        {/* Add Item button only for logged-in users */}
        {currentUser && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
        )}

        {/* Profile info or login/signup buttons */}
        {currentUser ? (
          <Link to="/profile" className="header__nav-link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              <img
                src={currentUser?.avatar || avatarPlaceholder}
                alt={currentUser?.name}
                className="header__avatar"
              />
            </div>
          </Link>
        ) : (
          <div className="header__auth-buttons">
            <button className="header__button" onClick={onRegister}>
              Sign Up
            </button>
            <button className="header__button" onClick={onLogin}>
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;