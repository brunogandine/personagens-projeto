import { Router } from 'express';

import authRoutes from "./auth.routes"
import charactersRoutes from "./characters.routes";
import userRoutes from "./user.routes";
import profileRoutes from "./profile.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/characters", charactersRoutes);
router.use("/profile", profileRoutes);

export default router