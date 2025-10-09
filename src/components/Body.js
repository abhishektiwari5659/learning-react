import { useEffect, useState } from "react";
import ResCard from "./ResCard";
import { useNavigate } from "react-router-dom";
import useStatus from "../utils/useStatus";

const BACKEND_URL = process.env.BACKEND_URL; // Use env variable

const ShimmerCard = () => (
  <div className="animate-pulse bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
    <div className="bg-gray-300 h-32 w-full rounded-md"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
  </div>
);

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Delhi"); // default location
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, [location]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/restaurants?location=${location}`
      );
      if (!response.ok) throw new Error("Failed to fetch from backend");
      const resList = await response.json();
      setRestaurants(resList);
      setFilteredRestaurants(resList);
      setError(null);
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

  const onlineStatus = useStatus();
  if (onlineStatus === false)
    return (
      <h1 className="text-center text-red-500 mt-10">
        Looks like you don't have an active internet connection
      </h1>
    );

  if (error)
    return (
      <h2 className="text-center text-red-500 mt-10">{error}</h2>
    );

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Location + Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 w-full">
        <input
          type="text"
          placeholder="Enter your city or location"
          onChange={(e) => setLocation(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm placeholder-gray-400 transition"
        />

        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm placeholder-gray-400 transition"
        />

        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-300"
        >
          Search
        </button>
      </div>

      {/* Restaurants grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(12)
            .fill("")
            .map((_, i) => (
              <ShimmerCard key={i} />
            ))}
        </div>
      ) : filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRestaurants.map((res) => (
            <ResCard
              key={res.info.id}
              name={res.info.name}
              cuisine={res.info.cuisines.join(", ")}
              image={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400/" +
                res.info.cloudinaryImageId
              }
              price={res.info.costForTwo || "N/A"}
              deliveryTime={res.info.sla?.slaString || "N/A"}
              onClick={() => navigate(`/restaurant/${res.info.id}`)}
            />
          ))}
        </div>
      ) : (
        <h3 className="text-center text-gray-500 col-span-full mt-10">
          No restaurants found 🚫
        </h3>
      )}
    </div>
  );
};

export default Body;
