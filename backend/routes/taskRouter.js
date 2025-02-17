import { Router } from "express";
import createTaskHandler from "../handlers/tasks/createTaskHandler.js";
import getAllTasksHandler from "../handlers/tasks/getAllTasksHandler.js";
import getTaskByIDHandler from "../handlers/tasks/getTaskByIDHandler.js";
import getTaskByUserIDHandler from "../handlers/tasks/getTaskByUserIDHandler.js";
import updateTaskHandler from "../handlers/tasks/updateTaskHandler.js";
import { authorizeRoles, verifyToken } from "../middleware/authMiddleware.js";
const router = Router();

router.use(verifyToken);

// ROLES = "ADMIN", "PROJECT MANAGER", "TEAM MEMBER", "CLIENT"
/**
 * @route POST /task/create
 * requires title, description, dueDate, priority, observer, assignedTo
 */
router.post("/create", authorizeRoles("ADMIN"), createTaskHandler);

/**
 * @route POST /task/update
 * requires id, title, description, dueDate, priority, observer, assignedTo, status
 */
router.post("/update", 
            authorizeRoles("ADMIN", "PROJECT MANAGER", "TEAM MEMBER"),
            updateTaskHandler);

/**
 * @route GET /task/get/:taskId
 * requires id
 * no authorization requires anyone can get task by id
 */
router.get("/get/:taskId", getTaskByIDHandler);

/**
 * @route GET /task/getAll
 * no authorization requires anyone can get all tasks
 */
router.get("/getAll", getAllTasksHandler)

/**
 * @route GET /task/getTask/:userID
 * requires userID as query param
 * returns all tasks assigned to the user
 */
router.get("/getTask/:userID", getTaskByUserIDHandler);

export default router;