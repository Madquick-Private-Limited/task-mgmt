import { Router } from "express";
import loginHandler from "../handlers/loginHandler.js";
import registerHandler from "../handlers/registerHandler.js";
const mainRouter = Router();

mainRouter.post("/login", loginHandler);
mainRouter.post("/register", registerHandler);

export default mainRouter;