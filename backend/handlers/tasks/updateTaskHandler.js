import sendNotification from "../sendNotification.js";
import Task from "../../models/Task.js";

const updateTaskHandler = async (req, res) => {
    const { id, title, description, dueDate, priority, observer, assignedTo, status, Tags, Subtasks, Dependencies  } = req.body;

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
        task.Tags = Tags && Array.isArray(Tags) ? Tags : [],
        task.Subtasks =  Subtasks && Array.isArray(Subtasks) ? Subtasks : [],
        task.Dependencies = Dependencies && Array.isArray(Dependencies) ? Dependencies : [],

        await task.save();
        sendNotification(assignedTo, id);
        return res.json({ message: "Task updated successfully" });
    } catch (error) {
        console.error(`Error updating task: ${error}`);
        return res.status(500).json({ message: "Internal server error in updating task" });
    }
}

export default updateTaskHandler;