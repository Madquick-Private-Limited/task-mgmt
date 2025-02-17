import { User } from "../models/db.js";

const addTaskToUser = async (userId, taskId) => {
    try {
        await User.updateOne({ 
            _id: userId 
        }, {
            $push: {
                taskID: taskId
            }
        });

        console.log(`Task added to user successfully`);
    } catch (error) {
        console.error(`Error adding task to user: ${error}`);
    }
}

export default addTaskToUser;