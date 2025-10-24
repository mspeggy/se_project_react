import "./Profile.css"
import ClothesSection from "../ClothesSection/ClothesSection"
import SideBar from "../SideBar/SideBar"

export default function Profile({ clothingItems, onCardClick, addItemClick }) { 
    return (
    <section className= "profile">
    <SideBar />
    
    <ClothesSection onCardClick={onCardClick} clothingItems={clothingItems} onAddClick={addItemClick}/>  
    </section>
    );
}