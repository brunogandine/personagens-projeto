import { Router } from "express";
import { auth } from "../../middlewares/auth";
import UserController from "../../controllers/user.controller";
import { uploadAvatar } from "../../middlewares/upload-avatar";
import { changePasswordSchema } from "../../validations/account.validations";
import { validate } from "../../middlewares/validate";

const router = Router();

router.get("/counts", auth, UserController.getCounts);

router.patch("/me/avatar", auth, uploadAvatar.single('avatar'), UserController.updateAvatar);
router.get("/me/avatar/recents", auth, UserController.getRecentAvatars);

router.patch("/me/password", auth, validate(changePasswordSchema), UserController.changePassword)


export default router;