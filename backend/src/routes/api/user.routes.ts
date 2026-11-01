import { Router } from "express";
import { changePasswordSchema } from "@/validations/account.validations";
import { idParamsSchema } from "@/validations/common/common.validations";
import Authenticate from "@/middlewares/auth";
import AuthorizeUser from "@/middlewares/authorize";
import AuthorizeUserAccess from "@/middlewares/authorizeUserAccess";
import UserController from "@/controllers/user.controller";
import UploadAvatar from "@/middlewares/upload/uploadAvatar";
import ValidateRequest from "@/middlewares/validate";

const router = Router();

router.get("/get", Authenticate, AuthorizeUser("Admin"), UserController.getUsers);
router.get("/counts", Authenticate, UserController.getCounts);
router.get("/:id/characters", Authenticate, ValidateRequest(idParamsSchema, "params"), AuthorizeUserAccess, UserController.getUserCharacters);

router.patch("/me/avatar", Authenticate, UploadAvatar.single('avatar'), UserController.updateAvatar);
router.get("/me/avatar/recents", Authenticate, UserController.getRecentAvatars);

router.patch("/me/password", Authenticate, ValidateRequest(changePasswordSchema, "body"), UserController.changePassword)

export default router;