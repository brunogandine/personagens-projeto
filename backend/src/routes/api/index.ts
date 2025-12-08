import { Router } from 'express';

import authRoutes from "./auth.routes"
import charactersRoutes from "./characters.routes";

const router = Router();

router.use("/auth", authRoutes)
router.use("/characters", charactersRoutes)

export default router