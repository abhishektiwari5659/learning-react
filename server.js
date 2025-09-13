// server.js
const express = require("express");
const cors = require("cors");

// Node-fetch dynamic import for CommonJS
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

// ✅ Enable CORS for all origins (development)
app.use(cors());

// ✅ Proxy route to fetch Swiggy menu
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
