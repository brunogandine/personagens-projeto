import { Router } from 'express';

import authRoutes from "./auth.routes"
import charactersRoutes from "./characters.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/characters", charactersRoutes);

export default router