import "./ModalWithForm.css";

const ModalWithForm = ({
  name,
  onSubmit,
  isOpen,
  title,
  buttonText = "Add garment",
  onClose,
  children,
}) => (
  <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
    <div className="modal__content">
      <h2 className="modal__title">{title}</h2>
      <button
        onClick={onClose}
        type="button"
        className="modal__close"
        aria-label="Close form modal"
      ></button>
      <form onSubmit={onSubmit} className="modal__form">
        {children}
        <button type="submit" className="modal__submit">
          {buttonText}
        </button>
      </form>
    </div>
  </div>
);

export default ModalWithForm;