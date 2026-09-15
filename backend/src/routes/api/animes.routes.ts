import { Router } from "express"; 

import AnimeController from "@/controllers/anime.controller";
import Authenticate from "@/middlewares/auth";
import AuthorizeUser from "@/middlewares/authorize";
import ValidateRequest from "@/middlewares/validate";
import { createAnimeSchema } from "@/validations/anime.validations";

const router = Router();

router.get("/", Authenticate, AnimeController.getAll);
router.get("/:id", Authenticate, AnimeController.getById);
router.get("/counts", Authenticate, AnimeController.getCount)

router.post("/", Authenticate, AuthorizeUser("Admin"), ValidateRequest(createAnimeSchema, "body"), AnimeController.createAnime);

export default router;