const express = require("express");
const cors = require("cors");

// Node-fetch dynamic import for CommonJS
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());

// Map location to lat/lng
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
    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coords.lat}&lng=${coords.lng}&page_type=DESKTOP_WEB_LISTING`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
      },
    });

    if (!response.ok) throw new Error(`Swiggy API error: ${response.status}`);
    const data = await response.json();

    // Extract restaurants list
    const cards = data?.data?.cards || [];
    const restaurantCard = cards.find(
      (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    let resList =
      restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

    // Normalize price fields
    resList = resList.map((r) => {
      const info = r.info;
      let costForTwo = info.costForTwo || 0;
      let priceMessage = info.costForTwoMessage || "N/A";

      // If costForTwo is 0, fallback to costForTwoMessage or feeDetails
      if (!costForTwo && info.feeDetails?.restaurantFee?.displayString) {
        priceMessage = info.feeDetails.restaurantFee.displayString;
      }

      return {
        ...r,
        info: {
          ...info,
          costForTwo,
          costForTwoMessage: priceMessage,
        },
      };
    });

    res.json(resList);
  } catch (err) {
    console.error("Backend fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// ✅ Existing menu route
app.get("/api/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7041&lng=77.1025&restaurantId=${id}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
      },
    });

    if (!response.ok) throw new Error(`Swiggy API error: ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Backend fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
