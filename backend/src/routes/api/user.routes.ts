import { Router } from "express";
import { auth } from "../../middlewares/auth";
import UserController from "../../controllers/user.controller";
import { uploadAvatar } from "../../middlewares/upload-avatar";

const router = Router();

router.get("/counts", auth, UserController.getCounts);
router.patch("/me/avatar", auth, uploadAvatar.single('avatar'), UserController.updateAvatar);
router.get("/me/avatar/recents", auth, UserController.getRecentAvatars)

export default router;