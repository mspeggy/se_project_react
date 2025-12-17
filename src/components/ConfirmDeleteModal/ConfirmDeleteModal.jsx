import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
    <div className="modal__content">
     
    
      <p className="modal__text">
        This action is irreversible.

      </p>
      <button onClick = {onConfirm}> Yes. delete item</button>

      <button
        type="button"
        className="modal__button modal__button_cancel"
        onClick={onClose}
      >
        Cancel
      </button>
    </div></div>
  );
}