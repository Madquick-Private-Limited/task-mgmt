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
        enum: ["TO-DO", "DONE", "IN PROGRESS"],
        required: true,
        default: "TO-DO"
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
        type: Date, // YYYY-MM-DD
        required: true
    }, 
    priority: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        default: "LOW",
        required: true
    },
    Tags: {
        type: [String]
    },
    Subtasks: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }]
    },
}, {
    timestamps: true // createdAt, updatedAt
})

export default taskSchema;