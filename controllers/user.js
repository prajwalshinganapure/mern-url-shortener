const User = require('../models/user');
const {v4: uuidv4} = require('uuid')
const { setUser } = require('../service/auth');


async function handleUserSignup(req, res){
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    await User.create({
        name,
        email,
        password
    }); 
    return res.redirect("/");
}

async function handleUserlogin(req, res){
    const { email, password } = req.body;

    if ( !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const user =  await User.findOne({
        email,
        password
    }); 

    if (!user) {
        return res.send("Invalid credentials")
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId,)
    return res.redirect("/");
}


module.exports = {
    handleUserSignup,
    handleUserlogin,

}