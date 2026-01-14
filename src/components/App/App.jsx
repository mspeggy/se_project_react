import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import * as api from "../../utils/api.js";
import * as auth from "../../utils/auth.js";

import { coordinates, WEATHER_API_KEY } from "../../utils/constants.js";


import "./App.css";

const App = () => {
  // Weather
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Modals
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // User
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Clothing items
  const [clothingItems, setClothingItems] = useState([]);

  // ------------------- Handlers -------------------
  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    if (isLoggedIn) setActiveModal("add-garment");
    else setIsLoginOpen(true);
  };

  const closeAllModals = () => {
    setActiveModal("");
    setIsEditProfileOpen(false);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const onAddItem = (inputValues, resetForm) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };
    const token = localStorage.getItem("jwt");
    return api
      .addItem(newCardData, token)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeAllModals();
        resetForm();
      })
      .catch(console.error);
  };

  const deleteItemHandler = (id) => {
    const token = localStorage.getItem("jwt");
    api
      .removeItem(id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
        closeAllModals();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    const isLiked = likes.some((id) => id === currentUser?._id);

    if (!isLiked) {
      api
        .addCardLike(_id, token)
        .then((updatedCard) =>
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          )
        )
        .catch(console.error);
    } else {
      api
        .removeCardLike(_id, token)
        .then((updatedCard) =>
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          )
        )
        .catch(console.error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    api
      .updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditProfileOpen(false);
      })
      .catch(console.error);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .register(name, avatar, email, password)
      .then(() => setIsRegisterOpen(false))
      .then(() => auth.authorize(email, password))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return auth.checkToken(res.token);
      })
      .then((user) => setCurrentUser(user))
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    return auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeAllModals();
        return auth.checkToken(res.token);
      })
      .then((user) => setCurrentUser(user))
      .catch((err) => {
        throw new Error(err);
      });
  };

  // ------------------- Effects -------------------
  useEffect(() => {
    getWeather(coordinates, WEATHER_API_KEY)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
    api
      .getItems()
      .then((data) => setClothingItems([...data].reverse()))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    auth
      .checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => localStorage.removeItem("jwt"));
  }, []);

  // ------------------- Render -------------------
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <Header
            currentUser={currentUser}
            onLogin={() => setIsLoginOpen(true)}
            onRegister={() => setIsRegisterOpen(true)}
            handleAddClick={handleAddClick}
            weatherData={weatherData}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    addItemClick={handleAddClick}
                    onEditProfile={() => setIsEditProfileOpen(true)}
                    onSignOut={handleSignOut}
                    onCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          {/* ---------------- Modals ---------------- */}
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={closeAllModals}
            onUpdateUser={handleUpdateUser}
          />

          <LoginModal
            isOpen={isLoginOpen}
            onClose={closeAllModals}
            onLogin={handleLogin}
            onSwitchToRegister={() => {
              setIsLoginOpen(false);
              setIsRegisterOpen(true);
            }}
          />

          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={closeAllModals}
            onRegister={handleRegister}
          />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeAllModals}
            onAddItem={onAddItem}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeAllModals}
            onDeleteItem={deleteItemHandler}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
