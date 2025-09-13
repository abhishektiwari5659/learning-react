// import { useEffect, useState } from "react";
// import ResCard from "./ResCard";
// import ShimmerCard from "./ShimmerCard"

// const Body = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//   try {
//     const response = await fetch(
//       `https://api.allorigins.win/raw?url=${encodeURIComponent(
//         "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7041&lng=77.1025&page_type=DESKTOP_WEB_LISTING"
//       )}`
//     );

//     const json = await response.json();
//     console.log("Full API Response:", json); // 👀 check structure

//     const cards = json?.data?.cards || [];

//     const restaurantCard = cards.find(
//       (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
//     );

//     const resList =
//       restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

//     setRestaurants(resList);
//   } catch (err) {
//     console.error("Error fetching restaurants:", err);
//     setError("Failed to load restaurants. Please try again later.");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="res-con">
//       {loading
//         ? Array(8)
//             .fill("")
//             .map((_, i) => <ShimmerCard key={i} />)
//         : restaurants.map((res) => (
//             <ResCard
//               key={res.info.id}
//               name={res.info.name}
//               cuisine={res.info.cuisines.join(", ")}
//               image={
//                 "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400/" +
//                 res.info.cloudinaryImageId
//               }
//               price={res.info.costForTwo}
//               deliveryTime={res.info.sla?.slaString}
//             />
//           ))}
//     </div>
//   );
// };

// export default Body;


import { useEffect, useState } from "react";
import ResCard from "./ResCard";
import ShimmerCard from "./ShimmerCard";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError("Failed to load restaurants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="res-con">
        {Array(8).fill("").map((_, i) => <ShimmerCard key={i} />)}
      </div>
    );
  }

  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div className="res-con">
      {restaurants.map((res) => (
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
          onClick={() => navigate(`/restaurant/${res.info.id}`)} // Navigate to menu page
        />
      ))}
    </div>
  );
};

export default Body;
