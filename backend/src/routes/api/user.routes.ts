import { Router } from "express";
import { auth } from "../../middlewares/auth";
import UserController from "../../controllers/user.controller";

const router = Router();

router.get("/counts", auth, UserController.getCounts)

export default router;