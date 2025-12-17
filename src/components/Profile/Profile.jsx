import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Profile({
  clothingItems,
  onCardClick,
  addItemClick,
  onSignOut,
  onEditProfile, 
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <SideBar
        name={currentUser?.name}
        avatar={currentUser?.avatar}
        onSignOut={onSignOut}
        handleEditClick={onEditProfile} 
        
      />

      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        onAddClick={addItemClick}
      />
    </section>
  );
}