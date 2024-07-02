require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

function UserMiddleware(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: "Authorization token is missing" });
    }

    const tokenParts = req.headers.authorization.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ msg: "Authorization token format is invalid" });
    }

    const jwtToken = tokenParts[1];
    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        if (decodedValue.username) {
            req.username = decodedValue.username;
            next();
        } else {
            return res.status(403).json({ msg: "You are not authenticated" });
        }
    } catch (e) {
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
}

module.exports = UserMiddleware;