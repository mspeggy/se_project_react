import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

const LoginModal = ({ isOpen, onClose, onLogin,  }) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const [error , setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("")
    onLogin(values).catch(()=>setError("Email or password incorrect"));
  };

  return (
    <ModalWithForm
      name="login"
      title="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log In"
      secondaryButtonText="or Register"
      secondaryButtonAction={()=>console.log("buttonClick")}
    >
    
     
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        className="modal__input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        className="modal__input"
      />
     {error && <p className="modal__error">{error}</p>}
        
    </ModalWithForm>
  );
};

export default LoginModal;
