import { User } from "../models/db.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

export const verifyToken = async (req, res, next) => {
    if(req.cookies === undefined) {
        console.log("No token provided, redirecting to login page.")
        return res.status(401).json("No token provided, redirecting to login page!")
    }

    const token = req.cookies.token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // dont pass password in the req.user
        const user = await User.findById(decoded.id).select("-password");

        if(user) console.log("\nSession authenticated successfully")
 
        req.user = user
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error("\nToken expired")

            res.clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            })
            return res.status(401).json({ message: "Session expired, please login again !" })
        }
        else if(error.name === 'JsonWebTokenError'){
            console.error("\nInvalid token OR No token found !")

            res.clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            })
            res.status(401).json({ message: "Please login first to view this page !" })
        }
        else{
            console.error("\nFailed to verify token:", error)
    
            // Handle invalid token error
            return res.status(401).send({ error: "Unauthorized !" })
        }
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