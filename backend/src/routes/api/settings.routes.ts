import MaintenanceController from "@/controllers/maintenance.controller";
import Authenticate from "@/middlewares/auth";
import Authorize from "@/middlewares/authorize";
import { Router } from "express";

const router = Router();

router.get("/maintenance", Authenticate, Authorize("Admin"), MaintenanceController.getSettings);

export default router;