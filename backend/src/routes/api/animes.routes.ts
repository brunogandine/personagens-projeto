import { Router } from "express"; 

import AnimeController from "@/controllers/anime.controller";
import Authenticate from "@/middlewares/auth";
import AuthorizeUser from "@/middlewares/authorize";
import ValidateRequest from "@/middlewares/validate";
import { createAnimeSchema, deleteAnimeSchema, restoreAnimeSchema, updateAnimeSchema } from "@/validations/anime.validations";
import UploadImage from "@/middlewares/upload/uploadImage";
import { idParamsSchema } from "@/validations/common/common.validations";


const router = Router();

router.get("/", Authenticate, AnimeController.getAll);
router.get("/counts", Authenticate, AnimeController.getCount);
router.get("/:id", Authenticate, ValidateRequest(idParamsSchema, "params"), AnimeController.getById);

router.post("/", Authenticate, AuthorizeUser("Admin"), UploadImage.single("symbol"), ValidateRequest(createAnimeSchema, "body"), AnimeController.create);

router.patch("/delete", Authenticate, AuthorizeUser("Admin"), ValidateRequest(deleteAnimeSchema, "body"), AnimeController.softDelete);
router.patch("restore", Authenticate, AuthorizeUser("Admin"), ValidateRequest(restoreAnimeSchema, "body"), AnimeController.restore);

router.patch("/:id", 
    Authenticate, 
    AuthorizeUser("Admin"), 
    UploadImage.single("symbol"), 
    ValidateRequest(idParamsSchema, "params"), 
    ValidateRequest(updateAnimeSchema, "body"),
    AnimeController.update
);

export default router;