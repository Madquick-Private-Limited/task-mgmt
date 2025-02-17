import { Router } from "express";
import loginHandler from "../handlers/loginHandler.js";
import registerHandler from "../handlers/registerHandler.js";
import taskRouter from "./taskRouter.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import getAllUsersHandler from "../handlers/getAllUsersHandler.js";
const mainRouter = Router();

mainRouter.post("/login", loginHandler);
mainRouter.post("/register", registerHandler);

mainRouter.use("/task", taskRouter);

mainRouter.get("/getAllUsers", verifyToken, getAllUsersHandler);

export default mainRouter;