import { Task } from '../models/db.js';

const createTaskHandler = async (req, res) => {
    const { title, description, dueDate, priority, observer, assignedTo } = req.body;

    if(!title || !description || !dueDate || !priority || !observer || !assignedTo) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    try {
        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
            observer,
            assignedTo
        });

        await newTask.save();

        return res.json({ message: "Task created successfully" });
    } catch (error) {
        console.error(`Error creating task: ${error}`);
        return res.status(500).json({ message: "Internal server error in creating task" });
    }
}

export default createTaskHandler;