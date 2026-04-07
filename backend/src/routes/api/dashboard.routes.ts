import { Router } from "express";
import { auth } from "../../middlewares/auth";
import DashboardController from "../../controllers/dashboard.controller";

const router = Router();

router.get("/stats", auth, DashboardController.getStats);

export default router;