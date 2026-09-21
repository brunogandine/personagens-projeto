import { Router } from 'express';
import Authenticate from '@/middlewares/auth';
import AuthorizeUser from '@/middlewares/authorize';
import ValidateRequest from '@/middlewares/validate';
import CharacterController from '@/controllers/character.controller';
import UploadImage from '@/middlewares/upload/uploadImage';
import { createCharacterSchema, deleteCharacterSchema, restoreCharacterSchema, updateCharacterSchema } from '@/validations/character.validations';
import { idParamsSchema } from "@/validations/common/common.validations";

const router = Router();

router.get("/", Authenticate, CharacterController.getAll);
router.get("/counts", Authenticate, CharacterController.getCounts);
router.get("/:id", Authenticate, ValidateRequest(idParamsSchema, "params"), CharacterController.getById);

router.post(
    "/", 
    Authenticate, 
    AuthorizeUser("Admin"), 
    UploadImage.fields([{name: "thumbnail", maxCount: 1}, {name: "artwork", maxCount: 1}]),
    ValidateRequest(createCharacterSchema, "body"), 
    CharacterController.createCharacter
);

router.patch("/delete", Authenticate, AuthorizeUser("Admin"), ValidateRequest(deleteCharacterSchema, "body"), CharacterController.softDelete);
router.patch("/restore", Authenticate, AuthorizeUser("Admin"), ValidateRequest(restoreCharacterSchema, "body"), CharacterController.restoreCharacter)
router.patch(
    "/:id", 
    Authenticate, AuthorizeUser("Admin"), 
    UploadImage.fields([{name: "thumbnail", maxCount: 1}, {name: "artwork", maxCount: 1}]), 
    ValidateRequest(idParamsSchema, "params"), 
    ValidateRequest(updateCharacterSchema, "body"), 
    CharacterController.updateCharacter
);

export default router;