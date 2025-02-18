import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }, 
    taskID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});;

export default notificationSchema;