const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restrictTO } = require("../middleware/auth");

router.get("/admin/urls", restrictTO(["ADMIN","NORMAL"]),async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
    });
    console.log(req.user);
});

router.post("/create-admin", async (req, res) => {
    const User = require('../models/user');
    await User.create({
        ...req.body,
        role: "ADMIN"
    });
    return res.json({ message: "Admin created" });
});



router.get("/", restrictTO(["NORMAL", "ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        urls: allUrls,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});


module.exports = router;