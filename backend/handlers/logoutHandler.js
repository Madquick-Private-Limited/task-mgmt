import { logger } from "../index.js";

const loginHandler = async (req, res) => {
    logger.info("Logout handler called");
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        logger.info("User logged out successfully");
        return res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        console.error(`Error logging in user: ${error}`);
        return res.status(500).json({ message: error });
    }
}


export default loginHandler;