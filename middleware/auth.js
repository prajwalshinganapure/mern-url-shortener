const { getUser } = require('../service/auth');

function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookies?.token;

     req.user = null; 

    if (!tokenCookie) return next();

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

function restrictTO(roles = []) {
    return function (req, res, next) {
        if(!req.user) return res.send("UnAuthorized");

        if(!roles.includes(req.user.role)) return res.send("UnAuthorized");

        return next();
};
}


module.exports = {
    checkForAuthentication,
    restrictTO,
};