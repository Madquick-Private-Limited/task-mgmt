import { Router } from "express";
import loginHandler from "../handlers/loginHandler.js";
import logoutHandler from "../handlers/logoutHandler.js";
import registerHandler from "../handlers/registerHandler.js";
import taskRouter from "./taskRouter.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { cleanUser } from "../utils/authUtils.js";
import getAllUsersHandler from "../handlers/getAllUsersHandler.js";
import adminRouter from "./adminRouter.js";
const mainRouter = Router();

mainRouter.post("/login", loginHandler);
mainRouter.post("/register", registerHandler);
mainRouter.get("/check-auth", verifyToken, (req, res) => res.status(200).json(cleanUser(req.user)));
mainRouter.post("/logout", logoutHandler);

mainRouter.use(verifyToken);

mainRouter.use("/task", taskRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.get("/getAllUsers", getAllUsersHandler);

export default mainRouter;