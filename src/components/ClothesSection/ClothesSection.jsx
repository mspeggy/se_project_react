import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({ clothingItems, onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your items</p>
        <button className="clothes-section__button">+ Add new</button>
      </div>

      <ul className="clothes-section__list">
        {clothingItems.map((item) => (
          <ItemCard item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

