import Task from '../../models/Task.js';

const getAllTasksHandler = async (req, res) => {
    try {
        const allTasks = await Task.find();
        console.log("All tasks fetched successfully");
        return res.status(200).json(allTasks);
    } catch (error) {
        console.error(`Error fetching all tasks: ${error}`);
        return res.status(500).json({ message: "Internal server error in fetching all tasks" });
    }
}

export default getAllTasksHandler;