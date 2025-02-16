import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import notificationSchema from "./notificationSchema.js";
import taskSchema from "./taskSchema.js";
import userSchema from "./userSchema.js";
configDotenv()

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.error("error connecting db", err));

const User         = mongoose.model("User", userSchema);
const Notification = mongoose.model("Notification", notificationSchema);
const Task         = mongoose.model("Task", taskSchema);

export {
    Notification,
    Task, User
};
