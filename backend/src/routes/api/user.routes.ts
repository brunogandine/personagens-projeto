import { Router } from "express";
import Authenticate from "@/middlewares/auth";
import UserController from "@/controllers/user.controller";
import UploadAvatar from "@/middlewares/upload/uploadAvatar";
import { changePasswordSchema } from "@/validations/account.validations";
import ValidateRequest from "@/middlewares/validate";
import AuthorizeUser from "@/middlewares/authorize";

const router = Router();

router.get("/get", Authenticate, AuthorizeUser("Admin"), UserController.getUsers)
router.get("/counts", Authenticate, UserController.getCounts);

router.patch("/me/avatar", Authenticate, UploadAvatar.single('avatar'), UserController.updateAvatar);
router.get("/me/avatar/recents", Authenticate, UserController.getRecentAvatars);

router.patch("/me/password", Authenticate, ValidateRequest(changePasswordSchema, "body"), UserController.changePassword)

export default router;