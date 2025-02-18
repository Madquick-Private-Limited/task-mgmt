import Notification from "../models/Notification.js";
import User from "../models/User.js"

export const sendNotification = async(sender, taskID) => {
    try {
        const person1 = await User.findById(sender);

        if(!person1)
            return "User not found in sending Notifications";

        const newNotification = await Notification.create({
            message: `You have been assigned a task`,
            taskID,
        })

        await newNotification.save();

        person1.notifications.push(newNotification._id);
    } catch (error) {
        console.error(`Error in adding notifications ${error}`);
    }
}

export default sendNotification;