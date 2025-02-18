import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
configDotenv()

export const sessionValidity = 2 * (60 * 60 * 1000); // 2 hours (in milliseconds)

export const generateToken = (userId, role) => {
    return jwt.sign({
        id: userId,
        role: role
    }, process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    })
}

export const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export const comparePassword = async (enteredPassword, storedHash) => {
    return bcrypt.compare(enteredPassword, storedHash);
}

export const cleanUser = (user) => {
    const { password, __v, ...cleanedUser } = user.toObject();
    return cleanedUser;
}