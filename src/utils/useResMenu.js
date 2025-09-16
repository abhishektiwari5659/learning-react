import { useState, useEffect } from "react";

const useResMenu = (id) => {
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/api/menu/${id}`);
        const json = await response.json();

        // Restaurant info
        const restInfoCard = json.data.cards.find(
          (c) => c.card?.card?.info?.id === id
        );
        setRestaurant(restInfoCard?.card?.card?.info || null);

        // Menu items
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

    if (id) fetchMenu();
  }, [id]);

  return { restaurant, menu, loading, error };
};

export default useResMenu;
