import MaintenanceController from "@/controllers/maintenance.controller";
import Authenticate from "@/middlewares/auth";
import Authorize from "@/middlewares/authorize";
import ValidateRequest from '@/middlewares/validate';
import { updateMaintenanceSchema } from "@/validations/maintenance.validations";
import { Router } from "express";

const router = Router();

router.get("/maintenance", Authenticate, Authorize("Admin"), MaintenanceController.getSettings);
router.patch("/maintenance", Authenticate, Authorize("Admin"), ValidateRequest(updateMaintenanceSchema, "body"), MaintenanceController.updateSettings);

export default router;