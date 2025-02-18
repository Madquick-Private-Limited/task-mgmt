import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // dont pass password in the req.user
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch(error) {
        console.error(`Error verifying token: ${error}`);
        return res.status(401).json({ message: "Error verifying token in middleware" });
    }
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        next();
    }
}