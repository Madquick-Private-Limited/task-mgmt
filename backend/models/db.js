import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import userSchema from "./userSchema.js";
configDotenv()

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.error("error connecting db", err));

const User = mongoose.model("User", userSchema);
export {
    User
};