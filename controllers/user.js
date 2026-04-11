const User = require('../models/user');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res){
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.send("All fields are required");
    }

    // ✅ check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.send("User already exists, please login");
    }

    // ✅ create new user
    await User.create({
        name,
        email,
        password
    });

    // ✅ after signup go to login
    return res.redirect("/login");
}

async function handleUserlogin(req, res){
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send("All fields are required");
    }

    // ✅ find user by email
    const user = await User.findOne({ email });

    if (!user) {
        return res.send("User not found, please signup");
    }

    // ✅ check password
    if (user.password !== password) {
        return res.send("Wrong password");
    }

    // ✅ generate JWT token
    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserlogin,
};