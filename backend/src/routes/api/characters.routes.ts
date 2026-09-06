import { Router } from 'express';
import Authenticate from '@/middlewares/auth';
import AuthorizeUser from '@/middlewares/authorize';
import ValidateRequest from '@/middlewares/validate';
import CharacterController from '@/controllers/character.controller';
import UploadImage from '@/middlewares/upload/uploadImage';
import { characterIdSchema, createCharacterSchema, updateCharacterSchema } from '@/validations/character.validations';

const router = Router();

router.get("/", Authenticate, CharacterController.getAll);
router.get("/:id", Authenticate, ValidateRequest(characterIdSchema, "params"), CharacterController.getById);
router.get("/counts", Authenticate, CharacterController.getCounts);

router.post(
    "/", 
    Authenticate, 
    AuthorizeUser("Admin"), 
    UploadImage.fields([{name: "thumbnail", maxCount: 1}, {name: "artwork", maxCount: 1}]),
    ValidateRequest(createCharacterSchema, "body"), 
    CharacterController.createCharacter
);
router.patch(
    "/:id", 
    Authenticate, AuthorizeUser("Admin"), 
    UploadImage.fields([{name: "thumbnail", maxCount: 1}, {name: "artwork", maxCount: 1}]), 
    ValidateRequest(characterIdSchema, "params"), 
    ValidateRequest(updateCharacterSchema, "body"), 
    CharacterController.updateCharacter
);

export default router;