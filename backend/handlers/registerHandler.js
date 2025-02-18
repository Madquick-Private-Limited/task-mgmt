import User from "../models/User.js";
import { configDotenv } from "dotenv";
import { generateToken, hashedPassword, sessionValidity, cleanUser } from "../utils/authUtils.js";
configDotenv();

/**
 * 
 * @param {*} req name email password
 * @param {*} res 
 * @returns jwt secret token
 */
const registerHandler = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    try {
        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPass = await hashedPassword(password);
        const newUser = new User({ 
            name,
            email, 
            password: hashedPass 
        });
        
        await newUser.save();
        const token = generateToken(newUser._id, newUser.role);
        res.cookie('token', token, { httpOnly: true, maxAge: sessionValidity, sameSite: 'None', secure: true })
        
        return res.json(cleanUser(newUser));

    } catch (error) {
        console.error(`Error registering user: ${error}`);
        return res.status(500).json({ message: "Internal server error in registering users" });
    }
}

export default registerHandler;