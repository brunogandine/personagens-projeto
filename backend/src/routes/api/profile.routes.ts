import { Router } from "express";
import { auth } from "../../middlewares/auth";
import ProfileController from '../../controllers/profile.controller'

const router = Router();

router.get("/stats", auth, ProfileController.getStats)

export default router;