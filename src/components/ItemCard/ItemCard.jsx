import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";


function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleLike = (e) => {
    e.stopPropagation();
    if (!currentUser) return;
    onCardLike(item);
  };

  return (
    <li className="card">
      <div className="card__top">
        <h2 className="card__name">{item.name}</h2>

        {currentUser && (
          <button
            onClick={handleLike}
            className={`card__heart ${isLiked ? "card__heart_liked" : ""}`}
          />
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