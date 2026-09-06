import { Router } from "express";
import Authenticate from "@/middlewares/auth";
import ProfileController from '@/controllers/profile.controller'

const router = Router();

router.get("/stats", Authenticate, ProfileController.getStats)

export default router;