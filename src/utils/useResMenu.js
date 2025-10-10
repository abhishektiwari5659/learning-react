import { useState, useEffect } from "react";

const isLocal = window.location.hostname === "localhost";
const BACKEND_URL = isLocal
  ? process.env.PARCEL_BACKEND_URL || "http://localhost:5000"
  : process.env.RENDER_BACKEND_URL || "https://backend-a1s4.onrender.com";



const useResMenu = (id) => {
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const extractCategories = (cards) => {
    const categories = [];

    const traverse = (arr) => {
      if (!Array.isArray(arr)) return;

      arr.forEach((card) => {
        try {
          if (card?.card?.card?.title && card?.card?.card?.itemCards) {
            categories.push({
              title: card.card.card.title,
              items: card.card.card.itemCards.map((c) => c.card.info),
            });
          } else if (card?.card?.card?.cards) {
            traverse(card.card.card.cards);
          } else if (card?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
            traverse(card.groupedCard.cardGroupMap.REGULAR.cards);
          }
        } catch {}
      });
    };

    traverse(cards);
    return categories;
  };

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BACKEND_URL}/api/menu/${id}`);
        if (!response.ok) throw new Error("Failed to fetch menu");

        const json = await response.json();

        const restInfoCard = json.data.cards.find(
          (c) => c.card?.card?.info?.id === id
        );
        setRestaurant(restInfoCard?.card?.card?.info || null);

        const categories = extractCategories(json.data.cards);
        setMenu(categories);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError("Failed to load menu. Check console for details.");
        setMenu([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMenu();
  }, [id]);

  return { restaurant, menu, loading, error };
};

export default useResMenu;
