import { Router } from "express";
import Authenticate from "@/middlewares/auth";
import DashboardController from "@/controllers/dashboard.controller";
import AuthorizeUser from "@/middlewares/authorize";

const router = Router();

router.get("/stats", Authenticate, AuthorizeUser("Admin"), DashboardController.getStats);

export default router;