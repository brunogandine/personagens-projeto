import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { authorize } from '../../middlewares/authorize';
import { validate } from '../../middlewares/validate';
import CharacterController from '../../controllers/character.controller';
import UploadSmallArtwork from '../../middlewares/upload/uploadSmallArtwork';

const router = Router();

router.get("/", auth, CharacterController.getAll);
router.get("/:id", auth, CharacterController.getById);
router.get("/counts", auth, CharacterController.getCounts);

router.post("/", auth, authorize("Admin"), UploadSmallArtwork.single("small_artwork"), CharacterController.createCharacter);

export default router;