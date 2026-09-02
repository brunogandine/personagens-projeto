import { Router } from "express";
import { auth } from "../../middlewares/auth";
import UserController from "../../controllers/user.controller";
import UploadAvatar from "../../middlewares/upload/uploadAvatar";
import { changePasswordSchema } from "../../validations/account.validations";
import { validate } from "../../middlewares/validate";
import { authorize } from "../../middlewares/authorize";

const router = Router();

router.get("/get", auth, authorize("Admin"), UserController.getUsers)
router.get("/counts", auth, UserController.getCounts);

router.patch("/me/avatar", auth, UploadAvatar.single('avatar'), UserController.updateAvatar);
router.get("/me/avatar/recents", auth, UserController.getRecentAvatars);

router.patch("/me/password", auth, validate(changePasswordSchema), UserController.changePassword)


export default router;