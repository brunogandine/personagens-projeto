import AnimeController from "../../controllers/anime.controller";
import { Router } from "express"; 
import { auth } from "../../middlewares/auth";
import { authorize } from "../../middlewares/authorize";
import { validate } from "../../middlewares/validate";
import { createAnimeSchema } from "../../validations/anime.validations";

const router = Router();

router.get("/", auth, AnimeController.getAll);
router.get("/:id", auth, AnimeController.getById);
router.get("/counts", auth, AnimeController.getCount)

router.post("/", auth, authorize("Admin"), validate(createAnimeSchema, "body"), AnimeController.createAnime);

export default router;