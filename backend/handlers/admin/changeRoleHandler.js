import { User } from "../../models/db.js";
import { Roles } from "../../utils/roles.js";

const changeRoleHandler = async (req, res) => {
    const { userId, newRole } = req.body;
    try {
        const user = await User.findById(userId);
        if(!user)
            return res.status(404).json({ message: "User not found" });

        if(!Roles.includes(newRole.toUpperCase()))
            return res.status(400).json({ message: "Invalid role" });
        
        user.role = newRole.toUpperCase();
        await user.save();

        console.log(`Role changed successfully`);
        return res.json({ message: "Role changed successfully" });
    } catch (error) {
        console.error(`Error changing role: ${error}`);
        return res.status(500).json({ message: "Internal server error in changing role" });
    }
}

export default changeRoleHandler;