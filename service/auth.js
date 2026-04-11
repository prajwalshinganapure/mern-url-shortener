const jwt = require("jsonwebtoken");
const secret_key = "secret_key";


function setUser(user) {
  return jwt.sign({ userId: user._id, email: user.email, role: user.role}, "secret_key");
}

function getUser(token) {
  return jwt.verify(token, "secret_key");
}

module.exports = {
  setUser,
  getUser,
};