import { User } from "../models/db.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();


/**
 * 
 * @param {*} req email, password
 * @param {*} res 
 * @returns message, jwt secret token
 */

const sessionValidity = 2 * (60 * 60 * 1000); // 2 hours (in milliseconds)

function cleanUser(user) {
    const { password, __v, ...cleanedUser } = user.toObject();
    return cleanedUser;
}

const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist, create user" });
        }
        const passwordMatches = await user.comparePassword(password);
        if (!passwordMatches) {
            return res.status(401).json({ message: "Incorrect Password" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: sessionValidity
            }
        );

        res.cookie('token', token, { httpOnly: true, maxAge: sessionValidity, sameSite: 'None', secure: true });

        console.log(`User logged in successfully: ${user.email}`);

        return res.status(200).json(cleanUser(user));
    } catch (error) {
        console.error(`Error logging in user: ${error}`);
        return res.status(500).json({ message: "Internal server error in user login" });
    }
}


export default loginHandler;