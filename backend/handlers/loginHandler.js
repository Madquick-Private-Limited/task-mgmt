import { configDotenv } from "dotenv";
import { logger } from "../index.js";
import User from "../models/User.js";
import { comparePassword, generateToken, sessionValidity, cleanUser } from "../utils/authUtils.js";
configDotenv();


/**
 * 
 * @param {*} req email, password
 * @param {*} res 
 * @returns message, jwt secret token
 */


const loginHandler = async (req, res) => {
    logger.info("Login handler called");
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist, create user" });
        }
        const passwordMatches = comparePassword(password, user.password);
        if(!passwordMatches) {
            return res.status(401).json({ message: "Incorrect Password" });
        }
        
        // console.log(process.env.JWT_SECRET);
        const token = generateToken(user._id, user.role);

        res.cookie('token', token, { httpOnly: true, maxAge: sessionValidity, sameSite: 'None', secure: true })
        
        logger.info("User logged in successfully");
        return res.status(200).json(cleanUser(user));
    } catch (error) {
        console.error(`Error logging in user: ${error}`);
        return res.status(500).json({ message: "Internal server error in user login" });
    }
}


export default loginHandler;