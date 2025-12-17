import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const { values, handleChange } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };


  return (
    <ModalWithForm
      name="register"
      title="Sign Up"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Next"
      secondaryButtonText="or Log In"
      secondaryButtonAction={()=>console.log("buttonClick")}
    >

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        className="modal__input"
        
      />
      
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        className="modal__input"
        
      />

      <input
        name="name"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        className="modal__input"
      />
      <input
        name="avatar"
        placeholder="Avatar URL"
        value={values.avatar}
        onChange={handleChange}
        className="modal__input"
      />
      
      
    </ModalWithForm>
  );
};

export default RegisterModal;