import { useParams, Link } from "react-router-dom";
import useResMenu from "../utils/useResMenu"; // adjust path

const ResMenuPage = () => {
  const { id } = useParams();
  const { restaurant, menu, loading, error } = useResMenu(id);

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
          {menu.map((item, index) => (
            <li key={`${item.id}-${index}`}>
      {item.name} : ₹{(item.price || item.defaultPrice || 0) / 100}
    </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResMenuPage;
