import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "COMPLETED", "OVERDUE", "IN PROGRESS"],
        required: true,
        default: "PENDING"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    observer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    projectID: {
        type: String,
    },
    dueDate: {
        type: Date,
        required: true
    }, 
    priority: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        required: true
    },
    tags: {
        type: [String]
    },
    subTasks: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }]
    },
}, {
    timestamps: true // createdAt, updatedAt
})

export default taskSchema;