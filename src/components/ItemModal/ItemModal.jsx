import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDeleteItem }) {
  if (activeModal !== "preview") return null; //only render when needed

  const handleDeleteClick = () => {
    onDeleteItem(card._id); //  pass ID to App handler
  };

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened":""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="item-modal__close"
          aria-label="Close preview modal"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__header">
          <h2 className="modal__title">{card.name}</h2>
           <button //Delete button
          type="button"
          className="modal__delete-btn"
          onClick={handleDeleteClick}
        >
          Delete item
        </button>
        </div>
        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
