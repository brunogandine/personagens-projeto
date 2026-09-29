import { Router } from "express";
import AuthController from "@/controllers/auth.controller";
import ValidateRequest from "@/middlewares/validate";
import { loginSchema, registerSchema } from "@/validations/auth.validations";
import Authenticate from "@/middlewares/auth";

const router = Router();

router.post("/login", ValidateRequest(loginSchema, "body"), AuthController.login);
router.post("/logout", AuthController.logout)
router.post("/register", ValidateRequest(registerSchema, "body"), AuthController.register);

router.get("/me", Authenticate, AuthController.me);

export default router;