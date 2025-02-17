import { Task, User } from "../../models/db.js";

const getTaskByUserIDHandler = async (req, res) => {
    const { userID } = req.params;
    try {
        const user = await User.findById({ _id : userID });
        if(!user)
            return res.status(404).json({ message: "User not found" });

        const tasks = await Task.find({ assignedTo: userID });
        if(tasks.length === 0)
            return res.json({ message: "No tasks found for the user" });

        return res.json(tasks);
    } catch (error) {
        console.error(`Error getting tasks by user id: ${error}`);
        return res.status(500).json({ message: "Internal server error in getting tasks by user id" });
    }
}

export default getTaskByUserIDHandler;