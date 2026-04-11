const express = require('express');
const { handleUserSignup, handleUserlogin } = require('../controllers/user');
const User = require('../models/user');

const router = express.Router();    

router.post("/", handleUserSignup);
router.post("/login", handleUserlogin);

// Admin creator route
router.post("/create-admin", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await User.create({
            name,
            email,
            password,
            role: "ADMIN"
        });
        return res.json({ message: "Admin created successfully" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;