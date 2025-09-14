
import { useEffect, useState } from "react";
import ResCard from "./ResCard";
import ShimmerCard from "./ShimmerCard";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7041&lng=77.1025&page_type=DESKTOP_WEB_LISTING"
        )}`
      );

      const json = await response.json();
      const cards = json?.data?.cards || [];
      const restaurantCard = cards.find(
        (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const resList =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      setRestaurants(resList);
      setFilteredRestaurants(resList);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError("Failed to load restaurants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredRestaurants(restaurants);
      return;
    }

    const filtered = restaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  if (loading) {
    return (
      <div className="res-con">
        {Array(15)
          .fill("")
          .map((_, i) => (
            <ShimmerCard key={i} />
          ))}
      </div>
    );
  }

  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div>
      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {/* Restaurants */}
      <div className="res-con">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((res) => (
            <ResCard
              key={res.info.id}
              name={res.info.name}
              cuisine={res.info.cuisines.join(", ")}
              image={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400/" +
                res.info.cloudinaryImageId
              }
              price={res.info.costForTwo}
              deliveryTime={res.info.sla?.slaString}
              onClick={() => navigate(`/restaurant/${res.info.id}`)}
            />
          ))
        ) : (
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>
            No restaurants found 🚫
          </h3>
        )}
      </div>
    </div>
  );
};

export default Body;
