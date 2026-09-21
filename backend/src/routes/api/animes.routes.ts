import { Router } from "express"; 

import AnimeController from "@/controllers/anime.controller";
import Authenticate from "@/middlewares/auth";
import AuthorizeUser from "@/middlewares/authorize";
import ValidateRequest from "@/middlewares/validate";
import { createAnimeSchema } from "@/validations/anime.validations";
import UploadImage from "@/middlewares/upload/uploadImage";

const router = Router();

router.get("/", Authenticate, AnimeController.getAll);
router.get("/:id", Authenticate, AnimeController.getById);
router.get("/counts", Authenticate, AnimeController.getCount)

router.post("/", Authenticate, AuthorizeUser("Admin"), UploadImage.single("symbol"), ValidateRequest(createAnimeSchema, "body"), AnimeController.createAnime);

export default router;