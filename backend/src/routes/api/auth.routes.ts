import { Router } from "express";
import AuthController from "../../controllers/auth.controller";
import { validate } from "../../middlewares/validate";
import { loginSchema, registerSchema } from "../../validations/auth.validations";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/login", validate(loginSchema, "body"), AuthController.login);
router.post("/logout", AuthController.logout)
router.post("/register", validate(registerSchema, "body"), AuthController.register);

router.get("/me", auth, AuthController.me);

export default router;