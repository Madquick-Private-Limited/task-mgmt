import { Task } from "../models/db";

const updateTaskHandler = async (req, res) => {
    const { id, title, description, dueDate, priority, observer, assignedTo, status } = req.body;

    if(!id || !title || !description || !dueDate || !priority || !observer || !assignedTo || !status) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    try {
        const task = await Task.findById(id);
        if(!task) {
            return res.status(400).json({ message: "Task does not exist" });
        }

        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.observer = observer;
        task.assignedTo = assignedTo;
        task.status = status.toUpperCase();

        await task.save();

        return res.json({ message: "Task updated successfully" });
    } catch (error) {
        console.error(`Error updating task: ${error}`);
        return res.status(500).json({ message: "Internal server error in updating task" });
    }
}

export default updateTaskHandler;