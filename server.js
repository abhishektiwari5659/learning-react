require("dotenv").config(); // Load .env file first
const express = require("express");
const cors = require("cors");

// Dynamic import for node-fetch (for CommonJS)
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());

// ✅ Location map for quick lookup
const locationMap = {
  Delhi: { lat: 28.7041, lng: 77.1025 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
};

// ✅ Fetch restaurants dynamically based on location
app.get("/api/restaurants", async (req, res) => {
  try {
    const location = req.query.location || "Delhi";
    const coords = locationMap[location] || locationMap["Delhi"];

    const baseUrl = process.env.LOCATION_API_BASE;
    const url = `${baseUrl}?lat=${coords.lat}&lng=${coords.lng}&page_type=DESKTOP_WEB_LISTING`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
      },
    });

    if (!response.ok)
      throw new Error(`Swiggy API error: ${response.status}`);

    const data = await response.json();

    // Extract restaurant cards safely
    const cards = data?.data?.cards || [];
    const restaurantCard = cards.find(
      (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    let resList =
      restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

    // Normalize data
    resList = resList.map((r) => {
      const info = r.info || {};
      const costForTwo = info.costForTwo || 0;
      const costForTwoMessage =
        info.costForTwoMessage ||
        info.feeDetails?.restaurantFee?.displayString ||
        "N/A";

      return {
        ...r,
        info: {
          ...info,
          costForTwo,
          costForTwoMessage,
        },
      };
    });

    res.json(resList);
  } catch (err) {
    console.error("Backend fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// ✅ Fetch specific restaurant menu
app.get("/api/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const baseUrl = process.env.MENU_API_BASE;

    // You can change lat/lng dynamically if needed
    const url = `${baseUrl}?page-type=REGULAR_MENU&complete-menu=true&lat=28.7041&lng=77.1025&restaurantId=${id}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
      },
    });

    if (!response.ok)
      throw new Error(`Swiggy API error: ${response.status}`);

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Backend fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
