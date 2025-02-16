import { Task } from "../models/db";

const getTaskByIDHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        if(!task) {
            return res.status(400).json({ message: "Task does not exist" });
        }
        return res.json(task);
    } catch (error) {
        console.error(`Error getting task by ID: ${error}`);
        return res.status(500).json({ message: "Internal server error in getting task by ID" });
    }
};

export default getTaskByIDHandler;