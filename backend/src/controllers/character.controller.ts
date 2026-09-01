import { RequestHandler } from "express";
import CharacterService from "../services/character.service";
import { isAppError } from "@/utils/is-app-error-util";

class CharacterController {
    createCharacter: RequestHandler = async (req, res) => {
        try {
            const files = req.files as {
                artwork?: Express.Multer.File[];
                thumbnail?: Express.Multer.File[];
            };

            if(!files.artwork || !files.thumbnail) {
                return res.status(400).json({message: "Artes do personagem são obrigatórias."})
            }

            const result = await CharacterService.createCharacter(req.body);

            res.status(200).json(result);
        } catch(err) {
            if(isAppError(err)) {
                if(err.type === "not_found") {
                    return res.status(404).json({message: err.message});
                };
            }
            
            return res.status(500).json({message: "Erro Interno"});
        }
    }

    getCounts: RequestHandler = async (req, res) => {
        try {
            const count = await CharacterService.getCharactersCount();

            return res.status(200).json({count});
        } catch(err) {
            return res.status(500).json({message: "Erro Interno."})
        }
    }

    getById: RequestHandler = async (req, res) => {
        
    }

    getAll: RequestHandler = async (req, res) => {
        try {
            const { page, search } = req.query;

            console.log(search)

            const result = await CharacterService.getCharacters({
                page: Number(page ?? 1),
                search: search as string
            });

            return res.status(200).json(result);
        } catch(err) {
            return res.status(500).json({message: "Erro Interno."})
        }
    }
}

export default new CharacterController();