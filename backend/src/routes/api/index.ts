import { Router } from 'express';

import authRoutes from "./auth.routes"
import charactersRoutes from "./characters.routes";
import userRoutes from "./user.routes";
import profileRoutes from "./profile.routes";
import dashboardRoutes from "./dashboard.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/characters", charactersRoutes);
router.use("/profile", profileRoutes);
router.use("/admin", dashboardRoutes);

export default router