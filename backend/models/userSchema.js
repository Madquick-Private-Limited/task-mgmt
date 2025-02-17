import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum : ["ADMIN", "PROJECT MANAGER", "TEAM MEMBER", "CLIENT"],
        required: true,
        default: "TEAM MEMBER" 
    },
    notifications: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notification"
        }],
        default: []
    },
    taskID: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }],
        default: []
    }
}, {timestamps: true});;

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default userSchema;