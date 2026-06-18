import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { authorize } from '../../middlewares/authorize';
import { validate } from '../../middlewares/validate';
import CharacterController from '../../controllers/character.controller';
import { createCharacterSchema } from '../../validations/character.validations';

const router = Router();

router.get("/", auth, CharacterController.getAll);
router.get("/:id", auth, CharacterController.getById);
router.get("/counts", auth, CharacterController.getCounts);

router.post("/", auth, authorize("Admin"), validate(createCharacterSchema), CharacterController.createCharacter);

export default router;