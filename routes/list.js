const express = require("express");
let router = express.Router();

router.get("/", async (req, res) => {
    res.render("/places/list");
})

module.exports = router;