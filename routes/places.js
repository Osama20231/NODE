let express = require("express");
let router = express.Router();
let Place = require("../models/Place");

router.get("/new", (req, res) => {
  res.render("places/new",  { messages: req.flash() });
});

router.post("/new", async (req, res) => {
  console.log("routes -> places", req.body);
  const { name, landscape, location } = req.body;

  if (!name || !landscape || !location) {
    if (!name) req.flash("error", "Name is required.");
    if (!landscape) req.flash("error", "Landscape is required.");
    if (!location) req.flash("error", "Location is required.");
    return res.redirect("/places/new");
  } else {
    try {
      let plc = new Place(req.body);
      await plc.save();
      req.flash("success", "Place added successfully.");
      return res.redirect("/places");
    } catch (error) {
      req.flash("error", "There was an error saving the place.");
      return res.redirect("/places/new");
    }
  }
});

router.get("/delete/:id", async (req, res) => {
  let plc = await Place.findByIdAndDelete(req.params.id);
  // let places = await Place.find()
  return res.redirect("/places");
});

router.get("/edit/:id", async (req, res) => {
  let place = await Place.findById(req.params.id);
  console.log("routes -> put ", req.body);

  return res.render("places/edit", { place });
});
router.post("/edit/:id", async (req, res) => {
  let place = await Place.findById(req.params.id);
  place.name = req.body.name;
  place.address = req.body.address;
  await place.save();
  return res.redirect("/places");
});


router.get("/:page?", async (req, res) => {
  let pageTitle = "List of All Places";
  let page = req.params.page ? req.params.page : 1;
  let pageSize = 5;
  let skip = (page - 1) * pageSize;
  let total = await Place.countDocuments();
  let totalPages = Math.ceil(total / pageSize);
  let places = await Place.find().limit(pageSize).skip(skip);
  //   return res.send(places);
  return res.render("./places/list", {
    pageTitle,
    places,
    page,
    pageSize,
    total,
    totalPages,
  });
});

module.exports = router;