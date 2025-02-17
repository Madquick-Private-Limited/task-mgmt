import { Router } from "express";
import { authorizeRoles } from "../middleware/authMiddleware.js";
import changeRoleHandler from "../handlers/changeRoleHandler.js";
const router = Router();

router.use(authorizeRoles("ADMIN"));

router.post("/changeRole", changeRoleHandler);

export default router;