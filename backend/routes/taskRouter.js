import { Router } from "express";
import createTaskHandler from "../handlers/createTaskHandler.js";
import updateTaskHandler from "../handlers/updateTaskHandler.js";
import getTaskByIDHandler from "../handlers/getTaskByIDHandler.js";
const router = Router();


/**
 * @route POST /task/create
 * requires title, description, dueDate, priority, observer, assignedTo
 */
router.post("/create", createTaskHandler);

/**
 * @route POST /task/update
 * requires id, title, description, dueDate, priority, observer, assignedTo, status
 */
router.post("/update", updateTaskHandler);

/**
 * @route POST /task/get/:id
 * requires id
 */
// router.post("/get/:id", getTaskByIDHandler);

/**
 * @route POST /task/getAll
 * requires
 */
// router.post("/getAll", )
export default router;