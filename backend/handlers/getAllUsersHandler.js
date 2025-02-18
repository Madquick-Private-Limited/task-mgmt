import User from "../models/User.js";

const getAllUsersHandler = async (req, res) => {
    try {
        const loggedInUserId = req.user.id; 

        // Find all users except the logged-in user
        const users = await User.find({
             _id: { 
                $ne: loggedInUserId 
            }}).select("-password");

        return res.json(users);
    } catch (error) {
        console.error(`Error getting all users: ${error}`);
        return res.status(500).json({ message: "Internal server error in getting all users" });
    }
}

export default getAllUsersHandler;