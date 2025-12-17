const MainPage = ({ clothingItems, onAddItem }) => {
  return (
    <div>
      <h2>Main Page</h2>

      <button onClick={onAddItem}>+ Add Item</button>

      {clothingItems?.map((item) => (
        <div key={item._id}>{item.name}</div>
      ))}
    </div>
  );
};

export default MainPage;