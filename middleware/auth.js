//using middleware function thatll run before the route function if not validated, will stop the route 

const jwt = require("jsonwebtoken");

 const auth = (req, res, next) => {
try {
   //get token out of headers 
        const token = req.header("x-auth-token");
        if (!token)
        return res
        .status(401)
        .json({ msg: "No authenitcation token, authorization denied"});
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
    return res
    .status(401)
    .json({ msg: "Token verification failed. Denied"});

    req.user = verified.id; 
    next();
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

module.exports = auth;
