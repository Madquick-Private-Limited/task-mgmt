import bcrypt from "bcrypt";
import { User } from "../models/db.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const getHashedPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}


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

        const hashedPassword = await getHashedPassword(password);
        const newUser = new User({ 
            name,
            email, 
            password: hashedPassword 
        });
        
        await newUser.save();
        const token = jwt.sign({ 
            id: newUser._id,
            role: newUser.role
        }, process.env.JWT_SECRET);

        return res.json({ 
            message: "User registered successfully",
            token 
        });

    } catch (error) {
        console.error(`Error registering user: ${error}`);
        return res.status(500).json({ message: "Internal server error in registering users" });
    }
}

export default registerHandler;