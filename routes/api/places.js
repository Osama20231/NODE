const express = require("express");
const router = express.Router();
const Place = require("../../models/Place");
const verifyJwt = require("../../middlewares/verify-jwt");

// Apply JWT verification middleware to all routes under /api/places
router.use("/api/places", verifyJwt);

router.get("/api/places", verifyJwt, async function (req, res) {
  try {
    let places = await Place.find();
    res.send(places);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/api/places/:id", async function (req, res) {
  try {
    let place = await Place.findById(req.params.id);
    if (!place) return res.status(404).send("Record Not Found");
    res.send(place);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/api/places", async function (req, res) {
  try {
    let data = req.body;
    let place = new Place(data);
    await place.save();
    res.status(201).json(place);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/api/places/:id", async function (req, res) {
  try {
    let place = await Place.findById(req.params.id);
    if (!place) return res.status(404).send("Record Not Found");
    place.name = req.body.name;
    place.landscape = req.body.landscape;
    place.located = req.body.located;
    await place.save();
    res.send(place);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/api/places/:id", async function (req, res) {
  try {
    let place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).send("Record Not Found");
    res.send(place);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
