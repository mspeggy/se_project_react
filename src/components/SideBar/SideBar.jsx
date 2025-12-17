import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

export default function SideBar({ handleEditClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const hasAvatar =
    currentUser?.avatar && currentUser.avatar.trim() !== "";
  const userInitial = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "?";
  const userName = currentUser?.name || "User";

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        {hasAvatar ? (
          <img
            src={currentUser.avatar}
            alt={userName}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {userInitial}
          </div>
        )}
        <p className="sidebar__username">{userName}</p>
      </div>

      <div className="sidebar__actions">
        <button
          className="sidebar__button"
          onClick={handleEditClick}
          type="button"
        >
          Change profile data
        </button>

        <button
          className="sidebar__button sidebar__signout"
          onClick={onSignOut}
          type="button"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}