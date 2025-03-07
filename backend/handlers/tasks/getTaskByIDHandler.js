import Task from "../../models/Task.js";

const getTaskByIDHandler = async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findById({
            _id: taskId
        });
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