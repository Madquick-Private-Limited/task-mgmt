import Task from '../../models/Task.js';
import User from '../../models/User.js';
import addTaskToUser from './addTaskToUser.js';

const createTaskHandler = async (req, res) => {
    const { title, description, dueDate, priority, observer, assignedTo, Tags, Subtasks, Dependencies } = req.body;

    if(!title || !description || !dueDate || !priority || !observer || !assignedTo) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    const user1 = await User.findById({ observer });
    const user2 = await User.findById({ reciever });

    if(!user1 || !user2)
        return res.status(404).json({ message: "User not found" });

    const parsedDate = new Date(dueDate);

    if(isNaN(parsedDate)) {
        return res.status(400).json({ message: "Please enter a valid date" });
    }
    try {
        const newTask = new Task({
            title,
            description,
            priority,
            observer,
            assignedTo,
            dueDate : parsedDate,
            Tags: Tags && Array.isArray(Tags) ? Tags : [],
            Subtasks: Subtasks && Array.isArray(Subtasks) ? Subtasks : [],
            Dependencies: Dependencies && Array.isArray(Dependencies) ? Dependencies : [],  
        });

        await newTask.save();

        addTaskToUser(assignedTo, newTask._id);

        return res.json({ message: "Task created successfully" });
    } catch (error) {
        console.error(`Error creating task: ${error}`);
        return res.status(500).json({ message: "Internal server error in creating task" });
    }
}

export default createTaskHandler;