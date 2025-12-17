import React, { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function ItemModal({ activeModal, onClose, card, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  if (activeModal !== "preview" || !card) return null; // only render when needed

  const isOwn = card.owner === currentUser?._id; // check if current user owns this item

  const handleDeleteClick = () => {
    setIsConfirmDeleteOpen(true); // open confirm modal
  };

  const handleConfirmDelete = () => {
    onDeleteItem(card._id); // call App handler
    setIsConfirmDeleteOpen(false);
    onClose(); // close preview modal
  };

  return (
    <>
      {/* Preview Modal */}
      <div
        className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}
      >
        <div className="modal__content modal__content_type_image">
          <button
            onClick={onClose}
            type="button"
            className="item-modal__close"
            aria-label="Close preview modal"
          ></button>

          <div className="modal__header">
            

            {isOwn && (
              <button
                type="button"
                className="modal__delete-btn"
                onClick={handleDeleteClick}
              >
                Delete item
              </button>
            )}
          </div>
          <img src={card.imageUrl} alt={card.name} className="modal__image" />
          <h2 className="modal__title">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <div className={`modal ${isConfirmDeleteOpen ? "modal_opened" : ""}`}>
    <div className="modal__content">
       <button
        onClick={onClose}
        type="button"
        className="modal__close"
        aria-label="Close form modal"
      ></button>
        {/* Static message */}
      <p className="modal__content_type_confirm" > 
        Are you sure you want to delete this item?
      </p>

  <p className="modal__confirm-text" >
              This action is irreversible.
  </p>

  {/* Yes. Delete item button */}
  <button
    type="button"
    className="modal__button modal__button_delete"
  onClick = {handleConfirmDelete}
  >
    Yes, delete item
  </button>

  {/* Cancel button */}
  <button
    type="button"
    className="modal__button modal__button_cancel"
    onClick={() => setIsConfirmDeleteOpen(false)}
  >
    Cancel
  </button>
</div></div>
    </>
  );
}

export default ItemModal;
