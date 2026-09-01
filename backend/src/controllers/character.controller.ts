import { RequestHandler } from "express";
import CharacterService from "../services/character.service";
import { isAppError } from "@/utils/is-app-error.util";

class CharacterController {
    createCharacter: RequestHandler = async (req, res) => {
        try {
            const files = req.files as {
                artwork?: Express.Multer.File[];
                thumbnail?: Express.Multer.File[];
            };

            if(!files.artwork?.[0] || !files.thumbnail?.[0]) {
                return res.status(400).json({message: "Artes do personagem são obrigatórias."})
            }

            const result = await CharacterService.createCharacter({
                data: req.body, 
                artwork: {
                    mimetype: files.artwork[0].mimetype,
                    buffer: files.artwork[0].buffer
                },
                thumbnail: {
                    mimetype: files.thumbnail[0].mimetype,
                    buffer: files.thumbnail[0].buffer
                }
            });

            res.status(201).json(result);
        } catch(err) {
            if(isAppError(err)) {
                if(err.type === "not_found") {
                    return res.status(404).json({message: err.message});
                };
                if(err.type === "storage") {
                    return res.status(201).json({errors: err.errors});
                }
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