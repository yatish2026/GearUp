const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

router.get("/search", async (req, res) => {
  const query = req.query.query;
  try {
    const cars = await Car.find({
      $or: [
        { Brand: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } }
      ]
    });
    res.json({ success: true, cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Search failed" });
  }
});

module.exports = router;

