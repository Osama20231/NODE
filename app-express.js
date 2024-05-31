// app.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const checkAuth = require("./middlewares/check-auth");
const mainSiteMiddleware = require("./middlewares/main-site");

app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(expressSession({ secret: "My Secret Key", resave: false, saveUninitialized: false }));
app.use(mainSiteMiddleware);
app.use(flash());

app.use(express.static("public"));
app.set("view engine", "ejs");

const placesAPIRouter = require("./routes/api/places");
app.use(placesAPIRouter);

app.use("/places", require("./routes/places"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/search"));

app.get("/", checkAuth, (req, res) => {
  res.render("homepage", { user: req.session.user });
});
app.get("/contact-us", async (req, res) => {
  res.render("contact-us");
})
app.post('/contact-us', (req, res) => {
  res.redirect("contact-us")
});
app.get("/lakes", checkAuth, async (req, res) => {
  res.render("lakes");
})
app.get("/mountains", checkAuth, async (req, res) => {
res.render("mountains");
})


app.listen(4000, () => {
  console.log("app started listening at localhost:4000");
});

mongoose.connect("YOUR CONECTION STRING")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Unable to connect");
  });
