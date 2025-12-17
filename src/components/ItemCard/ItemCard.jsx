import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heartIcon from "../../images/heart.svg";
import "./ItemCard.css";


function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Card click → open preview modal
  const handleCardClick = () => {
    onCardClick(item);
  };

  // Whether this user already liked the item
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  // Classname for like button
  const likeButtonClass = `item__like-button ${
    isLiked ? "item__like-button_liked" : ""
  }`;

  // When clicking the like button
  const handleLike = () => {
     e.stopPropagation();
    if (!currentUser) return; // not logged in → do nothing
    onCardLike(item);
  };

  return (
    <li className="card">
        {/* Name centered + heart pinned right */}
      <div className="card__top">
        <h2 className="card__name">{item.name}</h2>

       {currentUser && (
        <button onClick={handleLike} className={`card__heart ${isLiked ? "card__heart_liked" : ""}`}>
          {/* <img
            src={heartIcon}
            alt="like"
            className={`card__heart ${isLiked ? "card__heart_liked" : ""}`}
            
          /> */}
          </button> 
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />      
    </li>
  );
}

export default ItemCard;