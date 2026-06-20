import { useEffect, useState } from "react";

function App() {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/clothes")
      .then((response) => response.json())
      .then((data) => setClothes(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>StyleMe Wardrobe</h1>

      {clothes.map((item) => (
        <div key={item.cloth_id}>
          <h3>{item.item_name}</h3>
          <p>Category: {item.category}</p>
          <p>Color: {item.color}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;