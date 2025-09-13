import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ResMenuPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenu();
    // eslint-disable-next-line
  }, [id]);

  const extractItemCards = (cards) => {
    const items = [];
    const traverse = (arr) => {
      if (!Array.isArray(arr)) return;
      arr.forEach((card) => {
        try {
          if (card?.card?.card?.itemCards) {
            card.card.card.itemCards.forEach((c) => {
              if (c?.card?.info) items.push(c.card.info);
            });
          } else if (card?.card?.card?.cards) {
            traverse(card.card.card.cards);
          } else if (card?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
            traverse(card.groupedCard.cardGroupMap.REGULAR.cards);
          }
        } catch {
          // ignore errors
        }
      });
    };
    traverse(cards);
    return items;
  };

  const fetchMenu = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/menu/${id}`);
      const json = await response.json();

      // Set restaurant info if available
      const restInfoCard = json.data.cards.find(
        (c) => c.card?.card?.info?.id === id
      );
      setRestaurant(restInfoCard?.card?.card?.info || null);

      const menuItems = extractItemCards(json.data.cards);
      setMenu(menuItems);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setError("Failed to load menu. Check console for details.");
      setMenu([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="restaurant-details">
      <Link to="/">⬅ Back to restaurants</Link>

      {restaurant && (
        <div style={{ marginBottom: "20px" }}>
          <h2>{restaurant.name}</h2>
          <p>
            {restaurant.cuisines?.join(", ")} • {restaurant.costForTwoMessage}
          </p>
          <p>⭐ {restaurant.avgRating} ({restaurant.totalRatingsString})</p>
        </div>
      )}

      <h3>Menu</h3>
      {menu.length === 0 ? (
        <p>No menu items available</p>
      ) : (
        <ul>
          {menu.map((item) => (
            <li key={item.id}>
              {item.name} – ₹{(item.price || item.defaultPrice || 0) / 100}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResMenuPage;
