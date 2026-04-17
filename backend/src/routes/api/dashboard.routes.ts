import { Router } from "express";
import { auth } from "../../middlewares/auth";
import DashboardController from "../../controllers/dashboard.controller";
import { authorize } from "../../middlewares/authorize";

const router = Router();

router.get("/stats", auth, authorize("Admin"), DashboardController.getStats);

export default router;