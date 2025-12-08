import { Router } from "express";
import AuthController from "../../controllers/auth.controller";
import { validate } from "../../middlewares/validate";
import { loginSchema, registerSchema } from "../../validations/auth.validations";

const router = Router();

router.post("/login", validate(loginSchema), AuthController.login);
router.post("/register", validate(registerSchema), AuthController.register)

export default router;