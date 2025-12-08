import { Router } from 'express';
import { prisma } from '../../libs/prisma';
import { auth } from '../../middlewares/auth';
import { authorize } from '../../middlewares/authorize';
import { validate } from '../../middlewares/validate';

const router = Router();

// router.get("/", auth, CharacterController.getter, async (req, res) => {
//     try {
//         const list = await prisma.character.findMany();

//         return res.json(list);
//     } catch (err) {
//         return res.status(500).json({message: "Erro Interno."});
//     }
// })

// router.post("/", auth, authorize("Admin"), validate(characterSchema), CharacterController.addNew, async (req, res) => {
//     try{
//         const data = req.body;

//         const character = await prisma.character.create({
//             data: {
//                 anime_id: data.anime_id ?? 1,
//                 active: data.active ?? 0,
//                 attr_hp: data.attr_hp ?? 0,
//                 attr_atk: data.attr_atk ?? 0,
//                 attr_def: data.attr_def ?? 0,
//                 description: {
//                     create: {
//                         name: data.name
//                     }
//                 }
//             },
//             include: {
//                 description: true
//             }
//         })

//         return res.status(201).json({success: "Personagem Criado com Sucesso", character})
//     } catch(err) {
//         console.error(err)
//         return res.status(500).json({error: "Erro ao criar personagem."})
//     }
// })

export default router;