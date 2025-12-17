import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  // Pre-fill form when the modal opens
  useEffect(() => {
    if (currentUser && isOpen) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save changes"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="modal__input"
        value={values.name}
        onChange={handleChange}
        required
      />

      <input
        type="url"
        name="avatar"
        placeholder="Avatar URL"
        className="modal__input"
        value={values.avatar}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
}