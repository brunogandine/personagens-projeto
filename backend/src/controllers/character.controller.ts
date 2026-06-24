import { RequestHandler } from "express";
import CharacterService from "../services/character.service";

class CharacterController {
    createCharacter: RequestHandler = async (req, res) => {
        try {
            const result = await CharacterService.createCharacter(req.body);

            res.status(200).json(result);
        } catch(err) {
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