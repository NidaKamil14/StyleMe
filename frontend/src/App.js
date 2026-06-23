import axios from "axios";
import closedWardrobe from "./assets/images/closed-wardrobe.png";
import openWardrobe from "./assets/images/open-wardrobe.png";
import "./App.css";
import { useEffect, useState } from "react";

import footwearImg from "./assets/images/1.png";
import topwearImg from "./assets/images/2.png";
import bottomwearImg from "./assets/images/3.png";
import accessoryImg from "./assets/images/4.png";
import dressImg from "./assets/images/5.png";
import ethnicwearImg from "./assets/images/6.png";

function App() {
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
  const [clothes, setClothes] = useState([]);
  const [activePage, setActivePage] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Category");
const [selectedColor, setSelectedColor] = useState("Color");
const [selectedOccasion, setSelectedOccasion] = useState("Occasion");
const [selectedMood, setSelectedMood] = useState("");
const [selectedWeather, setSelectedWeather] = useState("");
const [selectedHomeOccasion, setSelectedHomeOccasion] = useState("");
const [itemName, setItemName] = useState("");
const [category, setCategory] = useState("");
const [color, setColor] = useState("");
const [occasion, setOccasion] = useState("");
const [editingId, setEditingId] = useState(null);
const [selectedClosetCategory, setSelectedClosetCategory] = useState(null);
const [stylingNote, setStylingNote] = useState("");
const [currentNote, setCurrentNote] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/api/clothes")
      .then((response) => response.json())
      .then((data) => setClothes(data))
      .catch((error) => console.log(error));
  }, []);

  const filteredClothes = clothes.filter((item) => {

  const matchesSearch =
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "Category" ||
    item.category === selectedCategory;

  const matchesColor =
    selectedColor === "Color" ||
    item.color === selectedColor;

  const matchesOccasion =
    selectedOccasion === "Occasion" ||
    item.occasion === selectedOccasion;

  return (
    matchesSearch &&
    matchesCategory &&
    matchesColor &&
    matchesOccasion
  );
});


const suggestedClothes = clothes.filter((item) => {
  if (!selectedHomeOccasion) return false;

  return item.occasion === selectedHomeOccasion;
});


const styleAdvice = () => {

  if (selectedWeather === "Sunny" && selectedMood === "Confident")
    return "Girl, the sun is literally working as your spotlight today ✨ Go for bright colors, structured fits and that main-character energy 💖";

  if (selectedWeather === "Sunny" && selectedMood === "Cozy")
    return "A comfy cute day is calling 🌸 Think soft fabrics, light colors and outfits that feel like a warm hug while still looking adorable 💕";

  if (selectedWeather === "Sunny" && selectedMood === "Elegant")
    return "This weather was made for effortless elegance ✨ Flowy silhouettes, delicate accessories and soft pastel shades will look gorgeous today 💖";

  if (selectedWeather === "Sunny" && selectedMood === "Casual")
    return "Keep it cute and carefree today 🎀 Easy layers, comfy footwear and your favorite everyday pieces are the move 💕";



  if (selectedWeather === "Rainy" && selectedMood === "Confident")
    return "Rainy weather is NOT stopping the slay 😌✨ A chic jacket, cute boots and a bold outfit will have you serving looks despite the clouds 💖";

  if (selectedWeather === "Rainy" && selectedMood === "Cozy")
    return "Bestie, this is peak cozy-girl weather ☕🌸 Soft layers, comfy shoes and warm textures are exactly what your wardrobe deserves today 💕";

  if (selectedWeather === "Rainy" && selectedMood === "Elegant")
    return "A rainy day can be incredibly classy ✨ Stick to refined silhouettes and timeless colors for that effortlessly sophisticated vibe 💖";

  if (selectedWeather === "Rainy" && selectedMood === "Casual")
    return "Stay comfy, stay cute 🎀 Relaxed layers and practical footwear are your rainy-day besties today 💕";



  if (selectedWeather === "Cloudy" && selectedMood === "Confident")
    return "Cloudy skies are the perfect excuse to let your outfit do all the talking 😌✨ Try statement pieces and colors that make you feel unstoppable 💖";

  if (selectedWeather === "Cloudy" && selectedMood === "Cozy")
    return "This weather is basically asking for soft knits, comfy layers and cozy-girl vibes 🌸💕";

  if (selectedWeather === "Cloudy" && selectedMood === "Elegant")
    return "Neutral shades and clean silhouettes will look effortlessly chic today ✨ You are the aesthetic 💖";

  if (selectedWeather === "Cloudy" && selectedMood === "Casual")
    return "An easy-going outfit and your favorite basics are all you need today 🎀 Cute, comfortable and completely stress-free 💕";



  if (selectedWeather === "Cold" && selectedMood === "Confident")
    return "Cold weather but make it iconic ❄️✨ Layer up with confidence and let your outerwear steal the show 💖";

  if (selectedWeather === "Cold" && selectedMood === "Cozy")
    return "Girl, it's officially blanket-weather fashion season 🧸💕 Soft fabrics, oversized layers and warm textures are calling your name 🌸";

  if (selectedWeather === "Cold" && selectedMood === "Elegant")
    return "Nothing says elegance like beautiful layers and timeless winter tones ✨ You'll look effortlessly polished today 💖";

  if (selectedWeather === "Cold" && selectedMood === "Casual")
    return "Layer up with warm textures, oversized pieces and comfortable essentials 🎀 Cozy, cute and ready for the day 💕";



  return "Choose a weather and mood bestie 💖✨";
};

const addClothing = async () => {
  if (editingId) {
  try {
    await fetch(
      `http://localhost:5001/api/clothes/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          item_name: itemName,
          category: category,
          color: color,
          occasion: occasion
        })
      }
    );

    alert("Clothing updated successfully!");

    window.location.reload();

    return;
  } catch (error) {
    console.log(error);
  }
}
  try {
    const response = await fetch(
      "http://localhost:5001/api/clothes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: 1,
          item_name: itemName,
          category: category,
          color: color,
          occasion: occasion,
          image_url: "default.jpg"
        })
      }
    );

    const data = await response.json();

    alert("Clothing added successfully!");

    window.location.reload();

  } catch (error) {
    console.log(error);
  }
};

const getCategoryImage = (category) => {
  switch (category?.toLowerCase()) {

    case "footwear":
      return footwearImg;

    case "topwear":
      return topwearImg;

    case "bottomwear":
      return bottomwearImg;

    case "accessory":
      return accessoryImg;

    case "dress":
      return dressImg;

    case "ethnic wear":
      return ethnicwearImg;

    default:
      return topwearImg;
  }
};

const deleteClothing = async (id) => {
  try {
    await fetch(
      `http://localhost:5001/api/clothes/${id}`,
      {
        method: "DELETE"
      }
    );

    setClothes(
      clothes.filter((item) => item.cloth_id !== id)
    );

  } catch (error) {
    console.log(error);
  }
};

const toggleFavorite = async (id) => {
  try {
    const item = clothes.find(
      (cloth) => cloth.cloth_id === id
    );

    const newFavoriteValue =
      item.is_favorite ? 0 : 1;

    await axios.put(
  `http://localhost:5001/api/clothes/${id}/favorite`,
      {
        is_favorite: newFavoriteValue,
      }
    );

    setClothes(
      clothes.map((cloth) =>
        cloth.cloth_id === id
          ? {
              ...cloth,
              is_favorite: newFavoriteValue,
            }
          : cloth
      )
    );
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  console.log("Editing ID:", editingId);
}, [editingId]);

const getCategoryCount = (category) => {
  return clothes.filter(
    (item) => item.category === category
  ).length;
};

const closetItems = clothes.filter(
  (item) => item.category === selectedClosetCategory
);

const favoriteItems = clothes.filter(
  (item) => item.is_favorite
);

const saveStylingNote = async (
  clothId,
  stylingNote
) => {
  try {
    await axios.put(
      `http://localhost:5001/api/clothes/${clothId}/note`,
      {
        styling_note: stylingNote,
      }
    );

    console.log("Note saved!");
  } catch (error) {
    console.log(error);
  }
};

  return (
  <div className="layout">

    <aside className="sidebar">

      <h1 className="logo">
        StyleMe
      </h1>

       <p className="tagline">
  Curate • Style • Repeat
</p>

      <div className="menu">

  <div
    className={`menu-item ${activePage === "home" ? "active" : ""}`}
    onClick={() => setActivePage("home")}
  >
    Home
  </div>

  <div
    className={`menu-item ${activePage === "wardrobe" ? "active" : ""}`}
    onClick={() => setActivePage("wardrobe")}
  >
    My Wardrobe
  </div>

  <div className="menu-item">
    Outfits
  </div>

 <div
  className={`menu-item ${
    activePage === "favorites" ? "active" : ""
  }`}
  onClick={() => setActivePage("favorites")}
>
  Favorites
</div>

  <div className="menu-item">
    Settings
  </div>

</div>

    </aside>

   <main className="content">

  {activePage === "favorites" && (
  <>
    <h2>My Favorites</h2>

    <div className="clothes-grid">
  {favoriteItems.map((item) => (
    <div
      className="clothes-card"
      key={item.cloth_id}
    >
      <div className="clothes-circle">
        <img
          src={getCategoryImage(item.category)}
          alt={item.category}
          className="clothing-image"
        />
      </div>

      <h3>{item.item_name}</h3>
      <p>{item.category}</p>
      <textarea
      className="styling-note-input"
      placeholder="Add a styling note..."
      defaultValue={item.styling_note || ""}
      onChange={(e) =>
        setCurrentNote(e.target.value)
      }
/>
      <button
        className="save-note-btn"
        onClick={() =>
          saveStylingNote(
            item.cloth_id,
            currentNote
          ) 
        }
      >
        Save Note
      </button>
    </div>
  ))}
</div>
  </>
)}

  {activePage === "home" && (
    <>
  <h1 className="title">
    Welcome Back, Nida
  </h1>

  <p className="subtitle">
    Your personal wardrobe assistant
  </p>

  <div className="home-grid">

    <div className="feature-card">

      <h2>Outfit Generator</h2>

      <p>
        Find pieces from your wardrobe
      </p>

<select
  value={selectedHomeOccasion}
  onChange={(e) => setSelectedHomeOccasion(e.target.value)}
>
  <option value="">Choose Occasion</option>
  <option value="College">College</option>
  <option value="Casual">Casual</option>
  <option value="Party">Party</option>
  <option value="Formal">Formal</option>
  <option value="Festive">Festive</option>
</select>
      <div className="result-box">

  <h3>Recommended Pieces</h3>

  {suggestedClothes.length > 0 ? (
    <>
      {suggestedClothes.slice(0, 4).map((item) => (
        <p key={item.cloth_id}>
          {item.item_name}
        </p>
      ))}

      <p className="match-count">
        {suggestedClothes.length} matching items found
      </p>

    </>
  ) : (
    <p>
      Select an occasion to get recommendations.
    </p>
  )}

</div>

    </div>

    <div className="feature-card">

      <h2>Style Advisor</h2>

      <p>
        Personalized fashion guidance
      </p>

      <select
        value={selectedWeather}
        onChange={(e) => setSelectedWeather(e.target.value)}
      >
        <option value="">Choose Weather</option>
        <option value="Sunny">Sunny</option>
        <option value="Cloudy">Cloudy</option>
        <option value="Rainy">Rainy</option>
        <option value="Cold">Cold</option>
      </select>

      <select
        value={selectedMood}
        onChange={(e) => setSelectedMood(e.target.value)}
      >
        <option value="">Choose Mood</option>
        <option value="Confident">Confident</option>
        <option value="Cozy">Cozy</option>
        <option value="Elegant">Elegant</option>
        <option value="Casual">Casual</option>
      </select>

      <div className="result-box">

        <h3>Today's Style Advice</h3>

        <p>
          {styleAdvice()}
        </p>

      </div>

    </div>

  </div>

  <div className="favorites-preview">

  <h2>Favorite Pieces</h2>

  {favoriteItems.length > 0 ? (
    favoriteItems.map((item) => (
      <div
        key={item.cloth_id}
        className="favorite-item"
      >
        <span>💖</span> {item.item_name}
      </div>
    ))
  ) : (
    <p>
      Save your most loved outfits here.
    </p>
  )}

</div>

<div
  className="wardrobe-section"
  style={{
    position: "relative",
    textAlign: "center"
  }}
>
  <h2 style={{ textAlign: "center" }}>
  ✨ Explore My Closet
</h2>

  <img
    src={isWardrobeOpen ? openWardrobe : closedWardrobe}
    alt="Wardrobe"
    onClick={() => {
  setIsWardrobeOpen(!isWardrobeOpen);

  if (isWardrobeOpen) {
    setSelectedClosetCategory(null);
  }
}}
    style={{
  cursor: "pointer",
  width: "900px",
  display: "block",
  margin: "0 auto"
}}
  />
  {isWardrobeOpen && (
  <div
    className="wardrobe-categories"
    style={{
      position: "absolute",
      top: "200px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "260px",
      display: "grid",
gridTemplateColumns: "1fr 1fr",
gap: "6px"
    }}
    
  >
    <button
      className="closet-btn"
      onClick={() => setSelectedClosetCategory("Topwear")} >
      👚 Topwear ({getCategoryCount("Topwear")})
    </button>

    <button
      className="closet-btn"
      onClick={() => setSelectedClosetCategory("Bottomwear")} >
      👖 Bottomwear ({getCategoryCount("Bottomwear")})
    </button>
    <button
      className="closet-btn"
      onClick={() => setSelectedClosetCategory("Dress")} >
      👗 Dress ({getCategoryCount("Dress")})
    </button>
    <button
      className="closet-btn"
      onClick={() => setSelectedClosetCategory("Ethnic Wear")} >
      🩷 Ethnic Wear  ({getCategoryCount("Ethnic Wear")})
    </button>
    <button
      className="closet-btn"
      onClick={() => setSelectedClosetCategory("Footwear")} >
      👟 Footwear  ({getCategoryCount("Footwear")})
    </button>
    <button
      className="closet-btn"
      onClick={() => setSelectedClosetCategory("Accessory")} >
      👜 Accessories ({getCategoryCount("Accessory")})
    </button>
    <button
      className="closet-btn"
      onClick={() => setSelectedClosetCategory("Outerwear")} >
      🧥 Outerwear ({getCategoryCount("Outerwear")})
    </button>
    <button
      className="closet-btn"
      onClick={() => setSelectedClosetCategory("Other")} >
      ✨ Other ({getCategoryCount("Other")})
    </button>
  </div>
)}

{selectedClosetCategory && (
  <div className="closet-items-card">
    <h3>{selectedClosetCategory}</h3>

    {closetItems.length === 0 ? (
      <p className="no-items-message">
        No items found in this category.
      </p>
    ) : (
      closetItems.map((item) => (
        <div
          key={item.cloth_id}
          className="closet-item-card"
        >
          {item.item_name}
        </div>
      ))
    )}
  </div>
)}
</div>

</>

)}

  {activePage === "wardrobe" && (

    <>

      <h1 className="title">
        My Wardrobe
      </h1>

      <p className="subtitle">
        Organize your style beautifully
      </p>

      <div className="filters">

  <input
    type="text"
    placeholder="Search clothes..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <option>Category</option>
    <option>Topwear</option>
    <option>Bottomwear</option>
    <option>Footwear</option>
    <option>Outerwear</option>
    <option>Dress</option>
    <option>Accessory</option>
    <option>Ethnic Wear</option>
  </select>

  <select
    value={selectedColor}
    onChange={(e) => setSelectedColor(e.target.value)}
  >
    <option>Color</option>
    <option>Pink</option>
    <option>Blue</option>
    <option>Black</option>
    <option>White</option>
    <option>Red</option>
    <option>Green</option>
    <option>Silver</option>
  </select>

  <select
    value={selectedOccasion}
    onChange={(e) => setSelectedOccasion(e.target.value)}
  >
    <option>Occasion</option>
    <option>College</option>
    <option>Casual</option>
    <option>Party</option>
    <option>Formal</option>
    <option>Festive</option>
    <option>Sports</option>
  </select>

</div>

<div className="add-clothing-card">

  <h2>Add New Clothing</h2>

  <input
    type="text"
    placeholder="Item Name"
    value={itemName}
    onChange={(e) => setItemName(e.target.value)}
  />

  <input
    type="text"
    placeholder="Category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  />

  <input
    type="text"
    placeholder="Color"
    value={color}
    onChange={(e) => setColor(e.target.value)}
  />

  <input
    type="text"
    placeholder="Occasion"
    value={occasion}
    onChange={(e) => setOccasion(e.target.value)}
  />

  <button
    className="add-btn"
    onClick={addClothing}
  >
    Add Clothing
  </button>

</div>

      <div className="clothes-grid">

  {filteredClothes.map((item) => (
    <div className="clothes-card" key={item.cloth_id}>
      <button
        className="favorite-btn"
        onClick={() => toggleFavorite(item.cloth_id)}
      >
        {item.is_favorite ? "♥" : "♡"}
      </button>

           <div className="clothes-circle">
  <img
    src={getCategoryImage(item.category)}
    alt={item.category}
    className="clothing-image"
  />
</div>

            <div className="item-name">
              {item.item_name}
            </div>

            <div className="item-info">
              {item.category}
            </div>

            <div className="item-info">
              {item.occasion}
            </div>

            <div className="color-tag">
              {item.color}
            </div>

            <div className="card-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditingId(item.cloth_id);
                  setItemName(item.item_name);
                  setCategory(item.category);
                  setColor(item.color);
                  setOccasion(item.occasion);
                  }}
                  >  ✏️
                </button>
              <button
                className="delete-btn"
                onClick={() => deleteClothing(item.cloth_id)}
              >  🗑️
              </button>

</div>

          </div>
        ))}

      </div>

    </>

  )}

</main>

  </div>
);
}

export default App;