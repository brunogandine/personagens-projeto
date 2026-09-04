import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { authorize } from '../../middlewares/authorize';
import { validate } from '../../middlewares/validate';
import CharacterController from '../../controllers/character.controller';
import UploadImage from '../../middlewares/upload/uploadImage';
import { characterIdSchema, createCharacterSchema, updateCharacterSchema } from '@/validations/character.validations';

const router = Router();

router.get("/", auth, CharacterController.getAll);
router.get("/:id", auth, CharacterController.getById);
router.get("/counts", auth, CharacterController.getCounts);

router.post("/", auth, authorize("Admin"), UploadImage.fields([{name: "thumbnail", maxCount: 1}, {name: "artwork", maxCount: 1}]), validate(createCharacterSchema, "body"), CharacterController.createCharacter);
router.patch("/:id", auth, authorize("Admin"), UploadImage.fields([{name: "thumbnail", maxCount: 1}, {name: "artwork", maxCount: 1}]), validate(characterIdSchema, "params"), validate(updateCharacterSchema, "body"), CharacterController.updateCharacter);

export default router;